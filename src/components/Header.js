import React from 'react';
import Link from 'next/link';

export default function Header() {
	return (
		<div className="container main-container pt-6">
			<img src="/img/stone.png" width="64" height="64" className="is-pulled-left mr-4 mt-4" />
			<Link href="/">
				<a>
					<h1 className="title is-1">mcstatus.io</h1>
				</a>
			</Link>
			<p className="subtitle is-4">A Minecraft server status utility</p>
			<hr />
		</div>
	);
}