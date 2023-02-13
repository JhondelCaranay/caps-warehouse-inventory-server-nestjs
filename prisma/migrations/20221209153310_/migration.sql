/*
  Warnings:

  - You are about to drop the column `userId` on the `transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_userId_fkey`;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `userId`,
    ADD COLUMN `receiverId` VARCHAR(191) NULL,
    ADD COLUMN `senderId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
