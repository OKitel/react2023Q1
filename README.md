# Task React. Components

After cloning this repository, please navigate to **react-playground** directory and then run

```sh
npm install
```

Script for eslint check:

```sh
npm run lint
```

Script for running application:

```sh
npm run dev
```

Script for running e2e tests with coverage:

```sh
npm run e2e
```

Note! Please start application first and then run e2e tests script.

## !important

### How to setup .env

My app depends on api.unsplash.com. Authentication is required for this API. It's free but anyway you need to be authorized, to make a request to the API.

[Here I asked about authorization for reviewers in the form Q&A](https://docs.google.com/spreadsheets/d/15FI4qtxQI3P43ZK-fHoE2BVMReToTWIB78Y7Of81GOA/edit#gid=1387685555&range=D17)

For security, I put my access token into the local .env file. So it is not committed to a public GitHub repo.

Here are instructions, on how to gain your own access token and make the app work:

Here are instructions, on how to gain your own access token and make the app work:

1. Go to [unsplash](https://unsplash.com/join) and create your account
2. Once you've created your account, use this [link](https://unsplash.com/oauth/applications) to get to the new app setups. Click on the "New Application" button to create a new application. You need to accept the terms of use.
3. Give your application a name, and description. (Could be something like: name "react playground", description: "My application is an educational project for The Rolling Scopes School", **permissions: Public access**).
4. After creating the application, you should see a screen with your **Keys**🔑. Please copy your **Access Key**
5. Now, all you need is to put your access token inside .example.env file instead of the placeholder "PLEASE_INSERT_YOUR_API_KEY_HERE" and don't forget to rename the file to .env only.
6. That's it! Now you are an authorized user for api.unsplash.com and can check my application.

If you have any questions, please feel free to contact me in Discord: Olga Kitel (@OKitel)

_Thank you for your patience!_
