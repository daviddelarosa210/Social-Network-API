# Social-Network-API

## Description

This is a RESTful API for a social network. It allows users to perform various operations, including creating and managing users, thoughts, and reactions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

step 1: Clone Repo

Step 2: run "node server.js"

[![Watch the video]()](https://youtu.be/5Mx6KuMCsW0)

## Usage

- Ensure MongoDB is running and the connection string is properly configured.
- Use an API testing tool like Insomnia or Postman to interact with the API.
- Make requests to the provided endpoints (see [Endpoints](#endpoints)).

## Endpoints

- **Users:**
  - `GET /api/users`: Get all users
  - `GET /api/users/:id`: Get a user by ID
  - `POST /api/users`: Create a new user
  - `PUT /api/users/:id`: Update a user
  - `DELETE /api/users/:id`: Delete a user
  - `POST /api/users/:userId/friends/:friendId`: Add a friend
  - `DELETE /api/users/:userId/friends/:friendId`: Remove a friend

- **Thoughts:**
  - `GET /api/thoughts`: Get all thoughts
  - `GET /api/thoughts/:id`: Get a thought by ID
  - `POST /api/thoughts`: Create a new thought
  - `PUT /api/thoughts/:id`: Update a thought
  - `DELETE /api/thoughts/:id`: Delete a thought
  - `POST /api/thoughts/:thoughtId/reactions`: Add a reaction to a thought
  - `DELETE /api/thoughts/:thoughtId/reactions`: Remove a reaction from a thought


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
