import React, { useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
	const input = useRef(null);
	const { push } = useRouter();

	const onSubmit = (event) => {
		event.preventDefault();

		if (!input || !input.current) return;

		push(`/status/${input.current.value.toLowerCase()}`);
	};

	return (
		<>
			<Head>
				<title>mcstatus.io - A Minecraft server status utility</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content="mcstatus.io - A Minecraft server status utility" />
				<meta name="description" content="Easily and quickly retrieve the status of any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://mcstatus.io" />
				<meta property="og:title" content="mcstatus.io - A Minecraft server status utility" />
				<meta property="og:description" content="Easily and quickly retrieve the status of any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second." />
				<meta property="og:image" content="https://mcstatus.io/img/stone.png" />
			</Head>
			<div className="container main-container">
				<form onSubmit={onSubmit}>
					<div className="columns">
						<div className="column is-flex-grow-1 pr-1">
							<div className="field">
								<div className="control is-fullwidth">
									<input type="text" className="input" id="address" placeholder="play.hypixel.net" spellCheck="false" autoComplete="false" ref={input} />
								</div>
							</div>
						</div>
						<div className="column is-flex-grow-0 is-hidden-mobile pl-1">
							<button type="submit" className="button is-link">Submit</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}