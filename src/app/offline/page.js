'use client';

import { useEffect } from 'react';
import Container from '../../components/Container';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';

export default function Page() {
	useEffect(() => {
		const interval = setInterval(() => {
			if (!navigator.onLine) return;

			window.location.reload();
		}, 250);

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<Navbar />
			<Container>
				<Header size={1}>Uh oh,</Header>
				<p className="text-lg mt-1">It looks like you are currently offline. I will reload this page as soon as you are back online.</p>
			</Container>
		</>
	);
}