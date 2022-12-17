import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const getClassName = (className) => `border border-neutral-600 hover:border-neutral-500 focus:border-neutral-500 disabled:border-neutral-700 disabled:text-neutral-400 bg-transparent px-3 py-2 rounded ${className}`;

export function Button({ children, className, ...props }) {
	return (
		<button type="submit" {...{ ...props, className: getClassName(className) }}>{children}</button>
	);
}

Button.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string
};

export function LinkButton({ children, href, className, ...props }) {
	return (
		<Link href={href}>
			<a {...{ ...props, className: getClassName(className) }}>{children}</a>
		</Link>
	);
}

LinkButton.propTypes = {
	children: PropTypes.any,
	href: PropTypes.string.isRequired,
	className: PropTypes.string
};