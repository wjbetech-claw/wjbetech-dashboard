# Getting Started

This guide helps you set up and run the WJBeTech Dashboard locally and build it for production.

Prerequisites
- Node 18 or later (recommended)
- npm (comes with Node)
- Git

Clone the repository

```bash
git clone https://github.com/wjbetech-claw/wjbetech-dashboard.git
cd wjbetech-dashboard
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

The app will be available at http://localhost:5173 by default. If you need a different port, set `PORT` or pass `--port` to Vite.

Build for production

```bash
npm run build
```

Preview the production build locally

```bash
npm run preview
```

Environment variables

If the app needs runtime environment variables (API keys, backend URLs), create a `.env` file in the project root with the variables you need. Example:

```env
VITE_API_URL=https://api.example.com
```

Notes and best practices

- Use Node 18+ to avoid runtime/ESM compatibility issues with Vite and modern plugins.
- If you get errors with `@vitejs/plugin-react`, see docs/troubleshooting.md for the dynamic-import workaround.
- Use feature branches prefixed with `feat/` and follow Conventional Commits when committing.

Next steps
- Read the Developer guide: docs/developer.md
- Read the Architecture overview: docs/architecture.md

