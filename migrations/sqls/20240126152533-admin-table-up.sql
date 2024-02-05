/* Replace with your SQL commands */

CREATE TABLE "admin" (
    "id" SERIAL PRIMARY KEY,    
    "full_name" varchar,
    "confirmation_code" varchar,
    "email" varchar UNIQUE,
    "reset_password_token" varchar,
    "password" varchar(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
