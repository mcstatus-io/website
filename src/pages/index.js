import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Status() {
	const inputElem = useRef(null);
	const bedrockElem = useRef(null);
	const { push, pathname } = useRouter();
	const [error, setError] = useState(false);

	const onSubmit = (event) => {
		event.preventDefault();

		if (!inputElem || !inputElem.current || inputElem.current.value.length < 1) return;

		push(`/status/${inputElem.current.value.toLowerCase()}${bedrockElem && bedrockElem.current && bedrockElem.current.checked ? '?bedrock=true' : ''}`);
	};

	const onChange = () => {
		if (!inputElem || !inputElem.current) return;

		setError(inputElem.current.value.length < 1);
	};

	return (
		<>
			<Head>
				<title>mcstatus.io - Retrieve the status of any Minecraft server</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content="mcstatus.io - Retrieve the status of any Minecraft server" />
				<meta name="description" content="Easily and quickly retrieve the status of any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`https://mcstatus.io${pathname}`} />
				<meta property="og:title" content="mcstatus.io - Retrieve the status of any Minecraft server" />
				<meta property="og:description" content="Easily and quickly retrieve the status of any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second." />
				<meta property="og:image" content="https://mcstatus.io/img/stone.png" />
			</Head>
			<div className="container">
				<form onSubmit={onSubmit} className="mb-5">
					<div className="columns">
						<div className="column is-flex-grow-1 pr-1">
							<div className="field">
								<div className="control is-fullwidth">
									<input type="text" className={`input ${error ? 'is-danger' : ''}`} id="address" placeholder="play.hypixel.net" spellCheck="false" autoComplete="false" onChange={onChange} ref={inputElem} />
								</div>
							</div>
							<label className="checkbox">
								<input type="checkbox" className="mr-2" ref={bedrockElem} />
								<span>Bedrock server</span>
							</label>
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