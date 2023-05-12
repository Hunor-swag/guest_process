-- DropIndex
DROP INDEX `System_name_key` ON `system`;

-- AlterTable
ALTER TABLE `system` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `contact_email` VARCHAR(191) NULL,
    MODIFY `contact_phone` VARCHAR(191) NULL;
