# Obscur Ts

> An implementation of a Fastify server using Prisma.


Todo:
- throw error for wrong pages path
- route params for pages / api and shit since the path is taken care of now
- Client side (entirely)
- The readme (yes, I'm that kind of guy)

## Guide

### Routes

#### ASSETS
In the `.env.example` you'll see that the `ASSETS_PATH` is assigned as `"assets/"` by default. This means that at the root of the project, there will be a folder named `assets` where all files in it will be found at the link `http://your_host_name.com:your_port/assets/`.
You can change the path of `assets/` however you like, something along the line of `props/` would be usable too.
But you need to note that this path will be the same as the route path on your server.

#### API
All files paths in `API` is a `GET` method and fully adaptable.
You can create an `API` in the `src/server/routes/api/` directory and it's root will be assigned depending on it's path relative to `/api/`.
The path should be `http://your_host_name.com:your_port/api/your_custom_file_path`.

#### AUTH
All files paths in `AUTH` is a `POST` method and fully adaptable.
You can create an `AUTH` in the `src/server/routes/auth/` directory and it's root will be assigned depending on it's path relative to `/auth/`.
The path should be `http://your_host_name.com:your_port/auth/your_custom_file_path`.

#### PAGES
All files paths in `PAGES` is a `GET` method returning an HTML string content.
You can create `PAGES` in the `src/server/routes/pages/` directory and it's root will be assigned depending on it's path relative to `/`.
You should note that you can't have any pages with a path like `/auth/*` or `/api/*`.
The path should be `http://your_host_name.com:your_port/your_custom_file_path`.