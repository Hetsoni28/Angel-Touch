import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "12345678", // Use fallback for local development if not set
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  title: "Angel Touch CMS",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
