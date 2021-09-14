import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import '../assets/styles/global.sass';

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&amp;display=swap" rel="stylesheet" />
			</Head>
			<div className="container pt-6">
				{/* <button type="button" className="button is-outlined-dark is-pulled-right" onClick={() => darkMode.toggle()}>{darkMode.value ? 'dark' : 'light'}</button> */}
				<img src="/img/stone.png" width="64" height="64" className="is-pulled-left mr-4 mt-4" />
				<Link href="/">
					<a>
						<h1 className="title is-1">mcstatus.io</h1>
					</a>
				</Link>
				<p className="subtitle is-4">A Minecraft server status utility</p>
				<hr />
				<Component {...pageProps} />
			</div>
			<footer className="footer mt-6">
				<div className="container is-flex">
					<p className="is-flex-grow-1">
						<strong>mcstatus.io</strong> by <a href="https://passthemayo.dev" target="_blank" rel="noreferrer">Jacob Gunther</a> &ndash; powered by <a href="https://nextjs.org">NextJS</a>, inspired by <a href="https://mcsrvstat.us">mcsrvstat.us</a>
					</p>
					<p>
						<Link href="/about">
							<a className="mr-5">About</a>
						</Link>
						<Link href="/about/api">
							<a className="mr-5">API</a>
						</Link>
						<Link href="/about/donate">
							<a className="mr-5">Donate</a>
						</Link>
						<Link href="/about/status">
							<a>Status</a>
						</Link>
					</p>
				</div>
			</footer>
		</>
	);
}

MyApp.propTypes = {
	Component: PropTypes.any.isRequired,
	pageProps: PropTypes.any
};