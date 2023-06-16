# Cloudhosted To-do List Web App with MongoDB's Atlas <img src="https://www.svgrepo.com/show/331488/mongodb.svg" width="40" height="40">
![Capture](https://github.com/ghubnerr/practice-to-do-list-cloudhosted/assets/91924667/5ab7fa3c-2773-482b-83fd-5417297fe992)

This is a simple to-do list application built using Node.js, Express, and MongoDB. It lets people create multiple to-do lists and manage tasks within each list. The application is hosted at https://sore-rose-antelope-vest.cyclic.app/.
## MongoDB Atlas
This app uses MongoDB Atlas, a cloud-based database service that makes it easy to store, manage, and retrieve data for your application. You can sign up for MongoDB Atlas for free at https://www.mongodb.com/cloud/atlas and create a new M0 cluster to get your own connection string. 
## Downloading Locally
Since the cloud-hosted version is connected to the same Atlas database, you won't be able to maintain privacy concerns when handling your To-do items. For now, you will want to setup your own application for that.
### Prerequisites
- Node.js installed on your machine;
- A MongoDB database connection string;

### Installation
1. Clone the repository or download .zip version
```git clone https://github.com/ghubnerr/practice-to-do-list-cloudhosted```
2. Run `npm install` to install the package dependencies

### Setting up MongoDB Environment Variable
1. Rename the `.env_sample` file to `.env`
2. Edit the `.env` file and replace <YOUR MONGODB CONNECTION STRING> with your actual MongoDB connection string -- local or cloudhosted (SRV)
  
### Usage
Run `node app.js` from the project directory. The application will be accessible at `http://localhost:3000/`. You could also install `npm i -g nodemon` and run `nodemon app.js` to save server restart time.
  
## Custom Lists
You can create custom to-do lists by appending the list name to the base URL (e.g., `https://sore-rose-antelope-vest.cyclic.app/mylist`). If a custom list doesn't exist, it will be created automatically, and three default tasks will be added. You can manage tasks within each custom list using the same functionality as the homepage.
