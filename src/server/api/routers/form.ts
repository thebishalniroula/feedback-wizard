import { z } from 'zod'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc'

export const formRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        thumbnail: z.string().optional(),
        questions: z.array(z.string()),
      })
    )
    .mutation(({ ctx, input }) => {
      const { title, description, thumbnail, questions } = input
      const questionsData = questions.map((q) => {
        return {
          question: q,
        }
      })
      return ctx.prisma.form.create({
        data: {
          title,
          description,
          thumbnail,
          slug: title.replace(' ', '-'),
          userId: ctx.auth.userId,
          questions: {
            createMany: {
              data: questionsData,
            },
          },
        },
      })
    }),

  getAllByUser: protectedProcedure.query(({ ctx, input }) => {
    return ctx.prisma.form.findMany({
      where: {
        // TODO - replace with ctx.session.user.userId after implementing auth
        userId: ctx.auth.userId,
      },
    })
  }),

  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.form.findFirst({
      where: {
        id: input,
      },
      include: {
        questions: true,
      },
    })
  }),
})
