# API Minehaul Express

This is a Node.js backend application built with Express.js and TypeScript, designed to manage and serve API endpoints for a mining haulage system.

## Features

- **TypeScript**: Leveraging TypeScript for type safety and better developer experience.
- **JWT Authentication**: Implements JSON Web Tokens for secure authentication.
- **PostgreSQL ORM**: Uses an ORM to interact with a PostgreSQL database.
- **API Versioning**: Supports versioning to maintain backward compatibility.
- **Docker**: Contains Docker configurations for containerized deployment.

## Project Structure

    api-minehaul-express/
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middlewares/
    │   ├── models/
    │   ├── requests/
    │   ├── routes/
    │   │   └── v1/
    │   ├── services/
    │   └── utils/
    ├── .env.example
    ├── Dockerfile
    ├── docker-compose.yml
    ├── package.json
    └── tsconfig.json

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Afatkharrofiqi/api-minehaul-express.git
   cd api-minehaul-express
   ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables copy **.env.example** to **.env** and update the necessary
    ```bash
    DB_HOST=postgres-db
    DB_PORT=5432
    DB_USERNAME=user
    DB_PASSWORD=pass
    DB_NAME=minehaul
    DB_SYNCHRONIZE=true

    JWT_SECRET=secret
    JWT_REFRESH_SECRET=refreshsecret

    PORT=3000
    
    MQTT_BROKER_URL=mqtt://mqtt
    ```

4. Run the application:
    ```bash
    npm run start:dev 
    ```

## Docker Deployment

1. Build and run the containers:
   ```bash
   docker-compose up --build -d
   ```

2. Access the API at http://localhost:3000

## Usage

- Authentication
    - Obtain a JWT token via the **api/v1/auth/login** or **api/v1/auth/register** endpoint.
    - Use the token to access secured endpoints.

- Versioned API:
    - Access versioned endpoints using /v1/, /v2/, etc.

## Contributing
1. Fork the repository.
2. Create a feature branch (git checkout -b feature-branch).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature-branch).
5. Open a Pull Request.