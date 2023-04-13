/*
  Warnings:

  - The values [ON_PROCESS] on the enum `transactions_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `projects` ADD COLUMN `status` ENUM('ONGOING', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'ONGOING';

-- AlterTable
ALTER TABLE `transactions` MODIFY `status` ENUM('WAITING', 'ON_DELIVERY', 'CONFIRMED_RECEIVED', 'ON_RETURN', 'CONFIRMED_RETURNED', 'CANCELLED') NOT NULL DEFAULT 'WAITING';
