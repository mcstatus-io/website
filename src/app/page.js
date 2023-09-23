import Image from 'next/image';
import Link from 'next/link';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import GiftIcon from '@/assets/icons/gift.svg';
import InfoIcon from '@/assets/icons/info.svg';
import ToolIcon from '@/assets/icons/tool.svg';
import mineatarIcon from '@/assets/img/mineatar.png';
import serverFlexIcon from '@/assets/img/serverflex.png';
import Ad from '@/components/Ad';
import Container from '@/components/Container';
import Navbar from '@/components/Navbar';
import SampleServers from '@/components/SampleServers';
import Search from '@/components/Search';

export const revalidate = 30;

export default function Page() {
    return (
        <>
            <Navbar active="home" />
            <Container>
                <section>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
                        <hgroup>
                            <h1 className="title">Minecraft Server Status</h1>
                            <p className="subtitle">Quickly retrieve the status of any Minecraft server</p>
                        </hgroup>
                        <Ad />
                    </div>
                    <Search className="mt-5" autoFocus />
                </section>
                <section className="pt-12">
                    <div className="flex items-end justify-between">
                        <div className="title-group">
                            <GiftIcon width="28" height="28" />
                            <hgroup>
                                <h2 className="title">Sample Servers</h2>
                                <p className="subtitle">A few sample servers to test out our service</p>
                            </hgroup>
                        </div>
                        <Link href="/servers">
                            <div className="flex items-center gap-2 link">
                                <span>View All</span>
                                <ChevronRightIcon width="20" height="20" />
                            </div>
                        </Link>
                    </div>
                    <SampleServers className="mt-5" />
                </section>
                <section className="pt-12">
                    <div className="title-group">
                        <InfoIcon width="28" height="28" />
                        <hgroup>
                            <h2 className="title">About Us</h2>
                            <p className="subtitle">A quick understanding of what we do</p>
                        </hgroup>
                    </div>
                    <p className="mt-5 leading-7">mcstatus.io is an online tool for retrieving the status of any Java Edition or Bedrock Edition Minecraft server. We also offer an API for developers to programmatically retrieve the status of Minecraft servers, with a very lenient cache duration of only 1 minute. This service was inspired by <a href="https://mcsrvstat.us" className="link" rel="nofollow">mcsrvstat.us</a> but built from the ground up with speed and reliability in mind. While working with other existing services, I realized the many missing features that developers could use which inspired me to start my own service. To this day, we serve an average of 150K unique users, 130 million requests, and about 1 terabyte of data per month.</p>
                    <p className="mt-3 leading-7">Some of our competitors use unnecessarily long cache times, meaning it could take up to 5 minutes to get the up-to-date status of any server you requested. This duration was entirely unnecessary, which is why we only cache statuses for up to 1 minute from the last retrieval. We also offer many features that our competitors do not, such as formatting options for the MOTD, version name, and sample player names. This allows you to embed this information on your website exactly as you see it in-game.</p>
                    <p className="mt-3 leading-7">In addition to just retrieving the Minecraft server status, we also use the query protocol for Java Edition servers, allowing us to get extra information about the servers like plugins and software information. While statuses are our main focus, we also offer additional routes like <Link href="/docs#icon" className="link">retrieving an server icon</Link> and a <Link href="/docs#java-widget" className="link">generated status widget</Link>. The icon route allows you to embed your server&apos;s icon directly into your website without ever having to worry about updating it, and the widget route shows your users a preview of your server without them having to open the game.</p>
                    <p className="mt-3 leading-7">Our API is built from the ground up using Go &mdash; a high performance programming language &mdash; and we directly communicate with the Minecraft server using the official networking protocol. We also utilize Redis to store and retrieve cached statuses extremely fast. All of our services are open source, and available for you to view on our <a href="https://github.com/mcstatus-io" className="link" rel="nofollow">GitHub organization</a>. If you would like to implement our API into your service, head over to the <Link href="/docs" className="link">API documentation</Link> page to read up on the API routes.</p>
                </section>
                <section className="pt-12">
                    <div className="title-group">
                        <ToolIcon width="28" height="28" />
                        <hgroup>
                            <h2 className="title">Partners</h2>
                            <p className="subtitle">Other services we are partnered with</p>
                        </hgroup>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
                        <a href="https://serverflex.io/product/minecraft-server-hosting?utm_source=mcstatus.io" className="card card-hover flex gap-5" rel="sponsored">
                            <div className="w-16">
                                <Image src={serverFlexIcon} className="mx-auto" alt="ServerFlex Icon" />
                            </div>
                            <div>
                                <p className="text-lg font-bold">ServerFlex</p>
                                <p className="mt-1">Professional Minecraft server hosting, available in data centres around the world.</p>
                            </div>
                        </a>
                        <a href="https://mineatar.io?utm_source=mcstatus.io" className="card card-hover flex gap-5" rel="sponsored">
                            <div className="w-16">
                                <Image src={mineatarIcon} className="mx-auto" alt="Mineatar Icon" />
                            </div>
                            <div>
                                <p className="text-lg font-bold">Mineatar</p>
                                <p className="mt-1">A fast and efficient Minecraft avatar rendering service and API.</p>
                            </div>
                        </a>
                    </div>
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