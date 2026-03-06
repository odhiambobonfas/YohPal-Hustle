# Client Services Documentation

This directory contains client-side service modules that handle authentication, verification, and API communication for the YohPal-Hustle application.

## Overview

The client services provide a clean abstraction layer between the UI components and external APIs (Firebase, YohPal API). Each service handles specific functionality with proper error handling and type safety.

## Service Modules

### 1. Authentication Service (`auth.ts`)

**Purpose:** Handles user authentication and account management using Firebase Auth.

**Key Functions:**
- `completeUserRegistration(uid, userData)` - Creates user profile in Firestore after successful authentication

**Flow:**
1. Receives user ID and profile data
2. Calls server action to create Firestore document
3. Returns success/failure status

**Dependencies:** Firebase Auth, Server Actions

---

### 2. Email Verification Service (`email-verification.ts`)

**Purpose:** Manages email verification during user registration using Firebase Auth.

**Key Functions:**
- `createUserAndSendVerification(email, password)` - Creates Firebase Auth user and sends verification email

**Flow:**
1. Creates Firebase Auth user with email/password
2. Automatically sends email verification link
3. Returns temporary user object for session management
4. Handles email-already-in-use errors

**Dependencies:** Firebase Auth

**Error Handling:**
- `auth/email-already-in-use` - User account already exists
- Network errors - Connection issues
- Invalid email format - Firebase validation

---

### 3. Password Reset Service (`password-reset.ts`)

**Purpose:** Handles secure password recovery using Firebase's built-in reset flow.

**Key Functions:**
- `sendPasswordReset(email)` - Triggers password reset email with OOB code

**Flow:**
1. Validates email format
2. Sends Firebase password reset email
3. Email contains secure OOB (Out-of-Band) code link
4. User clicks link to reset password on Firebase-hosted page

**Dependencies:** Firebase Auth

**Error Handling:**
- `auth/user-not-found` - Email not registered
- Network errors - Connection issues
- Invalid email - Format validation

---

### 4. Phone OTP Service (`phone-otp.ts`)

**Purpose:** Manages SMS-based phone verification using YohPal API with Advanta SMS service.

**Key Functions:**
- `sendPhoneOTP(phoneNumber)` - Sends SMS OTP to phone number
- `verifyPhoneOTP(expectedOtp, userEnteredCode)` - Verifies user-entered OTP code

**Flow:**

#### Send OTP Flow:
1. **Input Validation:** Accepts phone number in E.164 format (+254XXXXXXXXX)
2. **API Request:** POST to `/send_otp` endpoint with phone number
3. **SMS Delivery:** YohPal API uses Advanta service to send SMS
4. **Response Handling:** Returns OTP number and success status
5. **Error Management:** Handles network errors and API failures

#### Verify OTP Flow:
1. **Input Processing:** Converts user input to integer
2. **Comparison:** Client-side verification against expected OTP
3. **Validation:** Ensures numeric input format
4. **Result:** Returns success/failure with appropriate messaging

**API Configuration:**
- **Base URL:** `https://yohpal-hustler-apis-test.onrender.com/api`
- **Timeout:** 10 seconds
- **Headers:** Content-Type: application/json
- **CORS:** Configured for localhost:5000

**Dependencies:** YohPal API, Advanta SMS Service

**Error Handling:**
- Invalid phone number format
- Network connectivity issues
- API service unavailable
- Invalid OTP format (non-numeric)
- Incorrect OTP verification

---

## Registration Flow Integration

The services work together to provide a complete user registration experience:

### Multi-Step Registration Process:

1. **Form Submission**
   - User fills registration form
   - Phone number normalized to E.164 format
   - Form validation completed

2. **Phone Verification** (`phone-otp.ts`)
   - `sendPhoneOTP()` called with normalized phone
   - SMS sent via Advanta service
   - User enters received OTP code
   - `verifyPhoneOTP()` validates code client-side

3. **Email Verification** (`email-verification.ts`)
   - `createUserAndSendVerification()` creates Firebase Auth user
   - Verification email sent automatically
   - User clicks email verification link

4. **Account Creation** (`auth.ts`)
   - `completeUserRegistration()` creates Firestore profile
   - User data persisted server-side
   - Registration process completed

### State Management:
- `formData` - User input persistence across steps
- `expectedOtp` - OTP number for verification
- `tempUser` - Firebase user object during verification
- `showPhoneVerification` - UI state for phone verification screen
- `showEmailVerification` - UI state for email verification screen

## Error Recovery Patterns

All services implement consistent error handling:

1. **Network Errors:** Retry mechanisms with user-friendly messages
2. **Validation Errors:** Clear feedback for input corrections
3. **Service Errors:** Graceful degradation with alternative flows
4. **Session Errors:** Automatic cleanup and restart options

## Security Considerations

- **Phone Verification:** Client-side OTP comparison (OTP visible in response for development)
- **Email Verification:** Firebase-managed secure verification links
- **Password Reset:** Firebase OOB codes with time-limited validity
- **Data Transmission:** HTTPS encryption for all API calls
- **Error Handling:** No sensitive data exposed in error messages

## Environment Configuration

Required environment variables:
```
NEXT_PUBLIC_API_BASE_URL=https://yohpal-hustler-apis-test.onrender.com/api
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
```

## Development Notes

- **CORS Configuration:** YohPal API allows localhost:5000 for development
- **Phone Format:** Kenya-specific normalization (+254 country code)
- **Logging:** Console logging enabled for debugging OTP responses
- **Type Safety:** Full TypeScript interfaces for all API responses
- **Error Boundaries:** Comprehensive try-catch blocks in all async functions

## Future Enhancements

- **OTP Security:** Move to server-side OTP verification
- **Retry Logic:** Automatic retry for failed network requests
- **Rate Limiting:** Client-side rate limiting for OTP requests
- **International Support:** Multi-country phone number normalization
- **Offline Support:** Queue operations for offline scenarios