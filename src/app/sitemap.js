import servers from '@/assets/servers';

export default function generateSitemap() {
	const lastModified = new Date().toISOString();

	return [
		{ url: 'https://mcstatus.io/', lastModified },
		{ url: 'https://mcstatus.io/docs', lastModified },
		{ url: 'https://mcstatus.io/about', lastModified },
		...servers.map((server) => ({ url: `https://mcstatus.io/status/${server.type}/${server.address}`, lastModified }))
	];
}