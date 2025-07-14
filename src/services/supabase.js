import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gygoirdiysfdkvrexfur.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Z29pcmRpeXNmZGt2cmV4ZnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzODk1OTQsImV4cCI6MjA2MTk2NTU5NH0.EA_CdyHTXvJhrD9WMCtIvRVSPCnVf27y0gp6rmjusnk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
