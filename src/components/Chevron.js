import ChevronIcon from '@/assets/icons/chevron-down.svg';

export default function Chevron({ isFlipped, className = '', ...props }) {
	return (
		<ChevronIcon className={`${isFlipped ? '-scale-y-100' : ''} transition-transform duration-200 ${className}`} {...props} />
	);
}