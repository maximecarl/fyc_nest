/*
  Warnings:

  - You are about to drop the column `coordsLat` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `coordsLon` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `criminalId` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `dateCreation` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `dateCrime` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `dateDeletion` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the `Experience` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_requestId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_userId_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_criminalId_fkey";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "coordsLat",
DROP COLUMN "coordsLon",
DROP COLUMN "criminalId",
DROP COLUMN "dateCreation",
DROP COLUMN "dateCrime",
DROP COLUMN "dateDeletion",
DROP COLUMN "status";

-- DropTable
DROP TABLE "Experience";
