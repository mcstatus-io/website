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
		<form className={`block md:flex items-center gap-5 ${className}`} onSubmit={form.handleSubmit}>
			<div className="mb-3 md:mb-0">
				<select className="w-full md:w-auto appearance-none text-center border border-neutral-600 hover:border-neutral-500 focus:border-neutral-500 bg-transparent outline-none cursor-pointer px-3 py-2 rounded" id="type" defaultValue={form.values.type} onChange={form.handleChange} onBlur={form.handleBlur}>
					<option value="java" className="text-neutral-800">Java Edition</option>
					<option value="bedrock" className="text-neutral-800">Bedrock Edition</option>
				</select>
			</div>
			<div className="grow mb-3 md:mb-0">
				<input type="text" className={`border ${form.errors.host ? 'border-red-500' : 'border-neutral-600 hover:border-neutral-500 focus:border-neutral-500'} font-mono outline-none bg-transparent px-3 py-2 rounded w-full`} id="host" placeholder="play.hypixel.net" defaultValue={form.values.host} onChange={form.handleChange} onBlur={form.handleBlur} />
			</div>
			<div>
				<button type="submit" className="w-full md:w-auto border border-neutral-600 hover:border-neutral-500 focus:border-neutral-500 disabled:border-neutral-700 disabled:text-neutral-400 bg-transparent px-3 py-2 rounded" disabled={!form.isValid || form.isSubmitting || !form.dirty}>Submit</button>
			</div>
		</form>
	);
}

Search.propTypes = {
	host: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	className: PropTypes.string
};

Search.defaultProps = {
	host: '',
	type: 'java'
};