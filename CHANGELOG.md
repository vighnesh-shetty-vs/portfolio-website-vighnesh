# Changelog

Every change to the portfolio, newest first. Automated runs follow `IMPROVEMENT_PLAYBOOK.md`.

## How to revert

- **One change:** open its PR on GitHub and press **Revert**, then merge the revert PR. Or locally:
  `git revert -m 1 <merge-commit>` (for a direct commit: `git revert <commit>`), then push.
- **Back to a known-good state:** each state below has a tag. To restore one without rewriting
  history: `git checkout main && git revert --no-commit <tag>..HEAD && git commit -m "Roll back to <tag>"`, then push.
- **See any old version:** `git checkout <tag>` (read only), or browse the tag on GitHub.

| Tag | State |
| --- | --- |
| `site-2026-10-17-original` | Portfolio before the revamp (commit `cc820f5`) |
| `site-2026-10-18-revamp` | Revamp: case study, notes, proof strip (commit `651d271`) |
| `site-2026-10-18-single-cv` | One CV in EN + FR (commit `d2521c5`) |
| `site-2026-10-20-baseline` | Benchmark title fix + this changelog: starting point for weekly runs |

## 2026-10-26 · Styled 404 page and sitemap
- **Branch / PR:** auto/2026-10-26-404-sitemap · see PR
- **What changed:**
  - New `404.html` in the site's dark/glass style: "Row not found" heading, four quick links
    (home, bank-analytics case study, projects, CV EN/FR) and the contact email. `noindex`, and
    all links are root-relative (`/portfolio-website-vighnesh/...`) so it works at any missing URL depth.
  - New `sitemap.xml` listing the homepage and the case study.
  - `robots.txt` skipped on purpose: crawlers only read it at the domain root
    (`vighnesh-shetty-vs.github.io/robots.txt`), which belongs to a different repo. Backlog line updated.
- **Files:** `404.html`, `sitemap.xml`, `IMPROVEMENT_PLAYBOOK.md`, `CHANGELOG.md`
- **Why / inspiration:** Backlog item. Stripe's 404 (https://stripe.com) turns a dead end into a
  short list of where visitors usually want to go; re-implemented here with this site's own pages.
- **Sites reviewed:** https://brittanychiang.com/ (engineer portfolio), https://stripe.com/this-page-does-not-exist
  (404 handling), https://linear.app/this-page-does-not-exist (redirects to login: nothing to take),
  https://ria08.github.io/ria-portfolio/ (data-analyst portfolio leading each project with the business impact)
- **Checks:** served at `/portfolio-website-vighnesh/` (same path as GitHub Pages); index, case study and
  404 at 1280px and 375px: no horizontal scroll, no broken local links or images, all `.fade-up` cards
  visible after jumping to each section, console shows only the existing Tailwind-CDN warning.
  New files total ~6 KB.
- **Revert:** Revert button on the PR, or `git revert -m 1 <merge-commit>`; full rollback to any
  earlier state with the release tags listed above.

## 2026-10-20 · Benchmark title, changelog and weekly process
- **What changed:** Benchmark Computer Solutions role renamed "Business Analyst" to match the CV;
  added `CHANGELOG.md`, `IMPROVEMENT_PLAYBOOK.md` and `_config.yml` (keeps both files off the
  public site).
- **Files:** `index.html`, `CHANGELOG.md`, `IMPROVEMENT_PLAYBOOK.md`, `_config.yml`
- **Revert:** `git revert <commit>`

## 2026-10-18 · One CV in English and French (`d2521c5`)
- **What changed:** replaced the two role-based CVs with one master CV (EN) plus a French version,
  built by the CV pipeline; CSB shown as two roles; "Designed and audited 300+ APIs"; old
  `CV_*_2026.pdf` URLs kept, serving the new English CV.
- **Files:** `index.html`, `Vighnesh_Shetty_CV_EN.pdf`, `Vighnesh_Shetty_CV_FR.pdf`, `CV_*_2026.pdf`
- **Revert:** `git revert d2521c5`

## 2026-10-18 · Portfolio revamp (`651d271`)
- **What changed:** fixed invisible project cards; hero proof strip and CTAs; About section;
  featured bank-analytics case with interactive explorer and a full case-study page; projects cut
  to 4 cards plus a compact list; lesson line per role; Notes section; Open Graph image, JSON-LD,
  favicon; shared `assets/site.css` and `assets/site.js`.
- **Why / inspiration:** comparison with https://vigneshwari2408.github.io/vigneshwari-portfolio/
  (case-file storytelling, lessons per job, work-in-progress section).
- **Sites reviewed:** https://vigneshwari2408.github.io/vigneshwari-portfolio/
- **Revert:** `git revert 651d271`
