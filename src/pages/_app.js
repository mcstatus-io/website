import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Error from '../components/Error';
import '../assets/styles/global.sass';

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&amp;display=swap" rel="stylesheet" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2f2f2f" />
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta name="msapplication-TileImage" content="/mstile-144x144.png" />
				<meta name="theme-color" content="#ffffff" />
			</Head>
			<div className="columns is-flex-direction-column main-columns m-0">
				<div className="column is-flex-grow-0 p-2">
					<Header />
				</div>
				<div className="column is-flex-grow-1 p-3">
					{
						pageProps.error
							? <Error {...pageProps.error} />
							: <Component {...pageProps} />
					}
				</div>
				<div className="column is-flex-grow-0 p-0">
					<Footer />
				</div>
			</div>
		</>
	);
}

MyApp.propTypes = {
	Component: PropTypes.any.isRequired,
	pageProps: PropTypes.any
};