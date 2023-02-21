import { useState } from 'react';
import humanizeDuration from 'humanize-duration';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const calculateText = (now, target, ago, format, endedText) => !ago && now >= target ? endedText : format(humanizeDuration(Math.abs(now - target), { largest: 1, round: true })) + (ago ? ' ago' : '');

export default function Timer({ now, target, ago, endedText, format }) {
	const [text, setText] = useState(calculateText(now, target, ago, format, endedText));

	useEffect(() => {
		const interval = setInterval(() => setText(calculateText(Date.now(), target, ago, format, endedText)), 500);

		return () => clearInterval(interval);
	}, [now, target, ago, endedText, format]);

	return text;
}

Timer.propTypes = {
	now: PropTypes.number.isRequired,
	target: PropTypes.number,
	ago: PropTypes.bool,
	format: PropTypes.func,
	endedText: PropTypes.string
};

Timer.defaultProps = {
	target: null,
	ago: false,
	format: (text) => text
};