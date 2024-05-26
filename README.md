# Assessment Task APIs

## 1. Add User with user info
- **Endpoint**: `POST /api/users`
- **Body**:
  ```json
  {
    "username": "Rahul",
    "email": "Rahul@gmail.com",
    "password": "Rahul@123",
    "age": 24
  }
  ```

## 2. Add User Group
- **Endpoint**: `POST /api/groups`
- **Body**:
  ```json
  {
    "name": "Jumping",
    "users": [<UserId>]
  }
  ```

## 3. Add Users to Group
- **Endpoint**: `PUT /api/groups/<GroupId>/users`
- **Body**:
  ```json
  {
    "users": [<UserId>]
  }
  ```

## 4. List Users in a group
- **Method**: `GET`
- **Endpoint**: `GET /api/groups/users?groupId=<GroupId>`

## 5. List Whole Users
- **Method**: `GET`
- **Endpoint**: `GET /api/groups/users`

## 6. Create slot with slot name, date, starttime
- **Endpoint**: `POST /api/slots`
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
- **Endpoint**: `GET /api/slots`
