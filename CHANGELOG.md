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

## 2026-10-30 · Launch videos for the flagship case and the 4 featured projects
- **What changed:** each featured project card now opens with a ~20 s launch video (muted loop that
  plays only while on screen, loaded lazily); "Watch with sound" opens the full version in the modal.
  The flagship case study gets its own video above the findings explorer. Reduced-motion visitors
  see the poster frame only. Videos built from each repo's own results and screenshots.
- **Files:** `index.html`, `assets/site.css`, `assets/site.js`, `assets/LaunchVideos/*` (11 MB total;
  each card loads a ~0.3 MB preview, the full ~1.8 MB file only on click)
- **Revert:** `git revert <merge-commit>`

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
