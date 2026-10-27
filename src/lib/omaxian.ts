// Shared content for the Omaxian landing pages.
// Sourced from github.com/aozora/omaxian (README, install-scripts.md,
// community-plugins/README.md). Last synced: 2026-10-18.

export const REPO = 'https://github.com/aozora/omaxian';
export const LATEST_RELEASE = 'https://github.com/aozora/omaxian/releases/latest';
export const OMARCHY = 'https://omarchy.org';
export const QUICKSHELL = 'https://quickshell.org';
export const QUICKSHELL_INSTALL = 'https://quickshell.org/docs/guide/install/';
export const COMMUNITY_PLUGINS_DIR = `${REPO}/tree/main/community-plugins`;

// Site-wide (index page): the two ways to get Omaxian.
export const SITE_TAGLINE =
	'The Omarchy desktop on X11 — as a shell for your Debian, or as a whole OS';

export const SITE_PITCH =
	'Omaxian carries the Omarchy shell to X11 / XLibre and i3, without Wayland or systemd. Install it as a shell on the Debian-family system you already run, or boot Omaxian OS, a Devuan-based distribution that ships it as the default desktop.';

export const TAGLINE = 'A port of the Omarchy shell to debian-based distros on X11 / XLibre + i3';

export const PITCH =
	'Omaxian brings the Omarchy shell — its bar, dock, menu, themes and omarchy-* commands — to the Debian family on X11 / XLibre and i3, with no Wayland, no Hyprland and no dependency on systemd or other init systems.';

// The important caveat, kept to one line: this is the shell, not the OS.
export const SCOPE =
	'Not a distribution — it ports only the shell, and X11 differs from Wayland, so compatibility with Omarchy is partial.';

// Prominent credit to the upstream project.
export const ATTRIBUTION =
	'Omaxian is built on Omarchy by DHH and 37signals, and reuses its shell, themes and omarchy-* command set under the MIT licence. Omarchy is the original; Omaxian only carries it to X11.';

// Distributions Omaxian is regularly tested against.
export const TESTED_ON: string[] = ['Debian 13', 'Devuan Excalibur', 'Xubuntu 26'];

// Ubuntu 26.04 dropped X11 outright, so "Ubuntu" alone no longer works.
export const UBUNTU_NOTE =
	'Stock Ubuntu 26.04 ships without X11 — use Xubuntu, or `sudo apt install xubuntu-desktop`.';

export const REQUIREMENTS = 'An X11 session with i3. Log out and back in after installing.';

/** Full docs, install variants, community plugins and caveats live in the repo. */
export const DOCS = `${REPO}/tree/main/docs/omaxian`;

export interface Feature {
	title: string;
	blurb: string;
	key?: string;
}

export const FEATURES: Feature[] = [
	{
		title: 'Control Panel',
		key: 'Super+Ctrl+O',
		blurb: 'Audio, Bluetooth, wallpaper, theme and monitors in one popup.'
	},
	{
		title: 'Settings',
		key: 'Super+Ctrl+S',
		blurb: 'Bar, dock, fonts and startup apps in a real window — no config files.'
	},
	{
		title: 'Dock',
		blurb: 'Pinned apps, running-app dots and hover magnification.'
	},
	{
		title: 'Display profiles',
		key: 'Super+Ctrl+D',
		blurb: 'Resolution, position and on/off per monitor, saved per layout.'
	},
	{
		title: 'Media widget',
		blurb: 'MPD and every MPRIS player behind one control.'
	},
	{
		title: 'Community plugins',
		blurb: 'Opt-in weather, calculator, email and more — each checked with omarchy-plugin-check.'
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

/** One-shot curl|bash entry (recommended). */
export const INSTALL_ONESHOT: string[] = [
	'curl -fsSL https://raw.githubusercontent.com/aozora/omaxian/main/bootstrap.sh | bash'
];

export const QUICKSHELL_NOTE =
	'The shell needs Quickshell ≥ 0.2. Debian 13+ has it in apt; on older Debian or Devuan, build it from source.';

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
	}
];

export const CREDITS = [
	{ label: 'Omarchy', by: 'DHH & 37signals — the project Omaxian is based on', href: OMARCHY },
	{ label: 'Quickshell', by: 'outfoxxed — the shell toolkit', href: QUICKSHELL },
	{
		label: 'i3 base config',
		by: 'derived from Archcraft',
		href: 'https://github.com/archcraft-os/archcraft-i3wm'
	},
	{
		label: 'Devuan',
		by: 'the systemd-free Debian that Omaxian OS is built on',
		href: 'https://www.devuan.org'
	},
	{
		label: 'XLibre',
		by: 'the X server shipped by Omaxian OS',
		href: 'https://github.com/X11Libre/xserver'
	}
];
