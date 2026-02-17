# Task 2.7 — Image URL Helper

**Status:** ✅ Complete  
**Phase:** 2 → Image Workflow (fallback thumbnails)

## What Was Implemented

### `src/lib/sanityImageUrl.ts`

| Export                     | Type                                    | Purpose                                            |
| -------------------------- | --------------------------------------- | -------------------------------------------------- |
| `urlFor(source)`           | `(SanityImageSource) → ImageUrlBuilder` | On-the-fly image transforms (resize, crop, format) |
| `DEFAULT_SERMON_THUMBNAIL` | `string`                                | Fallback path: `/images/default-sermon.jpg`        |
| `DEFAULT_EVENT_IMAGE`      | `string`                                | Fallback path: `/images/default-event.jpg`         |

### Fallback Images

| File                               | Source                    |
| ---------------------------------- | ------------------------- |
| `public/images/default-sermon.jpg` | Copied from `worship.jpg` |
| `public/images/default-event.jpg`  | Copied from `connect.jpg` |

> [!TIP]
> Replace these with branded images when available. The constant paths will remain the same.

## Usage Examples

```tsx
import { urlFor, DEFAULT_SERMON_THUMBNAIL } from '@/lib/sanityImageUrl';

// Transform a Sanity image reference
const thumbUrl = urlFor(sermon.thumbnail).width(400).height(225).url();

// Use fallback when no image exists
const src = sermon.thumbnailUrl ?? DEFAULT_SERMON_THUMBNAIL;
```

## Design Decisions

- **Reuses the existing `client`** from `sanityClient.ts` — no duplicated project/dataset config (DRY)
- **`@sanity/image-url` was already installed** — no new dependencies
- **`SanityImageSource` imported from main entry** — v2 uses package `exports` map; sub-path imports are not exposed

## Verification

| Check                              | Result                                                         |
| ---------------------------------- | -------------------------------------------------------------- |
| `npx tsc -b --noEmit`              | ✅ Zero errors                                                 |
| Fallback files exist               | ✅ `default-sermon.jpg` (131 KB), `default-event.jpg` (1.2 MB) |
| `urlFor` returns `ImageUrlBuilder` | ✅ Confirmed via type-check                                    |
| Fallback constants exportable      | ✅ Named exports compile                                       |
