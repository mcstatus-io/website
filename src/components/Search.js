import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

export default function Search({ host, type, className }) {
	const { push } = useRouter();

	const form = useFormik({
		initialValues: { host, type },
		validationSchema: Yup
			.object()
			.shape({
				host: Yup.string().min(1).matches(/^[A-Za-z0-9-_]+(\.[A-Za-z0-9-_]+)*(:\d{1,5})?$/).required(),
				type: Yup.string().oneOf(['java', 'bedrock']).required()
			})
			.required(),
		onSubmit: ({ host, type }) => push(`/status/${type}/${host.toLowerCase()}`)
	});

	return (
		<form className={`block md:flex items-center gap-5 ${className ?? ''}`} onSubmit={form.handleSubmit}>
			<div className="mb-3 md:mb-0">
				<label className="sr-only" htmlFor="type">Server Type</label>
				<select className="select md:w-auto" id="type" defaultValue={form.values.type} onChange={form.handleChange} onBlur={form.handleBlur}>
					<option value="java" className="text-neutral-800">Java Edition</option>
					<option value="bedrock" className="text-neutral-800">Bedrock Edition</option>
				</select>
			</div>
			<div className="grow mb-3 md:mb-0">
				<label className="sr-only" htmlFor="host">Host</label>
				<input type="text" className="input" id="host" placeholder="play.hypixel.net" defaultValue={form.values.host} onChange={form.handleChange} onBlur={form.handleBlur} data-error={form.errors.host} />
			</div>
			<div>
				<button type="submit" className="button block w-full md:w-auto" disabled={!form.isValid || form.isSubmitting || (form.values.type === type && form.values.host === host)}>
					Submit
				</button>
			</div>
		</form>
	);
}

Search.propTypes = {
	host: PropTypes.string,
	type: PropTypes.string,
	className: PropTypes.string
};

Search.defaultProps = {
	host: '',
	type: 'java'
};