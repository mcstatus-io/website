'use client';

import { useEffect, useRef, useState } from 'react';
import Chevron from '@/components/Chevron';

export default function Collapsible({ title, index = null, autoExpanded, id, noPadding = false, children, ...props }) {
    const [isExpanded, setExpanded] = useState(autoExpanded || false);
    const containerElem = useRef();

    useEffect(() => {
        if (window.location.hash.replace('#', '') !== id) return;

        setExpanded(true);

        containerElem.current.scrollIntoView(true);
    }, [containerElem]);

    return (
        <div {...props} ref={containerElem}>
            <button type="button" className={`card card-hover rounded-t ${isExpanded ? 'bg-opacity-[0.15] dark:bg-opacity-10 rounded-b-none' : ''} p-4 flex justify-between items-center cursor-pointer w-full`} aria-controls={id} aria-expanded={isExpanded} onClick={() => setExpanded(!isExpanded)}>
                <span className="text-left">
                    {
                        index !== null
                            ? <span className="mr-2 font-mono text-lg font-bold text-neutral-500">{index}</span>
                            : null
                    }
                    <span>{title}</span>
                </span>
                <Chevron width="24" height="24" isFlipped={isExpanded} />
            </button>
            <div className={`${isExpanded ? 'block' : 'hidden'} card ${noPadding ? 'p-0' : ''} rounded-t-none`} id={id}>
                {children}
            </div>
        </div>
    );
}