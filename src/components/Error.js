import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

export default function Error({ statusCode, reason }) {
	return (
		<>
			<Head>
				<title>{statusCode} - mcstatus.io</title>
			</Head>
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
				<h1 className="font-black text-9xl">{statusCode}</h1>
				<p className="font-light text-2xl">{reason}</p>
			</div>
		</>
	);
}

Error.propTypes = {
	statusCode: PropTypes.number.isRequired,
	reason: PropTypes.string.isRequired
};