import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'Angel Touch Admin',
  plugins: [structureTool()],
  schema: {
    types: [], // We will add our schemas here shortly
  },
})

