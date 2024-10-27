'use client';

import { useEffect } from 'react';
import * as Swetrix from 'swetrix';

/* eslint-disable @next/next/no-img-element */

export default function SwetrixLoader() {
    useEffect(() => {
        Swetrix.init('5pffz8E887ex', { devMode: true, apiURL: 'https://swetrix.mcstatus.io/log' });
        Swetrix.trackViews();
    }, []);

    return (
        <noscript>
            <img
                src="https://api.swetrix.com/log/noscript?pid=5pffz8E887ex"
                alt=""
                referrerPolicy="no-referrer-when-downgrade"
            />
        </noscript>
    );
}