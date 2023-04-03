import LinkIcon from '../assets/icons/link.svg';

export default function Header({ linkable, size, className, children, ...props }) {
	if (linkable && size !== 1) {
		switch (size) {
			case 2:
				return (
					<h2 className={`flex flex-row items-center gap-2 text-2xl font-bold ${className ?? ''}`} {...props}>
						<a href={`#${props.id}`} className={`${props.id ? 'border-b border-b-transparent hover:border-b-black dark:hover:border-b-white border-dotted' : ''} [&:hover~svg]:block`}>{children}</a>
						<LinkIcon width="16" height="16" className="hidden" />
					</h2>
				);
			case 3:
				return (
					<h3 className={`flex flex-row items-center gap-2 text-lg font-bold ${className ?? ''}`} {...props}>
						<a href={`#${props.id}`} className={`${props.id ? 'border-b border-b-transparent hover:border-b-black dark:hover:border-b-white border-dotted' : ''} [&:hover~svg]:block`}>{children}</a>
						<LinkIcon width="14" height="14" className="hidden" />
					</h3>
				);
			default: throw new Error(`Header size ${size} not implemented`);
		}
	} else {
		switch (size) {
			case 1:
				return (
					<h1 className={`text-4xl lg:text-5xl font-black ${className ?? ''}`} {...props}>
						{children}
					</h1>
				);
			case 2:
				return (
					<h2 className={`text-2xl font-bold ${className ?? ''}`} {...props}>
						{children}
					</h2>
				);
			case 3:
				return (
					<h3 className={`text-lg font-bold ${className ?? ''}`} {...props}>
						{children}
					</h3>
				);
			default: throw new Error(`Header size ${size} not implemented`);
		}
	}
}