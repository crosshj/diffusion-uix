import getTheme from './theme.js';
window.getTheme = getTheme;

const fetchFake = (name, delayTime, mock) => setTimeout(() => {
	state.trigger(name, mock);
}, delayTime);

const OptionsList = ({ selected=0, options }) => ({
	selected,
	options:options.map((x,i) => ({ value: i, label: x })),
});

class PubSubState {
	listeners = {};
	state = {};

	constructor({ initialState } = {}){
		this.state = initialState || this.state;
		this.get = this.get.bind(this);
		this.remove = this.remove.bind(this);
		this.listen = this.listen.bind(this);
		this.trigger = this.trigger.bind(this);
	}
	get(key){
		return this.state[key];
	}
	remove(key, hash){
		this.listeners[key] = this.listeners[key]
			.filter(x => x.hash !== hash);
	};
	listen(key, fn, priority=0) {
		this.listeners[key] = this.listeners[key] || [];
		const hash = [...Array(30)].map(() => Math.random().toString(36)[2]).join('');
		if (priority){
			this.listeners[key].unshift({ fn, hash });
		} else {
			this.listeners[key].push({ fn, hash });
		}
		return { remove: () => this.remove(key, hash) };
	}
	trigger(key, arg) {
		if (!this.listeners[key]) {
			console.log(' listener not registered');
			console.log({ listeners: this.listeners, key });
			return;
		}
		const prev = this.state;
		const next = typeof arg === "function"
			? fn(prev)
			: { ...prev, [key]: arg };
		this.listeners[key]
			.forEach((x) => x.fn(next[key]) );
	}
}

const initialState = {
	checkpoint: undefined,
	vae: undefined,
	currentTab: 0,
	theme: getTheme()
};
fetchFake("checkpoint", 1000,
	OptionsList({
		selected: 1,
		options: [
			"pfg_111.ckpt [5a369d04a0]",
			"pokemonStyle_v1.ckpt [4e84fa37d8]",
			"protogenV22AnimeOffi_22.safetensors [1254103966]",
		]
	})
);
fetchFake("vae", 2000,
	OptionsList({
		selected: 2,
		options: [
			"None",
			"Automatic",
			"vae-ft-mse-840000-ema-pruned.ckpt",
		]
	})
);

window.state = new PubSubState({ initialState });

window
	.matchMedia("(prefers-color-scheme: dark)")
	.addEventListener("change", () => {
		state.trigger("theme", getTheme())
	});
