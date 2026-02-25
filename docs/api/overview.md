# API Overview

This doc defines the draft API contract for the dashboard so frontend work can proceed independently of backend implementation. All endpoints return JSON and should be versioned under `/api`.

## Conventions
- **Auth:** Bearer token (optional for local dev). If absent, return mock data.
- **Errors:** `{ "error": "message", "code": "SOME_CODE" }`
- **Dates:** ISO 8601 strings.

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
  ]
}
```

## Kanban
### GET /api/kanban
Returns the board state.
```json
{
  "columns": [
    { "id": "todo", "title": "Backlog", "cards": [{ "id": "c1", "title": "Design polish", "description": "Refine spacing" }] }
  ]
}
```

### POST /api/kanban/cards
Create a card.
```json
{ "columnId": "todo", "title": "New task", "description": "Optional" }
```

### PATCH /api/kanban/cards/:id
Move/update a card.
```json
{ "columnId": "doing", "title": "Updated title" }
```

### DELETE /api/kanban/cards/:id
Remove a card.

## Jobs
### GET /api/jobs
List jobs.
```json
{ "jobs": [{ "id": "j1", "title": "Platform Engineer", "company": "Nimbus", "status": "saved" }] }
```

### POST /api/jobs/:id/save
### POST /api/jobs/:id/apply

## Repos
### GET /api/repos
```json
{ "repos": [{ "id": "r1", "name": "wjbetech-dashboard", "status": "green" }] }
```

### GET /api/repos/:id/pulls
### GET /api/repos/:id/workflows

## Settings
### GET /api/settings
### PATCH /api/settings
```
