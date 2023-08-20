'use client';

import { useFormik } from 'formik';
import LoadingIcon from '@/assets/icons/loading.svg';

const getMinecraftPlayer = async (username) => {
    const result = await fetch(`https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(username)}`);
    const body = await result.json();

    return body;
};

const sendVotifierVote = async ({ version, host, port, username, uuid = null, token }) => {
    const searchParams = new URLSearchParams();
    searchParams.set('version', version);
    searchParams.set('host', host);
    searchParams.set('port', port);
    searchParams.set('username', username);
    if (version === '2') searchParams.set('uuid', uuid);
    searchParams.set(version === '1' ? 'publickey' : 'token', token);

    const result = await fetch(`${process.env.NEXT_PUBLIC_PING_HOST}/vote?${searchParams.toString()}`, {
        method: 'POST'
    });

    return result.ok;
};

export default function VotifierTester({ className = '' }) {
    const form = useFormik({
        initialValues: {
            version: '2',
            host: '',
            port: 8192,
            username: '',
            token: ''
        },
        validate: (values) => {
            const errors = {};

            if (!['1', '2'].includes(values.version)) {
                errors.version = 'Invalid version';
            }

            if (values.host.length < 1) {
                errors.host = 'Required';
            }

            if (values.port < 0) {
                errors.port = 'Must be at least 0';
            } else if (values.port > 65535) {
                errors.port = 'Must be at most 65535';
            } else if (!Number.isInteger(values.port)) {
                errors.port = 'Must be an integer';
            }

            if (values.username.length < 1) {
                errors.username = 'Required';
            } else if (values.username.length > 16) {
                errors.username = 'Must be at most 16 characters';
            } else if (!/^[A-Za-z0-9_]{1,16}$/.test(values.username)) {
                errors.username = 'Invalid characters found in username';
            }

            if (values.token.length < 1) {
                errors.token = 'Required';
            }

            return errors;
        },
        onSubmit: async ({ version, host, port, username, token }, { setStatus }) => {
            setStatus(null);

            let profile;

            if (version === '2') {
                try {
                    profile = await getMinecraftPlayer(username);
                } catch (e) {
                    console.error(e);

                    setStatus({ error: 'Failed to fetch Minecraft player from Mojang, please try again later.' });

                    return;
                }
            }

            let success = false;

            try {
                success = await sendVotifierVote({ version, host, port, username, token, uuid: profile?.uuid });
            } catch (e) {
                console.error(e);

                setStatus({ error: 'Failed to send vote to the specified Minecraft server. Are all the connection details and token correct?' });

                return;
            }

            setStatus(success ? { success: true } : { error: 'Failed to send vote to the specified Minecraft server. Are all the connection details and token correct?' });
        }
    });

    return (
        <div className={`card ${className}`}>
            <form onSubmit={form.handleSubmit}>
                <div className="flex flex-col lg:flex-row gap-5">
                    <div className="basis-1/4">
                        <label className="label" htmlFor="version">Version</label>
                        <select className="select block" id="version" defaultValue={form.values.version} onChange={form.handleChange} onBlur={form.handleBlur} disabled={form.isSubmitting}>
                            <option value="1">Votifier 1</option>
                            <option value="2">Votifier 2</option>
                        </select>
                        {
                            form.errors.version
                                ? <p className="text-red-500 text-sm mt-1">{form.errors.version}</p>
                                : null
                        }
                    </div>
                    <div className="basis-1/4">
                        <label className="label" htmlFor="host">Host</label>
                        <input type="text" className="input" id="host" placeholder="play.example.com" defaultValue={form.values.host} onChange={form.handleChange} onBlur={form.handleBlur} disabled={form.isSubmitting} />
                        {
                            form.errors.host
                                ? <p className="text-red-500 text-sm mt-1">{form.errors.host}</p>
                                : null
                        }
                    </div>
                    <div className="basis-1/4">
                        <label className="label" htmlFor="port">Port</label>
                        <input type="number" className="input" id="port" min="0" max="65535" step="1" defaultValue={form.values.port} onChange={form.handleChange} onBlur={form.handleBlur} disabled={form.isSubmitting} />
                        {
                            form.errors.port
                                ? <p className="text-red-500 text-sm mt-1">{form.errors.port}</p>
                                : null
                        }
                    </div>
                    <div className="basis-1/4">
                        <label className="label" htmlFor="username">Username</label>
                        <input type="text" className="input" id="username" placeholder="Notch" defaultValue={form.values.username} onChange={form.handleChange} onBlur={form.handleBlur} disabled={form.isSubmitting} />
                        {
                            form.errors.username
                                ? <p className="text-red-500 text-sm mt-1">{form.errors.username}</p>
                                : null
                        }
                    </div>
                </div>
                <div className="mt-5">
                    <label className="label" htmlFor="token">{form.values.version === '1' ? 'Public Key' : 'Token'}</label>
                    <textarea className="input" id="token" placeholder={form.values.version === '1' ? 'This is the public key generated by your Votifier plugin. This will be the contents of your \'rsa/public.key\' file.' : 'This the secret value generated by your Votifier plugin. It will be located somewhere in the configuration file of the plugin.'} rows="8" defaultValue={form.values.token} onChange={form.handleChange} onBlur={form.handleBlur} disabled={form.isSubmitting} />
                    {
                        form.errors.token
                            ? <p className="text-red-500 text-sm mt-1">{form.errors.token}</p>
                            : null
                    }
                </div>
                <button type="submit" className="button flex justify-center w-full mt-5" disabled={form.isSubmitting || !form.isValid}>
                    {
                        form.isSubmitting
                            ? <LoadingIcon width="24" height="24" />
                            : <span>Send Vote</span>
                    }
                </button>
                {
                    form.status?.success
                        ? <p className="text-green-500 mt-3">Successfully sent a vote to the specified server.</p>
                        : form.status?.error
                            ? <p className="text-red-500 mt-3">{form.status.error}</p>
                            : null
                }
            </form>
        </div>
    );
}