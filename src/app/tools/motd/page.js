import Container from '@/components/Container';
import MOTDEditor from '@/components/MOTDEditor';
import Navbar from '@/components/Navbar';

export const metadata = {
    title: 'MOTD Editor',
    description: 'Easily edit and preview any MOTD before using it on your own Minecraft server.',
    openGraph: {
        title: 'MOTD Editor - Minecraft Server Status',
        description: 'Easily edit and preview any MOTD before using it on your own Minecraft server.',
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
        canonical: '/tools/motd'
    }
};

export default function Page() {
    return (
        <>
            <Navbar active="tools" />
            <Container>
                <section>
                    <hgroup>
                        <h1 className="title">MOTD Editor</h1>
                        <p className="subtitle">Easily edit and preview an MOTD before using it on your own server</p>
                    </hgroup>
                </section>
                <MOTDEditor />
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