/*
  Warnings:

  - Made the column `id_country` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `id_country` VARCHAR(191) NOT NULL;
