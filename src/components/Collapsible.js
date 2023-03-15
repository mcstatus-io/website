'use client';

import { useState } from 'react';
import ChevronDown from '../assets/icons/chevron-down.svg';
import ChevronUp from '../assets/icons/chevron-up.svg';

export default function Collapsible({ className, title, children, autoExpanded, id }) {
	const [isExpanded, setExpanded] = useState(autoExpanded || false);

	return (
		<div className={className}>
			<button type="button" className={`interactive-box rounded-t ${isExpanded ? '' : 'rounded-b'} p-4 flex justify-between items-center cursor-pointer w-full`} aria-controls={id} aria-expanded={isExpanded} onClick={() => setExpanded(!isExpanded)}>
				<span className="font-bold text-left">{title}</span>
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