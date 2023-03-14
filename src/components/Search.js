'use client';

import { useReducer } from 'react';
import { useRouter } from 'next/navigation';

const validHostRegEx = /^[A-Za-z0-9-_]+(\.[A-Za-z0-9-_]+)*(:\d{1,5})?$/;

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_HOST':
			return { ...state, host: action.value, isValid: validHostRegEx.test(action.value) };
		case 'SET_TYPE':
			return { ...state, type: action.value, isValid: validHostRegEx.test(action.value) };
		default:
			return state;
	}
};

export default function Search({ host, type, className }) {
	const { push } = useRouter();

	const [data, dispatch] = useReducer(reducer, { host: host ?? '', type: type ?? 'java', isValid: false });

	const handleSubmit = (event) => {
		event.preventDefault();

		push(`/status/${data.type}/${data.host.toLowerCase()}`);
	};

	return (
		<form className={`block md:flex items-center gap-5 ${className ?? ''}`} onSubmit={handleSubmit}>
			<div className="flex items-center gap-5 grow">
				<div className="mb-3 md:mb-0">
					<label className="sr-only" htmlFor="type">Server Type</label>
					<select className="select md:w-auto" id="type" defaultValue={type} onChange={(event) => dispatch({ type: 'SET_TYPE', value: event.target.value })}>
						<option value="java" className="text-neutral-800">Java Edition</option>
						<option value="bedrock" className="text-neutral-800">Bedrock Edition</option>
					</select>
				</div>
				<div className="grow mb-3 md:mb-0">
					<label className="sr-only" htmlFor="host">Host</label>
					<input type="text" className="input text-center md:text-left" id="host" placeholder="play.hypixel.net" defaultValue={host} onChange={(event) => dispatch({ type: 'SET_HOST', value: event.target.value })} />
				</div>
			</div>
			<div>
				<button type="submit" className="button block w-full md:w-auto" disabled={!data.isValid || (data.type === type && data.host === host)}>
					Submit
				</button>
			</div>
		</form>
	);
}