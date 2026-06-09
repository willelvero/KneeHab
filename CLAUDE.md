# Kneehab — project guide

> **Fill this in before doing any client work.** Claude Code reads this file every session to learn who the client is. Inaccurate facts here propagate into the SEO audits and into any drafted copy.

## Client identity (NAP)

- **Name**: Kneehab
- **Address**: [STREET_ADDRESS], [CITY], [STATE_ABBR] [ZIP]
- **Phone (display)**: [PHONE_DISPLAY]
- **Phone (`tel:` format)**: [PHONE_TEL]   <!-- e.g., +16786261868 -->
- **Email**: [EMAIL]
- **Canonical URL**: [CANONICAL_DOMAIN]
- **Geo**: latitude [LATITUDE], longitude [LONGITUDE]
- **Hours**: Mon–Fri, [HOURS_OPEN]–[HOURS_CLOSE]

## Brand & practitioners

- **Founder / lead practitioner**: [PRACTITIONER_NAME], [CREDENTIALS]
- **Brand voice**: [one sentence — e.g., "calm, clinical, plainspoken, never sales-y"]
- **Vertical**: knee rehabilitation / orthopedic physical therapy
- **Primary GBP category**: [e.g., "Physical therapy clinic" or "Sports medicine clinic"]

## Stack

Static HTML/CSS/JS assembled by a small Node build:

- `npm run build` → builds CSS (csso) + JS (terser) + HTML (`node scripts/build-html.mjs`).
- Source: `src/*.html` + `partials/*.html`. Output: `<path>/index.html` at repo root.
- Build tokens: `{{base}}` (relative path to root), `{{home}}` (link to homepage).
- **After editing any source file, run the build.** Forgetting this leaves the served pages stale — this is the most common source of "why didn't it update?"

## SEO conventions on this site

- Schema: `MedicalBusiness` on the homepage; `MedicalProcedure` on program pages; `MedicalCondition` on addiction/condition pages; `BreadcrumbList` + `FAQPage` where applicable.
- NAP must match exactly across `<title>`, header, footer, JSON-LD, and the client's Google Business Profile.
- Internal-linking rule: only link words already in the prose. Build the program ⇄ condition cluster — every program page should cross-link siblings, every condition page should link to relevant programs, every child substance page should link to its parent category page.

## Medical / YMYL

Clinical claims need [PRACTITIONER_NAME]'s sign-off before publishing. Anything Claude drafts here is a draft until they review it.

## Project-specific quirks

[Any client-specific gotchas, design decisions, or constraints worth knowing for future sessions go here.]
