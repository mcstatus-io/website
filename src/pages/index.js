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
			</Head>
			<div className="container">
				<form onSubmit={onSubmit}>
					<div className="columns">
						<div className="column is-flex-grow-1 pr-1">
							<div className="field">
								<div className="control is-fullwidth">
									<input type="text" className="input" id="address" placeholder="play.hypixel.net" spellCheck="false" autoComplete="false" ref={input} />
								</div>
							</div>
						</div>
						<div className="column is-flex-grow-0 pl-1">
							<button type="submit" className="button is-link">Submit</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}