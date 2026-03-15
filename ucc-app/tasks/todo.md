# Homepage Carousel Refactor

## Tasks

- [x] **Sanity Schema: Create "Homepage Slideshow" content section**
  - [x] Add new `homepageSlideshow` Sanity document schema with max 6 image validation
  - [x] Add editor-friendly error message for max image count
  - [x] Register schema in `schemaTypes/index.ts`
  - [x] Add singleton entry in `sanity.config.ts` desk structure

- [x] **GROQ Query: Add query for homepage slideshow images**
  - [x] Add `HOMEPAGE_SLIDESHOW_QUERY` to `sanityQueries.ts`
  - [x] Project image URLs with optimization parameters

- [x] **HeroSection: Refactor to use Sanity images**
  - [x] Add `useSanityData` hook to fetch slideshow images
  - [x] Use `urlFor()` for optimized image URLs (width, format, quality)
  - [x] Conditionally render carousel only when images exist
  - [x] Keep current carousel dimensions and styling intact

- [x] **HomePage: Hide the second CarouselSection**
  - [x] Comment out `CarouselSection` rendering
  - [x] Clean up unused imports

- [x] **Build Verification**
  - [x] `npm run build` — zero errors

- [ ] **Sanity Studio: Redeploy** (manual step)
  - [ ] `cd sanity && npx sanity deploy`
