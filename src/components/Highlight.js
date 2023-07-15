import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('json', json);
hljs.configure({ ignoreUnescapedHTML: true });

export default function Highlight({ source, className = '' }) {
	return (
		<pre><code className={`hljs ${className}`} dangerouslySetInnerHTML={{ __html: hljs.highlight(source, { language: 'json' }).value }} /></pre>
	);
}