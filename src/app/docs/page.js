import Image from 'next/image';
import { languageColors, languageNames, libraryList } from '@/assets/libraries';
import bedrockExample from '@/assets/response/bedrock.jsonc';
import iconExample from '@/assets/response/icon.png';
import javaWidgetDarkExample from '@/assets/response/java-widget-dark.png';
import javaWidgetLightExample from '@/assets/response/java-widget-light.png';
import javaExample from '@/assets/response/java.jsonc';
import Ad from '@/components/Ad';
import AnchorHeader from '@/components/AnchorHeader';
import Collapsible from '@/components/Collapsible';
import Container from '@/components/Container';
import Highlight from '@/components/Highlight';
import Navbar from '@/components/Navbar';

export const metadata = {
    title: 'API Documentation',
    description: 'Detailed documentation about our API and how to fetch the status of any Minecraft server through your service.',
    openGraph: {
        title: 'API Documentation - Minecraft Server Status',
        description: 'Detailed documentation about our API and how to fetch the status of any Minecraft server through your service.',
        url: '/docs',
        siteName: 'Minecraft Server Status',
        images: [
            {
                url: '/img/icon.png',
                width: 300,
                height: 300
            }
        ],
        locale: 'en-US',
        type: 'website'
    },
    alternates: {
        canonical: '/docs'
    }
};

