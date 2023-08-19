'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import CopyButton from '@/components/CopyButton';
import MinecraftFormatted from '@/components/MinecraftFormatted';

const getKeyByValue = (obj, v) => Object.keys(obj).find(k => obj[k] === v);

const colorCodes = {
    '0': 'black',
    '1': 'dark_blue',
    '2': 'dark_green',
    '3': 'dark_aqua',
    '4': 'dark_red',
    '5': 'dark_purple',
    '6': 'gold',
    '7': 'gray',
    '8': 'dark_gray',
    '9': 'blue',
    'a': 'green',
    'b': 'aqua',
    'c': 'red',
    'd': 'light_purple',
    'e': 'yellow',
    'f': 'white'
};

const colorHexValues = {
    'black': '#000000',
    'dark_blue': '#0000AA',
    'dark_green': '#00AA00',
    'dark_aqua': '#00AAAA',
    'dark_red': '#AA0000',
    'dark_purple': '#AA00AA',
    'gold': '#FFAA00',
    'gray': '#AAAAAA',
    'dark_gray': '#555555',
    'blue': '#5555FF',
    'green': '#55FF55',
    'aqua': '#55FFFF',
    'red': '#FF5555',
    'light_purple': '#FF55FF',
    'yellow': '#FFFF55',
    'white': '#FFFFFF'
};

const formattingCodes = {
    'k': 'obfuscated',
    'l': 'bold',
    'm': 'strikethrough',
    'n': 'underline',
    'o': 'italic'
};

const buildTreeFromText = (text) => {
    const result = [
        { color: 'white', text: '' }
    ];

    for (let i = 0, l = text.length; i < l; i++) {
        const char = text.charAt(i);

        switch (char) {
            case '&': {
                const nextChar = text.charAt(i + 1);

                if (!nextChar) continue;

                if (Object.keys(colorCodes).includes(nextChar)) {
                    result.push({ color: colorCodes[nextChar.toLowerCase()], text: '' });

                    i++;
                } else if (Object.keys(formattingCodes).includes(nextChar)) {
                    result.push({ ...result[result.length - 1], [formattingCodes[nextChar]]: true, text: '' });

                    i++;
                } else if (nextChar === 'r') {
                    result.push({ color: 'white', text: '' });

                    i++;
                } else {
                    result[result.length - 1].text += char;
                }

                break;
            }
            case '\n': {
                result.push({ reset: true, color: 'white', text: '\n' });

                break;
            }
            default:
                result[result.length - 1].text += char;
        }
    }

    return result;
};

const buildElementFromItem = (item, index) => {
    const classes = [];

    if (item.obfuscated) {
        classes.push('minecraft-format-obfuscated');
    }

    if (item.bold) {
        classes.push('font-bold');
    }

    if (item.strikethrough) {
        classes.push('line-through');
    }

    if (item.underline) {
        classes.push('underline');
    }

    if (item.italic) {
        classes.push('italic');
    }

    return (
        <span className={classes.join(' ')} style={{ color: colorHexValues[item.color] }} key={index}>{item.text}</span>
    );
};

const getServerPropertiesCode = (tree) => {
    let result = 'motd=';

    for (const item of tree) {
        let colorCode = `\\u00A7${getKeyByValue(colorCodes, item.color)}`;
        let formattingCodes = '';

        if (item.obfuscated) {
            formattingCodes += '\\u00A7k';
        }

        if (item.bold) {
            formattingCodes += '\\u00A7l';
        }

        if (item.strikethrough) {
            formattingCodes += '\\u00A7m';
        }

        if (item.underline) {
            formattingCodes += '\\u00A7n';
        }

        if (item.italic) {
            formattingCodes += '\\u00A7o';
        }

        if (item.reset) {
            formattingCodes += '\\u00A7r';
        }

        result += `${colorCode}${formattingCodes}${item.text.replaceAll('\n', '\\n')}`;
    }

    return result;
};

const getBungeeCordCode = (tree) => {
    let result = 'motd: "';

    for (const item of tree) {
        let colorCode = `&${getKeyByValue(colorCodes, item.color)}`;
        let formattingCodes = '';

        if (item.obfuscated) {
            formattingCodes += '&k';
        }

        if (item.bold) {
            formattingCodes += '&l';
        }

        if (item.strikethrough) {
            formattingCodes += '&m';
        }

        if (item.underline) {
            formattingCodes += '&n';
        }

        if (item.italic) {
            formattingCodes += '&o';
        }

        if (item.reset) {
            formattingCodes += '&r';
        }

        result += `${colorCode}${formattingCodes}${item.text.replaceAll('\n', '\\n')}`;
    }

    return result + '"';
};

