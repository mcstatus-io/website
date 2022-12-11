import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function BoxLink({ children, href, className, ...props }) {
	return (
		<Link href={href}>
			<a className={`block p-5 bg-neutral-800 border border-neutral-700 hover:border-neutral-600 rounded-md ${className}`} {...props}>
				{children}
			</a>
		</Link>
	);
}

BoxLink.propTypes = {
	children: PropTypes.any.isRequired,
	href: PropTypes.string.isRequired,
	className: PropTypes.string
};