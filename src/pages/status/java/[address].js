import React from 'react';
import { useRouter } from 'next/router';
import StatusLayout from '../../../layouts/StatusLayout';

export default function JavaStatus() {
	const { query } = useRouter();

	return (
		<StatusLayout type="java" address={query.address} />
	);
}