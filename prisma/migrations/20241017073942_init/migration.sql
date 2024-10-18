/*
  Warnings:

  - You are about to drop the column `dueDate` on the `borrowed` table. All the data in the column will be lost.
  - Added the required column `returnDate` to the `Borrowed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `borrowed` DROP COLUMN `dueDate`,
    ADD COLUMN `returnDate` DATETIME(3) NOT NULL;
