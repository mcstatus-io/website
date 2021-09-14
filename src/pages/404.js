import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Error404() {
	return (
		<>
			<Head>
				<title>404 - mcstatus.io</title>
			</Head>
			<h2 className="title is-1">404</h2>
			<p className="subtitle">Page not found</p>
			<Link href="/">
				<a className="button is-link">Return to Home</a>
			</Link>
		</>
	);
}