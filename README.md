# Portfolio

My personal developer portfolio. A single page with a toggle that switches the
whole design between two themes — a deep-space "tesseract" dark mode and a
golden-hour "Green Gables" meadow light mode — over the same content.

Built with plain HTML, CSS, and vanilla JavaScript. No build step, no
dependencies. The hero scenes are generated with SVG at runtime.

<img width="1881" height="880" alt="Screenshot 2026-10-10 215233" src="https://github.com/user-attachments/assets/94cca56d-db21-4f0f-8c43-666e854bf72a" />
<img width="1884" height="894" alt="Screenshot 2026-10-10 215210" src="https://github.com/user-attachments/assets/0c5d8ce0-4889-40e1-8851-f74d8adb58a5" />


## Structure

```
portfolio-project/
├── index.html        # markup + a tiny inline script that sets the theme before paint
├── css/
│   └── styles.css    # all styles, including both themes via [data-theme]
├── js/
│   └── main.js       # builds the two hero scenes + the theme toggle
└── README.md
```

## Run it locally

Just open `index.html` in a browser. For live-reload while editing, you can run
any static server, e.g. with Python:

```bash
python3 -m http.server
# then visit http://localhost:8000
```

## Deploy

Any static host works (GitHub Pages, Netlify, Vercel). Nothing to build —
point the host at this folder.

## To do

- [ ] Replace placeholder name, blurb, and links
- [ ] Add the three real projects (with screenshots + live/repo links)
- [ ] Fill in the experience entry
- [ ] Update the skills list
