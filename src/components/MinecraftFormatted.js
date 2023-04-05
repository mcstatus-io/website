'use client';

import { useEffect, useRef } from 'react';

const obfuscatedCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`~!@#$%^&*()-_=+[]"\';:<>,./?';

export default function MinecraftFormatted({ html, className }) {
	const containerElem = useRef();

	useEffect(() => {
		if (!containerElem || !containerElem.current) return;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const obfuscatedElems = containerElem.current.querySelectorAll('.minecraft-format-obfuscated');

		let interval;

		const update = () => {
			if (prefersReducedMotion.matches) return;

			obfuscatedElems.forEach((elem) => {
				let value = '';

				for (let i = 0, l = elem.innerText.length; i < l; i++) {
					value += obfuscatedCharacters.charAt(Math.floor(Math.random() * obfuscatedCharacters.length));
				}

				elem.innerText = value;
			});
		};

		const onMotionPreferenceChange = () => {
			if (prefersReducedMotion.matches) {
				clearInterval(interval);
			} else {
				interval = setInterval(update, 1000 / 60);
			}
		};

		onMotionPreferenceChange();

		prefersReducedMotion.addEventListener('change', onMotionPreferenceChange);

		return () => {
			clearInterval(interval);
		};
	}, [containerElem]);

	return (
		<pre className={`block bg-black text-white p-4 w-full overflow-x-auto ${className ?? ''}`} dangerouslySetInnerHTML={{ __html: html }} ref={containerElem} />
	);
}