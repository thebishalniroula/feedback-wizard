import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ['/', '/auth/(.*)', '/form(.*)'],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/'],
}
