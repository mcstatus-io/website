import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import '../styles/global.sass';
import Footer from '../components/Footer';

export default function MyApp({ Component, pageProps }) {
	const [user, setUser] = useState(undefined);
	const [cookies] = useCookies(['session']);

	useEffect(() => {
		fetchUser();
	}, []);

	const fetchUser = async () => {
		if (!cookies.session) return setUser(null);

		try {
			const result = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/users/@me`, {
				headers: {
					Authorization: cookies.session
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
			<div className="flex flex-col min-h-screen">
				<div className="grow">
					<Component {...pageProps} user={user} refreshUser={fetchUser} />
				</div>
				<Footer />
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