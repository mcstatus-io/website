import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function BoxLink({ children, href, className, ...props }) {
	return (
		<Link href={href} className={`interactive-box block p-5 rounded-md outline-none ${className ?? ''}`} {...props}>
			{children}
		</Link>
	);
}

BoxLink.propTypes = {
	children: PropTypes.any.isRequired,
	href: PropTypes.string.isRequired,
	className: PropTypes.string
};