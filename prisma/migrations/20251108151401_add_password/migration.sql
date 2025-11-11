-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordHash" TEXT,
ALTER COLUMN "estado" SET DEFAULT false;
