CREATE TABLE IF NOT EXISTS "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"plaid_id" text NOT NULL,
	"name" text NOT NULL,
	"user_id" text NOT NULL
);
