# Expat Journal

Expat Journal is an app that avails travellers (expatriate) the ability to show off the places they have been and remember them for theirselves.

THe Application is live [here](https://expat-journals.herokuapp.com/)

## Product Canvas

The Project Canvas can be found [here](https://docs.google.com/document/d/1EGGg6r0eoXauKAv70OptMaCKRBlZm1BM_5miGzqpHQI/edit#heading=h.4oicemcbd57)

## Installation

### Clone this repository and navigate into it

`git clone https://github.com/bw-expat-journal/Back-End.git && cd Back-End`

### Install dependencies

`npm install`

#### Add Neccessary Environment Variables

 Edit the .env.sample file to add:

- A jsonwebtoken secret to encrypt jsonwebtoken

- Port number where the server can listen on

- Database Url for postgres

After that rename the file to `.env`

#### Start the application

`npm run start`

---

## Documentation

This application is deployed on [heroku](https://expat-journals.herokuapp.com/) with the following endpoints accessible

|Method|Functionality|Endpoint|
|-|-|-|
|POST _/auth/signup_|Create a user account|`api/v1/auth/signup`|
|POST _/auth/login_|Login a user|`api/v1/auth/login`          |
|POST _/journals_|Create a new journal entry|`api/v1/journals`|
|GET _/journals_|Get all journal entries|`api/v1/journals`|
|GET _/journals/:id_|Get one journal entry by ID|`api/v1/journals/:id`|
|PUT _/journals/:id_|Update a journal entry by ID|`api/v1/journals/:id`|
|DELETE _/journals/:id_|Delete a journal entry by ID|`api/v1/journals/:id`|

### Request and Response Specifications

#### POST _/auth/signup_

**Request spec:**

```javascript
{
  email: 'example@email.com',
  password: 'accepts any string from 6-32 chars',
  confirm_password: 'accepts any string from 6-32 chars',
  first_name: 'accepts letters from 2 -50 chars',
  last_name: 'accepts letters from 2 -50 chars',
}
```

**Response spec:**

```javascript
{
    "user": {
        "id": 5,
        "email": "example@gmail.com",
        "first_name": "Name",
        "last_name": "Example",
        "is_admin": false || true
    },
    "token": "yuyujhjiiGHJIKKHJhHJhKhnbGHj.eyJ1c2VySWQiOjUsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNTY0NDk1OTg4LCJleHAiOjE1NjUxMDA3ODh9.SgCpomiiiioidhjdfI"
}
```

#### POST _/auth/login_

**Request spec:**

```javascript
{
  email: 'example@email.com',
  password: 'accepts any string from 6-32 chars'
}
```

**Response spec:**

```javascript
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.hgjgkgooopooooopoKNHIOKKLOHHhoooooooo._7_DcsvIG6XlqRtmoqX3NmWnkREkFfkqswtmkCo1O2M",
    "user": {
        "id": 5,
        "email": "haywhyze@gmail.com",
        "is_admin": false,
        "first_name": "Yusuf",
        "last_name": "Ayo"
    }
}
```

#### POST _/journals_

**Request spec:**

```javascript
{
  message: 'just any message you want to share to fellow travellers/expatriates about your experience at a place',
  location: 'London, UK'
}
```

**Response spec:**

```javascript
{
    "journal": {
        "caption": null,
        "first_name": "John",
        "id": 123,
        "image_url": null,
        "last_name": "Doe",
        "location": "London, UK",
        "message": 'just any message you want to share to fellow travellers/expatriates about your experience at a place'
    }
}
```

#### PUT _/journals_/123

**Request spec:**

```javascript
{
  message: 'just any message you want to share to fellow travellers/expatriates about your experience at a place',
  location: 'Berlin, DE'
}
```

**Response spec:**

```javascript
{
    "journal": {
        "caption": null,
        "first_name": "John",
        "id": 123,
        "image_url": null,
        "last_name": "Doe",
        "location": "Berlin, DE",
        "message": 'just any message you want to share to fellow travellers/expatriates about your experience at a place'
    }
}
```

#### GET _/journals_

**Request spec:** The  request specification for the `GET` requests is just the url.

**Responce spec:**

```javascript
[{
    "journal": {
        "caption": null,
        "first_name": "John",
        "id": 123,
        "image_url": null,
        "last_name": "Doe",
        "location": "London, UK",
        "message": 'just any message you want to share to fellow travellers/expatriates about your experience at a place'
    }
},
{
    "journal": {
        "caption": null,
        "first_name": "John",
        "id": 123,
        "image_url": null,
        "last_name": "Doe",
        "location": "London, UK",
        "message": 'just any message you want to share to fellow travellers/expatriates about your experience at a place'
    }
},
{
    "journal": {
        "caption": null,
        "first_name": "John",
        "id": 123,
        "image_url": null,
        "last_name": "Doe",
        "location": "London, UK",
        "message": 'just any message you want to share to fellow travellers/expatriates about your experience at a place'
    }
}]
```

#### GET _/journals/123_

**Request spec:** The request specification for the `GET` requests is just the url.

**Responce spec:**

```javascript
{
    "journal": {
        "caption": null,
        "first_name": "John",
        "id": 123,
        "image_url": null,
        "last_name": "Doe",
        "location": "Berlin, DE",
        "message": 'just any message you want to share to fellow travellers/expatriates about your experience at a place'
    }
}
```

#### DELETE _/journals/123_

**Request spec:** The request specification for the `DELETE` requests is just the url.

**Responce spec:**

```javascript
{
  message: 'Journal deleted successfully'
}
```
