# PokeReact - Pokemon Explorer App

A React application that retrieves a list of Pokemon from the PokeAPI and displays their details. Built with TypeScript, Redux Toolkit, and RTK Query.

## Features

- View a list of Pokemon with search functionality
- Click on a Pokemon to view detailed information

## Tech Stack

- React 19
- TypeScript
- Redux Toolkit & RTK Query for state management and API calls
- React Router for navigation
- Vitest & Testing Library for unit and integration testing

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd pokemon-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

## Running the Application

### Development Mode

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

### Start with Custom API URL

You can configure the API base URL by setting the `API_BASE_URL` environment variable:

```bash
# Windows (PowerShell)
$env:API_BASE_URL="https://custom-pokeapi.com/api/v2"; npm start

# Windows (CMD)
set API_BASE_URL=https://custom-pokeapi.com/api/v2 && npm start

# Linux/macOS
API_BASE_URL=https://custom-pokeapi.com/api/v2 npm start
```

## Testing

### Running Tests

```bash
npm test
```

### Running Tests with Coverage

```bash
npm run test:coverage
```

The coverage report will be generated in the `coverage` directory. The application has at least 60% test coverage for both unit and integration tests.

## Project Structure

```
src/
├── components/         # React components
├── services/           # API services using RTK Query
├── store/              # Redux store configuration
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and hooks
└── __tests__/          # Test files
```

## API Endpoints

The application uses the following endpoints from the PokeAPI:

- `GET https://pokeapi.co/api/v2/pokemon/` - Get a list of Pokemon
- `GET https://pokeapi.co/api/v2/pokemon/{id}/` - Get details of a specific Pokemon

## License

This project is licensed under the MIT License.
