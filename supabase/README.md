# Supabase Setup for Harvestpark Coffee

## Prerequisites

1. Install Supabase CLI:
```bash
brew install supabase/tap/supabase
```

## Local Development

1. **Start Supabase locally**:
```bash
supabase start
```

2. **Apply migrations**:
```bash
supabase db reset
```

3. **Deploy functions locally** (they auto-deploy with `supabase start`)

4. **Test locally**: Forms will now work at http://localhost:5173

## Deploy to Production

1. **Link to your Supabase project**:
```bash
supabase link --project-ref sxfahukoleoqihoueodx
```

2. **Push database migrations**:
```bash
supabase db push
```

3. **Deploy Edge Functions**:
```bash
supabase functions deploy handle-newsletter
supabase functions deploy handle-contact-form
```

## Database Tables Created

### `newsletter_subscribers`
- `id` (UUID, primary key)
- `email` (unique)
- `subscribed_at` (timestamp)

### `contact_submissions`
- `id` (UUID, primary key)
- `name`
- `email`
- `event_type`
- `event_date`
- `message`
- `submitted_at` (timestamp)

## View Submissions

Access your Supabase dashboard:
- https://supabase.com/dashboard/project/sxfahukoleoqihoueodx/editor

Or query locally:
```bash
supabase db dump --data-only --table newsletter_subscribers
supabase db dump --data-only --table contact_submissions
```
