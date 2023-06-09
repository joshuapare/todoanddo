# 🧑‍💼 User Service

The User service handles user management and related functionalities in the Most Overcomplicated Todo App on the Planet. It allows users to register, retrieve, update, and delete their accounts. The service communicates with the Auth service and Todo service over Kafka for authentication, authorization, and collaboration.

## 🚀 Technologies Used

- NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.
- Sequelize: An ORM (Object-Relational Mapping) for Node.js that provides an easy-to-use API for interacting with MySQL databases.
- MySQL: A popular open-source relational database management system.
- Kafka: A distributed event streaming platform used for inter-service communication and collaboration.

## 📚 Functionality

The User service exposes APIs through the API Gateway and message handlers to perform the following operations:

- User Registration: ✨
  - **Internal Kafka Topic**: `user.create` 
  - **API Route**: `POST /users`

- User Retrieval: 🔍
  - **Internal Kafka Topic**: `user.find`
  - **API Route**: `GET /users`

- User Retrieval by ID: 🔍
  - **Internal Kafka Topic**: `user.find.one`
  - **API Route**: `GET /users/:id`

- User Updates: ✏️
  - **Internal Kafka Topic**: `user.update`
  - **API Route**: `PUT /users/:id`

- User Deletion: ❌
  - **Internal Kafka Topic**: `user.delete`
  - **API Route**: `DELETE /users/:id`

- User Validation: ✅
  - **Internal Kafka Topic**: `user.validate`

These routes can be accessed through the API Gateway, which forwards the requests to the User service via Kafka for processing.

## 📝 Usage

The User service is implemented as a NestJS module with the following components:

- `UserModel`: The Sequelize model representing the User entity and providing the necessary CRUD operations.
- `UserService`: The service layer that encapsulates the business logic for user management operations.
- `UserController`: The controller responsible for handling Kafka messages and orchestrating the service operations.

### 🛣️ API Routes

- `GET /users`: Retrieves a list of all users.
- `GET /users/:id`: Retrieves a specific user by their ID.
- `POST /users`: Creates a new user.
- `PUT /users/:id`: Updates an existing user by their ID.
- `DELETE /users/:id`: Deletes a user by their ID.

These routes can be accessed through the API Gateway, which handles the communication with the User service over Kafka.

## ⚙️ Configuration

To configure the User service, ensure that you have the necessary environment variables set, such as the MySQL database connection details and Kafka configuration. These variables can be defined in a `.env` file or through other means depending on your deployment setup.

## 📦 Dependencies

The User service has the following dependencies:

- NestJS: The core framework for building the service.
- Sequelize: The ORM used for interacting with the MySQL database.
- MySQL: The backend database for storing user information.
- Kafka: The messaging platform for communication between services.

## 🤝 Contributions

Contributions to the User service in the Most Overcomplicated Todo App on the Planet are welcome! If you find any issues or have suggestions for improvements, feel free to submit a pull request or open an issue in the repository.