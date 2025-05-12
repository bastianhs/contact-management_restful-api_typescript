# Address API Spec

## Create Address

Endpoint: POST /api/contacts/:contact_id/addresses

Request Header:
- X-API-TOKEN: token

Request Body:

```json
{
  "street": "Street Abc",
  "city": "City Abc",
  "province": "Province Abc",
  "country": "Country Abc",
  "postal_code": "123456"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "Street Abc",
    "city": "City Abc",
    "province": "Province Abc",
    "country": "Country Abc",
    "postal_code": "123456"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "post_code must not blank, ..."
}
```

## Get Address

Endpoint: GET /api/contacts/:contact_id/addresses/:address_id

Request Header:
- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "Street Abc",
    "city": "City Abc",
    "province": "Province Abc",
    "country": "Country Abc",
    "postal_code": "123456"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Address is not found, ..."
}
```

## Update Address

Endpoint: PUT /api/contacts/:contact_id/addresses/:address_id

Request Header:
- X-API-TOKEN: token

Request Body:

```json
{
  "street": "Street Abc",
  "city": "City Abc",
  "province": "Province Abc",
  "country": "Country Abc",
  "postal_code": "123456"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "Street Abc",
    "city": "City Abc",
    "province": "Province Abc",
    "country": "Country Abc",
    "postal_code": "123456"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "post_code must not blank, ..."
}
```

## Remove Address

Endpoint: DELETE /api/contacts/:contact_id/addresses/:address_id

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
  "errors": "Address is not found, ..."
}
```

## List Address

Endpoint: GET /api/contacts/:contact_id/addresses

Request Header:
- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "street": "Street Abc",
      "city": "City Abc",
      "province": "Province Abc",
      "country": "Country Abc",
      "postal_code": "123456"
    },
    {
      "id": 2,
      "street": "Street Def",
      "city": "City Def",
      "province": "Province Def",
      "country": "Country Def",
      "postal_code": "654321"
    }
  ]
}
```

Response Body (Failed):

```json
{
  "errors": "Contact is not found, ..."
}
```
