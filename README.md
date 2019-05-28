# Fuse - Angular

Material Design Admin Template with Angular 7+ and Angular Material

## The Community

Share your ideas, discuss Fuse and help each other.

[Click here](http://fusetheme.com/community) to see our Community page.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


```
node --max_old_space_size=5048 ./node_modules/.bin/ng serve --configuration=production
```

## Deploy manually

c.f. [tuto](https://medium.com/zykrrtech/deploying-an-angular-7-application-to-aws-s3-cloudfront-serving-https-requests-f59a806c57b2)

```
aws s3 cp --recursive dist/ s3://bucketname/folder
```
