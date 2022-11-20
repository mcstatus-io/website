import React, { useState } from 'react';
import Script from 'next/script';
import Head from 'next/head';
import Navbar from '../../components/Navbar';

export default function Tools() {
	const [block, setBlock] = useState({ x: 0, y: 0, z: 0 });
	const [chunk, setChunk] = useState({ x: 0, y: 0, z: 0 });
	const [region, setRegion] = useState({ x: 0, z: 0 });

	const onChange = (parent, type, event) => {
		let value = parseInt(event.target.value);

		if (isNaN(value)) {
			value = 0;
		}

		switch (parent) {
			case 'block':
				return setBlock({ ...block, [type]: value });
			case 'chunk':
				return setChunk({ ...block, [type]: value });
			case 'region':
				return setRegion({ ...block, [type]: value });
		}
	};

	return (
		<>
			<Head>
				<title>Coordinate Calculator Tool - Minecraft Server Status</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content="Coordinate Calculator Tool - Minecraft Server Status" />
				<meta name="description" content="Quickly determine which chunk or region a block is in, or vise-versa." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://mcstatus.io" />
				<meta property="og:title" content="Coordinate Calculator Tool - Minecraft Server Status" />
				<meta property="og:description" content="Quickly determine which chunk or region a block is in, or vise-versa." />
				<meta property="og:image" content="https://mcstatus.io/img/icon.png" />
				<link rel="canonical" href="https://mcstatus.io/tools/coordinate" />
			</Head>
			<Navbar active="tools" />
			<div className="container mx-auto my-12 lg:my-24 px-4">
				<h1 className="text-4xl lg:text-5xl font-black">Coordinate Calculator</h1>
				<p className="text-2xl font-light mt-2">Calculate region, chunk and block coordinates</p>
				<h2 className="text-2xl font-bold mt-6">Block Coordinates</h2>
				<div className="p-5 bg-neutral-800 border border-neutral-700 rounded mt-2">
					<div className="flex justify-between items-center gap-8">
						<input type="text" className="grow border border-neutral-600 hover:border-neutral-500 focus:border-neutral-500 font-mono outline-none bg-transparent px-3 py-2 rounded w-full" placeholder="X" defaultValue={block.x} onChange={(event) => onChange('block', 'x', event)} />
						<input type="text" className="grow border border-neutral-600 hover:border-neutral-500 focus:border-neutral-500 font-mono outline-none bg-transparent px-3 py-2 rounded w-full" placeholder="Y" defaultValue={block.y} onChange={(event) => onChange('block', 'y', event)} />
						<input type="text" className="grow border border-neutral-600 hover:border-neutral-500 focus:border-neutral-500 font-mono outline-none bg-transparent px-3 py-2 rounded w-full" placeholder="Z" defaultValue={block.z} onChange={(event) => onChange('block', 'z', event)} />
					</div>
					<p className="mt-3">Chunk: <code>({block.x >> 4}, {block.y >> 4}, {block.z >> 4})</code></p>
					<p>Region: <code>({block.x >> 9}, {block.z >> 9})</code> &ndash; in file <code>r.{block.x >> 9}.{block.z >> 9}.mcr</code></p>
				</div>
				<h2 className="text-2xl font-bold mt-6">Chunk Coordinates</h2>
				<div className="p-5 bg-neutral-800 border border-neutral-700 rounded mt-2">
					<div className="flex justify-between items-center gap-8">
						<input type="text" className="grow border border-neutral-600 hover:border-neutral-500 focus:border-neutral-500 font-mono outline-none bg-transparent px-3 py-2 rounded w-full" placeholder="X" defaultValue={chunk.x} onChange={(event) => onChange('chunk', 'x', event)} />
						<input type="text" className="grow border border-neutral-600 hover:border-neutral-500 focus:border-neutral-500 font-mono outline-none bg-transparent px-3 py-2 rounded w-full" placeholder="Y" defaultValue={chunk.y} onChange={(event) => onChange('chunk', 'y', event)} />
						<input type="text" className="grow border border-neutral-600 hover:border-neutral-500 focus:border-neutral-500 font-mono outline-none bg-transparent px-3 py-2 rounded w-full" placeholder="Z" defaultValue={chunk.z} onChange={(event) => onChange('chunk', 'z', event)} />
					</div>
					<p className="mt-3">Blocks: <code>({chunk.x << 4}, {chunk.y << 4}, {chunk.z << 4})</code> to <code>({((chunk.x + 1) << 4) - 1}, {((chunk.y + 1) << 4) - 1}, {((chunk.z + 1) << 4) - 1})</code></p>
					<p>Region: <code>({chunk.x >> 5}, {chunk.y >> 5})</code> (in file <code>r.{chunk.x >> 5}.{chunk.y >> 5}.mcr</code>)</p>
				</div>
				<h2 className="text-2xl font-bold mt-6">Region Coordinates</h2>
				<div className="p-5 bg-neutral-800 border border-neutral-700 rounded mt-2">
					<div className="flex justify-between items-center gap-8">
						<input type="text" className="grow border border-neutral-600 hover:border-neutral-500 focus:border-neutral-500 font-mono outline-none bg-transparent px-3 py-2 rounded w-full" placeholder="X" defaultValue={region.x} onChange={(event) => onChange('region', 'x', event)} />
						<input type="text" className="grow border border-neutral-600 hover:border-neutral-500 focus:border-neutral-500 font-mono outline-none bg-transparent px-3 py-2 rounded w-full" placeholder="Z" defaultValue={region.z} onChange={(event) => onChange('region', 'z', event)} />
					</div>
					<p className="mt-3">Blocks: <code>({region.x << 9}, 0, {region.z << 9})</code> to <code>({((region.x + 1) << 9) - 1}, 255, {((region.z + 1) << 9) - 1})</code></p>
					<p>Chunks: <code>({region.x << 5}, 0, {region.z << 5})</code> to <code>({((region.x + 1) << 5) - 1}, 15, {((region.z + 1) << 5) - 1})</code></p>
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
				"name": "Coordinate Calculator",
				"item": "https://mcstatus.io/tools/coordinate"
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