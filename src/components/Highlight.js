import React from 'react';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import PropTypes from 'prop-types';

hljs.registerLanguage('json', json);
hljs.configure({ ignoreUnescapedHTML: true });

export default function Highlight({ source, className }) {
	return (
		<pre><code className={`hljs ${className}`} dangerouslySetInnerHTML={{ __html: hljs.highlight(source, { language: 'json' }).value }} /></pre>
	);
}

Highlight.propTypes = {
	source: PropTypes.string.isRequired,
	className: PropTypes.string
};

Highlight.defaultProps = {
	className: ''
};