# Maple Syrup Management Service

    Overview: Manage maple syrup products selection, cart, and order
    The application is listening on port 8080, for local development this translates to http://localhost:8080

## Prerequisites

##### Development, test & build dependencies

- Docker
- Docker-Compose

##### Runtime dependencies

- NodeJs v12
- npm and npx
- PostgreSQL

**Note**: These services will be pulled & started automatically using docker-compose when running/testing the application locally.

## Testing / Running

Make sure the prerequisites has been statisfied.

## Testing

For first time run, pelase install the package dependencies via the command below:

`npm i`

##### Unit tests

`npm run test`

## Running

`docker-compose build && docker-compose up`

## Developer Note

When developing this app, i have made following assumption:

- Cart

  - A cart can only contain a single product for a given user

- Order

  - For a successful order for a given user, cart will be "consumed" and product max qty will be deducted

- Product
  - Product max qty will be not affected during creating/modification of a cart related to a product, only during a successful order transaction

## TODO

- Integration test
- User controller & service
- JWT based auth
