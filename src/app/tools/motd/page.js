import Link from 'next/link';
import { Suspense } from 'react';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import CarbonAd from '@/components/CarbonAd';
import Navbar from '@/components/layout/Navbar';
import MOTDEditor from '@/components/tools/MOTDEditor';

export const metadata = {
    title: 'MOTD Editor',
    description: 'Easily and quickly edit and preview any message-of-the-day (or MOTD) before using it on your own Minecraft server.',
    openGraph: {
        title: 'MOTD Editor - Minecraft Server Status',
        description: 'Easily and quickly edit and preview any message-of-the-day (or MOTD) before using it on your own Minecraft server.',
        url: '/tools/motd',
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
        canonical: '/tools/motd'
    }
};

export default function Page() {
    return (
        <>
            <Navbar active="tools" />
            <div className="container">
                <section>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
                        <hgroup>
                            <div className="flex items-center gap-3">
                                <Link href="/tools" className="hidden md:block">
                                    <span className="title h1 link">Tools</span>
                                </Link>
                                <ChevronRightIcon width="32" height="32" className="text-neutral-500 hidden md:block" />
                                <h1 className="title">MOTD Editor</h1>
                            </div>
                            <p className="subtitle h1">Easily edit and preview an MOTD before using it on your own server</p>
                        </hgroup>
                        <CarbonAd />
                    </div>
                </section>
                <Suspense fallback={null}>
                    <MOTDEditor />
                </Suspense>
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
                            },
                            {
                                '@type': 'ListItem',
                                'position': 3,
                                'name': 'MOTD Editor',
                                'item': 'https://mcstatus.io/tools/motd'
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