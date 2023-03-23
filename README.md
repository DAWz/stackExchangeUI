# Stack Exchange UI - React App

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
