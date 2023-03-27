-- AlterTable
ALTER TABLE "users" ADD COLUMN "role" TEXT;

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "address" TEXT,
    "lat" REAL,
    "lng" REAL,
    "price" REAL,
    "image" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Place_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "place_id" TEXT NOT NULL,
    "date" DATETIME,
    "timeStart" DATETIME,
    "timeEnd" DATETIME,
    "status" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Booking_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "Place" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
