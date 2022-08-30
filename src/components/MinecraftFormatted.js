import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const obfuscatedCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`~!@#$%^&*()-_=+[]"\';:<>,./?';

export default function MinecraftFormatted({ html, className }) {
	const containerElem = useRef();

	useEffect(() => {
		if (!containerElem || !containerElem.current) return;

		const obfuscatedElems = containerElem.current.querySelectorAll('.minecraft-format-obfuscated');

		const update = () => {
			obfuscatedElems.forEach((elem) => {
				let value = '';

				for (let i = 0, l = elem.innerText.length; i < l; i++) {
					value += obfuscatedCharacters.charAt(Math.floor(Math.random() * obfuscatedCharacters.length));
				}

				elem.innerText = value;
			});
		};

		const interval = setInterval(update, 1000 / 60);

		return () => clearInterval(interval);
	}, [containerElem]);

	return (
		<pre className={`block bg-black text-white p-4 w-full overflow-x-auto ${className}`} dangerouslySetInnerHTML={{ __html: html }} ref={containerElem} />
	);
}

MinecraftFormatted.propTypes = {
	html: PropTypes.string.isRequired,
	className: PropTypes.string
};