-- RedefineTables
PRAGMA foreign_keys=OFF;
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
