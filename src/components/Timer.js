import React, { useState, useEffect } from 'react';
import humanizeDuration from 'humanize-duration';
import PropTypes from 'prop-types';

export default function Timer({ target, options }) {
	const [, setState] = useState(Date.now());

	useEffect(() => {
		const timer = setInterval(() => setState(Date.now()), 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<span>{humanizeDuration(Math.abs(Date.now() - target), options)}{Date.now() >= target ? ' ago' : ''}</span>
	);
}

Timer.propTypes = {
	target: PropTypes.number.isRequired,
	options: PropTypes.object
};

Timer.defaultProps = {
	options: { largest: 1, round: true }
};