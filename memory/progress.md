# progress.md — Vivara

## 2026-06-21 — Phase B (Blueprint)
- Ran full Discovery (5/5) with owner. All answers captured.
  - North Star (revised once to a philosophy-led statement).
  - Integrations: WhatsApp, Email, manual callback form, Maps (location + orientation), enquire-to-buy.
  - Source of Truth: GitHub (static) + Google Sheets (catalogue + leads).
  - Delivery Payload: Leads row → email → WhatsApp handoff; site on GitHub Pages (domain later).
  - Behavioral Rules: full spec received (tone, must/must-not, "balanced bridge" Vastu framing).
- Scaffolded project structure: `CLAUDE.md`, `/memory/*`, `/architecture/`, `/execution/`, `/.tmp/`, `.env.example`.
- Wrote Data Schema into CLAUDE.md (Enquiry in/out, Catalogue, Content).
- **EXECUTION HALTED** pending Blueprint sign-off.

### Errors / notes
- None yet. No code written. No tests run yet.

### Open items needed to start Phase L
- WhatsApp number (international format).
- Notification email address.
- GitHub repo (owner/name) + GitHub account confirmed.
- Google account for the two Sheets + Apps Script.

### Next
- Owner sign-off on Blueprint → begin Phase L (Link): create Sheets, deploy Apps Script, run probes.

## 2026-06-21 — Phase L (Link) opened
- Blueprint SIGNED OFF by owner.
- Built handshake kit in `/execution/`:
  - `apps_script_Code.gs` — form→Leads-sheet→email bridge (implements §2.2 output).
  - `probe_enquiry.mjs` — verification probe.
  - `LINK_SETUP.md` — step-by-step Google/WhatsApp setup + green checklist.
- Ran probe: **6/6 local checks GREEN** (payload validation, type/space/facing validity, wa.me URL build, email render). Live handshake correctly SKIPPED (no URL yet).
- HALT still in effect for Phase A — not all links green.

### Blocking on (to finish Phase L green)
- VIVARA_WHATSAPP_NUMBER, VIVARA_NOTIFY_EMAIL, VIVARA_APPS_SCRIPT_URL (after deploy), VIVARA_CATALOGUE_CSV_URL, GitHub repo.

## 2026-06-21 — Phase L: bridge link GREEN
- Owner deployed Apps Script Web App; /exec URL confirmed live (health check OK).
- Enquiry POST verified working (owner reported success). Core delivery loop — Leads row + email notification — operational.
- Remaining (non-blocking for core loop): catalogue CSV URL, GitHub repo for Pages deploy, WhatsApp number for handoff wiring.

## 2026-06-21 — Phase A + S: homepage built
- WhatsApp number deferred (placeholder, one-line swap).
- Phase A: wrote architecture/SOP_website.md (IA, enquiry flow, voice, design tokens).
- Phase S: built index.html — single-file static site, deploy-ready for GitHub Pages.
  - Direction: Vastu-Purusha-Mandala grid signature w/ open Brahmasthan center; peacock-teal + marigold + brass palette (avoided cream/terracotta default); Marcellus + Mukta type.
  - Enquiry form wired to live Apps Script bridge via text/plain POST (CORS-safe); consent-gated; all §2.1 schema fields present.
  - Objects: 3 placeholder pieces pending catalogue CSV.
- Verify: structural + wiring self-test ALL GREEN.
- Awaiting owner design sign-off before refinement/deploy (Phase T).

## 2026-06-21 — Phase T: deploy package ready
- Owner signed off on homepage v1 ("good for now, tweak later").
- Finalized CLAUDE.md §7 Triggers + §8 Maintenance Log (self-annealing loop + log).
- Added .gitignore, DEPLOY.md.
- Packaged repo-ready bundle (vivara.zip).
- Remaining for "Complete": owner pushes to GitHub + enables Pages + runs live form test (final green).
