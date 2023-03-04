import { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from '../pages/_error';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);

		this.state = { error: false };
	}

	static getDerivedStateFromError() {
		return { error: true };
	}

	static get propTypes() {
		return {
			children: PropTypes.any
		};
	}

	componentDidCatch(error, errorInfo) {
		console.error({ error, errorInfo });
	}

	render() {
		return this.state.error ? <ErrorPage statusCode={500} /> : this.props.children;
	}
}

export default ErrorBoundary;