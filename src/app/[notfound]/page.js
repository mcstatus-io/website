import { notFound } from 'next/navigation';

// This is a temporary work-around for Next.js 13 not using the `not-found.js`
// page when not using the `notFound()` function.
// https://beta.nextjs.org/docs/api-reference/file-conventions/not-found
// TODO remove this when fixed

export default function Page() {
	return notFound();
}