# PenMail Backend

This is the backend service for the PenMail website. It provides RESTful APIs for user authentication, letter management, friend system, and more.

## 🚀 Features

### Core Features
- ✅ User authentication (Register, Login, Password Reset)
- ✅ Letter sending with delayed delivery
- ✅ Friend system with requests
- ✅ Stamp collection system
- ✅ Admin panel for management

### New Features (Recently Added)
- ✅ **Draft Letters** - Save letters before sending
- ✅ **Archive System** - Archive and restore letters
- ✅ **Block/Unblock Users** - Control who can contact you
- ✅ **Unfriend** - Remove friends from your list
- ✅ **Cancel Friend Requests** - Cancel sent requests
- ✅ **Pagination** - All list endpoints support pagination
- ✅ **Search & Filter** - Search letters by content, filter by date
- ✅ **Rate Limiting** - API protection against abuse
- ✅ **Input Validation** - Comprehensive validation on all inputs

## Folder Structure

```
backend/
├── controllers/      # Route handlers and business logic
│   ├── auth/        # Authentication controllers
│   ├── general/     # General controllers
│   ├── letter/      # Letter management controllers
│   ├── stamp/       # Stamp controllers
│   └── user/        # User management controllers
├── models/          # Database models/schemas
│   ├── friend/      # Friend request model
│   ├── letter/      # Letter model
│   ├── stamp/       # Stamp model
│   └── user/        # User model
├── routes/          # API route definitions
│   ├── admin/       # Admin routes
│   ├── auth/        # Auth routes
│   ├── general/     # General routes
│   ├── letter/      # Letter routes
│   ├── stamp/       # Stamp routes
│   └── user/        # User routes
├── middlewares/     # Custom middleware
│   ├── auth/        # Authentication middleware
│   ├── cloud/       # Cloudinary upload middleware
│   └── validation/  # Input validation middleware
├── utils/           # Utility functions and helpers
├── configs/         # Configuration files (DB, Cloudinary)
├── services/        # Services (emails, schedulers)
│   ├── emails/      # Email sending services
│   ├── schedulers/  # Cron jobs for letter delivery
│   └── template/    # Email templates
└── server.js        # Entry point to start the server
```

## API Routes Summary

| Category | Endpoints | Description |
|----------|-----------|-------------|
| Auth | 5 | Register, login, password reset |
| User | 15 | Profile, friends, block/unblock |
| Letter | 14 | Send, inbox, outbox, drafts, archive |
| Stamp | 3 | View, collect stamps |
| Admin | 7 | User & stamp management |
| General | 3 | Public endpoints |
| **TOTAL** | **47** | Complete API coverage |

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Cloudinary account (for image uploads)
- Email service credentials (Gmail, etc.)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file in the backend directory
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

4. Start the server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Rate Limiting** - Protection against abuse
  - General API: 100 req/15min
  - Auth: 5 req/15min
  - Letters: 20 req/hour
  - Friend requests: 30 req/hour
- **Input Validation** - Comprehensive validation using express-validator
- **Password Strength** - Enforced strong passwords
- **Block System** - Users can block unwanted contacts
- **CORS Protection** - Configured CORS policy

## 🧪 Testing

### Using Postman/Thunder Client

1. Import the collection (if available)
2. Set environment variables:
   - `baseUrl`: http://localhost:3000/api
   - `token`: Your JWT token after login

### Example Requests

**Register:**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "nickName": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "countryCode": "US"
}
```

**Send Letter:**
```bash
POST /api/letter/send-letter
Authorization: Bearer <token>
Content-Type: application/json

