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

| Layer          | Technology                      | Justification                                       | Phase       |
| -------------- | ------------------------------- | --------------------------------------------------- | ----------- |
| **Frontend**   | React 19.2.x + TypeScript 5.9.x | React Compiler, `<Activity>` component, type safety | **Phase 1** |
| **Build Tool** | Vite 7.3.x                      | New Environment API, faster builds                  | **Phase 1** |
| **UI Library** | Material UI (MUI) 7.3.x         | Zero-runtime CSS engine, massive perf boost         | **Phase 1** |
| **Styling**    | TailwindCSS 4.1.x               | Rust-based engine, CSS-first config                 | **Phase 1** |
| **Backend**    | Django 4.2 + Python 3.11        | Full-featured framework with built-in admin         | _Phase 2_   |
| **API**        | Django REST Framework           | Industry-standard REST API toolkit                  | _Phase 2_   |
| **Database**   | PostgreSQL 15+                  | Robust, scalable, production-ready                  | _Phase 2_   |
| **Deployment** | Vercel (Frontend)               | Optimized for static/SPA delivery                   | **Phase 1** |

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

## Future Phases (Phase 2: Dynamic Content)

### Admin Panel & Backend

The Django Admin Panel and REST API will be integrated in Phase 2 to provide dynamic content management.

- **User Management**: Roles and permissions
- **Content Editing**: WYSIWYG rich text editor
- **Media Management**: Upload sermons, images, documents
- **Event Management**: Create, edit, manage registrations
- **Form Submissions**: View contact form messages

#### Planned User Roles

- **Super Admin**: Full access
- **Content Editor**: Content management
- **Viewer**: Read-only access

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

| Stage | Phase | Focus                     | Duration |
| ----- | ----- | ------------------------- | -------- |
| **1** | 1     | Project setup, Branding   | 1 week   |
| **1** | 2     | Static Pages & Components | 1 week   |
| **1** | 3     | Mobile Responsiveness     | 1 week   |
| **1** | 4     | Testing & Vercel Launch   | 1 week   |
| **2** | 5     | Backend Setup (Django)    | 1 week   |
| **2** | 6     | API Integration           | 2 weeks  |
| **2** | 7     | Admin Training            | 1 week   |

**Phase 1 Target (Informational): 4 weeks**
**Total Target (Full MVP): 8 weeks**

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
