import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

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
})
