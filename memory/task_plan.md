# task_plan.md — Vivara

**North Star:** Create environments that nurture a blissful life and empower people to realise their highest potential. Win = a resonating visitor reaches out (qualified enquiry).

**Approval gate:** Blueprint must be signed off before any `/execution/` logic. → _Awaiting sign-off._

---

## Phase B — Blueprint  ✅ COMPLETE
- [x] North Star defined
- [x] Integrations listed (WhatsApp, Email, callback form, Maps/location, enquire-to-buy)
- [x] Source of Truth defined (GitHub static + Google Sheets dynamic)
- [x] Delivery Payload defined (Leads row → email → WhatsApp handoff)
- [x] Behavioral Rules captured
- [x] Data Schema written into CLAUDE.md
- [ ] **Blueprint signed off by owner** ← current gate

## Phase L — Link  ⏳
- [ ] Collect credentials: WhatsApp number, notify email, GitHub repo, Google account
- [ ] Create Google Sheet A (catalogue) + Sheet B (leads)
- [ ] Build + deploy Google Apps Script Web App (form → sheet + email)
- [ ] Probe: form POST → row appended (test in `/execution/`)
- [ ] Probe: email notification received
- [ ] Probe: `wa.me` link opens prefilled
- [ ] Probe: catalogue CSV reads correctly
- [ ] All links green before logic

## Phase A — Architect  ⏳
- [ ] SOP: enquiry capture & routing (`/architecture/`)
- [ ] SOP: catalogue ingestion & render
- [ ] SOP: location + facing-direction capture
- [ ] Navigation layer: form → validate → POST → confirm → WhatsApp handoff
- [ ] Tools in `/execution/`: form handler, catalogue loader, validators

## Phase S — Stylize  ⏳
- [ ] Design system (palette, type, spacing) per Behavioral Rules
- [ ] Sections: Hero/philosophy → trust → services → objects → about Ruchi → enquiry
- [ ] Format payloads (email layout, WhatsApp prefill, sheet columns)
- [ ] Verify step per output (screenshot / one-line command)
- [ ] Present to owner for sign-off

## Phase T — Trigger  ⏳
- [ ] Deploy to GitHub Pages
- [ ] Firing mechanism documented (form submit event; future cron not needed for static)
- [ ] Maintenance Log finalized in CLAUDE.md
- [ ] Self-annealing loop active
- [ ] Custom domain (deferred — zero-rebuild swap later)
