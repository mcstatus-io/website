import React from 'react';
import Head from 'next/head';

export default function About() {
	return (
		<>
			<Head>
				<title>API - mcstatus.io</title>
			</Head>
			<div className="container">
				<h2 className="title mb-3">API</h2>
				<h3 className="title is-4 mb-2 mt-5">Caching</h3>
				<p>To reduce the load on our servers, the result of each ping is cached for up to 1 minute from the previous successful ping. There is no way to bypass this cache.</p>
				<h3 className="title is-4 mb-2 mt-5">Status Endpoint</h3>
				<code>GET https://api.mcstatus.io/v1/status/&lt;host&gt;:&lt;port&gt;</code>
				<p className="mt-2">All of the responses are formatted with JSON. Most all languages should come with a built-in JSON parser so reading the data should be trivial.</p>
				<p className="has-text-weight-bold mt-3">Online Response</p>
				<pre><code>{`{
    "online": true,
    "host": "<host>",
    "port": <port>,
    "version": {
        "name": "...",
        "protocol": 47
    },
    "players": {
        "online": 12,
        "max": 64,
        "sample": [
            {
                "name": "PassTheMayo",
                "uuid": "..."
            }
        ]
    },
    "description": {
        "raw": "...",
        "formatted": "...",
        "html": "..."
    },
    "favicon": "data:image/png;base64,...",
    "srv_record": {
        "host": "...",
        "port": 25565
    }
}`}</code></pre>
				<p className="has-text-weight-bold mt-3">Offline Response</p>
				<pre><code>{`{
    "online": false
}`}</code></pre>
			</div>
		</>
	);
}