import React from 'react';

const headerClassNames = {
	1: 'text-4xl lg:text-5xl font-black',
	2: 'text-2xl font-bold',
	3: 'text-lg font-bold'
};

export default function Header({ size, className, children, ...props }) {
	return React.createElement('h' + size, { ...props, className: 'relative ' + headerClassNames[size] + ' ' + (className ?? '') }, children);
}