import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

export default function StatusLayout({ host, isBedrock, isLoading, children }) {
	const { push } = useRouter();

	const form = useFormik({
		initialValues: { host, isBedrock },
		validationSchema: Yup
			.object()
			.shape({
				host: Yup.string().min(1).matches(/^[A-Za-z0-9-_]+(\.[A-Za-z0-9-_]+)*(:\d{1,5})?$/).required(),
				isBedrock: Yup.boolean().required()
			})
			.required(),
		onSubmit: ({ host, isBedrock }) => push(`/status/${isBedrock ? 'bedrock' : 'java'}/${host.toLowerCase()}`)
	});

	return (
		<>
			<div className="box">
				<form onSubmit={form.handleSubmit}>
					<div className="columns">
						<div className="column is-flex-grow-1">
							<div className="field">
								<div className="control is-fullwidth">
									<input type="text" className={`input ${form.errors.host ? 'is-danger' : ''}`} id="host" placeholder="play.hypixel.net OR play.hypixel.net:25565" value={form.values.host} spellCheck="false" autoComplete="false" onChange={form.handleChange} onBlur={form.handleBlur} disabled={isLoading} />
								</div>
							</div>
							<div className="field">
								<input type="checkbox" className="is-checkradio is-info" id="isBedrock" checked={form.values.isBedrock} onChange={form.handleChange} disabled={isLoading} />
								<label htmlFor="isBedrock">Bedrock server</label>
							</div>
						</div>
						<div className="column is-flex-grow-0">
							<button type="submit" className={`button is-fullwidth is-link ${isLoading ? 'is-loading' : ''}`} disabled={!form.isValid || isLoading}>Submit</button>
						</div>
					</div>
				</form>
			</div>
			{children}
		</>
	);
}

StatusLayout.propTypes = {
	host: PropTypes.string,
	isBedrock: PropTypes.bool,
	isLoading: PropTypes.bool,
	children: PropTypes.any
};

StatusLayout.defaultProps = {
	host: '',
	isBedrock: false,
	isLoading: false
};