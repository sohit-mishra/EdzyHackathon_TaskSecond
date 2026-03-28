# 📚 Enrollment Multi-Step Form (Next.js + TypeScript)

A modern, responsive multi-step enrollment form built with Next.js, TypeScript, and Tailwind CSS. Features form validation, state persistence, and smooth animations.

## 🚀 Features

- **Multi-Step Form**: Guided enrollment process across multiple steps
- **Form Validation**: Robust validation using Zod schemas
- **State Persistence**: Form data persists across page reloads
- **Route Protection**: Guards to prevent skipping steps
- **404 Handling**: Custom not-found page
- **Animations**: Smooth transitions with Framer Motion
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🧰 Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Form Handling**: react-hook-form
- **Validation**: Zod
- **Animations**: Framer Motion
- **State Management**: Zustand / React Context

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sohit-mishra/EdzyHackathon_TaskSecond.git
   cd tasksecond
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
app/
├── enroll/
│   ├── step-1/
│   ├── step-2/
│   ├── step-3/
│   └── review/
├── globals.css
├── layout.tsx
├── not-found.tsx
└── page.tsx
components/
├── common/
├── form/
├── layout/
└── ui/
context/
hooks/
lib/
public/
schemas/
services/
store/
types/
```

## 🔁 Routes

- `/enroll/step-1` - Personal Information
- `/enroll/step-2` - Additional Details
- `/enroll/step-3` - Preferences
- `/enroll/review` - Review & Submit

## 📜 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🧑‍💻 Author

Sohit Mishra
