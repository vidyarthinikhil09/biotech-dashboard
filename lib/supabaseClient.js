import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cwcigeuhenpfrbpmwdqx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3Y2lnZXVoZW5wZnJicG13ZHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NDU0MjksImV4cCI6MjA4NDQyMTQyOX0.yTkJYqMDT00kN2xKef8WTVKIYWrDZ3ju5FifVA-inP4'

export const supabase = createClient(supabaseUrl, supabaseKey)