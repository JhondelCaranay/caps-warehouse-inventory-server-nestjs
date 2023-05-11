/*
  Warnings:

  - The values [SETS,ROLL] on the enum `items_unit` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[referalId]` on the table `items` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `referalId` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `items` ADD COLUMN `referalId` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('AVAILABLE', 'BORROWED', 'DEFECTIVE') NOT NULL DEFAULT 'AVAILABLE',
    MODIFY `unit` ENUM('UNIT', 'PCS') NOT NULL DEFAULT 'UNIT',
    MODIFY `quantity` INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX `items_referalId_key` ON `items`(`referalId`);
