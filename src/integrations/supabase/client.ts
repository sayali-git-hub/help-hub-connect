// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jyovyazfnssoesqhdpyg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5b3Z5YXpmbnNzb2VzcWhkcHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNTA5NzcsImV4cCI6MjA1ODcyNjk3N30.AqYm2Dp954gzfEA2qxYV3RuVRZ-s7sr2dhPIcJA1Cf8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);