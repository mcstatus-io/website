import React from 'react';
import Link from 'next/link';

export default function Footer() {
	return (
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
	);
}