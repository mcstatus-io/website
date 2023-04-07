export default function generateRobots() {
	return {
		rules: {
			userAgent: '*',
			allow: '/'
		},
		sitemap: 'https://mcstatus.io/sitemap.xml'
	};
}