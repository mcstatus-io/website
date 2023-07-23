'use client';

import { useEffect, useRef } from 'react';

export default function Ad({ className }) {
	const elem = useRef();

	useEffect(() => {
		if (!process.env.NEXT_PUBLIC_CARBON_CODE) return;

		const script = document.createElement('script');
		script.setAttribute('id', '_carbonads_js');
		script.setAttribute('src', `//cdn.carbonads.com/carbon.js?serve=${process.env.NEXT_PUBLIC_CARBON_CODE}&placement=mcstatusio`);
		elem.current.appendChild(script);
	}, []);

	return process.env.NEXT_PUBLIC_CARBON_CODE
		? <div className={`${className ?? ''} carbon max-w-fit mx-auto md:mx-0`} ref={elem} />
		: null;
}