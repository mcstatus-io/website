import LinkIcon from '../assets/icons/link.svg';

export default function Header({ linkable, size, className, id, children, ...props }) {
	if (linkable) {
		switch (size) {
			case 1:
				return (
					<h1 className={`text-4xl lg:text-5xl font-black ${className ?? ''}`} id={id} {...props}>
						{children}
					</h1>
				);
			case 2:
				return (
					<h2 className={`text-2xl font-bold ${className ?? ''}`} {...props}>
						<span className="offset-anchor" id={id} />
						<div className="flex flex-row items-center gap-2">
							<a href={`#${id}`} className={`${id ? 'border-b border-b-transparent hover:border-b-black dark:hover:border-b-white border-dotted' : ''} [&:hover~svg]:block`}>{children}</a>
							<LinkIcon width="16" height="16" className="hidden" />
						</div>
					</h2>
				);
			case 3:
				return (
					<h3 className={`text-lg font-bold ${className ?? ''}`} {...props}>
						<span className="offset-anchor" id={id} />
						<div className="flex flex-row items-center gap-2">
							<a href={`#${id}`} className={`${id ? 'border-b border-b-transparent hover:border-b-black dark:hover:border-b-white border-dotted' : ''} [&:hover~svg]:block`}>{children}</a>
							<LinkIcon width="14" height="14" className="hidden" />
						</div>
					</h3>
				);
			default: throw new Error(`Header size ${size} not implemented`);
		}
	} else {
		switch (size) {
			case 1:
				return (
					<h1 className={`text-4xl lg:text-5xl font-black ${className ?? ''}`} id={id} {...props}>
						{children}
					</h1>
				);
			case 2:
				return (
					<h2 className={`text-2xl font-bold ${className ?? ''}`} id={id} {...props}>
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