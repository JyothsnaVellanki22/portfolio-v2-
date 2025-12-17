# Portfolio (v2)

A modern, accessible portfolio website built with **React**, **Vite**, and **Vanilla CSS**.  
Designed to showcase projects, experience, and skills with a premium dark-mode aesthetic.

## Features

- **Framework**: React 19 + Vite
- **Styling**: Vanilla CSS (Variables, Flexbox, Grid)
- **Routing**: React Router DOM
- **Icons**: React Icons (FaGithub, SiVercel, etc.)
- **Design**: Dark Graphite/Violet theme with "Spotlight" cursor effect.

## Getting Started

### Prerequisites

- Node.js installed (v16+ recommended).
- Git installed.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/JyothsnaVellanki22/portfolio-v2-.git
    cd portfolio-v2-
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running Locally

To start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

Previews the production build locally:

```bash
npm run preview
```

## Project Structure

```bash
src/
├── components/   # UI Components (Sidebar, Projects, Archive, etc.)
├── styles/       # CSS Files (variables.css, global.css, archive.css)
├── App.jsx       # Main Layout & Routing Logic
└── main.jsx      # Entry Point
```

## Deployment

This project is optimized for deployment on **Vercel**.
Simply import the repository in your Vercel dashboard, and it will auto-detect the Vite settings.
