# SOP — Vivara Website (Layer A)

> Golden Rule: if logic changes, update this SOP *before* the code.

## Goal
A philosophy-led, calm-but-vibrant static site that moves a resonating visitor to a qualified enquiry (North Star). Static, free, GitHub-Pages-deployable.

## Information Architecture (section order — philosophy before transaction)
1. **Hero** — brand thesis ("crafted for exuberant living") + philosophy, over the Vastu-grid signature with open center.
2. **Trust line** — 500+ residential & commercial spaces; civil engineer + Vastu. Quiet, confident.
3. **The Vivara approach** — the balanced bridge: ancient Vastu wisdom ⟷ architectural intelligence.
4. **Services** — new homes/projects · existing spaces · commercial. Warm, fear-free.
5. **Objects** — Vastu-inspired objects, each with context (what it supports / where it belongs). Placeholder until catalogue CSV is wired.
6. **About Ruchi** — personal, credible, visible. Photo placeholder.
7. **Enquiry** — the form. Warm CTA "Begin your Vastu journey."
8. **Footer** — email, WhatsApp (placeholder), tagline.

## Enquiry flow (Navigation layer)
form fields (CLAUDE.md §2.1) → client validate (name, phone, consent) →
POST to Apps Script `/exec` as **`Content-Type: text/plain;charset=utf-8`** (skips CORS preflight; body is JSON string) →
on `{ok:true}`: show warm confirmation + WhatsApp handoff button →
on error: show in-voice retry message, never a stack trace.

## Config (top of the page script — one place to edit)
- `APPS_SCRIPT_URL` — the live bridge `/exec` URL.
- `WHATSAPP_NUMBER` — placeholder until provided; one-line swap.

## Catalogue (deferred, non-blocking)
When `VIVARA_CATALOGUE_CSV_URL` exists: fetch CSV → parse → render object cards per CLAUDE.md §2.3. Until then: 3 clearly-marked placeholder objects.

## Voice & guardrails (from CLAUDE.md §3 — enforce in copy)
Serene · elevated · grounded · nurturing. Lead with purpose. CTAs warm ("Begin your Vastu journey," "Request guidance," "Speak with Ruchi"). No fear-based lines. No "BUY NOW." No clutter, no cliché spiritual stock imagery. Ruchi always visible. Speak to believers and skeptics alike.

## Design tokens
- `--ink #16302C` deep teal-black (text, hero field)
- `--teal #1C463E` peacock teal (deep sections)
- `--plaster #F4EDE2` warm pale (calm content sections)
- `--brass #C7A24A` brass hairlines / premium detail (restraint)
- `--marigold #E2872E` single vibrant accent (sparingly)
- Display: Marcellus · Body: Mukta · labels: Mukta letterspaced caps
- Quality floor: responsive to mobile, visible keyboard focus, `prefers-reduced-motion` respected.
