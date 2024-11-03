'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import * as Swetrix from 'swetrix';

/* eslint-disable @next/next/no-img-element */

export default function SwetrixLoader() {
    const pathname = usePathname();

    useEffect(() => {
        Swetrix.init(process.env.NEXT_PUBLIC_SWETRIX_PROJECT_ID, { apiURL: process.env.NEXT_PUBLIC_SWETRIX_API_URL });
        Swetrix.trackErrors();
    }, []);

    useEffect(() => {
        Swetrix.pageview({
            payload: {
                pg: pathname
            }
        });
    }, [pathname]);

    return (
        <noscript>
            <img src={`${process.env.NEXT_PUBLIC_SWETRIX_API_URL}/noscript?pid=5pffz8E887ex`} alt="Swetrix" referrerPolicy="no-referrer-when-downgrade" />
        </noscript>
    );
}