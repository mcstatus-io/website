import { Component } from 'react';

export default class Ping extends Component {
	static async getInitialProps({ res }) {
		res.setHeader('Content-Type', 'text/plain');
		res.write('Pong!');
		res.end();
	}
}