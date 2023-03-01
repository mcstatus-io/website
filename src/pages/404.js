import React from 'react';
import ErrorPage from './_error';

export default function Error404() {
	return (
		<ErrorPage statusCode={404} />
	);
}