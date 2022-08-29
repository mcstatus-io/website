const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
	swcMinify: true,
	experimental: {
		images: {
			allowFutureImage: true
		}
	},
	redirects: () => [
		{
			source: '/status/:address',
			destination: '/status/java/:address',
			permanent: true
		},
		{
			source: '/docs/:revision',
			destination: '/docs',
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
});