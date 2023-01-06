import React from 'react';
import PropTypes from 'prop-types';
import Error from '../components/Error';

export default function ErrorPage(props) {
	return (
		<Error {...props} />
	);
}

ErrorPage.propTypes = {
	statusCode: PropTypes.number,
	reason: PropTypes.string
};

ErrorPage.getInitialProps = ({ res, err }) => {
	const statusCode = res?.statusCode ?? err?.statusCode ?? 404;

	return { statusCode, reason: new Response(null, { status: statusCode }).statusText };
};