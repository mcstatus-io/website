import React from 'react';
import PropTypes from 'prop-types';

export default function Error(props) {
	return (
		<Error {...props} />
	);
}

Error.propTypes = {
	statusCode: PropTypes.number,
	reason: PropTypes.string
};

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res?.statusCode ?? err?.statusCode ?? 404;

	return { statusCode, reason: new Response(null, { status: statusCode }).statusText };
};