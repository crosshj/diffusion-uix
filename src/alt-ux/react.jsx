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
} = MaterialUI;
// console.log(MaterialUI);

function LightBulbIcon(props) {
	return (
		<SvgIcon {...props}>
			<path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
		</SvgIcon>
	);
}

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

const GridLayout = () => (
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
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<GridLayout />
	</ThemeProvider>,
);