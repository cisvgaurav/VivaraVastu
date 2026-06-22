# CLAUDE.md — Vivara Project Constitution

> **Vivara — crafted for exuberant living.**
> Vastu consulting + Vastu-inspired architectural objects.
> Consultant: **Ruchi Deshmukh** — Civil Engineer & Vastu Consultant · 500+ residential and commercial clients.

**Project status:** Phase B (Blueprint) complete. **EXECUTION HALTED** — no logic in `/execution/` until this Constitution is signed off and Phase L (Link) verification is green.

---

## 1. North Star

> Create environments that nurture a blissful life and empower people to realise their highest potential.

**The win:** A visitor resonates with this philosophy and reaches out — trusting Ruchi and Vivara to help create spaces (or provide objects) that elevate their well-being, purpose, and potential. Success is the move from *curiosity* → *connection*: a **qualified** enquiry, not raw traffic.

Every decision in this build is measured against this. If a feature does not build trust or ease the path from "this is beautiful" to "I trust Ruchi," it does not ship in v1.

---

## 2. Data Schema (Data-First — defined before any code)

### 2.1 Enquiry — INPUT (collected by the website form)

```json
{
  "name": "string (required)",
  "phone": "string (required, E.164-ish, used for WhatsApp handoff)",
  "email": "string (optional, recommended)",
  "enquiry_type": "consultation | object | general",
  "space_type": "new_home | existing_home | commercial | other",
  "property_location": {
    "maps_link": "string | null",
    "lat": "number | null",
    "lng": "number | null",
    "facing_direction": "N | NE | E | SE | S | SW | W | NW | unknown"
  },
  "object_of_interest": "string | null  (catalogue item name/slug if enquiry_type = object)",
  "message": "string (optional)",
  "preferred_contact": "whatsapp | call | email",
  "consent": "boolean (must be true to submit)",
  "submitted_at": "string (ISO 8601)"
}
```

### 2.2 Enquiry — OUTPUT (the Delivery Payload; project is "Complete" only when this lands)

The form POSTs to the Google Apps Script Web App, which performs three deterministic actions:

```json
{
  "1_leads_sheet_row": {
    "timestamp": "ISO 8601",
    "name": "...",
    "phone": "...",
    "email": "...",
    "enquiry_type": "...",
    "space_type": "...",
    "facing_direction": "...",
    "maps_link": "...",
    "lat": "...",
    "lng": "...",
    "object_of_interest": "...",
    "message": "...",
    "preferred_contact": "...",
    "status": "new",
    "source": "website_form"
  },
  "2_email_notification": {
    "to": "VIVARA_NOTIFY_EMAIL",
    "subject": "New Vivara enquiry — {name} ({enquiry_type})",
    "body": "All fields, formatted for quick reading"
  },
  "3_whatsapp_handoff": {
    "url": "https://wa.me/{VIVARA_WHATSAPP_NUMBER}?text={prefilled_context}",
    "note": "Priority human touch. Visitor is invited to continue on WhatsApp after submit."
  }
}
```

### 2.3 Catalogue Object — read from Google Sheet A (Ruchi self-edits, no code)

```json
{
  "id": "string (slug, e.g. 'brass-meru-yantra')",
  "name": "string",
  "description": "string",
  "price": "string  (number or 'On enquiry')",
  "availability": "available | made_to_order | sold_out",
  "image_url": "string  (GitHub-hosted path or full URL)",
  "vastu_context": "string  (what it supports · where it belongs · how it contributes)",
  "category": "string | null",
  "enquiry_status": "string  (internal tracking, not shown on site)"
}
```

### 2.4 Static Content — versioned in GitHub (`/content/*.json` or markdown)

`philosophy`, `services[]`, `testimonials[]`, `ruchi_bio`, `about` — fixed text + image references, edited via commit.

---

## 3. Behavioral Rules (the soul — never violated)

**Voice:** a thoughtful expert helping you create a space that supports the life you want to live.
**Tone — four pillars:** *Serene* (calm, spacious) · *Elevated* (premium, not showy) · *Grounded* (clear, credible, never vague-mystical) · *Nurturing* (warm, reassuring).

**Must-do**
- Lead with philosophy **before** transaction. Purpose first; consultations, objects, and pricing after.
- Keep Ruchi visible and credible throughout — civil engineer, Vastu expertise, 500+ clients, stated confidently.
- Calm, breathable, "flowing" layout. Vibrant, never busy.
- Surface testimonials & trust signals early.
- CTAs are warm and guided: *"Begin your Vastu journey," "Request a consultation," "Speak with Ruchi," "Explore guidance for your space."*
- Position objects as meaningful Vastu-inspired additions — each with context (what it supports, where it belongs, how it contributes).
- Make both believers and skeptics comfortable.

**Must-not-do**
- No aggressive sales language ("BUY NOW," "LIMITED OFFER," "FIX YOUR HOME TODAY").
- No fear-based Vastu messaging. Never make people anxious.
- No clutter — no competing CTAs, pop-ups, animation overload, colour chaos.
- No generic spiritual stock imagery, cliché mandalas/incense, or wellness clichés. Look = crafted, architectural, Indian-inspired, premium.
- Don't lecture or over-explain Vastu like a textbook. Educate gently.
- Don't gatekeep to "only spiritual people" — speak to homeowners, families, professionals, businesses, architects.
- Never make Ruchi invisible behind the brand.

