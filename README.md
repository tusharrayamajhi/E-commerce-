# E-commerce Backend API

A comprehensive E-commerce backend platform built with **NestJS**, designed for scalability and performance. The system provides a full suite of features including product management, vendor administration, category structuring, reviews, user profiles, and wishlist management.

## 🚀 Tech Stack

### Core
- **Framework:** [NestJS](https://nestjs.com/) (v10)
- **Language:** TypeScript

### Database & ORM
- **ORM:** [TypeORM](https://typeorm.io/)
- **Database Support:** PostgreSQL / MySQL (Configurable via TypeORM)

### Authentication & Security
- **Auth:** JWT (`@nestjs/jwt`), Passport (`@nestjs/passport`), Local Strategy, Google OAuth20
- **Password Hashing:** bcrypt
- **CORS:** Enabled for cross-origin requests

### Performance & Caching
- **Caching:** `@nestjs/cache-manager` (Memory Cache)
- **Queues/Background Jobs:** Bull (`@nestjs/bull`)

### Communication
- **Mailing:** `@nestjs-modules/mailer` & `nodemailer` (SMTP via Gmail configured)

### API Documentation
- **Tool:** Swagger / OpenAPI (`@nestjs/swagger`)

---

## 🏗️ System Architecture & Services

The application follows a modular monolith architecture. The system is divided into several discrete domain services (modules) that handle specific e-commerce functions:

- **User Service (`UserModule`):** Manages customer profiles, authentication (JWT/OAuth), and user registrations.
- **Admin Service (`AdminModule`):** Handles administrative tasks, dashboard analytics, and platform governance.
- **Vendor Service (`VendorModule`):** Allows vendors to register, manage their storefronts, and list their products.
- **Product Service (`ProductModule`):** Centralized product catalog, inventory management, and product details.
- **Category Service (`CategoryModule`):** Manages high-level product categories.
- **Sub-Category Service (`SubCategoryModule`):** Manages nested categories to provide hierarchical structuring of products.
- **Review Service (`ReviewModule`):** Allows authenticated users to leave product reviews and ratings.
- **Wishlist Service (`WishlistModule`):** Users can save and manage products for later purchasing.
*(Note: Cart functionality is currently in development/planned).*

---

## 🔄 Core Workflows

The platform supports multiple user types, each with their own dedicated workflows:

### 1. Customer Workflow
1. **Onboarding:** User signs up using Local Strategy or Google OAuth.
2. **Browsing:** Explores products filtered by `CategoryService` and `SubCategoryModule`.
3. **Engagement:** Adds favorite items to their wishlist (`WishlistModule`).
4. **Feedback:** After purchase (or browsing), leaves ratings and reviews on products (`ReviewModule`).

### 2. Vendor Workflow
1. **Registration:** Vendor registers and is approved on the platform.
2. **Catalog Management:** Vendor creates and manages products (`ProductModule`), assigning them to specific categories/sub-categories.
3. **Operations:** Vendor monitors their product listings and associated reviews.

### 3. Administrator Workflow
1. **Governance:** Admin logs in to oversee platform operations.
2. **Taxonomy Management:** Creates and manages the global Categories and Sub-categories.
3. **User/Vendor Oversight:** Manages users and vendors, ensuring compliance and handling disputes.

---

## 🛠️ Setup and Installation

### 1. Clone the repository and install dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory (or use the existing `env` file as a reference) and populate the required credentials:
```env
JWTSECRET=your_jwt_secret
DATABASE_HOST=localhost
DATABASE_USERNAME=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=your_db_name
DATABASE_PORT=your_db_port
GMAIL_ID=your_gmail_address
GMAIL_PASSWORD=your_app_password
```

### 3. Database Sync
Since the project uses TypeORM, the database schema will automatically sync or migrate upon application startup depending on your `synchronize` configuration in the database connection settings.

---

## 🏃 Running the Application

### Development Mode
To start the server in watch mode:
```bash
npm run start:dev
```

### Production Mode
To build and run the application for production:
```bash
npm run build
npm run start:prod
```

---

## 📖 API Documentation (Swagger UI)

The project includes an interactive Swagger UI for API exploration and testing. 

1. Ensure the backend server is running (`npm run start:dev`).
2. Open your web browser and navigate to:
   👉 **[http://localhost:3000/api](http://localhost:3000/api)**

### Features in Swagger UI:
- **Explore Endpoints:** View all available REST endpoints for Users, Products, Vendors, etc.
- **Test APIs:** Execute requests directly from the browser.
- **Authentication:** Use the "Authorize" button to insert your JWT Bearer token and test protected routes.
