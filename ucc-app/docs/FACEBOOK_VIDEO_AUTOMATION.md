# Facebook Live Automation Pipeline

This document outlines how to move from manual iframe embedding to an automated process that fetches the latest Sunday service automatically using the Facebook Graph API.

## **Phase 1: Manual Method (Current)**

Currently, we are using the **Facebook Embedded Posts** tool.

1. Go to the Facebook post.
2. Click the three dots `...` and select "Embed".
3. Copy the `<iframe>` code into `LiveStreamingPage.tsx`.

---

## **Phase 2: Automated Pipeline (Recommended)**

To show the "Latest Live Video" automatically, you need to connect the website to the **Facebook Graph API**.

### **1. Requirements**

- A **Facebook Developer Account**.
- A **Facebook App** created in the developer portal.
- A **Page Access Token** (Permanent) for the Unity Community Church page.

### **2. The API Workflow**

Your future Django backend or a simple Lambda function can perform these steps:

#### **A. Fetch Latest Video**

Query the `video` edge of your page:

```http
GET /v18.0/{page-id}/videos?type=live
```

This returns the most recent live stream ID.

#### **B. Dynamic Embed URL Generation**

Once you have the `{video-id}`, you can construct the embed URL dynamically in React:

```typescript
const embedUrl = `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/facebook/videos/${latestVideoId}/`;
```

### **3. Implementation Steps**

1.  **Authentication:** Use a "Short-Lived" User Token to generate a "Long-Lived" Page Access Token.
2.  **Backend Cache:** Store the `latestVideoId` in your Django database. Update it every hour via a Cron job so you don't hit Facebook's API limits.
3.  **Frontend Logic:**
    - The `LiveStreamingPage.tsx` clears its local state and fetches the `{latestVideoId}` from your Django API.
    - If a video is currently "LIVE", show a "JOIN NOW" badge.
    - If not, show the most recent "PREVIOUSLY RECORDED" video.

## **Phase 3: Webhooks (Real-Time)**

For instant updates when a service starts:

1. Configure **Facebook Webhooks**.
2. Subscribe to `live_videos` on the page.
3. When Facebook sends a "live started" notification to your backend, your website can immediate show the "WE ARE LIVE" banner to all active users.

---

## **Summary of Benefits**

- **Zero Maintenance:** No more copy-pasting code every Monday.
- **Improved UX:** Shows "Live" status in real-time.
- **Professionalism:** Ensures the website always features the most current message.
