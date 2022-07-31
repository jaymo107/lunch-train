/*
  Warnings:

  - You are about to drop the column `departureTime` on the `Train` table. All the data in the column will be lost.
  - Added the required column `departsAt` to the `Train` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Train" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "destination" TEXT NOT NULL,
    "departsAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);
INSERT INTO "new_Train" ("deletedAt", "destination", "id") SELECT "deletedAt", "destination", "id" FROM "Train";
DROP TABLE "Train";
ALTER TABLE "new_Train" RENAME TO "Train";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
