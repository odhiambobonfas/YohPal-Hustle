# YohPal Hustle — API Reference

> This document tracks all API endpoints, server actions, external services, and integrations used across the app.
> **Last Updated**: March 2, 2026 | **Version**: 1.1.0

---

## 📌 Table of Contents

1. [Primary Backend API](#1-primary-backend-api)
2. [Authentication & User Management](#2-authentication--user-management-apis-9-endpoints)
3. [Job Management](#3-job-management-apis-7-endpoints)
4. [Hustler Management](#4-hustler-management-apis-11-endpoints)
5. [Client Management](#5-client-management-apis-3-endpoints)
6. [Communication](#6-communication-apis-2-endpoints)
7. [Roles & Permissions](#7-roles--permissions-apis-3-endpoints)
8. [Support](#8-support-apis-2-endpoints)
9. [External Third-Party APIs](#9-external-third-party-apis)
10. [CDN Resources](#10-cdn-resources-external-libraries)
11. [Optional Vendor APIs](#11-optional-vendor-apis-not-currently-configured)
12. [API Authentication Methods](#12-api-authentication-methods)
13. [Firebase Services](#13-firebase-services)
14. [Next.js Server Actions](#14-server-actions--actionsactions)
15. [App Routes → API Mapping](#15-app-routes--api-mapping)
16. [TypeScript Types](#16-typescript-types--typesactions)
17. [Total API Count](#17-total-api-count)
18. [Critical Configuration Checklist](#18-critical-configuration-checklist)

---

## 1. Primary Backend API

### Base URL
```
https://yohpal-hustler-apis-test.onrender.com
```

### Authentication
- **Method**: Bearer Token (JWT)
- **Header**: `Authorization: Bearer {token}`
- **Token Source**: Returned on sign-in, stored in session

---

## 2. Authentication & User Management APIs (9 Endpoints)

| # | Endpoint | Method | Description | Auth Required |
|---|----------|--------|-------------|---------------|
| 1 | `/signin` | POST | Authenticate user and return JWT token | No |
| 2 | `/signup` | POST | Register new user account | No |
| 3 | `/password_reset` | POST | Initiate forgot password flow | No |
| 4 | `/profile/{uid}` | GET | Retrieve single user profile by UID | ✅ Bearer |
| 5 | `/api/users` | GET | List all users | ✅ Bearer |
| 6 | `/api/users` | POST | Create a new user | ✅ Bearer |
| 7 | `/api/users/{id}` | GET | Get specific user details | ✅ Bearer |
| 8 | `/api/users/{id}` | PUT | Update existing user information | ✅ Bearer |
| 9 | `/api/users/{id}` | DELETE | Delete a user from the system | ✅ Bearer |

### Request Examples

**Sign In** `POST /signin`
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

## 3. Job Management APIs (7 Endpoints)

| # | Endpoint | Method | Description | Auth Required |
|---|----------|--------|-------------|---------------|
| 1 | `/jobs/create` | POST | Create new job posting | ✅ Bearer |
| 2 | `/jobs/get_details/{jobId}` | GET | Retrieve specific job details | ✅ Bearer |
| 3 | `/jobs/get_active_hustlers/{primarySkill}?start={startTime}` | GET | Get available hustlers by skill & time slot | ✅ Bearer |
| 4 | `/hustler/accept_request` | PUT | Hustler accepts a job request | ✅ Bearer |
| 5 | `/hustler/reject_request` | PUT | Hustler rejects a job request | ✅ Bearer |
| 6 | `/client/job_history/{ownerId}` | GET | Get all jobs posted by a client | ✅ Bearer |
| 7 | `/services` | POST | Retrieve all available service categories | ✅ Bearer |

### Request Examples

**Create Job** `POST /jobs/create`
```json
{
  "ownerId": "user_id",
  "ownerName": "John Doe",
  "jobDetails": {
    "name": "Plumbing Work",
    "startTime": "2025-01-20T09:00:00",
    "endTime": "2025-01-20T17:00:00",
    "hustlersCount": 2,
    "description": "Fix kitchen sink",
    "jobSite": {},
    "hustlers": []
  }
}
```

**Accept Job** `PUT /hustler/accept_request`
```json
{
  "jobId": "job_id",
  "hustlerId": "hustler_id"
}
```

---

## 4. Hustler Management APIs (11 Endpoints)

| # | Endpoint | Method | Description | Auth Required |
|---|----------|--------|-------------|---------------|
| 1 | `/hustler/job_requests/{hustlerId}` | GET | Get all job requests for a hustler | ✅ Bearer |
| 2 | `/hustler/job_history/{hustlerId}` | GET | Get completed job history for hustler | ✅ Bearer |
| 3 | `/hustler/profile/{hustlerId}` | GET | Retrieve hustler profile details | ✅ Bearer |
| 4 | `/hustler/profile/edit` | PUT | Update hustler profile information | ✅ Bearer |
| 5 | `/hustler/profile/edit/primary_skill` | PUT | Update hustler's primary skill | ✅ Bearer |
| 6 | `/hustler/profile/edit/skills` | PUT | Update hustler's skill set | ✅ Bearer |
| 7 | `/hustler/live_location/{hustlerId}` | GET | Get real-time location of hustler | ✅ Bearer |
| 8 | `/statistics/dashboard/hustler/{hustlerId}` | GET | Get hustler dashboard statistics | ✅ Bearer |
| 9 | `/hustler/request` | POST | Create hustler onboarding request (`multipart/form-data`) | ✅ Bearer |
| 10 | `/hustler/availability/update` | POST | Update hustler's availability schedule | ✅ Bearer |
| 11 | `/location/update_primary` | POST | Update hustler's primary location | ✅ Bearer |

### Request Examples

**Update Hustler Profile** `PUT /hustler/profile/edit`
```json
{
  "hustlerId": "hustler_id",
  "pricing": "5000",
  "pricingType": "Daily",
  "workBio": "Experienced plumber"
}
```

**Update Availability** `POST /hustler/availability/update`
```json
{
  "hustlerId": "hustler_id",
  "type": "partial",
  "days": ["Monday", "Tuesday", "Wednesday"]
}
```

**Update Primary Location** `POST /location/update_primary`
```json
{
  "uid": "user_id",
  "location": {
    "latitude": -1.286389,
    "longitude": 36.817223,
    "address": "Nairobi, Kenya"
  }
}
```

---

## 5. Client Management APIs (3 Endpoints)

| # | Endpoint | Method | Description | Auth Required |
|---|----------|--------|-------------|---------------|
| 1 | `/client/activate` | POST | Activate client account | ✅ Bearer |
| 2 | `/client/job_history/{ownerId}` | GET | Get all jobs posted by client | ✅ Bearer |
| 3 | `/statistics/dashboard/client/{userId}` | GET | Get client dashboard statistics | ✅ Bearer |

---

## 6. Communication APIs (2 Endpoints)

| # | Endpoint | Method | Description | Auth Required |
|---|----------|--------|-------------|---------------|
| 1 | `/send_otp` | POST | Send OTP via SMS | No |
| 2 | `/send_email` | POST | Send email notification | No |

### Request Examples

**Send OTP** `POST /send_otp`
```json
{
  "phone_number": "+254712345678"
}
```

**Send Email** `POST /send_email`
```json
{
  "to": "user@example.com",
  "subject": "One-Time Code from Yohpal Hustler App",
  "text": "HTML content",
  "html": true
}
```

---

## 7. Roles & Permissions APIs (3 Endpoints)

| # | Endpoint | Method | Description | Auth Required |
|---|----------|--------|-------------|---------------|
| 1 | `/roles/store/{storeId}/all` | GET | Get list of all roles | ✅ Bearer |
| 2 | `/roles/store/{storeId}` | GET | Get single role by role ID | ✅ Bearer |
| 3 | `/roles/store/{storeId}/filtered` | GET | Get list of filtered roles | ✅ Bearer |

---

## 8. Support APIs (2 Endpoints)

| # | Endpoint | Method | Description | Auth Required |
|---|----------|--------|-------------|---------------|
| 1 | `/api/tickets` | GET | List all support tickets | ✅ Bearer |
| 2 | `/api/tickets/{id}/reply` | POST | Reply to a support ticket | ✅ Bearer |

---

## 9. External Third-Party APIs

### 9.1 Google Maps JavaScript API
- **Provider**: Google Maps Platform
- **API Key**: Stored in `.env` as `GOOGLE_MAP_API_KEY`
- **Script URL**:
  ```
  https://maps.googleapis.com/maps/api/js?key={API_KEY}&libraries=geometry&libraries=marker
  ```
- **Features Used**:
  - Maps JavaScript API
  - Geometry Library
  - Marker Library (Advanced Markers)
- **Methods**: `setMapOnPage()`, `getGeolocationPositions()`, `mapAndCreateHustlerMarkers()`
- **Auth Method**: URL parameter `?key={API_KEY}`

---

## 10. CDN Resources (External Libraries)

| Library | Version | CDN | Purpose |
|---------|---------|-----|---------|
| Bootstrap CSS | 5.3.3 | jsDelivr | UI framework |
| Bootstrap JS | 5.3.3 | jsDelivr | UI framework JS |
| Font Awesome | 5.15.4, 6.4.0, 6.5.0 | Cloudflare CDN | Icons |
| Popper.js | 2.11.8 | jsDelivr | Tooltip/dropdown positioning |
| Chart.js | latest | jsDelivr | Dashboard statistics charts |
| Flatpickr CSS | latest | jsDelivr | Date/time picker styling |
| Flatpickr JS | latest | jsDelivr | Job scheduling date/time picker |

### CDN URLs
```html
<!-- Bootstrap -->
https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css
https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js

<!-- Font Awesome -->
https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css

<!-- Popper.js -->
https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js

<!-- Chart.js -->
https://cdn.jsdelivr.net/npm/chart.js

<!-- Flatpickr -->
https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css
https://cdn.jsdelivr.net/npm/flatpickr
```

---

## 11. Optional Vendor APIs (Not Currently Configured)

| Service | Purpose | Status |
|---------|---------|--------|
| Telegram Bot API (`https://api.telegram.org/bot`) | Logging notifications | ❌ Not configured |
| Mandrill Email API (`https://mandrillapp.com/api/1.0/messages/send-raw.json`) | Email logging | ❌ Not configured |
| Slack API | Slack notifications for logs | ❌ Not configured |
| Pushover API | Push notifications for logs | ❌ Not configured |
| Flowdock API | Team communication logs | ❌ Not configured |
| SendGrid API | Email sending via SendGrid | ❌ Not configured |

> All optional vendor APIs are managed via `monolog/monolog`. Configure them in `.env` when needed.

---

## 12. API Authentication Methods

| API | Method | Storage |
|-----|--------|---------|
| YohPal Backend API | Bearer Token (JWT) | PHP Session / Next.js server context |
| Google Maps API | API Key (`?key=`) | `.env` → `GOOGLE_MAP_API_KEY` |
| CDN Resources | None (public) | — |

**Bearer Token Header Format**:
```
Authorization: Bearer {token}
```

---

## 13. Firebase Services

### Client SDK — `/services/client/`
Used for client-side Firebase interactions (auth state, real-time listeners, etc.)

| Service | Description |
|---------|-------------|
| Auth | Sign in, sign up, sign out, session state |
| Firestore (client) | Real-time data reads for UI |
| Storage | Upload/download profile images, attachments |

### Admin SDK — `/services/server/`
Used in server-side operations (server actions, API routes).

| Service | Description |
|---------|-------------|
| Firestore (admin) | Trusted reads/writes from server |
| Auth (admin) | Verify tokens, manage users |
| Storage (admin) | Secure file management |

---

## 14. Server Actions — `/actions/`

Server actions bridge the client components with backend services.

### Auth Actions
| Action | Method | Backend Endpoint |
|--------|--------|-----------------|
| `signUp` | POST | `/signup` |
| `signIn` | POST | `/signin` |
| `signOut` | POST | Session destroy |

### Profile Actions
| Action | Method | Backend Endpoint |
|--------|--------|-----------------|
| `getProfile` | GET | `/hustler/profile/{hustlerId}` |
| `updateProfile` | PUT | `/hustler/profile/edit` |
| `uploadAvatar` | POST | Firebase Storage |
| `updatePrimarySkill` | PUT | `/hustler/profile/edit/primary_skill` |
| `updateSkills` | PUT | `/hustler/profile/edit/skills` |

### Jobs Actions
| Action | Method | Backend Endpoint |
|--------|--------|-----------------|
| `getMyJobs` | GET | `/hustler/job_requests/{hustlerId}` |
| `getJobDetails` | GET | `/jobs/get_details/{jobId}` |
| `applyForJob` | POST | `/jobs/create` |
| `acceptJob` | PUT | `/hustler/accept_request` |
| `rejectJob` | PUT | `/hustler/reject_request` |
| `updateJobStatus` | PUT | `/hustler/accept_request` or `/hustler/reject_request` |
| `getActiveHustlers` | GET | `/jobs/get_active_hustlers/{primarySkill}` |
| `getServiceCategories` | POST | `/services` |

### Work History Actions
| Action | Method | Backend Endpoint |
|--------|--------|-----------------|
| `getWorkHistory` | GET | `/hustler/job_history/{hustlerId}` |
| `getClientJobHistory` | GET | `/client/job_history/{ownerId}` |

### Dashboard Actions
| Action | Method | Backend Endpoint |
|--------|--------|-----------------|
| `getHustlerDashboardStats` | GET | `/statistics/dashboard/hustler/{hustlerId}` |
| `getClientDashboardStats` | GET | `/statistics/dashboard/client/{userId}` |

### Notifications Actions
| Action | Method | Backend Endpoint |
|--------|--------|-----------------|
| `getNotifications` | GET | Firebase Firestore |
| `markNotificationRead` | POST | Firebase Firestore |

### Settings & Availability Actions
| Action | Method | Backend Endpoint |
|--------|--------|-----------------|
| `getSettings` | GET | Firebase Firestore |
| `updateSettings` | POST | Firebase Firestore |
| `updateAvailability` | POST | `/hustler/availability/update` |
| `updatePrimaryLocation` | POST | `/location/update_primary` |
| `getLiveLocation` | GET | `/hustler/live_location/{hustlerId}` |

### Communication Actions
| Action | Method | Backend Endpoint |
|--------|--------|-----------------|
| `sendOtp` | POST | `/send_otp` |
| `sendEmail` | POST | `/send_email` |

### Support Actions
| Action | Method | Backend Endpoint |
|--------|--------|-----------------|
| `listSupportTickets` | GET | `/api/tickets` |
| `replySupportTicket` | POST | `/api/tickets/{id}/reply` |

### Roles Actions
| Action | Method | Backend Endpoint |
|--------|--------|-----------------|
| `getAllRoles` | GET | `/roles/store/{storeId}/all` |
| `getRoleById` | GET | `/roles/store/{storeId}` |
| `getFilteredRoles` | GET | `/roles/store/{storeId}/filtered` |

---

## 15. App Routes → API Mapping

| Page | Route | Actions / Services Used |
|------|-------|------------------------|
| Home | `/` | — |
| Dashboard | `/dashboard` | `getHustlerDashboardStats`, `getNotifications`, Auth |
| My Jobs | `/myjobs` | `getMyJobs`, `acceptJob`, `rejectJob`, `getJobDetails` |
| Notifications | `/notifications` | `getNotifications`, `markNotificationRead` |
| Edit Profile | `/edit-profile` | `getProfile`, `updateProfile`, `uploadAvatar`, `updatePrimarySkill`, `updateSkills`, `updateAvailability`, `updatePrimaryLocation` |
| Badges | `/badges` | Firebase Firestore |
| Reviews | `/reviews` | Firebase Firestore |
| Work History | `/workhistory` | `getWorkHistory` |
| Settings | `/settings` | `getSettings`, `updateSettings` |
| About | `/about` | — |
| Help & Support | `/help-and-support` | `listSupportTickets`, `replySupportTicket` |
| Organization | `/(organization)/*` | Organization-specific actions (TBD) |

---

## 16. TypeScript Types — `/types/actions/`

All server action request and response shapes are typed here.

| Type File | Description |
|-----------|-------------|
| `auth.types.ts` | Sign in / sign up payloads and responses |
| `profile.types.ts` | Profile data shape |
| `jobs.types.ts` | Job listing and application types |
| `reviews.types.ts` | Review payload and response types |
| `notifications.types.ts` | Notification data shape |
| `settings.types.ts` | User settings shape |
| `hustler.types.ts` | Hustler-specific data types |
| `location.types.ts` | Location/coordinates types |
| `roles.types.ts` | Roles and permissions types |
| `support.types.ts` | Support ticket types |

### Standard API Response Shape
```ts
type ActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
```

### Environment Variables Required
```env
# Backend API
NEXT_PUBLIC_API_BASE_URL=https://yohpal-hustler-apis-test.onrender.com

# Google Maps
NEXT_PUBLIC_GOOGLE_MAP_API_KEY=your_key_here

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_ADMIN_PRIVATE_KEY=
FIREBASE_ADMIN_CLIENT_EMAIL=

# Optional Services (configure when needed)
SENDGRID_API_KEY=
SLACK_WEBHOOK_URL=
TELEGRAM_BOT_TOKEN=
PUSHOVER_API_KEY=
```

---

## 17. Total API Count

| Category | Count |
|----------|-------|
| Authentication & Users | 9 |
| Job Management | 7 |
| Hustler Management | 11 |
| Client Management | 3 |
| Communication | 2 |
| Roles & Permissions | 3 |
| Support | 2 |
| **Total Backend APIs** | **37** |
| Google Maps API | 1 |
| CDN Resources | 5 |
| Optional Vendor APIs | 6 |
| Firebase Services | 6 |
| **Grand Total** | **55** |

---

## 18. Critical Configuration Checklist

### Production Deployment
- [ ] Set `NEXT_PUBLIC_API_BASE_URL` to production URL
- [ ] Verify `NEXT_PUBLIC_GOOGLE_MAP_API_KEY` is valid and has proper domain restrictions
- [ ] Configure all Firebase environment variables
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS
- [ ] Configure CORS policies on the backend
- [ ] Set up API rate limiting
- [ ] Test all 37 backend API endpoints with production credentials
- [ ] Configure optional email/notification services if needed
- [ ] Audit and restrict Firebase security rules
