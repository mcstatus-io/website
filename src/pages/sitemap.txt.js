import { Component } from 'react';
import { exampleServers } from '../assets/servers';

export default class Sitemap extends Component {
	static async getInitialProps({ res }) {
		res.setHeader('Content-Type', 'text/plain');
		res.write([
			'/',
			'/about',
			'/docs',
			'/tools',
			'/tools/coordinate',
			...exampleServers.map((server) => `/status/${server.type}/${server.address}`)
		].join('\n'));
		res.end();
	}
}