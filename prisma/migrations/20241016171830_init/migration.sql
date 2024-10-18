/*
  Warnings:

  - You are about to drop the column `bookId` on the `borrowedbook` table. All the data in the column will be lost.
  - Added the required column `bookCode` to the `BorrowedBook` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `borrowedbook` DROP FOREIGN KEY `BorrowedBook_bookId_fkey`;

-- AlterTable
ALTER TABLE `borrowedbook` DROP COLUMN `bookId`,
    ADD COLUMN `bookCode` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `BorrowedBook` ADD CONSTRAINT `BorrowedBook_bookCode_fkey` FOREIGN KEY (`bookCode`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
