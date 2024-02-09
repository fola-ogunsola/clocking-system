/* Replace with your SQL commands */
CREATE TABLE "clock-history" (
    "id" SERIAL PRIMARY KEY,
    "member_id" INT REFERENCES members(id),
    "clock_in" BOOLEAN DEFAULT FALSE,
    "clock_out" BOOLEAN DEFAULT FALSE,
    "clock_in_time" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "clock_out_time" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
)