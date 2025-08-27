CREATE TYPE "public"."item_category" AS ENUM('part', 'device', 'tool', 'accessory');--> statement-breakpoint
CREATE TYPE "public"."item_status" AS ENUM('in_stock', 'in_repair', 'awaiting_customer', 'sold');--> statement-breakpoint
CREATE TABLE "boxes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"location" varchar(255) NOT NULL,
	"capacity" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "boxes_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "items" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"condition" text NOT NULL,
	"status" "item_status" NOT NULL,
	"category" "item_category" NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"box_id" serial NOT NULL,
	"price" integer NOT NULL,
	"max_discount" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_box_id_boxes_id_fk" FOREIGN KEY ("box_id") REFERENCES "public"."boxes"("id") ON DELETE set null ON UPDATE no action;