# S S Psychologist Life Care - Backend

Backend API for the S S Psychologist Life Care platform, which connects clients with certified counsellors through live sessions, chat, and digital tools.

## Features

- JWT-based authentication with refresh tokens
- OTP verification for signup and login
- Google OAuth integration
- Role-based access control (client, counsellor, admin)
- Secure password hashing with bcrypt
- MongoDB database with Mongoose ODM
- Express.js REST API
- Rate limiting and security headers

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/verify-otp` - Verify OTP after registration
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/refresh-token` - Refresh access token
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password
- `POST /api/auth/forgotpassword` - Request password reset
- `PUT /api/auth/resetpassword/:resettoken` - Reset password
- `GET /api/auth/logout` - Logout user

### Client Routes

- `GET /api/client/profile` - Get client profile
- `GET /api/client/counsellors` - Get all counsellors
- `GET /api/client/counsellors/:id` - Get single counsellor
- `POST /api/client/appointments` - Book appointment
- `GET /api/client/appointments` - Get client appointments
- `GET /api/client/appointments/:id` - Get single appointment
- `PUT /api/client/appointments/:id/cancel` - Cancel appointment
- `POST /api/client/reviews` - Submit review
- `GET /api/client/reviews` - Get client reviews

### Counsellor Routes

- `GET /api/counsellor/profile` - Get counsellor profile
- `PUT /api/counsellor/profile` - Update counsellor profile
- `PUT /api/counsellor/availability` - Update availability
- `POST /api/counsellor/verification` - Upload verification documents
- `GET /api/counsellor/appointments` - Get counsellor appointments
- `GET /api/counsellor/appointments/:id` - Get single appointment
- `PUT /api/counsellor/appointments/:id/status` - Update appointment status
- `POST /api/counsellor/appointments/:id/notes` - Add session notes
- `GET /api/counsellor/earnings` - Get earnings
- `POST /api/counsellor/withdrawals` - Request withdrawal
- `POST /api/counsellor/blogs` - Create blog post
- `POST /api/counsellor/videos` - Upload video

### Admin Routes

- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create user
- `GET /api/admin/users/:id` - Get single user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/counsellors` - Get all counsellors
- `GET /api/admin/counsellors/:id` - Get single counsellor
- `PUT /api/admin/counsellors/:id/verify` - Verify counsellor
- `GET /api/admin/appointments` - Get all appointments
- `PUT /api/admin/appointments/:id/payment` - Update payment status
- `GET /api/admin/withdrawals` - Get all withdrawal requests
- `PUT /api/admin/withdrawals/:id` - Process withdrawal request
- `GET /api/admin/cms/blogs` - Get all blogs (admin view)
- `PUT /api/admin/cms/blogs/:id` - Update blog status

### CMS Routes

- `GET /api/cms/blogs` - Get all published blogs
- `GET /api/cms/blogs/:slug` - Get single blog
- `GET /api/cms/blogs/categories` - Get blog categories
- `GET /api/cms/videos` - Get all published videos
- `GET /api/cms/videos/:id` - Get single video
- `GET /api/cms/videos/categories` - Get video categories
- `GET /api/cms/gallery` - Get gallery images
- `GET /api/cms/gallery/categories` - Get gallery categories

## Models

- `User` - User authentication and profile
- `Counsellor` - Counsellor profile, qualifications, availability
- `Appointment` - Session bookings between clients and counsellors
- `SessionNote` - Private/public notes for each appointment
- `Review` - Client reviews for counsellors
- `WithdrawalRequest` - Counsellor earnings withdrawal
- `Blog` - CMS blog posts
- `Video` - Educational videos
- `GalleryImage` - Media gallery images

## Security Features

- JWT token rotation
- Secure HTTP-only cookies
- Rate limiting on auth routes
- Helmet security headers
- CORS configuration
- Password hashing with bcrypt
- Role-based route protection