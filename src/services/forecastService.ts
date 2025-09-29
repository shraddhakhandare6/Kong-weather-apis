import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { Forecast } from "../models/forecastModel";

dotenv.config();

// Prefer a SUPABASE_SERVICE_ROLE_KEY for server-side operations (bypasses RLS).
// If not provided, fall back to the anon key (subject to RLS policies).
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
if (!supabaseKey) {
  throw new Error('Supabase key not set. Provide SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY in .env');
}

const supabase = createClient(process.env.SUPABASE_URL!, supabaseKey);
if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
  // eslint-disable-next-line no-console
  console.log('Using SUPABASE_SERVICE_ROLE_KEY for Supabase client (server-side).');
} else {
  // eslint-disable-next-line no-console
  console.log('Using SUPABASE_ANON_KEY for Supabase client (RLS policies apply).');
}

export const getAllForecasts = async (): Promise<Forecast[]> => {
  const { data, error } = await supabase.from("forecasts").select("*");
  if (error) throw error;
  return data as Forecast[];
};

export const getForecastById = async (id: string): Promise<Forecast | null> => {
  const { data, error } = await supabase.from("forecasts").select("*").eq("id", id).single();
  if (error) throw error;
  return data as Forecast;
};

export const createForecast = async (forecast: Forecast): Promise<Forecast> => {
  const { data, error } = await supabase.from("forecasts").insert([forecast]).select().single();
  if (error) throw error;
  return data as Forecast;
};

export const updateForecast = async (id: string, forecast: Forecast): Promise<Forecast> => {
  const { data, error } = await supabase.from("forecasts").update(forecast).eq("id", id).select().single();
  if (error) throw error;
  return data as Forecast;
};

export const deleteForecast = async (id: string): Promise<void> => {
  const { error } = await supabase.from("forecasts").delete().eq("id", id);
  if (error) throw error;
};
