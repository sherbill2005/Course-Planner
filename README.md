# Course-Planner

The objective of this project is to design and develop a web-based University Course Planner that helps students efficiently plan their academic schedules based on degree requirements, course availability, and personal constraints.

## Phase 1 baseline (non-negotiable)
- Backend running with APIs
- Database connected with course data
- Frontend showing course list
- Basic scheduling logic (even if rough)

## New commit context (Huzaifa: `c54b6d4`)
Huzaifa added a Next.js app module with:
- Student registration API (`/api/register`)
- Student login API (`/api/login`)
- PostgreSQL + Prisma `User` model and migration
- Login/register UI pages

## Important weak points found in the new commit
1. **Auth flow mismatch**: API-based auth exists, but `AuthContext` still uses localStorage user/password logic instead of backend APIs.
2. **No real session/token layer**: login response returns user object only; no JWT/session/cookie auth yet.
3. **Input normalization gap**: `register` does not trim/normalize `studentId` and `fullName`, which may cause duplicate/dirty records.
4. **Security hardening pending**: no rate limiting, no lockout strategy, and no password policy/validation enforcement.
5. **Config fragility**: Prisma depends on `DATABASE_URL`; missing env will break DB access.

## Required shared configuration
- Create `./Huzaifa/.env` with a valid `DATABASE_URL` (PostgreSQL) for the current app module.
- Run Prisma migration in `./Huzaifa/` before testing auth APIs in this module.
- Keep API contract stable for frontend/backend alignment:
  - `POST /api/register` body: `{ fullName, studentId, password }`
  - `POST /api/login` body: `{ studentId, password }`

## Team next steps (from this commit)
- **Huzaifa (Auth/Backend integration)**: align `AuthContext` with API auth and add session/token handling.
- **Nasir (Backend/Data)**: extend data models and APIs to support courses + schedules tied to authenticated users.
- **Suleman (Frontend)**: connect frontend flows to auth-protected APIs and handle auth states/errors.
- **Zaid (Scheduling logic)**: integrate conflict-detection logic with real user course selections from DB.
