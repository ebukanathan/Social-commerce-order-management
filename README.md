# Social Commerce Management Platform

> A modern SAAS platform that helps businesses manage products, customers, orders, and social selling activities from a centralized dashboard.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Node.js](https://img.shields.io/badge/postgresql-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)


---

## Overview

The Social Commerce Management Platform is designed to help businesses streamline their social selling operations by combining customer management, product management, order processing, and analytics into a single application.

The project addresses a common challenge faced by modern businesses: managing customer interactions and sales across multiple social channels(whatsapp,instagram,X.com) while maintaining operational efficiency.

This application demonstrates real-world software engineering practices including scalable architecture, role-based access control, API integration, and modern frontend development.

---

## Key Features

### Customer Management

* Customer registration and profile management
* Customer activity tracking
* Purchase history
* Customer segmentation



###  Order Management

* Order creation and processing
* Order status tracking
* Payment monitoring
* Delivery management

###  Analytics Dashboard

* Sales insights
* Revenue tracking
* Customer analytics
* Product performance metrics

###  Authentication & Authorization

* Secure authentication
* JWT-based authorization
* Role-based access control
* Protected routes

###  Notification System

* Customer notifications
* Order updates
* Administrative alerts

---

##  System Architecture

```text
┌────────────────────┐
│     Frontend       │
│   Next.js + React  │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│      API Layer     │
│  Node.js Backend   │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│      Database      │
│ PostgreSQL │
└────────────────────┘
```

---

##  Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* TanStack Query

### Backend

* Node.js
* Express.js / Next.js API Routes

### Database

* PostgreSQL
* Prisma ORM
  

### Authentication

* JWT
* Role-Based Access Control (RBAC)

### Deployment

* Docker
  

---

##  Business Problem Solved

Many small and medium-sized businesses rely heavily on social media to generate sales but struggle with:

* Managing customer inquiries
* Tracking orders
* Monitoring inventory
* Organizing customer data
* Measuring sales performance

This platform provides a centralized solution that improves operational efficiency and customer experience.

---

##  Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/social-commerce-management.git
```

### Navigate into the Project

```bash
cd social-commerce-management
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=
JWT_SECRET=
NEXT_PUBLIC_API_URL=
```

### Start Development Server

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:3000
```

---

##  Project Structure

```text
src/
├── app/
├── components/
├── features/
├── hooks/
├── services/
├── lib/
├── types/
├── utils/
└── middleware/
```

---

##  Future Enhancements

* AI-powered customer support
* AI product recommendations
* WhatsApp integration
* Social media integrations
* Automated lead qualification
* Workflow automation using n8n
* Advanced reporting dashboard

---

## Technical Highlights

This project demonstrates:

* Full-stack application development
* API design and integration
* Authentication and authorization
* Database design
* State management
* Responsive UI development
* Scalable architecture principles

---

##  Screenshots

Add screenshots here to showcase:

* Dashboard
* Customer Management
* Product Management
* Analytics
* Order Management

Example:

```md
![Dashboard](./screenshots/dashboard.png)
```

---

## Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the project and submit a pull request.

---

## Author

### Ebuka Nathan

Full Stack Developer | AI Automation Enthusiast | Cloud Learner


* LinkedIn:https://www.linkedin.com/in/ebuka-ezeuchenne/
* Email: ebukanathan@gmail.com

---

## Why This Project Matters

This project showcases the ability to design and build a production-oriented business application while applying modern software engineering practices and solving real-world commercial problems.

