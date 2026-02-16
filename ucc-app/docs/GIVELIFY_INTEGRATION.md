# Givelify Integration Guide

> Technical and admin documentation for the UCC Givelify giving integration

---

## Overview

The giving page uses a **runtime config file** to direct donors to the church's Givelify donation page. This means:

- **No rebuild needed** to update the giving link
- **No developer needed** — admins edit one JSON file
- **Instant updates** — change the file, the site picks it up on next load

```
┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────┐
│  Giving Page    │ ──► │ /giving-config.json  │ ──► │    Givelify     │
│  (React)        │     │ (runtime fetch)      │     │  (Donation)     │
└─────────────────┘     └─────────────────────┘     └─────────────────┘
```

---

## How It Works

1. When the Giving page loads, the `GivingPlatformSelector` component fetches `/giving-config.json`
2. When a user clicks the **Givelify** button, the URL from the config is opened in a new tab
3. The donor completes their gift on Givelify's secure platform

### Config File Location

```
public/giving-config.json
```

### Config Format

```json
{
  "platforms": {
    "givelify": {
      "url": "https://giv.li/jrc4w0",
      "enabled": true
    },
    "cashapp": {
      "url": null,
      "enabled": false
    }
  },
  "updatedAt": "2026-02-16"
}
```

| Field       | Purpose                                                |
| ----------- | ------------------------------------------------------ |
| `url`       | The Givelify giving link (from analytics.givelify.com) |
| `enabled`   | `true` = button works, `false` = shows "coming soon"   |
| `updatedAt` | Date of last config change (for admin tracking)        |

---

## Admin Instructions

### Updating the Givelify Link

1. Go to [analytics.givelify.com](https://analytics.givelify.com) → **Giving tools** → **Online giving**
2. Copy "Your giving link"
3. Edit `public/giving-config.json` → update the `url` value
4. Commit and push (or edit through CMS if available)

### Disabling a Platform

Set `"enabled": false` in the config — the button will show a "coming soon" message.

### Adding Cash App (Future)

1. Create a Cash App Business account
2. Get the payment link (e.g., `https://cash.app/$ChurchName`)
3. Update `giving-config.json`:
   ```json
   "cashapp": {
     "url": "https://cash.app/$YourCashtag",
     "enabled": true
   }
   ```

---

## Compliance & Regulatory Features

Givelify provides built-in features for IRS compliance and tax-deductible giving.

### Tax Deductibility

| Feature                       | Description                                                     |
| ----------------------------- | --------------------------------------------------------------- |
| **Organization Verification** | Givelify verifies churches as valid legal entities with the IRS |
| **Automatic Recording**       | All donations are recorded and tracked                          |
| **Annual Giving Summary**     | Sent to donors by January 31st each year                        |
| **PDF Receipts**              | Transaction records available via email                         |

> [!IMPORTANT]
> **IRS $250+ Requirement**: For donations of $250 or more, the IRS requires a formal acknowledgment letter from the organization. Givelify's Annual Giving Summary is NOT sufficient — churches must issue their own year-end statements.

### Organization Reporting (Analytics Studio)

Access at [analytics.givelify.com](https://analytics.givelify.com):

| Report Type             | Use Case                                    |
| ----------------------- | ------------------------------------------- |
| **Donations Report**    | Filter by date range, run for calendar year |
| **Year-End Statements** | Generate per-donor tax statements           |
| **Reconciliation**      | Match with bank deposits                    |
| **Donor Insights**      | Track giving patterns and engagement        |

### Compliance Checklist

- [ ] Church has valid Tax ID/EIN registered with Givelify
- [ ] Year-end giving statements include ALL donations (Givelify, cash, check)
- [ ] Formal acknowledgment letters sent for donations ≥ $250
- [ ] Transaction fees handled as operational expense

---

## File Reference

| File                                               | Purpose                                                    |
| -------------------------------------------------- | ---------------------------------------------------------- |
| `public/giving-config.json`                        | Runtime config — giving platform URLs and enabled state    |
| `src/components/giving/GivingPlatformSelector.tsx` | Component that fetches config and renders platform buttons |
| `src/data/givingData.ts`                           | Static UI data (names, descriptions, colors) — not URLs    |
| `src/components/giving/PlatformButton.tsx`         | Reusable button component                                  |

---

## Support Resources

- **Givelify Support Center**: [support.givelify.com](https://support.givelify.com)
- **Analytics Studio**: [analytics.givelify.com](https://analytics.givelify.com)
- **Givelify Account**: `Ucc4metrustee@gmail.com`
- **IRS Publication 1771**: Charitable Contributions Substantiation
