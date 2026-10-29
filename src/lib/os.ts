// Shared content for the Omaxian OS page.
// Sourced from github.com/aozora/omaxian-os (README, config/, docs/test-report-0.1.md).
// Last synced: 2026-10-29 — ISO sizes and sha256 digests for 0.1.

import type { Shot } from '#lib/omaxian';

export const OS_REPO = 'https://github.com/aozora/omaxian-os';

export const OS_VERSION = '0.1';
export const OS_CODENAME = 'Trans-Siberian Shaman';
export const OS_BASE = 'Devuan 6 “Excalibur”';

export const OS_TAGLINE = 'A Devuan-based Linux distribution with Omaxian as the desktop';

export const OS_PITCH =
	'Omaxian OS is a ready-to-install system built on Devuan 6 “Excalibur”, with the Omaxian shell as the default session and opinionated defaults: no systemd, the XLibre X server, PipeWire, a recent kernel and a curated set of apps.';

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
	size: string;
	blurb: string;
	points: string[];
}

function iso(
	id: Iso['id'],
	label: string,
	size: string,
	sha256: string,
	blurb: string,
	points: string[]
): Iso {
	const file = `omaxian-${id}-${OS_VERSION}-trans-siberian-shaman-amd64.iso`;
	return {
		id,
		label,
		file,
		href: `${DOWNLOAD_BASE}/${file}`,
		sha256Href: `${DOWNLOAD_BASE}/${file}.sha256`,
		sha256,
		size,
		blurb,
		points
	};
}

export const ISOS: Iso[] = [
	iso(
		'base',
		'Base',
		'2.47 GB',
		'36567093a0986383e101679e1e6dead5b4321305bafd269749b1c32dd109257f',
		'Desktop and core apps. The rest comes from the network.',
		[
			'Optional app groups are picked in the installer and downloaded during install',
			'Offline install? The picks are installed by the first-boot service once online',
			'Flatpaks and AppImages are fetched on first boot'
		]
	),
	iso(
		'full',
		'Full',
		'8.87 GB',
		'ad4a51a29a8d45feeb4cca84db374b1b888d01ca25f1b04d21a62d493bc2e01a',
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

/** Shell steps to verify and flash a downloaded ISO. */
export const OS_VERIFY: string[] = [
	'sha256sum -c omaxian-base-0.1-trans-siberian-shaman-amd64.iso.sha256',
	'sudo dd if=omaxian-base-0.1-trans-siberian-shaman-amd64.iso of=/dev/sdX bs=4M status=progress oflag=sync'
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
		blurb: 'Omaxian with Omarchy vendored is the default session. XFCE is there as an alternative.'
	},
	{
		title: 'XLibre and PipeWire',
		blurb: 'XLibre X server, PipeWire per user and kernel 7.2 from excalibur-backports.'
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
		note: 'From Devuan and extrepo',
		apps: [
			'Brave',
			'LibreWolf',
			'Strata file manager',
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
