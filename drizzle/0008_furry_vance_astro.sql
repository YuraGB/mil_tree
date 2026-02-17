ALTER TABLE "Person" ALTER COLUMN "unit_id" SET DEFAULT 'p-0001';--> statement-breakpoint
ALTER TABLE "Person" ALTER COLUMN "rank" SET DEFAULT 'Private';--> statement-breakpoint
ALTER TABLE "Person" ALTER COLUMN "rank" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "report" DROP COLUMN "transfer_from";--> statement-breakpoint
ALTER TABLE "report" DROP COLUMN "transfer_to";