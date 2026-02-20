/**
 * Schema type barrel export.
 *
 * Register all content schemas here. Each schema is defined in its own file
 * and added to this array. The array is consumed by sanity.config.ts.
 *
 * To add a new content type:
 *   1. Create a new file in this directory (e.g., photos.ts)
 *   2. Import it here
 *   3. Add it to the schemaTypes array
 *
 * This follows the Open/Closed Principle — new types are added
 * without modifying existing schema definitions.
 */
import { sermon } from './sermon';
import { event } from './event';
import { announcement } from './announcement';
import { siteSettings } from './siteSettings';
import { leader } from './leader';
import { leadershipGroup } from './leadershipGroup';

export const schemaTypes = [
  sermon,
  event,
  announcement,
  siteSettings,
  leader,
  leadershipGroup,
];