{
  "recipientId": "userId",
  "subject": "Hello!",
  "body": "This is my letter",
  "isDraft": false
}
```

**Search Inbox:**
```bash
GET /api/letter/inbox?page=1&limit=10&search=hello
Authorization: Bearer <token>
```

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **express-rate-limit** - Rate limiting
- **cloudinary** - Image hosting
- **multer** - File upload
- **nodemailer** - Email sending
- **node-cron** - Scheduled tasks
- **cors** - CORS middleware
- **cookie-parser** - Cookie parsing
- **dotenv** - Environment variables

## 🔄 Scheduled Jobs

The backend uses cron jobs for automated tasks:

- **Letter Delivery** - Runs every minute
  - Checks for letters ready to be delivered
  - Updates status from "sent" to "received"
  - Sends email notifications to recipients

## 🐛 Troubleshooting

### Server won't start
- Check if MongoDB is running
- Verify `.env` file exists and has correct values
- Check if port 3000 is available

### Rate limiting errors
- Adjust limits in `middlewares/rateLimiter.js`
- Clear rate limit by restarting server

### Validation errors
- Check request body matches validation schema
- Review validation rules in `middlewares/validation/`

### Email not sending
- Verify EMAIL_USER and EMAIL_PASSWORD in `.env`
- For Gmail, use App Password, not regular password
- Check firewall/antivirus settings

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

## 🆕 Recent Updates

**Version 2.0** (Latest)
- Added draft letter system
- Added archive functionality
- Added block/unblock users
- Added unfriend feature
- Added cancel friend request
- Added pagination to all list endpoints
- Added search and filter for letters
- Implemented rate limiting
- Added comprehensive input validation
- Fixed nickName typo bug

**Version 1.0**
- Initial release with core features

---

## 📚 Complete API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication
Most endpoints require JWT token in cookies or Authorization header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Routes (`/api/auth`)

### 1. Register User
- **POST** `/api/auth/register`
- **Rate Limit**: 5 requests per 15 minutes
- **Body**:
```json
{
  "fullName": "John Doe",
  "nickName": "johndoe123",
  "email": "john@example.com",
  "password": "SecurePass123",
  "countryCode": "US",
  "avatarUrl": "https://...",
  "languages": ["en", "es"],
  "interests": ["reading", "travel"]
}
```
- **Validation**:
  - fullName: 2-100 characters
  - nickName: 3-20 characters (alphanumeric + underscore)
  - password: min 8 chars, 1 uppercase, 1 lowercase, 1 number
  - countryCode: 2-letter code (US, CA, GB, etc.)

### 2. Login
- **POST** `/api/auth/login`
- **Rate Limit**: 5 requests per 15 minutes
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

### 3. Logout
- **POST** `/api/auth/logout`
- Clears authentication cookie

### 4. Forgot Password
- **POST** `/api/auth/forgot-password`
- **Rate Limit**: 5 requests per 15 minutes
- **Body**:
```json
{
  "email": "john@example.com"
}
```
- Sends password reset email with token

### 5. Reset Password
- **POST** `/api/auth/reset-password/:token`
- **Rate Limit**: 5 requests per 15 minutes
- **Body**:
```json
{
  "newPassword": "NewSecurePass123"
}
```

---

## 👤 User Routes (`/api/user`)
*All routes require authentication*

### Profile Management

#### 1. Get Own Profile
- **GET** `/api/user/profile`
- Returns authenticated user's profile

#### 2. Update Profile
- **PUT** `/api/user/update`
- **Content-Type**: `multipart/form-data`
- **Body**:
```json
{
  "fullName": "John Doe Updated",
  "nickName": "johndoe",
  "countryCode": "US",
  "languages": ["en", "fr"],
  "interests": ["coding", "music"],
  "avatarUrl": <file upload>
}
```

### Friend Management

#### 3. Get Friends List
- **GET** `/api/user/get-friends`
- Returns all accepted friends

#### 4. Get Friend Profile
- **GET** `/api/user/get-friends/:friendId`
- View a friend's profile

#### 5. Send Friend Request
- **PUT** `/api/user/connect-friend/:friendId`
- **Rate Limit**: 30 requests per hour
- Sends a friend request

#### 6. Unfriend User ⭐ NEW
- **DELETE** `/api/user/unfriend/:friendId`
- Removes friendship (both ways)

#### 7. Get Friend Requests
- **GET** `/api/user/friend-requests`
- Returns both received and sent pending requests
- **Response**:
```json
{
  "success": true,
  "requests": {
    "received": [...],
    "sent": [...]
  }
}
```

#### 8. Accept Friend Request
- **PUT** `/api/user/friend-request/:requestId`
- Accepts a received friend request

#### 9. Reject Friend Request
- **DELETE** `/api/user/friend-request/:requestId`
- Rejects a received friend request

#### 10. Cancel Sent Friend Request ⭐ NEW
- **DELETE** `/api/user/friend-request/cancel/:requestId`
- Cancels your own sent request

### Block Management ⭐ NEW

#### 11. Block User
- **PUT** `/api/user/block/:userId`
- Blocks a user (unfriends if already friends)
- Deletes all friend requests between users
- Blocked users cannot send letters

#### 12. Unblock User
- **DELETE** `/api/user/unblock/:userId`
- Removes user from blocked list

#### 13. Get Blocked Users
- **GET** `/api/user/blocked-users`
- Returns list of blocked users

### Discovery

#### 14. Discover Users
- **GET** `/api/user/discover`
- Returns 20 users with matching interests/languages
- Excludes already friends

---

## ✉️ Letter Routes (`/api/letter`)
*All routes require authentication*

### Letter Management

#### 1. Send Letter (or Save as Draft) ⭐ UPDATED
- **POST** `/api/letter/send-letter`
- **Rate Limit**: 20 requests per hour
- **Body**:
```json
{
  "recipientId": "userId",
  "subject": "Hello!",
  "body": "Letter content...",
  "stampId": "stampId",
  "isDraft": false
}
```
- Set `isDraft: true` to save as draft (recipientId optional)
- Blocked users cannot send letters
- **Validation**:
  - subject: 1-200 characters
  - body: 1-5000 characters

#### 2. Get Letter Details
- **GET** `/api/letter/get-letter/:id`
- Automatically marks as "read" when recipient opens
- Populates sender and recipient details

#### 3. Delete Letter
- **DELETE** `/api/letter/delete-letter/:id`
- Only sender can delete their sent letters

### Inbox & Outbox ⭐ UPDATED with Pagination & Search

#### 4. Get Inbox
- **GET** `/api/letter/inbox`
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `search`: Search in subject/body
  - `startDate`: Filter from date (YYYY-MM-DD)
  - `endDate`: Filter to date (YYYY-MM-DD)
- **Example**: `/api/letter/inbox?page=1&limit=20&search=hello&startDate=2024-01-01`
- Excludes archived and draft letters
- Returns received letters only

#### 5. Get Outbox
- **GET** `/api/letter/outbox`
- Same query parameters as inbox
- Returns sent letters (excludes drafts and archived)

### Draft Management ⭐ NEW

#### 6. Get Drafts
- **GET** `/api/letter/drafts?page=1&limit=10`
- Returns all saved drafts

#### 7. Update Draft
- **PUT** `/api/letter/draft/:id`
- **Body**:
```json
{
  "recipientId": "userId",
  "subject": "Updated subject",
  "body": "Updated content",
  "stampId": "stampId"
}
```
- Only draft status letters can be edited

#### 8. Send Draft
- **POST** `/api/letter/draft/:id/send`
- **Body**:
```json
{
  "recipientId": "userId"
}
```
- Converts draft to sent letter
- Applies delivery delay

### Archive Management ⭐ NEW

#### 9. Archive Letter
- **PUT** `/api/letter/archive/:id`
- Archives a letter (sender or recipient can archive)

#### 10. Unarchive Letter
- **PUT** `/api/letter/unarchive/:id`
- Restores letter from archive

#### 11. Get Archived Letters
- **GET** `/api/letter/archived?page=1&limit=10`
- Returns all archived letters (sent and received)

---

## 🎫 Stamp Routes (`/api/stamp`)
*All routes require authentication*

#### 1. Get All Stamps
- **GET** `/api/stamp`
- **Query Parameters**:
  - `rarity`: Filter by rarity (common, uncommon, rare, epic, legendary)
  - `countryCode`: Filter by country code
- **Example**: `/api/stamp?rarity=rare&countryCode=US`

#### 2. Collect Stamp
- **POST** `/api/stamp/collect/:stampId`
- Adds stamp to user's collection
- Automatically collected when sending letter with stamp

#### 3. Get My Stamps
- **GET** `/api/stamp/my-stamps`
- Returns user's collected stamps

---

## 👑 Admin Routes (`/api/admin`)
*Requires authentication + Admin role*

### Stamp Management

#### 1. Create Stamp
- **POST** `/api/admin/stamp/create`
- **Content-Type**: `multipart/form-data`
- **Body**:
```json
{
  "name": "Vintage Rose",
  "description": "A beautiful vintage rose stamp",
  "rarity": "rare",
  "countryCode": "US",
  "imageUrl": <file upload>
}
```

#### 2. Edit Stamp
- **PUT** `/api/admin/stamp/edit/:stampId`
- Same body as create (all fields optional)

#### 3. Delete Stamp
- **DELETE** `/api/admin/stamp/delete/:stampId`

#### 4. Get All Stamps (Admin)
- **GET** `/api/admin/stamp/all`
- Returns all stamps without filters

### User Management

#### 5. Get All Users
- **GET** `/api/admin/user/all`
- Returns all users with full details

#### 6. Get User Profile (Admin)
- **GET** `/api/admin/user/:userId`
- View any user's profile

#### 7. Delete User
- **DELETE** `/api/admin/user/:userId`
- Permanently deletes a user

---

## 🌐 General Routes (`/api`)

#### 1. Welcome
- **GET** `/api/`
- Returns welcome message

#### 2. Get All Users (Public)
- **GET** `/api/users`
- Public endpoint to view all users

#### 3. Get User Profile (Public)
- **GET** `/api/users/:userId`
- Public endpoint to view user profile

---

## 📊 Response Formats

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Must be a valid email"
    }
  ]
}
```

---

## 🔐 Security & Validation

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

### Validation Rules
- **Email**: Valid email format, normalized
- **Nickname**: 3-20 chars, alphanumeric + underscore
- **Country Code**: 2-letter uppercase code
- **Languages**: Max 5 items
- **Interests**: Max 10 items
- **Letter Subject**: 1-200 characters
- **Letter Body**: 1-5000 characters

### Block System
- Blocked users cannot send letters
- Blocking automatically unfriends
- All pending friend requests deleted on block

---

Feel free to contribute or open issues for improvements!

**Total API Endpoints**: 47 | **Status**: Production Ready ✅