**The Vastu framing (strategic core):** A **balanced bridge** between traditional wisdom and architectural intelligence.
> "Rooted in ancient Vastu wisdom, refined through architectural understanding, and applied for modern living."

Speak to belief *and* to space, orientation, light, airflow, layout, circulation, materiality, and the emotional effect of design. Ruchi's engineering background is the differentiator that makes Vastu credible to skeptics and meaningful to believers.

---

## 4. Architectural Invariants (A.N.T. + non-negotiables)

- **Determinism over probability.** Business logic (lead routing, sheet writes, catalogue parsing) is plain, testable code — never left to model behaviour.
- **Free & broken-link-proof v1.** No paid API keys, no billing accounts that can fail or halt the build. Hosting: GitHub Pages.
- **A — Architecture** (`/architecture/`): markdown SOPs. Golden Rule: *if logic changes, update the SOP before the code.*
- **N — Navigation:** decision/routing layer — picks the right tool in the right order; does not do heavy lifting itself.
- **T — Tools** (`/execution/`): atomic, testable scripts. Credentials in `.env`. **All intermediate file ops route through `/.tmp/`.**
- **Surgical changes** — touch only what's asked. **Simplicity first** — no speculative abstraction.
- A project is **Complete** only when the Payload lands (Leads row + email + WhatsApp handoff working end-to-end).

---

## 5. Integrations & Source-of-Truth Map

| Concern | System | Credential status | Verify in Phase L |
|---|---|---|---|
| Site code, fixed content, brand assets, object photos | **GitHub** (source of truth, static) | repo TBD | repo + Pages deploy |
| Object catalogue (name/price/desc/availability/status) | **Google Sheet A** | TBD | published CSV read |
| Leads / enquiry tracking | **Google Sheet B** | TBD | Apps Script append |
| Form → Sheets + email bridge | **Google Apps Script Web App** | to create | POST handshake |
| Primary contact route | **WhatsApp** (click-to-chat) | number TBD | `wa.me` link opens |
| Notification / backup contact | **Email** | address TBD | test notification |
| Property location + orientation | **Maps link + facing dropdown** (free; Leaflet optional) | none needed | field captured |
| Payments | **None** — "enquire to buy" | n/a | n/a |

---

## 6. B.L.A.S.T. Phase Outputs

- **B — Blueprint:** ✅ Complete. North Star, Integrations, Source of Truth, Delivery Payload, Behavioral Rules.
- **L — Link:** ✅ Core loop green. Apps Script bridge deployed + verified (Leads row + email). Catalogue CSV + GitHub deploy deferred/in-progress.
- **A — Architect:** ✅ Complete. `architecture/SOP_website.md`; Navigation = form→validate→POST→confirm→handoff; Tools in `/execution/`.
- **S — Stylize:** ✅ v1 signed off. `index.html` built, verified all-green, owner approved.
- **T — Trigger:** 🔵 In progress. Deploy package + guide ready; awaiting GitHub Pages publish + live form test (the final green).

---

## 7. Triggers

| Event | Firing mechanism | Result |
|---|---|---|
| Visitor submits enquiry | Browser form-submit → POST (text/plain) to Apps Script `/exec` | Leads row appended + email to Ruchi + WhatsApp handoff offered |
| Site content/code change | `git push` to `main` | GitHub Pages auto-redeploys (no build step) |
| Catalogue update (future) | Ruchi edits Catalogue sheet | Site reads published CSV on load |

No cron or server needed — the site is static; logic lives in the browser + the Apps Script bridge.

## 8. Maintenance Log

**Self-annealing repair loop** — when anything fails:
1. **Analyze** the exact error (Apps Script execution log, browser console, probe output). Never guess.
2. **Patch** the script in `/execution/` or `index.html`.
3. **Test** — re-run `probe_enquiry.mjs` and/or re-submit on the live site.
4. **Update the SOP** in `/architecture/` so the same error can't recur. Append the entry below.

**Key facts**
- Live website file: `index.html` (root). Config block at top of its `<script>` = only edit point for `APPS_SCRIPT_URL` and `WHATSAPP_NUMBER`.
- Bridge logic: `execution/apps_script_Code.gs` (lives in the Leads sheet's Apps Script project). `NOTIFY_EMAIL` set at top.
- Leads sheet column order is contractual (CLAUDE.md §2.2) — never reorder without updating the bridge + this constitution.
- To rotate the bridge: redeploy Apps Script → new `/exec` URL → update `APPS_SCRIPT_URL` in `index.html`.

**Log**

| Date | Symptom | Root cause | Fix | SOP updated |
|---|---|---|---|---|
| 2026-06-21 | Build sandbox couldn't POST to Apps Script | egress allow-list excludes Google | verify client-side (browser + curl) | findings.md |
| 2026-06-21 | (anticipated) browser CORS preflight on form POST | Apps Script doesn't answer OPTIONS | POST as `text/plain;charset=utf-8` (no preflight) | SOP_website.md |
