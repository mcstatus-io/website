import React, { useEffect } from 'react';
import Head from 'next/head';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import PropTypes from 'prop-types';

/* eslint-disable @next/next/no-css-tags */

export default function Highlight({ source, className }) {
	useEffect(() => {
		hljs.registerLanguage('json', json);
		hljs.configure({ ignoreUnescapedHTML: true });
		hljs.highlightAll();
	}, []);

	return (
		<>
			<Head>
				<link rel="stylesheet" href="/css/atom-one-dark.min.css" />
			</Head>
			<pre className={`language-json ${className}`}><code>{source}</code></pre>
		</>
	);
}

Highlight.propTypes = {
	source: PropTypes.string.isRequired,
	className: PropTypes.string
};

Highlight.defaultProps = {
	className: ''
};