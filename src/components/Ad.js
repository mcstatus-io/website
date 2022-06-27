import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function Ad({ code, placement, className }) {
	const reference = useRef();

	useEffect(() => {
		reference.current.innerHTML = '';
		const s = document.createElement('script');
		s.id = '_carbonads_js';
		s.src = `//cdn.carbonads.com/carbon.js?serve=${code}&placement=${placement}`;
		reference.current.appendChild(s);
	}, []);

	return <div className={className} ref={reference} />;
}

Ad.propTypes = {
	code: PropTypes.string.isRequired,
	placement: PropTypes.string.isRequired,
	className: PropTypes.string
};