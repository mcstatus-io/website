import Link from 'next/link';
import sampleServers from '@/assets/servers';

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

export default function SampleServers({ className = '' }) {
    const servers = getSampleServers();

    return (
        <ul className={`list-none grid grid-cols-1 md:grid-cols-2 gap-3 ${className}`}>
            {
                servers.map(({ type, address, name }, index) => (
                    <li key={index}>
                        <Link href={`/status/${type}/${address}`} className="flex flex-col items-start gap-3 p-5 button sm:flex-row sm:items-center">
                            <div className="flex items-center gap-3">
                                <span className={`badge ${type === 'java' ? 'badge-green' : type === 'bedrock' ? 'badge-blue' : 'badge-gray'} text-xs`}>{type === 'java' ? 'Java' : type === 'bedrock' ? 'Bedrock' : 'Unknown'}</span>
                                <span className="font-bold">{name}</span>
                            </div>
                            <code className="text-sm text-neutral-700 dark:text-neutral-300 sm:ml-auto md:max-lg:hidden">{address}</code>
                        </Link>
                    </li>
                ))
            }
        </ul>
    );
}