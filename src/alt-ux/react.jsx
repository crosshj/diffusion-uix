const {
	CssBaseline,
	ThemeProvider,
	Typography,
	Container,
	Box,
	SvgIcon,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Paper,
	Link,
	styled,
	Unstable_Grid2: Grid,
	Tabs,
	Tab,
	Icon,
} = MaterialUI;
// console.log(MaterialUI);

/*
	Icons:
	https://fonts.google.com/icons
	https://mui.com/material-ui/material-icons
	eg. <Icon sx={{ fontSize: 30 }}>add_circle</Icon>
*/


const Header = ({ state, trigger }) => {
	const { checkpoint, vae } = state;
	const handleChange = (e, key) => {
		trigger({ key, value: e.target.value });
	};
	return (
		<div style={{ margin: "0.4rem", marginBottom: 0 }}>
			<FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
				<InputLabel id="checkpoint-label">Checkpoint</InputLabel>
				<Select
					size="small"
					labelId="checkpoint-label"
					label="Checkpoint"
					value={checkpoint}
					onChange={(e) => handleChange(e, 'checkpoint')}
				>
					<MenuItem value={10}>pfg_111.ckpt [5a369d04a0]</MenuItem>
					<MenuItem value={20}>pokemonStyle_v1.ckpt [4e84fa37d8]</MenuItem>
					<MenuItem value={30}>protogenV22AnimeOffi_22.safetensors [1254103966]</MenuItem>
				</Select>
			</FormControl>
			<FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
				<InputLabel id="vae-label">VAE</InputLabel>
				<Select
					size="small"
					labelId="vae-label"
					label="VAE"
					value={vae}
					onChange={(e) => handleChange(e, 'vae')}
				>
					<MenuItem value={10}>None</MenuItem>
					<MenuItem value={20}>Automatic</MenuItem>
					<MenuItem value={30}>vae-ft-mse-840000-ema-pruned.ckpt</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
};

const Body = ({ state, trigger }) => {
	const { currentTab } = state;
	const handleChange = (value, key) => {
		trigger({ key, value });
	};
	return (
		<div  style={{ margin: "0 auto", marginBottom: "auto" }}>
			<Box sx={{ bgcolor: 'background.paper' }} >
				<Box sx={{ width: "98vw", borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
					<Tabs
						value={currentTab}
						onChange={(e, newValue) => handleChange(newValue, 'currentTab')}
						variant="scrollable"
						scrollButtons="auto"
					>
						<Tab label="txt2img" />
						<Tab label="img2img" />
						<Tab label="Extras" />
						<Tab label="PNG Info" />
						<Tab label="Checkpoint Merger" />
						<Tab label="Train" />
						<Tab label="Dreambooth" />
						<Tab label="Image Browser" />
						<Tab label="Settings" />
						<Tab label="Extensions" />
					</Tabs>
				</Box>
				<div style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: '75vh', padding: '1em',
					padding: "1em",
					border: "2px dotted",
					marginTop: "0.5rem",
					color: "#333"
				}}>TODO</div>
			</Box>
		</div>
	);
};

const Footer = () => {
	//console.log('-- render footer');
	return (
		<div id="footer">
			<div>API  •  Github  •  Gradio  •  Reload UI</div>
			<div>python: 3.10.6  •  torch: 1.12.1+cu113  •  xformers: 0.0.14.dev  •  gradio: 3.15.0  •  commit: 56154674  •  checkpoint: 5a369d04a0</div>
		</div>
	);
};

const LayoutItem = styled('div')(({ theme, height }) => {
	const itemStyle = {
		width: "100%",
		display: 'flex',
		alignItems: 'center',
	};
	if(height){
		itemStyle.height = height;
	} else {
		itemStyle.flex = 1;
	}
	return itemStyle;
});
const LayoutContainer = styled('div')(({ theme }) => ({
	minHeight: '100vh',
	display: "flex",
	flexDirection: "column"
}));

const App = ({ state, trigger }) => {
	//console.log('-- render layout');
	return (
		<ThemeProvider theme={theme()}>
			<CssBaseline />
			<LayoutContainer>
				<LayoutItem height="auto">
					<Header state={state} trigger={trigger}/>
				</LayoutItem>
				<LayoutItem>
					<Body state={state} trigger={trigger} />
				</LayoutItem>
				<LayoutItem height="auto">
					<Footer />
				</LayoutItem>
			</LayoutContainer>
		</ThemeProvider>
	);
};

const root = ReactDOM.createRoot(document.getElementById('root'));

const exampleState = {
	checkpoint: 10,
	currentTab: 0,
	vae: 30,
};

class ReactState {
	constructor({ render }){
		this.state = exampleState;
		this.render = () => render(this);
		this.get = this.getAll.bind(this);
		this.trigger = this.trigger.bind(this);
	}
	// publish(trigger) - a state change is trigger somewhere in react, all functions subscribed to this state are called + component updates
	// subscribe(bind) - component adds its function as a subscription to some part of state (like useState)

	getAll(){
		return this.state;
	}

	trigger(action={}){
		const { key, value='' } = action;
		if(key){
			this.state[key] = value;
		}
		this.render();
		return;
	}
}
window.state = new ReactState({
	render: (s) => root.render(<App state={s.get()} trigger={s.trigger} />)
});

state.trigger();

window
	.matchMedia("(prefers-color-scheme: dark)")
	.addEventListener("change", state.trigger);