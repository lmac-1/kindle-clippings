# My Kindle Clippings

## Why I Built This

I read on my Kindle and regularly highlight quotes that I find interesting. Any highlight is adding to a "My Clippings" text file. This file is not easy to look through. I wanted to create an application that would make it easy for me to see all of my quotes in one place and search through them.

## Stack

This project was generated using [Next.js' Fast API starter](https://vercel.com/templates/next.js/nextjs-fastapi-starter).

### How It Works

The Python/FastAPI server is mapped into to Next.js app under /api/.

This is implemented using next.config.js rewrites to map any request to `/api/py/:path\*` to the FastAPI API, which is hosted in the `/api` folder.

Also, the `app/api` routes are available on the same domain, so you can use NextJs Route Handlers and make requests to `/api/`....

On localhost, the rewrite will be made to the `127.0.0.1:8000` port, which is where the FastAPI server is running.

In production, the FastAPI server is hosted as Python serverless functions on Vercel.

## Todo

- [ ] Handle notes aswell as highlights
- [ ] Add ability to run with dummy data
- [ ] Sort quotes by date ascending, descending
- [ ] Improve processing to get rid of some duplicates
- [ ] Add About page
