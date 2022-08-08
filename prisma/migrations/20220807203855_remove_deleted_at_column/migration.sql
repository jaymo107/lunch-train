/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Train` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Train" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "destination" TEXT NOT NULL,
    "departsAt" DATETIME NOT NULL
);
INSERT INTO "new_Train" ("departsAt", "destination", "id") SELECT "departsAt", "destination", "id" FROM "Train";
DROP TABLE "Train";
ALTER TABLE "new_Train" RENAME TO "Train";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
