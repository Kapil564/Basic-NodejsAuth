# Authentication API

A secure authentication system built with Express.js, JWT (JSON Web Tokens), cookie-parser, and bcryptjs for password hashing.

## 🚀 Features

- **User Registration**: Secure signup with password hashing
- **JWT Authentication**: Token-based authentication using cookies
- **Password Security**: Bcryptjs for secure password hashing
- **Route Protection**: Middleware for protecting authenticated routes
- **MongoDB Integration**: User data persistence with Mongoose
- **Input Validation**: Basic validation for user inputs

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Auth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=5173
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📁 Project Structure

```
Auth/
├── src/
│   ├── controllers/
│   │   └── auth.controllers.js    # Authentication logic
│   ├── middleware/
│   │   └── user.auth.js           # Route protection middleware
│   ├── model/
│   │   └── userAuth.model.js      # User schema definition
│   ├── routes/
│   │   └── auth.routes.js         # API routes
│   ├── lib/
│   │   ├── db.js                  # Database connection
│   │   └── utils.js               # JWT token utilities
│   └── index.js                   # Server entry point
├── package.json
├── .gitignore
└── README.md
```

## 🔧 API Endpoints

### POST `/api/auth/signup`
Register a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "fullName": "John Doe",
  "email": "john@example.com"
}
```

**Validation Rules:**
- All fields are required
- Password must be at least 6 characters
- Email must be unique

### PUT `/api/auth/check`
Check if user is authenticated (protected route).

**Headers:** Requires valid JWT token in cookies

**Response:**
```json
{
  "_id": "user_id",
  "fullName": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 🔐 Security Features

### Password Hashing
- Uses bcryptjs with salt rounds of 10
- Passwords are never stored in plain text

### JWT Authentication
- Tokens are stored in HTTP-only cookies
- 24-hour expiration time
- Secure cookie settings (httpOnly, sameSite)

### Route Protection
- Middleware validates JWT tokens
- Protected routes require valid authentication
- Automatic user context injection

## 🗄️ Database Schema

### User Model
```javascript
{
  fullName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

## 🛡️ Error Handling

The API includes comprehensive error handling for:
- Missing required fields
- Invalid email format
- Duplicate email addresses
- Weak passwords
- Invalid JWT tokens
- Database connection issues

## 🔧 Dependencies

- **express**: Web framework
- **jsonwebtoken**: JWT token generation and verification
- **bcryptjs**: Password hashing
- **mongoose**: MongoDB ODM
- **dotenv**: Environment variable management
- **cookie-parser**: Cookie parsing middleware

## 🚀 Development

### Available Scripts
- `npm start`: Start production server
- `npm run dev`: Start development server with nodemon

### Environment Variables
- `PORT`: Server port (default: 5173)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing

## 📝 Usage Examples

### Frontend Integration

**Signup Request:**
```javascript
const response = await fetch('/api/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    fullName: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  })
});
```

**Protected Route Request:**
```javascript
const response = await fetch('/api/auth/check', {
  method: 'PUT',
  credentials: 'include' // Important for cookies
});
```

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit sensitive data
2. **Password Validation**: Minimum 6 characters required
3. **JWT Security**: Tokens stored in HTTP-only cookies
4. **Input Validation**: Server-side validation for all inputs
5. **Error Messages**: Generic error messages to prevent information leakage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

**Note**: This is a basic authentication system. For production use, consider adding additional security measures like rate limiting, CORS configuration, and more robust error handling.
