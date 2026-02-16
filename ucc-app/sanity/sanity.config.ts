import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

/**
 * Sanity Studio configuration for United Community Church.
 *
 * Project ID and dataset are the only environment-specific values.
 * All schema types are registered via the schemaTypes barrel export,
 * making it easy to add new content types without touching this file
 * (Open/Closed Principle).
 */
export default defineConfig({
  name: 'ucc-studio',
  title: 'United Community Church',

  projectId: 'hwaszqf8',
  dataset: 'production',

  plugins: [
    structureTool(), // Provides the main interface for managing and organizing content
    visionTool(), // Provides a query playground for testing GROQ queries
  ],

  schema: {
    types: schemaTypes,
  },
});
