import Link from 'next/link';
import LinkIcon from '@/assets/icons/link.svg';

export default function AnchorHeader({ size, id, className = '', children, ...props }) {
    switch (size) {
        case 2:
            return (
                <h2 className={`title ${className}`} id={id} {...props}>
                    <Link href={`#${id}`}>{children}</Link>
                    <LinkIcon width="16" height="16" />
                </h2>
            );
        case 3:
            return (
                <h3 className={`title ${className}`} id={id} {...props}>
                    <Link href={`#${id}`}>{children}</Link>
                    <LinkIcon width="14" height="14" />
                </h3>
            );
        default: throw new Error(`Anchor header with size ${size} is not implemented`);
    }
}