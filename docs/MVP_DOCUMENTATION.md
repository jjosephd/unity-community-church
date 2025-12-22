# Unity Community Church - MVP Documentation

> **Version:** 1.2.0  
> **Created:** December 22, 2024  
> **Status:** Initial Planning Phase

---

## Project Overview

### Vision

A modern, mobile-first web application for **Unity Community Church** that serves as a digital hub for congregation engagement, ministry coordination, and community outreach.

### Goals

- **Accessibility**: Mobile-friendly responsive design for all devices
- **Engagement**: Easy access to media, events, and giving capabilities
- **Maintainability**: Simple admin panel for church directors with minimal technical expertise
- **Scalability**: Clean architecture supporting future feature additions

### Target Users

| User Type                  | Needs                                                  |
| -------------------------- | ------------------------------------------------------ |
| **Congregation Members**   | Access sermons, events, giving, and resources          |
| **Visitors**               | Learn about the church, ministries, and how to connect |
| **Church Directors/Staff** | Manage content, events, and website settings           |

---

## Tech Stack

| Layer          | Technology                                   | Justification                                       |
| -------------- | -------------------------------------------- | --------------------------------------------------- |
| **Frontend**   | React 19.2.x + TypeScript 5.9.x              | React Compiler, `<Activity>` component, type safety |
| **Build Tool** | Vite 7.3.x                                   | New Environment API, faster builds                  |
| **UI Library** | Material UI (MUI) 7.3.x                      | Zero-runtime CSS engine, massive perf boost         |
| **Styling**    | TailwindCSS 4.1.x                            | Rust-based engine, CSS-first config                 |
| **Backend**    | Django 4.2 + Python 3.11                     | Full-featured framework with built-in admin         |
| **API**        | Django REST Framework                        | Industry-standard REST API toolkit                  |
| **Database**   | PostgreSQL 15+                               | Robust, scalable, production-ready                  |
| **Deployment** | Vercel (Frontend) + Railway/Render (Backend) | Optimized for each layer                            |

> [!TIP]
> See [TECHNICAL_ARCHITECTURE.md](./TECHNICAL_ARCHITECTURE.md) for detailed patterns and code examples.

---

## Pages

| #   | Page                    | Purpose                                                       |
| --- | ----------------------- | ------------------------------------------------------------- |
| 1   | **HOME**                | Welcome visitors, hero section, quick links, featured content |
| 2   | **ABOUT US**            | Mission, history, leadership, beliefs                         |
| 3   | **MINISTRIES**          | Ministry listings with details and leaders                    |
| 4   | **MEDIA**               | Sermons, videos, podcasts, sermon series                      |
| 5   | **GIVING**              | Online donation portal, recurring giving                      |
| 6   | **UPCOMING EVENTS**     | Calendar view, event details, registration                    |
| 7   | **JOIN SBC**            | Membership process, application forms                         |
| 8   | **RESOURCES**           | Downloadable documents, external links                        |
| 9   | **COVID-19 GUIDELINES** | Health protocols (toggle-able visibility)                     |
| 10  | **CONTACT US**          | Contact form, location, hours, staff directory                |

---

## Admin Panel

Django Admin provides a complete, production-ready interface for church staff:

- **User Management**: Roles and permissions
- **Content Editing**: WYSIWYG rich text editor
- **Media Management**: Upload sermons, images, documents
- **Event Management**: Create, edit, manage registrations
- **Ministry Management**: Add/edit ministries and leaders
- **Form Submissions**: View contact form messages

### User Roles

| Role               | Access Level                         |
| ------------------ | ------------------------------------ |
| **Super Admin**    | Full access to all features          |
| **Content Editor** | Edit pages, events, media            |
| **Event Manager**  | Manage events and registrations only |
| **Viewer**         | Read-only dashboard access           |

---

## Project Structure

