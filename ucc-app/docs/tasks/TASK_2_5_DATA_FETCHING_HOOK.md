# Task 2.5 — Create Data Fetching Hook

**Status:** ✅ Complete  
**File:** [`src/hooks/useSanityData.ts`](file:///Users/admin/Desktop/Coding/ucc/ucc-app/src/hooks/useSanityData.ts)  
**Supporting change:** [`src/App.tsx`](file:///Users/admin/Desktop/Coding/ucc/ucc-app/src/App.tsx) — wired `QueryClientProvider`

---

## Hook Signature

```ts
useSanityData<T>(queryKey: string, query: string, params?: Record<string, unknown>)
→ { data: T | undefined, isLoading: boolean, error: Error | null }
```

---

## Configuration

| Setting                | Value                                                | Rationale                                             |
| ---------------------- | ---------------------------------------------------- | ----------------------------------------------------- |
| `staleTime`            | `5 * 60 * 1000` (5 min)                              | Stale-while-revalidate — cached data served for 5 min |
| `retry`                | `2`                                                  | Retry failed requests up to 2 times                   |
| `retryDelay`           | `(attempt) => Math.min(1000 * 2 ** attempt, 30_000)` | Exponential backoff: 1 s → 2 s, capped at 30 s        |
| `refetchOnWindowFocus` | `true`                                               | Ensures fresh content (<10 s) when user tabs back     |

---

## Error Observability

- **Dev mode:** `console.error('[Sanity] Fetch failed:', error)` — guarded by `import.meta.env.DEV`
- **Production:** Logging suppressed — no console output
- **Future:** `// TODO: Sentry integration` comment marks upgrade path

---

## QueryClientProvider

`QueryClientProvider` was added to [`App.tsx`](file:///Users/admin/Desktop/Coding/ucc/ucc-app/src/App.tsx) wrapping the full app tree (outside `BrowserRouter`). This is a prerequisite for any `useQuery`-based hook.

---

## Success Metrics

| Metric                            | Status                                                |
| --------------------------------- | ----------------------------------------------------- |
| Hook compiles                     | ✅ `npx tsc --noEmit` exits 0                         |
| Stale-while-revalidate configured | ✅ `staleTime: 5 * 60 * 1000`                         |
| Retry with backoff configured     | ✅ `retry: 2`, exponential `retryDelay`               |
| `refetchOnWindowFocus` enabled    | ✅ `refetchOnWindowFocus: true`                       |
| Dev-mode errors logged to console | ✅ `import.meta.env.DEV` guard with `console.error`   |
| Production builds do not log      | ✅ Guard prevents production logging                  |
| Hook is generic and reusable      | ✅ Accepts any `<T>`, any GROQ query, optional params |
