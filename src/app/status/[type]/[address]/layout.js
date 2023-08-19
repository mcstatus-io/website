import { notFound } from 'next/navigation';
import Ad from '@/components/Ad';
import Container from '@/components/Container';
import Navbar from '@/components/Navbar';
import Search from '@/components/Search';

export default function RootLayout({ children, params: { type, address } }) {
    address = decodeURIComponent(address);

    if (type !== 'java' && type !== 'bedrock') return notFound();

    return (
        <>
            <Navbar />
            <Container>
                <section>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between lg:gap-5">
                        <hgroup>
                            <h1 className="title">Minecraft Server Status</h1>
                            <p className="subtitle">Quickly retrieve the status of any Minecraft server</p>
                        </hgroup>
                        <Ad />
                    </div>
                    <Search type={type} address={address} className="mt-5" />
                </section>
                {
                    /^[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+(:\d{1,5})?$/.test(address)
                        ? children
                        : <section>
                            <div className="card mt-4">
                                <p className="text-red-500 dark:text-red-400">The address of the server that you are trying to retrieve is invalid. Please check the address and try again.</p>
                            </div>
                        </section>
                }
            </Container>
        </>
    );
}
