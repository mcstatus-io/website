import Link from 'next/link';
import Collapsible from '@/components/Collapsible';
import Highlight from '@/components/Highlight';

export default function APIUsage({ type, address, data, ...props }) {
	return (
		<Collapsible title="API Usage" id="api-usage" {...props}>
			<p>
				<span className="bg-green-600 text-sm px-2 py-1 rounded text-white">GET</span>
				<code className="ml-2 break-words">https://api.mcstatus.io<span className="font-bold">/v2/status/{type}/{address}</span></code>
			</p>
			<Highlight source={JSON.stringify(data, null, '    ')} className="mt-4 bg-neutral-800 dark:border dark:border-neutral-700 rounded" />
			<p className="mt-3">Learn more about this response by viewing it in the <Link href={`/docs#${type}-status`} className="link">API documentation</Link>.</p>
		</Collapsible>
	);
}