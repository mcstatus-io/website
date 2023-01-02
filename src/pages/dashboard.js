import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import Container from '../components/Container';
import Header from '../components/Header';

export default function Dashboard({ user }) {
	return (
		<>
			<Head>
				<title>Dashboard - Minecraft Server Status</title>
				<meta name="robots" content="noindex,nofollow" />
			</Head>
			<Navbar user={user} />
			<Container className="my-12 lg:my-24">
				<Header size={1} text="Coming soon..." />
				<p className="text-xl mt-2">Please be patient with us, new and exciting content is coming soon!</p>
			</Container>
		</>
	);
}

Dashboard.propTypes = {
	user: PropTypes.object
};