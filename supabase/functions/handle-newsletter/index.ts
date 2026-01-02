import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const NOTIFICATION_EMAIL = Deno.env.get('NOTIFICATION_EMAIL') || 'catering@harvestpark.coffee'

console.log('Environment check:')
console.log('RESEND_API_KEY exists:', !!RESEND_API_KEY)
console.log('NOTIFICATION_EMAIL:', NOTIFICATION_EMAIL)

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email } = await req.json()

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Insert into newsletter_subscribers table
    const { data, error } = await supabaseClient
      .from('newsletter_subscribers')
      .insert([
        { 
          email,
          subscribed_at: new Date().toISOString(),
        }
      ])
      .select()

    if (error) {
      console.error('Database error:', error)
      // Handle duplicate email gracefully
      if (error.code === '23505') {
        return new Response(
          JSON.stringify({ success: true, message: 'Already subscribed' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      return new Response(
        JSON.stringify({ error: 'Failed to subscribe' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Send email notification via Resend
    console.log('About to send email, RESEND_API_KEY exists:', !!RESEND_API_KEY)
    if (RESEND_API_KEY) {
      try {
        console.log('Sending email to:', NOTIFICATION_EMAIL)
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Harvestpark Coffee <notifications@updates.harvestpark.coffee>',
            to: [NOTIFICATION_EMAIL],
            subject: 'New Newsletter Signup! 📧',
            html: `
              <h2>New Newsletter Subscriber</h2>
              <p><strong>Email:</strong> ${email}</p>
              <hr>
              <p><small>Signed up at ${new Date().toLocaleString()}</small></p>
            `,
          }),
        })
        const emailResult = await emailResponse.json()
        console.log('Email API response:', emailResponse.status, emailResult)
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError)
        // Don't fail the request if email fails
      }
    } else {
      console.log('RESEND_API_KEY not set, skipping email')
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
