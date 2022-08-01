import React from 'react';
import { exampleServers } from '../assets/servers';
import { revisions } from './docs/[version]';

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
			...revisions.map((revision) => `/docs/${revision.id}`),
			...exampleServers.map((server) => `/status/${server.type}/${server.address}`)
		]));
		res.end();
	}
}

export default Sitemap;