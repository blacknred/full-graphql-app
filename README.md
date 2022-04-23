# Posting app

Simple social posting app with both rest and graphql api servers

## Architecture

| Services            | Container     | Stack                      | Ports |
| ------------------- | --------------| -------------------------- | ----- |
| DB                  | db            | Postgres                   | 5432  |
| Cache               | cache         | Redis                      | 6379  |
| Web client          | client        | TS, NextJS, Urql, ChakraUI | 3000  |
| API service         | graphql-api   | TS, Koa, Http, GraphQL     | 8080  |
<!-- | API service         | rest-api      | TS, Koa, Http              | 8080  | -->

## Run the project

### Setup

1. Fork/Clone this repo

1. Download [Docker](https://docs.docker.com/docker-for-mac/install/) (if necessary)

### Build and Run the App

1. Set the Environment variables in .env.dev

1. Fire up the Containers

   ```sh
   make network
   make dev-check
   make dev
   ```

### Production

1. Set the Environment variables in .env

1. Run the containers:

   ```sh
   make network
   make prod-build
   make prod
   ```
