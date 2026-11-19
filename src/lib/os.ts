// Shared content for the Omaxian OS page.
// Release metadata matches the published 0.2.1 images at download.omaxian.org/releases/0.2.1/.
// Last synced: 2026-11-16 — Omaxian OS 0.2.1 “Space Cat” (shell v1.2.2, kernel 7.2.12).
// All nine community apps ship from pinned pre-built binaries. The installer chooses Strata or Folio.

import { SHELL_VERSION, type Shot } from '#lib/omaxian';

export const OS_REPO = 'https://github.com/aozora/omaxian-os';

export const OS_VERSION = '0.2.1';
export const OS_CODENAME = 'Space Cat';
/** Filename slug for OS_CODENAME, as published in the ISO names. */
const OS_CODENAME_SLUG = 'space-cat';
export const OS_BASE = 'Devuan 6 “Excalibur”';

export const OS_TAGLINE = 'A Devuan-based Linux distribution with Omaxian as the desktop';

export const OS_PITCH = `Omaxian OS is a ready-to-install system built on Devuan 6 “Excalibur”, with Omaxian shell v${SHELL_VERSION} on i3 as the only session and opinionated defaults: no systemd, the XLibre X server, PipeWire, kernel 7.2.12 and a curated set of apps.`;

export const OS_SCOPE =
	'Already running Debian, Devuan or Xubuntu? You only need the shell. Starting from a blank disk? This is the shortest way to the whole desktop.';

const DOWNLOAD_BASE = `https://download.omaxian.org/releases/${OS_VERSION}`;

export interface Iso {
	id: 'base' | 'full';
	label: string;
	file: string;
	href: string;
	sha256Href: string;
	/** Published sha256 digest of the ISO file. */
	sha256: string;
	/** Published size in bytes, grouped for display (for example "3,065,659,392 bytes"). */
	bytesLabel: string;
	/** Decimal gigabytes, rounded to two places from the published byte count. */
	size: string;
	blurb: string;
	points: string[];
}

function formatBytes(bytes: number): string {
	return `${bytes.toLocaleString('en-US')} bytes`;
}

function formatGigabytes(bytes: number): string {
	return `${(bytes / 1_000_000_000).toFixed(2)} GB`;
}

function isoFile(id: Iso['id']): string {
	return `omaxian-${id}-${OS_VERSION}-${OS_CODENAME_SLUG}-amd64.iso`;
}

function iso(
	id: Iso['id'],
	label: string,
	bytes: number,
	sha256: string,
	blurb: string,
	points: string[]
): Iso {
	const file = isoFile(id);
	return {
		id,
		label,
		file,
		href: `${DOWNLOAD_BASE}/${file}`,
		sha256Href: `${DOWNLOAD_BASE}/${file}.sha256`,
		sha256,
		bytesLabel: formatBytes(bytes),
		size: formatGigabytes(bytes),
		blurb,
		points
	};
}

export const ISOS: Iso[] = [
	iso(
		'base',
		'Base',
		3_065_556_992,
		'c39a5e25a3a3d096b77d1fc29b1901b49832325b5002367374d1a5ddbda4ee22',
		'Desktop and core apps. The rest comes from the network.',
		[
			'Optional app groups are picked in the installer and downloaded during install',
			'If you install offline, optional picks are applied by the first-boot service once online',
			'Flatpaks and AppImages are fetched on first boot'
		]
	),
	iso(
		'full',
		'Full',
		8_966_062_080,
		'0404e1d251f10af521bf2c78b6f2718be9e5ca22b68c71e453fa8c4ec2f4e543',
		'Everything on the disc. Installs without a network.',
		[
			'Offline package pool for every optional app group',
			'Flatpaks preinstalled, AppImages and OpenRA content bundled',
			'Extra opt-in group: voice dictation (VoxType)'
		]
	)
];

export const OS_REQUIREMENTS =
	'64-bit x86 PC (amd64), BIOS or UEFI, 2 GB RAM, 20 GB disk. Base ISO installs want a network.';

/** Combined checksum file for every image in this release. */
export const OS_SHA256SUMS_HREF = `${DOWNLOAD_BASE}/SHA256SUMS`;

/** Shell steps to verify and flash a downloaded ISO. */
export const OS_VERIFY: string[] = [
	`sha256sum -c ${isoFile('base')}.sha256`,
	`sudo dd if=${isoFile('base')} of=/dev/sdX bs=4M status=progress oflag=sync`
];

