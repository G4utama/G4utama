# Portfolio site

Plain HTML/CSS/JS, no build step. Content lives in `data/*.json`; the JS in
`js/` fetches it and renders the pages.

## Running it locally

Because the pages `fetch()` the JSON files, opening `index.html` directly
from disk (`file://`) will fail in most browsers (CORS blocks local fetch).
Serve the folder instead:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then open `http://localhost:8000`.

## Editing content

- `data/about.json` — name, role, bio paragraphs, hobbies, photo path.
- `data/university.json` — two arrays, `computerScience` and `mathematics`.
  Each course has a `code`, `name`, a `skills` array (devicon icon names,
  see below) and an optional `project` (`{ "title": ..., "url": ... }`,
  or `null` if there isn't one).
- `data/projects.json` — a `categories` array; each category has a `name`
  and a `projects` array (`title`, `description`, `tools`, `repo`).
- `data/sites.json` — a `sites` array (`title`, `image`, `url`).

Photos referenced from JSON (`about.json`'s `photo`, `sites.json`'s
`image`) should be dropped into `assets/`.

## Icons

Skill/tool icons are pulled live from [devicon](https://devicon.dev) by
name, e.g. `"python"`, `"react"`, `"postgresql"` — see their
[icon list](https://devicon.dev) for exact names. Most icons use the
`-original` variant; a couple (like `linux`) only ship `-plain` — these are
listed in `js/common.js` (`PLAIN_ONLY`) so add to that set if an icon
doesn't show up.

## Structure

```
index.html          homepage, 4 cards
about.html / js/about.js
university.html / js/university.js
projects.html / js/projects.js
sites.html / js/sites.js
css/style.css        all styling, driven by the CSS variables at the top
js/common.js          shared fetch/DOM helpers
data/*.json            all editable content
assets/                 your images go here
```

## Deploying

Any static host works (GitHub Pages, Netlify, Vercel). For GitHub Pages:
push this folder to a repo and enable Pages on the `main` branch — no
build step needed.
