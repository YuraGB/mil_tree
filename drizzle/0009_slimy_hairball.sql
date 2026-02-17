ALTER TABLE "release_report" ALTER COLUMN "report_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "report" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "report" ALTER COLUMN "from_person_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "report" ALTER COLUMN "to_person_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "report" ALTER COLUMN "decided_by_person_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "transfer_report" ALTER COLUMN "report_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "transfer_report" ALTER COLUMN "transfer_to_report" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "vacation_report" ALTER COLUMN "report_id" SET DATA TYPE varchar;