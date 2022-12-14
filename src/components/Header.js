import React from 'react';
import PropTypes from 'prop-types';

const headerClassNames = {
	1: 'text-4xl lg:text-5xl font-black',
	2: 'text-2xl font-bold',
	3: 'text-xl font-bold'
};

export default function Header({ size, text, className, ...props }) {
	return React.createElement('h' + size, { ...props, className: headerClassNames[size] + ' ' + className }, text);
}

Header.propTypes = {
	size: PropTypes.oneOf([1, 2, 3, PropTypes.string]).isRequired,
	text: PropTypes.string.isRequired,
	className: PropTypes.string
};