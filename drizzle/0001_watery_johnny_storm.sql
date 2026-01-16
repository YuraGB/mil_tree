CREATE TYPE "public"."request_status" AS ENUM('created', 'approved', 'declined');--> statement-breakpoint
CREATE TYPE "public"."request_type" AS ENUM('transfer');--> statement-breakpoint
CREATE TABLE "medical_report" (
	"report_id" varchar(20) PRIMARY KEY NOT NULL,
	"diagnosis" text NOT NULL,
	"treatment" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "release_report" (
	"report_id" varchar(20) PRIMARY KEY NOT NULL,
	"release_date" timestamp with time zone NOT NULL,
	"reason" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "report" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"report_type" varchar NOT NULL,
	"from_person_id" varchar(20) NOT NULL,
	"to_person_id" varchar(20) NOT NULL,
	"status" varchar DEFAULT 'created' NOT NULL,
	"assigned_to_person_id" varchar(20),
	"decided_by_person_id" varchar(20),
	"transfer_from" varchar(100),
	"transfer_to" varchar(100),
	"description" text,
	"decision_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transfer_report" (
	"report_id" varchar(20) PRIMARY KEY NOT NULL,
	"transfer_from" varchar(100) NOT NULL,
	"transfer_to" varchar(100) NOT NULL,
	"reason" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vacation_report" (
	"report_id" varchar(20) PRIMARY KEY NOT NULL,
	"vacation_from" timestamp with time zone NOT NULL,
	"vacation_to" timestamp with time zone NOT NULL,
	"reason" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "unit" ALTER COLUMN "unit_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "unit" ALTER COLUMN "unit_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "medical_report" ADD CONSTRAINT "medical_report_report_id_report_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."report"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "release_report" ADD CONSTRAINT "release_report_report_id_report_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."report"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report" ADD CONSTRAINT "report_from_person_id_Person_id_fk" FOREIGN KEY ("from_person_id") REFERENCES "public"."Person"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report" ADD CONSTRAINT "report_to_person_id_Person_id_fk" FOREIGN KEY ("to_person_id") REFERENCES "public"."Person"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report" ADD CONSTRAINT "report_assigned_to_person_id_Person_id_fk" FOREIGN KEY ("assigned_to_person_id") REFERENCES "public"."Person"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report" ADD CONSTRAINT "report_decided_by_person_id_Person_id_fk" FOREIGN KEY ("decided_by_person_id") REFERENCES "public"."Person"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transfer_report" ADD CONSTRAINT "transfer_report_report_id_report_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."report"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vacation_report" ADD CONSTRAINT "vacation_report_report_id_report_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."report"("id") ON DELETE cascade ON UPDATE no action;