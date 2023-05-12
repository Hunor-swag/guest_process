/*
  Warnings:

  - You are about to drop the column `concactEmail` on the `system` table. All the data in the column will be lost.
  - You are about to drop the column `contactPhone` on the `system` table. All the data in the column will be lost.
  - Added the required column `contact_email` to the `System` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_phone` to the `System` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `system` DROP COLUMN `concactEmail`,
    DROP COLUMN `contactPhone`,
    ADD COLUMN `contact_email` VARCHAR(191) NOT NULL,
    ADD COLUMN `contact_phone` VARCHAR(191) NOT NULL;
