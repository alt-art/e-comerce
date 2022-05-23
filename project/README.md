# e-commerce

The idea is to create a simple e-commerce API that can support cryptocurrency payments.

## Features

### User

- [x] Register a new user
- [x] Login
- [x] Delete user

### Product

- [x] Create a new product
- [x] Get all products
- [x] Get a product by id
- [x] Update a product
- [x] Delete a product

### Order

- [x] Create a new order
- [ ] Get an order by id
- [ ] Update an order
- [x] Delete an order

## API Documentation

You can find the documentation of the API [here](https://documenter.getpostman.com/view/16429730/UyxoijU7).

## Requirements

You need to have coinmarketcap API Token to use the API, you can get it [here](https://pro.coinmarketcap.com/signup/) or use the one provided in the `.env.example`.

MySQL database is required to store the data.
You can make a docker image with the following command:

```sh
docker run -d -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=admin mysql:latest
```

## Running the API

### Development:

```sh
yarn prisma migrate deploy
yarn dev
```

### Deployment:

```sh
yarn start
yarn deploy
```

or

```sh
docker-compose up
```

## Seed data

On `docker-compose up`, the database is seeded
with the following command:

```sh
docker-compose exec -d server yarn prisma db seed
```

Else, you can seed the database with the following command:

```sh
yarn prisma db seed
```

## Tools and dependencies

- Node.js
- TypeScript
- Prisma
- MySQL
- Express
- Coinmarketcap API
