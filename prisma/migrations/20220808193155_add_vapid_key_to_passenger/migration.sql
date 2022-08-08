/*
  Warnings:

  - Added the required column `vapidPublicKey` to the `Passenger` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Passenger" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "trainId" INTEGER NOT NULL,
    "vapidPublicKey" TEXT NOT NULL
);
INSERT INTO "new_Passenger" ("id", "name", "trainId") SELECT "id", "name", "trainId" FROM "Passenger";
DROP TABLE "Passenger";
ALTER TABLE "new_Passenger" RENAME TO "Passenger";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
