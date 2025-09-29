import app from "./app";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;
const docsPath = process.env.DOCS_PATH || '/weatherapi/v1/docs';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Check Supabase connection
(async () => {
  try {
    const { data, error } = await supabase.from("forecasts").select("*").limit(1);
    if (error) throw error;
    console.log("✅ Supabase connected successfully");
  } catch (err) {
    console.error("❌ Supabase connection failed:", err);
  }
})();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}${docsPath}`);
});
