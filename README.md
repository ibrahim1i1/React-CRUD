# Task Cards — React CRUD App

A clean, responsive CRUD (Create, Read, Update, Delete) task cards web application built with **React**, **TypeScript**, and **Tailwind CSS**, featuring instant data persistence using the browser's `localStorage`.

## Features

- **Create Items:** Add new cards using the Add button or by pressing `Enter`.
- **Edit Mode:** Edit existing cards in place with visual highlighting, a dynamic `Save` button, and a `Cancel` option.
- **Delete Items:** Remove any card instantly, automatically resetting edit mode if the active item is deleted.
- **Persistent Storage:** All cards are automatically saved to `localStorage` so data stays intact after page refreshes.
- **Input Validation:** Trims whitespace to prevent adding empty cards.
- **Modern Dark UI:** Responsive layout with an item counter and a clean empty state.

## Tech Stack

- **React** (Hooks: `useState`)
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Web Storage API** (`localStorage`)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR-USERNAME/react-crud-cards.git](https://github.com/YOUR-USERNAME/react-crud-cards.git)
   cd react-crud-cards
