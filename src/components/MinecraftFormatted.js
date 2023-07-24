'use client';

import linkifyHtml from 'linkify-html';
import { useEffect, useRef } from 'react';

const obfuscatedCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`~!@#$%^&*()-_=+[]"\';:<>,./?';

export default function MinecraftFormatted({ html, className = '' }) {
    const containerElem = useRef();

    useEffect(() => {
        if (!containerElem || !containerElem.current) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const obfuscatedElems = containerElem.current.querySelectorAll('.minecraft-format-obfuscated');

        let renderRequest;

        const render = () => {
            if (prefersReducedMotion.matches) return;

            obfuscatedElems.forEach((elem) => {
                let value = '';

                for (let i = 0, l = elem.innerText.length; i < l; i++) {
                    value += obfuscatedCharacters.charAt(Math.floor(Math.random() * obfuscatedCharacters.length));
                }

                elem.innerText = value;
            });

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
        <pre className={`block bg-black text-white p-4 w-full overflow-x-auto ${className}`} dangerouslySetInnerHTML={{ __html: linkifyHtml(html, { className: 'hover:underline underline-offset-2', rel: 'noreferrer' }) }} ref={containerElem} />
    );
}