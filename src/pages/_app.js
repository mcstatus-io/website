import React, { useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';
import openIcon from '../assets/icons/open-new.svg';
import '../assets/styles/global.sass';

ReactGA.initialize('G-76CZV53176');

export default function MyApp({ Component, pageProps }) {
	const { asPath, pathname, route } = useRouter();

	useEffect(async () => {
		ReactGA.pageview(asPath);
	}, [asPath]);

	return (
		<>
			<div className="columns main-columns">
				<div className="column">
					<div className="nav-container">
						<img src="/img/icon.png" className="mb-3" width="96" height="96" alt="Minecraft bookshelf" />
						<p className="title mb-5">mcstatus.io</p>
						<p className="subtitle">A Minecraft server status tool</p>
						<nav>
							<ul className="mb-5">
								<li className="mb-2">
									<Link href="/">
										<a className={`is-size-4 ${pathname === '/' || route.startsWith('/status') ? 'is-active' : ''}`}><span>home</span></a>
									</Link>
								</li>
								<li className="mb-2">
									<Link href="/docs">
										<a className={`is-size-4 ${pathname === '/docs' ? 'is-active' : ''}`}><span>api docs</span></a>
									</Link>
								</li>
								<li className="mb-2">
									<Link href="/about">
										<a className={`is-size-4 ${pathname === '/about' ? 'is-active' : ''}`}><span>about</span></a>
									</Link>
								</li>
								<li className="mb-2">
									<a className="is-size-4" href="https://paypal.me/jacobgunther03" target="_blank" rel="noreferrer">
										<span className="mr-2">donate</span>
										<img src={openIcon.src} alt="Open new window icon" width="14" height="14" />
									</a>
								</li>
								<li className="mb-2">
									<a className="is-size-4" href="https://uptime.mcstatus.io/" target="_blank" rel="noreferrer">
										<span className="mr-2">uptime</span>
										<img src={openIcon.src} alt="Open new window icon" width="14" height="14" />
									</a>
								</li>
							</ul>
						</nav>
						<p>&copy; 2022 <a href="https://github.com/PassTheMayo">Jacob Gunther</a></p>
					</div>
					<hr className="is-hidden-tablet my-5" />
				</div>
				<div className="column">
					<Component {...pageProps} />
				</div>
			</div>
			<Script async src="https://www.googletagmanager.com/gtag/js?id=UA-104913718-10" strategy="afterInteractive" />
			<Script id="google-analytics" strategy="afterInteractive">
				{`window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'UA-104913718-10');`}
			</Script>
		</>
	);
}

MyApp.propTypes = {
	Component: PropTypes.any.isRequired,
	pageProps: PropTypes.any
};