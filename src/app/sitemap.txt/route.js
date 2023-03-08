import { sampleServers } from '../../assets/servers';

export function GET() {
	const routes = [
		'/',
		'/docs',
		'/about',
		...sampleServers.map((server) => `/status/${server.type}/${server.address}`)
	];

	return new Response(routes.join('\n'), {
		status: 200,
		headers: {
			'Content-Type': 'text/plain'
		}
	});
}