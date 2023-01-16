import React from 'react';
import PropTypes from 'prop-types';

export default function Container({ children, className, noMargin }) {
	return (
		<div className={`container mx-auto ${noMargin ? '' : 'my-12 lg:my-24'} px-4 ${className}`}>
			{children}
		</div>
	);
}

Container.propTypes = {
	children: PropTypes.any.isRequired,
	className: PropTypes.string,
	noMargin: PropTypes.bool
};