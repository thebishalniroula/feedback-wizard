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
    .mutation(async ({ ctx, input }) => {
      const { title, description, thumbnail, questions } = input
      const questionsData = questions.map((q) => {
        return {
          question: q,
        }
      })
      let slug = title.toLowerCase().split(' ').join('-')
      const itemsWithSimilarSlug = await ctx.prisma.form.findMany({
        where: {
          slug: {
            startsWith: slug,
          },
        },
      })
      if (itemsWithSimilarSlug.length > 0) {
        slug = slug + '-' + (itemsWithSimilarSlug.length + 1)
      }
      return ctx.prisma.form.create({
        data: {
          title,
          description,
          thumbnail,
          slug,
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
        userId: ctx.auth.userId,
      },
      orderBy: [{ updatedAt: 'desc' }],
    })
  }),

  getOne: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.form.findFirst({
      where: {
        slug: input,
      },
      include: {
        questions: true,
      },
    })
  }),

  getOneWithSubmissions: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.form.findFirst({
      where: {
        userId: ctx.auth.userId,
        slug: input,
      },
      include: {
        questions: true,
      },
    })
  }),
  update: protectedProcedure
    .input(
      z.object({
        formId: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        thumbnail: z.string().optional(),
        questions: z.array(z.string()).optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { formId, title, questions, description, thumbnail } = input
      return ctx.prisma.form.update({
        where: { id: formId },
        data: {
          title,
          //Todo - implement updating multiple questions concurrently
          // questions:{
          //   updateMany:{

          //   }
          // },
          description,
          thumbnail,
        },
      })
    }),
})
