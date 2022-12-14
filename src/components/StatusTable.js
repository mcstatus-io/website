import React from 'react';
import PropTypes from 'prop-types';

export default function StatusTable({ rows }) {
	return (
		<div>
			{
				rows.map(([label, content], index) => (
					<div className={`block lg:flex w-full p-4 ${index + 1 !== rows.length ? 'border-b border-b-neutral-700' : ''}`} key={index}>
						<span className="block lg:inline-block mb-1 lg:mb-0 w-64 font-semibold self-center">{label}</span>
						<div className="w-full">
							{content}
						</div>
					</div>
				))
			}
		</div>
	);
}

StatusTable.propTypes = {
	rows: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired
};