export interface OsFeature {
	title: string;
	blurb: string;
}

export const OS_FEATURES: OsFeature[] = [
	{
		title: 'Try it before you install it',
		blurb:
			'The ISO boots into a full live session from a USB stick. Your disk is left alone until you start the installer.'
	},
	{
		title: 'A graphical installer',
		blurb:
			'Calamares, with disk encryption, LVM or btrfs. It installs on BIOS and UEFI and sets up the matching GRUB.'
	},
	{
		title: 'Pick your apps at install time',
		blurb:
			'Chromium, Thunderbird, graphics, Telegram, containers and virtualization are optional groups. Untick what you don’t want.'
	},
	{
		title: 'Strata or Folio',
		blurb:
			'The installer asks which file manager should be the default. Both stay installed, and omaxian-default-file-manager switches later.'
	},
	{
		title: 'Laptop hardware, without systemd',
		blurb:
			'thermald, sensors, GPU switching and Thunderbolt get sysvinit scripts that stay idle when the hardware is absent. Intel, Cirrus and SOF audio firmware comes from backports.'
	},
	{
		title: 'One look from boot to desktop',
		blurb: 'GRUB theme, Plymouth splash, LightDM greeter and wallpapers all match the desktop.'
	}
];

export interface StackLayer {
	layer: string;
	what: string;
	note: string;
}

/** The system from what you see down to the firmware. */
export const OS_STACK: StackLayer[] = [
	{
		layer: 'Apps',
		what: 'Nine community apps, two browsers, and your picks',
		note: 'Brave and LibreWolf by default. Optional groups are chosen in the installer.'
	},
	{
		layer: 'Desktop',
		what: `Omaxian shell v${SHELL_VERSION}`,
		note: 'Bar, dock, menu, panels and themes from Omarchy, drawn with Quickshell.'
	},
	{
		layer: 'Window manager',
		what: 'i3',
		note: 'The only session. There is no second desktop to fall back on, and no XFCE.'
	},
	{
		layer: 'Display',
		what: 'XLibre X server',
		note: 'X11, not Wayland.'
	},
	{
		layer: 'Audio',
		what: 'PipeWire, per user',
		note: 'No PulseAudio daemon.'
	},
	{
		layer: 'Init',
		what: 'sysvinit, eudev and elogind',
		note: 'No systemd anywhere in the image.'
	},
	{
		layer: 'Kernel',
		what: 'Linux 7.2.12',
		note: 'From excalibur-backports, along with newer firmware. Unprivileged BPF is off.'
	},
	{
		layer: 'Base',
		what: OS_BASE,
		note: 'Debian trixie packages, managed with apt as usual.'
	},
	{
		layer: 'Boot',
		what: 'GRUB on BIOS and UEFI',
		note: 'Per-model kernel options are picked at boot from the machine’s SMBIOS data.'
	}
];

export interface OsStep {
	title: string;
	text: string;
}

export const OS_STEPS: OsStep[] = [
	{
		title: 'Download and verify',
		text: 'Pick an image above, then check it against its .sha256 file.'
	},
	{
		title: 'Write it to a USB stick',
		text: 'dd works, and so does any image writer you already use. 4 GB is enough for Base, 16 GB for Full.'
	},
	{
		title: 'Boot, look around, install',
		text: 'Start the live session and try the desktop. When you’re ready, the installer is in the menu.'
	}
];

export interface TermLine {
	cmd: string;
	note?: string;
}

/** Adding optional groups and apps on an installed system. */
export const OS_OPTIONAL: TermLine[] = [
	{ cmd: 'omaxian-optional', note: 'interactive menu' },
	{ cmd: 'omaxian-optional list', note: 'groups and AppImages, with status' },
	{ cmd: 'omaxian-optional install containers shotcut' }
];

export const OS_FIT = {
	yes: [
		'You like tiling window managers, or want to try one that arrives already set up.',
		'You want a Debian-family system without systemd.',
		'You prefer X11 and the tools built around it.',
		'You like the look of Omarchy but don’t run Arch or Wayland.',
		'You’d rather boot a USB stick and look around before committing a disk.'
	],
	no: [
		'You want Wayland and Hyprland. That is Omarchy itself.',
		'Your machine isn’t a 64-bit x86 PC. There are no ARM images.',
		'You rely on software that needs systemd.',
		`You want a distribution with years behind it. This is version ${OS_VERSION}.`
	]
};

