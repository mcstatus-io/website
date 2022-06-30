import React from 'react';
import Script from 'next/script';
import PropTypes from 'prop-types';
import NavMenu from '../components/NavMenu';
import '../assets/styles/global.sass';

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<div className="columns main-columns">
				<div className="column is-3 p-0">
					<NavMenu />
				</div>
				<div className="column is-9 is-main-column p-0">
					<Component {...pageProps} />
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