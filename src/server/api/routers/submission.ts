import { z } from 'zod'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc'

export const submissionRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        formId: z.string(),
        answers: z.array(z.object({ questionId: z.string(), answer: z.string() })),
      })
    )
    .mutation(({ ctx, input }) => {
      const { formId, answers } = input
      return ctx.prisma.submission.create({
        data: {
          formId,
          answers: {
            createMany: { data: answers },
          },
        },
      })
    }),
  getByFormId: protectedProcedure.input(z.object({ formId: z.string() })).query(async ({ ctx, input }) => {
    const formsByThatUser = await ctx.prisma.form.findMany({
      where: {
        userId: ctx.auth.userId,
      },
      select: {
        id: true,
      },
    })

    let isUserAuthorized = false
    for (const form of formsByThatUser) {
      if (form.id === input.formId) {
        isUserAuthorized = true
        break
      }
    }
    if (!isUserAuthorized) return null
    return ctx.prisma.submission.findMany({
      where: {
        formId: input.formId,
      },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
      },
    })
  }),
})
