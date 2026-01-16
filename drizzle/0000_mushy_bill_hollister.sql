CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Person" (
	"id" text PRIMARY KEY NOT NULL,
	"commander_id" text,
	"unit_id" text,
	"name" text NOT NULL,
	"rank" text,
	"status_code" text DEFAULT '800' NOT NULL,
	"assignment_role" text DEFAULT 'soldier' NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Person_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "brigade_unit" (
	"id" text PRIMARY KEY NOT NULL,
	"unit_type" text DEFAULT 'brigade',
	"name" text,
	"commander_id" text,
	CONSTRAINT "uniq_brigade_commander" UNIQUE("commander_id")
);
--> statement-breakpoint
CREATE TABLE "unit" (
	"id" text PRIMARY KEY NOT NULL,
	"unit_name" text,
	"commander_id" text,
	"unit_type" text,
	"parent_unit_id" text
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_Person_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Person"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Person" ADD CONSTRAINT "Person_commander_id_Person_id_fk" FOREIGN KEY ("commander_id") REFERENCES "public"."Person"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_Person_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Person"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brigade_unit" ADD CONSTRAINT "brigade_unit_commander_id_Person_id_fk" FOREIGN KEY ("commander_id") REFERENCES "public"."Person"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "unit" ADD CONSTRAINT "unit_commander_id_Person_id_fk" FOREIGN KEY ("commander_id") REFERENCES "public"."Person"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "unit" ADD CONSTRAINT "unit_parent_unit_id_unit_id_fk" FOREIGN KEY ("parent_unit_id") REFERENCES "public"."unit"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_person_commander" ON "Person" USING btree ("commander_id");--> statement-breakpoint
CREATE INDEX "idx_unit_id" ON "Person" USING btree ("unit_id");--> statement-breakpoint
CREATE INDEX "idx_person_email" ON "Person" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_person_id" ON "Person" USING btree ("id");--> statement-breakpoint
CREATE INDEX "session_personId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "idx_unit_commander" ON "unit" USING btree ("commander_id");--> statement-breakpoint
CREATE INDEX "idx_unit_parent" ON "unit" USING btree ("parent_unit_id");