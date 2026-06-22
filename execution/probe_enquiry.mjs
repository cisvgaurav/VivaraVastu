/**
 * Vivara — Phase L probe.
 * Run:  node execution/probe_enquiry.mjs
 * Verifies the deterministic glue now (no credentials needed).
 * If VIVARA_APPS_SCRIPT_URL and VIVARA_WHATSAPP_NUMBER are set in the env,
 * it also runs the live handshake (health check + test POST).
 */

const SAMPLE = {
  name: "Test Visitor",
  phone: "919800000000",
  email: "test@example.com",
  enquiry_type: "consultation",
  space_type: "new_home",
  property_location: {
    maps_link: "https://maps.google.com/?q=18.5204,73.8567",
    lat: 18.5204, lng: 73.8567,
    facing_direction: "NE"
  },
  object_of_interest: null,
  message: "We're building a new home and would love Vastu guidance.",
  preferred_contact: "whatsapp",
  consent: true,
  submitted_at: new Date().toISOString()
};

let pass = 0, fail = 0;
const ok = (label, cond) => {
  console.log((cond ? "  PASS  " : "  FAIL  ") + label);
  cond ? pass++ : fail++;
};

console.log("\nVivara Phase L probe — deterministic glue\n");

// 1) required-field validation mirrors the bridge
const missing = [];
if (!SAMPLE.name) missing.push("name");
if (!SAMPLE.phone) missing.push("phone");
if (SAMPLE.consent !== true) missing.push("consent");
ok("required fields present (name, phone, consent)", missing.length === 0);

// 2) enquiry_type / space_type / facing in allowed sets
const TYPES = ["consultation", "object", "general"];
const SPACES = ["new_home", "existing_home", "commercial", "other"];
const DIRS = ["N","NE","E","SE","S","SW","W","NW","unknown"];
ok("enquiry_type valid", TYPES.includes(SAMPLE.enquiry_type));
ok("space_type valid", SPACES.includes(SAMPLE.space_type));
ok("facing_direction valid", DIRS.includes(SAMPLE.property_location.facing_direction));

// 3) WhatsApp handoff URL builds correctly
const num = process.env.VIVARA_WHATSAPP_NUMBER || "919800000000";
const prefill = `Hi Ruchi, I'm ${SAMPLE.name}. I'd like guidance on my ${SAMPLE.space_type.replace("_"," ")} (${SAMPLE.enquiry_type}).`;
const waUrl = `https://wa.me/${num}?text=${encodeURIComponent(prefill)}`;
ok("wa.me URL well-formed", /^https:\/\/wa\.me\/\d{7,15}\?text=/.test(waUrl));
console.log("        " + waUrl);

// 4) email preview renders
const subject = `New Vivara enquiry — ${SAMPLE.name} (${SAMPLE.enquiry_type})`;
ok("email subject renders", subject.includes(SAMPLE.name));

console.log(`\nLocal checks: ${pass} passed, ${fail} failed.`);

// --- live handshake (only if credentials present) ---
const url = process.env.VIVARA_APPS_SCRIPT_URL;
if (!url) {
  console.log("\nLive handshake: SKIPPED (set VIVARA_APPS_SCRIPT_URL to run).\n");
  process.exit(fail ? 1 : 0);
}
console.log("\nLive handshake against Apps Script...");
try {
  const health = await fetch(url);
  const h = await health.json();
  console.log("  health:", JSON.stringify(h));
  const res = await fetch(url, { method: "POST", body: JSON.stringify(SAMPLE) });
  const r = await res.json();
  console.log("  POST  :", JSON.stringify(r));
  if (r.ok) console.log("\n  GREEN — row logged" + (r.emailed ? " + email sent." : " (no email configured)."));
  else console.log("\n  RED — bridge returned an error. Read it, patch the script, re-run.");
} catch (e) {
  console.log("  RED — request failed:", String(e));
}
console.log("");
