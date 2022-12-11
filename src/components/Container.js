import React from 'react';
import PropTypes from 'prop-types';

export default function Container({ children, className }) {
	return (
		<div className={`container mx-auto px-4 ${className}`}>
			{children}
		</div>
	);
}

Container.propTypes = {
	children: PropTypes.any.isRequired,
	className: PropTypes.string
};