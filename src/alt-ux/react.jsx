const { useState, useEffect } = React;

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

const useExternal = (stateKey, setFn) => {
	const [value, setter] = useState(state.get(stateKey));
	const externalSetter = (...args) => {
		const newArgs = typeof setFn === "function"
			? [ setFn(...args) ]
			: args;
		state.trigger(stateKey, ...newArgs);
	};
	useEffect(() => {
		const { remove } = state.listen(stateKey, setter);
		return remove;
	});
	return [value, externalSetter];
};

const SelectList = ({ stateKey, label, children }) => {
	const [value, setter] = useExternal(stateKey);
	const { options=[], selected } = value || {};
	const selectChildren = children || options.map((x,i) => (
		<option value={x.value} key={stateKey+'-option-'+i}>{x.label}</option>
	));
	const onChange = (e) => setter({
		options,
		selected: e.target.value
	});
	return (
		<FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
			<InputLabel htmlFor="checkpoint-select">{label}</InputLabel>
			{ (!value || value === "loading") &&
				<Select
					id={stateKey + '-selector'}
					size="small"
					label={label}
					value="loading"
					disabled
				>
					<option value="loading">Loading...</option>
				</Select>
			}
			{ (value && value !== "loading") &&
				<Select
					id={stateKey + '-selector'}
					size="small"
					label={label}
					value={selected || value}
					onChange={onChange}
				>
					{ selectChildren }
				</Select>
			}
		</FormControl>
	);
};

const Header = () => {
	return (
		<div style={{ margin: "0.4rem", marginBottom: 0 }}>
			<SelectList stateKey="checkpoint" label="Checkpoint" />
			<SelectList stateKey="vae" label="VAE" />
		</div>
	);
};

const Body = () => {
	const [tabs, setTabs] = useExternal('tabs');
	const { options=[], selected: currentTab } = tabs || {};
	const onChange = (_, selected) => setTabs({ options, selected });
	const currentTabDef = options.find(x => x.value === currentTab);
	const currentTabBody = currentTabDef ? currentTabDef.body : '';
	//const currentTab = options?.[selected]?.label || 'TODO';

	return (
		<div  style={{ margin: "0 auto", marginBottom: "auto" }}>
			<Box>
				<Box sx={{ width: "98vw", borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
					<Tabs
						value={currentTab}
						onChange={onChange}
						variant="scrollable"
						scrollButtons="auto"
						allowScrollButtonsMobile={true}
					>
						{options.map((x,i) => (
							<Tab
								key={'body-tabs-' + i}
								label={x.label}
								value={x.value}
							/>
						))}
					</Tabs>
				</Box>
				<div style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: '75vh',
					padding: '1em',
					padding: "1em",
					border: "2px dotted",
					marginTop: "0.5rem",
					color: "#333"
				}}>{currentTabBody}</div>
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
