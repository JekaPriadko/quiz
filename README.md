# Quiz

## Overview

Test Project

## Getting Started

### Prerequisites

- Docker installed
- Node.js (if applicable)
- Other dependencies...

### Swager

https://localhost:3000/api-docs/

---

## Use Docker

You can also run this app as a Docker container:

### Setting up the Database

Run the database for local work

```bash
docker-compose -f docker-compose-db.yml up -d
```

### Running the Application

```bash
docker-compose up -d
```

### Stopping the Application

```bash
docker-compose down
```

### Note for Docker Users

If using Docker, it's recommended to delete the node_modules directory before running the application.

```bash
# Delete node_modules
rm -rf node_modules
```

---

## SSL Certificate Generation

If your project requires SSL, follow these steps to generate a private key and SSL certificate in folder `server/src/config/https/ssl`.

### Generate a Private Key

```bash
openssl genrsa -out key.pem
```

### Create a CSR (Certificate Signing Request)

```bash
openssl req -new -key key.pem -out csr.pem
```

### Generate the SSL Certificate

```bash
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
```
