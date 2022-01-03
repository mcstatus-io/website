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
				<div className="content mt-6">
					<h2 className="title mb-2">About</h2>
					<p>mcstatus.io is a tool for quickly retrieving the status of any Java or Bedrock Edition Minecraft server. This tool will show all the information returned from the server in an easily understandable format. Simply type the address of the server into the input box above and hit submit to retrieve the status in a fraction of a second. This service is entirely free-to-use and has no advertising whatsoever. There is additionally a developer API for people to use within their own service.</p>
					<p>All versions of a Minecraft server are supported. Some details such as the version and the favicon may be unavailable for a specific range of versions since they did not exist that early in the game. To use a non-standard port, use a colon followed by the port number in the address bar. For example, <code>myserver.com:29845</code>. SRV records are also supported and will be correctly resolved.</p>
					<p>Caching of the server response is used to prevent abuse of the service and potential spam. Responses are cached for 10 minutes, meaning a fresh status will be retrieved after 10 minutes from the previous. This site is built with <a href="https://reactjs.org/" target="_blank" rel="noreferrer">React</a> and <a href="https://nextjs.org/" target="_blank" rel="noreferrer">Next.js</a>, and the back-end API server is running on <a href="https://go.dev/" target="_blank" rel="noreferrer">Go</a> with speed and efficiency in mind. We are using <a href="https://github.com/PassTheMayo/mcstatus" target="_blank" rel="noreferrer">mcstatus</a> as the library for retrieving the Minecraft server statuses.</p>
				</div>
			</div>
		</>
	);
}