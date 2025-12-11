-- AlterTable
ALTER TABLE "expenses" ALTER COLUMN "category_id" TYPE INTEGER USING "category_id"::integer;

-- AlterTable
ALTER TABLE "budgets" ALTER COLUMN "category_id" TYPE INTEGER USING "category_id"::integer;
