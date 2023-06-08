# Todo Service 📝

The Todo Service is a microservice built with NestJS and MongoDB that handles the management of todos. It integrates with the API Gateway through Kafka topics, allowing seamless communication between microservices.

## Features ✨

- Create, read, update, and delete todos.
- Mark todos as complete or incomplete.

## Architecture 🏰

The Todo Service follows a microservice architecture, where it interacts with other services through Kafka topics. Here's how the system works:

1. 🌐 API Gateway (NestJS): Receives HTTP requests from clients and publishes them as messages to the Kafka topics.
2. 📡 Kafka Topics: Act as a communication channel between microservices, enabling asynchronous and decoupled message passing.
3. 🚀 Todo Service (NestJS): Consumes messages from the Kafka topics and performs the requested actions on the todos.
4. 💾 MongoDB: Stores the todo data persistently, providing efficient and scalable data storage for the service.

## Event Handlers and Kafka Integration 🎯

The Todo Service exposes the following Kafka topics for internal communication:

- `todo.create`: Creates a new todo.
- `todo.find`: Finds todos based on specific criteria.
- `todo.find.one`: Finds a single todo by ID.
- `todo.update`: Updates a todo.
- `todo.delete`: Deletes a todo.

These topics are used by other microservices to send messages to the Todo Service for performing operations on the todos.

## Usage 📝

The Todo Service handles requests through the Kafka stream using event handlers. To interact with the Todo Service, use the following endpoints exposed by the API Gateway:

- `GET /todos`: Retrieves all todos.
- `GET /todos/:id`: Retrieves a todo by ID.
- `POST /todos`: Creates a new todo.
- `PUT /todos/:id`: Updates a todo by ID.
- `DELETE /todos/:id`: Deletes a todo by ID.
- `PATCH /todos/:id/complete`: Marks a todo as complete.
- `PATCH /todos/:id/incomplete`: Marks a todo as incomplete.

The API Gateway translates these HTTP requests into messages published to the corresponding Kafka topics, which are then consumed and processed by the Todo Service.

## Testing 🧪

To run the test suite for the Todo Service, use the following command:

- For Jest tests: `npm test` or `yarn test`

## Contributing 🤝

Contributions to the Todo Service are welcome! If you have any ideas, enhancements, or bug fixes, feel free to submit an issue or a pull request.