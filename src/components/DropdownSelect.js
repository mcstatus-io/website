import React from 'react';
import PropTypes from 'prop-types';

export default function DropdownSelect({ children, className, ...props }) {
	return (
		<select className={`w-full appearance-none text-center interactive-box outline-none cursor-pointer px-3 py-2 rounded ${className}`} {...props}>
			{children}
		</select>
	);
}

DropdownSelect.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string
};