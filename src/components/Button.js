import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

export function Button({ children, className, ...props }) {
	return (
		<button type="submit" className={`interactive-box px-3 py-2 rounded ${className}`} {...props}>{children}</button>
	);
}

Button.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string
};

export function LinkButton({ children, href, className, ...props }) {
	return (
		<Link href={href} className={`interactive-box px-3 py-2 rounded ${className}`} {...props}>
			{children}
		</Link>
	);
}

LinkButton.propTypes = {
	children: PropTypes.any,
	href: PropTypes.string.isRequired,
	className: PropTypes.string
};