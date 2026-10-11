# Portfolio

My personal developer portfolio. A single page with a toggle that switches the
whole design between two themes — a deep-space "tesseract" dark mode and a
golden-hour "Green Gables" meadow light mode — over the same content.

Built with plain HTML, CSS, and vanilla JavaScript. No build step, no
dependencies. The hero scenes are generated with SVG at runtime.

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
