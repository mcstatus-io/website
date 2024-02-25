'use client';

import { useState } from 'react';

export function RevisionRow({ name, baseURL, releaseDate = null, deprecationDate = null, changelog = [] }) {
    const [showChanges, setShowChanges] = useState(false);

    return (
        <tr>
            <td>
                <span>{name}</span>
            </td>
            <td>
                <code>
                    <span>https://api.mcstatus.io</span>
                    <span className="font-bold">{baseURL}</span>
                </code>
            </td>
            <td>
                {
                    releaseDate
                        ? <span>{releaseDate}</span>
                        : <span className="text-neutral-500">&mdash;</span>
                }
            </td>
            <td>
                {
                    deprecationDate
                        ? <span>{deprecationDate}</span>
                        : <span className="text-neutral-500">&mdash;</span>
                }
            </td>
            <td>
                {
                    changelog.length > 0
                        ? changelog.length <= 1
                            ? <span>{changelog[0]}</span>
                            : showChanges
                                ? <ul className="flex flex-col gap-1 list-disc list-inside">
                                    {
                                        changelog.map((desc, index) => (
                                            <li key={index}>{desc}</li>
                                        ))
                                    }
                                </ul>
                                : <button type="button" className="button button-border button-sm" onClick={() => setShowChanges(true)}>Click to show changelog</button>
                        : <span className="text-neutral-500">&mdash;</span>
                }
            </td>
        </tr>
    );
}

export default function RevisionsTable({ children, className = '' }) {
    return (
        <table className={`table min-w-[1560px] ${className}`}>
            <thead>
                <tr>
                    <th>Revision</th>
                    <th>Base URL</th>
                    <th>Release Date</th>
                    <th>Deprecation Date</th>
                    <th>Changelog</th>
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    );
}