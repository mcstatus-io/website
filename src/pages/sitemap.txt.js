import React from 'react';
import { exampleServers } from '../assets/servers';
import { revisions } from './docs/[version]';

class Sitemap extends React.Component {
	static async getInitialProps({ res }) {
		res.setHeader('Content-Type', 'text/plain');
		res.write([
			'/',
			'/about',
			...revisions.map((revision) => `/docs/${revision.id}`),
			...exampleServers.map((server) => `/status/${server.type}/${server.address}`)
		].join('\n'));
		res.end();
	}
}

export default Sitemap;