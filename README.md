# Shopmate
Shopmate is an  e-commerce system which allows users to search, add items to their shopping cart, create order and checkout successfully.

## Hosted Application
https://shop-o-mate.herokuapp.com/

## Installation
1. Clone the repo and cd into it
```
git clone https://github.com/Orelongz/shopmate.git
cd shopmate
```

2. Install all dependencies
```
npm install
```

3. Configure Postgres
```
configure your database settings for development and test in
`./src/server/config/config.js` using .env.example file template
```

4.  Create the database
```
mysql -u root
create database shopmate;
exit;
```

5. Load the database schema
```
 mysql -u root shopmate < ./shopmate.sql
```

6. Start the app
  ```
  npm run dev
  ```
  application would be running on http://localhost:8000/ with a server proxy on http://localhost:4000/

  ```
  npm start
  ```
  application would be running on http://localhost:4000/

7. Run the application on browser
  ```
  http://localhost:8000/
  ```    
  if running `dev`, the server would be on proxy port `4000`

## Features

- Users can see all items when entering the website
- Items are displayed properly based on the selected department and category
- Users can search items through search box
- Support paging if we have to many items
- Users can see item details by selecting a specific item
- Users can add items to their shopping carts
- Users can register/login using website custom forms
- Users can checkout with 3rd party payment Stripe
- Users will get confirmations over emails about placed order


## Testing
Testing is done using:
`Mocha`, `Chai` and `Chai-Http` for backend testing,
`Enzyme` and `Jest` for frontend testing

- `npm run test:server` - for backend testing
- `npm run test:client` - for client testing

## Directories

#### Client
This folder hosts the Client Side implementation (using React/Redux) powered by the Server Side backend

#### Server
This directory holds all business logic that powers the frontend of the application

## Built With
* [NodeJS](https://nodejs.org/en/) - A Javascript runtime built on chrome V8 engine that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
* [ExpressJs](https://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [Sequelize](http://docs.sequelizejs.com/) - An ORM for Node.js that supports the dialects of PostgreSQL and features solid transaction support an relations.
* [MySql](https://www.mysql.com/) - The most comprehensive set of advanced features, management tools and technical support to achieve the highest levels of MySQL scalability, security, reliability, and uptime.
* [React](https://www.reactjs.org/) - A JavaScript library for building user interfaces by Facebook.
* [Redux](http://redux.js.org/) - A predictable state container for JavaScript apps.


## Acknowledgments
* Font Awesome Icons
* ReactJS
* ReduxJS
