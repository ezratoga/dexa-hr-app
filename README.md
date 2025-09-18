# Dexa HR App

A modern Human Resources management application built with React.js, Node.js, and PostgreSQL.

## Overview

Dexa HR App is a comprehensive HR management solution that helps organizations manage employee data, departments, and HR processes efficiently.

## Features

- Employee management (add, edit, view, delete)
- Department management
- User authentication and authorization
- Responsive design
- RESTful API architecture

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Modern CSS styling

### Backend
- Node.js
- NestJS
- PostgreSQL database
- JWT authentication

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v23 or higher)
- npm or yarn
- PostgreSQL (v12 or higher)
- Git

## Migrate SQL Table
Before you run the backend service, you must have postgre database. Then, you can run provided *.sql scripts in folder /migration-db inside your PostgreSQL database

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ezratoga/dexa-hr-app.git
cd dexa-hr-app
```

## Database Setup

1. Create a PostgreSQL database named `attendance`, `profile` (or your preferred name)

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```
In here, there are many directory for many services (`attendance-employee`, `monitoring-hr`, `profile-employees`). You can go to each directory

```bash
cd <directory_name_for_each_service>
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables. Create a `.env` file in the backend for each backend service directory:
```bash
PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=dexa_hr
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
ATTENDANCE_SERVICE_BASE_URL=url_base_attendance_service_depend_on_your_port
PROFILE_USER_SERVICE_BASE_URL=url_base_attendance_service_depend_on_your_port
```

4. Start the backend server:
```bash
npm start
```

The backend API will be running on http://localhost:5000. Please make different port for each services using .env file.

## Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```

The frontend application will be running on http://localhost:3000

## API Usage

### Authentication Endpoints

**Signup Employee**
- POST `/users/v1/register`
- Body: {
    "name": "your-name",
    "email": "example@gmail.com",
    "password": "your-password",
    "position": "your-position (admin is strictly for admin HR)", 
    "phone": "your-number-phone",
    "photo": "your-photo-url"
}

**Login and Get Token Employee**
- POST `/users/v1/login`
- Body: {
    "email": "example@gmail.com",
    "password": "your-password"
}

**Get Employee Profile**
- GET `/profiles/v1/get-profile`
- Headers: `Authorization: Bearer <jwt_token>`

**Update Employee Data**
- PUT `/users/v1/update-user`
- Headers: `Authorization: Bearer <jwt_token>`
- Body: {
    "phone": "0857225455955",
    "password": "Semenjak27&",
    "photo": "photo-url"
}

### Attendance Endpoints

**Absence In/Out**
- POST `/attendance/v1/absence-employee`
- Headers: `Authorization: Bearer <jwt_token>`
- Body: {
    "absence_for": "out" (only "in" and "out"),
    "work_type": "WFH" (only "WFH" and "WFO")
}

**Get Profile**
- GET `/attendance/v1/absence-summary`
- Headers: `Authorization: Bearer <jwt_token>`

## Sample API Calls

Using curl to test the API:

```bash
# Login and get token
curl -X POST http://localhost:5000/users/v1/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "password"}'

# Get all employees (with token)
curl -X GET http://localhost:5000/profiles/v1/get-profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Default Credentials

If there are default users set up in the database, they might be:
- Email: admin@example.com
- Password: password

(Check the database seed files for actual default credentials)

## Troubleshooting

1. **Connection refused errors**: Ensure PostgreSQL is running and credentials are correct
2. **Port already in use**: Change the PORT in the .env file or kill the process using the port
3. **CORS errors**: Verify the frontend is making requests to the correct backend URL
4. **JWT errors**: Check that the JWT_SECRET is set in your environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions, please open an issue on GitHub or contact the development team.