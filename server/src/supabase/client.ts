import { createClient } from '@supabase/supabase-js';
import { env } from '../util/env';

const supabaseUrl = env.SUPABASE_URL;
const supabaseKey = env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
	throw new Error('Error on Supabase API/URL declaration');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
