export const boxClassName = [
	// Light classes
	'bg-neutral-200',
	'border',
	'border-neutral-300',

	// Dark classes
	'dark:bg-neutral-800',
	'dark:border',
	'dark:border-neutral-700',
].join(' ');

export const interactiveBoxClassName = boxClassName + ' ' + [
	// Light classes
	'hover:border-neutral-400',
	'focus:border-neutral-400',
	'disabled:border-neutral-200',

	// Dark classes
	'dark:hover:border-neutral-600',
	'dark:focus:border-neutral-600',
	'dark:disabled:border-neutral-800',

	// Generic classes
	'outline-none',
	'error:border-red-500',
	'transition-colors'
].join(' ');