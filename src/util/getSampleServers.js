import { exampleServers } from '../assets/servers';

export default () => {
	const servers = [];

	const javaServers = exampleServers.filter((server) => server.type === 'java').sort(() => Math.random() - 0.5).slice(0, 4);
	const bedrockServers = exampleServers.filter((server) => server.type === 'bedrock').sort(() => Math.random() - 0.5).slice(0, 4);

	for (let i = 0; i < 8; i++) {
		if (i % 2 === 0) {
			servers.push(javaServers[i / 2]);
		} else {
			servers.push(bedrockServers[(i - 1) / 2]);
		}
	}

	return servers;
};