import { notFound } from 'next/navigation';
import CarbonAd from '@/components/CarbonAd';
import LookupForm from '@/components/layout/LookupForm';
import { Suspense } from 'react';
import Loading from '@/app/status/[type]/[address]/loading';

export default function RootLayout({ children, params: { type, address } }) {
    address = decodeURIComponent(address);

    if (type !== 'java' && type !== 'bedrock') return notFound();

    return (
        <div className="container">
            <section>
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                    <hgroup>
                        <h1 className="title">Minecraft Server Status</h1>
                        <p className="subtitle">Quickly retrieve the status of any Minecraft server</p>
                    </hgroup>
                    <CarbonAd />
                </div>
                <LookupForm type={type} address={address} className="mt-5" />
            </section>
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </div>
    );
}
