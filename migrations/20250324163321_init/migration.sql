/*
  Warnings:

  - Added the required column `vat` to the `TransactionHisotry` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TransactionHisotry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "beneficiaryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "units" REAL NOT NULL,
    "vat" REAL NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TransactionHisotry_beneficiaryId_fkey" FOREIGN KEY ("beneficiaryId") REFERENCES "Beneficiary" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TransactionHisotry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TransactionHisotry" ("beneficiaryId", "cost", "createdAt", "id", "paymentStatus", "token", "units", "updatedAt", "userId") SELECT "beneficiaryId", "cost", "createdAt", "id", "paymentStatus", "token", "units", "updatedAt", "userId" FROM "TransactionHisotry";
DROP TABLE "TransactionHisotry";
ALTER TABLE "new_TransactionHisotry" RENAME TO "TransactionHisotry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
