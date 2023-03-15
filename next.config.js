const childProcess = require('child_process');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
});

const commitID = childProcess.execSync('git rev-parse HEAD').toString();

module.exports = withBundleAnalyzer({
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
		config.module.rules.push(
			{
				test: /\.jsonc$/,
				use: [
					{ loader: 'raw-loader' }
				]
			},
			{
				test: /\.svg$/,
				use: [
					{ loader: '@svgr/webpack' }
				]
			}
		);

		return config;
	},
	env: {
		NEXT_PUBLIC_COMMIT_ID: commitID
	},
	experimental: {
		appDir: true,
		fontLoaders: [
			{
				loader: 'next/font/google',
				options: {
					subsets: ['latin']
				}
			}
		]
	}
});