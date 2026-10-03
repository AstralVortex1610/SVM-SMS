# SVM SMS Frontend

Production React frontend for the SVM School Management System.

## Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS 4
- Lucide React icons

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Frontend Contract Notes

The backend is intentionally not implemented in this repository yet. UI flows are structured around future authenticated API contracts for role-scoped dashboards, classes, attendance, assignments, fees, notices, user management, audit events, and tenant controls. Mock data is local, typed, and isolated so it can be replaced with real API clients without reshaping the product surface.
