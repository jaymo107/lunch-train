import { PrismaClient, Prisma } from "@prisma/client";
import { env } from "../../env/server.mjs";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient({
  log: ["query"],
});

const trainWithPassengers = Prisma.validator<Prisma.TrainArgs>()({
  include: { passengers: true },
});

export type TrainWithPassengers = Prisma.TrainGetPayload<typeof trainWithPassengers>;

if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
