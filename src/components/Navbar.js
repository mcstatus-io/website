import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import homeIcon from '../assets/icons/home.svg';
import linkIcon from '../assets/icons/link.svg';
import infoIcon from '../assets/icons/info.svg';
import calendarIcon from '../assets/icons/calendar.svg';
import githubIcon from '../assets/icons/github.svg';

export default function Navbar() {
	const { pathname, events } = useRouter();
	const [isUncollapsed, setUncollapsed] = useState(false);

	useEffect(() => {
		events.on('routeChangeStart', () => setUncollapsed(false));
	}, []);

	return (
		<nav className="navbar py-2" role="navigation" aria-label="main navigation">
			<div className="container">
				<div className="navbar-brand is-align-items-center">
					<div className="navbar-item">
						<img src="/img/icon.png" width="42" height="42" />
						<span className="ml-2 is-size-5 has-text-weight-bold">mcstatus.io</span>
					</div>
					<a role="button" className={`navbar-burger ${isUncollapsed ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbar" onClick={() => setUncollapsed(!isUncollapsed)}>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</a>
				</div>
				<div id="navbar" className={`navbar-menu ${isUncollapsed ? 'is-active' : ''}`}>
					<div className="navbar-start">
						<div className="navbar-item">
							<div className="buttons buttons-block-mobile">
								<Link href="/">
									<a className={`button ${pathname !== '/' ? 'is-light' : ''}`}>
										<img src={homeIcon.src} alt="Home icon" className="nav-icon" />
										{
											pathname === '/'
												? <strong>Home</strong>
												: <span>Home</span>
										}
									</a>
								</Link>
								<Link href="/docs/v2">
									<a className={`button ${!pathname.startsWith('/docs') ? 'is-light' : ''}`}>
										<img src={linkIcon.src} alt="Link icon" className="nav-icon" />
										{
											pathname.startsWith('/docs')
												? <strong>API</strong>
												: <span>API</span>
										}
									</a>
								</Link>
								<Link href="/about">
									<a className={`button ${pathname !== '/about' ? 'is-light' : ''}`}>
										<img src={infoIcon.src} alt="Info icon" className="nav-icon" />
										{
											pathname === '/about'
												? <strong>About</strong>
												: <span>About</span>
										}
									</a>
								</Link>
							</div>
						</div>
					</div>
					<div className="navbar-end">
						<div className="navbar-item">
							<div className="buttons buttons-block-mobile">
								<a href="https://uptime.mcstatus.io" className="button is-light">
									<img src={calendarIcon.src} alt="Calendar icon" className="nav-icon" />
									<span>Uptime</span>
								</a>
								<a href="https://github.com/mcstatus-io" className="button is-light">
									<img src={githubIcon.src} alt="GitHub icon" className="nav-icon" />
									<span>GitHub</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}