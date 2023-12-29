'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import CopyButton from '@/components/CopyButton';
import MinecraftFormatted from '@/components/MinecraftFormatted';

const colors = [
    { id: 'black', name: 'Black', code: '0', hex: '#000000' },
    { id: 'dark_blue', name: 'Dark Blue', code: '1', hex: '#0000AA' },
    { id: 'dark_green', name: 'Dark Green', code: '2', hex: '#00AA00' },
    { id: 'dark_aqua', name: 'Dark Aqua', code: '3', hex: '#00AAAA' },
    { id: 'dark_red', name: 'Dark Red', code: '4', hex: '#AA0000' },
    { id: 'dark_purple', name: 'Dark Purple', code: '5', hex: '#AA00AA' },
    { id: 'gold', name: 'Gold', code: '6', hex: '#FFAA00' },
    { id: 'gray', name: 'Gray', code: '7', hex: '#AAAAAA' },
    { id: 'dark_gray', name: 'Dark Gray', code: '8', hex: '#555555' },
    { id: 'blue', name: 'Blue', code: '9', hex: '#5555FF' },
    { id: 'green', name: 'Green', code: 'a', hex: '#55FF55' },
    { id: 'aqua', name: 'Aqua', code: 'b', hex: '#55FFFF' },
    { id: 'red', name: 'Red', code: 'c', hex: '#FF5555' },
    { id: 'light_purple', name: 'Light Purple', code: 'd', hex: '#FF55FF' },
    { id: 'yellow', name: 'Yellow', code: 'e', hex: '#FFFF55' },
    { id: 'white', name: 'White', code: 'f', hex: '#FFFFFF' }
];

const formatters = [
    { id: 'obfuscated', name: 'Obfuscated', code: 'k', className: 'minecraft-format-obfuscated' },
    { id: 'bold', name: 'Bold', code: 'l', className: 'font-bold' },
    { id: 'strikethrough', name: 'Strikethrough', code: 'm', className: 'line-through' },
    { id: 'underline', name: 'Underline', code: 'n', className: 'underline' },
    { id: 'italic', name: 'Italic', code: 'o', className: 'italic' },
    { id: 'reset', name: 'Reset', code: 'r', className: null }
];

const buildTreeFromText = (text) => {
    const result = [
        { color: 'white', formatters: [], text: '' }
    ];

    for (let i = 0, l = text.length; i < l; i++) {
        const lastItem = result[result.length - 1];
        const char = text.charAt(i);

        switch (char) {
            case '&': {
                const nextChar = text.charAt(i + 1);

                if (nextChar) {
                    const foundColor = colors.find((color) => color.code === nextChar);
                    const foundFormatter = formatters.find((formatter) => formatter.code === nextChar);

                    if (foundColor) {
                        if (lastItem.text.length > 0 || lastItem.formatters.length > 0) {
                            result.push({ color: foundColor.id, formatters: [], text: '' });
                        } else {
                            lastItem.color = foundColor.id;
                        }

                        i++;
                    } else if (foundFormatter) {
                        if (foundFormatter.id === 'reset') {
                            result.push({ color: 'white', formatters: [], text: '' });
                        } else {
                            if (lastItem.text.length > 0) {
                                result.push({ ...lastItem, formatters: [...new Set([...lastItem.formatters, foundFormatter.id])], text: '' });
                            } else {
                                lastItem.formatters = [...new Set([...lastItem.formatters, foundFormatter.id])];
                            }
                        }

                        i++;
                    } else {
                        lastItem.text += char;
                    }
                } else {
                    lastItem.text += char;
                }

                break;
            }
            case '\n': {
                result.push({ color: 'white', formatters: [], text: '\n' });

                break;
            }
            default:
                lastItem.text += char;
        }
    }

    return result.filter((item) => item.text.length > 0);
};

const buildElementFromItem = (item, index) => {
    const classes = [];

    for (const formatter of item.formatters) {
        const foundFormatter = formatters.find((f) => f.id === formatter);
        if (!foundFormatter || !foundFormatter.className) continue;

        classes.push(foundFormatter.className);
    }

    const foundColor = colors.find((color) => color.id === item.color);

    return (
        <span className={classes.join(' ')} style={{ color: foundColor?.hex ?? '#FFFFFF' }} key={index}>{item.text}</span>
    );
};

const getServerPropertiesCode = (tree) => {
    let result = 'motd=';

    for (const item of tree) {
        result += `\\u00A7${colors.find((color) => color.id === item.color)?.code ?? 'f'}${item.formatters.map((formatter) => formatters.find((f) => f.id === formatter)?.code).filter((v) => v).map((code) => `\\u00A7${code}`).join('')}${item.text.replaceAll('\n', '\\n')}`;
    }

    return result;
};

const getBungeeCordCode = (tree) => {
    let result = 'motd: "';

    for (const item of tree) {
        result += `&${colors.find((color) => color.id === item.color)?.code ?? 'f'}${item.formatters.map((formatter) => formatters.find((f) => f.id === formatter)?.code).filter((v) => v).map((code) => `&${code}`).join('')}${item.text.replaceAll('\n', '\\n')}`;
    }

    return result + '"';
};

