import sampleServers from '@/assets/servers';
import CarbonAd from '@/components/CarbonAd';
import ServerListing from '@/components/ServerListing';
import Navbar from '@/components/layout/Navbar';

export const metadata = {
    title: 'Sample Servers',
    description: 'A list of all sample and frequently retrieved Minecraft servers for you to browse and try our service.',
    openGraph: {
        title: 'Sample Servers - Minecraft Server Status',
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
            <div className="container">
                <section>
                    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                        <hgroup>
                            <h1 className="title">Sample Servers</h1>
                            <p className="subtitle">A list of all sample Minecraft servers provided</p>
                        </hgroup>
                        <CarbonAd />
                    </div>
                </section>
                <section className="pt-12">
                    <ServerListing servers={sampleServers} />
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