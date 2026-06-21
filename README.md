# AI Travel Planner

## Overview

AI Travel Planner is a full-stack web application that helps users generate personalized travel plans using Gemini AI. Users can create trips by providing a destination, duration, budget, and interests. The application generates a complete travel plan including itinerary, hotel recommendations, budget estimation, and packing list.

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* User-specific trip access

### Trip Management

* Create New Trip
* View All Trips
* View Trip Details
* Edit Trip Itinerary
* Delete Trip

### AI-Powered Planning

* AI-generated Day-wise Itinerary
* Hotel Recommendations
* Budget Estimation
* Packing List Suggestions

### Creative Feature

#### Trip Summary Dashboard

A custom feature that provides a quick overview of:

* Destination
* Trip Duration
* Total Activities
* Recommended Hotel
* Estimated Budget

This helps users understand their trip at a glance without reading the entire itinerary.

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JSON Web Token (JWT)
* bcryptjs

### AI Integration

* Google Gemini API

---

## Project Structure

```text
ai-travel-planner
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   └── App.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/meghananeerukattu/ai-travel-planner.git
cd ai-travel-planner
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

Start Backend:

```bash
npm start
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
```

#### Login User

```http
POST /api/auth/login
```

---

### Trips

#### Create Trip

```http
POST /api/trips
```

#### Get All Trips

```http
GET /api/trips
```

#### Get Trip Details

```http
GET /api/trips/:id
```

#### Update Trip

```http
PUT /api/trips/:id
```

#### Delete Trip

```http
DELETE /api/trips/:id
```

---

## Security Features

* JWT-based Authentication
* Protected Routes
* User-specific Data Access
* Password Hashing using bcryptjs
* Environment Variables for Secrets

---

## Future Enhancements

* Weather Integration
* PDF Export
* Map Integration
* Trip Sharing
* Expense Tracking

---


