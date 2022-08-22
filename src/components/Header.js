import React from 'react';
import Link from 'next/link';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import homeIcon from '../assets/icons/home.svg';
import linkIcon from '../assets/icons/link.svg';
import infoIcon from '../assets/icons/info.svg';
import calendarIcon from '../assets/icons/calendar.svg';
import githubIcon from '../assets/icons/github.svg';
import icon from '../assets/img/icon.png';

export default function Header() {
	const { pathname } = useRouter();

	return (
		<div className="header is-align-items-center is-justify-content-space-between">
			<Link href="/">
				<a className="is-flex is-align-items-center">
					<Image src={icon} className="is-align-middle" alt="Icon" width="64" height="64" />
					<span className="title has-text-white is-align-middle ml-3">mcstatus.io</span>
				</a>
			</Link>
			<div className="buttons">
				<Link href="/">
					<a className={`button ${pathname === '/' ? 'is-link' : 'is-dark-light'} px-4`}>
						<Image src={homeIcon} alt="Home icon" className="nav-icon" />
						<span>Home</span>
					</a>
				</Link>
				<Link href="/docs/v2">
					<a className={`button ${pathname.startsWith('/docs') ? 'is-link' : 'is-dark-light'} px-4`}>
						<Image src={linkIcon} alt="Link icon" className="nav-icon" />
						<span>API</span>
					</a>
				</Link>
				<Link href="/about">
					<a className={`button ${pathname === '/about' ? 'is-link' : 'is-dark-light'} px-4`}>
						<Image src={infoIcon} alt="Info icon" className="nav-icon" />
						<span>About</span>
					</a>
				</Link>
				<a href="https://uptime.mcstatus.io" className="button is-dark-light px-4">
					<Image src={calendarIcon} alt="Calendar icon" className="nav-icon" />
					<span>Uptime</span>
				</a>
				<a href="https://github.com/mcstatus-io" className="button is-dark-light px-4">
					<Image src={githubIcon} alt="GitHub icon" className="nav-icon" />
					<span>GitHub</span>
				</a>
			</div>
		</div>
	);
}