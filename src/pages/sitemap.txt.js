import React from 'react';

class Sitemap extends React.Component {
	static async getInitialProps({ res }) {
		res.setHeader('Content-Type', 'text/plain');
		res.write([
			'/',
			'/about'
		].join('\n'));
		res.end();
	}
}

export default Sitemap;