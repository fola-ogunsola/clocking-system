/* Replace with your SQL commands */
CREATE TABLE "members" (
    "id" SERIAL PRIMARY KEY,
    "member_id" INT REFERENCES members(id),
    "first_name" varchar,
    "last_name" varchar,
    "email" varchar UNIQUE,
    "phone_number" VARCHAR(50) NOT NULL,
    "profile_image" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
)