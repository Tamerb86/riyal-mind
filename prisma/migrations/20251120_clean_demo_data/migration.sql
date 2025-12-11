-- Clean demo data migration
-- This migration removes all demo/test data from the database
-- Run this before deploying to production

-- Delete all notifications (they will be regenerated as needed)
DELETE FROM "notifications";

-- Delete all family invites
DELETE FROM "family_invites";

-- Delete all family members
DELETE FROM "family_members";

-- Delete all occasions
DELETE FROM "occasions";

-- Delete all goals
DELETE FROM "goals";

-- Delete all budgets
DELETE FROM "budgets";

-- Delete all expenses
DELETE FROM "expenses";

-- Optional: Delete test users (uncomment if you have test users to remove)
-- DELETE FROM "users" WHERE email LIKE '%test%' OR email LIKE '%demo%' OR email LIKE '%example%';

-- Optional: Delete newsletter subscribers that are test emails (uncomment if needed)
-- DELETE FROM "newsletter_subscribers" WHERE email LIKE '%test%' OR email LIKE '%demo%' OR email LIKE '%example%';

-- Reset sessions for all users (they will need to login again)
DELETE FROM "sessions";

-- Delete all accounts (OAuth connections will need to be re-established)
-- Uncomment the line below if you want to remove OAuth connections
-- DELETE FROM "accounts";
