export default function Loading() {
	return (
		<section aria-busy="true" aria-live="assertive" aria-atomic="true">
			<div className="flex gap-3 px-5 py-4 rounded mt-4 box">
				<div className="w-1/4">
					<div className="block rounded bg-neutral-300 dark:bg-neutral-700 opacity-70 h-12 w-full mb-3" />
					<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
					<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
					<div className="block rounded bg-neutral-300 dark:bg-neutral-700 opacity-70 h-12 w-full mb-3" />
					<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
					<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
					<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
					<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full" />
				</div>
				<div className="w-3/4">
					<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
					<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
					<div className="block rounded bg-neutral-300 dark:bg-neutral-700 opacity-70 h-12 w-full mb-3" />
					<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
					<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
					<div className="block rounded bg-neutral-300 dark:bg-neutral-700 opacity-70 h-12 w-full mb-3" />
					<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
					<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full" />
				</div>
			</div>
		</section>
	);
}