export default function generateRobots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/status/*/*/icon'
            ]
        },
        sitemap: 'https://mcstatus.io/sitemap.xml'
    };
}