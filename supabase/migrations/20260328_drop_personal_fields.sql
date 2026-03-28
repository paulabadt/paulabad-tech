-- Drop personal data columns from the leads table
-- These fields were removed from the analysis form (name, phone, whatsapp, terms)

ALTER TABLE leads DROP COLUMN IF EXISTS name;
ALTER TABLE leads DROP COLUMN IF EXISTS phone;
ALTER TABLE leads DROP COLUMN IF EXISTS whatsapp;
ALTER TABLE leads DROP COLUMN IF EXISTS terms_accepted;
