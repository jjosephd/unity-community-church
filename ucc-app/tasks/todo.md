# Plan: Cash App Link Integration

## Objective

Enable the Cash App giving platform and direct it to the `$Cavellwphilips` Cashtag.

## Tasks

- [ ] 1. Update `public/giving-config.json`
  - Set `cashapp.url` to `"https://cash.app/$Cavellwphilips"`.
  - Set `cashapp.enabled` to `true`.
- [ ] 2. Update `src/data/givingData.ts` (if necessary)
  - Verify that the `cashapp` platform correctly interprets the configuration (it's currently fetching from `giving-config.json` at runtime). The text hints "Replace with actual Cash App $Cashtag URL when available", so we may want to update that comment but the dynamic fetch is the key.
- [ ] 3. Examine `src/components/giving/GivingPlatformSelector.tsx`
  - Ensure the Cash App button renders correctly when `giving-config.json` enables it. It should open the link in a new tab securely (`target="_blank"`, `rel="noopener noreferrer"`).
- [ ] 4. Test the implementation
  - Start the app with `npm run dev` and navigate to the Giving section.
  - Verify the platform selector shows Cash App with the correct link and styling.

Please review this plan. Once approved, I will proceed with execution.
