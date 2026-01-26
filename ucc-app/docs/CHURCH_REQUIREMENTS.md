# Website Integration Requirements

**For:** Unity Community Church Leadership  
**From:** Jordan Daniel, Lead Developer  
**Date:** January 2026  
**Purpose:** Request for access and information needed to complete website features

---

## What This Document Is

To bring the new church website to life with automated features, I need access to a few church accounts and services. This document explains what is needed, why it's needed, and how it will be used—all in plain terms.

> **Your information stays secure.** All sensitive credentials will be stored securely on the website's server and will never be visible to website visitors.

---

## Requirements Summary

| Feature       | What's Needed                       | Priority  | Impact                    |
| ------------- | ----------------------------------- | --------- | ------------------------- |
| Online Giving | Givelify page URL                   | 🔴 High   | Secure Digital Tithes     |
| Online Giving | Cash App $Cashtag                   | 🔴 High   | Easy Mobile Giving        |
| Live Stream   | Facebook Page Admin access          | 🟡 Medium | Automated Sunday Services |
| Media Archive | YouTube channel info                | 🟡 Medium | Self-Updating Library     |
| Contact Form  | Church email for receiving messages | 🔴 High   | Direct Visitor Engagement |

---

## Detailed Requirements

### 1. Online Giving (Givelify)

**Priority:** 🔴 High – This directly enables the church to receive donations online

**What I Need:**

- [ ] The Givelify giving page link (URL) for Unity Community Church

**How to Get It:**

1. Log into [analytics.givelify.com](https://analytics.givelify.com) with the church's Givelify account
2. Go to **Giving Tools** → **Online Giving**
3. Copy the "Online Giving Link" and send it to me

**How It Will Be Used:**
When visitors click "Give with Givelify" on the website, they will be taken directly to this secure page to complete their donation. All donation processing, receipts, and tax records are handled by Givelify—the website simply provides a convenient link.

---

### 2. Online Giving (Cash App)

**Priority:** 🔴 High – Alternative giving option for members who prefer Cash App

**What I Need:**

- [ ] The church's Cash App $Cashtag (e.g., `$UnityChurch`)

**How It Will Be Used:**
When visitors click "Give with Cash App" on the website, they will be directed to send money to this $Cashtag. This is a simple, one-click experience for donors.

---

### 3. Facebook Live Stream Automation

**Priority:** 🟡 Medium – Saves weekly manual work and keeps the website current

**What I Need:**

- [ ] Admin access to the Unity Community Church Facebook Page
- [ ] Or: The church's Facebook Page ID

**What This Enables:**
Currently, someone must manually update the website every Sunday with the new live stream video. With access to the Facebook page, I can set up automation that:

- Automatically shows the latest Sunday service video
- Displays a "We're Live!" banner when a service is streaming
- Never requires manual updates again

**Security Note:**
I would create a dedicated "App" through Facebook's developer tools that only has permission to _read_ videos—it cannot post, delete, or modify anything on the page.

**Alternative Option:**
If you prefer not to grant access, the website can continue with the current manual process where someone copies the video code each week.

---

### 4. YouTube Media Archive

**Priority:** 🟡 Medium – Allows automatic sermon archive updates

**What I Need:**

- [ ] Link to the church's YouTube channel
- [ ] Confirmation of which playlist(s) contain sermon recordings

**How It Will Be Used:**
The website will automatically display the latest sermons from YouTube. When a new video is uploaded to the church's channel, it will appear on the website without any manual updates needed.

---

### 5. Contact Form Email

**Priority:** 🔴 High – Required for the contact page to work

**What I Need:**

- [ ] The email address where contact form submissions should be sent (e.g., `info@unitychurch.org`)

**How It Will Be Used:**
When visitors fill out the "Contact Us" form on the website, their message will be delivered to this email address. The church can respond directly from their normal email.

## Quick Checklist for Church Admin

Please provide the following:

- [ ] Givelify giving page URL
- [ ] Cash App $Cashtag
- [ ] Facebook Page admin access OR Page ID
- [ ] YouTube channel link and sermon playlist
- [ ] Email address for contact form submissions
- [ ] GoDaddy account login OR confirmation of current plan
- [ ] Domain name (e.g., `unitychurch.org`)

---

## 6. Website Hosting & Savings

**Priority:** 🔴 High – Required to launch the new website

The church currently pays approximately **$500/year** for GoDaddy services. We can reduce this cost significantly while improving the website's performance and security.

### Recommended: Cloudflare Pages

- **Cost: $0** (Free forever for our needs)
- **Reliability:** Enterprise-grade reliability used by major global corporations.
- **Security:** Built-in protection against web attacks and includes a free security certificate (SSL).
- **Performance:** Optimized to load the website instantly on any device.

### Alternative: GoDaddy Shared Hosting

- **Cost: ~$150/year**
- **Why use it:** Best if you prefer to keep your website and church email with the same familiar provider. This still provides a **$350/year savings**.

**My Recommendation:** I recommend switching to **Cloudflare Pages** for hosting. We can keep your domain and email at GoDaddy (or move email to Google Workspace) to maximize savings and reliability.

**Potential Annual Savings: ~$425.00**

> _Detailed technical comparisons, including technical hosting options and future growth plans, have been moved to the **Appendix** at the end of this document._

---

## What Happens Next

Once I receive these items, here's the timeline:

| Week       | Milestone                                           |
| ---------- | --------------------------------------------------- |
| **Week 1** | Giving buttons go live (Givelify + Cash App)        |
| **Week 2** | Contact form activated                              |
| **Week 3** | Facebook live stream automation (if access granted) |
| **Week 4** | YouTube sermon archive automation                   |
| **Week 5** | Full website launch on new hosting                  |

---

## Questions?

If you have any questions about what this access is used for or concerns about security, please don't hesitate to ask. I'm happy to walk through any of these items in a call or meeting.

**Contact:** Jordan Daniel  
**Role:** Lead Developer, UCC Website Project

---

## Appendix: Technical Hosting & Growth Details

### Current Hosting Analysis

The current **$500/year** cost suggests the church is on a high-tier Website Builder or VPS plan.

| Possible Current Plan      | Typical Annual Cost | Notes                                     |
| :------------------------- | :------------------ | :---------------------------------------- |
| Website Builder (Commerce) | ~$325–$445/year     | Closed system; limits customization       |
| VPS Hosting (Technical)    | ~$400–$550/year     | Overly complex for a standard church site |
| Bundled Plan               | ~$400–$600/year     | Includes domain, SSL, and email extras    |

### Full Deployment Comparison

| Option               | Cost      | Performance | Tech Stack   | Notes                                 |
| :------------------- | :-------- | :---------- | :----------- | :------------------------------------ |
| **Cloudflare Pages** | **$0**    | ⭐⭐⭐⭐⭐  | Global Edge  | Fastest, free, and highly secure.     |
| **DigitalOcean**     | $60/yr    | ⭐⭐⭐⭐    | App Platform | Simple, scalable, developer-friendly. |
| **AWS Amplify**      | ~$0-60/yr | ⭐⭐⭐⭐⭐  | AWS Cloud    | Enterprise-grade, used by giants.     |
| **GoDaddy Shared**   | ~$180/yr  | ⭐⭐⭐      | cPanel/FTP   | Familiar, includes basic email.       |

### Future Growth (Backend Features)

If we later decide to add features like member directories or event registrations, these services integrate seamlessly with our current build:

- **Supabase:** Secure database and member logins.
- **SendGrid:** Reliable automated emails for forms.
- **Mailchimp:** Professional newsletter management.
