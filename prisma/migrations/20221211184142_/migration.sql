-- AlterTable
ALTER TABLE `items` MODIFY `model` VARCHAR(191) NULL,
    MODIFY `price` DOUBLE NOT NULL DEFAULT 0;
