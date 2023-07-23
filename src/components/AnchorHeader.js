import LinkIcon from '@/assets/icons/link.svg';

export default function AnchorHeader({ size, id, className = '', children, ...props }) {
	switch (size) {
		case 2:
			return (
				<h2 className={`title flex items-center gap-2 ${className}`} id={id} {...props}>
					<a href={`#${id}`} className="border-b border-b-transparent hover:border-b-black dark:hover:border-b-white border-dotted [&:hover~svg]:block">{children}</a>
					<LinkIcon width="16" height="16" className="hidden" />
				</h2>
			);
		case 3:
			return (
				<h3 className={`title flex items-center gap-2 ${className}`} id={id} {...props}>
					<a href={`#${id}`} className="border-b border-b-transparent hover:border-b-black dark:hover:border-b-white border-dotted [&:hover~svg]:block">{children}</a>
					<LinkIcon width="14" height="14" className="hidden" />
				</h3>
			);
		default: throw new Error(`Anchor header with size ${size} is not implemented`);
	}
}