export default function Page() {
    return (
        <>
            <Navbar active="api" />
            <Container>
                <hgroup>
                    <h1 className="title">API Documentation</h1>
                    <p className="subtitle">Documentation on how to integrate our API in your service</p>
                </hgroup>
                <Ad className="mt-5" />
                <section>
                    <section className="pt-12">
                        <AnchorHeader size={2} id="overview">Overview</AnchorHeader>
                        <p className="mt-3 leading-7">The goal of this API documentation is to accurately and precisely describe the functionality of this service in plain terms. This page will go over everything you need to know before implementing our API into your service. If you believe there is anything missing, any typos, or incorrect information on this page, please reach out to me via email at <a href="mailto:contact@mcstatus.io" className="link">contact@mcstatus.io</a>.</p>
                    </section>
                    <section className="pt-12">
                        <AnchorHeader size={3} id="standards">Standards</AnchorHeader>
                        <p className="mt-3 leading-7">The majority of this API uses the standardized REST API, which in simple terms means you will be making HTTP requests to our service. We currently only support endpoints using the <code>GET</code> method. All status endpoints return a response body in <a href="https://www.json.org/json-en.html" className="link">JSON format</a>, except if the response status code is not in the <code>200-299</code> success range, in which the body will be plain text. No other data formatting standard is available at this time, and there is currently no future plan to support anything other than JSON. All JSON returned from this service will have whitespace and any unnecessary characters removed to reduce network bandwidth and wasted information. You may learn more about the properties you receive from these routes by reading the documented response body from the route on this page.</p>
                    </section>
                    <section className="pt-12">
                        <AnchorHeader size={3} id="cache">Cache</AnchorHeader>
                        <p className="mt-3 leading-7">To reduce the amount of spam and deliberate denial-of-service attacks of our service, we implement a caching system for all of the data we fetch, including but not limited to status responses and server icons. Each route has its own cache duration, unique to the pathname of the request. Please note that adding query parameters to the request will not force a fresh request, it will still return the cached response. All routes with data retrieved from the cache will contain a header in the response with the key <code>X-Cache-Hit</code> which will contain a boolean value whether or not our service used a value from cache. The response will also contain a <code>X-Cache-Time-Remaining</code> header if the cache was hit, which contains an integer with the amount of seconds remaining until the cache expires for this request. Any request made after this cache expiration time will result in fresh data being retrieved on our end. No exceptions will be made to the cache duration. If you want to bypass the cache, we recommend that you self-host the <a href="https://github.com/mcstatus-io/ping-server" className="link">ping-server</a> available on our GitHub organization.</p>
                    </section>
                    <section className="pt-12">
                        <AnchorHeader size={3} id="supported">Supported Versions</AnchorHeader>
                        <p className="mt-3 leading-7">All Minecraft servers, including pre-netty rewrite Java Edition and Bedrock Edition servers, are supported. Make sure you are using the correct endpoint when retrieving a server status, as attempting to use the Java Edition status route with a Bedrock Edition host (or vise-versa) will result in a response saying the server is offline unless the server explicitly has cross-play supported. If the server you specify does not use the standard port value (<code>25565</code> for Java Edition, <code>19132</code> for Bedrock Edition), then you will need to specify the port by using the following format: <code>&lt;host&gt;:&lt;port&gt;</code>.</p>
                    </section>
                    <section className="pt-12">
                        <AnchorHeader size={3} id="error-handling">Error Handling</AnchorHeader>
                        <p className="mt-3 leading-7">You may encounter an error from any API endpoint if you attempt to use any malformed input, such as an incorrectly formatted server address or a strange value for a query parameter. Whether or not you expect it, you should always handle in case the server returns an error, always in the form of a non-200 status code response. If you do receive a non-200 status code response, the body will always contain a plain text string describing the error, with the <code>Content-Type</code> header set to <code>text/plain</code>. An example of a standard error is <code>Invalid address value</code>, returned if the server address provided is not in a recognized <code>&lt;host&gt;:&lt;port&gt;</code> or <code>&lt;host&gt;</code> format.</p>
                    </section>
                </section>
                <section className="pt-12">
                    <AnchorHeader size={2} id="revisions">Revisions</AnchorHeader>
                    <p className="mt-3 leading-7">Over the lifetime of this service, there has been a few changes that breaks compatibility with existing users who rely on consistent and non-changing data. When this happens, we release a new major version of the API called a revision, which is why you see <code>/v2</code> in the URL of all API requests. As time goes on, we can no longer support previous revisions and have to shut them down. You may refer to the table below to see any major revisions from the past up until present time. If you use our API, it is generally recommended to come back to this page every so often to confirm the revision you are using is not becoming deprecated.</p>
                    <div className="overflow-x-auto max-w-full">
                        <table className="table mt-5 min-w-[1560px]">
                            <thead>
                                <tr>
                                    <th>Revision</th>
                                    <th>Base URL</th>
                                    <th>Release Date</th>
                                    <th>Deprecation Date</th>
                                    <th>Changelog</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <span>Revision 1</span>
                                    </td>
                                    <td>
                                        <code>https://api.mcstatus.io/v1</code>
                                    </td>
                                    <td>
                                        <span>September 2021</span>
                                    </td>
                                    <td>
                                        <span>February 2023</span>
                                    </td>
                                    <td>
                                        <span>Initial API release</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>Revision 2</span>
                                    </td>
                                    <td>
                                        <code>https://api.mcstatus.io/v2</code>
                                    </td>
                                    <td>
                                        <span>July 2022</span>
                                    </td>
                                    <td>
                                        <span className="text-neutral-500">&mdash;</span>
                                    </td>
                                    <td>
                                        <ul className="flex flex-col gap-1 list-inside list-disc">
                                            <li>Moved response properties to root of response</li>
                                            <li>Support query lookup</li>
                                            <li>Added widgets</li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                <section>
                    <AnchorHeader size={2} id="routes" className="mt-12">Routes</AnchorHeader>
                    <section className="pt-3">
                        <div className="card">
                            <AnchorHeader size={3} id="java-status">Java Status</AnchorHeader>
                            <p className="mt-2 leading-7">Retrieves the status of any Java Edition Minecraft server. <code>&lt;address&gt;</code> should be replaced with the connection address of the server. For example, <code>play.hypixel.net</code> is a valid connection address as well as <code>play.hypixel.net:25565</code>.</p>
                            <p className="flex items-center gap-2 mt-3">
                                <span className="bg-green-700 rounded px-2 py-1 text-xs text-white">GET</span>
                                <code className="break-words">https://api.mcstatus.io<span className="font-bold">/v2/status/java/&lt;address&gt;</span></code>
                            </p>
                            <Collapsible title="Query Parameters" className="block mt-4">
                                <div className="max-w-full overflow-x-auto">
                                    <table className="table min-w-[640px]">
                                        <thead>
                                            <tr>
                                                <th className="w-[10%]">Value</th>
                                                <th className="w-[10%]">Data Type</th>
                                                <th className="w-[10%]">Default</th>
                                                <th className="w-[60%]">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>
                                                    <code>query</code>
                                                </th>
                                                <td>
                                                    <span>Boolean</span>
                                                </td>
                                                <td>
                                                    <code>true</code>
                                                </td>
                                                <td>
                                                    <span>Enables query lookup on the server, which provides additional information such as the <code>software</code> and <code>plugins</code> properties on the response. Disabling this may also speed up status retrieval times.</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Collapsible>
                            <Collapsible title="Response Body" className="block mt-2" noPadding>
                                <Highlight source={javaExample} className="bg-neutral-900" />
                            </Collapsible>
                        </div>
                    </section>
                    <section className="pt-3">
                        <div className="card">
                            <AnchorHeader size={3} id="bedrock-status">Bedrock Status</AnchorHeader>
                            <p className="mt-2 leading-7">Retrieves the status of any Bedrock Edition Minecraft server. <code>&lt;address&gt;</code> should be replaced with the connection address of the server. For example, <code>pe.mineplex.com</code> is a valid connection address as well as <code>pe.mineplex.com:19132</code>.</p>
                            <p className="flex items-center gap-2 mt-3">
                                <span className="bg-green-700 rounded px-2 py-1 text-xs text-white">GET</span>
                                <code className="break-words">https://api.mcstatus.io<span className="font-bold">/v2/status/bedrock/&lt;address&gt;</span></code>
                            </p>
                            <Collapsible title="Response Body" className="block mt-4" noPadding>
                                <Highlight source={bedrockExample} className="bg-neutral-900" />
                            </Collapsible>
                        </div>
                    </section>
                    <section className="pt-3">
                        <div className="card">
                            <AnchorHeader size={3} id="java-widget">Java Widget</AnchorHeader>
                            <p className="mt-2 leading-7">Returns a widget image containing information about the Java Edition server. This widget can be embedded into any website or any source that allows images via URL. The image is generated on every request, but the status of the server may be cached.</p>
                            <p className="flex items-center gap-2 mt-3">
                                <span className="bg-green-700 rounded px-2 py-1 text-xs text-white">GET</span>
                                <code className="break-words">https://api.mcstatus.io<span className="font-bold">/v2/widget/java/&lt;address&gt;</span></code>
                            </p>
                            <Collapsible title="Query Parameters" className="block mt-4">
                                <div className="max-w-full overflow-x-auto">
                                    <table className="table min-w-[640px]">
                                        <thead>
                                            <tr>
                                                <th className="w-[10%]">Value</th>
                                                <th className="w-[10%]">Data Type</th>
                                                <th className="w-[10%]">Default</th>
                                                <th className="w-[60%]">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>
                                                    <code>dark</code>
                                                </th>
                                                <td>
                                                    <span>Boolean</span>
                                                </td>
                                                <td>
                                                    <code>true</code>
                                                </td>
                                                <td>
                                                    <span>Enables dark mode for the widget image, making the background a dark gray color with the foreground text white.</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <code>rounded</code>
                                                </th>
                                                <td>
                                                    <span>Boolean</span>
                                                </td>
                                                <td>
                                                    <code>true</code>
                                                </td>
                                                <td>
                                                    <span>Makes the corners of the widget card rounded, leaving the missing corner area transparent.</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Collapsible>
                            <Collapsible title="Response Body" className="block mt-2">
                                <div className="flex flex-col lg:flex-row items-center gap-3">
                                    <Image src={javaWidgetLightExample} alt="Sample Java Edition server light widget" />
                                    <Image src={javaWidgetDarkExample} alt="Sample Java Edition server dark widget" />
                                </div>
                            </Collapsible>
                        </div>
                    </section>
                    <section className="pt-3">
                        <div className="card">
                            <AnchorHeader size={3} id="icon">Icon</AnchorHeader>
                            <p className="mt-2 leading-7">Returns just the icon/favicon of any Java Edition Minecraft server. If connection to the server fails or if the server is offline then the default icon is returned. The address value is optional, and if not provided then the default icon is returned.</p>
                            <p className="flex items-center gap-2 mt-3">
                                <span className="bg-green-700 rounded px-2 py-1 text-xs text-white">GET</span>
                                <code className="break-words">https://api.mcstatus.io<span className="font-bold">/v2/icon/&lt;address&gt;</span></code>
                            </p>
                            <Collapsible title="Response Body" className="block mt-4">
                                <Image src={iconExample} width="128" height="128" className="[image-rendering:pixelated;]" alt="Sample server icon" />
                                <p className="text-neutral-500 italic mt-3">(actual 64&times;64, scaled to 128&times;128)</p>
                            </Collapsible>
                        </div>
                    </section>
                    <section className="pt-3">
                        <div className="card">
                            <AnchorHeader size={3} id="vote">Send Vote</AnchorHeader>
                            <p className="mt-2 leading-7">Allows you to send a Votifier vote to the specified server. All data should be sent as query parameters. Only Votifier 2 is currently supported.</p>
                            <p className="flex items-center gap-2 mt-3">
                                <span className="bg-orange-600 rounded px-2 py-1 text-xs text-white">POST</span>
                                <code className="break-words">https://api.mcstatus.io<span className="font-bold">/v2/vote</span></code>
                            </p>
                            <Collapsible title="Query Parameters" className="block mt-4">
                                <div className="max-w-full overflow-x-auto">
                                    <table className="table min-w-[640px]">
                                        <thead>
                                            <tr>
                                                <th className="w-[15%]">Value</th>
                                                <th className="w-[15%]">Data Type</th>
                                                <th className="w-[15%]">Required</th>
                                                <th className="w-[15%]">Default</th>
                                                <th className="w-[40%]">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>
                                                    <code>host</code>
                                                </th>
                                                <td>
                                                    <span>String</span>
                                                </td>
                                                <td>
                                                    <span className="font-bold">Yes</span>
                                                </td>
                                                <td>
                                                    <span className="text-neutral-500">&mdash;</span>
                                                </td>
                                                <td>
                                                    <span>The host of the server to send the vote to.</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <code>port</code>
                                                </th>
                                                <td>
                                                    <span>Number</span>
                                                </td>
                                                <td>
                                                    <span>No</span>
                                                </td>
                                                <td>
                                                    <code>8192</code>
                                                </td>
                                                <td>
                                                    <span>The port of the Votifier server to send the vote to.</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <code>token</code>
                                                </th>
                                                <td>
                                                    <span>String</span>
                                                </td>
                                                <td>
                                                    <span className="font-bold">Yes</span>
                                                </td>
                                                <td>
                                                    <span className="text-neutral-500">&mdash;</span>
                                                </td>
                                                <td>
                                                    <span>The secure token used for authentication, generated by the Votifier plugin on the server.</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <code>username</code>
                                                </th>
                                                <td>
                                                    <span>String</span>
                                                </td>
                                                <td>
                                                    <span className="font-bold">Yes</span>
                                                </td>
                                                <td>
                                                    <span className="text-neutral-500">&mdash;</span>
                                                </td>
                                                <td>
                                                    <span>The username of the player who is sending the vote.</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <code>uuid</code>
                                                </th>
                                                <td>
                                                    <span>String</span>
                                                </td>
                                                <td>
                                                    <span>No</span>
                                                </td>
                                                <td>
                                                    <span className="text-neutral-500">&mdash;</span>
                                                </td>
                                                <td>
                                                    <span>The UUID of the player who is sending the vote.</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <code>serviceName</code>
                                                </th>
                                                <td>
                                                    <span>String</span>
                                                </td>
                                                <td>
                                                    <span>No</span>
                                                </td>
                                                <td>
                                                    <code>mcstatus.io</code>
                                                </td>
                                                <td>
                                                    <span>A short name of the service which is sending the vote. Typically the name of a Minecraft server listing website.</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <code>timestamp</code>
                                                </th>
                                                <td>
                                                    <span>String</span>
                                                </td>
                                                <td>
                                                    <span>No</span>
                                                </td>
                                                <td>
                                                    <span className="text-neutral-500 italic">(time of request)</span>
                                                </td>
                                                <td>
                                                    <span>The timestamp of the vote sent to the server.</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <code>version</code>
                                                </th>
                                                <td>
                                                    <span>Number</span>
                                                </td>
                                                <td>
                                                    <span>No</span>
                                                </td>
                                                <td>
                                                    <code>2</code>
                                                </td>
                                                <td>
                                                    <span>The Votifier version to use when sending the vote.</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Collapsible>
                            <Collapsible title="Response Body" className="block mt-2" noPadding>
                                <div className="bg-neutral-900 p-4">
                                    <span>The vote was successfully sent to the server</span>
                                </div>
                            </Collapsible>
                        </div>
                    </section>
                </section>
                <section className="pt-12">
                    <AnchorHeader size={2} id="debug">Debug Routes</AnchorHeader>
                    <p className="mt-3 leading-7">The following routes are used to test for any issues with the raw response from the server itself. These routes should not be implemented into your service, as they may be disabled or removed entirely at any random point without notice. If you experience issues with our API, try one of these routes to compare the response to what you should be expecting. Additionally, these routes have a very restrictive rate limit at only 1 request per 15 seconds, limited by IP address. The rate limit is this restrictive because there is no caching enabled for any of these routes.</p>
                    <Collapsible title="Routes List" className="pt-3">
                        <section>
                            <div className="card">
                                <div className="flex items-center gap-2">
                                    <h3 className="title">Java Status</h3>
                                    <span className="block text-xs text-orange-600 px-2 py-1 font-mono">DEBUG ONLY</span>
                                </div>
                                <p className="mt-2 leading-7">Returns the raw status response from the Java Edition Minecraft server. This route only works on 1.7 servers and up.</p>
                                <p className="flex items-center gap-2 mt-3">
                                    <span className="bg-green-700 rounded px-2 py-1 text-xs text-white">GET</span>
                                    <code className="break-words">https://api.mcstatus.io<span className="font-bold">/v2/debug/java/&lt;address&gt;</span></code>
                                </p>
                            </div>
                        </section>
                        <section className="pt-3">
                            <div className="card">
                                <div className="flex items-center gap-2">
                                    <h3 className="title">Legacy Java Status</h3>
                                    <span className="block text-xs text-orange-600 px-2 py-1 font-mono">DEBUG ONLY</span>
                                </div>
                                <p className="mt-2 leading-7">Returns the raw legacy status response from the Java Edition Minecraft server. This route only works on 1.6.4 servers and below.</p>
                                <p className="flex items-center gap-2 mt-3">
                                    <span className="bg-green-700 rounded px-2 py-1 text-xs text-white">GET</span>
                                    <code className="break-words">https://api.mcstatus.io<span className="font-bold">/v2/debug/legacy/&lt;address&gt;</span></code>
                                </p>
                            </div>
                        </section>
                        <section className="pt-3">
                            <div className="card">
                                <div className="flex items-center gap-2">
                                    <h3 className="title">Bedrock Status</h3>
                                    <span className="block text-xs text-orange-600 px-2 py-1 font-mono">DEBUG ONLY</span>
                                </div>
                                <p className="mt-2 leading-7">Returns the raw status response from the Bedrock Edition Minecraft server. This route only works on 1.7 servers and up.</p>
                                <p className="flex items-center gap-2 mt-3">
                                    <span className="bg-green-700 rounded px-2 py-1 text-xs text-white">GET</span>
                                    <code className="break-words">https://api.mcstatus.io<span className="font-bold">/v2/debug/bedrock/&lt;address&gt;</span></code>
                                </p>
                            </div>
                        </section>
                        <section className="pt-3">
                            <div className="card">
                                <div className="flex items-center gap-2">
                                    <h3 className="title">Basic Query</h3>
                                    <span className="block text-xs text-orange-600 px-2 py-1 font-mono">DEBUG ONLY</span>
                                </div>
                                <p className="mt-2 leading-7">Returns the raw basic query information from the Java Edition Minecraft server. The server must have query enabled for this to work.</p>
                                <p className="flex items-center gap-2 mt-3">
                                    <span className="bg-green-700 rounded px-2 py-1 text-xs text-white">GET</span>
                                    <code className="break-words">https://api.mcstatus.io<span className="font-bold">/v2/debug/query/basic/&lt;address&gt;</span></code>
                                </p>
                            </div>
                        </section>
                        <section className="pt-3">
                            <div className="card">
                                <div className="flex items-center gap-2">
                                    <h3 className="title">Full Query</h3>
                                    <span className="block text-xs text-orange-600 px-2 py-1 font-mono">DEBUG ONLY</span>
                                </div>
                                <p className="mt-2 leading-7">Returns the raw full query information from the Java Edition Minecraft server. The server must have query enabled for this to work.</p>
                                <p className="flex items-center gap-2 mt-3">
                                    <span className="bg-green-700 rounded px-2 py-1 text-xs text-white">GET</span>
                                    <code className="break-words">https://api.mcstatus.io<span className="font-bold">/v2/debug/query/full/&lt;address&gt;</span></code>
                                </p>
                            </div>
                        </section>
                    </Collapsible>
                </section>
                <section className="pt-12">
                    <AnchorHeader size={2} id="libraries">Libraries</AnchorHeader>
                    <p className="mt-3 leading-7">We try and provide official support for integrating our service into many languages. The list of official and unofficial libraries are below.</p>
                    <ul className="list-none flex flex-col gap-3 mt-3">
                        {
                            libraryList.map((library, index) => (
                                <li key={index}>
                                    <a href={library.url} className="button p-4 flex items-center gap-2">
                                        <span className="text-sm rounded px-2 py-1 bg-neutral-500 text-white">{library.official ? 'Official' : 'Unofficial'}</span>
                                        <span className="text-sm rounded px-2 py-1" style={{ color: languageColors[library.language][0], backgroundColor: languageColors[library.language][1] }}>{languageNames[library.language]}</span>
                                        <code className="text-black dark:text-white">{library.name}</code>
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </section>
                <section className="pt-12">
                    <AnchorHeader size={2} id="support">Support</AnchorHeader>
                    <p className="mt-3 leading-7">If you require any additional assistance or found a bug you would like to report, please send an email to <a href="mailto:api@mcstatus.io" className="link">api@mcstatus.io</a>. We will be more than happy to provide any assistance.</p>
                </section>
            </Container >
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify([
                    {
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        'itemListElement': [
                            {
                                '@type': 'ListItem',
                                'position': 1,
                                'name': 'Home',
                                'item': 'https://mcstatus.io'
                            },
                            {
                                '@type': 'ListItem',
                                'position': 2,
                                'name': 'API Documentation',
                                'item': 'https://mcstatus.io/docs'
                            }
                        ]
                    },
                    {
                        '@context': 'https://schema.org',
                        '@type': 'WebSite',
                        'url': 'https://mcstatus.io',
                        'potentialAction': {
                            '@type': 'SearchAction',
                            'target': {
                                '@type': 'EntryPoint',
                                'urlTemplate': 'https://mcstatus.io/status/java/{host}'
                            },
                            'query-input': 'required name=host'
                        }
                    }
                ])
            }} />
        </>
    );
}