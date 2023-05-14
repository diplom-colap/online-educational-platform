-- CreateEnum
CREATE TYPE "SocialProvider" AS ENUM ('FACEBOOK', 'GOOGLE', 'GITHUB');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "socialProvider" "SocialProvider";
