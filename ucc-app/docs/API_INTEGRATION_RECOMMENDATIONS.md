# API Integration Recommendations

> Optimal and seamless API integrations for United Community Church

---

## Overview

This document evaluates each feature area and recommends the most suitable API integration approach. Where no API exists or is not optimal, alternative solutions are provided.

---

## 1. Online Giving (Donations)

### Recommended: **Givelify Button Redirect**

| Aspect               | Recommendation                     |
| -------------------- | ---------------------------------- |
| **Approach**         | Redirect to Givelify hosted portal |
| **API Available?**   | ❌ No public API for form pre-fill |
| **Integration Type** | Button embed / link redirect       |
| **Effort**           | Low (1-2 hours)                    |

**Why this works best:**

- Givelify does **not** offer a public API to pre-fill donation amounts, funds, or frequencies
- Their system is designed for users to complete all selections within their secure portal (for IRS compliance)
- Attempting to build a custom form that passes data to Givelify will result in double-entry for users

**Optimal Integration:**

```
User clicks "Give with Givelify" → Opens Givelify portal (new tab or modal)
```

**Backend Security Pattern:**

```python
# Store URL server-side, never in client code
GIVELIFY_ORGANIZATION_URL = os.environ.get('GIVELIFY_URL')
```

### Alternative: **Cash App**

| Aspect               | Details                 |
| -------------------- | ----------------------- |
| **API Available?**   | ❌ No integration API   |
| **Integration Type** | Direct link to $Cashtag |
| **Best For**         | Quick, casual giving    |

**Note:** Cash App is purely a redirect; no data can be passed or tracked.

---

## 2. Facebook Live Streaming

### Recommended: **Facebook Graph API**

| Aspect               | Recommendation                         |
| -------------------- | -------------------------------------- |
| **Approach**         | Automated video fetching via Graph API |
| **API Available?**   | ✅ Yes - Facebook Graph API v18.0+     |
| **Integration Type** | Backend polling + caching              |
| **Effort**           | Medium (4-8 hours)                     |

**Why this works best:**

- Eliminates manual iframe copy-paste every week
- Can detect "LIVE" status in real-time
- Professional automated experience

**Optimal Integration:**

```
Django Cron Job (hourly) → Facebook Graph API → Cache latest video ID → React fetches from Django
```

**API Endpoint:**

```http
GET /v18.0/{page-id}/videos?type=live
Authorization: Bearer {page-access-token}
```

**Requirements:**

1. Facebook Developer Account
2. Facebook App (created in developer portal)
3. Long-lived Page Access Token

### Enhanced Option: **Facebook Webhooks**

| Aspect               | Details                       |
| -------------------- | ----------------------------- |
| **API Available?**   | ✅ Yes                        |
| **Integration Type** | Real-time push notifications  |
| **Best For**         | Instant "We're Live!" banners |

Subscribe to `live_videos` webhook for immediate notifications when a stream starts.

---

## 3. Contact Form Submissions

### Recommended: **Django Backend + Email Service**

| Aspect                    | Recommendation                     |
| ------------------------- | ---------------------------------- |
| **Approach**              | Form → Django API → Email delivery |
| **API Available?**        | N/A (build your own)               |
| **Email Service Options** | SendGrid, Mailgun, AWS SES         |
| **Effort**                | Low-Medium (2-4 hours)             |

**Optimal Integration:**

```
React Form → Django REST API → SendGrid/Mailgun → Church inbox
```

**Why not use a third-party form service?**

- Full control over data
- No vendor lock-in
- Integrates with existing Django backend

---

## 4. Events Calendar

### Recommended: **Google Calendar API**

| Aspect               | Recommendation                  |
| -------------------- | ------------------------------- |
| **Approach**         | Sync with Google Calendar       |
| **API Available?**   | ✅ Yes - Google Calendar API v3 |
| **Integration Type** | Read-only sync to website       |
| **Effort**           | Medium (4-6 hours)              |

**Why this works best:**

- Church staff likely already use Google Calendar
- Single source of truth (no duplicate entry)
- Automatic updates to website

**Optimal Integration:**

```
Google Calendar (staff manages) → Django sync job → React displays
```

**Alternative:** If staff prefers a CMS, use Strapi or Sanity headless CMS for event management.

---

## 5. Sermon/Media Archive

### Recommended: **YouTube Data API**

| Aspect               | Recommendation                     |
| -------------------- | ---------------------------------- |
| **Approach**         | Fetch playlist/channel videos      |
| **API Available?**   | ✅ Yes - YouTube Data API v3       |
| **Integration Type** | Backend caching + frontend display |
| **Effort**           | Medium (4-6 hours)                 |

**Why this works best:**

- Church already uploads to YouTube
- No need to host video files
- Built-in analytics on YouTube

**Optimal Integration:**

```
YouTube Channel → YouTube Data API → Django cache → React media page
```

**API Endpoint:**

```http
GET /youtube/v3/playlistItems?playlistId={playlist-id}&maxResults=10
```

---

## 6. Church Management System (ChMS) Sync

### Recommended: **Givelify + ChMS Integration**

| Aspect                | Details                                |
| --------------------- | -------------------------------------- |
| **API Available?**    | ✅ Via Givelify Analytics Studio       |
| **Supported Systems** | Church Community Builder, Power Church |
| **Integration Type**  | Automated data sync                    |

Givelify offers native integrations with several ChMS platforms to sync donation records automatically. Configure via Analytics Studio.

---

## Summary Table

| Feature          | Recommended API             | API Available?     | Alternative              |
| ---------------- | --------------------------- | ------------------ | ------------------------ |
| **Giving**       | Givelify Button Redirect    | ❌ No pre-fill API | Cash App link            |
| **Live Stream**  | Facebook Graph API          | ✅ Yes             | Manual embed             |
| **Contact Form** | Django + SendGrid           | ✅ Build own       | Formspree, Netlify Forms |
| **Events**       | Google Calendar API         | ✅ Yes             | Headless CMS             |
| **Media**        | YouTube Data API            | ✅ Yes             | Manual embed             |
| **ChMS Sync**    | Givelify native integration | ✅ Yes             | Manual export            |

---

## Features With No API Solution

| Feature                    | Status           | Recommendation                      |
| -------------------------- | ---------------- | ----------------------------------- |
| **Givelify form pre-fill** | ❌ Not supported | Use redirect approach               |
| **Cash App tracking**      | ❌ No API        | Manual reconciliation               |
| **Custom donation forms**  | ❌ Not available | Accept Givelify's hosted experience |

---

## Priority Implementation Order

1. **Givelify Button** - Already done (platform selector)
2. **Facebook Graph API** - Automate live stream embedding
3. **YouTube Data API** - Automate media archive
4. **Google Calendar API** - Automate events
5. **SendGrid/Mailgun** - Email delivery for contact form

---

## Next Steps

1. [ ] Create Facebook Developer App and obtain Page Access Token
2. [ ] Set up YouTube API credentials
3. [ ] Choose email service (SendGrid recommended for free tier)
4. [ ] Evaluate if Google Calendar fits staff workflow
