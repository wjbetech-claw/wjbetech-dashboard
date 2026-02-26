# API Overview

This document defines the backend API contract so frontend work can proceed independently of backend implementation. All endpoints are versioned under `/api` and return JSON.

## Conventions
- **Auth:** `Authorization: Bearer <token>` (optional for local dev).
- **Errors:** `{ "error": "message", "code": "SOME_CODE" }`
- **Dates:** ISO 8601 strings.
- **Pagination:** `?page=1&limit=20`, responses include `{ page, limit, total }`.

## Health
### GET /api/health
```json
{ "status": "ok" }
```

## Overview
### GET /api/overview
Summary data for the home dashboard.

Response
```json
{
  "systemHealth": { "status": "green", "message": "All systems operational" },
  "deployments": { "completed24h": 18, "inProgress": 2 },
  "activeFocus": { "title": "Polish dashboard UI", "eta": "Today" },
  "stats": [
    { "label": "Active pipelines", "value": "12", "delta": "+2" },
    { "label": "Avg. deploy time", "value": "4m 18s", "delta": "-12%" }
  ],
  "recentActivity": [
    { "id": "a1", "title": "Deploy completed", "meta": "payments-api • 2m ago", "status": "success" }
  ]
}
```

## Kanban
### GET /api/kanban
```json
{ "columns": [
  { "id": "todo", "title": "Backlog", "cards": [{ "id": "c1", "title": "Design polish", "description": "Refine spacing" }] }
] }
```

### POST /api/kanban/cards
```json
{ "columnId": "todo", "title": "New task", "description": "Optional" }
```

### PATCH /api/kanban/cards/:id
```json
{ "columnId": "doing", "title": "Updated title", "description": "Updated" }
```

### DELETE /api/kanban/cards/:id

## Jobs
### GET /api/jobs
```json
{ "page": 1, "limit": 20, "total": 120, "jobs": [
  { "id": "j1", "title": "Platform Engineer", "company": "Nimbus", "location": "NYC", "status": "saved" }
] }
```

### POST /api/jobs/:id/save
### POST /api/jobs/:id/apply
### POST /api/jobs/:id/archive

## Repos
### GET /api/repos
```json
{ "repos": [
  { "id": "r1", "name": "wjbetech-dashboard", "status": "green", "openPRs": 4, "workflows": 12 }
] }
```

### GET /api/repos/:id/pulls
### GET /api/repos/:id/workflows
### GET /api/repos/:id/commits

## Settings
### GET /api/settings
```json
{ "theme": "dark", "notifications": { "email": true, "slack": false } }
```

### PATCH /api/settings
```json
{ "theme": "light", "notifications": { "email": false } }
```

## Auth
### POST /api/auth/github
Starts GitHub OAuth flow.

### GET /api/auth/callback
OAuth callback.

## Webhooks
### POST /api/webhooks/github
Receives GitHub App events and enqueues sync.
