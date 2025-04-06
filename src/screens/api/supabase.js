import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';
const supabaseUrl = 'https://jklnskhczufuohrkamzh.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprbG5za2hjenVmdW9ocmthbXpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5Mzc1OTEsImV4cCI6MjA1OTUxMzU5MX0.yXOSbzaE6pLK0tpl1MHXjJRc77hc_Rg0V89NmAsudTY';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