```
unity-community-church/
├── frontend/                 # React + Vite + TailwindCSS
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API service layer
│   │   └── types/            # TypeScript types
│   └── package.json
│
├── backend/                  # Django Backend
│   ├── config/               # Django settings
│   ├── apps/                 # Django applications
│   │   ├── content/          # Page content
│   │   ├── events/           # Events & registrations
│   │   ├── media_library/    # Sermons & media
│   │   ├── ministries/       # Ministry listings
│   │   ├── staff/            # Staff profiles
│   │   ├── giving/           # Donations
│   │   └── contact/          # Contact forms
│   └── requirements.txt
│
└── docs/                     # Documentation
    ├── MVP_DOCUMENTATION.md
    ├── TECHNICAL_ARCHITECTURE.md
    ├── app/                  # Frontend docs
    │   └── README.md
    └── api/                  # Backend docs
        └── README.md
```

---

## Dependencies

### Frontend

| Package                   | Version | Purpose                                      |
| ------------------------- | ------- | -------------------------------------------- |
| `react` / `react-dom`     | 19.2.x  | UI framework (React Compiler, Activity)      |
| `react-router-dom`        | 7.11.x  | Routing (merged with Remix, full-stack)      |
| `@mui/material`           | 7.3.x   | Material UI components (zero-runtime CSS)    |
| `@mui/icons-material`     | 7.3.x   | Material icons                               |
| `@emotion/react`          | —       | _Optional:_ MUI emotion styling (deprecated) |
| `@emotion/styled`         | —       | _Optional:_ MUI emotion styling (deprecated) |
| `@tanstack/react-query`   | 5.90.x  | Data fetching & caching                      |
| `axios`                   | latest  | HTTP client                                  |
| `react-hook-form` + `zod` | latest  | Form handling & validation                   |
| `tailwindcss`             | 4.1.x   | Utility classes (Rust engine, CSS-first)     |
| `lucide-react`            | latest  | Icons                                        |

### Backend

| Package               | Purpose            |
| --------------------- | ------------------ |
| `django`              | Web framework      |
| `djangorestframework` | REST API           |
| `django-cors-headers` | CORS handling      |
| `django-jazzmin`      | Admin theme        |
| `django-ckeditor-5`   | Rich text editor   |
| `psycopg2-binary`     | PostgreSQL adapter |
| `Pillow`              | Image handling     |
| `gunicorn`            | Production server  |

---

## Development Setup

```bash
# Frontend
cd frontend
npm install
npm run dev  # http://localhost:5173

# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver  # http://localhost:8000
```

---

## Deployment

| Component   | Platform           | URL                         |
| ----------- | ------------------ | --------------------------- |
| Frontend    | Vercel             | `unitychurch.org`           |
| Backend/API | Railway or Render  | `api.unitychurch.org`       |
| Admin       | Same as Backend    | `api.unitychurch.org/admin` |
| Database    | Managed PostgreSQL | (via Railway/Render)        |

### Environment Variables

**Frontend:**

- `VITE_API_URL` - Backend API URL

**Backend:**

- `SECRET_KEY` - Django secret key
- `DATABASE_URL` - PostgreSQL connection string
- `ALLOWED_HOSTS` - Comma-separated domains
- `CORS_ALLOWED_ORIGINS` - Frontend domains

---

## Implementation Phases

| Phase | Focus                      | Duration |
| ----- | -------------------------- | -------- |
| 1     | Project setup, boilerplate | 1 week   |
| 2     | Django models & admin      | 1 week   |
| 3     | REST API endpoints         | 1 week   |
| 4     | React pages & components   | 2 weeks  |
| 5     | Frontend-API integration   | 1 week   |
| 6     | Giving/payment integration | 1 week   |
| 7     | Testing & QA               | 1 week   |
| 8     | Deployment & training      | 1 week   |

**Estimated Total: 9 weeks**

---

## Related Documentation

| Document                                              | Description                               |
| ----------------------------------------------------- | ----------------------------------------- |
| [Technical Architecture](./TECHNICAL_ARCHITECTURE.md) | Patterns, SOLID principles, code examples |
| [Frontend (App)](./app/README.md)                     | React, MUI, component structure           |
| [Backend (API)](./api/README.md)                      | Django, REST API, models                  |

---

> **Document Maintained By:** Jordan Daniel

> **Last Updated:** December 22, 2025
