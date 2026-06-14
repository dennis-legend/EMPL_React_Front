# EMPL Front React

This project is the React frontend for the EMPL application, built with TypeScript and Vite.
It connects to backend API 'EMPL_NodeJS_API', which runs using Node.js+TypeScript+MySQL

## Project overview

- React + TypeScript application
- Vite development server with fast HMR
- ESLint support for code quality
- Intended to connect to the EMPL backend API("http://localhost:3000/api") and provide the main user interface for the application

## Requirements

- Node.js 18 or newer,Typescript,React
- npm or yarn
- Refer to the package.json file

## Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

## Run the development server

```bash
npm run dev
```

or

```bash
yarn dev
```

Then open the local URL shown in the console, usually http://localhost:5173.

## Build for production

```bash
npm run build
```

or

```bash
yarn build
```

## Preview production build

```bash
npm run preview
```

or

```bash
yarn preview
```

## Notes

- Update any backend API URL or environment variables in the project configuration as needed.
- You need to run the EMPL backend API("http://localhost:3000/api") firstly, then you can start the run this EMPL_Front_React project.
