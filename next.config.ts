import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,POST,DELETE,OPTIONS',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type',
                    },
                ],
            },
        ]
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/posts?page=1',
                permanent: true,
            },
            {
                source: '/posts',
                destination: '/posts?page=1',
                permanent: false,
                missing: [
                    {
                        type: 'query',
                        key: 'page',
                    },
                ],
            },
            {
                source: '/:path((?!posts|api).*)*',
                destination: '/posts?page=1',
                permanent: false,
            },
        ]
    },
}

export default nextConfig
