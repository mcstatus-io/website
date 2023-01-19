import React from 'react';
import PropTypes from 'prop-types';

export default function Input({ type, error, className, ...props }) {
	switch (type) {
		case 'textarea':
			return <textarea className={`block interactive-box font-mono px-3 py-2 rounded w-full ${className ?? ''}`} {...props} data-error={!!error} />;
		default:
			return <input className={`block interactive-box font-mono px-3 py-2 rounded w-full ${className ?? ''}`} {...props} data-error={!!error} />;
	}
}

Input.propTypes = {
	type: PropTypes.string.isRequired,

	error: PropTypes.any,
	className: PropTypes.string
};