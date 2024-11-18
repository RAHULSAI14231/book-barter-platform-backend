# Book Barter Platform - Backend NodeJS Application

This repository contains the backend application for the Book Exchange Platform. The backend is built using Node.js, Express, and MongoDB to provide APIs for user authentication, book management, pagination and search functionality.

# Features

## User Authentication
* Secure user registration with email and password.
* Encrypted password storage for enhanced security.
* Password recovery functionality for resetting forgotten passwords.
* User login/logout functionality.

## Book Listing
* Add, edit, and delete books in the user’s profile.
* Provide detailed book information such as title, author, genre, condition, and availability.
* Display user’s book listings and allow others to browse and request listed books.
* Paginated requests based on user choice of limit per page to handle large datasets.

## Book Search
* Search books by title, author, genre or condition.
* View detailed information about books from search results.
* Pagination or incremental loading for smooth browsing of large datasets.


# Technologies Used
* Node.js: JavaScript runtime for building scalable server-side applications.
* Express.js: Framework for building the API endpoints.
* MongoDB: NoSQL database for storing user and book data.
* Mongoose: ODM for MongoDB to interact with the database.
* JWT: For secure authentication and session management.
* Nodemailer: For sending password recovery emails.
* dotenv: For environment variable management.

# Steps to run locally

## Clone the Repository
* Run `git clone https://github.com/RAHULSAI14231/book-barter-platform-backend.git`

## Change the directory to book-barter-platform-backend
* Run `cd book-barter-platform-backend`

## Install Dependencies
`npm install`

## Update the variables in config.env file under config folder
`MONGO_URI=MONGODB_URI`

`JWT_SECRET=ksbdajkf68998767jkkjafxvsdabxzcm`

`JWT_EXPIRE=1h`

`JWT_COOKIE_EXPIRE=1h`

## Run the Development Server
`npm run start`

## Test the Application in Postman
`http://localhost:3000/apiEndpoints`
