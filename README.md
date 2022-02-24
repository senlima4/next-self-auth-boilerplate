# Boilerplate

Let you can maintain high quality code with multiple way. Not any library/platform's ads placement.

Mostly use `@chakra-ui/react` personally. But still can replace it quick.

Only implement the simplest auth hook with SWR. But it also can replace by `react-query`, `zustand` or `mobx`, your free.

If you want to improve this boilerplate. [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://makeapullrequest.com)

## Tech stack

- Nextjs
- Prisma
- Typescript
- Playwright
- Docker

## Folder Structure

```
+ <root_dir>
+-- artifact/ - store the state that will be use in e2e test
+-- e2e/      - e2e tests case
+-- prisma    - prisma schema & related scripts
+-- public    - nextjs's static file serving storage
+-- scripts   - some helper function for project setting
+-- src       - nextjs application
```

## Local development

First create a postgres database. If you dont want to go to cloud platform for now. You can use `./docker-compose.yml` to init one.

After install packages. Please refer to `.env.sample` to build `.env` in root dir.

Then run `yarn prisma migrate deploy && yarn prisma generate` to generate prisma client.

Now. run `yarn dev` then you can see the website.

## Test

There are multiple ways to let you build high quality code with test. Good luck.

### Unit test

Run `yarn test:unit` to see the result.

### Intergration test

Currently using `./docker-compose.test.yml` to build test environment. Before run, remember to give `wait-for-it.sh` permission.

After init postgres database. Just run `yarn tester && yarn test:e2e` to see the result.
