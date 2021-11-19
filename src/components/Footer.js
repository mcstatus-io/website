import React from 'react';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="footer mt-6">
			<div className="container is-flex">
				<p className="is-flex-grow-1">
					<strong>mcstatus.io</strong> by <a href="https://passthemayo.dev" target="_blank" rel="noreferrer">Jacob Gunther</a>
				</p>
				<p>
					<Link href="/about">
						<a className="mr-5">About</a>
					</Link>
					<a className="mr-5" href="https://docs.mcstatus.io/" target="_blank" rel="noreferrer">API</a>
					<a className="mr-5" href="mailto:contact@mcstatus.io">Contact</a>
				</p>
			</div>
		</footer>
	);
}