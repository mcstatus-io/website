import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ text, className, ...props }) {
	return (
		<button type="submit" className={`w-full border border-neutral-600 hover:border-neutral-500 focus:border-neutral-500 disabled:border-neutral-700 disabled:text-neutral-400 bg-transparent px-3 py-2 rounded ${className}`} {...props}>{text}</button>
	);
}

Button.propTypes = {
	text: PropTypes.string.isRequired,
	className: PropTypes.string
};