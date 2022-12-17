import React from 'react';
import Script from 'next/script';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { Button } from '../../components/Button';

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
				<Header size={1} text="Votifier Tester" />
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
								<Input type="text" id="host" error={form.errors.host} placeholder="play.hypixel.net" defaultValue={form.values.host} onChange={form.handleChange} onBlur={form.handleBlur} className="mt-1" />
							</div>
							<div className="grow">
								<label className="font-bold" htmlFor="port">Port</label>
								<Input type="number" id="port" min="0" max="65536" step="1" error={form.errors.port} defaultValue={form.values.port} onChange={form.handleChange} onBlur={form.handleBlur} className="mt-1" />
							</div>
							<div className="grow">
								<label className="font-bold" htmlFor="username">Username</label>
								<Input type="text" id="username" error={form.errors.username} placeholder="Notch" defaultValue={form.values.username} onChange={form.handleChange} onBlur={form.handleBlur} className="mt-1" />
							</div>
						</div>
						<label className="font-bold" htmlFor="token">Token</label>
						<Input type="textarea" id="token" error={form.errors.token} className="h-36 mt-1" defaultValue={form.values.token} onChange={form.handleChange} onBlur={form.handleBlur} />
						<Button type="submit" disabled={form.isSubmitting || !form.isValid} className="mt-3 w-auto">Send Vote</Button>
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