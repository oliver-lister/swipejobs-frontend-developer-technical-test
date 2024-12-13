# Swipejobs Technical Test Solution

## Overview

This repository contains my solution for the Swipejobs Frontend Developer
technical test. The project showcases my ability to develop a frontend
application using React, TypeScript, and related tools, while demonstrating
skills in testing, state management, styling, and containerization.

## Features

- **Job Matches**: Renders a grid of cards displaying job matches for a worker,
  including formatted details like job title, wage, distance, requirements, and
  shift schedules retrieved from the test API.
- **User Interaction**: Allows workers to accept or reject job offers with
  real-time feedback on the actions, displaying user friendly error messages if
  present.
- **Skeleton Loading**: Provides a loading state with skeleton components for a
  polished user experience.
- **Responsive Design**: Built with a mobile-first approach, ensuring usability
  on all screen sizes.
- **Custom Hooks**: Implements hooks like `useWorker` and `useMatch` for
  managing data fetching and interactions.
- **Unit Testing**: Comprehensive unit tests written with Vitest to ensure code
  quality and reliability.
- **CI Workflow / Docker Support**: Fully containerized application setup,
  combined with a Github Actions CI Workflow to run test coverage on push to the
  main branch.

## Technologies Used

### Frontend

- **React**: Library for building user interfaces.
- **TypeScript**: Type-safe JavaScript for better developer experience and
  maintainability.
- **SASS/SCSS**: Modular styling with variables, mixins, and reusable styles.
- **React Icons**: Icon library for UI enhancements.
- **Axios**: A promise-based HTTP Client for node.js and the browser.

### Testing

- **Vitest**: Testing framework for fast and reliable unit tests.
- **Testing Library**: Utilities for testing React components.

### Tooling

- **Vite**: Modern build tool for a fast development experience.
- **Docker**: Containerization for development and deployment.
- **GitHub Actions**: CI pipeline for testing and log collection.

## Getting Started

### Prerequisites

- **Node.js**: Version 18 or later
- **Docker**: Installed and running
- **Git**: Installed for repository cloning

### Setup Instructions

1. **Clone the repository**:

```bash
git clone https://github.com/oliver-lister/swipejobs-frontend-developer-technical-test.git
```

2. **Navigate to the project directory**:

```bash
cd swipejobs-frontend-developer-technical-test
```

3. **Install dependencies**:

```bash
npm install
```

4. **Run development server**:

```bash
npm run dev
```

### Running Tests

To run tests and check coverage, use:

```bash
npm run coverage
```
