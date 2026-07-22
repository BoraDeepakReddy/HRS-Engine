# HRS-Engine

## Hotel Reservation System

HRS-Engine is a Hotel Reservation System developed using Spring Boot. The project is designed to manage hotels, rooms, customers, reservations, and payments through RESTful APIs. The application follows a layered architecture using Entity, Repository, Service, and Controller layers.

---

# Project Objective

The objective of this project is to build a scalable Hotel Reservation System that allows administrators to manage hotels and rooms while enabling customers to book rooms efficiently.

---

# Tech Stack

- Java 21
- Spring Boot 4.1.0
- Spring Data JPA
- Hibernate ORM
- PostgreSQL
- Maven
- REST APIs
- Postman
- Git & GitHub

---

# Project Architecture

```
Client
   │
REST API
   │
Controller Layer
   │
Service Layer
   │
Repository Layer
   │
PostgreSQL Database
```

---

# Project Structure

```
HRS-Engine
│
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com.infotact.hrs
│   │   │       ├── controller
│   │   │       │      ├── HotelController.java
│   │   │       │      ├── RoomController.java
│   │   │       │      ├── CustomerController.java
│   │   │       │      ├── ReservationController.java
│   │   │       │      └── PaymentController.java
│   │   │       │
│   │   │       ├── entity
│   │   │       │      ├── Hotel.java
│   │   │       │      ├── Room.java
│   │   │       │      ├── Customer.java
│   │   │       │      ├── Reservation.java
│   │   │       │      └── Payment.java
│   │   │       │
│   │   │       ├── repository
│   │   │       ├── service
│   │   │       └── HrsEngineApplication.java
│   │   │
│   │   └── resources
│   │          └── application.properties
│   │
│   └── test
│
├── pom.xml
├── mvnw
├── mvnw.cmd
└── README.md
```

---

# Modules

## 1. Hotel Module

### Features

- Add Hotel
- View All Hotels
- View Hotel by ID
- Update Hotel
- Delete Hotel
- Hotel Validation

### APIs

| Method | Endpoint |
|---------|-----------|
| POST | /api/hotels |
| GET | /api/hotels |
| GET | /api/hotels/{id} |
| PUT | /api/hotels/{id} |
| DELETE | /api/hotels/{id} |

---

## 2. Room Module

### Features

- Add Room
- View All Rooms
- View Room by ID
- Update Room
- Delete Room

### APIs

| Method | Endpoint |
|---------|-----------|
| POST | /api/rooms |
| GET | /api/rooms |
| GET | /api/rooms/{id} |
| PUT | /api/rooms/{id} |
| DELETE | /api/rooms/{id} |

---

## 3. Customer Module (Upcoming)

### Planned Features

- Add Customer
- View Customers
- Update Customer
- Delete Customer

---

## 4. Reservation Module (Upcoming)

### Planned Features

- Book Room
- Cancel Reservation
- Check Availability
- Reservation History

---

## 5. Payment Module (Upcoming)

### Planned Features

- Payment Processing
- Payment Status
- Payment History

---

# Sample Request

## Add Hotel

```json
{
  "hotelName": "Taj Hotel",
  "location": "Hyderabad",
  "totalRooms": 120
}
```

---

## Add Room

```json
{
  "roomNumber": "101",
  "roomType": "Deluxe",
  "pricePerNight": 3500,
  "available": true
}
```

---

# Database

**Database:** PostgreSQL

**Database Name:**

```
hrs_db
```

### Tables

- hotels
- rooms
- customers (planned)
- reservations (planned)
- payments (planned)

---

# Current Project Status

### Completed

- Spring Boot Setup
- PostgreSQL Configuration
- Hotel Module
- Hotel CRUD APIs
- Hotel Validation
- Room Module
- Room CRUD APIs
- Postman Testing

### In Progress

- Customer Module

### Planned

- Reservation Module
- Payment Module
- Authentication & Authorization
- Exception Handling
- Swagger API Documentation
- Unit Testing
- Docker Deployment

---

# Future Enhancements

- JWT Authentication
- Role-Based Access Control
- Email Notifications
- Online Payment Gateway
- Room Availability Calendar
- Reports & Analytics
- Cloud Deployment

---

# Developed By

**Bora Deepak Reddy**

Intern – Infotact Solutions

---

# License

This project is developed for learning and internship purposes.
