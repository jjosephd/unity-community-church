import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import type { StructureBuilder } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

/**
 * Fixed document ID for the Site Settings singleton.
 * The frontend GROQ query targets this exact ID:
 *   *[_id == "siteSettings"][0]
 */
const SINGLETON_ID = 'siteSettings';
const SINGLETON_TYPES = new Set(['siteSettings']);

/**
 * Custom desk structure that enforces the Site Settings singleton pattern:
 *   1. Removes "Create new" button for siteSettings
 *   2. Auto-opens the single document when clicked (no list view)
 *   3. Uses a fixed document ID so the frontend targets exactly one document
 *
 * All other document types (sermon, event, announcement) use the
 * default list view with full create/edit capabilities.
 */
const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Site Settings — singleton (opens document directly, no list)
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId(SINGLETON_ID)
            .title('Site Settings'),
        ),
      S.divider(),
      // All other document types — standard list views
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETON_TYPES.has(listItem.getId() as string),
      ),
    ]);

/**
 * Sanity Studio configuration for Unity Community Church.
 *
 * Project ID and dataset are the only environment-specific values.
 * All schema types are registered via the schemaTypes barrel export,
 * making it easy to add new content types without touching this file
 * (Open/Closed Principle).
 */
export default defineConfig({
  name: 'ucc-studio',
  title: 'Unity Community Church',

  projectId: 'hwaszqf8',
  dataset: 'production',

  plugins: [
    structureTool({ structure }), // Custom structure with singleton enforcement
    visionTool(), // Provides a query playground for testing GROQ queries
  ],

  schema: {
    types: schemaTypes,

    // Prevent creation of new siteSettings documents via the "New document" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
    // Prevent creation actions for singleton types — only allows editing the existing one
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(
            ({ action }) => action !== 'delete' && action !== 'duplicate',
          )
        : input,
  },
});
