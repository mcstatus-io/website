import React from 'react';
import { exampleServers } from '../assets/servers';

const createSitemap = (paths) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${paths
		.map((path) => `
		<url>
			<loc>https://mcstatus.io${path}</loc>
		</url>`)
		.join('')}
    </urlset>
`;

class Sitemap extends React.Component {
	static async getInitialProps({ res }) {
		res.setHeader('Content-Type', 'text/xml');
		res.write(createSitemap([
			'/',
			'/about',
			'/docs',
			...exampleServers.map((server) => `/${server.type === 'java' ? 'status' : 'bedrock'}/${server.address}`)
		]));
		res.end();
	}
}

export default Sitemap;