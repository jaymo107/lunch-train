import { createRouter } from "./context";
import { z } from 'zod';
import { Passenger } from "@prisma/client";

export const passengerRouter = createRouter()
    /**
     * Board the train.
     */
    .mutation('board', {
        input: z.object({
            name: z.string(),
            train: z.number(),
        }),
        async resolve({ ctx, input }) { 
            const passenger: Passenger = await ctx.prisma.passenger.create({
                data: {
                    trainId: input.train,
                    name: input.name,
                }
            });

            return passenger;
        }
    });