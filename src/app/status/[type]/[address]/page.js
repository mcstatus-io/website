import Link from 'next/link';
import StatusTable from '@/components/StatusTable';
import APIUsage from '@/components/APIUsage';
import InfoIcon from '@/assets/icons/info.svg';

export const revalidate = 0;

export const getStatusData = async (type, address) => {
	const result = await fetch(`${process.env.NEXT_PUBLIC_PING_HOST}/status/${type}/${address}`, { cache: 'no-store' });
	const body = await result.json();

	return body;
};

const getProtocolVersionData = async (type) => {
	const result = await fetch(`https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/${type === 'java' ? 'pc' : 'bedrock'}/common/protocolVersions.json`);
	const body = await result.json();

	return body;
};

export async function generateMetadata({ params: { type, address } }) {
	address = decodeURIComponent(address);

	const result = await getStatusData(type, address);

	return {
		title: address,
		description: `Easily and quickly retrieve the status of ${address} or any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second.`,
		icons: {
			icon: result?.icon ?? 'https://mcstatus.io/img/icon.png'
		},
		openGraph: {
			title: `${address} - Minecraft Server Status`,
			description: `Easily and quickly retrieve the status of ${address} or any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second.`,
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

	const result = await getStatusData(type, address);
	const protocolVersions = await getProtocolVersionData(type);

	return (
		<>
			<section>
				{
					result.host === 'demo.mcstatus.io' && result.port === 25565
						? <div className="block lg:flex lg:flex-row lg:items-center lg:gap-5 box rounded mt-5 p-5">
							<InfoIcon width="24" height="24" className="w-[24px] h-[24px] hidden lg:block ml-2" />
							<p>Please note that this is not a real Minecraft server, it is a demo server used to test the features of this website. If you would like to learn more, please refer to our <Link href="/about#faq" className="link">frequently asked questions</Link>.</p>
						</div>
						: null
				}
				<div className="px-5 py-4 rounded mt-4 box">
					<StatusTable result={result} protocolVersions={protocolVersions} />
				</div>
			</section>
			<section>
				<APIUsage type={type} address={address} data={result} className="mt-3" />
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