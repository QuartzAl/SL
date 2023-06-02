/*
  Warnings:

  - You are about to drop the column `status` on the `borrow` table. All the data in the column will be lost.
  - The primary key for the `item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `itemid` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `itemname` on the `item` table. All the data in the column will be lost.
  - The primary key for the `person` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `personid` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `personname` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `phonenumber` on the `person` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `item_name` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `person_name` to the `person` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "borrow" DROP CONSTRAINT "borrow_itemid_fkey";

-- DropForeignKey
ALTER TABLE "borrow" DROP CONSTRAINT "borrow_personid_fkey";

-- DropForeignKey
ALTER TABLE "borrow" DROP CONSTRAINT "borrow_userid_fkey";

-- AlterTable
ALTER TABLE "borrow" DROP COLUMN "status",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "userid" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "item" DROP CONSTRAINT "item_pkey",
DROP COLUMN "itemid",
DROP COLUMN "itemname",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "item_name" VARCHAR(50) NOT NULL,
ADD CONSTRAINT "item_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "person" DROP CONSTRAINT "person_pkey",
DROP COLUMN "personid",
DROP COLUMN "personname",
DROP COLUMN "phonenumber",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "person_name" VARCHAR(50) NOT NULL,
ADD COLUMN     "phone_number" VARCHAR(150),
ADD CONSTRAINT "person_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "auth_user" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" CHAR(65) NOT NULL,
    "email" VARCHAR(150),

    CONSTRAINT "auth_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_session" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "active_expires" BIGINT NOT NULL,
    "idle_expires" BIGINT NOT NULL,

    CONSTRAINT "auth_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_key" (
    "id" TEXT NOT NULL,
    "hashed_password" TEXT,
    "user_id" TEXT NOT NULL,
    "primary_key" BOOLEAN NOT NULL,
    "expires" BIGINT,

    CONSTRAINT "auth_key_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_user_id_key" ON "auth_user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_session_id_key" ON "auth_session"("id");

-- CreateIndex
CREATE INDEX "auth_session_user_id_idx" ON "auth_session"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_key_id_key" ON "auth_key"("id");

-- CreateIndex
CREATE INDEX "auth_key_user_id_idx" ON "auth_key"("user_id");

-- AddForeignKey
ALTER TABLE "borrow" ADD CONSTRAINT "borrow_itemid_fkey" FOREIGN KEY ("itemid") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrow" ADD CONSTRAINT "borrow_personid_fkey" FOREIGN KEY ("personid") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrow" ADD CONSTRAINT "borrow_userid_fkey" FOREIGN KEY ("userid") REFERENCES "auth_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_session" ADD CONSTRAINT "auth_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_key" ADD CONSTRAINT "auth_key_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
