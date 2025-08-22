# Node-JS-Machine-Test Repository

## Overview

This repository contains a **full‑stack CRUD application** built with:

- **Backend** – Node.js, Express, MySQL (using `mysql2` driver)
- **Frontend** – Angular 20 with TailwindCSS styling

The app manages **Categories** and **Products**, exposing REST APIs for the backend and a responsive UI for the frontend.

## Repository Structure

```
├── backend
│   ├── .env                 # Environment variables (DB connection, port)
│   ├── config
│   │   └── db.js            # MySQL connection setup
│   ├── controller
│   │   ├── category.controller.js
│   │   └── product.controller.js
│   ├── models
│   │   ├── category.model.js
│   │   └── product.model.js
│   ├── routes
│   │   ├── category.routes.js
│   │   └── product.routes.js
│   ├── index.js             # Express server entry point
│   └── package.json
└── frontend
    ├── src
    │   ├── app
    │   │   ├── app.config.ts
    │   │   ├── app.html
    │   │   ├── app.routes.ts
    │   │   ├── app.scss
    │   │   ├── app.ts
    │   │   ├── components
    │   │   │   ├── category-list
    │   │   │   ├── home
    │   │   │   ├── navbar
    │   │   │   └── product-list
    │   │   └── services
    │   │       ├── category-service.ts
    │   │       └── product-service.ts
    │   └── styles.scss
    ├── angular.json
    ├── package.json
    └── tsconfig*.json
```

## Prerequisites

- **Node.js** (v20+ recommended)
- **npm** (comes with Node)
- **MySQL** server
- **Angular CLI** (`npm i -g @angular/cli`) – optional for global commands

## Setup Instructions

### 1. Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create a MySQL database (e.g., `crud`) and run the following tables:
#   categories (CategoryId PK, CategoryName)
#   products   (ProductId PK, ProductName, CategoryId FK, Price)

# Copy `.env.example` to `.env` (or edit existing) and set DB credentials:
# DB_HOST=localhost
# DB_USER=root
# DB_PASS=your_password
# DB_NAME=crud
# PORT=5000

# Start the server
npm start   # (or `node index.js` if no start script)
```

The backend will be accessible at `http://localhost:5000/api/...`.

### 2. Frontend

```bash
# From the repository root
cd frontend

# Install dependencies
npm install

# Start the Angular dev server
npm start   # runs `ng serve`
```

The UI will be available at `http://localhost:4200/`.

## API Endpoints

### Category

| Method | Path               | Description                     |
|--------|--------------------|---------------------------------|
| GET    | `/api/cat/`        | Get all categories              |
| GET    | `/api/cat/:id`     | Get a single category by ID     |
| POST   | `/api/cat/`        | Create a new category           |
| PUT    | `/api/cat/:id`     | Update a category               |
| DELETE | `/api/cat/:id`     | Delete a category               |

### Product

| Method | Path                     | Description                               |
|--------|--------------------------|-------------------------------------------|
| GET    | `/api/product/`          | Get all products (no pagination)          |
| GET    | `/api/product/all`       | Get paginated products (`page`, `limit`)  |
| GET    | `/api/product/:id`       | Get a single product by ID                |
| POST   | `/api/product/`          | Create a new product                      |
| PUT    | `/api/product/:id`       | Update a product                          |
| DELETE | `/api/product/:id`       | Delete a product                          |

## Frontend Features

- **Home** – Displays a paginated grid of products with category lookup.
- **Category List** – Shows all categories and provides CRUD UI (to be extended).
- **Product List** – Shows a simple list of products (can be enhanced).
- **Navbar** – Responsive navigation with mobile menu toggle (Angular 20 `@if` syntax).

## Development Tips

- **Hot Reload**: Both backend (`nodemon` can be added) and frontend support live reload.
- **CORS**: Already enabled in backend (`cors` middleware) to allow Angular dev server to call the API.
- **Environment Variables**: Adjust `.env` for different DB hosts or ports.
- **Testing**: Backend has no tests yet; Angular includes Karma/Jasmine unit tests (`npm test`).

## License

This project is provided **as‑is** for educational purposes. No specific license is declared.

--- 

Feel free to explore, extend, and adapt the code to your needs!
