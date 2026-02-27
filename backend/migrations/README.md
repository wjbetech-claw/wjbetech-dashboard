Migrations folder — run SQL files against your Postgres instance in order.

Example (locally):

psql $DATABASE_URL -f backend/migrations/001_initial_schema.sql
