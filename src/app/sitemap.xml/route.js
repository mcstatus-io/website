import { sampleServers } from '../../assets/servers';

const formatSitemap = (paths) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `    <url>
        <loc>https://mcstatus.io${path}</loc>
    </url>`).join('\n')}
</urlset>`;

export function GET() {
	const routes = [
		'/',
		'/docs',
		'/about',
		...sampleServers.map((server) => `/status/${server.type}/${server.address}`)
	];

	return new Response(formatSitemap(routes), {
		status: 200,
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}