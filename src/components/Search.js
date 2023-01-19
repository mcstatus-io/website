import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Input from './Input';
import DropdownSelect from './DropdownSelect';
import { Button } from './Button';

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
				<DropdownSelect className="md:w-auto" id="type" defaultValue={form.values.type} onChange={form.handleChange} onBlur={form.handleBlur}>
					<option value="java" className="text-neutral-800">Java Edition</option>
					<option value="bedrock" className="text-neutral-800">Bedrock Edition</option>
				</DropdownSelect>
			</div>
			<div className="grow mb-3 md:mb-0">
				<Input type="text" id="host" placeholder="play.hypixel.net" defaultValue={form.values.host} onChange={form.handleChange} onBlur={form.handleBlur} error={form.errors.host} />
			</div>
			<div>
				<Button className="block w-full md:w-auto" disabled={!form.isValid || form.isSubmitting || (form.values.type === type && form.values.host === host)}>
					Submit
				</Button>
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