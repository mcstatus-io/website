import Link from 'next/link';
import ChevronsLeft from '@/assets/icons/chevrons-left.svg';

export const metadata = {
    title: 'Page Not Found - Minecraft Server Status'
};

export default function NotFound() {
    return (
        <>
            <div className="container">
                <section>
                    <h1 className="title">Not Found</h1>
                    <p className="mt-1 text-xl">The page that you requested could not be found, please check the address and try again.</p>
                    <Link href="/" className="inline-block px-4 py-3 mt-5 button">
                        <div className="flex items-center gap-2">
                            <ChevronsLeft width="24" height="24" />
                            <span>Return Home</span>
                        </div>
                    </Link>
                </section>
            </div>
        </>
    );
}