# City of Philadelphia Take Home Project

Take home project for engineering candidates at City of Philadelphia

## The problem. 

Your team has been asked by the Philadelphia Department of Prisons to build an app to help locate inmates within the prison system. You are on a team with a front-end developer who mocked up some of the UI (see below), and they need you to build the data API. There are three customers: non-authenticated users searching for their friends and family, wardens who want to keep track of inmates in their locations, and administrators who need to see all inmates in the system. 

![Inmate Locator UI](mock-ui.png)

As you can see in the screen above, the app provides two ways to search for an inmate: By Prisoner ID (PID) or by full name and date of birth. 

Both of these search methods will return an inmate if there is at least one that matches and a 404 if there is not. An inmate looks like: 

```
{
  "PID": "123456"
  "firstName": "Dan",
  "lastName": "Lopez"
  "dob": "2020-02-04",
  "location" : "City Hall"
}
```

In addition to this, an administrator should be able to query the API to get a list of all of the inmates for each location. This user should send a signed JWT with a role of `admin`. If their JWT isn't signed correctly, this should deny access. This will be displayed in a tabular view. 

Finally, a prison warden should be able to make an API call to query the list of inmates only for their location. This user should send a signed JWT with a role of `warden` and a location. If their JWT isn't signed correctly, this should deny access. This will be displayed in a tabular view. 

Your challenge is to: 
1. Implement all of the API endpoints needed by the UI and by administrators,
1. Write unit tests to cover your API, 
1. Either document your API or use something like [Swagger](https://swagger.io/) to automatically build documentation that you could hand off to a FE developer
1. Be sure to include input validation for your endpoints 

## Time Constraint
You should aim to spend 3-4 hours on this task and then send us waht you have, even if it's not all the way done. 

## Instructions

Use whatever statically typed programming language / framework is most comfortable for you. The deliverable should be the source code to a runnable API that meets all of the requirements. While you're welcome to use a database, it's probably faster and easier to just mock your data. Be sure to document the steps to get your code up and running in a local development environment in a README. This would be a good place to also document any assumptions / simplifications that you made. 

## How to submit
You can: 

1. Fork this repository and push a copy of it to your own Github page and send us a link (be sure to add danlopez as a collaborator if it's private)
1. Submit a pull request to this repository and let us know via email.
1. Send us a zipped version of your git repository via email.


### More on JWTs
Use https://jwt.io/ for resources on validating decoding JWTs. The secret for the JWTs we're providing is `secret`, using the HMACSHA256 algorithm. Don't worry about generating a JWT / authenticating the user; you can use the samples provided below and assume that they have not yet expired. 

#### Administrator
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkxIiwibmFtZSI6IkFkbWluIiwicm9sZSI6IkFkbWluaXN0cmF0b3IiLCJpYXQiOjE1MTYyMzkwMjJ9.NkOW8HHYMEVa8EUXy7TdlsS3tQRJkWbw7d68ax-f9eA

#### Warden
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkxIiwibmFtZSI6IldhcmRlbiIsInJvbGUiOiJ3YXJkZW4iLCJsb2NhdGlvbiI6IkFsY2F0cmF6IiwiaWF0IjoxNTE2MjM5MDIyfQ.dVIceJwZutqWZlnwcwsSujOLI35TPxKoA9jPpD1TAZ4
