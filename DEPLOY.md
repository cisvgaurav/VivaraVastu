# Phase T — Deploy Vivara

## 1. Put it on GitHub
1. Create a new repo, e.g. `vivara-site` (public is fine for free Pages).
2. Unzip `vivara.zip` and add everything at the repo **root**.
   - `index.html` is the live website.
   - `CLAUDE.md`, `/memory`, `/architecture`, `/execution`, `.env.example`, `.gitignore` are the project brain + tooling. Recommended to keep (they don't affect the live site and document everything).
3. Commit and push to `main`.

## 2. Turn on Pages
1. Repo → **Settings → Pages**.
2. Source: **Deploy from a branch** → branch `main` → folder `/ (root)` → **Save**.
3. ~1 minute later the site is live at `https://<your-username>.github.io/vivara-site/`.

## 3. Final verification — the project is "Complete" when this passes
1. Open the live URL; the hero grid should draw in.
2. Submit the enquiry form with a real test entry.
3. Confirm all three: success message → new row in the **Leads** sheet → email in Ruchi's inbox.

That live submission is the canonical end-to-end test of the whole delivery loop.

## 4. The firing mechanism (already wired)
- **Enquiries:** form-submit in the browser → POST to the Apps Script bridge. No server, no cron.
- **Site updates:** any push to `main` → GitHub Pages redeploys automatically.

## 5. When you're ready (all one-line, no rebuild)
- **WhatsApp:** set `WHATSAPP_NUMBER` in the config block at the top of `index.html`, commit.
- **Custom domain:** Settings → Pages → Custom domain.
- **Object catalogue:** publish the Catalogue sheet as CSV → we wire the objects section to it.
- **Real photos / testimonials:** drop into `index.html` (swap the grey placeholders, add a testimonials block).

## 6. If something breaks (self-annealing loop)
Don't guess. Read the exact error → patch `index.html` or `execution/apps_script_Code.gs` → re-run `node execution/probe_enquiry.mjs` and/or re-test live → write the lesson into `architecture/SOP_website.md` and log it in `CLAUDE.md §8`. Same error never twice.
