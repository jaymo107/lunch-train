import { createRouter } from "./context";
import { z } from "zod";
import { Train } from "@prisma/client";

export const trainRouter = createRouter()

    /**
     * Add a new train to the departure board.
     */
    .mutation("add", {
        input: z.object({
            destination: z.string(),
            departsAt: z.date()
        }),
        async resolve({ ctx, input }) {
            const train: Train = await ctx.prisma.train.create({
                data: input,
                include: {
                    passengers: true,
                }
            });
            return train;
        },
    })

    .mutation('delete', {
        input: z.object({
            id: z.number()
        }),
        resolve({ ctx, input }) {
            return ctx.prisma.train.delete({
                where: {
                    id: input.id
                }
            });
        }
    })
    
    /**
     * Get all the trains in the departure board.
     */
    .query("getAll", {
        resolve({ ctx }) {
            return ctx.prisma.train.findMany({
                include: {
                    passengers: true,
                }
            });
        },
    });
