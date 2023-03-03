import React from 'react';
import { useRouter } from 'next/router';
import StatusLayout from '../../../layouts/StatusLayout';

export default function BedrockStatus() {
	const { query } = useRouter();

	return (
		<StatusLayout type="bedrock" address={query.address} />
	);
}