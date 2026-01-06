# Courses App - React Routing

A small React app for the "Mastering React Routing" task. It demonstrates public and private routes, course browsing, and a course creation flow using React Router.

## Features
- Login and registration forms with client-side validation
- Private routes gated by a token in localStorage
- Courses list with search by title or id
- Course details page with formatted duration and date
- Create course flow with author management and validation
- Mocked initial data and in-memory state

## Routes
- `/login` - login form
- `/registration` - registration form
- `/courses` - courses list (private)
- `/courses/add` - create course (private)
- `/courses/:courseId` - course info (private)
- `/` and `*` redirect based on auth state

## Getting started
```bash
npm install
npm start
```

The app runs at http://localhost:5173 by default.

## Backend API
Login and registration expect a backend on http://localhost:4000:
- `POST /login` -> `{ result: <token>, user: { name } }`
- `POST /register` -> `{ result: <token>, user: { name } }`

If no backend is running, login and registration will show an error.

## Scripts
- `npm start` - run Vite dev server
- `npm run build` - dummy build script (required by course tooling)

## Tests
There are no test files in this project yet. The test scripts in `package.json` are present, but no tests are implemented.

## Tech stack
- React 18 + TypeScript
- React Router DOM v7
- Vite
- Jest and Testing Library

## Data and state
- Initial courses and authors are in `src/constants.ts`
- Created courses and authors live in component state only (no persistence)
- Auth uses localStorage keys: `token`, `userName`
