# Web development template

## Use this template

```sh
# create a workspace directory
npx generate-github-directory https://github.com/rocket-hangar/workspace-template my-project
cd my-project

# create an app
npx generate-github-directory https://github.com/rocket-hangar/rocket-scripts-templates/tree/master/templates/web my-app

# add "my-app" to workspaces of package.json

# install
yarn

# start
cd my-app

# start
yarn run start
```

## Without yarn workspaces

```sh
# create an app
npx generate-github-directory https://github.com/rocket-hangar/rocket-scripts-templates/tree/master/templates/web my-app

cd my-app

# install
npm install # or yarn

# start
npm run start # or yarn run start
```

## Scripts

- `yarn run start` start development (see `scripts/start.ts`)
- `yarn run build` build production to `out/app` (see `scripts/build.ts`)
- `yarn run storybook:start` start storybook
- `yarn run storybook:build` build storybook to `out/storybook`
- `yarn run test` jest test
- `yarn run coverage` jest test to create coverage report

## Directories

- `scripts/` development scripts
- `public/` static files (the files in this directory are apply on the webroot. e.g. `public/favicon.ico` to be `http://localhost/favicon.ico`)
- `src/` source files
  - `src/app` app root (this directory name `app` can look at in the `scripts/start.ts`)
  - `src/app/index.tsx` will bind to `src/app/index.html` (if you want to make the other app files make `.html` and `.tsx` files that have same name)
