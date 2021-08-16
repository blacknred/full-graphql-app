# Nodejs graphql server

## Stack

TS, Nodejs, Koa, Postgres, Redis, GraphQL

## Run the project

### Setup

1. Fork/Clone this repo

1. Download [Docker](https://docs.docker.com/docker-for-mac/install/) (if necessary)

### Build and Run the App

1. Build the image:
  
    ```sh
    cd graphql-server
    $ docker build -t graphql-server .
    ```

1. Set the Environment variable

    ```sh
    export NODE_ENV=development
    ```

1. Run the container:

    ```sh
    docker run -it -p 3000:3000 graphql-server
    ```

1. curl `http://localhost:3000`

### Run tests

1. Set the Environment variable:

   ```sh
   export NODE_ENV=test
   ```

1. With the service up, run:

   ```sh
   yarn test
   ```
