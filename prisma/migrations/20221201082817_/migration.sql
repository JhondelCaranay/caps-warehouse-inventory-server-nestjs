/*
  Warnings:

  - You are about to drop the column `action` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `action`,
    ADD COLUMN `status` ENUM('WAITING', 'ON_PROCESS', 'ON_DELIVERY', 'CONFIRMED_RECEIVED', 'ON_RETURN', 'CONFIRMED_RETURNED') NOT NULL DEFAULT 'WAITING';
