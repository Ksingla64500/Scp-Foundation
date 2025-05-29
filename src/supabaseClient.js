import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oveldmxybnkjrgvvxbyl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92ZWxkbXh5Ym5ranJndnZ4YnlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0Nzk1NTYsImV4cCI6MjA2MjA1NTU1Nn0.ocTQKsh37hPA67CwOEBgt8w1oOh5y2K_SsHFI0pV2Us';
export const supabase = createClient(supabaseUrl, supabaseKey);
