// Real Omaxian theme palettes, lifted from omarchy-quattro/themes/<name>/colors.toml.
// Used by the live theme switcher on the /live landing variant.

export interface Theme {
	id: string;
	name: string;
	mode: 'dark' | 'light';
	bg: string;
	bgDark: string;
	fg: string;
	accent: string;
	sel: string;
	red: string;
	green: string;
	yellow: string;
	blue: string;
	magenta: string;
	cyan: string;
}

export const THEMES: Theme[] = [
	{
		// New default (first login) as of the omarchy v4.0.3 bump.
		id: 'nebula-ridge',
		name: 'Nebula Ridge',
		mode: 'dark',
		bg: '#0b0517',
		bgDark: '#070311',
		fg: '#e9d6e7',
		accent: '#8773b5',
		sel: '#231e2e',
		red: '#b582b1',
		green: '#a0c2ff',
		yellow: '#ffcdff',
		blue: '#8773b5',
		magenta: '#c695e2',
		cyan: '#c6d0ff'
	},
	{
		id: 'galaxy-swirl',
		name: 'Galaxy Swirl',
		mode: 'dark',
		bg: '#030002',
		bgDark: '#020001',
		fg: '#f7dce5',
		accent: '#9f6698',
		sel: '#1c1a1b',
		red: '#c17b8e',
		green: '#ffa595',
		yellow: '#ffcbc5',
		blue: '#9f6698',
		magenta: '#df89b8',
		cyan: '#f7bbff'
	},
	{
		id: 'tokyo-night',
		name: 'Tokyo Night',
		mode: 'dark',
		bg: '#1a1b26',
		bgDark: '#13141c',
		fg: '#a9b1d6',
		accent: '#7aa2f7',
		sel: '#292e42',
		red: '#f7768e',
		green: '#9ece6a',
		yellow: '#e0af68',
		blue: '#7aa2f7',
		magenta: '#ad8ee6',
		cyan: '#449dab'
	},
	{
		id: 'catppuccin',
		name: 'Catppuccin',
		mode: 'dark',
		bg: '#1e1e2e',
		bgDark: '#161622',
		fg: '#cdd6f4',
		accent: '#89b4fa',
		sel: '#45475a',
		red: '#f38ba8',
		green: '#a6e3a1',
		yellow: '#f9e2af',
		blue: '#89b4fa',
		magenta: '#f5c2e7',
		cyan: '#94e2d5'
	},
	{
		id: 'nord',
		name: 'Nord',
		mode: 'dark',
		bg: '#2e3440',
		bgDark: '#222730',
		fg: '#d8dee9',
		accent: '#81a1c1',
		sel: '#434c5e',
		red: '#bf616a',
		green: '#a3be8c',
		yellow: '#ebcb8b',
		blue: '#81a1c1',
		magenta: '#b48ead',
		cyan: '#88c0d0'
	},
	{
		id: 'gruvbox',
		name: 'Gruvbox',
		mode: 'dark',
		bg: '#282828',
		bgDark: '#1e1e1e',
		fg: '#d4be98',
		accent: '#7daea3',
		sel: '#504945',
		red: '#ea6962',
		green: '#a9b665',
		yellow: '#d8a657',
		blue: '#7daea3',
		magenta: '#d3869b',
		cyan: '#89b482'
	},
	{
		id: 'everforest',
		name: 'Everforest',
		mode: 'dark',
		bg: '#2d353b',
		bgDark: '#21272c',
		fg: '#d3c6aa',
		accent: '#7fbbb3',
		sel: '#3d484d',
		red: '#e67e80',
		green: '#a7c080',
		yellow: '#dbbc7f',
		blue: '#7fbbb3',
		magenta: '#d699b6',
		cyan: '#83c092'
	},
	{
		id: 'kanagawa',
		name: 'Kanagawa',
		mode: 'dark',
		bg: '#1f1f28',
		bgDark: '#17171e',
		fg: '#dcd7ba',
		accent: '#7e9cd8',
		sel: '#363646',
		red: '#c34043',
		green: '#76946a',
		yellow: '#c0a36e',
		blue: '#7e9cd8',
		magenta: '#957fb8',
		cyan: '#6a9589'
	},
	{
		id: 'osaka-jade',
		name: 'Osaka Jade',
		mode: 'dark',
		bg: '#111c18',
		bgDark: '#0c1512',
		fg: '#c1c497',
		accent: '#509475',
		sel: '#32473b',
		red: '#ff5345',
		green: '#549e6a',
		yellow: '#459451',
		blue: '#509475',
		magenta: '#d2689c',
		cyan: '#2dd5b7'
	},
	{
		id: 'retro-82',
		name: 'Retro ’82',
		mode: 'dark',
		bg: '#05182e',
		bgDark: '#031222',
		fg: '#f6dcac',
		accent: '#faa968',
		sel: '#134e5a',
		red: '#f85525',
		green: '#028391',
		yellow: '#e97b3c',
		blue: '#3f8f8a',
		magenta: '#3f8f8a',
		cyan: '#8cbfb8'
	},
	{
		id: 'matte-black',
		name: 'Matte Black',
		mode: 'dark',
		bg: '#121212',
		bgDark: '#0d0d0d',
		fg: '#bebebe',
		accent: '#e68e0d',
		sel: '#2a2a2a',
		red: '#d35f5f',
		green: '#ffc107',
		yellow: '#b91c1c',
		blue: '#e68e0d',
		magenta: '#d35f5f',
		cyan: '#bebebe'
	},
	{
		id: 'hackerman',
		name: 'Hackerman',
		mode: 'dark',
		bg: '#0b0c16',
		bgDark: '#080910',
		fg: '#ddf7ff',
		accent: '#82fb9c',
		sel: '#1f253a',
		red: '#50f872',
		green: '#4fe88f',
		yellow: '#50f7d4',
		blue: '#829dd4',
		magenta: '#86a7df',
		cyan: '#7cf8f7'
	},
	{
		id: 'catppuccin-latte',
		name: 'Catppuccin Latte',
		mode: 'light',
		bg: '#eff1f5',
		bgDark: '#e3e4e8',
		fg: '#4c4f69',
		accent: '#1e66f5',
		sel: '#ccd0da',
		red: '#d20f39',
		green: '#40a02b',
		yellow: '#df8e1d',
		blue: '#1e66f5',
		magenta: '#ea76cb',
		cyan: '#179299'
	},
	{
		id: 'rose-pine',
		name: 'Rosé Pine',
		mode: 'light',
		bg: '#faf4ed',
		bgDark: '#ede7e1',
		fg: '#575279',
		accent: '#56949f',
		sel: '#dfdad9',
		red: '#b4637a',
		green: '#286983',
		yellow: '#ea9d34',
		blue: '#56949f',
		magenta: '#907aa9',
		cyan: '#d7827e'
	}
];

/** All 21 theme display names that ship with Omaxian. */
export const ALL_THEME_NAMES: string[] = [
	'Catppuccin',
	'Catppuccin Latte',
	'Ethereal',
	'Everforest',
	'Flexoki Light',
	'Galaxy Swirl',
	'Gruvbox',
	'Hackerman',
	'Kanagawa',
	'Last Horizon',
	'Lumon',
	'Lupine',
	'Matte Black',
	'Miasma',
	'Nebula Ridge',
	'Nord',
	'Osaka Jade',
	'Retro ’82',
	'Ristretto',
	'Rosé Pine',
	'Solitude',
	'Tokyo Night',
	'Vantablack'
];
