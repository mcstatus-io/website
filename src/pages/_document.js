import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);

		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="en">
				<Head>
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
				</Head>
				<body className="bg-neutral-900 text-white overflow-x-hidden scroll-smooth">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;