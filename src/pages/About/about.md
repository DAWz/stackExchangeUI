# Stack Exchange Dashboard - React App

## Requirments

For building and running the application you need:

\*_There is a dockerized running instance of this app deployed on Amazon EC2, you can access it [here](http://ec2-13-53-245-221.eu-north-1.compute.amazonaws.com/swagger-ui/index.html)._

- [Node.JS](https://nodejs.org/en/download)

## Running the application locally

To get the frontend running locally:

- Clone this repo
- `npm install` to install all req'd dependencies
- `npm start` to start the local server (this project uses create-react-app)

Alternativley you can pull the [docker container](https://hub.docker.com/repository/docker/abdelrahmanosama1/code-sample/general) using:

```shell
docker pull abdelrahmanosama1/code-sample-fe:latest
```

And to run it use:

```shell
docker run -d abdelrahmanosama1/code-sample-fe:latest
```

## Project Description

- This application acts as a dashboard presenting data provided by the REST APIs exposed by the Java app (described in a section below)
- The homepage provides insight into the data available to the dashboard. There is an interactive visual created by d3.js which provides you with the ability to see how many questions in the database are tagged with your selected technologies.
- The dashboard uses RTK to call the REST APIs exposed by the Java app to query/ delete the stored data. The exposed APIs are:
  - `HTTP GET` /api/v1/questions endpoint to get all the questions in the database
  - `HTTP GET` /api/v1/questions/{id} endpoint to retrieve a single question by id
  - `HTTP DELETE` /api/v1/questions/{id} endpoint to remove a single question by id from the database
  - `HTTP GET` api/v1/questions/tagSearch/{tag1,tag2}?operation=any endpoint to retrieve all questions that have specified tags with the choice of conjunction/ disjunction (make sure to use the url parameter operation and set to either all/ any)
- You can view the questions in the questions page, and make all the calls mentioned above from there.
- The users page provides you with the ability to call the `HTTP GET` /api/v1/user/{id} endpoint through RTK. This end point does not access data stored in the Java application, instead the end point acts as a proxy call to the [StackOverflow.com Users Api](https://api.stackexchange.com/docs/users-by-ids).

## Tech Stack

#### [React](https://www.npmjs.com/package/react)

React is a JavaScript library for creating user interfaces. It is a very populat library with great community support.

#### [React Redux](https://www.npmjs.com/package/react-redux) + [Redux Toolkit](https://www.npmjs.com/package/@reduxjs/toolkit)

Redux is a state container for JavaScript apps. Redux Toolkit is a toolset for efficient Redux development. This is a great tool, as it provides solutions to state management, automation for refetching, error-handling, data transformation, and API result caching in a way that does not require boiler-plate code. It is quick, efficient and very powerful.

#### [Axios](https://www.npmjs.com/package/axios)

Axios is a promise based HTTP client for the browser and Node.js which I used to make calls to the REST APIs exposed by the Java application.

#### [d3.js](https://d3js.org/) + [Resize Observer Polyfill](https://www.npmjs.com/package/resize-observer-polyfill)

D3.js is a powerful library to produce dynamic, interactive visuals. I used it to create the bar chart presented in the Home page. I used the resize observer polyfill library to modify the svg created in d3 when its parent component is resized.

#### [Markdown to JSX](https://www.npmjs.com/package/markdown-to-jsx)

A React markdown component that I used in the About page to load the markdown file into the webpage.

#### [React Select](https://www.npmjs.com/package/react-select)

A Select control component used in the Home page and Questions page to provide the user with the ability to make a selection from a defined set of options.

#### [React Toastify](https://www.npmjs.com/package/react-toastify)

A library that alls for adding notifications to the React app easily. I used this to provide the user with intel on whether the delete function was fullfilled successfully.

# [Stack Exchange Api](https://github.com/DAWz/stackexchangeAPI) - Java App

## Requirments

For building and running the application you need:

\*_There is a dockerized running instance of this app deployed on Amazon EC2, you can access its swagger page [here](http://ec2-13-53-245-221.eu-north-1.compute.amazonaws.com/swagger-ui/index.html)._

- [JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Maven 3](https://maven.apache.org)

## Running the application locally

There are several ways to run the application on your local machine. One way is to execute the `main` method in the `dev.daw.CodeSampleApplication` class from your IDE.

Alternatively you can use the [Spring Boot Maven plugin](https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins-maven-plugin.html) like so:

```shell
mvn spring-boot:run
```

Alternativley you can pull the [docker container](https://hub.docker.com/repository/docker/abdelrahmanosama1/code-sample/general) using:

```shell
docker pull abdelrahmanosama1/code-sample:latest
```

And to run it use:

```shell
docker run -d abdelrahmanosama1/code-sample:latest
```

Finally you can use the `jar` file in `daw.dev.target`, create the .jar executable file using:

```shell
mvn install
```

## Running test

Use:

```shell
mvn clean install
```

Then run:

```shell
mvn clean test
```

## Project Description

- The application is meant to call the stack exchange upon start to fetch the 20 latest featured questions by date from [StackOverflow.com Featured Questions API](https://api.stackexchange.com/docs/featured-questions)
- The result of the call is stored in an in memory H2 SQL database (the database runs in memory with no presistence configuration)
- The application exposes REST APIs to query/ delete the stored data, the expose APIs are:
  - `HTTP GET` /api/v1/questions endpoint to get all the questions in the database
  - `HTTP GET` /api/v1/questions/{id} endpoint to retrieve a single question by id
  - `HTTP DELETE` /api/v1/questions/{id} endpoint to remove a single question by id from the database
  - `HTTP GET` api/v1/questions/tagSearch/{tag1,tag2}?operation=any endpoint to retrieve all questions that have specified tags with the choice of conjunction/ disjunction (make sure to use the url parameter operation and set to either all/ any)
- The fields returned for each question are:
  - id (Number)
  - tags (Array of Strings)
  - is_answered (Boolean)
  - answer_count (Number)
  - creation_date (datetime in ISO8601 format as String)
  - user_id (Number) of the user who asked the question

_You can head to /swagger-ui.html upon running the app to find detailed documentation for the APIs_

Additionally, the application exposes a `HTTP GET` /api/v1/user/{id} endpoint that returns details about a user by id, acting as a proxy to [StackOverflow.com Users Api](https://api.stackexchange.com/docs/users-by-ids) the results of this proxy call are then cached in a Simple Cache so that the same query does not lead to multiple calls to the StackOverflow API.
The following fields are returned for each user:

- user_id (Number)
- creation_date (datetime in ISO8601 format as String)
- display_name (String)

## Architectural decisisions/ tech stack

#### MVC Pattern

The Model-View-Controller pattern is one of the most widley used design patterns in software engineering it ensures a great degree of seperation of concerns.

#### [Spring Boot 3](https://spring.io)

Spring boot is most popular Java Framework now that is very powerful; providing annotations for almost everything and it has great community support.

#### [H2 SQL in-memory database](https://www.h2database.com/html/main.html)

H2 is an in-memory SQL database that has native support for Spring Boot, it made sense as a choice because the database needs to live for as long as the app is running and then it has to be wiped with the next Stack Exchange API call which happens on app start.
In addition, a relational database made sense due to the referential capabilities provided that helped a great deal when implementing the getQuestionsByTags functionallity handling the many-to-many relationship between Tags and Questions making it easier to get all the questions for a specific tag with a simple join.

#### [JPA + Hibernate](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)

The most widley used ORM for SQL for Spring Boot that provids great support for almost all basic database queries which abstracted away the Data_Access_Layer (Repository Level) completley by just extending JpaRepository which reduces code maintenance and testing.

#### [JUnit 5](https://junit.org/junit5/) + [Mockito](https://site.mockito.org)

JUnit and Mockito is a very powerful combo that makes writing unit tests and moking dependencies a very easy experience

#### [Lombok](https://projectlombok.org)

A library that provides annotation for boiler plate code such as Getters, Setters & Constructors.

#### [Open API (Swagger)](https://swagger.io/specification/)

A library that helps for automating API documentation providing a web page and an endpoint to view the available APIs in an aesthetically pleasing view.
