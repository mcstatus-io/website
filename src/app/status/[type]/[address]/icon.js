import { ImageResponse } from 'next/server';
import { getStatusData } from './page';

export const size = {
	width: 64,
	height: 64
};

export const contentType = 'image/png';

export default async function generateIcon({ params: { type, address } }) {
	address = decodeURIComponent(address);

	let status = null;

	try {
		status = await getStatusData(type, address);
	} catch (e) {
		console.error(e);
	}

	return new ImageResponse(
		(
			<img src={status?.icon ?? 'https://api.mcstatus.io/v2/icon'} />
		),
		size
	);
}