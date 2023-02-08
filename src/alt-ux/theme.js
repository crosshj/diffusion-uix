const {
	colors,
	createTheme,
} = MaterialUI;

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const theme = {
	typography: {
		fontSize: 13,
	},
	palette: {
		mode: prefersDark ? 'dark' : 'light',
		primary: {
			main: colors.orange[300],
		},
		secondary: {
			main: '#19857b',
		},
		error: {
			main: colors.red.A400,
		},
	},
	components: {
		MuiTab: {
			styleOverrides: {
				root: {
					padding: '0.4rem 0.7rem',
					textTransform: 'unset',
					minWidth: '50px',
				},
			},
		},
	},
};

export default createTheme(theme);