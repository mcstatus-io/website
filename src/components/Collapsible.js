'use client';

import { useState } from 'react';
import Chevron from '@/components/Chevron';

export default function Collapsible({ title, autoExpanded, id, noPadding = false, children, ...props }) {
	const [isExpanded, setExpanded] = useState(autoExpanded || false);

	return (
		<div {...props}>
			<button type="button" className={`card card-hover rounded-t ${isExpanded ? 'bg-black/10 dark:bg-white/10 rounded-b-none' : ''} p-4 flex justify-between items-center cursor-pointer w-full`} aria-controls={id} aria-expanded={isExpanded} onClick={() => setExpanded(!isExpanded)}>
				<span className="text-left">{title}</span>
				<Chevron width="24" height="24" isFlipped={isExpanded} />
			</button>
			<div className={`${isExpanded ? 'block' : 'hidden'} card ${noPadding ? 'p-0' : 'p-4'} rounded-t-none`} id={id}>
				{children}
			</div>
		</div>
	);
}