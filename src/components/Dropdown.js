'use client';

import { useEffect, useRef, useState } from 'react';

export default function Dropdown({ text, className, align = 'left-0', children }) {
    const dropdownElem = useRef();
    const [isExpanded, setExpanded] = useState(false);

    useEffect(() => {
        const onClick = (event) => {
            if (!isExpanded || !dropdownElem || !dropdownElem.current) return;

            if (!dropdownElem.current.contains(event.target)) setExpanded(false);
        };

        window.addEventListener('click', onClick);

        return () => window.removeEventListener('click', onClick);
    }, [isExpanded]);

    return (
        <div className="relative" ref={dropdownElem}>
            <button type="button" className={className} onClick={() => setExpanded(!isExpanded)}>
                {text}
            </button>
            <div className={`absolute z-50 top-[calc(100%+0.5rem)] ${isExpanded ? 'block' : 'hidden'} ${align}`}>
                {typeof children === 'function' ? children({ isExpanded, setExpanded }) : children}
            </div>
        </div>
    );
}