# Workyapa — Project Context for AI Agents

Read this before exploring/analyzing the project. It captures the stack, structure, auth flow, and conventions so you don't have to re-derive them every session.

## CAVEMAN — less output token

Drop filler, articles, pleasantries, hedging.
Keep code blocks and technical terms exact.
Short sentences. Fragments OK.
No "I'd be happy to help." No "The reason this is happening is because."

## PONYTAIL — less code written

Before writing any code, check in order:

1. Does this need to exist? → no: skip it (YAGNI)
2. Stdlib does it? → use it
3. Native platform feature? → use it
4. Already installed dependency? → use it
5. One line? → one line
6. Only then: minimum that works

No new dependencies unless unavoidable.
No unrequested abstractions or boilerplate.
Deletion over addition.

## Frontend conventions

- Keep `page.tsx` a server component. Move interactive UI to client components.
- Put reusable/page UI in `src/components`, not inside route files.
- Use Tailwind CSS. Avoid route-level CSS modules unless Tailwind cannot express it.
- Dashboard sidebar must stay viewport-height; logout remains visible without page scroll.
- Sidebar links: no underline. Use real routes and clear active/hover states. like this

## Project overview

Workyapa (branding "Workyapa", package `nextjs-boilerplate-website`) — marketplace connecting families with trusted local service professionals. Two apps in one repo:

- `izu-website/` — Next.js 14 (App Router) frontend
- `backend_izu/` — Express + MongoDB API

## Tech stack

Frontend (`izu-website/`):
- Next.js 14.2, React 18, TypeScript, Tailwind CSS
- @tanstack/react-query v5 — all server state/mutations
- axios — HTTP client (`src/lib/axios.ts`)
- zustand + persist — client auth store (`src/store/auth-store.ts`)
- sonner — toasts
- next-auth — installed but auth now uses backend JWT directly (see Auth flow)
- shadcn/ui components in `src/components/ui/`, lucide-react icons, motion, recharts

Backend (`backend_izu/`):
- Express 5, Mongoose 8, JWT (access + refresh), bcryptjs, nodemailer (Gmail), multer/cloudinary, stripe, socket.io, node-cron

## Environment / ports

- Backend `.env`: `PORT=5008`
- Frontend API base: `NEXT_PUBLIC_API_URL` fallback `http://localhost:5008/api/v1`
- CORS allows `http://localhost:3000`
- Frontend `.env.example` lists `NEXT_PUBLIC_API_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`

## Directory structure

Frontend `izu-website/src/`:
- `app/` — routes. Auth pages under `app/(auth)/`: `login`, `sign-up`, `forgot-password`, `verify-otp`, `reset-password`. Others: `my-profile`, `change-password`, `message`, `categories`, `services/[service]`, `about-us`, `contact-us`, `terms-and-conditions`, `privacy-policy`, `api/auth/[...nextauth]`
- `components/auth/` — shared auth UI: `auth-shell`, `auth-card`, `auth-form-controls` (`AuthField`, `AuthSubmitButton`), `login-form`, `sign-up-form`, `otp-form`, `password-recovery-forms`
- `components/landing/`, `components/dashboard/`, `components/ui/`, `components/providers/` (`AppProvider` = QueryClient, `AuthProvider` = SessionProvider)
- `lib/` — `axios.ts`, `api-error.ts` (`getApiErrorMessage`), `utils.ts` (`cn`)
- `services/auth-api.ts` — typed auth endpoints
- `store/auth-store.ts` — persisted auth store
- `middleware.ts` — next-auth guard on `/dashboard/:path*` (no `/dashboard` route exists yet)

