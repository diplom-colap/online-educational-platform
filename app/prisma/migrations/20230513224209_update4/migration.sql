/*
  Warnings:

  - The values [FACEBOOK] on the enum `SocialProvider` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `teacherId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `url` to the `Quizz` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SocialProvider_new" AS ENUM ('APPLE', 'GOOGLE', 'GITHUB');
ALTER TABLE "User" ALTER COLUMN "socialProvider" TYPE "SocialProvider_new" USING ("socialProvider"::text::"SocialProvider_new");
ALTER TYPE "SocialProvider" RENAME TO "SocialProvider_old";
ALTER TYPE "SocialProvider_new" RENAME TO "SocialProvider";
DROP TYPE "SocialProvider_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_lessonId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "teacherId";

-- AlterTable
ALTER TABLE "Quizz" ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- DropTable
DROP TABLE "Video";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "UserAndCourse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "UserAndCourse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserAndCourse" ADD CONSTRAINT "UserAndCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAndCourse" ADD CONSTRAINT "UserAndCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
