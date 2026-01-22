# Multi-Step Form

A modern, responsive multi-step form built with Next.js 15, TypeScript, Tailwind CSS, and Shadcn/ui components.

## 🚀 Getting Started

### Live preview

[https://se-yam.netlify.app/](https://talent-seek.netlify.app/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Seyam08/multi-step-form.git
```

```bash
cd multi-step-form
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev

```

4. Building for Production

```bash
npm run build
# or
yarn build
```

5. Starting Production Server

```bash
npm start
# or
yarn start
```

6. Linting

```bash
npm run lint
# or
yarn lint
```

The application will be available at `http://localhost:3000`

## Workflow

This project implements a multi-step form in a React + TypeScript environment using `react-hook-form` and `zod` for validation. Here’s an overview of how the workflow is managed:

### Multi-Step Form Structure

- The multi-step form is split into **5 separate form components**, each managed with its own `useForm` hook from `react-hook-form`.
- Each step has its own component, making the code modular and easier to maintain.

### Managing the Form Flow

- A parent component, `MultiStepForm.tsx`, manages the **current step state** and determines which form component to display.
- This parent component also maintains a **global state** that consolidates all data from the 5 steps. This allows us to access all form values in a single place.

### Syncing with Global State

- To keep form data synchronized with the global state, each step component receives the relevant portion of the state and updates it using `setValue` in a `useEffect` when the component mounts.
- This approach ensures that navigating back and forth between steps preserves previously entered data.

### Validation

- Each form has its own schema defined in the `schemas` folder using **Zod**, as per task requirements.
- Dependent fields are handled in two ways:
  - **Within the same form:** `watch()` from `react-hook-form` is used to track changes.
  - **Across different forms:** the global state is used to access values from other steps.

### Known Issues & Improvements

Some functionality could not be fully implemented due to time constraints. These include:

1. Profile picture preview and removal options.
2. Phone number field with a country code dropdown.
3. Dropdown options not updating with previous state when navigating back (global state has the data).
4. Job type selection not preserving previous value when returning to the step (global state has the data).
5. Skills selection with dynamic checkboxes not managing state properly when navigating back.
6. Manager selection should be required in some cases (>50%), currently optional.
7. Guardian info should be required based on age, currently optional due to time constraints.
8. Prop types and interfaces are not fully separated yet.
9. Unsaved changes warning feature is not implemented yet — further study is needed for this.

These bugs and improvements are planned for future practice and refinement.

### Learning & Notes

- Despite being a beginner in **Next.js** and **TypeScript**, the task was completed by:
  - Watching a crash course video
  - Reading official documentation
  - Leveraging AI to explore Zod validation options
- Although I had no prior hands-on experience on **Next.js**, I was able to quickly learn and implement the required concepts effectively. This project served as a hands-on opportunity to learn how to combine **react-hook-form** and **Zod** for multi-step forms.

## 🏗️ Project Structure

```
multi-step-form/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx          # Home page component
├── components/            # React components
│   ├── Form/             # Form-related components
│   │   ├── MultiStepForm.tsx
│   │   ├── StepOne/     # Form steps
│   │   ├── StepTwo/
│   │   ├── StepThree/
│   │   ├── StepFour/
│   │   └── StepFive/
│   ├── TimeRange/        # Time range picker component
│   ├── ui/               # Shadcn/ui components
│   ├── ModeToggle.tsx    # Theme switcher
│   └── theme-provider.tsx
├── lib/                  # Utility functions
├── mock-data/            # Mock data for development
├── public/               # Static assets
└── schemas/              # Zod validation schemas
```

## 🛠️ Tech Stack

- **Framework:** Next.js 15.5
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **Theme:** Next-themes for dark/light mode
- **Icons:** Lucide React

## 🌟 Features

- Multi-step form with validation
- Responsive design
- Dark/Light mode support
- Form state management
- Time range picker
- Skills selection with experience input
- Remote work preference settings
- Form validation using Zod schemas
- Progress tracking