const getServerListPlusCode = (tree) => {
    let result = 'Description:\n- |-\n  ';

    for (const item of tree) {
        result += `&${colors.find((color) => color.id === item.color)?.code ?? 'f'}${item.formatters.map((formatter) => formatters.find((f) => f.id === formatter)?.code).filter((v) => v).map((code) => `&${code}`).join('')}${item.text.replaceAll('\n', '\\n  ')}`;
    }

    return result;
};

export default function MOTDEditor() {
    const textareaElem = useRef();
    const searchParams = useSearchParams();

    const defaultText = searchParams.has('text') ? searchParams.get('text') : 'A Minecraft Server';

    const [text, setText] = useState(defaultText);
    const [tree, setTree] = useState(buildTreeFromText(defaultText));

    useEffect(() => {
        setTree(buildTreeFromText(text));
    }, [text]);

    const addFormattingCode = (code) => {
        if (!textareaElem || !textareaElem.current) return;

        const currentValue = textareaElem.current.value;
        const caretPosition = textareaElem.current.selectionStart;

        textareaElem.current.value = currentValue.substring(0, caretPosition) + '&' + code + currentValue.substring(caretPosition);
        textareaElem.current.focus();
        textareaElem.current.selectionStart = caretPosition + 2;
        textareaElem.current.selectionEnd = caretPosition + 2;

        setText(textareaElem.current.value);
    };

    const handleChange = (event) => {
        const value = event.target.value.split('\n').slice(0, 2).join('\n');

        setText(value);

        if (textareaElem && textareaElem.current) {
            textareaElem.current.value = value;
        }
    };

    return (
        <>
            <section className="pt-12">
                <h2 className="title">Editor</h2>
                <div className="card mt-3">
                    <div className="flex flex-wrap items-center gap-1">
                        {
                            colors.map(({ name, code, hex }, index) => (
                                <button type="button" className="button button-sm p-0" title={name} onClick={() => addFormattingCode(code)} key={index}>
                                    <span className="sr-only">{name}</span>
                                    <div className="block w-6 h-6 rounded" style={{ backgroundColor: hex }} />
                                </button>
                            ))
                        }
                        {
                            formatters.map(({ name, code, className }, index) => (
                                <button type="button" className={`button button-sm ${index === 0 ? 'ml-2' : ''}`} onClick={() => addFormattingCode(code)} key={index}>
                                    <span className={className}>{name}</span>
                                </button>
                            ))
                        }
                    </div>
                    <textarea className="input resize-none mt-3" rows="2" defaultValue={text} placeholder="Type your MOTD here..." onChange={handleChange} ref={textareaElem} />
                </div>
            </section>
            <section className="pt-12">
                <h2 className="title">Preview</h2>
                <MinecraftFormatted className="text-lg mt-3">
                    {
                        tree.length > 0
                            ? tree.map((item, index) => (
                                buildElementFromItem(item, index)
                            ))
                            : <span className="text-neutral-500">Edit your MOTD above...</span>
                    }
                </MinecraftFormatted>
            </section>
            <section className="pt-12">
                <h2 className="title">Code</h2>
                <div className="card mt-3">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <h3 className="title">Vanilla</h3>
                        <div className="flex items-center gap-3">
                            <code>server.properties</code>
                            <CopyButton className="button-sm gap-2" iconSize="16" text={getServerPropertiesCode(tree)} />
                        </div>
                    </div>
                    <pre className="bg-black p-5 mt-3 rounded overflow-auto"><code>{getServerPropertiesCode(tree)}</code></pre>
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mt-8">
                        <h3 className="title">BungeeCord</h3>
                        <div className="flex items-center gap-3">
                            <code>config.yml</code>
                            <CopyButton className="button-sm gap-2" iconSize="16" text={getBungeeCordCode(tree)} />
                        </div>
                    </div>
                    <pre className="bg-black p-5 mt-3 rounded overflow-auto"><code>{getBungeeCordCode(tree)}</code></pre>
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mt-8">
                        <h3 className="title">ServerListPlus</h3>
                        <div className="flex items-center gap-3">
                            <code>ServerListPlus.yml</code>
                            <CopyButton className="button-sm gap-2" iconSize="16" text={getServerListPlusCode(tree)} />
                        </div>
                    </div>
                    <pre className="bg-black p-5 mt-3 rounded overflow-auto"><code>{getServerListPlusCode(tree)}</code></pre>
                </div>
            </section>
            <section className="pt-12">
                <div className="flex items-center gap-3">
                    <h2 className="title">Permalink</h2>
                    <CopyButton className="button-sm font-sans gap-2" iconSize="16" text={`https://mcstatus.io/tools/motd?text=${encodeURIComponent(text)}`} />
                </div>
                <div className="card mt-3 overflow-auto">
                    <pre><code>https://mcstatus.io/tools/motd?text={encodeURIComponent(text)}</code></pre>
                </div>
            </section>
        </>
    );
}