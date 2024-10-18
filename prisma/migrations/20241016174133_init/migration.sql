/*
  Warnings:

  - You are about to drop the column `bookId` on the `borrowedbook` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `borrowedbook` table. All the data in the column will be lost.
  - Added the required column `bookCode` to the `BorrowedBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberCode` to the `BorrowedBook` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `borrowedbook` DROP FOREIGN KEY `BorrowedBook_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `borrowedbook` DROP FOREIGN KEY `BorrowedBook_memberId_fkey`;

-- AlterTable
ALTER TABLE `borrowedbook` DROP COLUMN `bookId`,
    DROP COLUMN `memberId`,
    ADD COLUMN `bookCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `memberCode` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `BorrowedBook` ADD CONSTRAINT `BorrowedBook_bookCode_fkey` FOREIGN KEY (`bookCode`) REFERENCES `Book`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BorrowedBook` ADD CONSTRAINT `BorrowedBook_memberCode_fkey` FOREIGN KEY (`memberCode`) REFERENCES `Member`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
