'use client';

import { useRouter } from 'next/navigation';
import { useReducer } from 'react';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';

const validHostRegEx = /^[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+(:\d{1,5})?$/;

const isValid = (state) => validHostRegEx.test(state.address) && ['java', 'bedrock'].includes(state.type);

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_ADDRESS':
            return { ...state, address: action.value };
        case 'SET_TYPE':
            return { ...state, type: action.value };
        default:
            return state;
    }
};

export default function Search({ type = 'java', address = '', className = '', autoFocus }) {
    const { push } = useRouter();

    const [data, dispatch] = useReducer(reducer, { type, address });

    const handleSubmit = (event) => {
        event.preventDefault();

        push(`/status/${data.type}/${data.address.toLowerCase()}`);
    };

    return (
        <form className={`flex flex-wrap items-center gap-3 ${className}`} onSubmit={handleSubmit}>
            <div className="basis-full sm:basis-auto">
                <label className="sr-only" htmlFor="type">Server Type</label>
                <select className="select w-full md:w-auto" id="type" defaultValue={type} onChange={(event) => dispatch({ type: 'SET_TYPE', value: event.target.value })}>
                    <option value="java" className="text-neutral-800">Java Edition</option>
                    <option value="bedrock" className="text-neutral-800">Bedrock Edition</option>
                </select>
            </div>
            <div className="grow">
                <label className="sr-only" htmlFor="address">Server Address</label>
                <input type="text" className="input text-center md:text-left w-full" id="address" placeholder="demo.mcstatus.io" defaultValue={address} onChange={(event) => dispatch({ type: 'SET_ADDRESS', value: event.target.value })} autoComplete="off" spellCheck="false" autoCapitalize="off" autoCorrect="off" autoFocus={autoFocus} />
            </div>
            <button type="submit" className="basis-full md:basis-auto button flex items-center justify-center gap-2" disabled={!isValid(data) || (data.type === type && data.address === address)}>
                <span>Submit</span>
                <ArrowRightIcon width="16" height="16" />
            </button>
        </form>
    );
}