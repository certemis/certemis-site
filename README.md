# Certemis — website

Static marketing site for Certemis (the operational memory layer for companies).
Plain HTML/CSS/JS — no build step. Deployed on Cloudflare Pages.

## Structure
- `index.html` — home
- `product.html` — product
- `how-it-works.html` — how it works
- `early-access.html` — founding-member application
- `styles.css` — shared styles
- `site.js` — i18n (EN/PL), interactions, waitlist form
- `assets/` — logo + favicon (SVG)

## Edit & deploy
1. Edit files locally / on the server.
2. `git add -A && git commit -m "update" && git push`
3. Cloudflare Pages auto-publishes. Refresh certemis.com.

## Newsletter form
In `site.js`, set `FORM_ACTION` to your Formspree endpoint
(e.g. `https://formspree.io/f/XXXXXXXX`) to start collecting applications.
