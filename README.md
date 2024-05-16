# OAS Node (Special Express Alternative)

OAS Node is a sophisticated project tailored for ease of use, automating repetitive validations, and simplifying middleware handling, typically required for various routes. The primary objective was to explore the Node.js HTTP module by implementing custom functionalities for validations, middlewares, and routing using an array of objects with predefined fields.

## Features

1. Implement fully functional REST Api using array of routes of specified types.
2. Validating Inputs with custom callback validation functions.
3. Applying authentication and Authorization middlewares for differnt routes by defining whether the route is protected , and who can access this endpoint.
4. The ability to put certain endpoint undermaintenace (in case it has some bugs for example) blocking in this case wrong input to overload our databse.

## Installation

1. Clone this repository to your local machine.

2. Navigate to the project directory.

3. Install Dependncy Packages (we are using here typescript server).

```CLI

// Using Npm
npm install

// Using Yarn
yarn

```

## Usage

1. Define the project's roles in /types/enums by adding your preferred roles in the Roles enum.
2. Define the feature Services ( Class implementation adding your custom implementation ).
3. Define the feature routes array as stated in the given Example defining the route fields stated.
4. Add the feature's route into the route builder having directory /routes/index.ts.
5. Add your custom PRIVATE_KEY & PUBLIC_KEY in .env for JWT siging and verification.
6. Feel free to play :)

**For encryption using**

```CLI

// Using Npm
npm run dev-ts

// Using Yarn
yarn dev-ts

```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any improvements or features you'd like to see.

I look forward to seing your comments, queries , contributions by adding your changes suggestions or via email: sawwas.omar@gmail.com where we can setup a meeting to discuss any further potential extended implementation.
