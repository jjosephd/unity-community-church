# Givelify Integration Technical Guide

> Technical documentation for integrating Givelify into the UCC Giving Page

## Overview

This document outlines the steps to integrate Givelify into the existing giving page architecture. The integration follows a **secure backend redirect pattern** to ensure client-side code cannot be manipulated.

---

## Current Architecture

The giving page collects user preferences (gift type, frequency, date, funds, amounts) via a modular React form. Upon submission, the form sends data to a backend endpoint which handles the secure redirect to Givelify.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React Form    │ ──► │  Django Backend │ ──► │    Givelify     │
│  (User Prefs)   │     │ (Secure Redirect)│     │  (Payment)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## Integration Options

### Option 1: Givelify Button Embed (Recommended for Quick Start)

Givelify provides ready-made embed buttons that redirect users to your organization's Givelify donation page.

#### Steps to Obtain Button Code:

1. Log in to [analytics.givelify.com](https://analytics.givelify.com)
2. Navigate to **Giving tools** → **Online giving**
3. In the "Givelify button" section, click **Get the Givelify button**
4. Select button style:
   - **Light** / **Dark** / **Primary**
   - **White** / **Black** / **Blue** color options
5. Choose display behavior:
   - JavaScript pop-up (modal overlay)
   - New browser tab (recommended for mobile)
6. Click **Copy Code**

#### Integration into React:

```tsx
// src/components/giving/GivelifyButton.tsx
import { memo } from 'react';

interface GivelifyButtonProps {
  buttonStyle?: 'light' | 'dark' | 'primary';
}

export const GivelifyButton = memo(
  ({ buttonStyle = 'primary' }: GivelifyButtonProps) => {
    // Button code from Givelify Analytics Studio
    // This URL is obtained from your Givelify admin dashboard
    const handleClick = async () => {
      // Call backend to get secure redirect URL
      const response = await fetch('/api/giving/givelify-redirect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'website' }),
      });
      const { redirectUrl } = await response.json();
      window.location.href = redirectUrl;
    };

    return (
      <button
        onClick={handleClick}
        className={`givelify-button givelify-button--${buttonStyle}`}
        aria-label="Give with Givelify"
      >
        Give Now
      </button>
    );
  },
);
```

#### Backend Endpoint (Django):

```python
# apps/giving/views.py
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

@require_POST
def givelify_redirect(request):
    """
    Securely returns the Givelify redirect URL.
    URL is stored server-side only, never exposed to client.
    """
    # Log for analytics
    logger.info(f"Givelify redirect requested from: {request.POST.get('source', 'unknown')}")

    # Return the redirect URL from server-side settings
    return JsonResponse({
        'redirectUrl': settings.GIVELIFY_ORGANIZATION_URL
    })
```

```python
# settings.py
GIVELIFY_ORGANIZATION_URL = os.environ.get(
    'GIVELIFY_URL',
    'https://www.givelify.com/donate/your-church-id'
)
```

### Option 2: Deep Link Integration (For Mobile Apps)

If UCC has a mobile app, Givelify offers deep linking to open the Givelify app directly to the church's profile.

```
givelify://donate?org_id=YOUR_ORG_ID
```

---

## Compliance & Regulatory Features

Givelify provides built-in features to help with IRS compliance and tax-deductible giving regulations.

### Tax Deductibility Verification

| Feature                       | Description                                                     |
| ----------------------------- | --------------------------------------------------------------- |
| **Organization Verification** | Givelify verifies churches as valid legal entities with the IRS |
| **Real-time Validation**      | Donations are validated for tax-deductible status               |
| **Automatic Recording**       | All donations are recorded and tracked                          |

### Donor Record Keeping

| Feature                   | Description                                       |
| ------------------------- | ------------------------------------------------- |
| **Annual Giving Summary** | Sent to donors by January 31st each year          |
| **Donation History**      | Donors can access complete history via mobile app |
| **PDF Receipts**          | Transaction records available via email           |

> [!IMPORTANT]
> **IRS $250+ Requirement**: For donations of $250 or more, the IRS requires a formal acknowledgment letter from the organization. Givelify's Annual Giving Summary is NOT sufficient—churches must issue their own year-end statements.

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
- [ ] Transaction fees handled as operational expense (credit donors gross amount)

---

## Implementation Steps

### Phase 1: Quick Integration (1-2 hours)

1. **Get Button Code**
   - Log into Givelify Analytics Studio
   - Copy embed button code

2. **Update GivingSummary Component**
   - Replace placeholder confirm button with Givelify redirect

3. **Add Backend Endpoint**
   - Create Django endpoint to securely return redirect URL
   - Store Givelify URL in environment variable

### Phase 2: Enhanced Integration (1-2 days)

1. **Pre-populate Data**
   - Some giving platforms support URL parameters for amount/fund
   - Investigate if Givelify supports query params

2. **Webhook Integration** (if available)
   - Receive donation confirmations from Givelify
   - Update local database with transaction records
   - Enable automated thank-you emails

3. **ChMS Integration**
   - Givelify integrates with:
     - Church Community Builder
     - Power Church
     - Other church management systems
   - Enables automatic member giving record sync

### Phase 3: Analytics & Optimization

1. **Tracking**
   - Add UTM parameters to track source
   - Log user journey for conversion optimization

2. **A/B Testing**
   - Test different button placements
   - Compare conversion rates

---

## File Changes Required

### New Files

| File                                       | Purpose                              |
| ------------------------------------------ | ------------------------------------ |
| `src/components/giving/GivelifyButton.tsx` | Secure redirect button component     |
| `apps/giving/views.py`                     | Django endpoint for secure redirects |
| `apps/giving/urls.py`                      | URL routing for giving endpoints     |

### Modified Files

| File                                      | Changes                                     |
| ----------------------------------------- | ------------------------------------------- |
| `src/components/giving/GivingSummary.tsx` | Update confirm button to use GivelifyButton |
| `settings.py`                             | Add GIVELIFY_ORGANIZATION_URL setting       |
| `.env`                                    | Add GIVELIFY_URL environment variable       |

---

## Security Considerations

> [!CAUTION]
> **Never store payment URLs client-side**. All redirect URLs must be served from the backend.

| Concern          | Mitigation                                                    |
| ---------------- | ------------------------------------------------------------- |
| URL Manipulation | Givelify URL stored in env vars, served via backend           |
| CSRF Attacks     | Django CSRF protection on API endpoints                       |
| XSS              | React's built-in XSS protection, no `dangerouslySetInnerHTML` |
| Data Integrity   | Form validation on both client and server                     |

---

## Cash App Integration (Future)

Cash App for Business can be added as an alternative payment option. Similar secure redirect pattern applies:

1. Create Cash App Business account
2. Generate payment link (Cashtag: `$ChurchName`)
3. Store link in backend environment variables
4. Create parallel redirect component

---

## Support Resources

- **Givelify Support Center**: [support.givelify.com](https://support.givelify.com)
- **Analytics Studio**: [analytics.givelify.com](https://analytics.givelify.com)
- **Developer Integration Guide**: Contact Givelify for API documentation
- **IRS Publication 1771**: Charitable Contributions Substantiation

---

## Next Steps

1. [ ] Church admin logs into Givelify Analytics Studio
2. [ ] Obtain organization button code/URL
3. [ ] Add GIVELIFY_URL to Django environment variables
4. [ ] Implement backend redirect endpoint
5. [ ] Update GivingSummary to use secure redirect
6. [ ] Test end-to-end donation flow
7. [ ] Set up year-end statement generation process