export interface AppGroup {
	title: string;
	note: string;
	apps: string[];
}

export const OS_APPS: AppGroup[] = [
	{
		title: 'Always installed',
		note: 'Installed by default. The installer asks you to pick Strata or Folio as the file manager.',
		apps: [
			'Strata',
			'Disktree',
			'Folio',
			'Monologue',
			'Omacalc',
			'Omacut',
			'Meeting Recorder',
			'Omawrite',
			'Plain',
			'Signed',
			'Brave',
			'LibreWolf',
			'KeePassXC',
			'VLC and mpv',
			'qBittorrent',
			'FileZilla',
			'Remmina',
			'Timeshift',
			'GParted',
			'Flameshot',
			'btop',
			'Tor Browser launcher',
			'yt-dlp'
		]
	},
	{
		title: 'Optional groups',
		note: 'Ticked in the installer',
		apps: [
			'Chromium',
			'Thunderbird',
			'GIMP, Inkscape and Krita',
			'Telegram',
			'Podman, Buildah and Distrobox',
			'QEMU/KVM, virt-manager and GNOME Boxes'
		]
	},
	{
		title: 'Flatpaks and AppImages',
		note: 'Set up on first boot, managed by Gear Lever',
		apps: [
			'Discord',
			'Zoom',
			'Proton Mail Bridge',
			'Podman Desktop',
			'GPU Screen Recorder',
			'Obsidian',
			'ONLYOFFICE',
			'LocalSend',
			'RustDesk',
			'Shotcut',
			'OpenRA'
		]
	}
];

export interface OsReleaseNote {
	version: string;
	points: string[];
}

/** Newest first. Describes what changed in a point release; the rest of this file describes the current images. */
export const OS_RELEASE_NOTES: OsReleaseNote[] = [
	{
		version: '0.2.1',
		points: [
			`Omaxian shell v${SHELL_VERSION}. 0.2 shipped shell v1.1.3. The codename is still Space Cat. Devuan packages are unchanged, and the kernel is still 7.2.12.`,
			'All nine community apps install from pinned pre-built binaries: Disktree, Folio, Monologue, Omacalc, Omacut, Meeting Recorder, Omawrite, Plain and Signed.',
			'Folio and Monologue run on Devuan 6’s Qt 6.8 without local patches, using the upstream pinned binaries.',
			'The apt repository is still apt.omaxian.org, with omaxian-session 1.2.2-1 and omaxian-base 0.2.1.'
		]
	}
];

export const OS_NOTES: string[] = [
	'The live session logs in as user omaxian, in English. You can pick another language in the Calamares installer.',
	'Man pages and docs are left off the live image. On an installed system, sudo omaxian-restore-docs puts them back.',
	'Voice dictation (VoxType) on the full ISO needs an x86-64-v2 CPU. On older CPUs it refuses to install, cleanly.'
];

export const OS_SHOTS: Shot[] = [
	{
		src: '/src/lib/assets/os-shots/grub-menu.png',
		label: 'Boot menu',
		desc: 'Themed GRUB on the live ISO: try or install, BIOS and UEFI.'
	},
	{
		src: '/src/lib/assets/os-shots/installer-welcome.png',
		label: 'Installer',
		desc: 'Calamares, running inside the live Omaxian session.'
	},
	{
		src: '/src/lib/assets/os-shots/installer-apps.png',
		label: 'Applications',
		desc: 'Optional app groups, picked at install time.'
	},
	{
		src: '/src/lib/assets/os-shots/installer-slideshow.png',
		label: 'Installing',
		desc: 'sysvinit, XLibre, i3 and Quickshell. No systemd.'
	},
	{
		src: '/src/lib/assets/os-shots/boot-splash.png',
		label: 'Boot splash',
		desc: 'The Plymouth “omaxian” theme.'
	},
	{
		src: '/src/lib/assets/os-shots/greeter.png',
		label: 'Greeter',
		desc: 'LightDM greeter, themed to match.'
	},
	{
		src: '/src/lib/assets/os-shots/desktop.png',
		label: 'Desktop',
		desc: 'The installed system: the Omaxian shell on i3.'
	}
];
