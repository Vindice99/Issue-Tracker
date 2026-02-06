import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis'

export async function rateLimit(identifier: string, limit = 10) {
  const key = `rate_limit:${identifier}`
  const requests = await redis.incr(key)
  
  if (requests === 1) {
    await redis.expire(key, 60) 
  }
  
  return requests <= limit
}

// app/api/issue/route.tsx
export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  
  if (!await rateLimit(ip, 5)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }
 
    return NextResponse.json({ message: 'Issue created' }, { status: 201 })
}