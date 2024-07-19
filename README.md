# Amanda's Movie List

A side-project site I made to store a publically viewable version of my girlfriend's ridiculously long movie watchlist.

[amandasmovielist.com](https://amandasmovielist.com)

### features

#### backend (nodejs/express/mongoDB)

- user authentication
  - uses JWT tokens set in browser http-only cookies
  - written from scratch, logic in nodejs and user data stored in a mongoDB database.
  - login, update password and forgot password flows, forgot password links are sent through emails using [mailtrap](https://mailtrap.io/).
  - custom signup flow that requires a signup token that can only be generated by specific user roles, essentially an invitation system.
- movie list (watchlist and seen list) stored in mongoDB documents.
  - stores movie info and user ratings
- fetch movie data from [omdbapi](https://www.omdbapi.com/)
- simple server-side in-memory caching of watchlist data, user data and fetched movie data.

#### frontend (react)

- responsive, mobile-first design
- routes served by [react-router v6](https://reactrouter.com/en/main)
- route transitions facilitated by [react-transition-group](https://reactcommunity.org/react-transition-group/)
- backend data fetching and remote state through [react-query (tanstack-query) v5](https://tanstack.com/query/latest/docs/framework/react/overview)
- scss based stylesheets
- local state handled by useState() and contextApi

#### dev environment

Set up using docker compose to create frontend, backend and reverse-proxy (nginx) containers for development.
