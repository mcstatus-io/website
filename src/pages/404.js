import React from 'react';
import Error from '../components/Error';

export default function Error404() {
	return (
		<Error statusCode={404} reason="Page not found" />
	);
}