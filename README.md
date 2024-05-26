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

// 2. Add User Group?
// endpoint : http://localhost:3000/api/groups
//method : POST
// body : {
//   "name": "Jumping",
//   "users": [<UserId>]
// }

// 3. Add Users to Group?
// endpoint : http://localhost:3000/api/groups/<GroudId>/users
//method : PUT
// body : {
//   "users": [<UserId>]
// }

// 3. List Users in a group?
//method : GET
// endpoint : http://localhost:3000/api/groups/users?groupId=<GroupId>

// 4. List Whole Users?
//method : GET
// endpoint : http://localhost:3000/api/groups/users

// 5. Create slot with slot name , date , starttime?
// endpoint : http://localhost:3000/api/slots
//method : POST
//body : {
//   "name": "Cleaning",
//   "date": "2024-05-25",
//   "startTime": "2024-05-25T08:00:00Z",
//   "endTime": "2024-05-25T09:00:00Z",
//   "users": [<UserId>] // Array of user IDs (optional)
// }

//6. List Whole slots in our system ?

//endpoint : http://localhost:3000/api/slots
//method : GET

