module.exports = {
	swcMinify: true,
	redirects: () => [
		{
			source: '/status/:address',
			destination: '/status/java/:address',
			permanent: true
		}
	]
};