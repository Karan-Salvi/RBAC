<h1>Project Name: RBAC  DEMO VIDEO LINK https://drive.google.com/file/d/1pbz9hgM1WPQK7MSVk8tBIMuRUzCsZH9r/view?usp=drivesdk</h1> 

Description: A comprehensive user management system built using the MERN (MongoDB, Express, React, Node.js) stack. The system allows administrators to manage users, assign roles, and define permissions.
Key Features:

- User Management: Create, read, update, and delete (CRUD) users
- Role-Based Access Control (RBAC): Assign roles to users and define permissions
- Dynamic Permissions: Assign or modify permissions for roles
- Custom API Simulation (Optional): Mock API calls for CRUD operations on users and role

Technologies Used:

- Frontend: React
- Backend: Node.js (Express)
- Database: MongoDB


Goals:

- Provide a secure and efficient way to manage users and roles
- Implement a flexible and scalable RBAC system
- Offer a user-friendly interface for administrators to manage users and roles

Here's a step-by-step guide to cloning  the project repository and setting it up:

1. Create a new folder: Create a new folder where you want to clone the repository.
2. Open the terminal/command prompt: Open the terminal or command prompt in the new folder.
4. Clone the repository: Run the following command to clone the repository:
git clone https://github.com/Karan-Salvi/RBAC.git

Setting up the Project

1. Navigate to the project folder: After cloning the repository, navigate to the project folder using the `cd` command.
cd repository-name
1. *Install dependencies*: Run the following command to install the dependencies required by the project:
npm install or yarn install
depending on the package manager used in the project.
1. Create a new MongoDB database: Create a new MongoDB database for the project. You can use a local MongoDB instance or a cloud-based MongoDB service like MongoDB Atlas.
2. Configure environment variables: Create a new file named `.env` in the project root and add the following environment variables:
```
DB_URI=mongodb://localhost:27017/database-name
NODE_ENV=development
PORT=8000
```
Replace the `DB_URI` value with the actual connection string for your MongoDB database.
1. *Start the backend server*: Run the following command to start the backend server:
npm run dev or  yarn run dev
depending on the package manager used in the project.
1. Start the frontend development server: Run the following command to start the frontend development server:
npm run dev:client
yarn run dev:client`
depending on the package manager used in the project.

Verify the Setup

1. Open a web browser and navigate to `http://localhost:5173` to verify that the frontend is working correctly.


