# Unity Community Church - Frontend Documentation

> **Version:** 1.0.0  
> **Created:** December 22, 2024  
> **Maintained By:** Jordan Daniel

---

## Overview

React-based frontend application for Unity Community Church, providing a mobile-first, accessible web experience for congregation members and visitors.

---

## Tech Stack

| Technology   | Version | Purpose                     |
| ------------ | ------- | --------------------------- |
| React        | 18.x    | UI framework                |
| TypeScript   | 5.x     | Type safety                 |
| Vite         | 5.x     | Build tool, dev server      |
| Material UI  | 5.x     | Component library           |
| TailwindCSS  | 3.x     | Utility classes for layouts |
| React Query  | 5.x     | Data fetching & caching     |
| React Router | 6.x     | Client-side routing         |

---

## Pages

| Route               | Page            | Description                         |
| ------------------- | --------------- | ----------------------------------- |
| `/`                 | Home            | Hero, quick links, featured content |
| `/about`            | About Us        | Mission, history, leadership        |
| `/ministries`       | Ministries      | Ministry listings                   |
| `/ministries/:slug` | Ministry Detail | Individual ministry info            |
| `/media`            | Media           | Sermons, videos, podcasts           |
| `/media/:slug`      | Sermon Detail   | Individual sermon                   |
| `/giving`           | Giving          | Donation portal                     |
| `/events`           | Events          | Calendar, event listings            |
| `/events/:slug`     | Event Detail    | Individual event                    |
| `/join`             | Join SBC        | Membership information              |
| `/resources`        | Resources       | Documents, links                    |
| `/covid-guidelines` | COVID-19        | Health protocols                    |
| `/contact`          | Contact         | Contact form, location              |

---

## Project Structure

```
frontend/
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── assets/                   # Static assets
│   │   ├── images/
│   │   └── fonts/
│   │
│   ├── theme/                    # MUI Theme
│   │   └── theme.ts
│   │
│   ├── components/
│   │   ├── layout/               # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   └── features/             # Feature components
│   │       ├── events/
│   │       ├── media/
│   │       ├── ministries/
│   │       └── giving/
│   │
│   ├── contexts/                 # React Context
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   │
│   ├── hooks/                    # Custom hooks
│   │   ├── useEvents.ts
│   │   ├── useMedia.ts
│   │   └── useForm.ts
│   │
│   ├── pages/                    # Page components
│   │   ├── Home.tsx
│   │   ├── AboutUs.tsx
│   │   ├── Ministries.tsx
│   │   ├── Media.tsx
│   │   ├── Giving.tsx
│   │   ├── Events.tsx
│   │   ├── JoinSBC.tsx
│   │   ├── Resources.tsx
│   │   ├── CovidGuidelines.tsx
│   │   └── Contact.tsx
│   │
│   ├── services/                 # API services
│   │   ├── api.ts
│   │   ├── eventService.ts
│   │   ├── mediaService.ts
│   │   └── contactService.ts
│   │
│   ├── types/                    # TypeScript types
│   │   ├── event.ts
│   │   ├── media.ts
│   │   └── ministry.ts
│   │
│   ├── utils/                    # Utilities
│   │   ├── validation.ts
│   │   ├── formatters.ts
│   │   └── constants.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

---

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "@mui/material": "^5.15.0",
    "@mui/icons-material": "^5.15.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "@tanstack/react-query": "^5.0.0",
    "axios": "^1.6.0",
    "date-fns": "^2.30.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "postcss": "^8.4.32",
    "prettier": "^3.1.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

---

## Theme Configuration

```typescript
// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

export const churchTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    button: { textTransform: 'none' },
  },
  shape: { borderRadius: 8 },
});
```

---

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev  # http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Environment Variables

```env
VITE_API_URL=http://localhost:8000
VITE_GIVING_API_KEY=your_tithe_ly_key
```

---

## Deployment

Deployed on **Vercel** with automatic deployments from `main` branch.

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

---

## Related Documentation

- [MVP Overview](../MVP_DOCUMENTATION.md)
- [Technical Architecture](../TECHNICAL_ARCHITECTURE.md)
- [API Documentation](../api/README.md)
