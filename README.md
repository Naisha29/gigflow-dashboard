# GigFlow - Smart Leads Dashboard

GigFlow is a full-stack Next.js application designed to streamline the hiring workflow. It provides an intuitive, Kanban-style dashboard to track and manage candidate leads across various hiring stages. 

## Features

- **Authentication**: Secure login system using `NextAuth.js` with credentials provider and `bcrypt` password hashing.
- **Kanban Dashboard**: Drag-and-drop interface to move leads between stages (New, Contacted, Interviewing, Hired, Rejected).
- **State Management**: Optimized global state management using `Zustand` for instant UI updates and optimistic rendering.
- **REST API**: Robust Next.js API routes handling CRUD operations for leads.
- **Database Relational Mapping**: `Prisma ORM` connected to a local SQLite database, establishing a relationship between Users (Recruiters) and Leads.
- **Modern UI**: Custom CSS with glassmorphism, responsive design, and fluid micro-animations—achieving a premium aesthetic without heavy frameworks.

## Tech Stack

- **Frontend**: Next.js (App Router), React, Zustand, Lucide React (Icons), Custom CSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: SQLite, Prisma ORM

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-github-repo-link>
   cd gigflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - No action is needed for the default values (SQLite automatically creates `dev.db`), but verify that `NEXTAUTH_SECRET` is set.
   ```bash
   cp .env.example .env
   ```

4. **Initialize Database**
   Push the Prisma schema to create the SQLite database:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Usage & Seeding Data**
   - Open [http://localhost:3000](http://localhost:3000)
   - You will be redirected to the login page.
   - On the first load, an initial admin user is required. You can trigger the auto-seed process by opening `http://localhost:3000/api/seed` in your browser. This will create:
     - Email: `admin@gigflow.com`
     - Password: `password123`
     - Some initial sample leads.
   - Alternatively, use the **"Seed Database"** button on the dashboard once logged in (if you manually created a user).

## Assignment Submission Checklist

- [x] Clean, well-structured code
- [x] Backend logic & Database relationships (Prisma)
- [x] Authentication (NextAuth.js)
- [x] State Management (Zustand)
- [x] README.md with setup instructions
- [x] .env.example file

Enjoy using GigFlow!
