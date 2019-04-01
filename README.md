# SziaApp - Showcase for Angular testing

This project is a showcase for Angular testing capabilities

## Login

To log in the application you will need a user, you can create one here: http://szia-backend.herokuapp.com/explorer/#!/SziaUser/SziaUser_create. If the backend server is idle for a period of time it will be shut down and the batabase will be dropped, so you might need to register again. Provide data for the backend in the following format:

```
{
  "username": "test",
  "email": "test@test.com",
  "password": "test"
}
```

## Tests

### Unit tests

* aut.service.spec
  * HTTP service testing
  * Injection token usage
* flight.component.spec
  * Embedded component testing and mocking
  * URL parameters reading test
  * Mocking services
* complaint-list.component.spec
  * Routing test
  * Mocking services
* complaint-edit.component.spec
  * Form testing
  
### E2e tests

*To run e2e tests you will need to have a registered user: see Log in section*

* Saving a complaint
* Editing a complaint

### Debugging in e2e tests

Run `npm run e2e:debug`, you need to start the development server separately

How to set up debugging:
https://github.com/angular/protractor/blob/master/docs/debugging.md

Related Angular CLI issue:
https://github.com/angular/angular-cli/issues/10289

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
