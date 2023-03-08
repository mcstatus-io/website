import Footer from '../components/Footer';
import './global.sass';

// TODO add OGP metadata properties (https://beta.nextjs.org/docs/api-reference/metadata#opengraph)

export const metadata = {
	title: {
		default: 'Minecraft Server Status - Quickly retrieve the status of any Minecraft server',
		template: '%s - Minecraft Server Status'
	},
	description: 'Easily and quickly retrieve the status of any Java or Bedrock Edition Minecraft server by using our tool.'
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2f2f2f" />
				<meta name="msapplication-TileColor" content="#232323" />
				<meta name="msapplication-TileImage" content="/mstile-144x144.png" />
				<meta name="theme-color" content="#232323" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400&family=Fira+Mono&family=Inter:wght@200;300;400;500;700;900&display=swap" rel="stylesheet" />
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css" />
			</head>
			<body className="bg-white dark:bg-neutral-900 dark:text-white overflow-x-hidden w-[100vw] scroll-smooth">
				{children}
				<Footer />
			</body>
		</html>
	);
}
