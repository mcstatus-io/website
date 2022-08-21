import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

export default function Error({ statusCode, reason }) {
	return (
		<>
			<Head>
				<title>{statusCode} - mcstatus.io</title>
			</Head>
			<h1 className="title is-size-1 has-text-weight-bold mt-6">{statusCode}</h1>
			<p className="subtitle">{reason}</p>
		</>
	);
}

Error.propTypes = {
	statusCode: PropTypes.number.isRequired,
	reason: PropTypes.string.isRequired
};