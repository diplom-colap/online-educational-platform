/*
  Warnings:

  - The values [FACEBOOK] on the enum `SocialProvider` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `idOnSP` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SocialProvider_new" AS ENUM ('APPLE', 'GOOGLE', 'GITHUB');
ALTER TABLE "User" ALTER COLUMN "socialProvider" TYPE "SocialProvider_new" USING ("socialProvider"::text::"SocialProvider_new");
ALTER TYPE "SocialProvider" RENAME TO "SocialProvider_old";
ALTER TYPE "SocialProvider_new" RENAME TO "SocialProvider";
DROP TYPE "SocialProvider_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "idOnSP" TEXT NOT NULL;
