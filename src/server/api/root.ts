import { createTRPCRouter } from '~/server/api/trpc'
import { userRouter } from './routers/user'
import { formRouter } from './routers/form'
import { submissionRouter } from './routers/submission'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  form: formRouter,
  submission: submissionRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
