# Property Marketplace

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


### Prerequisites

Node.js (version 18 or later)
MongoDB (Make sure you have a MongoDB instance running)
pnpm (version 8.0 or later)

Ensure you have [pnpm](https://pnpm.io) installed. If not, you can install it using:

## Getting 

1. Install dependencies
```bash 
# if not install
npm install -g pnpm 
pnpm i
```
2. Set up environment variables

```bash
cp .env.example .env

```
- Edit the .env file and add your MongoDB connection string and any other necessary environment variables.

3. Run the development server
```bash 
pnpm dev

```
### Scripts

-  pnpm dev: Starts the development server
-  pnpm build: Builds the app for production
-  pnpm start: Runs the built app in production mode

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
