# Portfolio

Personal site of Karli Surya Venkata Prakash Rao. Plain HTML, CSS and a few lines of JavaScript: no build step, no dependencies.

- Live: https://karriprakash.github.io/Portfolio.github.io/
- Edit `index.html` for content, `style.css` for looks. Push to `main` and GitHub Pages redeploys.
- Preview locally: `python3 -m http.server` in this folder, then open http://localhost:8000.

## Open roles, comments and ideas

- Roles live in `data/jobs.js`. Add, edit or delete entries there; the page renders them.
- Each role has a shareable link (`#role-<id>`) that opens straight to its comments, plus Share and WhatsApp buttons.
- Comments use [giscus](https://giscus.app) and are stored in this repo's GitHub Discussions. **One-time setup:**
  1. Settings → General → Features → tick **Discussions**.
  2. In the Discussions tab, create two categories: **Open roles** (format: Open-ended discussion) and **Ideas** (slug `ideas`, format: Open-ended discussion).
  3. Install the giscus app: https://github.com/apps/giscus (give it access to this repo only).
  4. Open https://giscus.app, enter this repo, pick the **Open roles** category, and copy `data-category-id` into `categoryId` in `data/jobs.js`.
- Until step 4 is done, each role's Comments button shows a link to GitHub Discussions instead.
- "Share an idea" opens the form in `.github/DISCUSSION_TEMPLATE/ideas.yml`.
