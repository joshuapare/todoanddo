# The Most Overcomplicated Todo App Ever

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/sbhrule15/todoanddo)](https://github.com/sbhrule15/todoanddo/issues)
[![GitHub stars](https://img.shields.io/github/stars/sbhrule15/todoanddo)](https://github.com/sbhrule15/todoanddo/stargazers)

📝 A whimsical and exaggerated Todo app with a microservices architecture.

## Overview

The app consists of multiple microservices, each serving a specific purpose and implemented using different frameworks and technologies. Here's a brief overview of the microservices and their associated components:

- 🖥️ Frontend (Next.js): The user interface for managing todos.
- ✅ Todo Service (NestJS):
  - 💾 Backend Database: MongoDB for storing and managing todo data.
- 👤 User Service (NestJS):
  - 💾 Backend Database: MySQL database for user data storage.
  - 🚀 Caching: Redis for caching frequently accessed user data.
- 💡 Quote Service (Node.js/Express):
  - 🔗 External API: Fetches inspirational quotes from a public API.
- 🔒 Auth Service (Go Fiber):
  - 🚀 Caching: Redis for caching user authentication tokens.
  - 💾 Backend Database: MySQL for storing user authentication data.
  - 🔐 JWT: JSON Web Tokens for authentication and authorization.
- 📡 Events Service (NestJS):
  - 📶 Socket.IO: Enables real-time event-driven communication between microservices.
  - 🚀 Caching: Redis for storing and retrieving event-related data.

## Getting Started

To run the app, follow these steps:

1. Clone the repository: `git clone https://github.com/sbhrule15/todoanddo.git`
2. Change into the project directory: `cd todoanddo`

### Prerequisites

Make sure you have the following dependencies installed:

- 🐳 Docker: [Install Docker](https://docs.docker.com/get-docker/)
- 🐳 Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

### Starting the Environment

To start the app, run the following command:

```shell
docker-compose up
```

This command will build and start the Docker containers for each microservice, along with the required dependencies.

Once the services are up and running, you can access the frontend at `http://localhost:3000` and begin exploring the Most Overcomplicated Todo App Ever! 🎉

### Additional Commands

- To stop the app, use `docker-compose down`.
- To clean up all containers and volumes, use `docker-compose down --volumes`.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request. Make sure to follow the contribution guidelines specified in the repository.

## License

This project is licensed under the [MIT License](LICENSE). 📝📜
