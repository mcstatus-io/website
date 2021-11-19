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
			</Head>
			<div className="columns is-flex-direction-column main-columns m-0">
				<div className="column is-flex-grow-0 p-0">
					<Header />
				</div>
				<div className="column is-flex-grow-1 p-0">
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