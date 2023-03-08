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

export default async function Page({ params: { type, address } }) {
	const result = await getStatusData(type, address);
	const protocolVersions = await getProtocolVersionData(type);

	return (
		<>
			<div className="px-5 py-4 rounded mt-4 box">
				<StatusTable result={result} protocolVersions={protocolVersions} />
			</div>
			<APIUsage type={type} address={address} data={result} />
		</>
	);
}