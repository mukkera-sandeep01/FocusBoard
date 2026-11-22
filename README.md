# FocusBoard — Task Management Dashboard

A responsive, frontend-only task dashboard built with React, Vite and JavaScript.

## Features

- Responsive desktop, tablet and mobile layouts
- Create, edit and delete tasks
- Required-field validation for task title and due date
- Task statuses: To do, In progress and Completed
- Priority levels: Low, Medium and High
- Case-insensitive title search
- Status tabs and priority filter work together
- Dashboard statistics are calculated from current task data
- Three-slide Focus Notes carousel with previous/next and slide indicators
- Tasks persist in browser localStorage after refresh
- Semantic labels and accessible button names

## Requirements

- Node.js LTS (includes npm)
- VS Code or another code editor

## Run locally

1. Download and install Node.js LTS from https://nodejs.org/
2. Extract this project folder.
3. Open the `focusboard` folder in VS Code.
4. Open Terminal → New Terminal.
5. Run:

   ```bash
   npm install
   npm run dev
   ```

6. Open the local URL printed in the terminal (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

The production files are generated in the `dist` folder.

## State management

React `useState` manages interface state such as the selected tab, search text, form visibility and carousel slide. The custom `useLocalStorage` hook stores the task list in browser localStorage. The task list is the single source of truth; statistics and filtered tasks are derived from it.

## Project structure

```text
focusboard/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── AI_USAGE.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    ├── components/
    │   ├── FocusNotes.jsx
    │   ├── StatCard.jsx
    │   ├── TaskForm.jsx
    │   └── TaskItem.jsx
    ├── data/
    │   └── sampleTasks.js
    └── hooks/
        └── useLocalStorage.js
```

## Design note and limitations

This is an original implementation based on the written FocusBoard assessment requirements. Before final submission, compare it with the live Figma frames and adjust visual details such as exact typography, spacing, colors and carousel copy. Calendar and Settings are navigation placeholders because the brief does not require their full functionality. No backend or login is included, as the assessment specifies a frontend-only application.

## Deployment

You can deploy the project on Vercel or Netlify. Connect the public GitHub repository and use the default Vite build settings:

- Build command: `npm run build`
- Output directory: `dist`

Add the final public deployment URL here before submission.
