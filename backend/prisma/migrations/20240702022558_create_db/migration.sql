-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "secret" REAL NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "HelpRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" BLOB NOT NULL,
    "goal" REAL NOT NULL,
    "donate_quantity" INTEGER NOT NULL DEFAULT 0,
    "parcial_amount" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "HelpRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Donates" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" REAL NOT NULL,
    CONSTRAINT "Donates_id_fkey" FOREIGN KEY ("id") REFERENCES "HelpRequest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Donates_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
