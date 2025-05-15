# Up2You-Service

Up2You-Service is an intelligent web-based platform designed to help users discover, compare, and manage useful online services. The application offers a personalized and moderated environment where users can search for categorized services, save favorites, add their own, and receive recommendations based on preferences.

## Project Description

In a digital era full of scattered services, Up2You-Service provides a centralized hub where users can:

- Browse verified services across categories
- Receive personalized service recommendations
- Filter and tag services based on their interests
- Add new services to the platform
- Access services quickly through a clean, intuitive interface

This platform aims to simplify the user experience when dealing with online services and promote trusted and useful platforms.

## Technologies Used

### Backend

- **[Node.js](https://nodejs.org/)**  
  A runtime environment for executing JavaScript code on the server. Used for creating a lightweight and scalable backend API.

- **[Express.js](https://expressjs.com/)**  
  A minimal and flexible Node.js web application framework. Used to create the RESTful API for handling routes, services, and users.

- **[MySQL](https://dev.mysql.com/doc/)**  
  A relational database system. Used for storing structured data about users, services, tags, and relationships between them.

- **[Sequelize](https://sequelize.org/)**  
  A promise-based Node.js ORM for MySQL. Used for modeling database tables and handling database queries in a cleaner way.

### Frontend

- **[React.js](https://reactjs.org/)**  
  A JavaScript library for building user interfaces. Used to create a responsive and dynamic frontend with reusable components.

- **[React Router](https://reactrouter.com/)**  
  A routing library for React. Used to manage navigation between pages like homepage, service listings, and detail views.

- **[Axios](https://axios-http.com/)**  
  A promise-based HTTP client. Used to send asynchronous requests to the backend API.

## Features

- **User Authentication**  
  Registration and login for user personalization.

- **Service Recommendations**  
  Recommendation engine based on user-selected tags and preferences.

- **Service Filtering & Tagging**  
  Users can filter services by category, rating, and tags.

- **Favorites & Saved Services**  
  Users can mark services as favorites for quick access.

- **Add Custom Services**  
  Authenticated users can submit new services to the platform.

## Getting Started

1. Clone the repository  
   ```bash
   git clone https://github.com/SheamBest/Up2You-Service.git
2. To run the application locally, you need to open **two terminal windows** and keep them open in the root directory of the project and follow these steps:

### Terminal 1 – Backend (Server)

1. Navigate to the `server` folder:
   ```bash
   cd server
2. Install all dependencies:
   ```bash
   npm install
3. Configure your MySQL database credentials in the following file: `/config/config.json`
4. Start the backend server:
   ```bash
   npm start

### Terminal 2 – Frontend (Client)

1. Navigate to the `client` folder:
   ```bash
   cd client
2. Install all dependencies:
   ```bash
   npm install
3. Start the development server:
   ```bash
   npm run dev
4. Use link `http://localhost:3000` to check the website.


