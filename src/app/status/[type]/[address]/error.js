'use client';

import { useEffect } from 'react';

export default function Error({ error }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <section>
            <div className="mt-4 card">
                <p className="text-red-500 dark:text-red-400">Something went wrong when trying to fetch the status of that server. Please check the console for more information and try again later.</p>
            </div>
        </section>
    );
}