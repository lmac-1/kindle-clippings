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

**Top tip**: When working on personal coding projects, try to keep a todo list handy, so that you know what to work on when you come back to it :)

- [x] Handle notes aswell as highlights
- [x] Add ability to run with dummy data
- [ ] Sort quotes by date ascending, descending
- [ ] Improve processing to get rid of some duplicates
- [x] Add About page
- [ ] Write content for About page
- [x] Add Authors page
- [ ] Remove Reset Store button
  - [ ] Improve flow - for example, if there are quotes, perhaps take user straight to quotes. Have a upload link in the nav and when you go to home screen, it automaticaly resets your quotes
- [ ] Pagination?
- [ ] Make it work for Spanish - test with Luis' file
- [ ] Improve colours/styling
- [ ] Add more quotes to demo data
