# Unity Community Church - Backend API Documentation

> **Version:** 1.0.0  
> **Created:** December 22, 2024  
> **Maintained By:** Jordan Daniel

---

## Overview

Django-based REST API and admin panel for Unity Community Church, providing content management and data services for the frontend application.

---

## Tech Stack

| Technology            | Version | Purpose          |
| --------------------- | ------- | ---------------- |
| Python                | 3.11+   | Runtime          |
| Django                | 4.2+    | Web framework    |
| Django REST Framework | 3.14+   | REST API         |
| PostgreSQL            | 15+     | Database         |
| django-jazzmin        | 2.6+    | Admin theme      |
| django-ckeditor-5     | 0.2+    | Rich text editor |

---

## Project Structure

```
backend/
├── config/                       # Django project settings
│   ├── __init__.py
│   ├── settings/
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── development.py
│   │   └── production.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
│
├── apps/                         # Django applications
│   ├── core/                     # Shared utilities
│   │   ├── models.py             # Abstract base models
│   │   └── permissions.py
│   │
│   ├── content/                  # Page content
│   │   ├── admin.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   │
│   ├── events/                   # Events & registrations
│   ├── media_library/            # Sermons & media
│   ├── ministries/               # Ministry listings
│   ├── staff/                    # Staff profiles
│   ├── giving/                   # Donations
│   └── contact/                  # Contact forms
│
├── static/
├── media/
├── templates/
├── manage.py
└── requirements.txt
```

---

## API Endpoints

### Events

| Method | Endpoint                       | Description           |
| ------ | ------------------------------ | --------------------- |
| GET    | `/api/events/`                 | List published events |
| GET    | `/api/events/{slug}/`          | Event detail          |
| GET    | `/api/events/upcoming/`        | Upcoming events       |
| POST   | `/api/events/{slug}/register/` | Register for event    |

### Media

| Method | Endpoint                     | Description        |
| ------ | ---------------------------- | ------------------ |
| GET    | `/api/media/sermons/`        | List sermons       |
| GET    | `/api/media/sermons/{slug}/` | Sermon detail      |
| GET    | `/api/media/series/`         | List sermon series |

### Ministries

| Method | Endpoint                  | Description     |
| ------ | ------------------------- | --------------- |
| GET    | `/api/ministries/`        | List ministries |
| GET    | `/api/ministries/{slug}/` | Ministry detail |

### Staff

| Method | Endpoint      | Description        |
| ------ | ------------- | ------------------ |
| GET    | `/api/staff/` | List staff members |

### Content

| Method | Endpoint                     | Description  |
| ------ | ---------------------------- | ------------ |
| GET    | `/api/content/pages/{slug}/` | Page content |

### Contact

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| POST   | `/api/contact/` | Submit contact form |

---

## Models

### Base Models

```python
# apps/core/models.py

class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class PublishableModel(TimeStampedModel):
    is_published = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        abstract = True
```

### Domain Models

```python
# apps/events/models.py
class Event(PublishableModel):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    date = models.DateField()
    start_time = models.TimeField()
    location = models.CharField(max_length=200)
    requires_registration = models.BooleanField(default=False)
    max_attendees = models.PositiveIntegerField(null=True)

# apps/ministries/models.py
class Ministry(PublishableModel):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    leader = models.ForeignKey('staff.StaffMember', null=True)
    order = models.PositiveIntegerField(default=0)

# apps/media_library/models.py
class Sermon(PublishableModel):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    speaker = models.ForeignKey('staff.StaffMember', null=True)
    date = models.DateField()
    video_url = models.URLField(blank=True)
    scripture_reference = models.CharField(max_length=200)
```

---

## Admin Panel

Accessible at `/admin/` with Django Admin + Jazzmin theme.

### User Roles

| Role           | Permissions               |
| -------------- | ------------------------- |
| Super Admin    | Full access               |
| Content Editor | Edit pages, events, media |
| Event Manager  | Events only               |
| Viewer         | Read-only                 |

---

## Dependencies

```txt
# requirements.txt
Django>=4.2,<5.0
djangorestframework>=3.14.0
django-cors-headers>=4.3.0
django-jazzmin>=2.6.0
django-ckeditor-5>=0.2.0
psycopg2-binary>=2.9.9
Pillow>=10.1.0
gunicorn>=21.2.0
python-dotenv>=1.0.0
whitenoise>=6.6.0
dj-database-url>=2.1.0
```

---

## Development

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Start dev server
python manage.py runserver  # http://localhost:8000
```

---

## Environment Variables

```env
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=postgres://user:pass@localhost:5432/ucc
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

---

## Deployment

Deployed on **Railway** or **Render** with PostgreSQL.

```bash
# Production start command
gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
```

---

## Related Documentation

- [MVP Overview](../MVP_DOCUMENTATION.md)
- [Technical Architecture](../TECHNICAL_ARCHITECTURE.md)
- [Frontend Documentation](../app/README.md)
