import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

export default function StatusLayout({ host, type, isLoading, children }) {
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
		<>
			<div className="heading-group">
				<h1 className="title has-text-weight-semibold">Minecraft Server Status</h1>
				<p className="subtitle">Quickly retrieve the status of any Minecraft server</p>
			</div>
			<div className="box">
				<form onSubmit={form.handleSubmit}>
					<div className="columns is-multiline">
						<div className="column is-flex-grow-0">
							<div className="field">
								<div className="select">
									<select id="type" defaultValue={form.values.type} onChange={form.handleChange} onBlur={form.handleBlur} disabled={isLoading}>
										<option value="java">Java Edition</option>
										<option value="bedrock">Bedrock Edition</option>
									</select>
								</div>
							</div>
						</div>
						<div className="column is-flex-grow-1">
							<div className="field">
								<div className="control is-fullwidth">
									<input type="text" className={`input ${form.errors.host ? 'is-danger' : ''}`} id="host" placeholder="play.hypixel.net:25565" value={form.values.host} spellCheck="false" autoComplete="false" onChange={form.handleChange} onBlur={form.handleBlur} disabled={isLoading} />
								</div>
							</div>
						</div>
						<div className="column is-flex-grow-0">
							<button type="submit" className={`button is-fullwidth is-link ${isLoading ? 'is-loading' : ''}`} disabled={!form.isValid || isLoading || !form.dirty}>Submit</button>
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
	type: PropTypes.string,
	isLoading: PropTypes.bool,
	children: PropTypes.any
};

StatusLayout.defaultProps = {
	host: '',
	type: 'java',
	isLoading: false
};