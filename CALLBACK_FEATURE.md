# Callback Request Feature

## Overview
Added a callback request system where visitors can request appointments from the home page. Admins can manage these requests through a dedicated panel.

## Features Added

### 1. Home Page Section
- **Location**: After the Founder Section on the home page
- **Fields**:
  - Name (required)
  - Phone Number (required)
  - Primary Concern (required, textarea)
- **Button**: "Request Callback"
- **Styling**: Matches website design with gradient background and modern card layout

### 2. Admin Panel
- **Route**: `/admin/callbacks`
- **Features**:
  - View all callback requests
  - Filter by status (pending, contacted, completed, cancelled)
  - Update request status and add notes
  - Delete requests
  - Click-to-call phone numbers
  - Responsive table layout

### 3. Admin Dashboard Integration
- Callback request count displayed in stats cards
- Quick action button to access callback requests
- Sidebar menu item added

## Files Created

### Backend
1. `server/models/CallbackRequest.js` - Database model
2. `server/controllers/callbackController.js` - Public callback creation
3. `server/routes/callback.js` - Public route
4. Added to `server/controllers/adminController.js`:
   - `getCallbackRequests()`
   - `updateCallbackRequest()`
   - `deleteCallbackRequest()`

### Frontend
1. `client/src/components/home/AppointmentRequestSection.jsx` - Home page form
2. `client/src/components/home/AppointmentRequestSection.css` - Styling
3. `client/src/pages/admin/CallbackRequests.jsx` - Admin management page

### Modified Files
- `server/server.js` - Added callback route
- `server/routes/admin.js` - Added admin callback routes
- `client/src/App.jsx` - Added admin callback route
- `client/src/pages/public/Home.jsx` - Added callback section
- `client/src/services/api.js` - Added API methods
- `client/src/components/dashboard/Sidebar.jsx` - Added menu item
- `client/src/pages/admin/Dashboard.jsx` - Added stats and quick action

## Database Schema

```javascript
{
  name: String (required),
  phoneNumber: String (required),
  primaryConcern: String (required),
  status: String (enum: ['pending', 'contacted', 'completed', 'cancelled']),
  notes: String,
  createdAt: Date
}
```

## API Endpoints

### Public
- `POST /api/callback` - Create callback request

### Admin (Protected)
- `GET /api/admin/callbacks` - Get all callback requests (with filters)
- `PUT /api/admin/callbacks/:id` - Update callback request
- `DELETE /api/admin/callbacks/:id` - Delete callback request

## Usage

### For Visitors
1. Navigate to home page
2. Scroll to "Request a Callback" section (after Founder section)
3. Fill in name, phone number, and concern
4. Click "Request Callback"
5. Success message appears

### For Admins
1. Login to admin panel
2. Click "Callback Requests" in sidebar or dashboard
3. View all requests with status filters
4. Click edit icon to update status/notes
5. Click phone number to call directly
6. Delete completed requests as needed

## Production Deployment

### Environment Variables
No additional environment variables needed.

### Database
The CallbackRequest collection will be automatically created on first use.

### Testing
1. Test form submission on home page
2. Verify admin can view requests
3. Test status updates
4. Test filtering
5. Test deletion

## Future Enhancements
- Email notifications to admin on new requests
- SMS integration for callbacks
- Export to CSV
- Analytics dashboard
- Automated follow-up reminders
