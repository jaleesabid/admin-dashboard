# AdminDashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.
An **Admin Dashboard** that allows an administrator to manage **Users**, **Attractions**, and view **Pet Sales Statistics**. The application features full CRUD operations, search, pagination, and sales data visualization, integrating with the [melivecode.com](https://www.melivecode.com/) public API.

---

## 🚀 Features

### 👥 User Management

- List users with pagination and sorting
- Create, update, and delete users
- Search functionality using query parameters

### 🎡 Attractions Management

- View all attractions with pagination and sorting
- Add or update attractions with JWT-based authentication
- Delete attractions

### 🐾 Pet Sales Statistics

- Weekly sales line chart
- Daily sales details in a Material table

---

## 🛠 Tech Stack

| Tech                       | Purpose                  |
| -------------------------- | ------------------------ |
| **Angular 18**             | SPA Framework            |
| **Angular Material**       | UI Components & Styling  |
| **Bootstrap**              | Additional Styling       |
| **RxJS**                   | Reactive programming     |
| **NgRx / BehaviorSubject** | State management         |
| **Chart.js / ApexCharts**  | Sales data visualization |
| **Karma + Jasmine**        | Unit testing             |

---

## 🧱 Project Structure

src/
├── app/
│ ├── core/ # Guards, interceptors, layout, models, services
│ ├── modules/ # Feature modules
│ │ ├── users/ # User management
│ │ ├── attractions/ # Attraction management
│ │ |── pets/ # Pet statistics
| | └── login/ # User login
│ ├── shared/ # Dialogs, loader, navbar
│ ├── app.routes.ts # Routing configuration
│ └── app.component.ts # Root component

---

## 🔐 Authentication

- Login via `POST /login`
- JWT stored securely in `sessionStorage`
- Protected routes using `AuthGuard`
- Authenticated requests use Bearer token in headers

---

---

## 🔗 API Endpoints

> Base URL: `https://www.melivecode.com/api`

### 🧍 Users

- `GET /users?search={query}&page=1&per_page=10&sort_column=id&sort_order=asc`
- `POST /users/create`
- `PUT /users/update`
- `DELETE /users/delete`

### 🏰 Attractions

- `GET /attractions`
- `POST /auth/attractions/create` (JWT required)
- `PUT /auth/attractions/update` (JWT required)
- `DELETE /attractions/delete`

### 🐶 Pet Sales

- `GET /pets/7days/{date}` – weekly chart data
- `GET /pets/{date}` – daily sales details

---

## 📊 UI Overview

### 🔝 Header

- Navigation to Users, Attractions, Pet Sales
- Logout functionality

### 📋 Pages

- **Users Table**: CRUD, search, sort, pagination
- **Attractions Table**: Auth-required create/update/delete
  **--->** Note: Attraction is not getting deleted. API implementation is same as of **Users Table**
- **Pet Sales**: Weekly line chart + Daily sales data table

### 📱 Responsive Layout

- Mobile-friendly using Angular Material’s responsive grid

---

---

## ✅ Form Validation

- Reactive forms
- Required fields, email validation, etc.
- Shows error messages on invalid inputs

---

## 💥 Error Handling

- User-friendly error messages on failure
- Toasts/snackbars for feedback

---

## Assumptions

- Authentication token (JWT) is stored securely in `sessionStorage` and included in HTTP headers as `Authorization: Bearer <token>`.
- Dates passed to the Pet Sales APIs follow the `YYYY-MM-DD` format.
- The API responses and endpoints follow the documented structure consistently throughout the application lifecycle.

**Your Name**  
Email: jaleeshassan09@gmail.com  
GitHub: [github.com/jaleesabid](https://github.com/jaleesabid)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
