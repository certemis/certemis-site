// Cloudflare Worker: POST /api/apply (potwierdzenie waitlisty przez Resend +
// server-side przekazanie zgłoszenia do Formspree); reszta ruchu → Static Assets.

var FORMSPREE_URL = "https://formspree.io/f/xnjryoyq";
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var FIELDS = ["name", "email", "company", "website", "country", "size", "role", "needs", "lang"];

var COPY = {
  en: {
    subject: "You're on the Certemis waitlist",
    paragraphs: [
      "Hi,",
      "Thanks for applying for founding access to Certemis — the operational memory layer for companies.",
      "We've received your application. We're onboarding a first group of founding teams (first 20 customers get 50% off for life), and we'll reach out personally as spots open up.",
      "Have a question in the meantime? Just reply to this email — it comes straight to me.",
      "Talk soon,"
    ]
  },
  pl: {
    subject: "Jesteś na liście Certemis",
    paragraphs: [
      "Cześć,",
      "Dziękujemy za zgłoszenie do dostępu founding w Certemis — operacyjnej pamięci firmy.",
      "Otrzymaliśmy Twoje zgłoszenie. Przyjmujemy pierwszą grupę zespołów founding (pierwszych 20 firm dostaje 50% zniżki na zawsze) i odezwiemy się osobiście, gdy zwolnią się miejsca.",
      "Masz pytanie w międzyczasie? Po prostu odpowiedz na tego maila — trafi prosto do mnie.",
      "Do usłyszenia,"
    ]
  }
};

function emailText(copy) {
  return copy.paragraphs.join("\n\n") + "\nHubert Stark\nFounder & CEO · Certemis · certemis.com\n";
}

function emailHtml(copy) {
  var body = copy.paragraphs
    .map(function (p) { return '<p style="margin:0 0 16px;color:#1a2233;font-size:15px;line-height:1.6">' + p + "</p>"; })
    .join("");
  return (
    '<div style="margin:0;padding:32px 16px;background:#f5f6fa;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif">' +
      '<div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e8f0;border-radius:12px;overflow:hidden">' +
        '<div style="background:#2E5BFF;padding:18px 32px">' +
          '<span style="color:#ffffff;font-size:14px;font-weight:700;letter-spacing:.14em">CERTEMIS</span>' +
        "</div>" +
        '<div style="padding:32px">' +
          body +
          '<p style="margin:0;color:#1a2233;font-size:15px;line-height:1.6">' +
            "<strong>Hubert Stark</strong><br>" +
            '<span style="color:#5b6478">Founder &amp; CEO · Certemis · ' +
            '<a href="https://certemis.com" style="color:#2E5BFF;text-decoration:none">certemis.com</a></span>' +
          "</p>" +
        "</div>" +
      "</div>" +
    "</div>"
  );
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { "Content-Type": "application/json" }
  });
}

async function handleApply(request, env) {
  var form;
  try {
    form = await request.formData();
  } catch (e) {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  // Honeypot (pole _gotcha z formularza): boty dostają "sukces", nic nie wysyłamy.
  if ((form.get("_gotcha") || "").toString().trim()) return json({ ok: true });

  var email = (form.get("email") || "").toString().trim();
  if (!EMAIL_RE.test(email)) return json({ ok: false, error: "invalid_email" }, 400);

  var lang = form.get("lang") === "pl" ? "pl" : "en";
  var copy = COPY[lang];

  var resendPromise = fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + env.RESEND_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "Certemis <hello@certemis.com>",
      reply_to: "hubert@certemis.com",
      to: [email],
      subject: copy.subject,
      text: emailText(copy),
      html: emailHtml(copy)
    })
  });

  var fwd = new FormData();
  for (var i = 0; i < FIELDS.length; i++) {
    var v = form.get(FIELDS[i]);
    if (v != null && v !== "") fwd.set(FIELDS[i], v.toString());
  }
  var formspreePromise = fetch(FORMSPREE_URL, {
    method: "POST",
    headers: { "Accept": "application/json" },
    body: fwd
  });

  var results = await Promise.allSettled([resendPromise, formspreePromise]);

  // Formspree (zapis + powiadomienie właściciela): błąd tylko logujemy.
  var fs = results[1];
  if (fs.status === "rejected") console.error("formspree request failed:", fs.reason);
  else if (!fs.value.ok) console.error("formspree error:", fs.value.status, await fs.value.text().catch(function () { return ""; }));

  // Potwierdzenie przez Resend decyduje o odpowiedzi.
  var rs = results[0];
  if (rs.status === "rejected") {
    console.error("resend request failed:", rs.reason);
    return json({ ok: false, error: "send_failed" }, 502);
  }
  if (!rs.value.ok) {
    console.error("resend error:", rs.value.status, await rs.value.text().catch(function () { return ""; }));
    return json({ ok: false, error: "send_failed" }, 502);
  }

  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    var url = new URL(request.url);
    if (url.pathname === "/api/apply") {
      if (request.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);
      return handleApply(request, env);
    }
    if (url.pathname.startsWith("/api/")) return json({ ok: false, error: "not_found" }, 404);
    return env.ASSETS.fetch(request);
  }
};
