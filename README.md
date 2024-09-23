# ReactJS + Typescript Example

This repository contains a small TypeScript application demonstrating how to detect presense of FineID card by using CSC API provided by mPollux card reader solution.

## Prerequisites 

To run this project, you need to have Node.js installed.

The project includes an `.nvmrc` file specifying the required Node.js version. It is recommended to use Node Version Manager (NVM) to easily manage and switch between different Node.js versions.

To install and use the correct Node.js version, run the following commands:

```bash
nvm install
nvm use
```

If NVM is not installed on your system, you can install it by following the instructions [here](https://github.com/nvm-sh/nvm#installing-and-updating).

## Configuration

Before starting the application, you need to create a `.env` file in the project root directory. An example configuration file is provided with the name `.env.example`. Copy this file and update the placeholder values with your actual configuration settings.

## Installation

Once you have configured the environment, install the project dependencies using npm:

```bash
npm install
```

## Starting the Application

After configuring the application and installing the dependencies, you can start the development server with the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`.

## Mocking SCS

Repository contains also a small tool called "mockcard". This tool can be used to test card detection without actually having a card or a reader software installed.

Mock tool can be found from mockcard -folder.

To run the mock tool, run the following commands:

```bash
cd mockcard
npm install
npm run start
```

After this you should have mocked CSC API running in `http://127.0.0.1:3000/version`

You can change what mock server is responding by running following commands:

Change mode to emulate that card is not in the reader:
```bash
curl http://127.0.0.1:3000/mode?mode=nocard
````

Change mode to emulate that card is in the reader:
```bash
curl http://127.0.0.1:3000/mode?mode=card
````

Change mode to emulate that reader software reports an error:
```bash
curl http://127.0.0.1:3000/mode?mode=error
````