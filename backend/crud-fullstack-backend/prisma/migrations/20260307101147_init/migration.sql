/*
  Warnings:

  - You are about to drop the column `age` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `Student` table. All the data in the column will be lost.
  - Added the required column `Age` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Subject` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Student` DROP COLUMN `age`,
    DROP COLUMN `subject`,
    ADD COLUMN `Age` INTEGER NOT NULL,
    ADD COLUMN `Subject` VARCHAR(191) NOT NULL;
