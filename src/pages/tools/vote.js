import React from 'react';
import Script from 'next/script';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Tools() {
	const form = useFormik({
		initialValues: {
			host: '',
			port: 8192,
			username: '',
			token: ''
		},
		validationSchema: Yup
			.object()
			.shape({
				host: Yup.string().min(1, 'Host must be at least 1 character').required('Required'),
				port: Yup.number().integer('Port must be an integer').min(0, 'Port must be greater than or equal to 0').max(65536, 'Port must be less than or equal to 65536').required('Required'),
				username: Yup.string().min(3, 'Username must be at least 3 characters').max(16, 'Username must be at most 16 characters').required('Required'),
				token: Yup.string().min(1, 'Token must be at least 1 character').required('Required')
			}).required(),
		onSubmit: async (values, { setStatus }) => {
			try {
				const result = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/vote`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(values)
				});

				const body = await result.json();

				setStatus(body);
			} catch (e) {
				setStatus({ error: e.toString() });
			}
		}
	});

	console.log(form.status);

	return (
		<>
			<Head>
				<title>Votifier Tester - Minecraft Server Status</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content="Votifier Tester - Minecraft Server Status" />
				<meta name="description" content="Send a Votifier test vote to your Minecraft server to ensure that it is working." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://mcstatus.io" />
				<meta property="og:title" content="Votifier Tester - Minecraft Server Status" />
				<meta property="og:description" content="Send a Votifier test vote to your Minecraft server to ensure that it is working." />
				<meta property="og:image" content="https://mcstatus.io/img/icon.png" />
				<link rel="canonical" href="https://mcstatus.io/tools/coordinate" />
			</Head>
			<Navbar active="tools" />
			<div className="container mx-auto my-12 lg:my-24 px-4">
				<h1 className="text-4xl lg:text-5xl font-black">Votifier Tester</h1>
				<p className="text-2xl font-light mt-2">Send a Votifier test vote to a Minecraft server</p>
				{
					form.isSubmitting
						? <div className="p-5 bg-neutral-800 border border-neutral-700 rounded mt-3">
							<p>The vote is being processed by the server, please wait...</p>
						</div>
						: form.status?.success
							? <div className="p-5 bg-green-500 rounded mt-3">
								<p>Successfully sent vote to the specified server, and the vote was processed.</p>
							</div>
							: form.status?.error
								? <div className="p-5 bg-red-500 rounded mt-3">
									<p>Failed to send the vote to the specified server. Reason: <span className="font-bold">{form.status.error}</span></p>
								</div>
								: null
				}
				<div className="p-5 bg-neutral-800 border border-neutral-700 rounded mt-3">
					<form onSubmit={form.handleSubmit}>
						<div className="flex items-center gap-3 mb-3">
							<div className="grow">
								<label className="font-bold" htmlFor="host">Host</label>
								<input type="text" className={`block border ${form.errors.host ? 'border-red-500' : 'border-neutral-600 hover:border-neutral-500 focus:border-neutral-500'} font-mono outline-none bg-transparent px-3 py-2 rounded w-full mt-1`} id="host" placeholder="play.hypixel.net" defaultValue={form.values.host} onChange={form.handleChange} onBlur={form.handleBlur} />
							</div>
							<div className="grow">
								<label className="font-bold" htmlFor="port">Port</label>
								<input type="number" className={`block border ${form.errors.port ? 'border-red-500' : 'border-neutral-600 hover:border-neutral-500 focus:border-neutral-500'} font-mono outline-none bg-transparent px-3 py-2 rounded w-full mt-1`} id="port" placeholder="8192" defaultValue={form.values.port} onChange={form.handleChange} onBlur={form.handleBlur} />
							</div>
							<div className="grow">
								<label className="font-bold" htmlFor="username">Username</label>
								<input type="text" className={`block border ${form.errors.username ? 'border-red-500' : 'border-neutral-600 hover:border-neutral-500 focus:border-neutral-500'} outline-none bg-transparent px-3 py-2 rounded w-full mt-1`} id="username" placeholder="Notch" defaultValue={form.values.username} onChange={form.handleChange} onBlur={form.handleBlur} />
							</div>
						</div>
						<label className="font-bold" htmlFor="token">Token</label>
						<textarea type="text" className={`block border ${form.errors.token ? 'border-red-500' : 'border-neutral-600 hover:border-neutral-500 focus:border-neutral-500'} font-mono outline-none bg-transparent px-3 py-2 rounded w-full mt-1 h-36`} id="token" defaultValue={form.values.token} onChange={form.handleChange} onBlur={form.handleBlur} />
						<button type="submit" className="border border-neutral-600 rounded px-3 py-2 mt-3 disabled:border-neutral-700 disabled:text-neutral-300 hover:border-neutral-500" disabled={form.isSubmitting || !form.isValid}>Send Vote</button>
					</form>
				</div>
			</div>
			<Script type="application/ld+json" strategy="afterInteractive" id="google-structured">
				{`
[
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
				"name": "Tools",
				"item": "https://mcstatus.io/tools"
			},
			{
				"@type": "ListItem",
				"position": 3,
				"name": "Votifier Tester",
				"item": "https://mcstatus.io/tools/vote"
			}
		]
	},
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		"url": "https://mcstatus.io",
		"potentialAction": {
			"@type": "SearchAction",
			"target": {
				"@type": "EntryPoint",
				"urlTemplate": "https://mcstatus.io/status/java/{host}"
			},
			"query-input": "required name=host"
		}
	}
]
				`}
			</Script>
		</>
	);
}