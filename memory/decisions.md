# decisions.md — Vivara

Format: **Decision** — _why_ — (status)

1. **Static site on GitHub Pages** — free, version-controlled, deterministic, custom-domain-ready later with zero rebuild. — (locked)

2. **Hybrid source of truth: GitHub (static) + Google Sheets (dynamic)** — fixed content/assets live in git (versioned, safe); catalogue + leads live in Sheets so Ruchi self-edits without touching code. — (locked)

3. **Google Apps Script Web App as the form→Sheets→email bridge** — a static site can't reach Sheets directly; Apps Script is free, needs no paid keys or billing, and keeps logic deterministic. Single most important architectural decision. — (locked, verify in Phase L)

4. **Catalogue read via published CSV (or build-time bake)** — avoids paid Sheets API; simple and free. — (locked, verify in Phase L)

5. **Location = paste-Maps-link + facing-direction dropdown for v1** — paid Maps JS API needs billing (halt risk). This captures the two Vastu inputs that matter (location + orientation) with zero dependency risk. Leaflet/OSM pin-drop deferred as optional enhancement. — (locked for v1)

6. **"Enquire to buy" — no payment gateway in v1** — Simplicity First; objects showcased, interest routes through the unified enquiry path. Real checkout (Razorpay/Stripe) only if demand proves it out. — (locked)

7. **Unified enquiry payload: Leads-sheet row → email notification → WhatsApp handoff** — single deterministic path for consultations, objects, and general enquiries; WhatsApp is the priority human touch. — (locked)

8. **WhatsApp click-to-chat (`wa.me`), not Business API** — no API setup or approval needed; just the number. — (locked)

9. **No CMS in v1; Sanity/WordPress only if outgrown** — avoids cost/complexity; git + Sheets covers current needs. — (locked, future fork)

10. **Philosophy-first information architecture** — Behavioral Rules require purpose before transaction; trust is built before any CTA. Drives section order in Phase S. — (locked)
