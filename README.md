# treatment-center-starter

Reusable scaffolding for addiction-treatment and mental-health treatment center websites. Static HTML/CSS/JS assembled by a small Node build. **Not** a finished design — a fill-in-the-blanks starting point with the SEO done right out of the gate.

## What you get

- A working Node build: `src/<page>.html` + `partials/*.html` → built `index.html` files at the repo root.
- A homepage template (`src/index.html`) with full `MedicalBusiness` JSON-LD scaffolding.
- Templates for the two recurring page types: a program page and an addiction/condition page, each with `MedicalProcedure`/`MedicalCondition` + `BreadcrumbList` + `FAQPage` JSON-LD scaffolding.
- Header / footer / head-assets partials with placeholders for NAP and brand.
- `sitemap.xml` and `robots.txt` templates.
- An empty `css/styles.css` and `js/main.js` so the build runs out of the box.
- A **client intake form** (`CLIENT-INTAKE.md`) to send to new clients to collect everything we need.
- A **kickoff prompt** (`prompts/new-client-kickoff.md`) to paste into Claude Code once the intake comes back, so the build starts immediately.

## Workflow for each new client

1. Send the client `CLIENT-INTAKE.md` (the form). They fill it in and return it with their logo, hero photo, and any other assets.
2. Clone this starter into a folder named for the client (e.g., `acme-recovery/`).
3. Inside the new folder, paste `prompts/new-client-kickoff.md` into Claude Code as the first message, with the filled intake pasted in the marked slot. Claude will update `CLAUDE.md`, replace `[BRACKETS]`, run the build, and flag whatever is still missing.
4. Iterate on copy and design from there.

## Setup for a new client

1. **Clone or copy this folder** into a new client project directory. Rename it.
2. **Initialize git** and create a new GitHub repo for the client.
3. **Open `CLAUDE.md`** and fill in the client's NAP, brand, doctor/practitioner names, URL, geo coords, etc. This is the file Claude Code reads to learn who the client is — keep it accurate.
4. **Find-and-replace placeholders** across the project. The placeholders are in `[BRACKETS]`:
   - `[BRAND_NAME]` — e.g., "Northview Wellness"
   - `[CANONICAL_DOMAIN]` — e.g., `https://northviewwellness.com`
   - `[STREET_ADDRESS]`, `[CITY]`, `[STATE_ABBR]` (2-letter), `[STATE_NAME]`, `[ZIP]`, `[COUNTRY_CODE]` (US)
   - `[PHONE_DISPLAY]` (e.g., `(678) 626-1868`) and `[PHONE_TEL]` (e.g., `+16786261868`)
   - `[EMAIL]` — admissions email
   - `[LATITUDE]`, `[LONGITUDE]` — clinic coords (from Google Maps URL)
   - `[HOURS_OPEN]`, `[HOURS_CLOSE]` — e.g., `08:00`, `17:00`
   - `[AREA_CITIES]` — replace the placeholder city list inside `areaServed[]`
   - `[PRIMARY_KEYWORD]` and `[CITY]` in titles / H1s / meta descriptions
5. **Rename the page templates** to real pages. Start with copying `src/programs/_template-program.html` into the actual program pages you offer (PHP, IOP, OP, detox, MAT, etc.) and `src/addictions/_template-addiction.html` for each condition/addiction.
6. **Replace placeholder copy** with real client copy. Anything marked `[draft]` is medical/YMYL content that needs clinician sign-off before publishing.
7. **Wire up the design.** `css/styles.css` is intentionally empty — add the client's brand styles.
8. **Run the build.** `npm install` once, then `npm run build` after every source edit.

## Folder conventions

```
src/                    # editable source
├── index.html          # homepage
├── about.html          # (copy from index pattern, simplify)
├── contact.html
├── verify-insurance.html
├── programs/           # treatment programs (PHP, IOP, OP, detox, MAT, ...)
└── addictions/         # conditions treated
                        # → rename to "conditions/" for mental-health clients
partials/               # shared markup, injected with <!-- include:name -->
scripts/                # Node build
css/                    # editable stylesheets
js/                     # editable scripts
images/                 # assets
sitemap.xml             # update before launch
robots.txt
CLAUDE.md               # per-client facts — keep accurate
```

## Build system

- `<!-- include:header -->`, `<!-- include:footer -->`, `<!-- include:head-assets -->` injection markers in each `src/` page.
- `{{base}}` token resolves to the relative path back to the repo root (empty on homepage, `../../` on `programs/<name>/`).
- `{{home}}` token resolves to the homepage path (empty on homepage, `../../index.html` on subpages). Use for nav anchor links: `{{home}}#about`.
- After editing any `src/` or `partials/` file, run `node scripts/build-html.mjs` (or `npm run build` for assets too). Forgetting this is the most common source of "the page didn't update."

## SEO defaults built in

- `MedicalBusiness` JSON-LD on the homepage with full address, geo, hours, area served, services.
- `MedicalCondition` / `MedicalProcedure` JSON-LD on sub-pages.
- `BreadcrumbList` schema on every interior page.
- `FAQPage` schema where the page has a FAQ section.
- Canonical, Open Graph, Twitter Card meta on every page.
- `sitemap.xml` template that references every page; `robots.txt` references the sitemap.

## Working with Claude Code on this site

The user-level skills (`treatment-center-seo-audit`, `treatment-center-page-speed-audit`, `treatment-center-internal-links`) are available in every project — no per-project setup. They read the client's `CLAUDE.md` to learn the NAP, so as long as `CLAUDE.md` is accurate, the skills work without you re-explaining who the client is.
