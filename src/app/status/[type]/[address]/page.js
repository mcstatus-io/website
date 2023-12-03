import Link from 'next/link';
import AlertCircleIcon from '@/assets/icons/alert-circle.svg';
import InfoIcon from '@/assets/icons/info.svg';
import APIUsage from '@/components/APIUsage';
import StatusTable from '@/components/StatusTable';

const getStatus = async (type, address) => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_PING_HOST}/status/${type}/${address}`, { next: { revalidate: 15 } });

    if (!result.ok) throw new Error(await result.text());

    return await result.json();
};

const getProtocolVersions = async (type) => {
    const result = await fetch(`https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/${type === 'java' ? 'pc' : 'bedrock'}/common/protocolVersions.json`);

    if (!result.ok) throw new Error(await result.text());

    return await result.json();
};

export async function generateMetadata({ params: { type, address } }) {
    address = decodeURIComponent(address);

    let result;

    try {
        result = await getStatus(type, address);
    } catch {
        // Ignore
    }

    return {
        title: address,
        description: `Easily and quickly retrieve the status of ${address} or any other Minecraft server by using our simple status retrieval tool.`,
        icons: {
            icon: result?.icon ?? 'https://mcstatus.io/img/icon.png'
        },
        openGraph: {
            title: `${address} - Minecraft Server Status`,
            description: `Easily and quickly retrieve the status of ${address} or any other Minecraft server by using our simple status retrieval tool.`,
            url: `/status/${type}/${address}`,
            siteName: 'Minecraft Server Status',
            images: [
                {
                    url: type === 'java' ? `${process.env.NEXT_PUBLIC_PING_HOST}/icon/${address}` : '/img/icon.png',
                    width: 64,
                    height: 64
                }
            ],
            locale: 'en-US',
            type: 'website'
        },
        alternates: {
            canonical: `/status/${type}/${address}`
        }
    };
}

export default async function Page({ params: { type, address } }) {
    address = decodeURIComponent(address);

    const status = await getStatus(type, address);
    const protocolVersions = await getProtocolVersions(type);

    const isDemoServer = status.host === 'demo.mcstatus.io' && status.port === 25565;
    const isAternosServer = status.host.split('.').slice(-2).join('.').toLowerCase() === 'aternos.me';

    return (
        <>
            <section>
                {
                    isDemoServer
                        ? <div className="card flex items-center gap-5 mt-3">
                            <InfoIcon width="24" height="24" className="w-[24px] h-[24px] hidden lg:block ml-2" />
                            <p>Please note that this is not a real Minecraft server, it is a demo server used to test the features of this website. If you would like to learn more, please refer to our <Link href="/about#demo" className="link">frequently asked questions</Link>.</p>
                        </div>
                        : null
                }
                {
                    isAternosServer
                        ? <div className="card bg-red-500/20 flex items-center gap-5 mt-3">
                            <AlertCircleIcon width="24" height="24" className="text-red-500 w-[24px] h-[24px] hidden lg:block ml-2" />
                            <p>Please note that servers hosted by Aternos may not return the correct status. You may read more information about this unresolvable issue by <Link href="/about#aternos" className="link">clicking here</Link>.</p>
                        </div>
                        : null
                }
                <StatusTable status={status} protocolVersions={protocolVersions} className="mt-3" />
            </section>
            <section>
                <APIUsage type={type} address={address} data={status} className="mt-3" />
            </section>
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
                                'name': `${type === 'java' ? 'Java' : 'Bedrock'} Status`,
                                'item': 'https://mcstatus.io'
                            },
                            {
                                '@type': 'ListItem',
                                'position': 3,
                                'name': address,
                                'item': `https://mcstatus.io/status/${type}/${address}`
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