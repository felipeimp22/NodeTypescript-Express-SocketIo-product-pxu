# Project pixel union Documentation

## Running the Project in a DevContainer

Follow these steps to run the project using a DevContainer in Visual Studio Code.

### Prerequisites
1. **Visual Studio Code (VS Code)** with the **Remote - Containers** extension installed.
2. **Docker** installed and running on your machine.

### Running the Project

1. **Open the Project in VS Code:**
2. - Certify that you are in the root of the project
   - Open Visual Studio Code.
   - Open the project folder.

2. **Reopen in DevContainer:**
   - Press `F1` to open the command palette.
   - Type and select `Remote-Containers: Reopen in Container`.

3. **Wait for the Container to Build and Start:**
   - VS Code will automatically build the Docker container and open the project inside it.
   - This process may take a few minutes.
 
4. **Debug Application: **
   - In vscode side menu you will see the Debugger or press `ctrn + shift + D`.
   - In the top of menu you can see RUN AND DEBUG with a name `Attach to Node.js` so you can press and attach your breakpoint in the code to start Debugging 

## Running the Project with Docker-compose
Follow these steps to run the project using a Docker-compose.
### Prerequisites
1. **Docker** installed and running on your machine.

1. **Open the Project in VS Code or in bash:**
   - Certify that you are in the root of the project
   - There is a Makefile in project so you can run `$ make all `

2. **(Opitional) Open the Project in VS Code or in bash:**
   - Certify that you are in the root of the project
   - There is a Makefile in the project so you can run each command individually depending on your need.

## Running the Project Locally without Docker
Follow these steps to run the project locally without Docker.
### Prerequisites
1. **npm and nodejs** you can install following the steps of the documentation : `https://nodejs.org/en/download/package-manager`

1. **Open the Project in VS Code or in bash:**
   - Certify that you are in the root of the project
   - Now you can run `$ npm install `
   - Once all dependences was intalled you can run `$ npm run dev `
   - OBSERVATION: Unfortunatelly if you run this way, you have to config manually the data base, so you can go to .env and change the  values of credentials `APP_DB_USER, APP_DB_PASSWORD, APP_DB_HOST, APP_DB_PORT, APP_DB_NAME`to some valid mongodb credential of your preference.


## Swagger Documentation

### Swagger Integration

This project includes Swagger for API documentation and exploration. Swagger is integrated to provide a user-friendly interface to interact with the API endpoints.

### Accessing Swagger UI

To access the Swagger UI:

- Start the application locally.
- Open your web browser.
- Navigate to `http://localhost:{port}/docs`.

Replace `{port}` with the port number where your application is running locally, default is `3001`.

### Using Swagger UI

Once you access the Swagger UI:

- You will see a list of available API endpoints.
- Explore each endpoint to view details such as request parameters, response formats, and example requests.

Swagger UI provides an interactive way to test API endpoints directly from the browser, making it easier to understand and utilize the API functionalities.


## Using Mongo Express

Mongo Express is a web-based MongoDB admin interface that allows you to interact with your MongoDB databases through a graphical user interface.

### Accessing Mongo Express

To access Mongo Express:

1. Ensure your MongoDB instance is running.
2. Open your web browser and navigate to `http://localhost:8081`.
3. You will be prompted to log in.

### Login Credentials

Use the following credentials to log in:

- **Username:** admin
- **Password:** pass

### Features

Mongo Express provides the following features:

- View and manage databases, collections, and documents.
- Execute queries and view query results.
- Create and delete databases and collections.
- Manage indexes and perform other administrative tasks.


## Application Behavior

This documentation provides an overview of the repository pattern used in the application, including a diagram to illustrate the structure and behavior of the application.

### Repository Pattern

The application follows the repository pattern to manage data persistence and interaction with the database. The general flow is:
1. **User Accesses Routes**: The user makes HTTP requests to defined routes.
2. **Routes Call Controllers**: The routes forward the requests to the appropriate controllers.
3. **Controllers Use Repositories**: When database interaction is necessary, the controllers call methods in the repository.
4. **Repositories Interact with the Database**: The repository methods handle the actual database operations and return the results to the controllers.

Diagram

```plaintext
+-------------------+        +-------------------+        +-------------------+        +-------------------+
|    User Access    |        |     Routes        |        |    Controllers    |        |    Repositories   |
+-------------------+        +-------------------+        +-------------------+        +-------------------+
        |                           |                           |                           |
        |---- HTTP Request -------> |                           |                           |
        |                           |                           |                           |
        |                           |---- Call Controller ----> |                           |
        |                           |                           |                           |
        |                           |                           |---- Call Repository ----> |
        |                           |                           |                           |
        |                           |                           |                           |
        |                           |                           | <--- Return Data/Result --|
        |                           | <--- Return Response ---- |                           |
        | <--- Return Response ---- |                           |                           |
+-------------------+        +-------------------+        +-------------------+        +-------------------+
|    User Interface |        |   Web Interface   |        |   Business Logic  |        |    Data Access    |
+-------------------+        +-------------------+        +-------------------+        +-------------------+
```


## Containers Overview

1. **API Container**: Main backend application handling HTTP requests, business logic, and MongoDB interactions.
2. **MongoDB Container**: NoSQL database for storing application data.
3. **Mongo Express Container**: Web-based MongoDB admin interface.

## Diagram


