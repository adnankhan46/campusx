# Source Directory Structure

This directory contains the new modular architecture for the CampusX backend.

## Directory Overview

```
src/
├── config/            # Application configuration
├── modules/           # Feature modules (to be migrated)
└── shared/            # Shared utilities and middleware
```

## 📁 Config (`src/config/`)

Centralized configuration management with environment-specific settings.

### Files:
- **`index.js`** - Main config export with validation
- **`environments/development.js`** - Development settings
- **`environments/production.js`** - Production settings

### Usage:
```javascript
import config from './config/index.js';

console.log(config.mongoUri);
console.log(config.corsOrigins); // Environment-specific
```

---

## 🔧 Shared (`src/shared/`)

Reusable utilities and middleware available to all modules.

### Utils (`src/shared/utils/`)

#### **apiError.js**
Custom error class for standardized error handling.

```javascript
import { ApiError, ApiErrors } from './shared/utils/index.js';

// Create custom error
throw new ApiError(404, 'User not found');

// Use factory methods
throw ApiErrors.notFound('User not found');
throw ApiErrors.unauthorized('Invalid credentials');
throw ApiErrors.badRequest('Invalid email format');
```

#### **apiResponse.js**
Standardized success responses.

```javascript
import { ApiResponse, ApiResponses } from './shared/utils/index.js';

// Create custom response
res.json(new ApiResponse(200, userData, 'User fetched'));

// Use factory methods
res.json(ApiResponses.success(userData));
res.json(ApiResponses.created(newUser, 'User created'));
```

#### **asyncHandler.js**
Wrapper to eliminate try-catch blocks.

```javascript
import { asyncHandler } from './shared/utils/index.js';

// Without asyncHandler
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// With asyncHandler
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(ApiResponses.success(user));
});
```

#### **constants.js**
Application-wide constants.

```javascript
import { HTTP_STATUS, ROLES, PAYMENT_LEVELS } from './shared/utils/index.js';

if (user.role === ROLES.ADMIN) {
  // ...
}

res.status(HTTP_STATUS.CREATED).json(data);
```

---

### Middleware (`src/shared/middleware/`)

#### **validate.middleware.js**
Zod validation middleware.

```javascript
import { z } from 'zod';
import { validate } from './shared/middleware/index.js';

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(4),
  })
});

router.post('/login', validate(loginSchema), loginController);
```

#### **errorHandler.middleware.js**
Global error handler - catches all errors.

```javascript
import { errorHandler } from './shared/middleware/index.js';

// Add at the end of middleware chain
app.use(errorHandler);
```

#### **notFound.middleware.js**
404 handler for unmatched routes.

```javascript
import { notFoundHandler } from './shared/middleware/index.js';

// Add after all routes, before error handler
app.use(notFoundHandler);
app.use(errorHandler);
```

---

### Validators (`src/shared/validators/`)

Common reusable validation schemas.

```javascript
import { emailSchema, passwordSchema, objectIdSchema } from './shared/validators/common.validation.js';
import { z } from 'zod';

const userSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: passwordSchema,
    name: z.string().min(2),
  })
});
```

---

## 🎯 Migration Guide

### Current vs New Pattern

#### **Old (Current)**
```javascript
// controller/auth.controller.js
export const handleSignIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

#### **New (With Foundation)**
```javascript
// src/modules/auth/auth.controller.js
import { asyncHandler, ApiErrors, ApiResponses } from '../../shared/utils/index.js';
import { authService } from './auth.service.js';

export const handleSignIn = asyncHandler(async (req, res) => {
  const user = await authService.signIn(req.body);
  res.json(ApiResponses.success(user, 'Sign in successful'));
});

// src/modules/auth/auth.service.js
import { ApiErrors } from '../../shared/utils/index.js';
import User from './user.model.js';

export const authService = {
  async signIn (credentials) {
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      throw ApiErrors.notFound('User not found');
    }
    // Business logic here
    return user;
  }
};
```

---

## 📦 Next Steps

1. **Phase 2**: Migrate modules (auth, opportunity, company, etc.)
2. Create service layers for each module
3. Add validation schemas using Zod
4. Refactor controllers to use new utilities

---

## 🚀 Quick Start

Import utilities in your code:

```javascript
// Import everything you need
import { 
  asyncHandler, 
  ApiError, 
  ApiErrors, 
  ApiResponse,
  ApiResponses,
  HTTP_STATUS,
  ROLES 
} from './src/shared/utils/index.js';

import { 
  validate,
  errorHandler,
  notFoundHandler 
} from './src/shared/middleware/index.js';

import config from './src/config/index.js';
```
