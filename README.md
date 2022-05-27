# SMS service

## Installation
### After cloning the repository, run :
`npm i` or `yarn install`

- to import DB into PostgresSQL, run :
`psql -U postgres talentupdb < schema.sql`

- to start up dev server, run
`npm run start:dev` or `yarn run start:dev`

- to run test, run
`npm run test` or `yarn run test`


- Each abi request takes a authorization header
```
const authToken = Buffer.from(`${username}:${auth_id}`).toString("base64");

const headers = {
  "content-type": "application/json",
  authorization: `Basic ${authToken}`
}
```
