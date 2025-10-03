# U ser Registration Endpoint Documentation
## /captain/login Endpoint

`POST /captain/login`

### Description
Authenticates a captain with email and password. Returns a JWT token and captain details on success.

### Request Body
Send a JSON object with the following structure:

```
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

#### Example
```
{
  "email": "alice.smith@example.com",
  "password": "securePassword123"
}
```

### Validation
- `email`: Required, must be a valid email address
- `password`: Required, minimum 6 characters

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "<JWT token>",
    "captain": {
      "_id": "<captain id>",
      "fullname": {
        "firstname": "Alice",
        "lastname": "Smith"
      },
      "email": "alice.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
      // ...other captain fields
    }
  }
  ```

#### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      // ...other errors
    ]
  }
  ```

#### Authentication Error
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

#### Server Error
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "message": "Server error"
  }
  ```

---

## /captain/profile Endpoint

`GET /captain/profile`

### Description
Returns the authenticated captain's profile information.

### Authentication
Requires a valid JWT token in the request (cookie or Authorization header).

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "captain": {
      "_id": "<captain id>",
      "fullname": {
        "firstname": "Alice",
        "lastname": "Smith"
      },
      "email": "alice.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
      // ...other captain fields
    }
  }
  ```

#### Authentication Error
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

#### Server Error
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "message": "Server error"
  }
  ```

---

## /captain/logout Endpoint

`GET /captain/logout`

### Description
Logs out the authenticated captain by blacklisting the JWT token and clearing the cookie.

### Authentication
Requires a valid JWT token in the request (cookie or Authorization header).

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

#### Authentication Error
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

#### Server Error
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "message": "Server error"
  }
  ```
## /captain/register Endpoint

`POST /captain/register`

### Description
Registers a new captain in the system. Validates input data, hashes the password, creates the captain, and returns an authentication token.

### Request Body
Send a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)",
  "vehicle": {
    "color": "string (min 3 chars, required)",
    "plate": "string (min 3 chars, required)",
    "capacity": "integer (min 1, required)",
    "vehicleType": "string (car, motorcycle, auto; required)"
  }
}
```

#### Example
```
{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "securePassword123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Validation
- `fullname.firstname`: Required, minimum 3 characters
- `fullname.lastname`: Optional, minimum 3 characters if provided
- `email`: Required, must be a valid email address
- `password`: Required, minimum 6 characters
- `vehicle.color`: Required, minimum 3 characters
- `vehicle.plate`: Required, minimum 3 characters
- `vehicle.capacity`: Required, integer, minimum 1
- `vehicle.vehicleType`: Required, must be one of: car, motorcycle, auto

### Responses

#### Success
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<JWT token>",
    "captain": {
      "_id": "<captain id>",
      "fullname": {
        "firstname": "Alice",
        "lastname": "Smith"
      },
      "email": "alice.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
      // ...other captain fields
    }
  }
  ```

#### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters",
        "param": "fullname.firstname",
        "location": "body"
      },
      // ...other errors
    ]
  }
  ```

#### Duplicate Captain Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "captain already exist"
  }
  ```

#### Server Error
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "message": "Server error"
  }
  ```

## Endpoint
## /users/profile Endpoint

`GET /users/profile`

### Description
Returns the authenticated user's profile information.

### Authentication
Requires a valid JWT token in the request (cookie or Authorization header).

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "user": {
      "_id": "<user id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // ...other user fields
    }
  }
  ```

#### Authentication Error
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

#### Server Error
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "message": "Server error"
  }
  ```

---

## /users/logout Endpoint

`GET /users/logout`

### Description
Logs out the authenticated user by blacklisting the JWT token and clearing the cookie.

### Authentication
Requires a valid JWT token in the request (cookie or Authorization header).

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

#### Authentication Error
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

#### Server Error
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "message": "Server error"
  }
  ```
## /users/login Endpoint

`POST /users/login`

### Description
Authenticates a user with email and password. Returns a JWT token and user details on success.

### Request Body
Send a JSON object with the following structure:

```
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

#### Example
```
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### Validation
- `email`: Required, must be a valid email address
- `password`: Required, minimum 6 characters

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "<JWT token>",
    "user": {
      "_id": "<user id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // ...other user fields
    }
  }
  ```

#### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Enter a valid email",
        "param": "email",
        "location": "body"
      },
      // ...other errors
    ]
  }
  ```

#### Authentication Error
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

#### Server Error
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "message": "Server error"
  }
  ```

`POST /users/register`

## Description
Registers a new user in the system. Validates input data, hashes the password, creates the user, and returns an authentication token.

## Request Body
Send a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example
```
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Validation
- `fullname.firstname`: Required, minimum 3 characters
- `fullname.lastname`: Optional, minimum 3 characters if provided
- `email`: Required, must be a valid email address
- `password`: Required, minimum 6 characters

## Responses

The API returns different responses based on the outcome:

### Success
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<JWT token>",
    "user": {
      "_id": "<user id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // ...other user fields
    }
  }
  ```

### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      },
      // ...other errors
    ]
  }
  ```

### Server Error
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "message": "Server error"
  }
  ```

### Success
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<JWT token>",
    "user": {
      "_id": "<user id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // ...other user fields
    }
  }
  ```

### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      },
      // ...other errors
    ]
  }
  ```

### Server Error
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "message": "Server error"
  }
  ```

## Notes
- Passwords are securely hashed before storing.
- On success, a JWT token is returned for authentication.
- All required fields must be present and valid.

---

**Controller Reference:** See `controller/user.controller.js` for implementation details.

**Service Reference:** See `services/user.services.js` for user creation logic.

**Model Reference:** See `models/user.model.js` for user schema and password handling.
