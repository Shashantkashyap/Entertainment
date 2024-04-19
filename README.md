# Entertainment Web App

## Overview
Entertainment is a web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to explore movies and TV series, view details about them, watch trailers, and bookmark 
their favorite content. The application integrates with third-party APIs like TMDB and IMDB for fetching movie and TV series data, and YouTube API for viewing trailers.

## Features
- **User Authentication**: Implemented user authentication using bcrypt for password hashing and JWT tokens for secure authorization.
- **Home Page**: The home page features recommended and trending sections displayed on a carousel for an engaging user experience.
- **Popular Movie and TV Series Sections**: Separate sections for popular movies and TV series to easily discover trending content.
- **Details Page**: Provides comprehensive details about movies and TV series, including synopsis, ratings, cast, and options to visit the official website and view trailers.
- **Bookmarking**: Users can add or remove bookmarks for their favorite movies and TV series.
- **Backend Routes**: Backend routes are implemented for functionalities like adding bookmarks and user authentication.
- **Third-party Integrations**: Integration with TMDB API for fetching movie and TV series data, IMDB API for additional details, and YouTube API for watching trailers.

## Technologies Used
- MongoDB: Database for storing user data, movie, and TV series information.
- Express.js: Backend framework for routing and API handling.
- React.js: Frontend framework for building user interfaces.
- Node.js: JavaScript runtime for executing server-side code.
- TMDB API: For fetching movie and TV series data.
- IMDB API: For additional details about movies and TV series.
- YouTube API: For watching trailers.
- bcrypt: For password hashing.
- JWT: For secure user authentication.

  ## Database Schema :
          +------------+            +------------+
        |   User     |            |  Bookmark  |
        +------------+            +------------+
        | _id: ObjectId|            | _id: ObjectId|
        | email: String|            | userId: String|
        | password: String|         | bookmarkedIds: [String]|
        +------------+            +------------+


## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Entertainment

  ## Install dependencies:
  npm install

  
  ## Set up environment variables:
  PORT=3000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
TMDB_API_KEY=<your-tmdb-api-key>
IMDB_API_KEY=<your-imdb-api-key>
YOUTUBE_API_KEY=<your-youtube-api-key>

## License :

Feel free to customize it further to better suit your project's style and requirements! Let me know if you need any more assistance.


   
