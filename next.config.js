module.exports = {
	swcMinify: true,
	redirects: () => [
		{
			source: '/status/:address',
			destination: '/status/java/:address',
			permanent: true
		},
		{
			source: '/docs',
			destination: '/docs/v1',
			permanent: false
		}
	],
	webpack: (config) => {
		config.module.rules.push({
			test: /\.jsonc$/,
			use: [
				{ loader: 'raw-loader' }
			]
		});

		return config;
	}
};