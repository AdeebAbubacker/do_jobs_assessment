const express = require('express');
const connectDB = require('./db/connect.js');
const userRoutes = require('./routes/userRoutes/userRoutes.js');
const slotRoutes = require('./routes/slotRoutes/slotRoutes.js');
const groupRoutes = require('./routes/groupRoutes/groupRoutes.js');

const app = express();
app.use(express.json());

connectDB();

app.use('/api', userRoutes);
app.use('/api', slotRoutes);
app.use('/api', groupRoutes);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});


// Assesment Task apis


// 1. Add User with user info ?
// endpoint : http://localhost:3000/api/users
//method : POST
// body : {
//   "username": "Rahul",
//   "email": "Rahul@gmail.com",
//   "password": "Rahul@123",
//   "age": "24"
// }

// 2. GET all users ?
// endpoint : http://localhost:3000/api/users
//method : GET


// 3. Add User Group?
// endpoint : http://localhost:3000/api/groups
//method : POST
// body : {
//   "name": "Jumping",
//   "users": [<UserId>]
// }

// 4. Add Users to Group?
// endpoint : http://localhost:3000/api/groups/<GroudId>/users
//method : PUT
// body : {
//   "users": [<UserId>]
// }

// 5. List Users in a group?
//method : GET
// endpoint : http://localhost:3000/api/groups/users?groupId=<GroupId>


// 6. Create slot with slot name , date , starttime?
// endpoint : http://localhost:3000/api/slots
//method : POST
//body : {
//   "name": "Cleaning",
//   "date": "2024-05-25",
//   "startTime": "2024-05-25T08:00:00Z",
//   "endTime": "2024-05-25T09:00:00Z",
//   "users": [<UserId>] // Array of user IDs (optional)
// }

//7. List Whole slots in our system ?

//endpoint : http://localhost:3000/api/slots
//method : GET

