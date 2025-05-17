import { createBrowserClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "@/config";

export const createClient = () => {
  return createBrowserClient(
    supabaseUrl!,
    supabaseAnonKey!
  );
};
