# Portfolio improvement playbook

Rules for the weekly automated improvement run (and for anyone editing by hand).
The run reads this file first and follows it exactly.

## Goal

Each week, ship **one focused improvement** that makes this portfolio more convincing to a
recruiter or technical lead hiring a data analyst for banking, fintech or risk. Inspiration
comes from reviewing other people's and companies' portfolio and product sites.

## The weekly run, step by step

1. `git checkout main && git pull --ff-only`. Read this file and `CHANGELOG.md`.
2. **Open PRs:** list open PRs whose branch starts with `auto/`. If 2 or more are open, do not
   create another: stop and report "waiting for review".
3. **Research:** look at 3–5 sites not already listed under "Sites reviewed" in the changelog.
   Mix data/analytics portfolios, engineer portfolios and well-designed company sites. Note what
   each does better than this site.
4. **Pick one improvement** from the research or the Backlog below (Backlog items come first
   when they're ready). One theme per run; at most ~3 small related edits.
5. Branch `auto/YYYY-MM-DD-short-slug` from `main`. Make the change.
6. **Verify** (all must pass, or abandon the run and report why):
   - Serve locally (`python -m http.server 8765 --bind 127.0.0.1`) and check every page at
     desktop and 375px mobile width: no horizontal scroll, no console errors, no broken images
     or local links, every `.fade-up` card visible after jumping to each section.
   - Facts unchanged unless the change is a sourced fact fix (see Content rules).
   - No new asset over 500 KB; total page weight not increased by more than 300 KB.
7. Add a CHANGELOG entry (format below) in the same branch. Commit, push the branch, open a PR
   with `gh pr create` whose body has: what changed, why (which site inspired it), the
   verification results, and "Revert: use the Revert button on this PR after merging, or
   `git revert -m 1 <merge-commit>`".
8. **Never** merge, push to `main`, force-push, delete branches or tags, or change repo settings.
   Vighnesh merges PRs himself.

## Content rules (most important)

- **Never invent facts about Vighnesh.** Allowed sources: what is already on this site; his
  public GitHub repo READMEs; the CV data file
  `../vighnesh-cv-pipeline/vighnesh-cv-pipeline/vighnesh_data.js` (read only).
- No invented testimonials, metrics, employers, clients, logos, awards or skills.
- Opinion lines in his voice (lessons, notes) may only be added as a draft, clearly marked in the
  PR body as "needs your wording check".
- Don't edit the CV PDFs: they are built by the CV pipeline.
- Don't copy text, code, images, fonts or branding from other sites. Re-implement ideas in this
  site's own style and credit the inspiration in the changelog only.

## Design and tech rules

- Keep the dark theme, the `--accent` cyan, Inter + JetBrains Mono, and the existing layout
  language (glass cards, `.fade-up`, `tech-tag`). Shared styles live in `assets/site.css`,
  shared JS in `assets/site.js`.
- No build step. Tailwind via the existing CDN. External scripts only from cdnjs, jsdelivr or
  unpkg, pinned versions.
- No analytics, trackers, cookies, forms that send data to third parties, or chat widgets.
- Accessibility: alt text, aria-labels on icon buttons, keyboard focus, `prefers-reduced-motion`.
- Content must stay readable if JavaScript fails.

## Backlog (ideas ready to pick up)

- [ ] Compress heavy media: `assets/Tableau` (~37 MB) and `assets/Hackathon` (~38 MB) videos and
      images (target under 5 MB each folder; keep originals out of the repo only if not linked).
- [ ] Case-study pages for the credit scorecard and the fraud engine, in the style of
      `case-bank-analytics.html` (facts from those repos' READMEs).
- [ ] `robots.txt`, `sitemap.xml` and a styled `404.html`.
- [ ] Print stylesheet so the homepage prints as a clean 2-page summary.
- [ ] Optional light theme toggle (dark stays the default).
- [ ] A small "Skills × evidence" matrix linking each skill to the project that proves it.
- [ ] Needs Vighnesh first: per-certificate credential links; real recommendations quoted from
      LinkedIn (with his OK).

## CHANGELOG entry format

```
## YYYY-MM-DD · <short title>
- **Branch / PR:** auto/YYYY-MM-DD-slug · #<PR number>
- **What changed:** <1–3 bullets>
- **Files:** <list>
- **Why / inspiration:** <site names + URLs reviewed, and what idea was taken>
- **Sites reviewed:** <every URL looked at this run>
- **Checks:** <desktop, mobile, links, console, size>
- **Revert:** Revert button on the PR, or `git revert -m 1 <merge-commit>`; full rollback to any
  earlier state with the release tags listed in CHANGELOG.md.
```
