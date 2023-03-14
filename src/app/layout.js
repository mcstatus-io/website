import { Inter, Fira_Mono, Ubuntu } from 'next/font/google';
import Footer from '../components/Footer';
import './global.sass';

const interFont = Inter({
	variable: '--font-inter',
	display: 'swap'
});

const ubuntuFont = Ubuntu({
	variable: '--font-ubuntu',
	weight: ['400', '700'],
	display: 'swap'
});

const firaMonoFont = Fira_Mono({
	variable: '--font-fira-mono',
	weight: '400',
	display: 'swap'
});

export const metadata = {
	title: {
		default: 'Minecraft Server Status - Quickly retrieve the status of any Minecraft server',
		template: '%s - Minecraft Server Status'
	},
	description: 'Easily and quickly retrieve the status of any Java or Bedrock Edition Minecraft server by using our tool.',
	openGraph: {
		title: 'Minecraft Server Status - Quickly retrieve the status of any Minecraft server',
		description: 'Easily and quickly retrieve the status of any Java or Bedrock Edition Minecraft server by using our tool.',
		url: 'https://mcstatus.io',
		siteName: 'Minecraft Server Status',
		images: [
			{
				url: 'https://mcstatus.io/img/icon.png',
				width: 300,
				height: 300
			}
		],
		locale: 'en-US',
		type: 'website'
	},
	robots: {
		index: true,
		follow: true
	},
	icons: {
		icon: [
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/android-chrome-36x36.png', sizes: '36x36', type: 'image/png' },
			{ url: '/android-chrome-48x48.png', sizes: '48x48', type: 'image/png' },
			{ url: '/android-chrome-72x72.png', sizes: '72x72', type: 'image/png' },
			{ url: '/android-chrome-96x96.png', sizes: '96x96', type: 'image/png' },
			{ url: '/android-chrome-144x144.png', sizes: '144x144', type: 'image/png' },
			{ url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
			{ url: '/android-chrome-256x256.png', sizes: '256x256', type: 'image/png' },
		],
		apple: [
			{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
			{ url: '/apple-touch-icon-57x57.png', sizes: '57x57', type: 'image/png' },
			{ url: '/apple-touch-icon-60x60.png', sizes: '60x60', type: 'image/png' },
			{ url: '/apple-touch-icon-72x72.png', sizes: '72x72', type: 'image/png' },
			{ url: '/apple-touch-icon-76x76.png', sizes: '76x76', type: 'image/png' },
			{ url: '/apple-touch-icon-114x114.png', sizes: '114x114', type: 'image/png' },
			{ url: '/apple-touch-icon-120x120.png', sizes: '120x120', type: 'image/png' },
			{ url: '/apple-touch-icon-144x144.png', sizes: '144x144', type: 'image/png' },
			{ url: '/apple-touch-icon-152x152.png', sizes: '152x152', type: 'image/png' },
			{ url: '/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
		],
		other: [
			{ rel: 'apple-touch-icon-precomposed', url: '/apple-touch-icon-57x57-precomposed.png' },
			{ rel: 'apple-touch-icon-precomposed', url: '/apple-touch-icon-60x60-precomposed.png' },
			{ rel: 'apple-touch-icon-precomposed', url: '/apple-touch-icon-72x72-precomposed.png' },
			{ rel: 'apple-touch-icon-precomposed', url: '/apple-touch-icon-76x76-precomposed.png' },
			{ rel: 'apple-touch-icon-precomposed', url: '/apple-touch-icon-114x114-precomposed.png' },
			{ rel: 'apple-touch-icon-precomposed', url: '/apple-touch-icon-120x120-precomposed.png' },
			{ rel: 'apple-touch-icon-precomposed', url: '/apple-touch-icon-144x144-precomposed.png' },
			{ rel: 'apple-touch-icon-precomposed', url: '/apple-touch-icon-152x152-precomposed.png' },
			{ rel: 'apple-touch-icon-precomposed', url: '/apple-touch-icon-180x180-precomposed.png' },
			{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#2f2f2f' }
		]
	},
	themeColor: '#232323',
	manifest: 'https://mcstatus.io/site.webmanifest',
	alternates: {
		canonical: 'https://mcstatus.io'
	}
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${interFont.variable} ${firaMonoFont.variable} ${ubuntuFont.variable}`}>
			<head>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css" />
			</head>
			<body className="bg-white dark:bg-neutral-900 dark:text-white overflow-x-hidden w-[100vw] scroll-smooth">
				{children}
				<Footer />
			</body>
		</html>
	);
}
