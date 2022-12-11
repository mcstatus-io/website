import React from 'react';
import PropTypes from 'prop-types';

export default function Input({ type, error, className, ...props }) {
	switch (type) {
		case 'textarea':
			return <textarea className={`block border ${error ? 'border-red-500' : 'border-neutral-600 hover:border-neutral-500 focus:border-neutral-500'} font-mono outline-none bg-transparent px-3 py-2 rounded w-full ${className}`} {...props} />;
		default:
			return <input className={`block border ${error ? 'border-red-500' : 'border-neutral-600 hover:border-neutral-500 focus:border-neutral-500'} font-mono outline-none bg-transparent px-3 py-2 rounded w-full ${className}`} {...props} />;
	}
}

Input.propTypes = {
	type: PropTypes.string.isRequired,

	error: PropTypes.any,
	className: PropTypes.string
};