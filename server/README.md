# Portfolio Backend API

Express.js + MongoDB backend for the portfolio website.

## Environment Variables

Set these in Railway Variables tab:

```
PORT=8000
MONGO_URI=<your mongodb atlas connection string>
JWT_SECRET=<your jwt secret>
JWT_EXPIRE=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=<your email>
SMTP_PASSWORD=<your app password>
NODE_ENV=production
```

## Endpoints

- `GET /api/health` — health check
- `POST /api/auth/login` — admin login
- `GET /api/projects` — list projects
- `GET /api/skills` — list skills
- `GET /api/messages` — list messages
- `GET /api/content` — portfolio content
- `GET /api/certificates` — certificates
- `GET /api/resume` — resume info
