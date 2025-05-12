# User API Spec

## Register User

Endpoint: POST /api/users

Request Body:

```json
{
  "username": "user1",
  "password": "passuser1",
  "name": "Full Name User1"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "user1",
    "name": "Full Name User1"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Username must not blank, ..."
}
```

## Login User

Endpoint: POST /api/users/login

Request Body:

```json
{
  "username": "user1",
  "password": "passuser1",
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "user1",
    "name": "Full Name User1",
    "token": "uuid"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Username or password wrong, ..."
}
```

## Get User

Endpoint: GET /api/users/current

Request Header:
- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": {
    "username": "user1",
    "name": "Full Name User1"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized, ..."
}
```

## Update User

Endpoint: PATCH /api/users/current

Request Header:
- X-API-TOKEN: token

Request Body:

```json
{
  "password": "passuser1", // optional
  "name": "Full Name User1" // optional
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "user1",
    "name": "Full Name User1"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized, ..."
}
```

## Logout User

Endpoint: DELETE /api/users/current

Request Header:
- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": "OK"
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized, ..."
}
```
