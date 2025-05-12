# Contact API Spe

## Create Contact

Endpoint: POST /api/contacts

Request Header:
- X-API-TOKEN: token

Request Body:

```json
{
  "first_name": "Adam Bas",
  "last_name": "Chris",
  "email": "adambchris@mail.com",
  "phone": "0123456789"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Adam Bas",
    "last_name": "Chris",
    "email": "adambchris@mail.com",
    "phone": "0123456789"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "first_name must not blank, ..."
}
```

## Get Contact

Endpoint: GET /api/contacts/:id

Request Header:
- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Adam Bas",
    "last_name": "Chris",
    "email": "adambchris@mail.com",
    "phone": "0123456789"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Contact is not found, ..."
}
```

## Update Contact

Endpoint: PUT /api/contacts/:id

Request Header:
- X-API-TOKEN: token

Request Body:

```json
{
  "first_name": "Adam Bas",
  "last_name": "Chris",
  "email": "adambchris@mail.com",
  "phone": "0123456789"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Adam Bas",
    "last_name": "Chris",
    "email": "adambchris@mail.com",
    "phone": "0123456789"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "first_name must not blank, ..."
}
```

## Remove Contact

Endpoint: DELETE /api/contacts/:id

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
  "errors": "Contact is not found, ..."
}
```

## Search Contact

Endpoint: GET /api/contacts

Query Parameter:
- name: string, contact first name or contact last name, optional
- email: string, contact email, optional
- phone: string, contact phone, optional
- page: number, page number, default 1
- size: number, page size, default 10

Request Header:
- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Adam Bas",
      "last_name": "Chris",
      "email": "adambchris@mail.com",
      "phone": "1234567890"
    },
    {
      "id": 2,
      "first_name": "Dave Edward",
      "last_name": "Freddy",
      "email": "daveefreddy@mail.com",
      "phone": "0987654321"
    },
  ],
  "paging": {
    "current_page": 1,
    "page_size": 10,
    "total_results": 26,
    "total_pages": 3
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized, ..."
}
```
