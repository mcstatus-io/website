import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Status() {
	const input = useRef(null);
	const { push, pathname } = useRouter();
	const [error, setError] = useState(false);

	const onSubmit = (event) => {
		event.preventDefault();

		if (!input || !input.current || input.current.value.length < 1) return;

		push(`/status/bedrock/${input.current.value.toLowerCase()}`);
	};

	const onChange = () => {
		if (!input || !input.current) return;

		setError(input.current.value.length < 1);
	};

	return (
		<>
			<Head>
				<title>Bedrock Status - mcstatus.io</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content="Bedrock Status - mcstatus.io" />
				<meta name="description" content="Easily and quickly retrieve the status of any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`https://mcstatus.io${pathname}`} />
				<meta property="og:title" content="Status - mcstatus.io" />
				<meta property="og:description" content="Easily and quickly retrieve the status of any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second." />
				<meta property="og:image" content="https://mcstatus.io/img/stone.png" />
			</Head>
			<div className="container">
				<form onSubmit={onSubmit} className="mb-5">
					<div className="columns">
						<div className="column is-flex-grow-1 pr-1">
							<div className="field">
								<div className="control is-fullwidth">
									<input type="text" className={`input ${error ? 'is-danger' : ''}`} id="address" placeholder="play.hypixel.net" spellCheck="false" autoComplete="false" onChange={onChange} ref={input} />
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