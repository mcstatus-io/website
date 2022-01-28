import React from 'react';
import Script from 'next/script';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Error from '../components/Error';
import '../assets/styles/global.sass';

export default function MyApp({ Component, pageProps }) {
	return (
		<>
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
			<Script async src="https://www.googletagmanager.com/gtag/js?id=UA-104913718-10" strategy="afterInteractive" />
			<Script id="google-analytics" strategy="afterInteractive">
				{`window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'UA-104913718-10');`}
			</Script>
		</>
	);
}

MyApp.propTypes = {
	Component: PropTypes.any.isRequired,
	pageProps: PropTypes.any
};