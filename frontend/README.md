# 🚀 Portfolio – Vite + React

## Quick Start

### 1. Install Node.js (one-time setup)
Download from https://nodejs.org → choose the **LTS** version → install it.

Verify it worked:
```bash
node -v    # should show v18 or higher
npm -v     # should show v9 or higher
```

### 2. Extract this project folder somewhere on your computer

### 3. Open terminal in the project folder
- **Windows**: Right-click inside the folder → "Open in Terminal"
- **Mac**: Right-click the folder → "New Terminal at Folder"

### 4. Install dependencies (one-time, takes ~30 seconds)
```bash
npm install
```

### 5. Start the dev server
```bash
npm run dev
```

Open your browser at **http://localhost:5173** — you'll see your portfolio live! 🎉

Any time you save a file, the browser updates instantly.

---

## Project Structure

```
portfolio/
├── index.html                  ← HTML entry point
├── vite.config.js              ← Vite config
├── package.json                ← Project dependencies
└── src/
    ├── main.jsx                ← React entry point
    ├── App.jsx                 ← Root layout + scroll tracking
    ├── data/
    │   └── index.js            ← ✏️  EDIT THIS to update your content
    ├── components/
    │   ├── CursorGlow.jsx      ← Cursor glow canvas effect
    │   ├── LeftPanel.jsx       ← Sticky sidebar (name, nav, socials)
    │   └── LeftPanel.css
    ├── sections/
    │   ├── About.jsx           ← About section
    │   ├── Experience.jsx      ← Work experience cards
    │   ├── Projects.jsx        ← Project cards
    │   ├── Footer.jsx          ← Footer note
    │   └── sections.css        ← Shared section styles
    └── styles/
        ├── global.css          ← CSS variables, resets, scrollbar
        └── App.css             ← Main layout styles
```

## To Personalise

1. Open `src/data/index.js`
2. Update `PROFILE`, `ABOUT_PARAGRAPHS`, `EXPERIENCE`, and `PROJECTS`
3. Save → browser updates instantly

## Build for Production
```bash
npm run build
```
Output goes to `dist/` folder — upload that to Vercel, Netlify, or GitHub Pages.