const getServerListPlusCode = (tree) => {
    let result = 'Description:\n- |-\n  ';

    for (const item of tree) {
        let colorCode = `&${getKeyByValue(colorCodes, item.color)}`;
        let formattingCodes = '';

        if (item.obfuscated) {
            formattingCodes += '&k';
        }

        if (item.bold) {
            formattingCodes += '&l';
        }

        if (item.strikethrough) {
            formattingCodes += '&m';
        }

        if (item.underline) {
            formattingCodes += '&n';
        }

        if (item.italic) {
            formattingCodes += '&o';
        }

        if (item.reset) {
            formattingCodes += '&r';
        }

        result += `${colorCode}${formattingCodes}${item.text.replaceAll('\n', '\n  ')}`;
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
                        <button type="button" className="button button-sm p-0" title="Black" onClick={() => addFormattingCode('0')}>
                            <span className="sr-only">Black</span>
                            <div className="block w-6 h-6 bg-[#000000] rounded" />
                        </button>
                        <button type="button" className="button button-sm p-0" title="Dark Blue" onClick={() => addFormattingCode('1')}>
                            <span className="sr-only">Dark Blue</span>
                            <div className="block w-6 h-6 bg-[#0000AA] rounded" />
                        </button>
                        <button type="button" className="button button-sm p-0" title="Dark Green" onClick={() => addFormattingCode('2')}>
                            <span className="sr-only">Dark Green</span>
                            <div className="block w-6 h-6 bg-[#00AA00] rounded" />
                        </button>
                        <button type="button" className="button button-sm p-0" title="Dark Aqua" onClick={() => addFormattingCode('3')}>
                            <span className="sr-only">Dark Aqua</span>
                            <div className="block w-6 h-6 bg-[#00AAAA] rounded" />
                        </button>
                        <button type="button" className="button button-sm p-0" title="Dark Red" onClick={() => addFormattingCode('4')}>
                            <span className="sr-only">Dark Red</span>
                            <div className="block w-6 h-6 bg-[#AA0000] rounded" />
                        </button>
                        <button type="button" className="button button-sm p-0" title="Dark Purple" onClick={() => addFormattingCode('5')}>
                            <span className="sr-only">Dark Purple</span>
                            <div className="block w-6 h-6 bg-[#AA00AA] rounded" />
                        </button>
                        <button type="button" className="button button-sm p-0" title="Gold" onClick={() => addFormattingCode('6')}>
                            <span className="sr-only">Gold</span>
                            <div className="block w-6 h-6 bg-[#FFAA00] rounded" />
                        </button>
                        <button type="button" className="button button-sm p-0" title="Gray" onClick={() => addFormattingCode('7')}>
                            <span className="sr-only">Gray</span>
                            <div className="block w-6 h-6 bg-[#AAAAAA] rounded" />
                        </button>
                        <button type="button" className="button button-sm p-0" title="Dark Gray" onClick={() => addFormattingCode('8')}>
                            <span className="sr-only">Dark Gray</span>
                            <div className="block w-6 h-6 bg-[#555555] rounded" />
                        </button>
                        <button type="button" className="button button-sm p-0" title="Blue" onClick={() => addFormattingCode('9')}>
                            <span className="sr-only">Blue</span>
                            <div className="block w-6 h-6 bg-[#5555FF] rounded" />
                        </button>
                        <button type="button" className="button button-sm p-0" title="Green" onClick={() => addFormattingCode('a')}>
                            <span className="sr-only">Green</span>
                            <div className="block w-6 h-6 bg-[#55FF55] rounded" />
                        </button>
                        <button type="button" className="button button-sm p-0" title="Aqua" onClick={() => addFormattingCode('b')}>
                            <span className="sr-only">Aqua</span>
                            <div className="block w-6 h-6 bg-[#55FFFF] rounded" />
                        </button>
                        <button type="button" className="button button-sm p-0" title="Red" onClick={() => addFormattingCode('c')}>
                            <span className="sr-only">Red</span>
                            <div className="block w-6 h-6 bg-[#FF5555] rounded" />
                        </button>
                        <button type="button" className="button button-sm p-0" title="Light Purple" onClick={() => addFormattingCode('d')}>
                            <span className="sr-only">Light Purple</span>
                            <div className="block w-6 h-6 bg-[#FF55FF] rounded" />
                        </button>
                        <button type="button" className="button button-sm p-0" title="Yellow" onClick={() => addFormattingCode('e')}>
                            <span className="sr-only">Yellow</span>
                            <div className="block w-6 h-6 bg-[#FFFF55] rounded" />
                        </button>
                        <button type="button" className="button button-sm p-0" title="White" onClick={() => addFormattingCode('f')}>
                            <span className="sr-only">White</span>
                            <div className="block w-6 h-6 bg-[#FFFFFF] rounded" />
                        </button>
                        <button type="button" className="button button-sm ml-2" title="Obfuscated" onClick={() => addFormattingCode('k')}>
                            <span>Obfuscated</span>
                        </button>
                        <button type="button" className="button button-sm" title="Bold" onClick={() => addFormattingCode('l')}>
                            <span className="font-bold">Bold</span>
                        </button>
                        <button type="button" className="button button-sm" title="Strikethrough" onClick={() => addFormattingCode('m')}>
                            <span className="line-through">Strikethrough</span>
                        </button>
                        <button type="button" className="button button-sm" title="Underline" onClick={() => addFormattingCode('n')}>
                            <span className="underline">Underline</span>
                        </button>
                        <button type="button" className="button button-sm" title="Italic" onClick={() => addFormattingCode('o')}>
                            <span className="italic">Italic</span>
                        </button>
                        <button type="button" className="button button-sm" title="Reset" onClick={() => addFormattingCode('r')}>
                            <span>Reset</span>
                        </button>
                    </div>
                    <textarea className="input resize-none mt-3" rows="2" defaultValue={text} placeholder="Type your MOTD here..." onChange={handleChange} ref={textareaElem} />
                </div>
            </section>
            <section className="pt-12">
                <h2 className="title">Preview</h2>
                <MinecraftFormatted className="text-lg mt-3">
                    {
                        text.length > 0
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