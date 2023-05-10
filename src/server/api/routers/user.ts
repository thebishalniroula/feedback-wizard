import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { name, email, password, username } = input
      return ctx.prisma.user.create({
        data: {
          name,
          email,
          password,
          username,
        },
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
        },
      })
    }),
  verifyCredentials: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
      })
      if (!user) {
        return null
      }
      if (user?.password === input.password) {
        return null
      }
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      }
    }),
})
