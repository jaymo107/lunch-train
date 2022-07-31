-- CreateTable
CREATE TABLE "Train" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "destination" TEXT NOT NULL,
    "departureTime" DATETIME NOT NULL,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "Passenger" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "trainId" TEXT NOT NULL,
    CONSTRAINT "Passenger_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
