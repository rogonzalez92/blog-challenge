import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
        })
    }

    const response = NextResponse.next()
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS'
    )
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')

    return response
}

export const config = {
    matcher: '/api/:path*',
}
