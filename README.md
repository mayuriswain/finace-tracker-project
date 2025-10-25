# Finance Tracker App

A full-stack **Finance Tracker** application built with **React**, **Redux Toolkit**, **Firebase Authentication**, **Node.js**, **Express**, **MongoDB**, and **Tailwind CSS**.  
This app allows users to track income and expenses, manage transactions, search/filter transactions, visualize spending, and import/export data.

---

## Table of Contents

1. [Features](#features)  
2. [Technologies](#technologies)  
3. [Frontend Flow](#frontend-flow)  
4. [Backend Flow](#backend-flow)  
5. [Project Structure](#project-structure)  
6. [Setup Instructions](#setup-instructions)  
7. [Usage](#usage)  
8. [Future Enhancements](#future-enhancements)  

---

## Features

### Authentication
- Sign in with **Google** using Firebase Authentication.  
- Stores token securely in Redux state.  
- Redirects to transactions page after login.

### Transaction Management
- Add, update, delete transactions.  
- Required fields: **date, description, category, amount, type (income/expense)**.  
- Transactions are associated with the logged-in user.

### Transaction Search & Filter
- Search by description.  
- Filter by category, date range, amount.  
- Sort by date, amount, or category.

### Data Visualization
- Pie chart for expense breakdown by category.  
- Bar chart for monthly spending trends.  
- Uses **Chart.js** for interactive charts.

### Themes
- Light/Dark mode toggle.  
- Color-coded categories.  
- Accessibility improvements.

### Data Import/Export
- Import from bank CSV files.  
- Backup and restore transactions.  
- Data migration tool.

---

## Technologies

**Frontend**
- React.js (Functional Components & Hooks)  
- Redux Toolkit for state management  
- React Router v6 for navigation  
- Tailwind CSS for styling  
- Firebase Authentication (Google Sign-In)  
- React Icons for icons  
- Chart.js for data visualization  

**Backend**
- Node.js with Express.js  
- MongoDB + Mongoose for database  
- JWT for user authentication (via Firebase token verification)  
- REST API for transaction management  

---

## Frontend Flow

1. **Login Page**
   - User clicks **Sign in with Google**.
   - Firebase authentication returns user info and token.
   - Token and user info stored in Redux.
   - Redirects to **Transactions Page**.

2. **Transactions Page**
   - Fetches transactions via `fetchTransactions` API call using token.
   - Display transactions in a table.
   - Supports:
     - Add transaction
     - Edit transaction
     - Delete transaction
     - Filter and search transactions
     - Sort by date, amount, or category

3. **Data Visualization**
   - Charts (Pie & Bar) visualize user's spending.
   - Dynamically updates when transactions change.

4. **Themes**
   - User can toggle **Light/Dark mode**.
   - Categories color-coded for easy reading.

5. **Export/Import**
   - Users can export transactions as CSV.
   - Users can import transactions from CSV.
   - Backup and restore data.

---

## Backend Flow

1. **Authentication Middleware**
   - Firebase token sent from frontend.
   - Backend verifies token and extracts user UID.
   - User UID is used to associate transactions.

2. **Transaction Endpoints**
   - `GET /transactions` → Fetch all transactions for logged-in user.
   - `POST /transactions` → Add a new transaction.
   - `PUT /transactions/:id` → Update transaction by ID (only if owned by user).
   - `DELETE /transactions/:id` → Delete transaction by ID (only if owned by user).

3. **Data Validation**
   - Backend ensures all required fields are present: `type, category, amount, description, date`.
   - Returns proper HTTP status codes on success or error.

4. **Database**
   - MongoDB stores transactions with user association.
   - Mongoose schema validates data and ensures referential integrity.

---

## Project Structure

finance-tracker-project/
├── backend/
│ ├── controllers/
│ │ └── transactionController.js
│ ├── models/
│ │ └── Transaction.js
│ ├── routes/
│ │ └── transactionRoutes.js
│ ├── middleware/
│ │ └── authMiddleware.js
│ ├── package.json
│ └── server.js
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Transaction.jsx
│ │ │ └── Login.jsx
│ │ ├── features/
│ │ │ ├── auth/
│ │ │ └── transactions/
│ │ ├── context/
│ │ │ └── ThemeContext.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── package.json
│ └── vite.config.js
└── README.md

---

## Setup Instructions

### Backend
```bash
cd backend
npm install
npm run dev

### Frontend
cd frontend
npm install
npm run dev
Usage

Navigate to the frontend URL (usually http://localhost:5173).

Sign in with Google.

Add, edit, delete transactions.
<img width="752" height="400" alt="image" src="https://github.com/user-attachments/assets/2963251b-caf6-432f-86c4-76f7933dc7b3" />


Filter/search transactions.

View charts for monthly and category-wise spending.

Export or import data as needed.

Toggle between light/dark mode.
