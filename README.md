# Course-Planner

The objective of this project is to design and develop a web-based University Course Planner that helps students efficiently plan their academic schedules based on degree requirements, course availability, and personal constraints.

## Phase 1 baseline (COMPLETED ✅)
- Backend running with APIs (Next.js App Router)
- Database connected with cloud data (**Neon.tech PostgreSQL**)
- Student registration and login fully functional and integrated with DB
- Basic project structure organized and typed

## Current Project State
- **Shared Database**: All team members are now connected to a shared Neon.tech instance.
- **Auth Flow**: `AuthContext` is fully integrated with `/api/login` and `/api/register`.
- **Infrastructure**: Prisma client is generated to a custom path `@/lib/generated/prisma`.

## Team Next Steps: Phase 2 (Course & Schedule Management)

### 1. Nasir (Database & Data Seeding) ✅ COMPLETED
- **Task**: Update `schema.prisma` to include the `Course` model (referencing `lib/types.ts`). ✅
- **Task**: Create a `prisma/seed.ts` file to populate the Neon database with the courses currently in `lib/dummyData.ts`. ✅
- **Goal**: Make sure everyone is pulling course data from the DB instead of a local JS file. ✅
- **Added**: `Course`, `CourseSession`, and `Enrollment` models with proper relations.
- **Added**: 6 courses seeded into the Neon database from `dummyData.ts`.

### 2. Suleman (Frontend & Enrollment UI)
- **Task**: Update the Dashboard to fetch "Available Courses" from a new API (to be created by Nasir/Huzaifa).
- **Task**: Implement "Enroll" and "Remove" buttons that call backend APIs instead of local state.

### 3. Zaid (Scheduling Logic & Conflict Detection)
- **Task**: Move the `checkClash` logic from `CourseContext.tsx` to a server-side utility or a dedicated scheduling service.
- **Task**: Ensure the database enforces that a student cannot enroll in two clashing courses.

### 4. Huzaifa (API Hardening & Enrollment Backend)
- **Task**: Create `POST /api/courses/enroll` and `DELETE /api/courses/enroll` endpoints.
- **Task**: Secure these routes so only the logged-in user can modify their own schedule.

## Shared references
- `<auth-module-root>` currently maps to `./Huzaifa` from repository root.
- **Note**: Always run `npx prisma generate` after pulling changes to ensure the local client matches the cloud schema.

---

## 🚀 Setup and Run Guide

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Course-Planner
```

### 2. Install Dependencies
Navigate to the module root and install all required packages:
```bash
cd Huzaifa
npm install
```

### 3. Environment Setup (.env)
Create a file named `.env` in the `Huzaifa/` directory. Copy and paste the shared Neon connection string:

```env
# Huzaifa/.env
DATABASE_URL="postgresql://neondb_owner:npg_NbKs1QuY7AqI@ep-delicate-snow-ao9x3f6p.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
```
*(This connects you to our shared Cloud Database so everyone sees the same data.)*

### 4. Initialize Prisma
Run these commands to ensure your local Prisma client is synchronized with the database schema:
```bash
npx prisma generate
```
*Note: We are using a shared database, so do NOT run `prisma migrate dev` unless you are adding new tables. If someone else added a table, run:*
```bash
npx prisma migrate deploy
```

### 5. Run the Development Server
Start the app:
```bash
npm run dev
```
Open **http://localhost:3000** in your browser.

### 6. Working with GitHub
- **Before starting work**: Always `git pull` to get the latest changes from the team.
- **After finishing a task**:
  ```bash
  git add .
  git commit -m "Brief description of what you did"
  git push
  ```

### 7. Database Management
- To view the data in the Cloud DB via a web interface, run:
  ```bash
  npx prisma studio
  ```
