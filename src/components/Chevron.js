import ChevronIcon from '@/assets/icons/chevron-down.svg';

export default function Chevron({ isFlipped, className = '', ...props }) {
    return (
        <ChevronIcon className={`text-neutral-500 dark:text-neutral-400 ${isFlipped ? '-scale-y-100' : ''} ${className}`} {...props} />
    );
}