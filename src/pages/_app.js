import React from 'react';
import Script from 'next/script';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../assets/styles/global.sass';

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<div className="container">
				<Header />
				<Component {...pageProps} />
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