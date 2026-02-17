# CMS Integration Tasks — Sanity.io

> Explicit task breakdown aligned to [implementation_plan.md](). Each task lists subtasks and measurable success metrics. Nothing is implicit.
>
> **Revision applied:** 6 structural gaps + 1 cache freshness fix integrated. See each `[GAP FIX]` annotation for traceability.

---

## Architecture — How Sanity Communicates With the Frontend

The system has **3 independent parts** that never share a runtime:

```
┌──────────────────┐       ┌─────────────────────┐       ┌─────────────────────┐
│  Sanity Studio   │       │   Sanity Cloud API  │       │  Vite Frontend      │
│  (Editor UI)     │──────▶│   (Hosted by Sanity) │◀──────│  (Hosted on Vercel) │
│                  │ write │                     │ read  │                     │
│  ucc-studio.     │       │  api.sanity.io      │       │  yoursite.vercel.app│
│  sanity.studio   │       │  cdn.sanity.io      │       │                     │
└──────────────────┘       └─────────────────────┘       └─────────────────────┘
```

| Component            | Hosted where                               | Purpose                                         | Auth                                   |
| -------------------- | ------------------------------------------ | ----------------------------------------------- | -------------------------------------- |
| **Sanity Studio**    | `ucc-studio.sanity.studio` (Sanity-hosted) | Editors create/edit content                     | Login via Sanity account               |
| **Sanity Cloud API** | `api.sanity.io` / `cdn.sanity.io`          | Stores & serves content via GROQ queries        | Public read (CDN), authenticated write |
| **Vite Frontend**    | Vercel (`yoursite.vercel.app`)             | Fetches content at runtime via `@sanity/client` | No auth needed — reads from public CDN |

**Data flow:**

1. Editor logs into Studio → creates/edits content → Sanity Cloud stores it
2. Frontend calls `cdn.sanity.io` with a GROQ query → gets JSON response → renders it
3. No server, no middleware, no webhook — just HTTP GET requests from browser to CDN

**What connects them:** The `projectId` (`hwaszqf8`) and `dataset` (`production`). Both Studio and Frontend point to the same project/dataset. The Frontend reads what Studio writes.

**Security model:** The CDN endpoint is public-read by default (Sanity free tier). No API token is needed for fetching published content. Write operations require authentication (handled by Studio).

---

## Phase 1 — Sanity Project, Schemas & Permissions

**Goal:** A working Sanity Studio with 4 content schemas, singleton enforcement, and a documented permissions model.

### Task 1.1 — Create Sanity Project

**Alignment:** Phase 1 → `[NEW] sanity/`

