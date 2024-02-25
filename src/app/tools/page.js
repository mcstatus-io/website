import Link from 'next/link';
import ExternalLinkIcon from '@/assets/icons/external-link.svg';
import CarbonAd from '@/components/CarbonAd';
import Navbar from '@/components/layout/Navbar';

export const metadata = {
    title: 'Tools',
    description: 'A few simple and easy to use tools for Minecraft server owners and developers. All of our tools are free to use forever.',
    openGraph: {
        title: 'Tools - Minecraft Server Status',
        description: 'A few simple and easy to use tools for Minecraft server owners and developers. All of our tools are free to use forever.',
        url: '/tools',
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
        canonical: '/tools'
    }
};

export default function Page() {
    return (
        <>
            <Navbar active="tools" />
            <div className="container">
                <section>
                    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                        <hgroup>
                            <h1 className="title">Tools</h1>
                            <p className="subtitle">Simple server admin tools to help you out</p>
                        </hgroup>
                        <CarbonAd />
                    </div>
                </section>
                <section className="pt-12">
                    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                        <li>
                            <Link href="/tools/motd">
                                <div className="h-full card card-hover">
                                    <p className="text-lg font-bold">MOTD Editor</p>
                                    <p className="mt-1">Easily edit and preview an MOTD before using it on your own server.</p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/tools/vote">
                                <div className="h-full card card-hover">
                                    <p className="text-lg font-bold">Votifier Tester</p>
                                    <p className="mt-1">Quickly test whether or not your Votifier is set up properly by sending a real vote.</p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <a href="https://mctools.org/whitelist-creator?utm_source=mcstatus.io" rel="sponsored">
                                <div className="h-full card card-hover">
                                    <p className="flex items-center gap-3 text-lg font-bold">
                                        <span>Whitelist Creator</span>
                                        <ExternalLinkIcon width="16" height="16" className="text-neutral-500" />
                                    </p>
                                    <p className="mt-1">Automatically generates a whitelist with pre-filled player UUIDs.</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="https://mctools.org/server-properties-creator?utm_source=mcstatus.io" rel="sponsored">
                                <div className="h-full card card-hover">
                                    <p className="flex items-center gap-3 text-lg font-bold">
                                        <span>Server Properties Editor</span>
                                        <ExternalLinkIcon width="16" height="16" className="text-neutral-500" />
                                    </p>
                                    <p className="mt-1">Quickly adjust your server.properties file by using our online editor.</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.planetminecraft.com/banner?utm_source=mcstatus.io" rel="sponsored">
                                <div className="h-full card card-hover">
                                    <p className="flex items-center gap-3 text-lg font-bold">
                                        <span>Banner Editor</span>
                                        <ExternalLinkIcon width="16" height="16" className="text-neutral-500" />
                                    </p>
                                    <p className="mt-1">Easily create any banner design using an online visual editor.</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="https://minecraft-ids.grahamedgecombe.com?utm_source=mcstatus.io" rel="sponsored">
                                <div className="h-full card card-hover">
                                    <p className="flex items-center gap-3 text-lg font-bold">
                                        <span>Blocks &amp; Items</span>
                                        <ExternalLinkIcon width="16" height="16" className="text-neutral-500" />
                                    </p>
                                    <p className="mt-1">A full list of all available blocks and items in Minecraft.</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <Link href="/">
                                <div className="h-full card card-hover">
                                    <p className="text-lg font-bold">Server Status Checker</p>
                                    <p className="mt-1">Easily check the status of any Java or Bedrock Edition Minecraft server.</p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <a href="https://haselkern.com/Minecraft-ArmorStand" rel="sponsored">
                                <div className="h-full card card-hover">
                                    <p className="flex items-center gap-3 text-lg font-bold">
                                        <span>Armor Stand Creator</span>
                                        <ExternalLinkIcon width="16" height="16" className="text-neutral-500" />
                                    </p>
                                    <p className="mt-1">An easy tool to create a summon command to spawn any variation of an armor stand.</p>
                                </div>
                            </a>
                        </li>
                    </ul>
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
                                'name': 'Tools',
                                'item': 'https://mcstatus.io/tools'
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