import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

export default function ErrorPage({ statusCode }) {
	return (
		<>
			<Head>
				<title>{`${statusCode} - mcstatus.io`}</title>
			</Head>
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
				<h1 className="font-black text-9xl retro">{statusCode}</h1>
			</div>
		</>
	);
}

ErrorPage.propTypes = {
	statusCode: PropTypes.number
};

ErrorPage.getInitialProps = ({ res, err }) => ({ statusCode: res?.statusCode ?? err?.statusCode ?? 404 });