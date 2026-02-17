# Task 2.6 — Create Fallback Banner Component

**Status:** ✅ Complete  
**File:** [`src/components/common/ContentFallbackBanner.tsx`](file:///Users/admin/Desktop/Coding/ucc/ucc-app/src/components/common/ContentFallbackBanner.tsx)  
**Barrel export:** [`src/components/common/index.ts`](file:///Users/admin/Desktop/Coding/ucc/ucc-app/src/components/common/index.ts)

---

## Component API

```tsx
<ContentFallbackBanner />                        // default message
<ContentFallbackBanner message="Custom text" />   // custom message
```

| Prop      | Type     | Default                                                        |
| --------- | -------- | -------------------------------------------------------------- |
| `message` | `string` | `"Content temporarily unavailable. Please try again shortly."` |

---

## Implementation Details

- Renders MUI `<Alert severity="info">` — inherits `churchTheme` styling
- MUI Alert provides built-in `role="alert"` for accessibility
- Exported from `src/components/common/index.ts` barrel for clean imports

---

## Success Metrics

| Metric                   | Status                                                          |
| ------------------------ | --------------------------------------------------------------- |
| Banner renders correctly | ✅ MUI `Alert` with `severity="info"`, themed via `churchTheme` |
| Custom message works     | ✅ Optional `message` prop overrides default text               |
| Accessible               | ✅ `role="alert"` built into MUI Alert                          |
| TypeScript compiles      | ✅ `npx tsc --noEmit` passes with 0 errors                      |
