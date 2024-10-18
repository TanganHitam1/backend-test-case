/*
  Warnings:

  - The primary key for the `book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `book` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `bookCode` on the `borrowedbook` table. All the data in the column will be lost.
  - Added the required column `bookId` to the `BorrowedBook` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `borrowedbook` DROP FOREIGN KEY `BorrowedBook_bookCode_fkey`;

-- AlterTable
ALTER TABLE `book` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `borrowedbook` DROP COLUMN `bookCode`,
    ADD COLUMN `bookId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `BorrowedBook` ADD CONSTRAINT `BorrowedBook_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
