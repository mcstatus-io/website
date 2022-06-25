module.exports = {
	swcMinify: true,
	redirects: () => [
		{
			source: '/status/:address',
			destination: '/status/java/:address',
			permanent: true
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