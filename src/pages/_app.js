import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import '../assets/styles/global.sass';
import openIcon from '../assets/icons/open-new.svg';

export default function MyApp({ Component, pageProps }) {
	const { pathname, route } = useRouter();

	return (
		<>
			<div className="columns main-columns m-0">
				<div className="column is-2 p-0">
					<div className="nav-container">
						<p className="title mb-5">mcstatus.io</p>
						<p className="subtitle">A Minecraft server status tool</p>
						<nav>
							<ul className="mb-5">
								<li className="mb-2">
									<Link href="/">
										<a className={`is-size-4 ${pathname === '/' || route === '/status/[address]' || route === '/bedrock/[address]' ? 'is-active' : ''}`}><span>home</span></a>
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
									<a className="is-size-4" href="https://uptime.mcstatus.io/" target="_blank" rel="noreferrer">
										<span className="mr-2">uptime</span>
										<img src={openIcon.src} alt="Open new window icon" width="14" height="14" />
									</a>
								</li>
							</ul>
						</nav>
						<p>&copy; 2022 Jacob Gunther</p>
					</div>
					<hr className="is-hidden-tablet my-5" />
				</div>
				<div className="column is-10 p-0">
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