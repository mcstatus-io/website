import Link from 'next/link';
import Collapsible from '@/components/Collapsible';
import Highlight from '@/components/Highlight';

export default function APIUsage({ type, address, data, ...props }) {
    if (typeof data.icon !== 'undefined' && data.icon !== null && data.icon.length >= 64) {
        data.icon = `${data.icon.substring(0, 64)} (...${((data.icon.length - 64) / 1000).toFixed(1)} kB)`;
    }

    return (
        <Collapsible title="API Usage" id="api-usage" {...props}>
            <div className="flex items-center gap-2">
                <span className="text-xs badge badge-blue">GET</span>
                <code className="break-words">https://api.mcstatus.io<span className="font-bold">/v2/status/{type}/{address}</span></code>
            </div>
            <Highlight source={JSON.stringify(data, null, '    ')} className="mt-4 rounded bg-neutral-900" />
            <p className="mt-5">You may learn more about this response by reading the route details on the <Link href={`/docs#${type}-status`} className="link">API documentation</Link>.</p>
        </Collapsible>
    );
}