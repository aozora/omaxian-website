// Shared content for the Omaxian OS page.
// Release metadata matches the published 0.2 images at download.omaxian.org/releases/0.2/.
// Last synced: 2026-11-15 — Omaxian OS 0.2 “Space Cat” (shell v1.1.3, kernel 7.2.12).
// All nine community apps ship with the desktop. The installer chooses Strata or Folio.

import type { Shot } from '#lib/omaxian';

export const OS_REPO = 'https://github.com/aozora/omaxian-os';

export const OS_VERSION = '0.2';
export const OS_CODENAME = 'Space Cat';
/** Filename slug for OS_CODENAME, as published in the ISO names. */
const OS_CODENAME_SLUG = 'space-cat';
export const OS_BASE = 'Devuan 6 “Excalibur”';

export const OS_TAGLINE = 'A Devuan-based Linux distribution with Omaxian as the desktop';

export const OS_PITCH =
	'Omaxian OS is a ready-to-install system built on Devuan 6 “Excalibur”, with Omaxian shell v1.1.3 on i3 as the only session and opinionated defaults: no systemd, the XLibre X server, PipeWire, kernel 7.2.12 and a curated set of apps.';

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
		3_065_659_392,
		'45aeaef9ef2884c9932edd8407879786c2910b3ea5576f1a51dbd0e626c2b590',
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
		8_967_221_248,
		'd0437b326d8f484cf4e0745b29d9608adcbdf0eec059d8f74d0551f5f366f5d8',
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
		title: 'No systemd',
		blurb: 'sysvinit, eudev and elogind. The build refuses an image that pulls systemd in.'
	},
	{
		title: 'Omaxian desktop',
		blurb: 'Omaxian shell v1.1.3 on i3 is the only session. XFCE and Thunar are not included.'
	},
	{
		title: 'File manager and community apps',
		blurb:
			'The installer has a page to choose the default file manager, Strata or Folio. All nine community apps are installed by default: Disktree, Folio, Monologue, Omacalc, Omacut, Meeting Recorder, Omawrite, Plain and Signed.'
	},
	{
		title: 'XLibre and PipeWire',
		blurb: 'XLibre X server, PipeWire per user and kernel 7.2.12.'
	},
	{
		title: 'Laptop hardware',
		blurb:
			'thermald, sensors, Thunderbolt, Intel/SOF audio firmware, and newer firmware from backports.'
	},
	{
		title: 'Live session and Calamares installer',
		blurb:
			'Try it from USB, then install with encryption, LVM or btrfs. Boots and installs on BIOS and UEFI.'
	},
	{
		title: 'Pick your apps at install time',
		blurb:
			'Chromium, Thunderbird, graphics, Telegram, containers and virtualization are optional groups.'
	},
	{
		title: 'Branded end to end',
		blurb: 'GRUB theme, Plymouth splash, LightDM greeter and wallpapers match the desktop.'
	}
];

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
	}
];
