'use client';

import { useState } from 'react';
import Chevron from '@/components/Chevron';

export default function Collapsible({ title, autoExpanded, id, noPadding = false, children, ...props }) {
	const [isExpanded, setExpanded] = useState(autoExpanded || false);

	return (
		<div {...props}>
			<button type="button" className={`interactive-box rounded-t ${isExpanded ? '' : 'rounded-b'} p-4 flex justify-between items-center cursor-pointer w-full`} aria-controls={id} aria-expanded={isExpanded} onClick={() => setExpanded(!isExpanded)}>
				<span className="text-left">{title}</span>
				<Chevron width="24" height="24" isFlipped={isExpanded} />
			</button>
			<div className={`${isExpanded ? 'block' : 'hidden'} box ${noPadding ? '' : 'p-4'} rounded-b border-t-0`} id={id}>
				{children}
			</div>
		</div>
	);
}