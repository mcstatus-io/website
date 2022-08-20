import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

export default function Search({ initialValues }) {

}

Search.propTypes = {
	initialValues: PropTypes.object
};

Search.defaultProps = {
	initialValues: {
		host: '',
		bedrock: false
	}
};