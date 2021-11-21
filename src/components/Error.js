import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

export default function Error({ statusCode, reason }) {
	return (
		<>
			<Head>
				<title>{statusCode} - mcstatus.io</title>
			</Head>
			<div className="container">
				<h1 className="title is-size-1">{statusCode}</h1>
				<p className="subtitle">{reason}</p>
			</div>
		</>
	);
}

Error.propTypes = {
	statusCode: PropTypes.number.isRequired,
	reason: PropTypes.string.isRequired
};