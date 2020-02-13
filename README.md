# City of Philadelphia Take Home Project - Derrick Dieso Submission

## Tasks: 

1. endpoints
  1. PID search - /api/prisoner/pid/{pid}
  2. Full Name + DoB search /api/prisoner/name/{firstName}/{lastName}/{DoB}
  3. (admin only) /api/admin/{name_of_location} 
  4. (warden only)  /api/warden/inmates (from JWT, location will be determined)

2. Write Unit Tests
  1. General functionality
    1. pid search
    2. full name search
    3. admin search
    4. warden search
  1. 404 testing
    1. pid search
    2. full name search
    3. admin search - location DNE
    4. admin search - wrong/non existent JWT
    5. warden search - wrong/non existent JWT

3. Write Documentation on API
  1. Use Cases

## Steps to Run

1. `npm install` from project directory
2. generate "prisoners.json" by running `node generate_prisoners.js` from the project directory
3. run test by running `npm test` from the project directory
4. run the server by running `npm start` from the project directory

# Documentation

**PID Search**
----
  This public path returns json data about a single prisoner given a PID parameter.

* **URL**

  /api/prisoner/pid/:pid

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `PID=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{
        "PID": "1",
        "firstName": "Dorcas",
        "lastName": "Kozey",
        "dob": "2010-04-05",
        "location": "Philadelphia"
    }]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`



**Name & DOB Search**
----
  This public path returns json data about a single prisoner given their first name, last name, and date of birth as parameters.

* **URL**

  /api/prisoner/name/:firstName/:lastName/:dob

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `firstName=[string]`
   `lastName=[string]`
   `dob=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{
        "PID": "1",
        "firstName": "Dorcas",
        "lastName": "Kozey",
        "dob": "2010-04-05",
        "location": "Philadelphia"
    }]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`



**Admin Search**
----
  This protected path returns json data about all the prisoners in a single location given the location as a parameter.

* **URL**

  /api/admin/:location

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `location=[string]`

* **Data Params**

  JWT with `secret=Administrator`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{
        "PID": "1",
        "firstName": "Dorcas",
        "lastName": "Kozey",
        "dob": "2010-04-05",
        "location": "Philadelphia"
    }
    {
        "PID": "2",
        "firstName": "Test",
        "lastName": "tester",
        "dob": "2011-03-04",
        "location": "Philadelphia"
    }
    ...]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`



**Warden Search**
----
  This protected path returns json data about all the prisoners in a single location given the user's location.

* **URL**

  /api/warden/inmates

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  JWT with `secret=Warden`
  JWT with `location=:location`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{
        "PID": "1",
        "firstName": "Dorcas",
        "lastName": "Kozey",
        "dob": "2010-04-05",
        "location": "Philadelphia"
    }
    {
        "PID": "2",
        "firstName": "Test",
        "lastName": "tester",
        "dob": "2011-03-04",
        "location": "Philadelphia"
    }
    ...]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`
