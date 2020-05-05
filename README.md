
# Vue Keycloak Skeleton [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

A clean Vue Keycloak full-stack Skeleton example

## Directory Structure

    .github/                   - PR and Issue templates
    app/                       - Application Root
    ├── frontend/              - Frontend Root
    │   ├── src/               - Vue.js frontend web application
    │   └── tests/             - Vue.js frontend web application tests
    ├── src/                   - Node.js backend web application
    └── tests/                 - Node.js backend web application tests
    openshift/                 - OpenShift-deployment and shared pipeline files
    Jenkinsfile                - Top-level Pipeline
    Jenkinsfile.cicd           - Pull-Request Pipeline
    LICENSE                    - License
    sonar-project.properties   - SonarQube configuration

## Documentation

* [Application Readme](app/README.md)
* [Frontend Readme](app/frontend/README.md)
* [Openshift Readme](openshift/README.md)
* [Devops Tools Setup](https://github.com/bcgov/nr-showcase-devops-tools)

## Quick Start Dev Guide

You can quickly run this application in production mode after cloning with the following commands (assuming you have already set up local configuration as well). Refer to the [Application Readme](app/README.md) and [Frontend Readme](app/frontend/README.md) for more details.

    cd app
    npm run all:install
    npm run all:build
    npm run serve

## Getting Help or Reporting an Issue

To report bugs/issues/features requests, please file an issue.

## Design Rationale

This is designed as a minimally viable full-stack application which self-hosts the Vue frontend and consumes its API endpoint. This was purposely designed with as few dependencies as possible with a minimal amount of opinionation on design.

The frontend and the application can be treated as separate projects. The frontend will build and emit files under the app/frontend/dist folder. This is picked up by the node application and hosted as is with minimal routing changes. Alternative static hosting solutions such as Caddy or nginx may also be considered.

### Application

The application is a simple express application, with some basic support for HTTP issue codes through the `api-problem` package. It uses express routers to construct and mount the subpaths of the application. The API endpoint is mounted on the `/api` path, while the frontend is mounted on the `/app` path.

#### Application Components

The application has the following component dependencies:

* api-problem
* body-parser
* compression
* config
* express
* js-yaml
* keycloak-connect
* morgan
* npmlog

#### Code Organization

The app splits itself into routes and components, where routes handle network traffic, and components handle business logic. The demo `/api/v1/hello` endpoint is an authenticated keycloak protected endpoint to demonstrate the use of the keycloak-connect middleware. Anything under the `/app` path will contain resources needed for the frontend to render on the browser.

### Frontend

The frontend was built up from scratch using the official [Vue CLI](https://cli.vuejs.org/) distribution. These were the options that were used when scaffolding the initial Frontend:

    Vue CLI v4.2.2
    ? Please pick a preset: Manually select features
    ? Check the features needed for your project: Babel, Router, CSS Pre-processors, Linter, Unit
    ? Use history mode for router? (Requires proper server setup for index fallback in production) No
    ? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with node-sass)
    ? Pick a linter / formatter config: Prettier
    ? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)Lint on save
    ? Pick a unit testing solution: Jest
    ? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files

We installed the Vuetify framework by running `vue add Vuetify` afterwards.

#### Frontend Components

The frontend has the following main component dependencies:

* @bcgov/bc-sans
* axios
* core-js
* keycloak-js
* nprogress
* vue
* vue-router
* vuetify
* vuex

#### Code Structure

For the most part, we follow the Vue CLI scaffold as it is presented. However, we do also include a Keycloak prototype, and a global base component design in order to facilitate better component reuse. Keycloak authentication is handled by the vue-keycloak-js package, and the minimal BCGov styles are componetized in order to stay out of the way of the application content as much as possible. The navigation bar leverages vue-router, and the router uses webpack lazy-loading in order to optimize network traffic. Any components that start with the name `Base` and are in the `app/frontend/src/components/base` folder will be globally mounted onto the Vue instance and will be usable anywhere.
