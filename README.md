# EventXperts

**EventXperts** is an event management platform designed to simplify the organization and tracking of small-scale events. It provides event organizers with tools to manage bookings, handle billing, access a marketplace for event supplies, and showcase galleries of past events. The platform is built with a microservices architecture, making it highly scalable and modular.

## Key Features

1. **Calendar Management**

   - Track booking dates and add event-related information such as auspicious days (Muhurtalu) and Telugu calendar-specific features like Manchirojulu.
   - Organizers can log their event bookings with details like event name, address, contact info, and booking specifics.

2. **User Roles**

   - **User**: Can explore event listings and access services.
   - **Organizer**: Can manage their event bookings, add events to the calendar, and access billing tools.
   - **Store Owner**: Can list products for sale (e.g., decorations, electronics) in the marketplace.
   - **Super Admin**: Manages users and organizers, with additional privileges assigned through Auth0.

3. **Marketplace & Store**

   - A marketplace where users can buy and sell event-related items.
   - A store managed by the platform offering decorations, electronic items, and more.

4. **Gallery**
   - Organizers can upload event photos.
   - Using machine learning, attendees can find photos of events they attended.

## Microservices Architecture

The EventXperts platform follows a microservices architecture to ensure scalability and maintainability. The core services include:

- **API Gateway**: Acts as the central point for routing client requests to the respective services.
- **User Service**: Manages user registration, authentication, and profile management.
- **Calendar Service**: Handles event and booking management, calendar features, and date-specific event tracking.
- **Marketplace Service**: Manages product listings, buying, and selling within the marketplace.
- **Gallery Service**: Allows uploading and managing photos and galleries for events.

## Tech Stack

- **Backend**:

  - Framework: NestJS (Node.js)
  - Database: PostgreSQL
  - Message Broker: Kafka (for asynchronous communication between services)
  - Authentication: Auth0 and RBA [Role based access] (OAuth2, JWT for securing API calls)

- **Frontend**:
  - Framework: Flutter (for building cross-platform mobile apps)

## Authentication & Authorization

- **Auth0** is used for managing authentication and authorization. Users can register and log in via the API Gateway, where their roles (User, Organizer, Store Owner) are assigned during registration.
- **Admin roles** are managed through the Auth0 dashboard and have elevated privileges.

## Communication Between Services

- Services communicate via **Kafka**, ensuring decoupled and asynchronous communication.
- The **API Gateway** handles client requests and forwards them to the appropriate services using Apollo Grahpql (Gateway).
