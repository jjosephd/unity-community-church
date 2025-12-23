# Unity Community Church - Product Roadmap

> **Status:** Active Planning
> **Last Updated:** December 22, 2025

| Stage       | Theme                | Goal                                                          | Key Features                                                                                                                                             |
| :---------- | :------------------- | :------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Stage 1** | **Digital Presence** | Establish a high-performance, mobile-first informational hub. | • Responsive Home & About pages<br>• Media Library (YouTube/Mock)<br>• Static Events Calendar<br>• Digital Giving Redirect<br>• Contact Form (Email API) |
| **Stage 2** | **Dynamic Content**  | Empower staff to manage content without code.                 | • Django CMS Integration<br>• Event Ticketing & Registration<br>• Audio/Video Sermon Hosting<br>• Staff Directory Management<br>• COVID/Alert System     |
| **Stage 3** | **Community Hub**    | Deepen engagement and member connection.                      | • User Authentication<br>• Member Profiles<br>• Group Chat / Prayer Requests<br>• Event Check-in System<br>• Recurring Giving Integration                |

---

## Stage 1: Digital Presence (Current Focus)

**Objective:** Launch a beautiful, fast, and accessible website that informs visitors and members.

- **Frontend:** React 19 + Vite 7 + Tailwind 4
- **Data:** Static content + Mock Services (services/api.ts)
- **Deployment:** Vercel (Edge Network)
- **Success Metrics:**
  - < 1s Load Time (LCP)
  - 100% Accessibility Score
  - Mobile-responsive across all devices

## Stage 2: Dynamic Content (Q1 2026)

**Objective:** Replace static content with a robust backend CMS.

- **Backend:** Django 4.2 + Django REST Framework
- **Database:** PostgreSQL
- **Admin:** Customized Django Admin
- **Deployment:** Railway/Render

## Stage 3: Community Hub (Q3 2026)

**Objective:** detailed member interaction and personalized features.

- **Auth:** JWT / OIDC
- **Real-time:** WebSockets for notifications
- **Mobile App:** Potential React Native wrapper
