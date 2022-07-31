// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { trainRouter } from "./train";
import { passengerRouter } from "./passenger";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('train.', trainRouter)
  .merge('passenger.', passengerRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
