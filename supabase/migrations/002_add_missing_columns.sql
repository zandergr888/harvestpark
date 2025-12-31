-- Add missing columns if they don't exist
DO $$ 
BEGIN
  -- Add submitted_at to contact_submissions if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'contact_submissions' 
    AND column_name = 'submitted_at'
  ) THEN
    ALTER TABLE public.contact_submissions 
    ADD COLUMN submitted_at TIMESTAMPTZ DEFAULT NOW();
  END IF;

  -- Add subscribed_at to newsletter_subscribers if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'newsletter_subscribers' 
    AND column_name = 'subscribed_at'
  ) THEN
    ALTER TABLE public.newsletter_subscribers 
    ADD COLUMN subscribed_at TIMESTAMPTZ DEFAULT NOW();
  END IF;
END $$;

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_contact_email ON public.contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submitted ON public.contact_submissions(submitted_at DESC);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow service role to insert newsletter subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow service role to insert contact submissions" ON public.contact_submissions;

-- Create policies
CREATE POLICY "Allow service role to insert newsletter subscribers"
  ON public.newsletter_subscribers
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Allow service role to insert contact submissions"
  ON public.contact_submissions
  FOR INSERT
  TO service_role
  WITH CHECK (true);
