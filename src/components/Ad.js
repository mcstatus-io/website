import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function Ad({ className }) {
	const reference = useRef();

	useEffect(() => {
		if (!process.env.NEXT_PUBLIC_CARBON_CODE) return;

		reference.current.innerHTML = '';
		const s = document.createElement('script');
		s.id = '_carbonads_js';
		s.src = `//cdn.carbonads.com/carbon.js?serve=${process.env.NEXT_PUBLIC_CARBON_CODE}&placement=mcstatusio`;
		reference.current.appendChild(s);
	}, []);

	return process.env.NEXT_PUBLIC_CARBON_CODE
		? <div className={className} ref={reference} />
		: null;
}

Ad.propTypes = {
	className: PropTypes.string
};