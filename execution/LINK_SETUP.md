# Phase L — Link Setup (the green checklist)

Goal: every external link verified by an actual probe before any site logic is built.
Nothing here costs money. No paid API keys.

## What you do (≈15 min, Google side)

**1. Create the Leads sheet (Sheet B)**
- New Google Sheet → name it `Vivara Leads`.
- Rename the first tab to `Leads`. Leave it empty — the bridge writes the header row on first submission.

**2. Deploy the bridge (Apps Script)**
- In that sheet: `Extensions` → `Apps Script`.
- Delete the placeholder, paste all of `execution/apps_script_Code.gs`.
- At the top, set `NOTIFY_EMAIL = "ruchi@example.com"` (her real inbox).
- `Deploy` → `New deployment` → type **Web app**.
  - Execute as: **Me**
  - Who has access: **Anyone**
- Authorize when prompted. Copy the **/exec** URL.
- Paste it into `.env` as `VIVARA_APPS_SCRIPT_URL=...`

**3. Create the Catalogue sheet (Sheet A)**
- New Google Sheet → name it `Vivara Catalogue`.
- Row 1 headers, exactly:
  `id | name | description | price | availability | image_url | vastu_context | category | enquiry_status`
- `File` → `Share` → `Publish to web` → publish the sheet as **CSV** → copy the link.
- Paste into `.env` as `VIVARA_CATALOGUE_CSV_URL=...`

**4. WhatsApp + email into `.env`**
- `VIVARA_WHATSAPP_NUMBER=` (international format, digits only, e.g. `9198XXXXXXXX`)
- `VIVARA_NOTIFY_EMAIL=` (same inbox as step 2)

## What I do (verify)

Once `.env` is filled, run:

```
node execution/probe_enquiry.mjs
```

Expected GREEN result:
- health check returns `{ ok: true }`
- POST returns `{ ok: true, logged: true, emailed: true }`
- a test row appears in the `Leads` sheet
- Ruchi receives the test email

Any RED = we read the exact error, patch `apps_script_Code.gs`, re-run. We do **not** proceed to Phase A until all links are green.

## Link status

| Link | How verified | Status |
|---|---|---|
| Payload validation | local probe | ✅ green |
| WhatsApp URL build | local probe | ✅ green |
| Email render | local probe | ✅ green |
| Apps Script reachable | probe health check | ⏳ needs URL |
| Leads row append | probe POST | ⏳ needs URL |
| Email delivery | test email | ⏳ needs email |
| Catalogue CSV read | probe (to add) | ⏳ needs CSV URL |
| GitHub Pages deploy | live URL loads | ⏳ needs repo |
