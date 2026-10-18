// Shared content for the Omaxian landing pages.
// Sourced from github.com/aozora/omaxian (README, install-scripts.md,
// community-plugins/README.md). Last synced: 2026-10-18.

export const REPO = 'https://github.com/aozora/omaxian';
export const LATEST_RELEASE = 'https://github.com/aozora/omaxian/releases/latest';
export const OMARCHY = 'https://omarchy.org';
export const QUICKSHELL = 'https://quickshell.org';
export const QUICKSHELL_INSTALL = 'https://quickshell.org/docs/guide/install/';
export const QUICKSHELL_UBUNTU =
	'https://quickshell.org/docs/v0.3.0/guide/install-setup/#ubuntu';
export const COMMUNITY_PLUGINS_DIR = `${REPO}/tree/main/community-plugins`;
export const INSTALL_SCRIPTS_DOC = `${REPO}/blob/main/docs/omaxian/install-scripts.md`;

export const TAGLINE = 'A port of the Omarchy shell to debian-based distros on X11 / XLibre + i3';

// The name, spelled out. omakase (Omarchy's ethos) + X11 + Debian.
export const ETYMOLOGY = 'omakase + x11 + debian';

export const PITCH =
	'Omaxian brings the Omarchy shell — its bar, dock, menu, themes and omarchy-* commands — to the Debian family on X11 / XLibre and i3, with no Wayland, no Hyprland and no dependency on systemd or other init systems.';

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

