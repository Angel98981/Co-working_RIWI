<p align="center">
  <img src="https://riwi.io/wp-content/uploads/2023/07/Fondo-claro-logo.png" width="500" alt="Nest Logo" />
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  

## Description

<p align="center">This project aims to develop a backend API using NestJs and TyperoORM to manage the reservation of workspaces in a coworking. Users will be able to reserve spaces for specific sessions, which will facilitate the management of space occupancy and improve the user experience.</p>
    <p align="center">

## Key Features

1. **Project Configuration**:
 - Use of NestJS with TypeScript.
 - Application of the MVC (Model-View-Controller) design pattern following the NestJS conventions.

2. **Integration with the Database**:
 - API connection with a PostgreSQL database.
 - Use of TypeORM as ORM for interaction with the database.

3. **API Endpoints**:
 - Get the list of workspaces available in a room for a specific session.
 - Get the list of occupied workspaces in a room for a specific session.
 - Get the sessions ordered by the busiest.
 - Get the sessions ordered by the most available.
 - Get the list of workspaces assigned to a user.
 - Get the list of workspaces assigned to a session.

4. **Data Validation**:
 - Implemented data validation in API requests using `class-validator` and `class-transformer`.
 - Proper handling of validation errors and other errors, returning appropriate HTTP responses.

5. **Documentation**:
 - Clear README with instructions to configure and run the project locally.
 - Interactive documentation of API endpoints using Swagger/OpenAPI.

6. **Tests**:
 - Implementation of functional tests for the API, demonstrated through a video with Postman.

7. **GitFlow and Good Development Practices**:
 - GitFlow workflow tracking for code branch and version management.
 - Application of SOLID design principles and other good practices to maintain clean, maintainable and scalable code.

8. **Deployment**:
 - Preparation of the project for deployment in a production environment and deployment from the `main` branch.


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

unit tests are not performed

## Swagger

http://localhost:3000/api-doc#/

## DB Connection

I'm using Vercel.

### .env

```env
DB_CONNECTION=postgres
DB_HOST=ep-rapid-truth-a4ucx8hj-pooler.us-east-1.aws.neon.tech
DB_PORT=5432
DB_NAME=verceldb
DB_USER=default
DB_PASSWORD=7ahto4HQByIN
