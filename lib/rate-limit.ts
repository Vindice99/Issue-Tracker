import { redis } from '@/lib/redis'

export async function rateLimit(identifier: string, limit = 10) {
  const key = `rate_limit:${identifier}`
  const requests = await redis.incr(key)
  
  if (requests === 1) {
    await redis.expire(key, 60) 
  }
  
  return requests <= limit
}