import { Component } from 'react';
import { exampleServers } from '../assets/servers';

const formatSitemap = (paths) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `
		<url>
			<loc>https://mcstatus.io${path}</loc>
		</url>`)
		.join('')}
    </urlset>
`;

export default class Ping extends Component {
	static async getInitialProps({ res }) {
		res.setHeader('Content-Type', 'text/xml');
		res.write(formatSitemap([
			'/',
			'/about',
			'/docs',
			'/tools',
			'/tools/coordinate',
			...exampleServers.map((server) => `/status/${server.type}/${server.address}`)
		]));
		res.end();
	}
}