```plaintext
+-------------------+        +-------------------+        +-------------------+
|   API Container   |        | MongoDB Container |        | Mongo Express     |
|                   |        |                   |        | Container         |
|  HTTP requests,   |        |  NoSQL database   |        | Web admin         |
|  business logic,  |        |  storage          |        | interface         |
|  MongoDB          |        |                   |        |                   |
|  interactions     |        |                   |        |                   |
+-------------------+        +-------------------+        +-------------------+
```
## API Testing with Jest

### Jest Integration

This API project utilizes Jest, a popular JavaScript testing framework, for testing purposes. Jest is configured to handle unit tests, integration tests, and other types of tests as part of the development process.

### Running Tests

To run the tests using Jest:

1. Make sure your application is set up and running locally.
2. Open a terminal or command prompt.
3. Navigate to the root directory of your project.
4. Run the following command:

   ```bash
     npm run test
    ```

# API Routes Documentation

## Overview

This document outlines the routes available in the API server.
- local address: http://localhost:3001/
- The endpoints are categorized into three main sections: **Product**, **User**, and **Auth** routes.

## `/` Route

### Description

- **GET** `/`
  - Endpoint for health check.
  - Calls `HealthCheckController.healthCheck` to verify API availability.

## `/product` Routes

### Description

# API Documentation

---

## Product Routes

### GET `/product`
- **Description**: Retrieves all products with support for pagination, filters, and sorting.
- **Query Parameters**:
  - `page` (integer, optional): Page number for pagination (default: 1).
  - `limit` (integer, optional): Number of products per page (default: 10).
  - `filter` (string, optional): Filter by product title (case insensitive).
  - `date` (string, optional): Sort by date (`newest` or `oldest`).
  - `inventory` (string, optional): Filter by inventory status (`available`, `soldout`).
- **Responses**:
  - `200`: Returns a list of products.
  - `400`: Bad request.
  - `500`: Internal server error.

### GET `/product/{id}`
- **Description**: Retrieves a product by its ID.
- **Path Parameter**:
  - `id` (string, required): The ID of the product.
- **Responses**:
  - `200`: Returns the product data.
  - `404`: Product not found.
  - `500`: Internal server error.

### POST `/product`
- **Description**: Creates a new product.
- **Request Body**:
  - `title` (string, required): The title of the product.
  - `price` (number, required): The price of the product.
  - `inventory` (number, required): Quantity of the product in stock.
- **Responses**:
  - `201`: Product created successfully.
  - `400`: Bad request.
  - `500`: Internal server error.

### POST `/product/{id}/upload`
- **Description**: Uploads one or more images for a product.
- **Path Parameter**:
  - `id` (string, required): The ID of the product.
- **Request Body**:
  - `file` (multipart/form-data): One or more image files to upload.
- **Responses**:
  - `200`: Images uploaded successfully.
  - `404`: Product not found.
  - `500`: Internal server error.

### POST `/product/buy`
- **Description**: Purchases one or more products and decreases inventory.
- **Request Body**:
  - `productId` (string, required): ID of the product to buy.
  - `quantity` (number, required): Quantity to purchase.
- **Responses**:
  - `200`: Products purchased successfully.
  - `400`: Bad request or insufficient inventory.
  - `404`: Product or User not found.
  - `500`: Internal server error.

### DELETE `/product/{id}`
- **Description**: Deletes a product by its ID.
- **Path Parameter**:
  - `id` (string, required): The ID of the product.
- **Responses**:
  - `200`: Product deleted successfully.
  - `404`: Product not found.
  - `500`: Internal server error.

---

## User Routes

### GET `/user`
- **Description**: Retrieves all users with pagination support.
- **Query Parameters**:
  - `page` (integer, optional): Page number for pagination.
  - `limit` (integer, optional): Number of users per page.
- **Responses**:
  - `200`: Returns a list of users.
  - `500`: Internal server error.

### GET `/user/me`
- **Description**: Retrieves the authenticated user's information.
- **Responses**:
  - `200`: Returns user information.
  - `404`: User not found.
  - `500`: Internal server error.

### GET `/user/{id}`
- **Description**: Retrieves a user by their ID.
- **Path Parameter**:
  - `id` (string, required): The ID of the user.
- **Responses**:
  - `200`: Returns user data.
  - `404`: User not found.
  - `500`: Internal server error.

### DELETE `/user/{id}`
- **Description**: Deletes a user by their ID.
- **Path Parameter**:
  - `id` (string, required): The ID of the user.
- **Responses**:
  - `200`: User deleted successfully.
  - `404`: User not found.
  - `500`: Internal server error.

---

## Auth Routes

### POST `/auth/register`
- **Description**: Registers a new user.
- **Request Body**:
  - `email` (string, required): Email of the new user.
  - `password` (string, required): Password for the new user.
- **Responses**:
  - `201`: User registered successfully.
  - `400`: Invalid request body.
  - `500`: Internal server error.

### POST `/auth/login`
- **Description**: Authenticates a user and returns a JWT token.
- **Request Body**:
  - `email` (string, required): Email of the user.
  - `password` (string, required): Password of the user.
- **Responses**:
  - `200`: Returns a JWT token on successful authentication.
  - `401`: Invalid credentials.
  - `500`: Internal server error.

---

## Notes
- All protected routes require the `Authorization` header with a valid JWT token.
- This documentation is auto-generated from Swagger annotations in the routes.

