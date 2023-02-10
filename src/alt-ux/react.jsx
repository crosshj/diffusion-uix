const { useState } = React;

const {
	CssBaseline,
	ThemeProvider,
	Typography,
	Container,
	Box,
	SvgIcon,
	NativeSelect: Select,
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

const SelectList = ({ stateKey, label, children }) => {
	const [value, setter] = useState(state.get(stateKey));
	state.listen(stateKey, setter);
	const onChange = (e) => state.trigger(stateKey, e.target.value);

	return (
		<FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
			<InputLabel htmlFor="checkpoint-select">{label}</InputLabel>
			{ value === "loading" &&
				<Select
					id={stateKey + '-selector'}
					size="small"
					label={label}
					value="loading"
					disabled
					onChange={onChange}
				>
					<option value="loading">Loading...</option>
				</Select>
			}
			{ value !== "loading" &&
				<Select
					id={stateKey + '-selector'}
					size="small"
					label={label}
					value={value}
					onChange={onChange}
				>
					{ children }
				</Select>
			}
		</FormControl>
	);
};

const Header = () => {
	return (
		<div style={{ margin: "0.4rem", marginBottom: 0 }}>
			<SelectList stateKey="checkpoint" label="Checkpoint">
				<option value={10}>pfg_111.ckpt [5a369d04a0]</option>
				<option value={20}>pokemonStyle_v1.ckpt [4e84fa37d8]</option>
				<option value={30}>protogenV22AnimeOffi_22.safetensors [1254103966]</option>
			</SelectList>
			<SelectList stateKey="vae" label="VAE">
				<option value={10}>None</option>
				<option value={20}>Automatic</option>
				<option value={30}>vae-ft-mse-840000-ema-pruned.ckpt</option>
			</SelectList>
		</div>
	);
};

const Body = () => {
	const [currentTab, setCurrentTab] = useState(state.get('currentTab'));
	state.listen('currentTab', setCurrentTab);

	const onChange = (key) => (e, newValue) => state.trigger(key, newValue);

	return (
		<div  style={{ margin: "0 auto", marginBottom: "auto" }}>
			<Box sx={{ bgcolor: 'background.paper' }} >
				<Box sx={{ width: "98vw", borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
					<Tabs
						value={currentTab}
						onChange={onChange('currentTab')}
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
const App = () => {
	const [theme, setTheme] = useState(state.get('theme'));
	state.listen('theme', setTheme);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<LayoutContainer>
				<LayoutItem height="auto">
					<Header />
				</LayoutItem>
				<LayoutItem>
					<Body />
				</LayoutItem>
				<LayoutItem height="auto">
					<Footer />
				</LayoutItem>
			</LayoutContainer>
		</ThemeProvider>
	);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

window
	.matchMedia("(prefers-color-scheme: dark)")
	.addEventListener("change", () => {
		state.trigger("theme", getTheme())
	});