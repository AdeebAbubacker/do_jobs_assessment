# Assessment Task APIs

## 1. Add User with user info
- **Endpoint**: `POST http://localhost:3000/api/users`
- **Body**:
  ```json
  {
    "username": "Rahul",
    "email": "Rahul@gmail.com",
    "password": "Rahul@123",
    "age": 24
  }
  ```

  ## 2. Get all users
- **Endpoint**: `GET http://localhost:3000/api/users`

## 3. Add User Group
- **Endpoint**: `POST http://localhost:3000/api/groups`
- **Body**:
  ```json
  {
    "name": "Jumping",
    "users": [<UserId>]
  }
  ```

## 4. Add Users to Group
- **Endpoint**: `PUT http://localhost:3000/api/groups/<GroupId>/users`
- **Body**:
  ```json
  {
    "users": [<UserId>]
  }
  ```

## 5. List Users in a group
- **Method**: `GET`
- **Endpoint**: `GET http://localhost:3000/api/groups/users?groupId=<GroupId>`


## 6. Create slot with slot name, date, starttime
- **Endpoint**: `POST http://localhost:3000/api/slots`
- **Body**:
  ```json
  {
    "name": "Cleaning",
    "date": "2024-05-25",
    "startTime": "2024-05-25T08:00:00Z",
    "endTime": "2024-05-25T09:00:00Z",
    "users": [<UserId>] // Array of user IDs (optional)
  }
  ```

## 7. List Whole slots in our system
- **Method**: `GET`
- **Endpoint**: `GET http://localhost:3000/api/slots`