Backend `backend_izu/src/`:
- `routes/` + `controllers/` — auth, profile, service, category, booking, payment, message, notification, provider, admin, stripe-webhook
- `models/` — `User` (accountType: user/provider/admin/super_admin; otp, refreshToken select:false), `Provider`, plus others
- `middlewares/` — `auth.middlewares.js` (`isAuthenticated`, `restrictTo`), `globalError.middlewares.js`
- `config/route.config.js` — mounts routers under `/api/v1`
- `utility/helper.js` — `sendResponse`, `generateVerificationCode`, `sendPasswordResetCode`

## Auth flow (implemented)

Frontend calls backend directly via `services/auth-api.ts` + react-query mutations + sonner toasts. Tokens stored in zustand store persisted under key `izu-auth`; axios request interceptor auto-attaches `Authorization: Bearer <accessToken>`.

Form validation: custom, not native HTML. Auth forms use **controlled inputs + zod `safeParse`** via `getFieldErrors` in `src/lib/zod-form.ts`; `noValidate` on forms, inline per-field errors via `AuthField error` prop. Do NOT use react-hook-form or `@hookform/resolvers` here — RHF 7.72 passed empty/undefined values to the schema in this stack (unknown env cause); controlled state is deterministic. Schemas live in `src/lib/schemas/auth.ts` (login, signup, forgot-password, reset-password). OTP form uses manual digit validation with inline error state. Password policy mirrors the change-password rules: 8+ chars, upper, lower, digit, special, no spaces. Email accepts any valid format incl. temp-mail domains.

Endpoints (`/api/v1/auth/*`):
- `POST /signup` — body `{ name, email, phone, password, accountType: "user"|"provider" }` → 201, redirect to `/login`. No email-verify OTP is sent on signup.
- `POST /login` — `{ email, password }` → `{ accessToken, refreshToken, userId, email, role }`
- `POST /forgot-password` — `{ email }` → sends OTP email, redirect to `/verify-otp?email=...`
- `POST /verify-otp` — `{ email, otp }` → redirect to `/reset-password?email=...&otp=...`
- `POST /reset-password` — `{ email, otp, newPassword, confirmPassword }` → redirect to `/login`
- `POST /refresh-token`, `POST /logout`, `POST /change-password`

Error shape: `{ success: false, message, errorSources }`. Use `getApiErrorMessage` to extract the message.

## Categories & services (API-driven) — NO backend changes

Categories and services pages consume the existing backend API as-is. Do NOT modify the backend for this. All catalog endpoints require auth (Bearer token auto-attached via axios interceptor from `izu-auth` store):

- `GET /api/v1/categories` → `data: Category[]` (`{ _id, name, catImage, isActive }`)
- `GET /api/v1/services/categoryWise/:categoryId` → `data: Service[]` (`serviceDetails` flattened to one object; `providerId` populated)
- `GET /api/v1/services/:serviceId` → `data: Service` (single, flattened)
- `GET /api/v1/services` → `data: { "Most Popular": [...], [categoryName]: [...] }` (grouped; not currently used)

Frontend:
- API + types in `src/services/catalog-api.ts` (Category, Service, Provider, getServicePrice)
- Routes: `/categories` → `/services/[categoryId]` → `/services/[categoryId]/details/[serviceId]` (category ID, not slug)
- Client components fetch with react-query and render three states everywhere: Skeleton (loading), `CatalogError` (incl. 401 → sign-in CTA) from `src/components/landing/catalog-states.tsx`, and `CatalogEmpty` (no data)
- Homepage `services-section`, `categories-content` grid, `service-listing`, `service-details` are all API-driven
- `next.config.mjs` allows `res.cloudinary.com` images

## Backend gotchas

- `auth.controller.js` `changePassword` uses undefined `httpStatus` and `user.comparePassword` with password selected off — broken. Frontend change-password page calls `/profile/change-password` (PATCH) with a hardcoded static token.
- `signup` returns user but does not set `isVerified` or send an OTP.

## Validation

- Typecheck: `npx tsc --noEmit`
- Lint: `npx next lint`
- Backend dev: `npm run dev` (nodemon), super-admin seed: `npm run seed:super-admin`