export const UBUNTU_QUICKSHELL_NOTE =
	'For Quickshell on Ubuntu, follow the Quickshell Ubuntu install guide (Omaxian still needs X11 — Xubuntu or xubuntu-desktop).';

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
			'A real window to edit bar layout, dock chrome, plugins, fonts and startup apps — including a dual-pane arrange UI for bar widgets (Omarchy’s on-bar drag gestures are not ported).'
	},
	{
		title: 'Floating island bar',
		blurb:
			'Optional inset, rounded bar chrome — the same idea as the dock’s pill. A Settings → Bar toggle, not a rebuild.'
	},
	{
		title: 'Dock',
		blurb:
			'A persistent bottom dock: pinned apps, running-app dots, hover magnification. First-party here; upstream’s dock is a separate community plugin.'
	},
	{
		title: 'Display profiles',
		key: 'Super+Ctrl+D',
		blurb:
			'xrandr resolution / on / off / primary / position, with layouts saved per output topology and laptop-lid handling.'
	},
	{
		title: 'Community plugins',
		blurb:
			'Curated third-party ports — weather, radar, calculator, email and more — install opt-in via the omaxian-install.sh TUI or install-community-plugins.sh under ~/.config/omarchy/plugins/, vetted by omarchy-plugin-check, -validate and -update.'
	},
	{
		title: 'omarchy-plugin-check',
		blurb:
			'Static check of a community plugin against this X11 port (Wayland / Hyprland / PipeWire / systemd couplings). Upstream only has schema validation.'
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
		title: 'Debian / Devuan session',
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

// Opt-in; not installed by scripts/setup.sh, install.sh, or deploy.sh.
// Install via omaxian-install.sh TUI or scripts/install-community-plugins.sh.
export const COMMUNITY_PLUGINS: CommunityPlugin[] = [
	{
		id: 'jankeesvw.nag',
		label: 'Nag',
		upstream: 'jankeesvw/omarchy-nag',
		href: 'https://github.com/jankeesvw/omarchy-nag',
		blurb: 'Disposable alarms — type a wall-clock time and the bar counts down to it.'
	},
	{
		id: 'io.github.guiestrela.weather',
		label: 'Better Weather',
		upstream: 'guiestrela/weather',
		href: 'https://github.com/guiestrela/weather',
		blurb: 'Open-Meteo, wttr.in and RainViewer forecasts on the bar.'
	},
	{
		id: 'io.github.kaiizu.runcat',
		label: 'Running Cat',
		upstream: 'kaiizu/runningcat',
		href: 'https://github.com/kaiizu/runningcat',
		blurb: 'RunCat-style CPU cat on the bar — runs with load, sleeps when idle.'
	},
	{
		id: 'harshith.system-monitor',
		label: 'System Monitor',
		upstream: 'Harshith292002/omarchy-system-monitor',
		href: 'https://github.com/Harshith292002/omarchy-system-monitor',
		blurb: 'Low-overhead /proc and /sys dashboard with btop launch from the bar.'
	},
	{
		id: 'josh2c.protonpass',
		label: 'Proton Pass',
		upstream: 'josh2c/omarchy-protonpass',
		href: 'https://github.com/josh2c/omarchy-protonpass',
		blurb: 'Proton Pass search and copy via pass-cli — username, password, or TOTP from the bar.'
	},
	{
		id: 'omaxian-speaker-pulseaudio-calibrator',
		label: 'Speaker Calibrator (PulseAudio)',
		upstream: 'thefreshoffice/omarchy-speaker-calibrator',
		href: 'https://github.com/thefreshoffice/omarchy-speaker-calibrator',
		blurb: 'Microphone-driven parametric speaker tuning for PulseAudio.'
	},
	{
		id: 'omaxian-speaker-pipewire-calibrator',
		label: 'Speaker Calibrator (PipeWire)',
		upstream: 'thefreshoffice/omarchy-speaker-calibrator',
		href: 'https://github.com/thefreshoffice/omarchy-speaker-calibrator',
		blurb: 'Microphone-driven parametric speaker tuning for PipeWire.'
	},
	{
		id: 'omamail',
		label: 'Omamail',
		upstream: 'huacnlee/omamail',
		href: 'https://github.com/huacnlee/omamail',
		blurb: 'Gmail / HEY / JMAP / IMAP email client with a Rust backend.'
	},
	{
		id: 'io.github.adamcbrewer.voxtype-aura',
		label: 'Voxtype Aura',
		upstream: 'adamcbrewer/voxtype-aura',
		href: 'https://github.com/adamcbrewer/voxtype-aura',
		blurb: 'Theme-aware Voxtype dictation overlay for the shell.'
	},
	{
		id: 'io.github.canclini.calculator',
		label: 'Calculator',
		upstream: 'canclini/omarchy-calculator',
		href: 'https://github.com/canclini/omarchy-calculator',
		blurb: 'Spotlight-style quick calculator — result as you type, Enter copies it.'
	},
	{
		id: 'com.omastorm.radar',
		label: 'Omastorm',
		upstream: 'wesleygrimes/omastorm',
		href: 'https://github.com/wesleygrimes/omastorm',
		blurb: 'Live NEXRAD / OPERA weather radar in a native shell window.'
	},
	{
		id: 'io.github.kristoferlund.webcam',
		label: 'Webcam Controls',
		upstream: 'kristoferlund/omarchy-webcam',
		href: 'https://github.com/kristoferlund/omarchy-webcam',
		blurb: 'V4L2 webcam preview and device controls from the bar.'
	},
	{
		id: 'alexzeitler.ytdlp',
		label: 'yt-dlp',
		upstream: 'AlexZeitler/omarchy-yt-dlp-plugin',
		href: 'https://github.com/AlexZeitler/omarchy-yt-dlp-plugin',
		blurb: 'Download queue for yt-dlp — paste a link, pick video or audio, run from the bar.'
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

/** One-shot curl|bash entry (recommended). */
export const INSTALL_ONESHOT: string[] = [
	'curl -fsSL https://raw.githubusercontent.com/aozora/omaxian/main/bootstrap.sh | bash'
];

/** After cloning: TUI installer (and noninteractive flag). */
export const INSTALL_CLONE: string[] = [
	'git clone https://github.com/aozora/omaxian.git ~/projects/omaxian',
	'cd ~/projects/omaxian',
	'./omaxian-install.sh'
];

/** Noninteractive desktop-only install (no community plugins). */
export const INSTALL_NONINTERACTIVE = './omaxian-install.sh --yes';

/** Advanced / re-run path under scripts/. */
export const INSTALL_ADVANCED: string[] = [
	'sudo ./scripts/setup.sh          # packages, fonts, session D-Bus',
	'./scripts/install.sh             # themes + omarchy-* commands',
	'./scripts/deploy.sh              # i3 / Quickshell / ~/.xsessionrc'
];

/** Back-compat alias used by older copy helpers — prefers the one-shot. */
export const INSTALL: string[] = INSTALL_ONESHOT;

export const INSTALL_AFTER: string[] = [
	'omarchy-shell shell ping                 # → ok',
	'omarchy-shell shell listPlugins | jq length   # → ~37',
	'pgrep -x quickshell                      # one process'
];

export const QUICKSHELL_NOTE =
	'The shell needs Quickshell ≥ 0.2 (0.3.x tested). Debian 13+ can apt install quickshell. On Debian < 13 / Devuan it is often only in testing (Forky / Freia) — setup.sh warns and skips it; pin testing or build from source.';

export interface Shot {
	src: string;
	label: string;
	desc: string;
}

export const SHOTS: Shot[] = [
	{
		src: '/src/lib/assets/shots/menu-nebula-ridge.png',
		label: 'Menu',
		desc: 'Apps and omarchy-* commands in one launcher. Theme: Nebula Ridge.'
	},
	{
		src: '/src/lib/assets/shots/media-everforest.png',
		label: 'Media',
		desc: 'MPD alongside every MPRIS player. Theme: Everforest.'
	},
	{
		src: '/src/lib/assets/shots/weather-matte-black.png',
		label: 'Weather',
		desc: 'Forecast popup straight from the bar widget. Theme: Matte Black.'
	},
	{
		src: '/src/lib/assets/shots/settings-miasma.png',
		label: 'Settings',
		desc: 'Bar, dock, widgets and startup apps — no text editor needed. Theme: Miasma.'
	},
	{
		src: '/src/lib/assets/shots/key-bindings-retro82.png',
		label: 'Key bindings',
		desc: 'Super+K cheat-sheet of this session’s binds. Theme: Retro 82.'
	},
	{
		src: '/src/lib/assets/shots/control-panel-catpuccin.png',
		label: 'Control Panel',
		desc: 'Audio, Bluetooth, wallpaper, theme and monitors. Theme: Catppuccin.'
	},
	{
		src: '/src/lib/assets/shots/calendar-lupine.png',
		label: 'Calendar',
		desc: 'Calendar widget. Theme: Lupine.'
	},
	{
		src: '/src/lib/assets/shots/network-hackerman.png',
		label: 'Network',
		desc: 'Network widget. Theme: Hackerman.'
	},
	{
		src: '/src/lib/assets/shots/power-menu-vantablack.png',
		label: 'Power menu',
		desc: 'Lock, suspend, reboot, shut down. Theme: Vantablack.'
	}
];

export const NOT_1_1: string[] = [
	'Click-outside does not always close a popup — a widget anchored to the bar may stay open if you click into another window. Close it with Escape, the same widget, or the same keybind.',
	'Lock screen is i3lock-omaxian, not Omarchy’s Wayland session-lock plugin. Settings → Lock screen sets screenshot / image / random backgrounds, blur, and optional idle auto-lock via xss-lock + xset. Manual lock: Super+Ctrl+L. No in-shell password UI or fingerprint PAM.',
	'No dimming overlay. Full-screen Omarchy scrims would go black under picom; panels are small popups instead. Escape dismisses them.',
	'The bar cannot be dragged to another screen or reordered by dragging widgets — you edit it in Settings.',
	'Display panel is layout only (resolution, on/off, position). Omarchy’s brightness / fractional-scale panel is not ported — use brightness keys.',
	'Audio panel has no input VU meter; per-app rows show the raw app name.',
	'No Omarchy clipboard history, image carousel, agents, or built-in notification daemon — notifications stay on dunst. Theme picking is a thumbnail grid. The menu skips Arch Install/Remove trees and Hyprland-only actions. Emoji picker, OCR/QR capture, LocalSend share, and screen recording are ported; webcam overlay and dictation are not.',
	'Screen recording uses Flatpak com.dec05eba.gpu_screen_recorder (or gpu-screen-recorder on PATH) with an X11 region picker (slop).',
	'Share uses LocalSend (Flatpak org.localsend.localsend_app or a native localsend binary).',
	'There is no uwsm; commands fall back to ${OMARCHY_PATH:=$HOME/.local/share/omarchy}.',
	'Reminders use sleep, not systemd timers. Night light is redshift, not hyprsunset.',
	'i3 restart is not a full reload. Log out and back in after the first deploy, or run omarchy-restart-shell.',
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
