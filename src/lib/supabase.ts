import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = 'https://brgkgfcuqsxngcnkpsda.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyZ2tnZmN1cXN4bmdjbmtwc2RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0Mzk0MjYsImV4cCI6MjA1NTAxNTQyNn0.EAG6lEg_vZDXp3Xs4dRBjJusFDusJt8wZDcMCL4SIoQ'

const supabase = createClientComponentClient({
  supabaseUrl,
  supabaseKey
})

export { supabase } 