import Link from 'next/link';
import { sampleServers } from '../assets/servers';

const getSampleServers = () => {
	const servers = [];

	const javaServers = sampleServers.filter((server) => server.type === 'java').sort(() => Math.random() - 0.5).slice(0, 4);
	const bedrockServers = sampleServers.filter((server) => server.type === 'bedrock').sort(() => Math.random() - 0.5).slice(0, 4);

	for (let i = 0; i < 8; i++) {
		if (i % 2 === 0) {
			servers.push(javaServers[i / 2]);
		} else {
			servers.push(bedrockServers[(i - 1) / 2]);
		}
	}

	return servers;
};

export default function SampleServers() {
	const data = getSampleServers();

	return (
		<ul className="flex gap-3 flex-wrap mt-5">
			{
				data.map((server, index) => (
					<li className="md:basis-[calc(50%-0.75rem)] basis-full" key={index}>
						<Link href={`/status/${server.type}/${server.address}`} className="button flex flex-row items-center gap-3 p-5">
							<span className={`px-2 py-1 rounded ${server.type === 'java' ? 'bg-green-700 contrast-more:bg-green-900' : 'bg-blue-600 contrast-more:bg-blue-900'} text-xs text-white`}>{server.type === 'java' ? 'Java' : 'Bedrock'}</span>
							<span className="font-bold">{server.name}</span>
							<code className="text-sm text-neutral-700 dark:text-neutral-300 ml-auto md:max-lg:hidden">{server.address}</code>
						</Link>
					</li>
				))
			}
		</ul>
	);
}