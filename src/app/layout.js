import Script from 'next/script';
import { Inter, Fira_Mono, Ubuntu } from 'next/font/google';
import ServiceWorker from '../components/ServiceWorker';
import Container from '../components/Container';
import Footer from '../components/Footer';
import '../styles/global.sass';

const interFont = Inter({
	variable: '--font-inter',
	display: 'swap',
	subsets: ['latin'],
	fallback: ['Arial', 'sans-serif']
});

const ubuntuFont = Ubuntu({
	variable: '--font-ubuntu',
	weight: ['400', '700'],
	display: 'swap',
	subsets: ['latin'],
	fallback: ['Verdana', 'sans-serif']
});

const firaMonoFont = Fira_Mono({
	variable: '--font-fira-mono',
	weight: ['400', '700'],
	display: 'swap',
	subsets: ['latin'],
	fallback: ['Courier New', 'monospace']
});

export const metadata = {
	title: {
		default: 'Minecraft Server Status - Get the status of any Minecraft server',
		template: '%s - Minecraft Server Status'
	},
	description: 'Easily and quickly retrieve the status of any Java or Bedrock Edition Minecraft server by using our tool.',
	metadataBase: new URL('https://mcstatus.io'),
	openGraph: {
		title: 'Minecraft Server Status - Get the status of any Minecraft server',
		description: 'Easily and quickly retrieve the status of any Java or Bedrock Edition Minecraft server by using our tool.',
		url: '/',
		siteName: 'Minecraft Server Status',
		images: [
			{
				url: '/img/icon.png',
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
			{ url: '/img/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/img/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/img/android-chrome-36x36.png', sizes: '36x36', type: 'image/png' },
			{ url: '/img/android-chrome-48x48.png', sizes: '48x48', type: 'image/png' },
			{ url: '/img/android-chrome-72x72.png', sizes: '72x72', type: 'image/png' },
			{ url: '/img/android-chrome-96x96.png', sizes: '96x96', type: 'image/png' },
			{ url: '/img/android-chrome-144x144.png', sizes: '144x144', type: 'image/png' },
			{ url: '/img/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
			{ url: '/img/android-chrome-256x256.png', sizes: '256x256', type: 'image/png' },
			{ url: '/img/android-chrome-384x384.png', sizes: '384x384', type: 'image/png' },
			{ url: '/img/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
		],
		apple: [
			{ url: '/img/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
			{ url: '/img/apple-touch-icon-57x57.png', sizes: '57x57', type: 'image/png' },
			{ url: '/img/apple-touch-icon-60x60.png', sizes: '60x60', type: 'image/png' },
			{ url: '/img/apple-touch-icon-72x72.png', sizes: '72x72', type: 'image/png' },
			{ url: '/img/apple-touch-icon-76x76.png', sizes: '76x76', type: 'image/png' },
			{ url: '/img/apple-touch-icon-114x114.png', sizes: '114x114', type: 'image/png' },
			{ url: '/img/apple-touch-icon-120x120.png', sizes: '120x120', type: 'image/png' },
			{ url: '/img/apple-touch-icon-144x144.png', sizes: '144x144', type: 'image/png' },
			{ url: '/img/apple-touch-icon-152x152.png', sizes: '152x152', type: 'image/png' },
			{ url: '/img/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
		],
		other: [
			{ rel: 'apple-touch-icon-precomposed', url: '/img/apple-touch-icon-57x57-precomposed.png', sizes: '57x57' },
			{ rel: 'apple-touch-icon-precomposed', url: '/img/apple-touch-icon-60x60-precomposed.png', sizes: '60x60' },
			{ rel: 'apple-touch-icon-precomposed', url: '/img/apple-touch-icon-72x72-precomposed.png', sizes: '72x72' },
			{ rel: 'apple-touch-icon-precomposed', url: '/img/apple-touch-icon-76x76-precomposed.png', sizes: '76x76' },
			{ rel: 'apple-touch-icon-precomposed', url: '/img/apple-touch-icon-114x114-precomposed.png', sizes: '114x114' },
			{ rel: 'apple-touch-icon-precomposed', url: '/img/apple-touch-icon-120x120-precomposed.png', sizes: '120x120' },
			{ rel: 'apple-touch-icon-precomposed', url: '/img/apple-touch-icon-144x144-precomposed.png', sizes: '144x144' },
			{ rel: 'apple-touch-icon-precomposed', url: '/img/apple-touch-icon-152x152-precomposed.png', sizes: '152x152' },
			{ rel: 'apple-touch-icon-precomposed', url: '/img/apple-touch-icon-180x180-precomposed.png', sizes: '180x180' },
			{ rel: 'mask-icon', url: '/img/safari-pinned-tab.svg', color: '#303030' }
		]
	},
	themeColor: '#303030',
	manifest: '/site.webmanifest',
	alternates: {
		canonical: '/'
	}
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${interFont.variable} ${firaMonoFont.variable} ${ubuntuFont.variable}`}>
			<body className="bg-white dark:bg-neutral-900 dark:text-white overflow-x-hidden w-[100vw] scroll-smooth">
				<div className="flex flex-col min-h-[100lvh]">
					<div className="grow">
						<noscript>
							<Container className="my-12" noMargin>
								<alert className="block box p-4 rounded bg-red-200 border-red-400 text-black">
									<span className="font-bold">Please note!</span>
									<span> It looks like JavaScript is not supported by your browser. This is most likely because you are using an outdated browser or your browser has disabled it for this website. Many crucial functions of this website relies on JavaScript to work properly. <a href="https://www.enable-javascript.com/" className="link">Click here</a> to learn how to enable JavaScript for this website.</span>
								</alert>
							</Container>
						</noscript>
						{children}
						<ServiceWorker />
					</div>
					<div>
						<Footer />
					</div>
				</div>
				<Script src="https://www.googletagmanager.com/gtag/js?id=G-76CZV53176" strategy="afterInteractive" />
				<Script src="/js/ga.js" id="google-analytics" strategy="afterInteractive" />
			</body>
		</html>
	);
}
