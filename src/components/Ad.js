'use client';

import { useEffect, useRef } from 'react';

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
		? <div className={`${className ?? ''} [&>*:not([id="carbonads"])]:hidden`} ref={reference} /> // FIXME Hacky workaround for preventing double rendering of ads, will fix soon
		: null;
}