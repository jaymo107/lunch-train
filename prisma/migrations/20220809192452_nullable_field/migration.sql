-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Passenger" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "trainId" INTEGER NOT NULL,
    "vapidPublicKey" TEXT
);
INSERT INTO "new_Passenger" ("id", "name", "trainId", "vapidPublicKey") SELECT "id", "name", "trainId", "vapidPublicKey" FROM "Passenger";
DROP TABLE "Passenger";
ALTER TABLE "new_Passenger" RENAME TO "Passenger";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
