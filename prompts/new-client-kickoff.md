# New-client kickoff prompt

Use this when starting a new client site. Two steps:

1. Clone `treatment-center-starter` into a new folder, named for the client.
2. Open Claude Code **inside that new folder**, then paste the prompt below as your first message. The agency-level `~/.claude/CLAUDE.md` loads automatically — you don't have to re-explain conventions.

---

## The prompt (copy from here ↓)

I'm starting a new client site, cloned from `treatment-center-starter`. The build system, JSON-LD scaffolding, page templates, and partials are already in place — every client-specific value lives in `[BRACKETS]` placeholders.

Here's everything I have on the client. Please:

1. Read the materials below.
2. Update this project's `CLAUDE.md` with the client's NAP, brand, practitioner, vertical, and any quirks worth remembering across sessions.
3. Find-and-replace every `[BRACKETS]` placeholder across `src/`, `partials/`, `sitemap.xml`, and `robots.txt` with the corresponding values from the intake.
4. If the client sent a logo or photos, tell me exactly where each file should go (`images/logo.svg`, `images/hero.webp`, `images/team/<name>.jpg`).
5. Run `node scripts/build-html.mjs` and confirm the homepage renders with no leftover placeholders.
6. After the build, list anything still missing before we can ship the homepage to the client for review. Ask me before guessing on anything ambiguous.

Medical/YMYL rule applies: clinical claims need this client's lead practitioner to sign off before publishing. Treat anything you draft as a draft until they approve it.

### Client snapshot

- **Center name**:
- **City, state**:
- **Existing website (if any)**:
- **Deadline / launch goal**:

### Filled client intake form

[Paste the contents of the client's filled `CLIENT-INTAKE.md` below this line.]

### Additional materials I have

[List what you've collected — paths to the logo file, the photo folder, the brand guide PDF, competitor URLs, etc. If files are attached to this chat, mention them by name.]

### Notes for the project

[Anything I should know going in — clinician availability for sign-off, sensitive topics to avoid, voice samples the client liked, tight deadlines, any "do not say X" rules.]
