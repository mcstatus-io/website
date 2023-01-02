import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import { LinkButton } from '../../components/Button';
import loader from '../../assets/img/loader.svg';

export default function AuthCallback({ code, refreshUser }) {
	const [error, setError] = useState(false);
	const { push } = useRouter();

	useEffect(() => {
		if (!code || code.length < 1) return;

		(async () => {
			try {
				const result = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/login?code=${encodeURIComponent(code)}`, {
					method: 'POST'
				});

				if (result.status === 200) {
					const body = await result.json();

					window.localStorage.setItem('session', body.session_token);

					refreshUser();
					push('/dashboard');
				} else {
					setError(true);
				}
			} catch (e) {
				console.error(e);

				setError(true);
			}
		})();
	}, [code]);

	return (
		<>
			<Head>
				<title>Logging in - mcstatus.io</title>
			</Head>
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5 text-center min-w-[90vw]">
				{
					error
						? null
						: <Image src={loader} alt="Loading spinner icon" width="64" height="64" priority />
				}
				<Header size={1} text={error ? 'Error' : 'Please wait...'} className={error ? 'text-red-500' : ''} />
				{
					error
						? <>
							<p className="text-lg">There was an error while logging in, please check the console.</p>
							<LinkButton href="/">&larr; Return Home</LinkButton>
						</>
						: <p className="text-lg">Logging in with Discord, this may take a second.</p>
				}
			</div>
		</>
	);
}

AuthCallback.propTypes = {
	code: PropTypes.string.isRequired,
	refreshUser: PropTypes.func.isRequired
};

export async function getServerSideProps({ query }) {
	return { props: query };
}