-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Donates" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "help_request_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "update_date_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Donates_help_request_id_fkey" FOREIGN KEY ("help_request_id") REFERENCES "HelpRequest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Donates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Donates" ("amount", "help_request_id", "id", "user_id") SELECT "amount", "help_request_id", "id", "user_id" FROM "Donates";
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
    "update_date_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "HelpRequest_requester_fkey" FOREIGN KEY ("requester") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HelpRequest" ("description", "donate_quantity", "goal", "id", "image", "parcial_amount", "requester", "title") SELECT "description", "donate_quantity", "goal", "id", "image", "parcial_amount", "requester", "title" FROM "HelpRequest";
DROP TABLE "HelpRequest";
ALTER TABLE "new_HelpRequest" RENAME TO "HelpRequest";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "update_date_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("email", "id", "name", "secret", "telephone") SELECT "email", "id", "name", "secret", "telephone" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
