import React from 'react';
import StatusTable from '../../../components/StatusTable';
import APIUsage from '../../../components/APIUsage';

const getStatusData = async (address) => {
	const result = await fetch(`${process.env.PING_HOST}/status/java/${address}`, { cache: 'no-store' });
	const body = await result.json();

	return body;
};

const getProtocolVersionData = async () => {
	const result = await fetch('https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc/common/protocolVersions.json');
	const body = await result.json();

	return body;
};

export default async function Page({ params: { address } }) {
	const result = await getStatusData(address);
	const protocolVersions = await getProtocolVersionData();

	return (
		<>
			<div className="px-5 py-4 rounded mt-4 box">
				<StatusTable result={result} protocolVersions={protocolVersions} />
			</div>
			<APIUsage type="java" address={address} data={result} />
		</>
	);
}