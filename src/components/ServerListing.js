'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ServerListing({ servers, initialCount = Infinity, incrementCount = 6, className = '' }) {
    const [count, setCount] = useState(initialCount);

    const handleClick = () => setCount(count + incrementCount);

    return (
        <>
            <ul className={`list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ${className}`}>
                {
                    servers.slice(0, count).map(({ type, address, name }, index) => (
                        <Link href={`/status/${type}/${address}`} className="button p-5" key={index}>
                            <div className="flex items-center gap-3">
                                <span className={`badge ${type === 'java' ? 'badge-green' : type === 'bedrock' ? 'badge-blue' : 'badge-gray'} text-xs`}>{type === 'java' ? 'Java' : type === 'bedrock' ? 'Bedrock' : 'Unknown'}</span>
                                <span className="font-bold">{name}</span>
                            </div>
                            <code className="block text-sm text-neutral-700 dark:text-neutral-300 mt-2">{address}</code>
                        </Link>
                    ))
                }
            </ul>
            <button type="button" className={`button py-3 mt-3 w-full ${count < servers.length ? 'flex' : 'hidden'} items-center justify-center gap-2`} onClick={handleClick}>
                <span>Show More Servers</span>
                <span className="text-neutral-500 text-sm">({servers.length - count} remaining)</span>
            </button>
        </>
    );
}