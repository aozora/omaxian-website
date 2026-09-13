// Shared content for the Omaxian landing pages.
// Sourced from the project README (github.com/aozora/omaxian), kept in sync
// with the upstream repo's last week of changes (2026-09-06 .. 2026-09-13).

export const REPO = 'https://github.com/aozora/omaxian';
export const OMARCHY = 'https://omarchy.org';
export const QUICKSHELL = 'https://quickshell.org';
export const COMMUNITY_PLUGINS_DIR = `${REPO}/tree/main/community-plugins`;

export const TAGLINE = 'A port of the Omarchy shell to debian-based distros on X11 / XLibre + i3';

// The name, spelled out. omakase (Omarchy's ethos) + X11 + Debian.
export const ETYMOLOGY = 'omakase + x11 + debian';

export const PITCH =
	'Omaxian brings the Omarchy shell — its bar, dock, menu, themes and omarchy-* commands — to the Debian family on X11 / XLibre and i3, with no Wayland, no Hyprland and no systemd.';

// The important caveat: this is the shell, not the OS, and X11 ≠ Wayland.
export const SCOPE =
	'It is not a distribution. Omarchy is a complete Arch-based system; Omaxian ports only its shell. Because X11 / XLibre and Wayland differ deeply, the two are only partially compatible — some Hyprland-era pieces work differently here, and a few not at all.';

// Prominent credit to the upstream project.
export const ATTRIBUTION =
	'Omaxian is built on Omarchy by DHH and 37signals, and reuses its shell, themes and omarchy-* command set under the MIT licence. Omarchy is the original; Omaxian only carries it to X11.';

// Distributions Omaxian is regularly tested against.
export const TESTED_ON: string[] = ['Debian 13', 'Devuan Excalibur', 'Xubuntu 26'];

// Ubuntu 26.04 dropped X11 outright, so "Ubuntu" alone no longer works.
export const UBUNTU_NOTE =
	'Stock Ubuntu 26.04 shipped with X11 removed entirely — install Xubuntu instead, or add it to Ubuntu with `sudo apt install xubuntu-desktop`.';

export interface Feature {
	title: string;
	blurb: string;
	key?: string;
}

export const FEATURES: Feature[] = [
	{
		title: 'Control Panel',
		key: 'Super+Ctrl+O',
		blurb:
			'Audio, Bluetooth, wallpaper, theme and monitors in one tabbed popup — a single gear on the bar.'
	},
	{
		title: 'Settings',
		key: 'Super+Ctrl+S',
		blurb:
			'A real window to edit bar layout, dock chrome, plugins, fonts and startup apps — including a new dual-pane, drag-and-drop editor for arranging bar widgets.'
	},
	{
		title: 'Floating island bar',
		blurb:
			'Optional inset, rounded bar chrome — the same idea as the dock’s pill. A Settings → Bar toggle, not a rebuild.'
	},
	{
		title: 'Dock',
		blurb:
			'A persistent bottom dock: pinned apps, running-app dots, hover magnification. First-party, not a plugin.'
	},
	{
		title: 'Display profiles',
		key: 'Super+Ctrl+D',
		blurb:
			'xrandr resolution / on / off / primary / position, with layouts saved per output topology and laptop-lid handling.'
	},
	{
		title: 'Lock screen',
		key: 'Super+Ctrl+L',
		blurb:
			'i3lock-omaxian with screenshot / image / random backgrounds and blur, plus optional idle auto-lock via xss-lock and xset.'
	},
	{
		title: 'Community plugins',
		blurb:
			'Curated third-party ports — weather, disposable alarms, email — install opt-in under ~/.config/omarchy/plugins/, vetted by omarchy-plugin-check, -validate and -update.'
	},
	{
		title: 'SysStats · VPN · apt',
		blurb:
			'CPU / GPU / RAM on the bar, a VPN indicator, and a live count of apt-upgradable packages.'
	},
	{
		title: 'Media widget',
		blurb:
			'MPD sits next to every other MPRIS player through mpDris2 — one control for all of them.'
	},
	{
		title: 'Help on the bar',
		key: 'Super+K',
		blurb: 'The “?” widget: a cheat-sheet of this session’s i3 binds, always one key away.'
	},
	{
		title: 'Cross-distro session',
		blurb:
			'omarchy-host picks systemd, elogind or plain shutdown(8) at runtime, so the same power/session commands work on Debian, Devuan and Ubuntu. PulseAudio or PipeWire; apt instead of pacman; redshift for night light.'
	}
];

export interface CommunityPlugin {
	id: string;
	label: string;
	upstream: string;
	href: string;
	blurb: string;
}

