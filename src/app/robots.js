export default function generateRobots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/status/*/*/icon',
                '/cdn-cgi'
            ]
        },
        sitemap: 'https://mcstatus.io/sitemap.xml'
    };
}