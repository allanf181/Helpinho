/*
  Warnings:

  - Added the required column `help_request_id` to the `Donates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Donates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requester` to the `HelpRequest` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Donates" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "help_request_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    CONSTRAINT "Donates_help_request_id_fkey" FOREIGN KEY ("help_request_id") REFERENCES "HelpRequest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Donates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Donates" ("amount", "id") SELECT "amount", "id" FROM "Donates";
DROP TABLE "Donates";
ALTER TABLE "new_Donates" RENAME TO "Donates";
CREATE TABLE "new_HelpRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "requester" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" BLOB NOT NULL,
    "goal" REAL NOT NULL,
    "donate_quantity" INTEGER DEFAULT 0,
    "parcial_amount" REAL DEFAULT 0,
    CONSTRAINT "HelpRequest_requester_fkey" FOREIGN KEY ("requester") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HelpRequest" ("description", "donate_quantity", "goal", "id", "image", "parcial_amount", "title") SELECT "description", "donate_quantity", "goal", "id", "image", "parcial_amount", "title" FROM "HelpRequest";
DROP TABLE "HelpRequest";
ALTER TABLE "new_HelpRequest" RENAME TO "HelpRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
