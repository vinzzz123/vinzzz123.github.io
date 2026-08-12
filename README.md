# vinzzz123.github.io

Personal portfolio of **Kristofferus Vincentio Widjaya** — software engineer.

**Live:** https://vinzzz123.github.io

## About

A static portfolio built with vanilla HTML, CSS, and JavaScript — no framework, no
build step, no dependencies. Deploys to GitHub Pages as a straight file drop.

### Features

- Light and dark themes, following the OS preference with a manual override that persists
- Responsive down to 480px, with an off-canvas menu on small screens
- Scroll-reveal animation that degrades safely — content stays visible without JavaScript
- Honours `prefers-reduced-motion`
- Keyboard-accessible navigation, skip link, visible focus rings
- Full Open Graph and Twitter card metadata
- Print stylesheet

## Structure

```
index.html              Portfolio — hero, work, about, experience, contact
projects/
  prism.html            Case study: internal billing dashboard (internship)
  38-nil.html           Case study: football draft game
  kyokushin.html        Case study: member management site
assets/
  css/style.css         Design system and all page styles
  js/main.js            Theme, navigation, scroll reveal
  img/                  Screenshots and favicon
  cv.pdf                Résumé
404.html
robots.txt · sitemap.xml
docs/                   Project analysis and build notes (not part of the site)
```

## Development

No toolchain required. Open `index.html`, or serve locally:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000

## Design system

Tokens live at the top of `assets/css/style.css` — colour, spacing, radius, elevation,
and motion, with a dark-mode block that overrides the colour set only. Adding a page
means writing markup against existing component classes, not new CSS.

The brand gradient is `#0ea5e9 → #8b5cf6`. Type is Inter throughout, on a fluid
`clamp()` scale.

## Contact

- GitHub — [@vinzzz123](https://github.com/vinzzz123)
- LinkedIn — [Kristofferus Widjaya](https://www.linkedin.com/in/kristofferus-widjaya-05342628a/)
- Email — widjayavinz@gmail.com

## Licence

© 2026 Kristofferus Vincentio Widjaya. All rights reserved.
