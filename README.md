# Finance Tracker App

A full-stack **Finance Tracker** application built with **React**, **Redux Toolkit**, **Firebase Authentication**, **Node.js**, **Express**, **MongoDB**, and **Tailwind CSS**.  
This app allows users to track income and expenses, manage transactions, and visualize their spending.

---

## **Table of Contents**

1. [Features](#features)  
2. [Technologies](#technologies)  
3. [Project Structure](#project-structure)  
4. [Backend Setup](#backend-setup)  
5. [Frontend Setup](#frontend-setup)  
6. [Usage](#usage)  
7. [Screenshots](#screenshots)  
8. [Future Enhancements](#future-enhancements)  

---

## **Features**

### Authentication
- Sign in with **Google** using Firebase Authentication  
- Stores token securely in Redux state  
- Redirects to transactions page after login  

### Transaction Management
- Add, update, delete transactions  
- Required fields: **date, description, category, amount, type (income/expense)**  
- Transactions are associated with the logged-in user  

### Transaction Search & Filter
- Search by description  
- Filter by category, date range, amount  
- Sort by date, amount, or category  

### Data Visualization
- Pie chart for expense breakdown by category  
- Bar chart for monthly spending trends  
- Uses Chart.js for interactive charts  

### Themes
- Light/Dark mode toggle  
- Color-coded categories  
- Accessibility improvements  

### Data Import/Export
- Import from bank CSV files  
- Backup and restore transactions  
- Data migration tool  

---

## **Technologies**

**Frontend**
- React.js with functional components  
- Redux Toolkit for state management  
- React Router v6 for navigation  
- Tailwind CSS for responsive styling  
- Firebase Authentication (Google Sign-In)  
- React Icons for icons  
- Chart.js for charts  

**Backend**
- Node.js with Express.js  
- MongoDB + Mongoose for database  
- JWT for user authentication (Firebase token verification)  
- REST API for transaction management  

---

## **Project Structure**

**Frontend**
