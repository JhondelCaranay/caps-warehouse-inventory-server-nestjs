/*
  Warnings:

  - You are about to drop the column `gate_pass_num` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `materials_issuance_num` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `release_slip_number` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `return_slip_num` on the `items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `items` DROP COLUMN `gate_pass_num`,
    DROP COLUMN `materials_issuance_num`,
    DROP COLUMN `release_slip_number`,
    DROP COLUMN `return_slip_num`;

-- AlterTable
ALTER TABLE `projects` ADD COLUMN `gate_pass_num` VARCHAR(191) NULL,
    ADD COLUMN `materials_issuance_num` VARCHAR(191) NULL,
    ADD COLUMN `release_slip_number` VARCHAR(191) NULL,
    ADD COLUMN `return_slip_num` VARCHAR(191) NULL;
