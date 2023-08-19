'use client';

import { useEffect, useState } from 'react';
import AlertTriangleIcon from '@/assets/icons/alert-triangle.svg';
import CheckIcon from '@/assets/icons/check.svg';
import CopyIcon from '@/assets/icons/copy.svg';

export default function CopyButton({ baseButtonText = 'Copy', copiedButtonText = 'Copied', errorButtonText = 'Error', text, className = '', timeout = 1000 * 2, iconSize = '20' }) {
    const [state, setState] = useState('normal');

    const handleClick = async () => {
        try {
            await navigator.clipboard.writeText(text);

            setState('success');
        } catch (e) {
            setState('error');
        }
    };

    useEffect(() => {
        if (state === 'normal') return;

        setTimeout(() => setState('normal'), timeout);
    }, [state, timeout]);

    return (
        <button type="button" className={`button flex items-center ${state === 'error' ? 'text-red-500' : state === 'success' ? 'text-green-500' : ''} ${className}`} disabled={state !== 'normal'} onClick={handleClick}>
            {
                state === 'normal'
                    ? <>
                        <CopyIcon width={iconSize} height={iconSize} />
                        <span>{baseButtonText}</span>
                    </>
                    : state === 'success'
                        ? <>
                            <CheckIcon width={iconSize} height={iconSize} />
                            <span>{copiedButtonText}</span>
                        </>
                        : <>
                            <AlertTriangleIcon width={iconSize} height={iconSize} />
                            <span>{errorButtonText}</span>
                        </>
            }
        </button>
    );
}