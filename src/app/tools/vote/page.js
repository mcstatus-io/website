import Link from 'next/link';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import Ad from '@/components/Ad';
import Container from '@/components/Container';
import Navbar from '@/components/Navbar';
import VotifierTester from '@/components/VotifierTester';

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
            <Container>
                <section>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
                        <hgroup>
                            <div className="flex items-center gap-3">
                                <Link href="/tools" className="hidden md:block">
                                    <span className="title h1 link">Tools</span>
                                </Link>
                                <ChevronRightIcon width="32" height="32" className="text-neutral-500 hidden md:block" />
                                <h1 className="title">Votifier Tester</h1>
                            </div>
                            <p className="subtitle h1">Quickly test whether or not your Votifier is set up properly</p>
                        </hgroup>
                        <Ad />
                    </div>
                </section>
                <section className="pt-12">
                    <VotifierTester />
                </section>
            </Container>
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