import Image from 'next/image';
import { languageColors, languageNames, libraryList } from '@/assets/libraries';
import bedrockExample from '@/assets/response/bedrock.jsonc';
import iconExample from '@/assets/response/icon.png';
import javaWidgetDarkExample from '@/assets/response/java-widget-dark.png';
import javaWidgetLightExample from '@/assets/response/java-widget-light.png';
import javaExample from '@/assets/response/java.jsonc';
import AnchorHeader from '@/components/AnchorHeader';
import CarbonAd from '@/components/CarbonAd';
import Collapsible from '@/components/Collapsible';
import Highlight from '@/components/Highlight';
import RevisionsTable, { RevisionRow } from '@/components/docs/RevisionsTable';

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
            <div className="container">
                <section>
                    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                        <hgroup>
                            <h1 className="title">API Documentation</h1>
                            <p className="subtitle">Documentation on how to integrate our API in your service</p>
                        </hgroup>
                        <CarbonAd />
                    </div>
                </section>
                <section>
                    <section className="pt-12">
                        <AnchorHeader size={2} id="overview">Overview</AnchorHeader>
                        <p className="mt-3 leading-7 text-neutral-700 dark:text-neutral-300">The goal of this API documentation is to accurately and precisely describe the functionality of this service in plain terms. This page will go over everything you need to know before implementing our API into your service. If you believe there is anything missing, any typos, or incorrect information on this page, please reach out to me via email at <a href="mailto:contact@mcstatus.io" className="link" rel="nofollow">contact@mcstatus.io</a>.</p>
                    </section>
                    <section className="pt-12">
                        <AnchorHeader size={3} id="standards">Standards</AnchorHeader>
                        <p className="mt-3 leading-7 text-neutral-700 dark:text-neutral-300">The majority of this API uses the standardized REST API, which in simple terms means you will be making HTTP requests to our service. We currently only support endpoints using the <code>GET</code> and <code>POST</code> methods. All status endpoints return a response body in <a href="https://www.json.org/json-en.html" className="link">JSON format</a>, except if the response status code is not in the <code>200-299</code> success range, in which the body will be plain text. No other data formatting standard is available at this time, and there is currently no future plan to support anything other than JSON. All JSON returned from this service will have whitespace and any unnecessary characters removed to reduce network bandwidth and wasted information. You may learn more about the properties you receive from these routes by reading the documented response body from the route on this page.</p>
                    </section>
                    <section className="pt-12">
                        <AnchorHeader size={3} id="cache">Cache</AnchorHeader>
                        <p className="mt-3 leading-7 text-neutral-700 dark:text-neutral-300">To reduce the amount of spam and deliberate denial-of-service attacks of our service, we implement a caching system for all of the data we fetch, including but not limited to status responses and server icons. Each route has its own cache duration, unique to the pathname of the request. Please note that adding query parameters to the request will not force a fresh request, it will still return the cached response. All routes with data retrieved from the cache will contain a header in the response with the key <code>X-Cache-Hit</code> which will contain a boolean value whether or not our service used a value from cache. The response will also contain a <code>X-Cache-Time-Remaining</code> header if the cache was hit, which contains an integer with the amount of seconds remaining until the cache expires for this request. Any request made after this cache expiration time will result in fresh data being retrieved on our end. No exceptions will be made to the cache duration. If you want to bypass the cache, we recommend that you self-host the <a href="https://github.com/mcstatus-io/ping-server" className="link">ping-server</a> available on our GitHub organization.</p>
                    </section>
                    <section className="pt-12">
                        <AnchorHeader size={3} id="supported">Supported Versions</AnchorHeader>
                        <p className="mt-3 leading-7 text-neutral-700 dark:text-neutral-300">All Minecraft servers, including modern and legacy Java Edition servers, and Bedrock Edition servers, are supported. Make sure you are using the correct endpoint when retrieving a server status, as attempting to use the Java Edition status route with a Bedrock Edition host (or vise-versa) will result in a response saying the server is offline unless the server explicitly has cross-play supported. If the server you specify does not use the standard port value (<code>25565</code> for Java Edition, <code>19132</code> for Bedrock Edition), then you will need to specify the port by using the following format: <code>&lt;host&gt;:&lt;port&gt;</code>.</p>
                    </section>
                    <section className="pt-12">
                        <AnchorHeader size={3} id="error-handling">Error Handling</AnchorHeader>
                        <p className="mt-3 leading-7 text-neutral-700 dark:text-neutral-300">You may encounter an error from any API endpoint if you attempt to use any malformed input, such as an incorrectly formatted server address or a strange value for a query parameter. Whether or not you expect it, you should always handle in case the server returns an error, always in the form of a non-200 status code response. If you do receive a non-200 status code response, the body will always contain a plain text string describing the error, with the <code>Content-Type</code> header set to <code>text/plain</code>. An example of a standard error is <code>Invalid address value</code>, returned if the server address provided is not in a recognized <code>&lt;host&gt;:&lt;port&gt;</code> or <code>&lt;host&gt;</code> format.</p>
                    </section>
                </section>
                <section className="pt-12">
                    <AnchorHeader size={2} id="revisions">Revisions</AnchorHeader>
                    <p className="mt-3 leading-7 text-neutral-700 dark:text-neutral-300">Over the lifetime of this service, there has been a few changes that breaks compatibility with existing users who rely on consistent and non-changing data. When this happens, we release a new major version of the API called a revision, which is why you see <code>/v2</code> in the URL of all API requests. As time goes on, we can no longer support previous revisions and have to shut them down. You may refer to the table below to see any major revisions from the past up until present time. If you use our API, it is generally recommended to come back to this page every so often to confirm the revision you are using is not becoming deprecated.</p>
                    <div className="max-w-full p-0 mt-3 overflow-x-auto card">
                        <RevisionsTable>
                            <RevisionRow
                                name="Revision 1"
                                baseURL="/v1"
                                releaseDate="September 2021"
                                deprecationDate="February 2023"
                                changelog={['Initial API release']}
                            />
                            <RevisionRow
                                name="Revision 2"
                                baseURL="/v2"
                                releaseDate="July 2022"
                                changelog={[
                                    'Moved response properties to root of response',
                                    'Support query lookup',
                                    'Added widgets',
                                    'Added vote route'
                                ]}
                            />
                        </RevisionsTable>
                    </div>
                </section>
                <section>
                    <AnchorHeader size={2} id="routes" className="mt-12">Routes</AnchorHeader>
                    <section className="pt-3">
                        <div className="card">
                            <AnchorHeader size={3} id="java-status">Java Status</AnchorHeader>
                            <p className="mt-2 leading-7 text-neutral-700 dark:text-neutral-300">Retrieves the status of any Java Edition Minecraft server. <code>&lt;address&gt;</code> should be replaced with the connection address of the server. For example, <code>play.hypixel.net</code> is a valid connection address as well as <code>play.hypixel.net:25565</code>.</p>
                            <p className="flex items-center gap-2 mt-3">
                                <span className="text-xs badge badge-blue">GET</span>
                                <code className="break-words">https://api.mcstatus.io<span className="font-bold">/v2/status/java/&lt;address&gt;</span></code>
                            </p>
                            <Collapsible title="Query Parameters" className="block mt-4">
                                <div className="max-w-full p-0 overflow-x-auto card">
                                    <table className="table min-w-[640px]">
                                        <thead>
                                            <tr>
                                                <th className="w-[10%]">Key</th>
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
                                            <tr>
                                                <th>
                                                    <code>timeout</code>
                                                </th>
                                                <td>
                                                    <span>Number</span>
                                                </td>
                                                <td>
                                                    <code>5.0</code>
                                                </td>
                                                <td>
                                                    <span>The amount of seconds until the status retrieval times out and an offline response is returned. This can also be a floating point number.</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Collapsible>
                            <Collapsible title="Response Body" className="block mt-2" noPadding>
                                <Highlight source={javaExample} className="rounded-b bg-neutral-900" />
                            </Collapsible>
                        </div>
                    </section>
                    <section className="pt-3">
                        <div className="card">
                            <AnchorHeader size={3} id="bedrock-status">Bedrock Status</AnchorHeader>
                            <p className="mt-2 leading-7 text-neutral-700 dark:text-neutral-300">Retrieves the status of any Bedrock Edition Minecraft server. <code>&lt;address&gt;</code> should be replaced with the connection address of the server. For example, <code>pe.mineplex.com</code> is a valid connection address as well as <code>pe.mineplex.com:19132</code>.</p>
                            <p className="flex items-center gap-2 mt-3">
                                <span className="text-xs badge badge-blue">GET</span>
                                <code className="break-words">https://api.mcstatus.io<span className="font-bold">/v2/status/bedrock/&lt;address&gt;</span></code>
                            </p>
                            <Collapsible title="Query Parameters" className="block mt-4">
                                <div className="max-w-full p-0 overflow-x-auto card">
                                    <table className="table min-w-[640px]">
                                        <thead>
                                            <tr>
                                                <th className="w-[10%]">Key</th>
                                                <th className="w-[10%]">Data Type</th>
                                                <th className="w-[10%]">Default</th>
                                                <th className="w-[60%]">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>
                                                    <code>timeout</code>
                                                </th>
                                                <td>
                                                    <span>Number</span>
                                                </td>
                                                <td>
                                                    <code>5.0</code>
                                                </td>
                                                <td>
                                                    <span>The amount of seconds until the status retrieval times out and an offline response is returned. This can also be a floating point number.</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Collapsible>
                            <Collapsible title="Response Body" className="block mt-2" noPadding>
                                <Highlight source={bedrockExample} className="rounded-b bg-neutral-900" />
                            </Collapsible>
                        </div>
                    </section>
                    <section className="pt-3">
                        <div className="card">
                            <AnchorHeader size={3} id="java-widget">Java Widget</AnchorHeader>
                            <p className="mt-2 leading-7 text-neutral-700 dark:text-neutral-300">Returns a widget image containing information about the Java Edition server. This widget can be embedded into any website or any source that allows images via URL. The image is generated on every request, but the status of the server may be cached.</p>
                            <p className="flex items-center gap-2 mt-3">
                                <span className="text-xs badge badge-blue">GET</span>
                                <code className="break-words">https://api.mcstatus.io<span className="font-bold">/v2/widget/java/&lt;address&gt;</span></code>
                            </p>
                            <Collapsible title="Query Parameters" className="block mt-4">
                                <div className="max-w-full p-0 overflow-x-auto card">
                                    <table className="table min-w-[640px]">
                                        <thead>
                                            <tr>
                                                <th className="w-[10%]">Key</th>
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
                                            <tr>
                                                <th>
                                                    <code>timeout</code>
                                                </th>
                                                <td>
                                                    <span>Number</span>
                                                </td>
                                                <td>
                                                    <code>5.0</code>
                                                </td>
                                                <td>
                                                    <span>The amount of seconds until the status retrieval times out and an offline response is returned. This can also be a floating point number.</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Collapsible>
                            <Collapsible title="Response Body" className="block mt-2">
                                <div className="flex flex-col items-center gap-3 lg:flex-row">
                                    <Image src={javaWidgetLightExample} alt="Sample Java Edition server light widget" />
                                    <Image src={javaWidgetDarkExample} alt="Sample Java Edition server dark widget" />
                                </div>
                            </Collapsible>
                        </div>
                    </section>
                    <section className="pt-3">
                        <div className="card">
                            <AnchorHeader size={3} id="icon">Icon</AnchorHeader>
                            <p className="mt-2 leading-7 text-neutral-700 dark:text-neutral-300">Returns just the icon/favicon of any Java Edition Minecraft server. If connection to the server fails or if the server is offline then the default icon is returned. The address value is optional, and if not provided then the default icon is returned.</p>
                            <p className="flex items-center gap-2 mt-3">
                                <span className="text-xs badge badge-blue">GET</span>
                                <code className="break-words">https://api.mcstatus.io<span className="font-bold">/v2/icon/&lt;address&gt;</span></code>
                            </p>
                            <Collapsible title="Query Parameters" className="block mt-4">
                                <div className="max-w-full p-0 overflow-x-auto card">
                                    <table className="table min-w-[640px]">
                                        <thead>
                                            <tr>
                                                <th className="w-[10%]">Key</th>
                                                <th className="w-[10%]">Data Type</th>
                                                <th className="w-[10%]">Default</th>
                                                <th className="w-[60%]">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>
                                                    <code>timeout</code>
                                                </th>
                                                <td>
                                                    <span>Number</span>
                                                </td>
                                                <td>
                                                    <code>5.0</code>
                                                </td>
                                                <td>
                                                    <span>The amount of seconds until the status retrieval times out and an offline response is returned. This can also be a floating point number.</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Collapsible>
                            <Collapsible title="Response Body" className="block mt-2">
                                <Image src={iconExample} width="128" height="128" className="[image-rendering:pixelated;]" alt="Sample server icon" />
                                <p className="mt-3 italic text-neutral-500">(actual 64&times;64, scaled to 128&times;128)</p>
                            </Collapsible>
                        </div>
                    </section>
                    <section className="pt-3">
                        <div className="card">
                            <AnchorHeader size={3} id="vote">Send Vote</AnchorHeader>
                            <p className="mt-2 leading-7 text-neutral-700 dark:text-neutral-300">Allows you to send a Votifier vote to the specified server. All data should be sent as query parameters.</p>
                            <p className="flex items-center gap-2 mt-3">
                                <span className="text-xs badge badge-green">POST</span>
                                <code className="break-words">https://api.mcstatus.io<span className="font-bold">/v2/vote</span></code>
                            </p>
                            <Collapsible title="Query Parameters" className="block mt-4">
                                <div className="max-w-full p-0 overflow-x-auto card">
                                    <table className="table min-w-[640px]">
                                        <thead>
                                            <tr>
                                                <th className="w-[15%]">Key</th>
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
                                                    <code>timeout</code>
                                                </th>
                                                <td>
                                                    <span>Number</span>
                                                </td>
                                                <td>
                                                    <span>No</span>
                                                </td>
                                                <td>
                                                    <code>5.0</code>
                                                </td>
                                                <td>
                                                    <span>The amount of seconds until the connection times out with the server.</span>
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
                                                    <span className="italic text-neutral-500">(time of request)</span>
                                                </td>
                                                <td>
                                                    <span>The timestamp of the vote sent to the server. This should be in RFC3339 format if provided.</span>
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
                                                    <span>**</span>
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
                                                    <code>publickey</code>
                                                </th>
                                                <td>
                                                    <span>String</span>
                                                </td>
                                                <td>
                                                    <span className="font-bold">Yes</span>
                                                    <span>**</span>
                                                </td>
                                                <td>
                                                    <span className="text-neutral-500">&mdash;</span>
                                                </td>
                                                <td>
                                                    <span>The public key generated by the server. This is the contents of the <code>rsa/public.key</code> file.</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <code>ip</code>
                                                </th>
                                                <td>
                                                    <span>String</span>
                                                </td>
                                                <td>
                                                    <span>No</span>
                                                </td>
                                                <td>
                                                    <span className="italic text-neutral-500">(user IP address)</span>
                                                </td>
                                                <td>
                                                    <span>The IP address of the user sending the vote. If missing, the IP address of the client sending the request will be used.</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="mt-3 text-neutral-300">
                                    <span className="font-bold">*</span>
                                    <span> Due to how Votifier 1 works, it is impossible to confirm whether a vote was successfully processed by the server. You should only receive an error if the server is offline or invalid data was supplied.</span>
                                </p>
                                <p className="mt-3 text-neutral-300">
                                    <span className="font-bold">**</span>
                                    <span> If possible, you should be using the <code>token</code> query parameter if your server is running Votifier 2, as it is more secure. You can use <code>publickey</code> instead to ensure backwards compatibility with all Votifier servers since Votifier 2 also generates a public key. You may optionally choose to provide both values if you have them, it will attempt to use the latest version and fall back to an older protocol if necessary.</span>
                                </p>
                            </Collapsible>
                            <Collapsible title="Response Body" className="block mt-2" noPadding>
                                <div className="p-4 rounded-b bg-neutral-900">
                                    <span>The vote was successfully sent to the server</span>
                                </div>
                            </Collapsible>
                        </div>
                    </section>
                </section>
                <section className="pt-12">
                    <AnchorHeader size={2} id="libraries">Libraries</AnchorHeader>
                    <p className="mt-3 leading-7 text-neutral-700 dark:text-neutral-300">We try and provide official support for integrating our service into many languages. The list of official and unofficial libraries are below.</p>
                    <ul className="flex flex-col gap-3 mt-3 list-none">
                        {
                            libraryList.map((library, index) => (
                                <li key={index}>
                                    <a href={library.url} rel="sponsored" className="flex items-center gap-2 p-4 button">
                                        <span className="badge badge-gray">{library.official ? 'Official' : 'Community'}</span>
                                        <span className="badge" style={{ color: languageColors[library.language][0], backgroundColor: languageColors[library.language][1] }}>{languageNames[library.language]}</span>
                                        <code className="text-black dark:text-white">{library.name}</code>
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </section>
                <section className="pt-12">
                    <AnchorHeader size={2} id="support">Support</AnchorHeader>
                    <p className="mt-3 leading-7 text-neutral-700 dark:text-neutral-300">If you require any additional assistance or found a bug you would like to report, please send an email to <a href="mailto:api@mcstatus.io" className="link" rel="nofollow">api@mcstatus.io</a>. We will be more than happy to provide any assistance.</p>
                </section>
            </div>
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