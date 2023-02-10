import getTheme from './theme.js';
window.getTheme = getTheme;


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
		return this.state[key] !== undefined
			? this.state[key]
			: this.state;
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
	checkpoint: 'loading',
	currentTab: 0,
	vae: 'loading',
	theme: getTheme()
};
window.state = new PubSubState({ initialState });

//NOTE: simulate loading from network
setTimeout(() => {
	state.trigger("checkpoint", 30);
	state.trigger("vae", 30);
}, 2000);