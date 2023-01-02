import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import PropTypes from 'prop-types';
import '../styles/global.sass';

export default function MyApp({ Component, pageProps }) {
	const [user, setUser] = useState(undefined);

	useEffect(() => {
		fetchUser();
	}, []);

	const fetchUser = async () => {
		const sessionToken = window.localStorage.getItem('session');
		if (!sessionToken) return setUser(null);

		try {
			const result = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/users/@me`, {
				headers: {
					Authorization: sessionToken
				}
			});

			if (result.status === 200) {
				const body = await result.json();

				setUser(body);
			} else {
				const body = await result.text();

				setUser(null);

				console.error(body);
			}
		} catch (e) {
			setUser(null);

			console.error(e);
		}
	};

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Component {...pageProps} user={user} refreshUser={fetchUser} />
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