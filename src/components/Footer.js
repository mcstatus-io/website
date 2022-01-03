import React from 'react';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="footer mt-6">
			<div className="container main-container">
				<div className="columns has-text-centered-mobile">
					<div className="column">
						<p>
							<strong>mcstatus.io</strong> by <a href="https://passthemayo.dev" target="_blank" rel="noreferrer">Jacob Gunther</a>
						</p>
					</div>
					<div className="column is-flex-grow-0">
						<p>
							<Link href="/about">
								<a className="mr-5">About</a>
							</Link>
							<a className="mr-5" href="https://docs.mcstatus.io/" target="_blank" rel="noreferrer">API</a>
							<a className="mr-5" href="https://stats.uptimerobot.com/4wqvvuzRB1" target="_blank" rel="noreferrer">Uptime</a>
							<a className="mr-5" href="mailto:contact@mcstatus.io">Contact</a>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}