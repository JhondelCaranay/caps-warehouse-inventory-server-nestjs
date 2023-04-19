-- AlterTable
ALTER TABLE `users` ADD COLUMN `resetPasswordExp` DATETIME(3) NULL,
    ADD COLUMN `resetPasswordToken` VARCHAR(191) NULL;
