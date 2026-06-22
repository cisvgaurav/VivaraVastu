/**
 * Vivara — Link Layer Bridge (Google Apps Script Web App)
 * Implements CLAUDE.md §2.2 Enquiry OUTPUT payload:
 *   1) append a row to the Leads sheet
 *   2) email a notification to Ruchi
 * Deploy: Extensions > Apps Script (from the Leads sheet) > paste this >
 *   Deploy > New deployment > Web app > Execute as: Me >
 *   Who has access: Anyone > copy the /exec URL into .env as VIVARA_APPS_SCRIPT_URL
 *
 * No paid API keys. Free. Deterministic.
 */

// ---- CONFIG (edit these two) -------------------------------------------------
const NOTIFY_EMAIL = "";          // <-- VIVARA_NOTIFY_EMAIL (Ruchi's inbox)
const LEADS_SHEET_NAME = "Leads"; // tab name in this spreadsheet
// -----------------------------------------------------------------------------

// Column order — MUST match CLAUDE.md §2.2. Do not reorder without updating the SOP.
const COLUMNS = [
  "timestamp", "name", "phone", "email", "enquiry_type", "space_type",
  "facing_direction", "maps_link", "lat", "lng", "object_of_interest",
  "message", "preferred_contact", "status", "source"
];

// Health check — lets the probe confirm the endpoint is live.
function doGet() {
  return json({ ok: true, service: "vivara-link", time: new Date().toISOString() });
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");

    // --- validate (deterministic, never trust the client) ---
    const missing = [];
    if (!body.name)  missing.push("name");
    if (!body.phone) missing.push("phone");
    if (body.consent !== true) missing.push("consent");
    if (missing.length) {
      return json({ ok: false, error: "missing_fields", fields: missing });
    }

    const loc = body.property_location || {};
    const row = {
      timestamp: new Date().toISOString(),
      name: String(body.name).slice(0, 200),
      phone: String(body.phone).slice(0, 40),
      email: body.email || "",
      enquiry_type: body.enquiry_type || "general",
      space_type: body.space_type || "other",
      facing_direction: loc.facing_direction || "unknown",
      maps_link: loc.maps_link || "",
      lat: loc.lat ?? "",
      lng: loc.lng ?? "",
      object_of_interest: body.object_of_interest || "",
      message: (body.message || "").slice(0, 4000),
      preferred_contact: body.preferred_contact || "whatsapp",
      status: "new",
      source: "website_form"
    };

    // --- 1) append to Leads sheet ---
    const sheet = SpreadsheetApp.getActive().getSheetByName(LEADS_SHEET_NAME);
    if (!sheet) return json({ ok: false, error: "leads_sheet_not_found" });
    if (sheet.getLastRow() === 0) sheet.appendRow(COLUMNS); // header on first write
    sheet.appendRow(COLUMNS.map(function (k) { return row[k]; }));

    // --- 2) email notification ---
    if (NOTIFY_EMAIL) {
      const subject = "New Vivara enquiry — " + row.name + " (" + row.enquiry_type + ")";
      const lines = [
        "A new enquiry just landed on the Vivara site.", "",
        "Name: " + row.name,
        "Phone: " + row.phone,
        "Email: " + (row.email || "—"),
        "Enquiry type: " + row.enquiry_type,
        "Space: " + row.space_type,
        "Facing: " + row.facing_direction,
        "Location: " + (row.maps_link || "—"),
        "Object of interest: " + (row.object_of_interest || "—"),
        "Preferred contact: " + row.preferred_contact, "",
        "Message:", (row.message || "—"), "",
        "Logged to the Leads sheet with status 'new'."
      ];
      MailApp.sendEmail(NOTIFY_EMAIL, subject, lines.join("\n"));
    }

    return json({ ok: true, logged: true, emailed: !!NOTIFY_EMAIL });
  } catch (err) {
    return json({ ok: false, error: "exception", detail: String(err) });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
