import React from 'react';
import PropTypes from 'prop-types';
import { parse, toHTML } from 'minecraft-motd-util';

export default function Formatted({ content, className }) {
	return <pre className={`has-background-black ${className}`} dangerouslySetInnerHTML={{ __html: toHTML(parse(content)) }} />;
}

Formatted.propTypes = {
	content: PropTypes.string.isRequired,
	className: PropTypes.string
};