import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ChevronDown from '!!@svgr/webpack!../assets/icons/chevron-down.svg';
import ChevronUp from '!!@svgr/webpack!../assets/icons/chevron-up.svg';

export default function Collapsible({ className, title, children, autoExpanded, id }) {
	const [isExpanded, setExpanded] = useState(autoExpanded);

	return (
		<div className={className}>
			<button type="button" className={`interactive-box rounded-t ${isExpanded ? '' : 'rounded-b'} p-4 flex justify-between items-center cursor-pointer w-full`} aria-controls={id} aria-expanded={isExpanded} onClick={() => setExpanded(!isExpanded)}>
				<p className="font-bold">{title}</p>
				{
					isExpanded
						? <ChevronUp width="24" height="24" />
						: <ChevronDown width="24" height="24" />
				}
			</button>
			<div className={`${isExpanded ? 'block' : 'hidden'} box p-4 rounded-b border-t-0`} id={id}>
				{children}
			</div>
		</div>
	);
}

Collapsible.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.any.isRequired,
	autoExpanded: PropTypes.bool,
	id: PropTypes.string.isRequired,
	className: PropTypes.string
};

Collapsible.defaultProps = {
	autoExpanded: false
};