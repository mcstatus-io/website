import sampleServers from '@/assets/servers';
import Ad from '@/components/Ad';
import AnchorHeader from '@/components/AnchorHeader';
import Container from '@/components/Container';
import Navbar from '@/components/Navbar';
import ServerListing from '@/components/ServerListing';

export const metadata = {
    title: 'Servers',
    description: 'A list of all sample and frequently retrieved Minecraft servers for you to browse and try our service.',
    openGraph: {
        title: 'Servers - Minecraft Server Status',
        description: 'A list of all sample and frequently retrieved Minecraft servers for you to browse and try our service.',
        url: '/servers',
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
        canonical: '/servers'
    }
};

export default function Page() {
    return (
        <>
            <Navbar />
            <Container>
                <section>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
                        <hgroup>
                            <h1 className="title">Servers</h1>
                            <p className="subtitle">A list of all sample Minecraft servers provided</p>
                        </hgroup>
                        <Ad />
                    </div>
                </section>
                <section className="pt-12">
                    <AnchorHeader size={2} id="sample">Sample Servers</AnchorHeader>
                    <ServerListing servers={sampleServers} className="mt-5" />
                </section>
                <section className="pt-12">
                    <AnchorHeader size={2} id="sample">Popular Servers</AnchorHeader>
                    <p className="mt-3">Coming soon...</p>
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
                                'name': 'Servers',
                                'item': 'https://mcstatus.io/servers'
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