-- CreateEnum
CREATE TYPE "IssueSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "severity" "IssueSeverity" NOT NULL DEFAULT 'MEDIUM';
