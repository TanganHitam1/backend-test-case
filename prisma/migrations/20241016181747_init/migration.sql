-- CreateTable
CREATE TABLE `Penalty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `penalizedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `memberCode` VARCHAR(191) NOT NULL,
    `days` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Penalty` ADD CONSTRAINT `Penalty_memberCode_fkey` FOREIGN KEY (`memberCode`) REFERENCES `Member`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
