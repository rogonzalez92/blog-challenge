import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: 'standalone',
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
