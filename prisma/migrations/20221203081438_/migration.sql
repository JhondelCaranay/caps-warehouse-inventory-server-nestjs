/*
  Warnings:

  - You are about to drop the column `release_slip_number` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `release_slip_number`,
    ADD COLUMN `release_slip_num` VARCHAR(191) NULL;
