import React from 'react';
import Container from './Container';
import RedHeartIcon from '!!@svgr/webpack!../assets/icons/heart-red.svg';
import CoffeeIcon from '!!@svgr/webpack!../assets/icons/coffee.svg';

export default function Footer() {
	return (
		<Container noMargin>
			<div className="flex flex-col sm:flex-row gap-3 sm:gap-0 items-center justify-between mb-12 pt-5 border-t-2 border-t-neutral-200 dark:border-t-neutral-800">
				<p className="flex items-center gap-2">
					<span>Made with</span>
					<RedHeartIcon width="18" height="18" />
					<span>and</span>
					<CoffeeIcon width="18" height="18" />
					<span>by <a className="link" href="https://passthemayo.dev" rel="noreferrer">Jacob Gunther</a></span>
				</p>
				<a className="text-sm bg-blue-600 hover:bg-blue-700 motion-safe:transition-colors px-2 py-1 rounded text-white" href={`https://github.com/mcstatus-io/website/commit/${process.env.NEXT_PUBLIC_COMMIT_ID}`} title="Current Live Commit ID">MCS-{process.env.NEXT_PUBLIC_COMMIT_ID.substring(0, 8)}</a>
			</div>
		</Container>
	);
}