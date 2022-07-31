/*
  Warnings:

  - The primary key for the `Train` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Train` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Passenger` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Passenger` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `trainId` on the `Passenger` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Train" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "destination" TEXT NOT NULL,
    "departsAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);
INSERT INTO "new_Train" ("deletedAt", "departsAt", "destination", "id") SELECT "deletedAt", "departsAt", "destination", "id" FROM "Train";
DROP TABLE "Train";
ALTER TABLE "new_Train" RENAME TO "Train";
CREATE TABLE "new_Passenger" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "trainId" INTEGER NOT NULL,
    CONSTRAINT "Passenger_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Passenger" ("id", "name", "trainId") SELECT "id", "name", "trainId" FROM "Passenger";
DROP TABLE "Passenger";
ALTER TABLE "new_Passenger" RENAME TO "Passenger";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