// community-plugins/ — opt-in, third-party ports. Not installed by deploy.sh.
export const COMMUNITY_PLUGINS: CommunityPlugin[] = [
	{
		id: 'io.github.guiestrela.weather',
		label: 'Better Weather',
		upstream: 'guiestrela/weather',
		href: 'https://github.com/guiestrela/weather',
		blurb: 'Open-Meteo, wttr.in and RainViewer forecasts on the bar. QML compatible as-is.'
	},
	{
		id: 'jmaeder.swissweather',
		label: 'Swiss Weather',
		upstream: 'jmaeder/omarchy-swissweather',
		href: 'https://github.com/jmaeder/omarchy-swissweather',
		blurb: 'MeteoSwiss bar weather for Switzerland. QML compatible as-is.'
	},
	{
		id: 'jankeesvw.nag',
		label: 'Nag',
		upstream: 'jankeesvw/omarchy-nag',
		href: 'https://github.com/jankeesvw/omarchy-nag',
		blurb: 'Disposable alarms — calendar user timers become a wall-clock sleeper.'
	},
	{
		id: 'omamail',
		label: 'Omamail',
		upstream: 'huacnlee/omamail',
		href: 'https://github.com/huacnlee/omamail',
		blurb: 'Gmail / HEY / JMAP / IMAP email client with a Rust backend, v0.9.0.'
	}
];

export const KEYBINDINGS: [string, string][] = [
	['Super+Return', 'terminal'],
	['Super+Space / Alt+F2', 'Omarchy menu / run a command'],
	['Super+Esc', 'power menu'],
	['Super+K', 'keybinding help'],
	['Alt+Ctrl+T', 'theme picker'],
	['Super+Ctrl+A / B / W / P', 'audio / bluetooth / network / power'],
	['Super+Ctrl+O / Super+Ctrl+S', 'Control Panel / Settings'],
	['Super+Ctrl+D', 'display settings'],
	['Super+Ctrl+C / Super+Ctrl+L', 'screenshot / lock'],
	['Super+1…0', 'workspaces (global)'],
	['Super+Tab', 'next workspace on this monitor'],
	['Super+Alt+arrows', 'move window to adjacent monitor']
];

export const INSTALL: string[] = [
	'git clone https://github.com/aozora/omaxian ~/projects/omaxian',
	'cd ~/projects/omaxian',
	'sudo ./setup.sh          # packages, fonts, session D-Bus',
	'./install.sh             # themes + omarchy-* commands',
	'./deploy.sh              # i3 / Quickshell / ~/.xsessionrc'
];

export interface Shot {
	src: string;
	label: string;
	desc: string;
}

export const SHOTS: Shot[] = [
	{ src: '/shots/menu.webp', label: 'Menu', desc: 'Apps and omarchy-* commands in one launcher.' },
	{ src: '/shots/media.webp', label: 'Media', desc: 'MPD alongside every MPRIS player.' },
	{
		src: '/shots/weather.webp',
		label: 'Weather',
		desc: 'Forecast popup straight from the bar widget.'
	},
	{
		src: '/shots/settings.webp',
		label: 'Settings',
		desc: 'Bar, dock, widgets and startup apps — no text editor needed.'
	},
	{
		src: '/shots/key-bindings.webp',
		label: 'Key bindings',
		desc: 'Super+K cheat-sheet of this session’s binds.'
	},
	{
		src: '/shots/control-panel.webp',
		label: 'Control Panel',
		desc: 'Audio, Bluetooth, wallpaper, theme and monitors.'
	},
	{ src: '/shots/power-menu.webp', label: 'Power menu', desc: 'Lock, suspend, reboot, shut down.' }
];

export const NOT_1_1: string[] = [
	'Click-outside does not always close a popup — a widget anchored to the bar may stay open if you click into another window. Close it with Escape, the same widget, or the same keybind.',
	'No dimming overlay. Full-screen Omarchy scrims would go black under picom; panels are small popups instead.',
	'The bar cannot be dragged to another screen or reordered by dragging widgets — you edit it in Settings.',
	'There is no uwsm; commands fall back to ${OMARCHY_PATH:=$HOME/.local/share/omarchy}.',
	'Reminders use sleep, not systemd timers. Night light is redshift, not hyprsunset.',
	'It is the same shell running on X11/i3 — not a Hyprland session.'
];

export const STACK: string[] = [
	'Devuan / Debian',
	'X11 · XLibre',
	'i3',
	'Quickshell',
	'picom',
	'dunst',
	'elogind',
	'apt'
];

export const CREDITS = [
	{ label: 'Omarchy', by: 'DHH & 37signals — the project Omaxian is based on', href: OMARCHY },
	{ label: 'Quickshell', by: 'outfoxxed — the shell toolkit', href: QUICKSHELL },
	{
		label: 'i3 base config',
		by: 'derived from Archcraft',
		href: 'https://github.com/archcraft-os/archcraft-i3wm'
	}
];
