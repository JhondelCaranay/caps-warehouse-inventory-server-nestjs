-- AlterTable
ALTER TABLE `items` ADD COLUMN `gate_pass_num` VARCHAR(191) NULL,
    ADD COLUMN `materials_issuance_num` VARCHAR(191) NULL,
    ADD COLUMN `release_slip_number` VARCHAR(191) NULL,
    ADD COLUMN `return_slip_num` VARCHAR(191) NULL;
