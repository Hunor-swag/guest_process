/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `System` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `System_name_key` ON `System`(`name`);
