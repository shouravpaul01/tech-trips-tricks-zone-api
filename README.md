# TTT-Zone Backend API

Welcome to the **Tech Tips Tricks Zone (TTT-Zone)** backend API! This project powers the backend services for TTT-Zone, a platform for sharing, discovering, and engaging with the latest tech tips, tricks, and tutorials. This API provides a way to manage and access tech-related content, categories, user authentication, and other key features.

## Features

- **User Authentication**: Register, log in, and secure access using JSON Web Tokens (JWT).
- **Role**:Role based authentication .There are two type of role Admin and User.
- **CRUD Operations**: Create, read, update, and delete tech tips and tricks.
- **Categories**: Organize tips and tricks into searchable categories.
- **User Profiles**: Manage personal information and view user-generated content.
- **Subscription**: Manage users suscription.
- **Search and Filtering**: Search for tips by keywords, filter by category, and sort by popularity.
- **Pagination**: Retrieve large sets of data in paginated format for efficient browsing.

## Technologies Used

- **Node.js** with **Express.js** - Backend framework
- **MongoDB** with **Mongoose** - Database and ODM
- **TypeScript** - Type-safe codebase
- **Zod** - Input validation
- **JWT** - User authentication
- **Aamarpay** - Payment integration.
- **Dotenv** - Environment variable management

## Installation

1. **Clone the repository:**

   ```bash
   gh repo clone shouravpaul01/tech-trips-tricks-zone-api
   cd tech-trips-tricks-zone-api

2. **Install dependencies:**

   ```bash
   npm install

3. **Set up the environment variables:**
Create a .env file in the root directory and add the following:
   ```bash
   PORT=5000
   DATABASE_URL=
   BCRYPT_SALT_ROUNDS=12
   JWT_SECRET=
   JWT_EXPRIES=1d

   #Cloudinary
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=

   #aamerpay 
   PAYMENT_BASE_URL=
   STORE_ID=
   SIGNATURE_KEY=
   PAYMENT_VERIFY_URL=
   ```

4. **Start the server:**

   ```bash
   npm run dev


