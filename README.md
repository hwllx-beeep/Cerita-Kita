# My Notes - Date Ideas App

A responsive Next.js application for managing date ideas with interactive checkboxes and smooth animations.

## Features

- ✅ Interactive checkbox items with smooth animations
- 📱 Fully responsive design (mobile-first)
- 🎨 Beautiful dark theme with smooth transitions
- 📝 Add/delete sections and items
- 🧭 Sidebar navigation with smooth scrolling
- ⚡ Built with Next.js, TypeScript, and Framer Motion

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Main page with state management
│   └── globals.css        # Global styles
├── components/
│   ├── Sidebar.tsx        # Navigation sidebar
│   ├── NotesContent.tsx   # Main content area
│   ├── CheckboxItem.tsx   # Individual checkbox items
│   └── AddSectionDialog.tsx # Modal for adding sections
└── lib/
    └── utils.ts           # Utility functions
```

## Technologies Used

- **Next.js 13** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Build for Production

```bash
npm run build
```

This will create an optimized production build in the `out` directory.