- [ ] Create a free Sanity project at [sanity.io/manage](https://sanity.io/manage)
- [ ] Record the `projectId` and default dataset name (`production`)
- **Project ID:** `hwaszqf8`
- [ ] Initialize Studio in `/ucc-app/sanity/` via `npm create sanity@latest`
- [ ] Verify `sanity.config.ts` and `sanity.cli.ts` exist with correct project ID
- [ ] Add `sanity/` to root `.gitignore` for `node_modules` and build output only (Studio source is committed)

> **Implementation note:** Studio was scaffolded manually instead of using `sanity init` because the CLI requires browser-based login (`sanity login`). The manual approach gives identical results with full architectural control. You will need to run `sanity login` from the `sanity/` directory before deploying in Task 4.1.
>
> **Running the dev server:** Always run from the `sanity/` directory — use `npm run dev` (or `npm run dev --prefix sanity` from the project root). Do **not** use `npx sanity dev` from the project root, as it will attempt to download a separate Sanity installation.

**Success Metrics:**
| Metric | How to verify |
| ---------------------------------- | ----------------------------------------------------------------------- |
| `npx sanity dev` starts no errors | Run from `sanity/` directory |
| Studio loads at `localhost:3333` | Navigate and confirm Studio UI renders |
| `sanity/` directory is isolated | `npm run build` in project root still succeeds (Vercel unaffected) |

---

### Task 1.2 — Create Sermon Schema

**Alignment:** Phase 1 → Content Schemas → `sermon`

- [ ] Create `sanity/schemaTypes/sermon.ts`
- [ ] Define fields: `title` (string, required), `date` (date, required), `speaker` (string, required), `scripture` (string), `videoUrl` (url), `thumbnail` (image)
- [ ] Thumbnail uses hotspot cropping: `options: { hotspot: true }`
- [ ] Thumbnail includes required `alt` text field: `validation: Rule => Rule.required()`
- [ ] Add field descriptions with recommended dimensions: `"Recommended: 1280×720 (16:9)"`
- [ ] Register schema in `sanity/schemaTypes/index.ts`

**Success Metrics:**
| Metric | How to verify |
| ------------------------------------------- | --------------------------------------------------------------------------- |
| Sermon type appears in Studio sidebar | Run `npx sanity dev`, check sidebar |
| Cannot publish without title, date, speaker | Attempt publish with empty required fields → validation errors |
| Cannot publish without alt text on image | Upload image, leave alt blank → Studio blocks publish |
| Hotspot tool appears on image upload | Upload image → focal point UI visible |

---

### Task 1.3 — Create Event Schema

**Alignment:** Phase 1 → Content Schemas → `event`

- [ ] Create `sanity/schemaTypes/event.ts`
- [ ] Define fields: `title` (string, required), `date` (date, required), `time` (string), `location` (string), `description` (text), `image` (image with hotspot + required alt), `isRecurring` (boolean)
- [ ] Image field description: `"Recommended: 800×600 (4:3)"`
- [ ] Register schema in `sanity/schemaTypes/index.ts`

**Success Metrics:**
| Metric | How to verify |
| --------------------------- | ----------------------------------------------------- |
| Event type in Studio sidebar | Run `npx sanity dev`, check sidebar |
| Image alt text required | Upload image without alt → cannot publish |
| `isRecurring` toggle works | Create event with recurring checked, confirm it saves |

---

### Task 1.4 — Create Announcement Schema

**Alignment:** Phase 1 → Content Schemas → `announcement`

- [ ] Create `sanity/schemaTypes/announcement.ts`
- [ ] Define fields: `title` (string, required), `body` (block/rich text), `publishDate` (datetime, required), `expiryDate` (datetime), `priority` (number, 1–5)
- [ ] Add field description on `expiryDate`: `"Content is automatically hidden from the website after this date"`
- [ ] Register schema in `sanity/schemaTypes/index.ts`

**Success Metrics:**
| Metric | How to verify |
| -------------------------------------- | ----------------------------------------------------------------------- |
| Announcement type in Studio sidebar | Run `npx sanity dev`, check sidebar |
| Rich text editor renders for `body` | Click into body field → block editor with bold/italic/links |
| `expiryDate` is optional | Publish without expiryDate → succeeds (lives forever until manually removed) |

---

### Task 1.5 — Create Site Settings Schema (Singleton)

**Alignment:** Phase 1 → Content Schemas → `siteSettings`  
**`[GAP 5 FIX]`** — Singleton enforcement via desk structure override, not just schema convention.

- [ ] Create `sanity/schemaTypes/siteSettings.ts`
- [ ] Define fields: `churchName` (string), `address` (string), `phone` (string), `email` (string), `serviceTimes` (array of objects: `{ day: string, time: string }`)
- [ ] Register schema in `sanity/schemaTypes/index.ts`
- [ ] **Implement singleton via Sanity structure builder in `sanity.config.ts`:**
  - [ ] Remove "Create new" button for `siteSettings` document type
  - [ ] Auto-open the single existing document when clicked
  - [ ] Use a fixed document ID (e.g., `siteSettings`) so the frontend GROQ query targets exactly one document
- [ ] Verify: editor cannot accidentally create a second Site Settings document

**Success Metrics:**
| Metric | How to verify |
| -------------------------------------------- | ----------------------------------------------------------------------- |
| Site Settings appears in Studio sidebar | Run `npx sanity dev`, check sidebar |
| No "Create new" option exists | Click Site Settings → opens document directly, no list view |
| Second document cannot be created | Attempt via API or UI → only one exists |
| Service times array is editable | Add/remove service time entries in Studio |
| Frontend query returns exactly one document | GROQ `*[_id == "siteSettings"][0]` returns single object |

---

### Task 1.6 — Document Permissions Model

**Alignment:** Phase 1 → Permissions & Role Model

- [x] Document the role assignments in this file (no code — convention-based):

| Person             | Sanity Role   | Scope (convention)                                         |
| ------------------ | ------------- | ---------------------------------------------------------- |
| **Admin (Jordan)** | Administrator | Full access — all schemas, Studio settings, project config |
| **Pastor**         | Editor        | Trained to edit sermons only                               |
| **Volunteer**      | Editor        | Trained to edit announcements only                         |
| **Media team**     | Editor        | Trained to edit photos (Phase 2)                           |

- [ ] Invite at least one Editor-role user to the Sanity project
- [ ] Confirm Editor can create/edit content but cannot delete the project or change schemas

**Success Metrics:**
| Metric | How to verify |
| -------------------------------------- | ---------------------------------------------------------- |
| Admin can access project settings | Log in as Admin → Settings visible |
| Editor can create a sermon | Log in as Editor → create and publish a sermon |
| Editor cannot access project settings | Log in as Editor → Settings page not visible / access denied |

---

## Phase 2 — Sanity Client, Data Fetching & Observability

**Goal:** The Vite app can fetch content from Sanity with type safety, caching, graceful degradation, dev-mode logging, and a fallback banner.

### Task 2.1 — Install Dependencies

**Alignment:** Phase 2 → `[MODIFY] package.json`

- [x] Run `npm install @sanity/client @sanity/image-url`
- [x] Verify both packages appear in `dependencies` in `package.json`
- [x] Verify `npm run build` still succeeds after install

> **Benchmark (2026-02-17):** `@sanity/client@7.15.0`, `@sanity/image-url@2.0.3` installed. `npm run build` exit 0 (built in 61s). `npm run lint` exit 0.

**Success Metrics:**
| Metric | How to verify | Status |
| ------------------- | ------------------------------------------------------ | ------ |
| Packages installed | `npm ls @sanity/client @sanity/image-url` shows versions | ✅ |
| Build not broken | `npm run build` exits 0 | ✅ |

---

### Task 2.2 — Create TypeScript Domain Models

**`[GAP 1 FIX]`** — Shared TypeScript interfaces prevent UI/schema drift.  
**Alignment:** Phase 2 → Type safety requirement

- [x] Create `src/types/sanity.ts`
- [x] Define interfaces matching GROQ query projections (not raw Sanity documents)
- [x] **Upgrade:** Added shared `SanityDocument` base interface — `Sermon`, `Event`, `Announcement` extend it (DRY for `_id`, cleaner generics for `useSanityData<T>`)

```ts
export interface SanityDocument {
  _id: string;
}

export interface Sermon extends SanityDocument {
  title: string;
  date: string;
  speaker: string;
  scripture?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  thumbnailAlt?: string;
}

export interface Event extends SanityDocument {
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  isRecurring?: boolean;
}

export interface Announcement extends SanityDocument {
  title: string;
  body: unknown[]; // Portable Text blocks
  publishDate: string;
  expiryDate?: string;
  priority?: number;
}

export interface SiteSettings {
  churchName: string;
  address: string;
  phone: string;
  email: string;
  serviceTimes: { day: string; time: string }[];
}
```

- [ ] All data-fetching hooks must use these types: `useSanityData<Sermon[]>`, `useSanityData<Event[]>`, etc.
- [ ] All page components receive typed data — no `any`

> **Benchmark (2026-02-17):** `npx tsc --noEmit` exit 0. Zero `: any` in `src/types/sanity.ts`. Exports 5 interfaces: `SanityDocument`, `Sermon`, `Event`, `Announcement`, `SiteSettings`.
>
> **Integration strategy:** See [PHASE_2_INTEGRATION_STRATEGY.md](tasks/PHASE_2_INTEGRATION_STRATEGY.md)

**Success Metrics:**
| Metric | How to verify | Status |
| -------------------------------------------- | -------------------------------------------------------- | ------ |
| `src/types/sanity.ts` exists and exports types | `import { Sermon, Event, Announcement, SiteSettings }` compiles | ✅ |
| No `any` in Sanity data flow | `grep -r ": any" src/types/sanity.ts` → 0 results | ✅ |
| `npx tsc --noEmit` passes | Exit code 0 | ✅ |

---

### Task 2.3 — Create Sanity Client & Environment Config

**Alignment:** Phase 2 → `[NEW] src/lib/sanityClient.ts`  
**`[GAP 6 FIX]`** — Full environment variable support with dataset override.

- [x] Create `src/lib/sanityClient.ts`
- [x] Configure with:
  - `projectId` from `VITE_SANITY_PROJECT_ID`
  - `dataset` from `VITE_SANITY_DATASET` (default: `"production"`)
  - `apiVersion` (`2026-02-17`)
  - `useCdn: true`
- [x] Export typed `client` instance
- [x] Create `.env.example` with all required vars:
  ```
  VITE_SANITY_PROJECT_ID=your-project-id
  VITE_SANITY_DATASET=production
  ```
- [x] Document environment strategy:

| Environment      | Dataset      | Notes                    |
| ---------------- | ------------ | ------------------------ |
| Local            | `production` | Dev against real content |
| Preview (future) | `staging`    | Safe testing dataset     |
| Production       | `production` | Live site                |

- [ ] Add env vars to Vercel (deployment checklist):
  1. Go to [vercel.com/dashboard](https://vercel.com/dashboard) → select the UCC project
  2. Navigate to **Settings → Environment Variables**
  3. Add `VITE_SANITY_PROJECT_ID` = `hwaszqf8` (apply to Production, Preview, Development)
  4. Add `VITE_SANITY_DATASET` = `production` (apply to Production, Preview, Development)
  5. Click **Save**
  6. Trigger a redeploy: **Deployments → ⋮ → Redeploy** (env vars take effect on next build)
     > ⚠️ **Manual step** — complete when ready to deploy (Phase 4, Task 4.1)
- [x] Create `.env` locally for development:
  ```
  VITE_SANITY_PROJECT_ID=hwaszqf8
  VITE_SANITY_DATASET=production
  ```
  > This file is gitignored. Each developer creates their own copy from `.env.example`.

> **Benchmark (2026-02-17):** `npx tsc --noEmit` exit 0. `npm run build` exit 0 (built in 39s). `npm run lint` exit 0. `grep -r "hwaszqf8" src/` — 0 matches (project ID not hardcoded).
>
> **Integration strategy:** See [PHASE_2_INTEGRATION_STRATEGY.md](tasks/PHASE_2_INTEGRATION_STRATEGY.md)

**Success Metrics:**
| Metric | How to verify |
| ---------------------------------- | --------------------------------------------------------------- |
| Client importable without errors | `import { client } from '../lib/sanityClient'` compiles |
| TypeScript type-check passes | `npx tsc --noEmit` exits 0 |
| Project ID not hardcoded | `grep` for project ID in source → only in `.env` |
| `.env.example` exists | File present with both vars documented |
| Dataset is configurable | Change `VITE_SANITY_DATASET=staging` → client uses staging |
| Vercel env vars set | Vercel dashboard → Settings → Env Vars → both present |

---

### Task 2.4 — Write GROQ Queries

**Alignment:** Phase 2 → `[NEW] src/lib/sanityQueries.ts`  
**`[GAP 4 FIX]`** — Explicit `_type` filtering and full image projection on every query.

- [ ] Create `src/lib/sanityQueries.ts`
- [ ] Write `SERMONS_QUERY`:
  - Explicit `_type == "sermon"` filter
  - Newest first
  - Project: `_id, title, date, speaker, scripture, videoUrl`
  - Image projection: `"thumbnailUrl": thumbnail.asset->url, "thumbnailAlt": thumbnail.alt`
- [ ] Write `EVENTS_QUERY`:
  - Explicit `_type == "event"` filter
  - Future events only: `date >= now()`
  - Ordered by date ascending
  - Image projection: `"imageUrl": image.asset->url, "imageAlt": image.alt`
- [ ] Write `ANNOUNCEMENTS_QUERY`:
  - Explicit `_type == "announcement"` filter
  - Active only: `!defined(expiryDate) || expiryDate >= now()`
  - Ordered by priority desc, then publishDate desc
- [ ] Write `SITE_SETTINGS_QUERY`:
  - Fixed document ID: `*[_id == "siteSettings"][0]`
- [ ] Export all queries as named constants

**Success Metrics:**
| Metric | How to verify |
| ---------------------------------------- | ----------------------------------------------------------------------------- |
| All 4 queries exported | `import { SERMONS_QUERY, EVENTS_QUERY, ANNOUNCEMENTS_QUERY, SITE_SETTINGS_QUERY }` compiles |
| Every query has explicit `_type` filter | Inspect each query string → `_type ==` present |
| Image fields fully projected | `thumbnailUrl`, `thumbnailAlt` (or `imageUrl`, `imageAlt`) in projection |
| Announcements filter expired content | Query includes `expiryDate >= now()` condition |
| Events filter past events | Query includes `date >= now()` condition |
| Site settings query targets fixed ID | Query uses `_id == "siteSettings"` not `_type == "siteSettings"` |

---

### Task 2.5 — Create Data Fetching Hook

**Alignment:** Phase 2 → `[NEW] src/hooks/useSanityData.ts`  
**`[GAP 3 FIX]`** — Dev-mode error logging for debugging visibility.  
**`[FRESHNESS FIX]`** — `refetchOnWindowFocus: true` to meet <10s acceptance metric.

- [ ] Create `src/hooks/useSanityData.ts`
- [ ] Implement `useSanityData<T>(queryKey: string, query: string, params?: Record<string, unknown>)` using `@tanstack/react-query`
- [ ] Configure:
  - `staleTime: 5 * 60 * 1000` (5 minutes)
  - `retry: 2`
  - `retryDelay`: exponential backoff
  - `refetchOnWindowFocus: true` ← ensures fresh content on tab focus
- [ ] Return `{ data: T | undefined, isLoading: boolean, error: Error | null }`
- [ ] Add dev-mode error logging:
  ```ts
  onError: (error) => {
    if (import.meta.env.DEV) {
      console.error('[Sanity] Fetch failed:', error);
    }
  };
  ```
- [ ] Leave `// TODO: Sentry integration` comment as future upgrade path
- [ ] Hook must be generic and reusable for any Sanity query

**Success Metrics:**
| Metric | How to verify |
| -------------------------------------------- | ------------------------------------------------------------------- |
| Hook compiles | `npx tsc --noEmit` exits 0 |
| Stale-while-revalidate configured | Inspect `staleTime` in implementation |
| Retry with backoff configured | Inspect `retry` and `retryDelay` in implementation |
| `refetchOnWindowFocus` enabled | Inspect config → `refetchOnWindowFocus: true` |
| Dev-mode errors logged to console | Break project ID in dev → `console.error` fires in browser console |
| Production builds do not log | `import.meta.env.DEV` guard prevents production logging |

---

### Task 2.6 — Create Fallback Banner Component

**Alignment:** Phase 2 → Observability — Graceful Degradation

- [ ] Create `src/components/common/ContentFallbackBanner.tsx`
- [ ] Renders a styled MUI `<Alert severity="info">` with message: `"Content temporarily unavailable. Please try again shortly."`
- [ ] Accepts optional `message` prop for custom text
- [ ] Component is visually consistent with existing MUI theme

**Success Metrics:**
| Metric | How to verify |
| ----------------------- | -------------------------------------------------------- |
| Banner renders correctly | Import and render in isolation — matches theme |
| Custom message works | Pass `message="Custom"` → renders "Custom" |
| Accessible | Alert has `role="alert"` (built into MUI Alert) |

---

### Task 2.7 — Create Image URL Helper

**Alignment:** Phase 2 → Image Workflow (fallback thumbnails)

- [ ] Create `src/lib/sanityImageUrl.ts`
- [ ] Configure `@sanity/image-url` builder with the Sanity client
- [ ] Export `urlFor(source)` helper that returns an image builder
- [ ] Create fallback image constants: `DEFAULT_SERMON_THUMBNAIL = '/images/default-sermon.jpg'`, `DEFAULT_EVENT_IMAGE = '/images/default-event.jpg'`
- [ ] Add fallback images to `public/images/`

**Success Metrics:**
| Metric | How to verify |
| ------------------------------------------ | ------------------------------------------------- |
| `urlFor` compiles and returns image builder | `urlFor(ref).width(400).url()` returns a string |
| Fallback images exist | Files present in `public/images/` |
| Fallback constants exported | `import { DEFAULT_SERMON_THUMBNAIL }` compiles |

---

## Phase 3 — Replace Hardcoded Content With Sanity Data

**Goal:** New Sermons and Events pages live, homepage announcements from Sanity, all with typed data, fallback handling, and explicit empty-state UX.

### Task 3.1 — Create Sermons Page

**Alignment:** Phase 3 → `[NEW] src/pages/SermonsPage.tsx`  
**`[GAP 2 FIX]`** — Explicit empty-state UX.

- [ ] Create `src/pages/SermonsPage.tsx`
- [ ] Fetch sermons using `useSanityData<Sermon[]>` + `SERMONS_QUERY`
- [ ] Display as card grid: thumbnail (with alt text), title, date, speaker
- [ ] **v1 only:** Newest first, optional speaker dropdown filter. No search, no pagination.
- [ ] Click card → detail view with embedded video player (YouTube or Facebook URL)
- [ ] If no thumbnail, use `DEFAULT_SERMON_THUMBNAIL`
- [ ] **State handling:**

| State           | Behavior                                                             |
| --------------- | -------------------------------------------------------------------- |
| Loading         | Show skeleton cards (shimmer placeholders)                           |
| Error           | Render `<ContentFallbackBanner />`                                   |
| Empty (0 items) | Show: `"No sermons available yet. Check back after Sunday service."` |
| Success         | Render sermon cards                                                  |

**Success Metrics:**
| Metric | How to verify |
| ------------------------------------- | ---------------------------------------------------------------------------- |
| Page renders at `/sermons` | Navigate in dev server |
| Sermons display newest-first | Create 3 sermons with different dates → correct order |
| Speaker dropdown filters | Select a speaker → only their sermons shown |
| Fallback banner on Sanity error | Break project ID → banner appears, page doesn't crash |
| Missing thumbnails use fallback | Create sermon without image → default thumbnail shown |
| All images have alt attributes | Inspect `<img>` elements → `alt` populated from Sanity |
| Empty state renders message | Delete all sermons → page shows "No sermons available yet…" |
| No blank page possible | Every state (loading/error/empty/success) has explicit UI |

---

### Task 3.2 — Create Events Page

**Alignment:** Phase 3 → `[NEW] src/pages/EventsPage.tsx`  
**`[GAP 2 FIX]`** — Explicit empty-state UX.

- [ ] Create `src/pages/EventsPage.tsx`
- [ ] Fetch events using `useSanityData<Event[]>` + `EVENTS_QUERY`
- [ ] Display as card/list layout: title, date, time, location, description, image
- [ ] Only show future events (filtered in GROQ query)
- [ ] If no image, use `DEFAULT_EVENT_IMAGE`
- [ ] **State handling:**

| State           | Behavior                                                  |
| --------------- | --------------------------------------------------------- |
| Loading         | Show skeleton cards                                       |
| Error           | Render `<ContentFallbackBanner />`                        |
| Empty (0 items) | Show: `"No upcoming events. Stay tuned for what's next!"` |
| Success         | Render event cards                                        |

**Success Metrics:**
| Metric | How to verify |
| -------------------------------- | ---------------------------------------------------------------- |
| Page renders at `/events` | Navigate in dev server |
| Only future events shown | Create a past event in Studio → does not appear on page |
| Fallback banner on error | Break project ID → banner appears |
| Missing images use fallback | Create event without image → default image shown |
| All images have alt attributes | Inspect `<img>` elements → `alt` populated |
| Empty state renders message | No future events → page shows "No upcoming events…" |

---

### Task 3.3 — Wire Homepage Announcements

**Alignment:** Phase 3 → `[MODIFY] HomePage.tsx`  
**`[GAP 2 FIX]`** — Hide section entirely when no announcements exist.

- [ ] Add `useSanityData<Announcement[]>` call with `ANNOUNCEMENTS_QUERY` to `HomePage.tsx`
- [ ] Display active announcements in a section on the homepage
- [ ] Expired announcements are never visible (filtered by GROQ)
- [ ] Falls back to existing hardcoded `blogPosts` data from `homeData.ts` if Sanity unreachable
- [ ] **State handling:**

| State           | Behavior                                                                  |
| --------------- | ------------------------------------------------------------------------- |
| Loading         | Show subtle skeleton or spinner in announcements area                     |
| Error           | Fall back to hardcoded `blogPosts` (no banner on homepage — just degrade) |
| Empty (0 items) | **Hide the announcements section entirely** — no blank space              |
| Success         | Render announcements, ordered by priority                                 |

**Success Metrics:**
| Metric | How to verify |
| --------------------------------------------- | ------------------------------------------------------------------------- |
| Announcements display on homepage | Create announcement in Studio → appears on homepage |
| Expired announcements hidden | Set `expiryDate` to yesterday → disappears from homepage |
| Announcements without expiry stay visible | Create with no `expiryDate` → persists |
| Fallback to hardcoded data | Break project ID → hardcoded blog posts render instead |
| Priority ordering works | 2 announcements with different priorities → higher priority first |
| Empty state hides section | Delete all announcements → section not rendered, no blank space |

---

### Task 3.4 — Add Routes & Navigation

**Alignment:** Phase 3 → `[MODIFY] App.tsx`, `[MODIFY] Navigation`

- [ ] Add `<Route path="/sermons" element={<SermonsPage />} />` to `App.tsx`
- [ ] Add `<Route path="/events" element={<EventsPage />} />` to `App.tsx`
- [ ] Add "Sermons" and "Events" links to `Navigation.tsx`
- [ ] Ensure mobile navigation includes the new links

**Success Metrics:**
| Metric | How to verify |
| --------------------------- | ---------------------------------------- |
| `/sermons` route resolves | Navigate to URL → page renders |
| `/events` route resolves | Navigate to URL → page renders |
| Nav links visible desktop | Desktop nav shows both links |
| Nav links visible mobile | Mobile hamburger menu shows both links |
| Build passes | `npm run build` exits 0 |
| Lint passes | `npm run lint` exits 0 |

---

## Phase 4 — Studio Deployment & Editor Validation

**Goal:** Sanity Studio is live at a public URL. A non-technical editor can publish content without developer help.

### Task 4.1 — Deploy Sanity Studio & Verify Frontend Connection

**Alignment:** Phase 4 → Studio Deployment

**Prerequisites:**

- [ ] All Phase 1–3 tasks complete
- [ ] Vercel env vars set (from Task 2.3 checklist)

**Step 1 — Authenticate the Sanity CLI:**

```bash
cd sanity
npx sanity login
```

> This opens a browser window. Log in with the same account used to create the project at `sanity.io/manage`. This is a **one-time setup** per machine.

**Step 2 — Configure CORS (allow frontend to read from Sanity):**

Sanity blocks cross-origin requests by default. Your Vercel frontend needs permission to call `cdn.sanity.io`.

1. Go to [sanity.io/manage](https://sanity.io/manage) → select project `hwaszqf8`
2. Navigate to **API → CORS origins**
3. Add the following origins:

| Origin                                           | Allow credentials |
| ------------------------------------------------ | ----------------- |
| `http://localhost:5173`                          | No                |
| `https://your-vercel-domain.vercel.app`          | No                |
| `https://your-custom-domain.com` (if applicable) | No                |

> **Why "No" for credentials?** The frontend only performs public CDN reads — no authentication token is sent. "Allow credentials" is only needed for authenticated mutations, which only Studio performs.

> **`localhost:5173`** is Vite's default dev port. Add it so local development works.

**Step 3 — Deploy the Studio:**

```bash
cd sanity
npx sanity deploy
```

- When prompted for hostname, enter: `ucc-studio`
- Studio will be built and deployed to: `https://ucc-studio.sanity.studio`

**Step 4 — Verify the full connection end-to-end:**

| Check                           | How to verify                                                | Expected result                              |
| ------------------------------- | ------------------------------------------------------------ | -------------------------------------------- |
| Studio is live                  | Navigate to `https://ucc-studio.sanity.studio`               | Studio login page loads                      |
| Admin can log in                | Log in with Administrator account                            | Full access to all content + settings        |
| Editor can log in               | Log in with Editor account                                   | Can create/edit content, no project settings |
| Content created in Studio       | Create a test sermon in Studio                               | Document saves without error                 |
| Frontend reads content          | Run `npm run dev` in project root, visit `/sermons`          | Test sermon appears on page                  |
| Vercel production reads content | Push to `main`, wait for Vercel deploy, visit `/sermons`     | Test sermon appears on live site             |
| CORS not blocking               | Open browser DevTools → Network tab while loading `/sermons` | No CORS errors on `cdn.sanity.io` requests   |

**Step 5 — Bookmark & share with church staff:**

- [ ] Share `https://ucc-studio.sanity.studio` with all editors
- [ ] Confirm each editor can log in and see the content types (sermons, events, announcements, site settings)

**Step 6 — Confirm Vercel env vars (final check):**

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard) → select UCC project
2. **Settings → Environment Variables**
3. Confirm `VITE_SANITY_PROJECT_ID` = `hwaszqf8` and `VITE_SANITY_DATASET` = `production` are present
4. If missing, add them and trigger a redeploy

**Success Metrics:**
| Metric | How to verify |
| ---------------------------------------- | --------------------------------------------------------------------- |
| Studio live at public URL | `https://ucc-studio.sanity.studio` loads in browser |
| Admin can log in | Log in with Administrator credentials → full access |
| Editor can log in | Log in with Editor credentials → content editing only |
| CORS origins configured | `sanity.io/manage` → API → CORS origins shows all 3 origins |
| Frontend reads from Sanity | `/sermons` page shows content created in Studio |
| No CORS errors in browser | DevTools Network tab → no blocked requests to `cdn.sanity.io` |
| Vercel env vars configured | Vercel dashboard shows both vars set for Production |

---

### Task 4.2 — Seed Sample Content

**Alignment:** Phase 4 → Seed initial content

- [ ] Create 3 sample sermons with titles, dates, speakers, scripture, video URLs, and thumbnails (with alt text)
- [ ] Create 2 sample events with future dates, times, locations, descriptions, and images (with alt text)
- [ ] Create 1 sample announcement with a `publishDate` of today and an `expiryDate` 30 days from now
- [ ] Create 1 site settings document with the church's real info (address, phone, email, service times)

**Success Metrics:**
| Metric | How to verify |
| ------------------------------ | ------------------------------------------------------------ |
| Sermons page shows 3 entries | Navigate to `/sermons` → 3 cards visible |
| Events page shows 2 entries | Navigate to `/events` → 2 cards visible |
| Homepage shows 1 announcement | Navigate to `/` → announcement section visible |
| All images have alt text | Inspect page → every `<img>` has populated `alt` attribute |

---

### Task 4.3 — Validate Success Metrics (End-to-End)

**Alignment:** Implementation Plan → Success Metrics

This is the final acceptance gate. Every metric must pass.

- [ ] **Unaided publish:** A non-technical editor (not Jordan) logs into Studio, creates a new sermon, publishes it
- [ ] **< 10 second appearance:** After publish, switch tab to `/sermons` → new sermon appears within 10 seconds (verified by `refetchOnWindowFocus`)
- [ ] **No expired content:** Create announcement with `expiryDate` set to yesterday → does NOT appear on homepage
- [ ] **Sanity outage resilience:** Set invalid project ID in `.env` → homepage falls back to hardcoded data, `/sermons` and `/events` show fallback banner
- [ ] **Empty-state UX:** Delete all sermons → page shows "No sermons available yet" (not blank)
- [ ] **Image accessibility:** Every Sanity-sourced image has non-empty `alt` attribute
- [ ] **Type safety:** `npx tsc --noEmit` exits 0 with zero `any` in Sanity data flow
- [ ] **Build clean:** `npm run build` and `npm run lint` both exit 0

**Success Metrics:**
| Metric | Target | Pass/Fail |
| ------------------------------------------------ | ------------------------------- | --------- |
| Non-technical editor publishes sermon unaided | No developer help | ☐ |
| Content appears on site after publish | < 10 seconds (tab focus) | ☐ |
| Expired announcements not visible | 0 expired items on homepage | ☐ |
| Site works during Sanity outage | Fallback banner + hardcoded data | ☐ |
| Empty states show explicit messages | No blank pages possible | ☐ |
| All images have alt text | 100% coverage | ☐ |
| Type safety — zero `any` | `tsc --noEmit` passes | ☐ |
| Build and lint pass | Exit code 0 | ☐ |

---

## Gap Resolution Traceability

| Gap           | Problem                                | Fix Location                      | Task(s)             |
| ------------- | -------------------------------------- | --------------------------------- | ------------------- |
| **Gap 1**     | No TypeScript domain models            | `src/types/sanity.ts`             | Task 2.2            |
| **Gap 2**     | Undefined empty-state UX               | Page components                   | Tasks 3.1, 3.2, 3.3 |
| **Gap 3**     | No error logging                       | `useSanityData` hook              | Task 2.5            |
| **Gap 4**     | Unsafe GROQ queries                    | `src/lib/sanityQueries.ts`        | Task 2.4            |
| **Gap 5**     | Weak singleton enforcement             | `sanity.config.ts` desk structure | Task 1.5            |
| **Gap 6**     | Missing env/deployment strategy        | `.env.example`, Vercel config     | Tasks 2.3, 4.1      |
| **Freshness** | `staleTime` conflicts with <10s metric | `refetchOnWindowFocus: true`      | Task 2.5            |

---

## Deferred (not in v1)

| Item                       | Reason                                                | When to revisit                                |
| -------------------------- | ----------------------------------------------------- | ---------------------------------------------- |
| Photo albums               | Churches rarely maintain galleries consistently       | After 3+ months of active sermon/event usage   |
| Custom Sanity roles        | Requires Team plan ($99/mo)                           | When team grows beyond trust-based conventions |
| Sermon search & pagination | Premature complexity                                  | When sermon count exceeds ~50                  |
| Facebook live detection    | Requires Facebook Graph API + backend                 | When manual embed becomes unsustainable        |
| Editor guide docs          | Write after real editors use the system               | After Task 4.3 is fully passed                 |
| Sentry error reporting     | Overkill for v1; `console.error` in dev is sufficient | When CMS outage frequency warrants monitoring  |
