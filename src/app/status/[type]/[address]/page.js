import React from 'react';
import StatusTable from '../../../../components/StatusTable';
import APIUsage from '../../../../components/APIUsage';

const getStatusData = async (type, address) => {
	const result = await fetch(`${process.env.PING_HOST}/status/${type}/${address}`, { cache: 'no-store' });
	const body = await result.json();

	return body;
};

const getProtocolVersionData = async (type) => {
	const result = await fetch(`https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/${type === 'java' ? 'pc' : 'bedrock'}/common/protocolVersions.json`);
	const body = await result.json();

	return body;
};

export async function generateMetadata({ params: { type, address } }) {
	return {
		title: address,
		description: `Easily and quickly retrieve the status of ${address} or any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second.`,
		openGraph: {
			title: `${address} - Minecraft Server Status`,
			description: `Easily and quickly retrieve the status of ${address} or any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second.`,
			url: `https://mcstatus.io/${type}/${address}`,
			siteName: 'Minecraft Server Status',
			images: [
				{
					url: 'https://mcstatus.io/img/icon.png',
					width: 300,
					height: 300
				}
			],
			locale: 'en-US',
			type: 'website'
		},
		alternates: {
			canonical: `https://mcstatus.io/${type}/${address}`
		}
	};
}

export default async function Page({ params: { type, address } }) {
	const result = await getStatusData(type, address);
	const protocolVersions = await getProtocolVersionData(type);

	return (
		<>
			<section>
				<div className="px-5 py-4 rounded mt-4 box">
					<StatusTable result={result} protocolVersions={protocolVersions} />
				</div>
			</section>
			<section>
				<APIUsage type={type} address={address} data={result} />
			</section>
		</>
	);
}