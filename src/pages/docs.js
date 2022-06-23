import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Highlight from 'react-highlight';

export default function API() {
	return (
		<>
			<Head>
				<title>API Documentation - mcstatus.io</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content="API Documentation - mcstatus.io" />
				<meta name="description" content="Detailed documentation about our API and how to fetch the status of any Minecraft server through your service." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://mcstatus.io/docs" />
				<meta property="og:title" content="API Documentation - mcstatus.io" />
				<meta property="og:description" content="Detailed documentation about our API and how to fetch the status of any Minecraft server through your service." />
				<meta property="og:image" content="https://mcstatus.io/img/stone.png" />
			</Head>
			<div className="container content">
				<h1 className="title">API Documentation</h1>
				<h2 className="title is-header">Overview</h2>
				<p>mcstatus.io believes that anybody should be able to retrieve the status of any Minecraft server using a simple and efficient manner. This is why we prioritize a detailed and continuously updated documentation on how to interact with our service from yours. Please make sure to read this documentation thoroughly to prevent any errors that may be a mistake on your part.</p>
				<p>All methods documented are using the REST API, which is supported in all major programming languages and browsers. Body data sent and received from/to the server are using JSON formatting for standardization reasons. You should familiarize yourself with this data encoding before attempting to use our service. If you have any questions, concerns or encounter any problems after attempting a solution, please feel free to contact us by sending an email to <a href="mailto:api@mcstatus.io">api@mcstatus.io</a>.</p>
				<p>All server statuses are cached for up to 10 minutes from the previous network fetch. You can determine if a status was fetched from cache by using the <code>X-Cache-Hit</code> header returned from the server after the request.</p>
				<h2 className="title is-header mt-6">Java Status</h2>
				<p><span className="tag is-success">GET</span> <code>https://api.mcstatus.io/status/java/&lt;address&gt;</code></p>
				<p className="has-text-weight-semibold">Response Body (online)</p>
				<Highlight className="language-json p-3">{`{
    "online": true,
    "host": "play.hypixel.net",
    "port": 25565,
    "response": {
        "version": {
            "name": "Requires MC 1.8 / 1.18",
            "protocol": 47
        },
        "players": {
            "online": 38666,
            "max": 200000,
            "sample": []	// may be empty, null, or missing
        },
        "motd": {
            "raw": "                §aHypixel Network §c[1.8-1.18]\\n              §6§lWOOL WARS 1.0 RELEASED",
            "clean": "                Hypixel Network [1.8-1.18]\\n              WOOL WARS 1.0 RELEASED",
            "html": "<span><span style=\\"color: #ffffff;\\">                </span><span style=\\"color: #55ff55;\\">Hypixel Network </span><span style=\\"color: #ff5555;\\">[1.8-1.18]</span><span style=\\"color: #ffffff;\\">\\n              </span><span style=\\"color: #ffaa00; font-weight: bold;\\">WOOL WARS 1.0 RELEASED</span></span>"
        },
        "favicon": "data:image/png;base64,...",	// may be null
        "mod_info": {	// may be null
            "type": "Forge",
            "mods": [
                { "id": "Forge", "version": "1.0.0" }
            ]
        },
        "srv_record": {	// may be null
            "host": "...",
            "port": 25565
        }
    }
}`}</Highlight>
				<p className="has-text-weight-semibold">Response Body (offline)</p>
				<Highlight className="language-json p-3">{`{
    "online": false,
    "response": null
}`}</Highlight>
				<h2 className="title is-header mt-6">Bedrock Status</h2>
				<p><span className="tag is-success">GET</span> <code>https://api.mcstatus.io/status/bedrock/&lt;address&gt;</code></p>
				<p className="has-text-weight-semibold">Response Body (online)</p>
				<Highlight className="language-json p-3">{`{
    "online": true,
    "host": "play.nethergames.org",
    "port": 19132,
    "response": {
        "server_guid": 3037183795130687807,
        "edition": "MCPE",
        "motd": {
            "raw": "§e§lN§6G§7: §61.18 support!\nWaterdogPE Proxy",
            "clean": "NG: 1.18 support!\nWaterdogPE Proxy",
            "html": "<span><span style=\\"color: #ffff55; font-weight: bold;\\">N</span><span style=\\"color: #ffaa00;\\">G</span><span style=\\"color: #aaaaaa;\\">: </span><span style=\\"color: #ffaa00;\\">1.18 support!</span><span style=\\"color: #ffffff;\\">\nWaterdogPE Proxy</span></span>"
        },
        "protocol_version": 503,
        "version": "1.18.30",
        "online_players": 571,
        "max_players": 576,
        "server_id": "3037183795130687807",
        "gamemode": "Survival",
        "gamemode_id": 1,
        "port_ipv4": 19132,
        "port_ipv6": 19132,
        "srv_record": {	// may be null
            "host": "...",
            "port": 25565
        }
    }
}`}</Highlight>
				<p className="has-text-weight-semibold">Response Body (offline)</p>
				<Highlight className="language-json p-3">{`{
    "online": false,
    "response": null
}`}</Highlight>
			</div>
			<Script id="structured-data-1" type="application/ld+json">
				{`
					{
						"@context": "https://schema.org",
						"@type": "BreadcrumbList",
						"itemListElement": [
							{
								"@type": "ListItem",
								"position": 1,
								"name": "Home",
								"item": "https://mcstatus.io"
							},
							{
								"@type": "ListItem",
								"position": 2,
								"name": "API",
								"item": "https://mcstatus.io/docs"
							}
						]
					}
				`}
			</Script>
		</>
	);
}