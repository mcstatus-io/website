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
		},
		{
			source: '/auth',
			destination: `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(['identify', 'email'].join(' '))}`,
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
	},
	images: {
		domains: ['cdn.discordapp.com']
	},
	env: {
		NEXT_PUBLIC_COMMIT_ID: commitID
	}
});