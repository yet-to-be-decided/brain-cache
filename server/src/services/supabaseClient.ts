const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;

const supabaseClient = createClient(supabaseUrl, supabaseKey);

module.exports = supabaseClient;
