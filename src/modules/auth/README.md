# Auth Module

Complete authentication module following the new modular architecture.

## 📁 Structure

```
auth/
├── user.model.js         # User schema and model
├── auth.service.js       # Business logic layer
├── auth.controller.js    # HTTP request handlers
├── auth.validation.js    # Zod validation schemas
└── auth.routes.js        # Route definitions
```

## 🔧 Features

- ✅ User signup with admission number validation
- ✅ User signin with JWT token
- ✅ Logout functionality
- ✅ Password update
- ✅ Authentication status management
- ✅ Input validation with Zod
- ✅ Service layer for business logic
- ✅ Standardized error handling
- ✅ Rate limiting on signup/signin

## 🛣️ Routes

Base path: `/api/auth`

| Method | Path | Description | Validation | Rate Limited |
|--------|------|-------------|------------|--------------|
| POST | `/signup` | Create new user | ✅ | ✅ |
| POST | `/signin` | Login user | ✅ | ✅ |
| POST | `/logout` | Logout user | ❌ | ❌ |
| POST | `/updatepassword` | Update password | ✅ | ❌ |
| POST | `/update-authentication` | Update auth status | ✅ | ❌ |

## 📝 Usage Examples

### Sign Up
```javascript
POST /api/auth/signup
Content-Type: application/json

{
  "admissionNumber": "2024",
  "email": "student@example.com",
  "password": "securepass123",
  "section": "A",
  "gender": "Male"
}

// Response (201 Created)
{
  "statusCode": 201,
  "success": true,
  "message": "Account created successfully",
  "data": {
    "_id": "...",
    "admissionNumber": "2024",
    "email": "student@example.com",
    "section": "A",
    "gender": "Male",
    "year": "2024",
    "username": "student@example.com2024",
    "isAdmin": false,
    ...
  }
}
```

### Sign In
```javascript
POST /api/auth/signin
Content-Type: application/json

{
  "email": "student@example.com",
  "password": "securepass123"
}

// Response (200 OK)
{
  "statusCode": 200,
  "success": true,
  "message": "Sign in successful",
  "data": { ... }
}
```

### Logout
```javascript
POST /api/auth/logout
Cookie: jwt=<token>

// Response (200 OK)
{
  "statusCode": 200,
  "success": true,
  "message": "Signout successful",
  "data": null
}
```

## 🔍 Validation Rules

### Sign Up
- `admissionNumber`: Exactly 4 digits
- `email`: Valid email format
- `password`: Minimum 4 characters
- `section`: Required, non-empty string
- `gender`: Must be "Male" or "Female"

### Sign In
- `email`: Valid email format
- `password`: Required, non-empty

### Update Password
- `newPassword`: Minimum 4 characters

### Update Auth Status
- `userId`: Valid MongoDB ObjectId
- `isAuthenticated`: Boolean (optional)

## 🏗️ Architecture Benefits

### Before (Old Pattern)
```javascript
// All in one controller file - 170 lines
export const handleSignUp = async (req, res, next) => {
  // Manual validation
  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, "All fields are required"));
  }
  
  // Business logic mixed with HTTP handling
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }
  
  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ ... });
    await newUser.save();
    res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};
```

### After (New Pattern)
```javascript
// auth.controller.js - Thin HTTP layer
export const handleSignUp = asyncHandler(async (req, res) => {
  const { user, token } = await authService.signUp(req.body);
  res.cookie('jwt', token, { ... });
  res.status(201).json(ApiResponses.created(user));
});

// auth.service.js - Business logic
async signUp(userData) {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw ApiErrors.conflict('Email already in use');
  }
  // ... business logic
  return { user, token };
}

// auth.validation.js - Input validation
export const signUpSchema = z.object({
  body: z.object({
    admissionNumber: z.string().regex(/^\d{4}$/),
    email: emailSchema,
    password: passwordSchema,
    ...
  })
});

// auth.routes.js - Routes with middleware
router.post('/signup', ipLimiter, validate(signUpSchema), handleSignUp);
```

## ✅ Improvements

1. **Separation of Concerns**
   - Controller: HTTP only
   - Service: Business logic
   - Validation: Input checking
   - Model: Data structure

2. **No Try-Catch Needed**
   - `asyncHandler` wrapper catches all errors
   - Errors flow to global error handler

3. **Type-Safe Validation**
   - Zod schemas validate all inputs
   - Clear error messages
   - No manual validation checks

4. **Reusable Business Logic**
   - Service methods can be called from anywhere
   - Easy to test in isolation
   - No HTTP coupling

5. **Standardized Responses**
   - `ApiResponses` utility
   - Consistent format across all endpoints
   - Proper HTTP status codes

6. **Better Error Handling**
   - `ApiErrors` factories
   - Semantic error types
   - Proper status codes

## 🧪 Testing

Test the new auth module:

```bash
# Start server
npm run dev

# Sign up
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "admissionNumber": "2024",
    "email": "test@example.com",
    "password": "test1234",
    "section": "A",
    "gender": "Male"
  }'

# Sign in
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "test@example.com",
    "password": "test1234"
  }'

# Logout (requires cookie)
curl -X POST http://localhost:3000/api/auth/logout \
  -b cookies.txt
```

## 📊 File Sizes

| File | Lines | Purpose |
|------|-------|---------|
| user.model.js | 77 | Data model |
| auth.validation.js | 40 | Input validation |
| auth.service.js | 150 | Business logic |
| auth.controller.js | 70 | HTTP handlers |
| auth.routes.js | 45 | Route definitions |
| **Total** | **~380** | Complete module |

## 🔄 Migration Status

- [x] User model migrated
- [x] Service layer created
- [x] Validation schemas added
- [x] Controller refactored
- [x] Routes updated with validation
- [x] Integrated into main app
- [ ] Update auth middleware to use new structure (Phase 3)
- [ ] Add unit tests (Future)

## 🚀 Next Steps

1. Test all auth endpoints
2. Migrate other modules (Posts, Comments, etc.)
3. Create auth middleware in new structure
4. Add refresh token mechanism (optional)
5. Add email verification flow (optional)
