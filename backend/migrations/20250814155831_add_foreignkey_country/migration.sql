/*
  Warnings:

  - You are about to alter the column `id_country` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `id_country` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_id_country_fkey` FOREIGN KEY (`id_country`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
