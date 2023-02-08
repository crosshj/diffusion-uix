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


const Header = () => {
	const handleChange = () => {};
	return (
		<div style={{ margin: "0.4rem", marginBottom: 0 }}>
			<FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
				<InputLabel id="checkpoint-label">Checkpoint</InputLabel>
				<Select
					size="small"
					labelId="checkpoint-label"
					label="Checkpoint"
					value={10}
					onChange={handleChange}
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
					value={30}
					onChange={handleChange}
				>
					<MenuItem value={10}>None</MenuItem>
					<MenuItem value={20}>Automatic</MenuItem>
					<MenuItem value={30}>vae-ft-mse-840000-ema-pruned.ckpt</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
};

const Body = () => {
	const value = 0;
	const handleChange = () => {};
	return (
		<div  style={{ margin: "0 auto", marginBottom: "auto" }}>
			<Box sx={{ bgcolor: 'background.paper' }} >
				<Box sx={{ width: "98vw", borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
					<Tabs
						value={value}
						onChange={handleChange}
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
	return (
		<ThemeProvider theme={theme()}>
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
	.addEventListener("change", function (e) {
		root.render(<App />);
	});