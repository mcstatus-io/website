import Link from 'next/link';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import CarbonAd from '@/components/CarbonAd';
import Navbar from '@/components/layout/Navbar';
import VotifierTester from '@/components/tools/VotifierTester';

export const metadata = {
    title: 'Votifier Tester',
    description: 'Quickly test whether or not your Votifier listener is set up properly by sending a real vote to your own Minecraft server.',
    openGraph: {
        title: 'Votifier Tester - Minecraft Server Status',
        description: 'Quickly test whether or not your Votifier listener is set up properly by sending a real vote to your own Minecraft server.',
        url: '/tools/vote',
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
        canonical: '/tools/vote'
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
                            <div className="flex items-center gap-3">
                                <Link href="/tools" className="hidden md:block">
                                    <span className="title h1 link">Tools</span>
                                </Link>
                                <ChevronRightIcon width="32" height="32" className="hidden text-neutral-500 md:block" />
                                <h1 className="title">Votifier Tester</h1>
                            </div>
                            <p className="subtitle h1">Quickly test whether or not your Votifier is set up properly</p>
                        </hgroup>
                        <CarbonAd />
                    </div>
                </section>
                <section className="pt-12">
                    <VotifierTester />
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
                            },
                            {
                                '@type': 'ListItem',
                                'position': 3,
                                'name': 'Votifier Tester',
                                'item': 'https://mcstatus.io/tools/vote'
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