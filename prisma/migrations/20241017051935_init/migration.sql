/*
  Warnings:

  - You are about to drop the column `penalized` on the `member` table. All the data in the column will be lost.
  - You are about to drop the `borrowedbook` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `penalty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `borrowedbook` DROP FOREIGN KEY `BorrowedBook_bookCode_fkey`;

-- DropForeignKey
ALTER TABLE `borrowedbook` DROP FOREIGN KEY `BorrowedBook_memberCode_fkey`;

-- DropForeignKey
ALTER TABLE `penalty` DROP FOREIGN KEY `Penalty_memberCode_fkey`;

-- AlterTable
ALTER TABLE `member` DROP COLUMN `penalized`,
    ADD COLUMN `isPenalized` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `borrowedbook`;

-- DropTable
DROP TABLE `penalty`;

-- CreateTable
CREATE TABLE `Borrowed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `bookId` INTEGER NOT NULL,
    `borrowDate` DATETIME(3) NOT NULL,
    `dueDate` DATETIME(3) NOT NULL,
    `returned` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Borrowed` ADD CONSTRAINT `Borrowed_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Borrowed` ADD CONSTRAINT `Borrowed_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
