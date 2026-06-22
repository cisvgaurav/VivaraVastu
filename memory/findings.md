# findings.md — Vivara

## Key constraint discovered (shapes the whole architecture)
A **static site** (GitHub Pages) cannot read/write Google Sheets directly — no server. It needs one connective piece.
**Resolution:** a **Google Apps Script Web App** as the deterministic bridge. The form POSTs to it; it appends the Leads row and sends the email. The catalogue is read by publishing Sheet A as CSV (or baked at build time). This keeps the stack **100% free, no paid API keys, no billing account** — nothing that becomes a broken-link halt.

## Hosting
- GitHub Pages — free, version-controlled, custom-domain-ready later (zero rebuild to attach).

## Location / orientation (Vastu input)
- Paid Google Maps JS API would require a billing account → avoided for v1.
- v1 default: **"paste your Google Maps link" field + facing-direction dropdown** (N…NW). Robust, mobile-friendly, no library risk.
- Optional later: Leaflet + OpenStreetMap pin-drop (free, captures lat/lng) — flagged as a Phase A enhancement, not v1-blocking.

## Contact routing
- WhatsApp click-to-chat via `https://wa.me/<number>?text=<prefill>` — no API, just the number.
- Email notification handled inside the Apps Script (MailApp) — no separate email service needed.

## Audience insight (from Behavioral Rules)
- "Balanced bridge" framing + Ruchi's civil-engineering credibility unlocks **two audiences** (believers + skeptics). Design and copy must serve both — credible to one, meaningful to the other.

## To validate empirically in Phase L
- Live Apps Script POST handshake (the one real risk point).
- CSV publish/read of catalogue sheet.
- These are verified by running the probe scripts — not assumed.

## Accelerators to reach for when building (not yet pulled)
- Apps Script "form → sheet + email" pattern (well-established).
- Leaflet/OSM for optional map.
- A lightweight, dependency-free build (HTML/CSS/JS or a minimal static setup) to stay deterministic and fast on Pages.

## Phase L verification note (2026-06-21)
- The build sandbox cannot reach `script.google.com` (egress allow-list = GitHub/npm/pypi only). The Apps Script link must be verified **client-side** by the owner (browser health check + curl POST). Not a deployment fault.
- **CORS forward-flag for Phase A:** a browser `fetch` POST to an Apps Script `/exec` triggers a preflight the script won't answer. Fix when wiring the form: send the body as `Content-Type: text/plain;charset=utf-8` (a "simple request" that skips preflight) — `e.postData.contents` still receives the JSON string and `JSON.parse` still works. Verify empirically when the form is built.
