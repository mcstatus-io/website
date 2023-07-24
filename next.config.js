const path = require('path');
const childProcess = require('child_process');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});

const commitID = childProcess.execSync('git rev-parse HEAD').toString();

module.exports = withBundleAnalyzer({
    swcMinify: true,
    reactStrictMode: true,
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
        config.resolve.alias['@'] = path.resolve(__dirname, 'src');

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
    images: {
        domains: ['api.mineatar.io']
    }
});