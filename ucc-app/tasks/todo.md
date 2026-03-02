# Plan: Cash App Link Integration & Immediate Updates

## Immediate To Work On

- [ ] 1. Text Replacements & Styling
  - [ ] Change "Our team" to "Team UCC" and increase font size.
  - [ ] Replace "The Trinity" with "The Godhead".
  - [ ] Change "Find Your Place" to "What we're doing in the community".
  - [ ] Change font to Inter for "Dr. Cavell Phillips" and remove "." after his name.
- [ ] 2. Homepage Updates
  - [ ] Add field in Sanity CMS for the praise team singing video.
  - [ ] Make homepage carousel editable via Sanity.
- [ ] 3. About Page Slideshow
  - [ ] Make slideshow photos manageable from Sanity.
  - [ ] Integrate slideshow with existing "video" shell (play button starts it on click).
- [ ] 4. New Ministries
  - [ ] Create structures in Sanity for Kingdom Komers, Project 133, Daughters of The King, Men That Bend.
  - [ ] Update navlinks for these ministries.
- [x] 5. Navigation & Links
  - [x] Omit "Live Streaming" page (remove from routing/navigation).
  - [x] Update Instagram link/handle to `UCC4Me`.
- [ ] 6. Community Page Updates
  - [ ] Implement a Calendar view with before/after month navigation. Setup using google calendar API.
  - [ ] Add intro text: "the heartbeat of Unity Community Church. Upcoming events, recurring workshops, and special moments. Stay connected!"
  - [ ] Change on connect page CTA:"Join our community"-> "Join Our Family".
  - [ ] Add Person/Type of Contact section to connect page under Join Our Family -> "Call 804-256-4411". Should be a neat badge
  - [ ] Implement google calendar API for events page instead of current feed setup

## Cash App Integration

- [ ] 1. Update `public/giving-config.json`
- [ ] 2. Update `src/data/givingData.ts` (if necessary)
- [ ] 3. Examine `src/components/giving/GivingPlatformSelector.tsx`
- [ ] 4. Test the implementation
