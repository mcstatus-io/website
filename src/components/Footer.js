import React from 'react';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="footer mt-6">
			<div className="container main-container">
				<div className="columns has-text-centered-mobile">
					<div className="column">
						<p>
							<strong>mcstatus.io</strong> by <a href="https://github.com/PassTheMayo" target="_blank" rel="noreferrer">PassTheMayo</a>
						</p>
					</div>
					<div className="column is-flex-grow-0">
						<nav>
							<Link href="/about">
								<a className="mr-5">About</a>
							</Link>
							<Link href="/docs">
								<a className="mr-5">API</a>
							</Link>
							<a className="mr-5" href="https://uptime.mcstatus.io/" target="_blank" rel="noreferrer">Uptime</a>
							<a className="mr-5" href="mailto:contact@mcstatus.io">Contact</a>
						</nav>
					</div>
				</div>
			</div>
		</footer>
	);
}