'use client';

import { useEffect, useRef } from 'react';

const obfuscatedCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`~!@#$%^&*()-_=+[]"\';:<>,./?';

export default function MinecraftFormatted({ html, className = '', children }) {
    const containerElem = useRef();

    useEffect(() => {
        if (!containerElem || !containerElem.current) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const obfuscatedElems = containerElem.current.querySelectorAll('.minecraft-format-obfuscated');

        let renderRequest;

        const render = () => {
            if (prefersReducedMotion.matches) return;

            for (const elem of obfuscatedElems) {
                let value = '';

                for (let i = 0, l = elem.innerText.length; i < l; i++) {
                    value += obfuscatedCharacters.charAt(Math.floor(Math.random() * obfuscatedCharacters.length));
                }

                elem.innerText = value;
            }

            renderRequest = requestAnimationFrame(render);
        };

        const onMotionPreferenceChange = () => {
            if (prefersReducedMotion.matches) {
                cancelAnimationFrame(render);
            } else {
                render();
            }
        };

        onMotionPreferenceChange();

        prefersReducedMotion.addEventListener('change', onMotionPreferenceChange);

        return () => {
            cancelAnimationFrame(renderRequest);

            prefersReducedMotion.removeEventListener('change', onMotionPreferenceChange);
        };
    });

    return (
        html
            ? <pre className={`block bg-black rounded text-white p-5 w-full overflow-x-auto ${className}`} dangerouslySetInnerHTML={{ __html: html }} ref={containerElem} />
            : <pre className={`block bg-black rounded text-white p-5 w-full overflow-x-auto ${className}`} ref={containerElem}>{children}</pre>
    );
}