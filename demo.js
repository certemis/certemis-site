/* ═══════════════════════════════════════════════════════════════════════
   Certemis — live demo (100% client-side, fake data). One fictional company
   ("Demo Company"). Every view mirrors the production app; nothing is persisted
   and nothing is sent to a backend. Full EN/PL parity via tx(en, pl).
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
"use strict";
var $ = function (id) { return document.getElementById(id); };
var LANG = (localStorage.getItem("certemis_lang") === "pl") ? "pl" : "en";
var THEME = localStorage.getItem("certemis_demo_theme") || "light";
var VIEW = "start";

function tx(en, pl) { return (LANG === "pl" && pl != null) ? pl : en; }
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
function initials(name) { return name.split(" ").map(function (w) { return w[0]; }).join("").slice(0, 2).toUpperCase(); }

/* ── icons (inner SVG markup) ─────────────────────────────────────────── */
var IP = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  dashboard: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  layout: '<rect x="3" y="3" width="18" height="7" rx="1.5"/><rect x="3" y="14" width="8" height="7" rx="1.5"/><rect x="15" y="14" width="6" height="7" rx="1.5"/>',
  board: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/>',
  spark: '<path d="M12 3l1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5l4.6-1.9z"/><path d="M19 15l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
  chat: '<path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/>',
  calendar: '<rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v3M16 3v3"/>',
  book: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H20"/>',
  ask: '<path d="M9.5 9a2.5 2.5 0 1 1 3 2.5c-.9.4-1.5 1-1.5 2"/><circle cx="12" cy="17" r="0.6" fill="currentColor"/><circle cx="12" cy="12" r="9"/>',
  file: '<path d="M6 2.5h8l4 4V21a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 21z"/><path d="M14 2.5V6.5h4"/>',
  notes: '<path d="M5 3.5h14v17l-3-2-2 2-2-2-2 2-2-2-1 1z"/><path d="M9 8h6M9 12h6"/>',
  playbook: '<path d="M4 5a2 2 0 0 1 2-2h9l4 4v14H6a2 2 0 0 1-2-2z"/><path d="M9 8h5M9 12h7M9 16h4"/>',
  flag: '<path d="M5 21V4M5 4h11l-2 3 2 3H5"/>',
  cap: '<path d="M22 9.5 12 4.5 2 9.5l10 5 10-5z"/><path d="M6 12v4.5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V12"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.56-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.01a1.7 1.7 0 0 0 1.03-1.56V3a2 2 0 1 1 4 0v.09c0 .69.4 1.3 1.03 1.56a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.01c.26.63.87 1.03 1.56 1.03H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51.95z"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5 12 13l8.5-6.5"/>',
  inbox: '<path d="M3 13h4l1.5 3h7L17 13h4"/><path d="M4 13 6 5h12l2 8v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/>',
  reply: '<path d="M9 17l-6-5 6-5"/><path d="M3 12h9a8 8 0 0 1 8 8"/>',
  widgets: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><circle cx="17.5" cy="17.5" r="3.7"/>',
  panel: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 8h18M8 8v12"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  userplus: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M18 8v6M15 11h6"/>',
  people: '<circle cx="8.5" cy="9" r="3"/><path d="M2.5 19a6 6 0 0 1 12 0"/><circle cx="17" cy="8.5" r="2.4"/><path d="M15 19a5.5 5.5 0 0 1 7-.6"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3 2.5c-.9.4-1.5 1-1.5 2"/><circle cx="12" cy="16.5" r="0.6" fill="currentColor"/>',
  team: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17.5" cy="8.5" r="2.3"/><path d="M15.5 20a5.5 5.5 0 0 1 6-1"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>',
  bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>',
  check: '<path d="M5 12.5 10 17.5 19.5 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  clip: '<path d="M21 11.5 12 20.5a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8.5-8.5"/>',
  pin: '<path d="M12 17v5M9 3h6l-1 6 3 3H7l3-3z"/>',
  users2: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/>',
  send: '<path d="M4 12 20 4l-6 16-3-7z"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="2.6"/>',
  refresh: '<path d="M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2"/><path d="M18 3v4h-4M6 21v-4h4"/>',
  trash: '<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/>',
  heart: '<path d="M12 20s-7-4.5-9-9c-1.3-3 1-6 4-5 1.7.6 2.5 2 3 2.5.5-.5 1.3-1.9 3-2.5 3-1 5.3 2 4 5-2 4.5-9 9-9 9z"/>',
  comment: '<path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/>',
  loc: '<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  folder: '<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'
};
function svg(name, cls) {
  var inner = IP[name] || IP.file;
  return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
}
function logo(id) { return '<svg viewBox="0 0 24 24" width="100%" height="100%"><use href="#lg-' + id + '"/></svg>'; }

/* ── i18n (chrome + shared labels) ────────────────────────────────────── */
var DICT = {
  "cta.join": ["Join the waitlist", "Dołącz do listy"],
  "nav.group.wiedza": ["Knowledge", "Wiedza"], "nav.group.poczta": ["Mail", "Poczta"],
  "nav.group.widget": ["Widget", "Widget"], "nav.group.ludzie": ["People", "Ludzie"],
  "nav.start": ["Home", "Start"], "nav.pulpit": ["My dashboard", "Mój pulpit"],
  "nav.tablica": ["Board", "Tablica"], "nav.ask": ["Questions", "Pytania"],
  "nav.documents": ["Sources", "Źródła"], "nav.notes": ["Notes", "Notatki"],
  "nav.playbooki": ["Playbooks", "Playbooki"], "nav.wdrozenie": ["Onboarding", "Wdrożenie"],
  "nav.assistant": ["Assistant", "Asystent"], "nav.calendar": ["Calendar", "Kalendarz"],
  "nav.mailbox": ["Inbox", "Skrzynka"], "nav.needsReply": ["To reply", "Do odpowiedzi"],
  "nav.chat": ["Chat", "Czat"], "nav.experts": ["Find help", "Kto pomoże"],
  "nav.team": ["Team", "Zespół"], "nav.clients": ["Clients", "Klienci"],
  "nav.widget": ["Widget settings", "Ustawienia widgetu"], "nav.leady": ["Leads", "Leady"],
  "nav.wstat": ["Widget stats", "Statystyki widgetu"],
  "search": ["Search…", "Szukaj…"], "seeall": ["See all", "Zobacz wszystko"],
  "join.title": ["Ready to give your team this?", "Chcesz to dać swojemu zespołowi?"],
  "join.desc": ["This is a demo with sample data. Join the waitlist for early access with your own tools.",
    "To demo na przykładowych danych. Dołącz do listy, aby uzyskać wczesny dostęp z własnymi narzędziami."],
  "wl.title": ["Join the waitlist", "Dołącz do listy oczekujących"],
  "wl.desc": ["Certemis is rolling out to teams gradually. Leave your work email and we'll reach out.",
    "Certemis udostępniamy zespołom stopniowo. Zostaw służbowy e-mail, odezwiemy się."],
  "wl.email": ["Work email", "Służbowy e-mail"], "wl.company": ["Company", "Firma"],
  "wl.submit": ["Request access", "Poproś o dostęp"], "cancel": ["Cancel", "Anuluj"],
  "wl.done": ["Thanks — you're on the list.", "Dzięki — jesteś na liście."]
};
function t(k) { var d = DICT[k]; return d ? tx(d[0], d[1]) : k; }

/* ── people / company ─────────────────────────────────────────────────── */
var PEOPLE = [
  { name: "Demo Tester", role: "owner", title_en: "Demo account", title_pl: "Konto demo", color: "#0f6e56" },
  { name: "Piotr Nowak", role: "admin", title_en: "Engineering lead", title_pl: "Lider inżynierii", color: "#2563eb" },
  { name: "Ania Wójcik", role: "member", title_en: "Product manager", title_pl: "Product manager", color: "#7c3aed" },
  { name: "Tomasz Zieliński", role: "member", title_en: "Backend engineer", title_pl: "Inżynier backendu", color: "#d97706" },
  { name: "Karolina Mazur", role: "member", title_en: "Product designer", title_pl: "Projektantka produktu", color: "#db2777" },
  { name: "Jakub Lewandowski", role: "member", title_en: "Account executive", title_pl: "Account executive", color: "#0891b2" },
  { name: "Ewa Dąbrowska", role: "member", title_en: "Customer support", title_pl: "Wsparcie klienta", color: "#65a30d" },
  { name: "Robert Kowal", role: "client", title_en: "Client · Acme Corp", title_pl: "Klient · Acme Corp", color: "#64748b" }
];
function person(name) { for (var i = 0; i < PEOPLE.length; i++) if (PEOPLE[i].name === name) return PEOPLE[i]; return { name: name, color: "#64748b" }; }
function avatar(name, size) {
  var p = person(name), st = "background:" + p.color + "22;color:" + p.color;
  return '<span class="avatar ' + (size || "md") + '" style="' + st + '">' + initials(name) + '</span>';
}
var ROLE = { owner: ["Owner", "Właściciel"], admin: ["Admin", "Administrator"], member: ["Member", "Członek"], client: ["Client", "Klient"] };

/* ── nav model (mirrors nav-model.ts) ─────────────────────────────────── */
var NAV = [
  { leaf: "start", icon: "dashboard" },
  { leaf: "pulpit", icon: "layout" },
  { leaf: "tablica", icon: "board" },
  { leaf: "assistant", icon: "spark" },
  { leaf: "chat", icon: "chat", badge: 3 },
  { leaf: "calendar", icon: "calendar" },
  { group: "wiedza", icon: "book", children: [
    { leaf: "ask", icon: "ask" }, { leaf: "documents", icon: "file" },
    { leaf: "notes", icon: "notes" }, { leaf: "playbooki", icon: "playbook" }, { leaf: "wdrozenie", icon: "cap" } ] },
  { group: "poczta", icon: "mail", children: [
    { leaf: "mailbox", icon: "inbox", badge: 5 }, { leaf: "needsReply", icon: "reply", badge: 2 } ] },
  { group: "widget", icon: "widgets", children: [
    { leaf: "widget", icon: "panel" }, { leaf: "wstat", icon: "chart" }, { leaf: "leady", icon: "userplus" } ] },
  { group: "ludzie", icon: "people", children: [
    { leaf: "experts", icon: "help" }, { leaf: "team", icon: "team" }, { leaf: "clients", icon: "briefcase" } ] }
];
// Jak w produkcji: grupy startują zwinięte, aktywny widok rozwija swojego rodzica.
var collapsed = { wiedza: 1, poczta: 1, widget: 1, ludzie: 1 };
function expandParentOf(view) {
  NAV.forEach(function (e) {
    if (e.group && e.children.some(function (c) { return c.leaf === view; })) collapsed[e.group] = 0;
  });
}

function renderNav() {
  var h = '<a class="brand side-brand" href="index.html" title="Certemis">' +
    '<svg class="mark" viewBox="0 0 130 120" fill="none">' +
      '<path d="M97 27 A48 48 0 1 0 97 89" stroke-width="7" stroke-linecap="round"/>' +
      '<g stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round"><path d="M64 32 C55 26 44 27 41 34 C32 32 26 40 30 46 C23 49 24 59 31 60 C27 68 33 75 42 73 C45 80 58 80 64 74"/><path d="M64 32 C73 26 84 27 87 34 C96 32 102 40 98 46 C105 49 104 59 97 60 C101 68 95 75 86 73 C83 80 70 80 64 74"/><line x1="64" y1="33" x2="64" y2="74"/></g>' +
      '<g stroke-width="2.4" stroke-linecap="round"><line x1="64" y1="44" x2="80" y2="44"/><line x1="64" y1="57" x2="85" y2="57"/><line x1="64" y1="44" x2="48" y2="44"/><line x1="64" y1="57" x2="43" y2="57"/></g>' +
      '<g><circle cx="82" cy="44" r="3.4"/><circle cx="87" cy="57" r="3.4"/><circle cx="46" cy="44" r="3.4"/><circle cx="41" cy="57" r="3.4"/></g>' +
    '</svg><span>CERTEMIS</span></a>';
  h += '<div class="side-search">' + svg("search") + '<span>' + t("search") + '</span></div>';
  NAV.forEach(function (e) {
    if (e.leaf) { h += navItem(e, false); return; }
    var isC = collapsed[e.group];
    h += '<div class="nav-group ' + (isC ? "collapsed" : "") + '" data-group="' + e.group + '">';
    h += '<button class="nav-plabel" data-toggle="' + e.group + '">' + svg(e.icon) + '<span>' + t("nav.group." + e.group) + '</span><svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button>';
    h += '<div class="nav-children">';
    e.children.forEach(function (c) { h += navItem(c, true); });
    h += '</div></div>';
  });
  h += '<div class="side-foot"><button class="nav-item" data-fake>' + svg("gear") + '<span>' + tx("Settings", "Ustawienia") + '</span></button>' +
    '<div class="ws"><span class="avatar md">DT</span><div style="flex:1;min-width:0"><div class="ws-name trunc">Demo Tester</div><div class="ws-plan trunc">demo@democompany.com</div></div><button class="iconbtn" data-fake title="' + tx("Sign out", "Wyloguj") + '">' + svg("logout") + '</button></div></div>';
  var s = $("sidebar"); s.innerHTML = h;
  s.querySelectorAll("[data-view]").forEach(function (b) { b.onclick = function () { go(b.getAttribute("data-view")); closeMob(); }; });
  s.querySelectorAll("[data-toggle]").forEach(function (b) { b.onclick = function () { var g = b.getAttribute("data-toggle"); collapsed[g] = !collapsed[g]; renderNav(); }; });
}
function navItem(e, child) {
  var badge = e.badge ? '<span class="nav-badge ' + (e.leaf === "needsReply" || e.leaf === "mailbox" ? "" : "acc") + '">' + e.badge + '</span>' : "";
  return '<button class="nav-item ' + (child ? "child" : "") + (VIEW === e.leaf ? " active" : "") + '" data-view="' + e.leaf + '">' + svg(e.icon) + '<span>' + t("nav." + e.leaf) + '</span>' + badge + '</button>';
}

/* ── shared UI bits ───────────────────────────────────────────────────── */
function phead(title, sub, actions) {
  return '<div class="phead"><div class="ph-main"><h1 class="ptitle">' + esc(title) + ' <span class="i">i</span></h1>' +
    (sub ? '<p class="psub">' + esc(sub) + '</p>' : '') + '</div>' + (actions ? '<div class="pact">' + actions + '</div>' : '') + '</div>';
}
function aibar(ph, btnLabel) {
  return '<form class="aibar" data-fake><span class="spk">' + svg("spark") + '</span><input placeholder="' + esc(ph) + '"><button class="btn primary" type="submit">' + svg("spark") + (btnLabel || tx("Ask", "Zapytaj")) + '</button></form>';
}
function chip(label) { return '<button class="chip" data-fake>' + svg("spark") + esc(label) + '</button>'; }
function sectitle(icon, title, link) { return '<div class="sectitle">' + svg(icon) + '<span>' + esc(title) + '</span>' + (link ? '<a class="seelink" data-fake>' + t("seeall") + ' →</a>' : '') + '</div>'; }
function joinbar() {
  return '<div class="joinbar"><div style="flex:1;min-width:220px"><div class="jt">' + t("join.title") + '</div><div class="jd">' + t("join.desc") + '</div></div>' +
    '<button class="btn primary" id="joinCta2">' + svg("arrow") + t("cta.join") + '</button></div>';
}

/* ═══════════════════════════════ VIEWS ═══════════════════════════════ */
var VIEWS = {};

/* HOME */
VIEWS.start = function () {
  // Powitanie wg pory dnia + data — dokładnie jak hero Startu w produkcji.
  var hr = new Date().getHours();
  var hi = (hr < 12 ? tx("Good morning", "Dzień dobry") : hr < 18 ? tx("Good afternoon", "Dzień dobry") : tx("Good evening", "Dobry wieczór")) + ", Demo tester";
  var now = new Date();
  var months = LANG === "pl"
    ? ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"]
    : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var date = "Demo Company · " + (LANG === "pl"
    ? now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear()
    : months[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear());
  var tiles = [
    { icon: "file", v: "1,564", l: tx("Documents", "Dokumenty"), d: "+82" },
    { icon: "ask", v: "37", l: tx("Questions this week", "Pytania w tym tygodniu"), d: "+12" },
    { icon: "clock", v: tx("6.4 h", "6,4 godz."), l: tx("Est. time saved", "Szac. oszczędzony czas"), d: "+1.1h" },
    { icon: "people", v: "8", l: tx("Members", "Członkowie"), d: "" }
  ];
  var h = '<div class="screen fade stack gap6">';
  h += '<div class="card pad" style="background:linear-gradient(135deg,var(--accent-soft),var(--surface) 65%)">' +
    '<h1 class="ptitle" style="font-size:22px">' + hi + ' <span class="i">i</span></h1>' +
    '<p class="t3" style="font-size:13px;margin-top:3px">' + date + '</p>' +
    '<div style="margin-top:16px">' + aibar(tx("Ask your company brain… e.g. “Why did we drop the legacy auth flow?”", "Zapytaj firmowy mózg… np. „Dlaczego zrezygnowaliśmy ze starego flow autoryzacji?”"), tx("Ask a question", "Zadaj pytanie")) + '</div>' +
    '<div class="row wrap" style="margin-top:12px">' + chip(tx("Refund policy for annual plans", "Polityka zwrotów dla planów rocznych")) + chip(tx("Who owns Acme onboarding?", "Kto prowadzi wdrożenie Acme?")) + chip(tx("Status of Q3 security review", "Status przeglądu bezpieczeństwa Q3")) + '</div></div>';
  h += '<div><div class="eyebrow" style="margin-bottom:10px">' + tx("Pulse", "Puls") + '</div><div class="tiles">';
  tiles.forEach(function (x) { h += '<div class="tile"><div class="icosq n ti">' + svg(x.icon) + '</div><div class="tv tnum">' + x.v + '</div><div class="tl">' + x.l + '</div>' + (x.d ? '<div class="td up">▲ ' + x.d + '</div>' : '') + '</div>'; });
  h += '</div></div>';
  h += '<div class="grid" style="grid-template-columns:1.6fr 1fr">';
  h += '<div class="stack gap5">';
  h += '<div class="card pad"><div class="sectitle" style="margin-bottom:12px">' + svg("bell") + '<span>' + tx("Needs you", "Wymaga Ciebie") + '</span><span class="nav-badge alert" style="margin-left:6px">3</span></div><div class="stack">';
  [
    ["reply", tx("2 client emails awaiting your reply", "2 e-maile klientów czekają na odpowiedź"), tx("Acme Corp · billing question", "Acme Corp · pytanie o fakturę"), "20m"],
    ["file", tx("Q3 security questionnaire needs review", "Ankieta bezpieczeństwa Q3 do przeglądu"), tx("Shared by Ania · Google Drive", "Udostępniła Ania · Google Drive"), "2h"],
    ["flag", tx("Onboarding step overdue: connect Jira", "Zaległy krok wdrożenia: podłącz Jira"), tx("Assigned to you", "Przypisane do Ciebie"), "1d"]
  ].forEach(function (r) { h += lrow(r[0], r[1], r[2], r[3]); });
  h += '</div></div>';
  h += '<div class="card pad"><div class="spread">' + sectitle("clock", tx("Recent activity", "Ostatnia aktywność")) + '<button class="btn sm sec" data-fake>' + svg("dashboard") + tx("Customize", "Dostosuj") + '</button></div><div class="stack" style="margin-top:10px">';
  [
    ["github", "Piotr Nowak " + tx("merged PR #412 · auth: remove legacy flow", "scalił PR #412 · auth: remove legacy flow"), "GitHub · #eng-core", "15m"],
    ["ask", tx("You asked: “What's our refund policy for annual plans?”", "Twoje pytanie: „Jaka jest polityka zwrotów dla planów rocznych?”"), tx("3 sources · Notion, Confluence, Gmail", "3 źródła · Notion, Confluence, Gmail"), "1h"],
    ["notion", "Ania Wójcik " + tx("updated “Q3 Roadmap”", "zaktualizowała „Roadmapa Q3”"), "Notion", "3h"],
    ["linear", "Tomasz Zieliński " + tx("closed DC-238 · rate-limit tuning", "zamknął DC-238 · rate-limit tuning"), "Linear", "5h"]
  ].forEach(function (r) { h += lrow2(r[0], r[1], r[2], r[3]); });
  h += '</div></div></div>';
  h += '<div class="stack gap5">' + recapCard() + upcomingCard() +
    '<div>' + sectitle("bolt", tx("Quick actions", "Szybkie akcje")) + '<div class="grid" style="grid-template-columns:1fr 1fr;margin-top:12px;gap:10px">' +
    qa("ask", tx("Questions", "Pytania"), "ask") + qa("spark", tx("Assistant", "Asystent"), "assistant") +
    qa("inbox", tx("Inbox", "Skrzynka"), "mailbox") + qa("help", tx("Find help", "Kto pomoże"), "experts") +
    '</div></div></div>';
  h += '</div>';
  h += '<div class="card pad"><div class="spread"><div class="row gap3"><b style="font-size:14px">' + tx("Set up Certemis", "Skonfiguruj Certemis") + '</b><span class="pill acc">4/6</span></div><div class="prog" style="width:120px"><i style="width:66%"></i></div></div>' +
    '<div class="row wrap" style="margin-top:12px;gap:8px">' +
    ostep(tx("Connect first source", "Podłącz pierwsze źródło"), 1) + ostep(tx("Invite your team", "Zaproś zespół"), 1) +
    ostep(tx("Ask your first question", "Zadaj pierwsze pytanie"), 1) + ostep(tx("Create a playbook", "Utwórz playbook"), 1) +
    ostep(tx("Connect Jira", "Podłącz Jira"), 0) + ostep(tx("Set up the widget", "Skonfiguruj widget"), 0) + '</div></div>';
  h += joinbar();
  h += '</div>';
  return h;
  function lrow(icon, t1, t2, time) { return '<div class="lrow" data-fake><div class="icosq acc" style="width:32px;height:32px">' + svg(icon) + '</div><div style="flex:1;min-width:0"><div class="lt trunc">' + t1 + '</div><div class="ld trunc">' + t2 + '</div></div><span class="rt">' + time + '</span></div>'; }
  function lrow2(logoId, t1, t2, time) { return '<div class="lrow" data-fake><div class="icosq hov" style="width:30px;height:30px">' + (IP[logoId] ? svg(logoId) : logo(logoId)) + '</div><div style="flex:1;min-width:0"><div class="lt trunc">' + t1 + '</div><div class="ld trunc">' + t2 + '</div></div><span class="rt">' + time + '</span></div>'; }
  function qa(icon, label, view) { return '<button class="card-hover" data-goto="' + view + '" style="border:1px solid var(--border);background:var(--surface);border-radius:11px;padding:11px;display:flex;align-items:center;gap:9px;text-align:left"><span class="icosq n" style="width:30px;height:30px">' + svg(icon) + '</span><span style="font-size:13px;font-weight:500">' + label + '</span></button>'; }
  function ostep(label, done) { return '<span class="pill" style="' + (done ? 'border-color:color-mix(in srgb,var(--success) 40%,transparent);background:var(--success-soft);color:var(--success)' : 'color:var(--text-2)') + '">' + (done ? '✓ ' : '') + label + '</span>'; }
};
function recapCard() {
  return '<div class="card pad"><div class="spread"><div class="sectitle" style="font-size:14px">' + svg("spark") + '<span>' + tx("Weekly recap", "Podsumowanie tygodnia") + '</span></div><button class="btn sm sec" data-fake>' + svg("refresh") + tx("Regenerate", "Wygeneruj") + '</button></div>' +
    '<p style="font-size:13.5px;line-height:1.6;margin-top:10px">' + tx("The team shipped the <b>OAuth2 tenant migration</b> — the legacy auth flow is now retired (PR #412). Support handled 14 client threads, mostly billing. Two decisions were documented: annual-plan refunds (Notion) and the Q3 security posture (Confluence).",
      "Zespół wdrożył <b>migrację tenantów na OAuth2</b> — stary flow autoryzacji został wyłączony (PR #412). Wsparcie obsłużyło 14 wątków klientów, głównie o faktury. Udokumentowano dwie decyzje: zwroty planów rocznych (Notion) i postawę bezpieczeństwa Q3 (Confluence).") + '</p>' +
    '<div class="row wrap" style="margin-top:12px;gap:8px">' +
    statChip("37", tx("questions", "pytania")) + statChip("3", tx("unanswered", "bez odpowiedzi")) + statChip("82", tx("new docs", "nowe dok.")) + statChip("8", tx("active members", "aktywni")) + '</div></div>';
  function statChip(v, l) { return '<span class="pill" style="background:var(--surface-2)"><b class="tnum">' + v + '</b> ' + l + '</span>'; }
}
function upcomingCard() {
  var evs = [
    ["meeting", "10:30", tx("Eng weekly", "Cotygodniowe eng"), tx("Google Meet", "Google Meet")],
    ["task", "13:00", tx("Reply to Acme (billing)", "Odpowiedz Acme (faktura)"), tx("Due today", "Termin dziś")],
    ["meeting", "15:00", tx("Acme onboarding call", "Call wdrożeniowy Acme"), "Robert Kowal"],
    ["deadline", tx("Wed", "śr"), tx("Q3 security questionnaire", "Ankieta bezpieczeństwa Q3"), tx("Deadline", "Deadline")]
  ];
  var h = '<div class="card pad">' + sectitle("calendar", tx("Upcoming", "Nadchodzące"), 1) + '<div class="stack" style="margin-top:8px">';
  evs.forEach(function (e) {
    h += '<div class="lrow" data-goto="calendar"><span class="icosq" style="width:28px;height:28px;background:var(--cat-' + e[0] + '-soft);color:var(--cat-' + e[0] + ')">' + svg(e[0] === "deadline" ? "flag" : e[0] === "task" ? "check" : "calendar") + '</span><div style="flex:1;min-width:0"><div class="lt trunc">' + e[2] + '</div><div class="ld trunc">' + e[3] + '</div></div><span class="rt tnum">' + e[1] + '</span></div>';
  });
  return h + '</div></div>';
}

/* MY DASHBOARD */
VIEWS.pulpit = function () {
  var h = '<div class="screen fade">' + phead(tx("My dashboard", "Mój pulpit"), tx("Your personalized tiles. Drag to reorder, add or remove — everything you care about in one place.", "Twoje spersonalizowane kafelki. Przeciągaj, dodawaj lub usuwaj — wszystko, co ważne, w jednym miejscu."), '<button class="btn sec" data-fake>' + svg("dashboard") + tx("Customize", "Dostosuj") + '</button>');
  // Domyślne kafle jak w produkcji: Puls (szeroki) → Szybkie akcje → Ostatnie pytania → Nowe leady.
  h += '<div class="grid" style="grid-template-columns:1fr 1fr">';
  h += '<div class="card pad" style="grid-column:span 2">' + sectitle("chart", tx("Pulse", "Puls")) + '<div class="grid" style="grid-template-columns:repeat(4,1fr);margin-top:12px;gap:12px">' +
    kpi("1,564", tx("Documents", "Dokumenty")) + kpi("37", tx("Questions (7d)", "Pytania (7 dni)")) + kpi("384", tx("Minutes saved", "Zaoszczędzone min")) + kpi("8", tx("Members", "Członkowie")) + '</div></div>';
  h += '<div class="card pad">' + sectitle("bolt", tx("Quick actions", "Szybkie akcje")) + '<div class="grid" style="grid-template-columns:1fr 1fr;margin-top:12px;gap:10px">' +
    qa2("ask", tx("Questions", "Pytania"), "ask") + qa2("spark", tx("Assistant", "Asystent"), "assistant") +
    qa2("inbox", tx("Inbox", "Skrzynka"), "mailbox") + qa2("help", tx("Find help", "Kto pomoże"), "experts") + '</div></div>';
  h += tile("ask", tx("Recent questions", "Ostatnie pytania"), listRows([
    [tx("Why did we drop the legacy auth flow?", "Dlaczego zrezygnowaliśmy ze starego flow?"), "4 " + tx("sources", "źródła"), "1h"],
    [tx("Refund policy for annual plans?", "Polityka zwrotów dla planów rocznych?"), "3 " + tx("sources", "źródła"), "3h"],
    [tx("Who owns Acme onboarding?", "Kto prowadzi wdrożenie Acme?"), "3 " + tx("sources", "źródła"), tx("yest.", "wcz.")]
  ]));
  h += tile("userplus", tx("New leads", "Nowe leady"), listRows([
    ["Acme Corp — Robert K.", tx("Demo requested", "Prośba o demo"), "2h"],
    ["Globex — Sarah M.", tx("Pricing question", "Pytanie o cennik"), "6h"],
    ["Initech — Bill L.", tx("Widget chat", "Rozmowa widgetu"), tx("yest.", "wcz.")]
  ]));
  h += '</div>' + joinbar() + '</div>';
  return h;
  function kpi(v, l) { return '<div style="background:var(--surface-2);border-radius:11px;padding:13px 15px"><div style="font-size:23px;font-weight:600" class="tnum">' + v + '</div><div class="t3" style="font-size:12px;margin-top:3px">' + l + '</div></div>'; }
  function qa2(icon, label, view) { return '<button class="card-hover" data-goto="' + view + '" style="border:1px solid var(--border);background:var(--surface);border-radius:11px;padding:11px;display:flex;align-items:center;gap:9px;text-align:left"><span class="icosq n" style="width:30px;height:30px">' + svg(icon) + '</span><span style="font-size:13px;font-weight:500">' + label + '</span></button>'; }
  function tile(icon, title, body) { return '<div class="card pad">' + sectitle(icon, title, 1) + '<div style="margin-top:8px">' + body + '</div></div>'; }
  function listRows(rows) {
    return '<div class="stack">' + rows.map(function (r) {
      return '<div class="lrow" data-fake><div style="flex:1;min-width:0"><div class="lt trunc">' + r[0] + '</div><div class="ld trunc">' + r[1] + '</div></div>' + (r[3] ? '<span class="badge warn" style="margin-right:6px">' + r[2] + '</span>' : '<span class="rt">' + r[2] + '</span>') + '</div>';
    }).join("") + '</div>';
  }
};

/* BOARD */
VIEWS.tablica = function () {
  var posts = [
    { who: "Piotr Nowak", time: tx("2h ago", "2 godz. temu"), pin: 1, body: tx("🚀 The <b>OAuth2 tenant migration is live</b>. Legacy auth flow is disabled and monitored (PR #412, ADR-018). If a customer reports login issues, check the runbook first and ping me in #eng-core.", "🚀 <b>Migracja tenantów na OAuth2 jest live</b>. Stary flow autoryzacji wyłączony i monitorowany (PR #412, ADR-018). Jeśli klient zgłasza problem z logowaniem, sprawdź najpierw runbook i pisz do mnie na #eng-core."), likes: 12, comments: [["Ania Wójcik", tx("Huge — thank you!", "Ogromna robota — dzięki!")], ["Ewa Dąbrowska", tx("Runbook link saved to the support playbook 👌", "Link do runbooka zapisany w playbooku wsparcia 👌")]] },
    { who: "Karolina Mazur", time: tx("5h ago", "5 godz. temu"), pin: 0, body: tx("New dashboard tiles shipped to staging. Grab a look before Thursday's review — feedback in the thread.", "Nowe kafelki pulpitu na staging. Zerknijcie przed czwartkowym review — uwagi w wątku."), img: 1, likes: 7, comments: [["Demo Tester", tx("Love the recap card at the top.", "Kafelek podsumowania na górze jest świetny.")]] },
    { who: "Jakub Lewandowski", time: tx("yesterday", "wczoraj"), pin: 0, body: tx("Acme signed the pilot 🎉 60 seats, security review is the last blocker. @Ania let's line up onboarding for next week.", "Acme podpisało pilotaż 🎉 60 miejsc, przegląd bezpieczeństwa to ostatni blocker. @Ania ustawmy wdrożenie na przyszły tydzień."), likes: 18, comments: [] }
  ];
  var h = '<div class="screen fade">';
  h += '<div class="row gap3" style="margin-bottom:14px"><span class="icosq acc" style="width:36px;height:36px">' + svg("board") + '</span><div><h1 class="ptitle" style="font-size:19px">' + tx("Board", "Tablica") + '</h1><p class="psub" style="margin-top:2px">' + tx("Team-wide announcements, decisions and updates.", "Ogłoszenia, decyzje i aktualizacje dla całego zespołu.") + '</p></div></div>';
  h += aibar(tx("Draft a post with AI…", "Napisz wpis z AI…"));
  h += '<div class="grid" style="grid-template-columns:minmax(0,1fr) 320px;margin-top:16px">';
  h += '<div class="stack gap4">';
  h += '<div class="card pad-sm"><textarea class="inp" style="height:70px;padding:10px 12px;resize:none" placeholder="' + esc(tx("Share an update with the team…", "Podziel się aktualizacją z zespołem…")) + '"></textarea><div class="spread" style="margin-top:10px;border-top:1px solid var(--border);padding-top:10px"><div class="row gap2"><button class="iconbtn" data-fake>' + svg("clip") + '</button><button class="iconbtn" data-fake>' + svg("eye") + '</button></div><button class="btn primary" data-fake>' + tx("Publish", "Opublikuj") + '</button></div></div>';
  posts.forEach(function (p) {
    h += '<div class="card card-hover pad" style="' + (p.pin ? "border-left:2px solid var(--accent)" : "") + '">';
    h += '<div class="row gap3">' + avatar(p.who, "lg") + '<div style="flex:1"><div class="row gap2"><b style="font-size:14.5px">' + p.who + '</b>' + (p.pin ? '<span class="badge warn">' + svg("pin") + tx("Pinned", "Przypięte") + '</span>' : '') + '</div><div class="t3" style="font-size:12px">' + p.time + '</div></div></div>';
    h += '<p style="font-size:14px;line-height:1.6;margin-top:11px">' + p.body + '</p>';
    if (p.img) h += '<div style="margin-top:11px;border:1px solid var(--border);border-radius:12px;height:180px;background:linear-gradient(135deg,var(--accent-soft),var(--surface-2));display:flex;align-items:center;justify-content:center;color:var(--text-3);font-size:12px">dashboard-tiles-staging.png</div>';
    h += '<div class="row gap2" style="margin-top:12px;border-top:1px solid var(--border);padding-top:10px"><button class="btn sm ghost" data-fake>' + svg("heart") + p.likes + '</button><button class="btn sm ghost" data-fake>' + svg("comment") + p.comments.length + '</button></div>';
    if (p.comments.length) { h += '<div class="stack gap2" style="margin-top:10px">'; p.comments.forEach(function (c) { h += '<div class="row gap2" style="align-items:flex-start">' + avatar(c[0], "sm") + '<div style="background:var(--surface-2);border-radius:14px;padding:8px 12px"><b style="font-size:12.5px">' + c[0] + '</b> <span style="font-size:13px">' + c[1] + '</span></div></div>'; }); h += '</div>'; }
    h += '</div>';
  });
  h += '</div>';
  h += '<aside class="stack gap4">';
  h += '<div class="card pad-sm"><div class="eyebrow" style="margin-bottom:8px">' + tx("About the board", "O tablicy") + '</div><p class="muted" style="font-size:12.5px;line-height:1.5">' + tx("Everything posted here is searchable in Questions — decisions become part of your company memory.", "Wszystko tutaj jest przeszukiwalne w Pytaniach — decyzje stają się częścią pamięci firmy.") + '</p></div>';
  h += '<div class="card pad-sm"><div class="eyebrow" style="margin-bottom:10px">' + tx("Most active", "Najaktywniejsi") + '</div><div class="stack gap2">' +
    ['Piotr Nowak|12', 'Ania Wójcik|9', 'Jakub Lewandowski|7'].map(function (x) { var p = x.split("|"); return '<div class="row gap2">' + avatar(p[0], "sm") + '<span style="font-size:13px;flex:1">' + p[0] + '</span><span class="t3 tnum" style="font-size:12px">' + p[1] + ' ' + tx("posts", "wpisów") + '</span></div>'; }).join("") + '</div></div>';
  h += '<div class="card pad-sm"><div class="eyebrow" style="margin-bottom:8px">' + tx("Pinned", "Przypięte") + '</div><div class="lrow" data-fake style="padding:6px"><div><div class="lt">Piotr Nowak</div><div class="ld clamp2">' + tx("OAuth2 tenant migration is live…", "Migracja tenantów na OAuth2 jest live…") + '</div></div></div></div>';
  h += '</aside></div>' + joinbar() + '</div>';
  return h;
};

/* QUESTIONS / ASK */
var THREADS = [
  { id: "auth", q: tx("Why did we drop the legacy auth flow?", "Dlaczego zrezygnowaliśmy ze starego flow autoryzacji?"), msgs: 2, srcN: 4,
    a: tx("The legacy flow was retired in March after the session-security audit <c>1</c>. The decision was made in the #eng-core thread <c>2</c> and documented in ADR-018 <c>3</c>; the migration steps live in the runbook <c>4</c>.",
      "Stary flow wyłączyliśmy w marcu po audycie bezpieczeństwa sesji <c>1</c>. Decyzja zapadła w wątku #eng-core <c>2</c> i jest opisana w ADR-018 <c>3</c>; kroki migracji znajdziesz w runbooku <c>4</c>."),
    srcs: [
      ["github", "PR #412 · auth: remove legacy flow", tx("Removes the session-token flow deprecated after the audit; new tenants start on OAuth2.", "Usuwa flow tokenów sesyjnych oznaczony jako przestarzały po audycie; nowe tenanty od razu na OAuth2.")],
      ["slack", "#eng-core", tx("…agreed: we sunset the legacy flow by end of March. @piotr owns the tenant migration…", "…ustalone: wygaszamy stary flow do końca marca. @piotr prowadzi migrację tenantów…")],
      ["confluence", "ADR-018 · Auth v2", tx("Context: session-fixation risk identified during the security audit. Decision: retire.", "Kontekst: ryzyko session-fixation wykryte podczas audytu. Decyzja: wygaszamy.")],
      ["jira", "AUTH-203", tx("Acceptance: all tenants on the OAuth2 flow, legacy endpoint disabled and monitored.", "Kryteria akceptacji: wszystkie tenanty na OAuth2, stary endpoint wyłączony i monitorowany.")]
    ] },
  { id: "refund", q: tx("What's our refund policy for annual plans?", "Jaka jest polityka zwrotów dla planów rocznych?"), msgs: 4, srcN: 3,
    a: tx("Annual plans are refundable pro-rata within the first 30 days <c>1</c>. After that, we credit the remaining term toward a plan change rather than a cash refund <c>2</c>. Support handles requests via the billing thread <c>3</c>.",
      "Plany roczne podlegają zwrotowi proporcjonalnie w pierwszych 30 dniach <c>1</c>. Później pozostały okres zaliczamy na poczet zmiany planu, a nie zwrotu gotówki <c>2</c>. Wsparcie obsługuje wnioski w wątku rozliczeniowym <c>3</c>."),
    srcs: [
      ["notion", tx("Billing & Refunds policy", "Polityka rozliczeń i zwrotów"), tx("Within 30 days: pro-rata refund. After 30 days: credit toward plan change.", "W ciągu 30 dni: zwrot proporcjonalny. Po 30 dniach: kredyt na zmianę planu.")],
      ["confluence", tx("Finance runbook", "Runbook finansów"), tx("Approvals over €2k require finance sign-off before issuing a credit.", "Zwroty powyżej 2 tys. € wymagają akceptacji finansów przed wystawieniem kredytu.")],
      ["email", tx("Gmail · Acme billing thread", "Gmail · wątek faktur Acme"), tx("Confirmed with the customer: pro-rata credit applied to the new 60-seat plan.", "Potwierdzone z klientem: kredyt proporcjonalny naliczony na nowy plan 60-miejscowy.")]
    ] },
  { id: "acme", q: tx("Who owns the Acme onboarding?", "Kto prowadzi wdrożenie Acme?"), msgs: 2, srcN: 3,
    a: tx("Ania Wójcik owns the Acme onboarding, with Jakub on the commercial side <c>1</c>. The kickoff is scheduled for this week <c>2</c>; the plan is tracked in Linear project “Acme” <c>3</c>.",
      "Wdrożenie Acme prowadzi Ania Wójcik, po stronie handlowej Jakub <c>1</c>. Kickoff zaplanowany na ten tydzień <c>2</c>; plan śledzony w projekcie Linear „Acme” <c>3</c>."),
    srcs: [
      ["slack", "#accounts", tx("@ania takes the Acme onboarding, @jakub keeps the commercial relationship.", "@ania bierze wdrożenie Acme, @jakub trzyma relację handlową.")],
      ["linear", tx("Project: Acme onboarding", "Projekt: wdrożenie Acme"), tx("12 issues · kickoff, SSO, data import, security review, training.", "12 zgłoszeń · kickoff, SSO, import danych, przegląd bezpieczeństwa, szkolenie.")],
      ["gdrive", tx("Acme — onboarding plan.xlsx", "Acme — plan wdrożenia.xlsx"), tx("Week-by-week rollout with owners and target dates.", "Wdrożenie tydzień po tygodniu z właścicielami i terminami.")]
    ] }
];
var CUR_THREAD = "auth";
VIEWS.ask = function () {
  var th = THREADS.filter(function (x) { return x.id === CUR_THREAD; })[0];
  var h = '<div class="screen fade" style="max-width:1240px"><div class="grid" style="grid-template-columns:minmax(0,1fr) 300px">';
  h += '<div class="stack gap4">';
  h += '<div class="row gap3"><span class="icosq acc" style="width:36px;height:36px">' + svg("chat") + '</span><div><h1 class="ptitle" style="font-size:18px">' + tx("Questions", "Pytania") + '</h1><p class="psub" style="margin-top:1px">' + tx("Answers with citations from your sources", "Odpowiedzi z cytatami ze źródeł") + '</p></div></div>';
  h += '<div class="msg-u">' + esc(th.q) + '</div>';
  h += '<div class="row gap3" style="align-items:flex-start"><span class="avatar md" style="background:var(--accent-soft);color:var(--accent)"><span style="width:16px;height:16px;display:block">' + svg("spark") + '</span></span><div style="flex:1;min-width:0">';
  h += '<div class="ans">' + renderCites(th.a) + '</div>';
  h += '<div class="row gap4" style="margin-top:10px"><button class="btn sm ghost" data-fake>' + svg("notes") + tx("Save to note", "Zapisz do notatki") + '</button><button class="btn sm ghost" data-fake>' + svg("playbook") + tx("Save as playbook", "Zapisz jako playbook") + '</button></div>';
  h += '<div class="srcbox" style="margin-top:14px"><div class="srcbox-h">' + svg("file") + tx("Sources", "Źródła") + ' (' + th.srcN + ')</div><div class="srcgrid">';
  th.srcs.forEach(function (s, i) { h += srcCard(s, i + 1); });
  h += '</div></div></div></div>';
  h += '<form class="aibar" data-fake style="margin-top:6px"><span class="spk">' + svg("spark") + '</span><input placeholder="' + esc(tx("Ask more in this thread… (e.g. “expand the last point”)", "Dopytaj w tym wątku… (np. „rozwiń ostatni punkt”)")) + '"><button class="btn primary" type="submit">' + svg("send") + '</button></form>';
  h += '</div>';
  h += '<aside class="stack gap3"><div class="spread"><div class="eyebrow">' + tx("Threads", "Wątki") + ' (' + THREADS.length + ')</div><button class="btn sm ghost" data-fake>' + svg("plus") + tx("New", "Nowy") + '</button></div>';
  THREADS.forEach(function (x) {
    h += '<button class="threadcard ' + (x.id === CUR_THREAD ? "active" : "") + '" data-thread="' + x.id + '"><div style="font-size:13px;font-weight:600" class="clamp2">' + esc(x.q) + '</div><div class="t3" style="font-size:11.5px;margin-top:4px">' + x.msgs + ' ' + tx("messages", "wiad.") + ' · ' + x.srcN + ' ' + tx("sources", "źródła") + '</div></button>';
  });
  h += '</aside></div>' + joinbar() + '</div>';
  return h;
};
function renderCites(s) { return s.replace(/<c>(\d+)<\/c>/g, '<span class="cite" data-fake>$1</span>'); }
function srcCard(s, n) {
  return '<button class="srccard" data-fake><div class="sc-top"><span class="sc-ic">' + logo(s[0]) + '</span><span class="sc-t trunc">' + esc(s[1]) + '</span><span class="sc-n">' + n + '</span></div><div class="sc-s clamp2">' + esc(s[2]) + '</div></button>';
}

/* SOURCES / DOCUMENTS */
var INTEGRATIONS = [
  ["github", "GitHub", 342, "ok"], ["slack", "Slack", 1208, "ok"], ["gdrive", "Google Drive", 512, "ok"],
  ["notion", "Notion", 96, "ok"], ["jira", "Jira", 214, "syncing"], ["confluence", "Confluence", 78, "ok"],
  ["linear", "Linear", 156, "ok"], ["gitlab", "GitLab", 61, "ok"], ["email", "Gmail", 0, "ok"], ["teams", "MS Teams", 0, "paused"]
];
var DOCS = [
  ["github", "PR #412 · auth: remove legacy flow", "GitHub · piotr-nowak", "2h", "ready"],
  ["gdrive", tx("Q3 Security Questionnaire.pdf", "Ankieta bezpieczeństwa Q3.pdf"), "Google Drive · Ania Wójcik", "3h", "processing"],
  ["confluence", "ADR-018 · Auth v2", "Confluence · Engineering", tx("yesterday", "wczoraj"), "ready"],
  ["notion", tx("Billing & Refunds policy", "Polityka rozliczeń i zwrotów"), "Notion · Finance", "1d", "ready"],
  ["linear", "DC-238 · rate-limit tuning", "Linear · Backend", "1d", "ready"],
  ["gdrive", tx("Acme — onboarding plan.xlsx", "Acme — plan wdrożenia.xlsx"), "Google Drive · Jakub L.", "2d", "ready"],
  ["slack", "#eng-core — auth migration thread", "Slack", "2d", "ready"],
  ["jira", "AUTH-203 · disable legacy endpoint", "Jira · AUTH", "2d", "ready"],
  ["gdrive", tx("Acme MSA (draft).docx", "Acme MSA (szkic).docx"), "Google Drive · Legal", "3d", "error"],
  ["notion", tx("Q3 Roadmap", "Roadmapa Q3"), "Notion · Ania Wójcik", "3d", "ready"],
  ["confluence", "ADR-019 · Rate limiting", "Confluence · Engineering", "4d", "ready"],
  ["github", "README · widget-embed", "GitHub · certemis", "4d", "ready"],
  ["email", tx("Acme billing thread", "Wątek faktur Acme"), "Gmail · support@democompany", "5d", "ready"],
  ["linear", tx("Project: Acme onboarding", "Projekt: wdrożenie Acme"), "Linear", "5d", "ready"]
];
VIEWS.documents = function () {
  var h = '<div class="fade" style="display:flex;min-height:calc(100vh - 52px)">';
  h += '<div class="stack" style="flex:0 0 240px;border-right:1px solid var(--border);padding:14px 10px;gap:2px">';
  h += navi("all", tx("All sources", "Wszystkie źródła"), 1564, 1);
  h += navi("f1", tx("Engineering", "Inżynieria"), 620, 0);
  h += navi("f2", tx("Sales & clients", "Sprzedaż i klienci"), 214, 0);
  h += navi("f3", tx("Finance & legal", "Finanse i prawo"), 96, 0);
  h += '<div class="eyebrow" style="padding:14px 8px 6px">' + tx("Integrations", "Integracje") + '</div>';
  INTEGRATIONS.forEach(function (s) {
    var sub = s[3] === "paused" ? tx("Reconnect", "Połącz ponownie") : s[0] === "email" ? tx("Mailbox · support@…", "Skrzynka · support@…") : (s[2].toLocaleString() + " " + tx("docs", "dok."));
    var dot = s[3] === "ok" ? "ok" : s[3] === "syncing" ? "acc" : "warn";
    h += '<div class="lrow" data-fake style="padding:7px 8px"><span class="icosq" style="width:30px;height:30px;border:1px solid var(--border);background:var(--surface);color:var(--text-2)">' + logo(s[0]) + '</span><div style="flex:1;min-width:0"><div class="row gap2"><span style="font-size:13px;font-weight:500">' + s[1] + '</span><span class="dot ' + dot + '"></span></div><div class="t3" style="font-size:11px' + (s[3] === "paused" ? ";color:var(--warning)" : "") + '">' + sub + '</div></div></div>';
  });
  h += '<button class="btn sm sec" data-fake style="margin-top:12px">' + svg("plus") + tx("New folder", "Nowy folder") + '</button></div>';
  h += '<div style="flex:1;min-width:0;padding:16px clamp(14px,2vw,26px) 60px">';
  h += '<div class="spread wrap" style="margin-bottom:16px;gap:10px"><div class="row gap2"><h1 class="ptitle" style="font-size:19px">' + tx("Sources", "Źródła") + '</h1><span class="pill" style="background:var(--surface-2)">1,564</span></div>' +
    '<div class="row gap2 wrap"><div class="search" style="width:220px">' + svg("search") + '<input class="inp" placeholder="' + esc(tx("Search sources…", "Szukaj źródeł…")) + '"></div><select class="selbox"><option>' + tx("All types", "Wszystkie typy") + '</option><option>PDF</option><option>Slack</option><option>' + tx("Code", "Kod") + '</option></select><button class="btn primary" data-fake>' + svg("plus") + tx("Add source", "Dodaj źródło") + '</button></div></div>';
  h += '<div style="max-width:1080px"><div class="card" style="overflow:hidden"><div class="divlist">';
  DOCS.forEach(function (d) {
    var badge = d[4] === "processing" ? '<span class="badge warn">' + tx("Processing", "Przetwarzanie") + '</span>' :
      d[4] === "error" ? '<span class="badge err">' + tx("Failed", "Błąd") + '</span>' : '';
    h += '<div class="lrow" data-fake style="border-radius:0;padding:11px 14px"><span class="icosq" style="width:34px;height:34px;background:var(--surface-hover);color:var(--text-2)">' + logo(d[0]) + '</span>' +
      '<div style="flex:1;min-width:0"><div class="lt trunc">' + d[1] + '</div><div class="ld trunc">' + d[2] + ' · ' + d[3] + '</div></div>' + badge +
      '<div class="row gap2" style="margin-left:8px"><button class="iconbtn" data-fake title="' + tx("Who can see this", "Kto to widzi") + '">' + svg("users2") + '</button><button class="iconbtn" data-fake>' + svg("eye") + '</button></div></div>';
  });
  h += '</div></div></div>' + joinbar() + '</div></div>';
  return h;
  function navi(id, label, n, active) { return '<button class="nav-item ' + (active ? "active" : "") + '" data-fake style="justify-content:flex-start">' + svg("folder") + '<span style="flex:1;text-align:left">' + label + '</span><span class="t3 tnum" style="font-size:11px">' + n.toLocaleString() + '</span></button>'; }
};

/* NOTES */
var NOTES = [
  { pin: 1, t: tx("Pricing objections — cheat sheet", "Obiekcje cenowe — ściąga"), f: tx("When a prospect says “too expensive”, anchor on time saved: 6h/week/team member…", "Gdy klient mówi „za drogo”, odwołaj się do zaoszczędzonego czasu: 6 godz./tydz./osobę…"), who: tx("You", "Ty"), d: "1d" },
  { pin: 1, t: tx("Onboarding checklist v2", "Checklista wdrożenia v2"), f: tx("1. Connect sources 2. Invite team 3. Set access 4. First question 5. Widget…", "1. Podłącz źródła 2. Zaproś zespół 3. Ustaw dostęp 4. Pierwsze pytanie 5. Widget…"), who: tx("You", "Ty"), d: "2d" },
  { pin: 0, t: tx("Acme call — notes", "Call z Acme — notatki"), f: tx("60 seats, SSO required, security review before go-live. Robert is the champion.", "60 miejsc, wymagane SSO, przegląd bezpieczeństwa przed startem. Robert to sponsor."), who: "Jakub Lewandowski", d: "2d" },
  { pin: 0, t: tx("Auth migration retro", "Retro migracji auth"), f: tx("What went well: staged rollout. To improve: earlier comms to support.", "Co poszło dobrze: etapowe wdrożenie. Do poprawy: wcześniejsza komunikacja do wsparcia."), who: "Piotr Nowak", d: "4d" },
  { pin: 0, t: tx("Competitor teardown", "Analiza konkurencji"), f: tx("Their search is keyword-only, no citations, no permission awareness. Our edge.", "Ich wyszukiwanie działa tylko na słowa kluczowe, bez cytatów i uprawnień. Nasza przewaga."), who: "Ania Wójcik", d: "6d" },
  { pin: 0, t: tx("Q3 goals draft", "Szkic celów Q3"), f: tx("Ship dashboard v2, close 3 pilots, reduce support first-response to < 1h.", "Wdrożyć pulpit v2, zamknąć 3 pilotaże, skrócić pierwszą odpowiedź wsparcia < 1 godz."), who: "Demo Tester", d: "1w" }
];
VIEWS.notes = function () {
  var h = '<div class="screen fade">' + phead(tx("Notes", "Notatki"), tx("Personal and shared notes — summarize with AI or promote to a playbook.", "Notatki osobiste i wspólne — podsumuj z AI lub awansuj do playbooka."), '<button class="btn primary" data-fake>' + svg("plus") + tx("New note", "Nowa notatka") + '</button>');
  h += '<div class="row gap2" style="margin-bottom:16px"><div class="search" style="flex:1;max-width:420px">' + svg("search") + '<input class="inp" placeholder="' + esc(tx("Search notes…", "Szukaj notatek…")) + '"></div></div>';
  h += '<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">';
  NOTES.forEach(function (n) {
    h += '<div class="card card-hover pad-sm stack" style="min-height:150px;' + (n.pin ? "border-left:2px solid var(--accent)" : "") + '"><div class="row gap2"><span class="icosq hov" style="width:28px;height:28px">' + svg("notes") + '</span>' + (n.pin ? '<span style="margin-left:auto;color:var(--accent);width:16px;height:16px">' + svg("pin") + '</span>' : '') + '</div>' +
      '<div style="font-size:13.5px;font-weight:600;margin-top:9px" class="clamp2">' + n.t + '</div><p class="muted clamp3" style="font-size:12.5px;margin-top:6px;flex:1">' + n.f + '</p>' +
      '<div class="t3" style="font-size:11.5px;border-top:1px solid var(--border);padding-top:9px;margin-top:9px">' + (n.who === tx("You", "Ty") ? n.who : tx("from ", "od ") + n.who) + ' · ' + n.d + '</div></div>';
  });
  h += '</div>' + joinbar() + '</div>';
  return h;
};

/* PLAYBOOKS */
var PLAYBOOKS = [
  { cat: tx("Support", "Wsparcie"), t: tx("Billing & refund requests", "Zwroty i faktury"), off: 1, f: tx("Verify plan, check 30-day window, apply pro-rata credit, log in Notion. Escalate > €2k.", "Sprawdź plan, okno 30 dni, nalicz kredyt proporcjonalny, zapisz w Notion. Eskaluj > 2 tys. €."), who: "Ewa Dąbrowska", d: "1d" },
  { cat: tx("Sales", "Sprzedaż"), t: tx("Enterprise security review", "Przegląd bezpieczeństwa enterprise"), off: 1, f: tx("Send the security packet, offer SSO, book a call with engineering if needed.", "Wyślij pakiet bezpieczeństwa, zaproponuj SSO, umów call z inżynierią w razie potrzeby."), who: "Jakub Lewandowski", d: "3d" },
  { cat: tx("Engineering", "Inżynieria"), t: tx("Auth incident runbook", "Runbook incydentu auth"), off: 1, f: tx("Check OAuth2 dashboards, confirm legacy endpoint disabled, roll token cache if 401 spikes.", "Sprawdź dashboardy OAuth2, potwierdź wyłączenie starego endpointu, wyczyść cache tokenów przy skoku 401."), who: "Piotr Nowak", d: "5d" },
  { cat: tx("Onboarding", "Wdrożenie"), t: tx("New client kickoff", "Kickoff nowego klienta"), off: 0, f: tx("Kickoff agenda, data-import checklist, access setup, first-week success metrics.", "Agenda kickoffu, checklista importu danych, konfiguracja dostępu, metryki sukcesu 1. tygodnia."), who: "Ania Wójcik", d: "1w" }
];
VIEWS.playbooki = function () {
  var h = '<div class="screen fade">' + phead(tx("Playbooks", "Playbooki"), tx("Reusable, official answers your whole team (and the widget) can rely on.", "Wielokrotne, oficjalne odpowiedzi, na których polega zespół (i widget)."), '<button class="btn primary" data-fake>' + svg("plus") + tx("New", "Nowy") + '</button>');
  h += '<div class="row gap2 wrap" style="margin-bottom:16px"><div class="search" style="flex:1;max-width:420px">' + svg("search") + '<input class="inp" placeholder="' + esc(tx("Search playbooks…", "Szukaj playbooków…")) + '"></div><select class="selbox"><option>' + tx("All categories", "Wszystkie kategorie") + '</option><option>' + tx("Support", "Wsparcie") + '</option><option>' + tx("Sales", "Sprzedaż") + '</option></select></div>';
  h += '<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr))">';
  PLAYBOOKS.forEach(function (p) {
    h += '<div class="card card-hover pad-sm stack" style="min-height:160px"><div class="row gap2"><span class="icosq acc" style="width:28px;height:28px">' + svg("playbook") + '</span><span class="pill acc" style="margin-left:auto">' + p.cat + '</span></div>' +
      '<div style="font-size:13.5px;font-weight:600;margin-top:9px" class="clamp2">' + p.t + '</div>' +
      (p.off ? '<span class="badge ok" style="align-self:flex-start;margin-top:6px">' + svg("check") + tx("Official", "Oficjalny") + '</span>' : '') +
      '<p class="muted clamp3" style="font-size:12.5px;margin-top:8px;flex:1">' + p.f + '</p>' +
      '<div class="t3" style="font-size:11.5px;border-top:1px solid var(--border);padding-top:9px;margin-top:9px">' + p.who + ' · ' + p.d + '</div></div>';
  });
  h += '</div>' + joinbar() + '</div>';
  return h;
};

/* CHAT */
var CHANNELS = [
  ["eng-core", tx("engineering", "inżynieria"), 0], ["accounts", tx("sales & CS", "sprzedaż i CS"), 3],
  ["support", tx("customer support", "wsparcie"), 0], ["random", tx("watercooler", "luźne rozmowy"), 0]
];
var DMS = [["Piotr Nowak", 0], ["Ania Wójcik", 1], ["Jakub Lewandowski", 0]];
var CUR_CH = "eng-core";
var CHAT_MSGS = {
  "eng-core": [
    ["Piotr Nowak", "10:02", tx("Legacy auth endpoint is now disabled in prod. Watching 401 rates — all flat so far. 🎉", "Stary endpoint auth wyłączony na prod. Obserwuję 401 — na razie płasko. 🎉"), 0],
    ["Tomasz Zieliński", "10:05", tx("Nice. I bumped the rate-limit config in DC-238, deploying in ~10.", "Super. Podbiłem rate-limit w DC-238, deploy za ~10 min."), 0],
    ["Demo Tester", "10:09", tx("Can we post a short summary to the Board so support has context?", "Wrzućmy krótkie podsumowanie na Tablicę, żeby wsparcie miało kontekst?"), 1],
    ["Piotr Nowak", "10:11", tx("On it — linking the runbook and ADR-018.", "Robię — podlinkuję runbook i ADR-018."), 0]
  ],
  "accounts": [
    ["Jakub Lewandowski", "09:40", tx("Acme signed the pilot — 60 seats! Security review is the last blocker.", "Acme podpisało pilotaż — 60 miejsc! Przegląd bezpieczeństwa to ostatni blocker."), 0],
    ["Ania Wójcik", "09:44", tx("I'll own onboarding. Kickoff Thursday, I'll set up the Linear project.", "Biorę wdrożenie. Kickoff w czwartek, ustawię projekt w Linear."), 0],
    ["Demo Tester", "09:46", tx("Perfect. Let's make sure the security packet is ready before the call.", "Idealnie. Upewnijmy się, że pakiet bezpieczeństwa jest gotowy przed callem."), 1]
  ],
  "support": [
    ["Ewa Dąbrowska", "08:30", tx("Acme asked about EU data residency again — pointing them to the security packet.", "Acme znów pyta o rezydencję danych w UE — kieruję ich do pakietu bezpieczeństwa."), 0],
    ["Demo Tester", "08:33", tx("👍 Robert emailed me too, I'll take that one.", "👍 Robert napisał też do mnie, wezmę to."), 1]
  ],
  "random": [
    ["Karolina Mazur", "12:10", tx("New office plants have arrived 🌱", "Przyjechały nowe rośliny do biura 🌱"), 0],
    ["Tomasz Zieliński", "12:14", tx("The monstera finally has a friend.", "Monstera w końcu ma towarzystwo."), 0]
  ]
};
VIEWS.chat = function () {
  var msgs = CHAT_MSGS[CUR_CH] || CHAT_MSGS["eng-core"];
  var ch = CHANNELS.filter(function (c) { return c[0] === CUR_CH; })[0] || CHANNELS[0];
  var h = '<div class="fade" style="display:flex;gap:14px;height:calc(100vh - 52px);padding:14px clamp(14px,2vw,24px)">';
  h += '<div class="stack gap2" style="flex:0 0 210px">';
  h += '<div class="spread"><div class="eyebrow">' + tx("Channels", "Kanały") + '</div><button class="iconbtn" data-fake>' + svg("plus") + '</button></div>';
  CHANNELS.forEach(function (c) { h += '<button class="nav-item ' + (c[0] === CUR_CH ? "active" : "") + '" data-ch="' + c[0] + '"><span style="font-weight:600">#</span><span style="flex:1;text-align:left">' + c[0] + '</span>' + (c[2] ? '<span class="nav-badge acc">' + c[2] + '</span>' : '') + '</button>'; });
  h += '<div class="eyebrow" style="margin-top:12px">' + tx("Direct messages", "Wiadomości") + '</div>';
  DMS.forEach(function (d) { h += '<button class="nav-item" data-fake>' + avatar(d[0], "sm") + '<span style="flex:1;text-align:left">' + d[0] + '</span>' + (d[1] ? '<span class="nav-badge acc">' + d[1] + '</span>' : '') + '</button>'; });
  h += '</div>';
  h += '<div class="card stack" style="flex:1;min-width:0;overflow:hidden;border-radius:16px">';
  h += '<div class="spread" style="border-bottom:1px solid var(--border);padding:12px 16px"><div class="row gap2"><span class="icosq acc" style="width:32px;height:32px">' + svg("chat") + '</span><div><div style="font-size:14.5px;font-weight:600">#' + ch[0] + '</div><div class="t3" style="font-size:11.5px">' + ch[1] + ' · 8 ' + tx("members", "członków") + '</div></div></div><button class="btn sm sec" data-fake>' + svg("users2") + tx("Invite (link)", "Zaproś (link)") + '</button></div>';
  h += '<div style="flex:1;overflow-y:auto;padding:16px" class="stack gap4">';
  msgs.forEach(function (m) {
    var me = m[3];
    h += '<div class="row gap3" style="align-items:flex-start;' + (me ? "flex-direction:row-reverse" : "") + '">' + avatar(m[0], "md") + '<div style="' + (me ? "text-align:right" : "") + '"><div class="t3" style="font-size:11.5px;margin-bottom:3px">' + (me ? m[1] + ' · ' + m[0] : m[0] + ' · ' + m[1]) + '</div><div class="cbub ' + (me ? "me" : "them") + '">' + esc(m[2]) + '</div></div></div>';
  });
  h += '</div>';
  h += '<div style="border-top:1px solid var(--border);padding:12px 14px"><form class="aibar" data-fake><button class="iconbtn" type="button" data-fake style="color:var(--text-3)">' + svg("clip") + '</button><input placeholder="' + esc(tx("Message #", "Napisz na #") + ch[0] + "…") + '"><button class="btn primary" type="submit">' + svg("send") + '</button></form></div>';
  h += '</div></div>';
  return h;
};

/* CALENDAR */
var CAL_EVENTS = { 7: [["meeting", tx("Eng weekly", "Eng weekly"), "10:30"], ["task", tx("Reply to Acme", "Odpowiedz Acme"), "13:00"], ["meeting", tx("Acme onboarding", "Wdrożenie Acme"), "15:00"]],
  9: [["deadline", tx("Q3 security due", "Termin Q3"), ""]], 3: [["meeting", "1:1 Piotr", "11:00"]], 4: [["personal", tx("Dentist", "Dentysta"), "17:00"]],
  10: [["task", tx("Pilot report", "Raport pilotażu"), "09:00"]], 15: [["meeting", tx("Board review", "Review zarządu"), "14:00"]], 22: [["meeting", tx("All-hands", "All-hands"), "16:00"]] };
VIEWS.calendar = function () {
  var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], daysPl = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];
  var h = '<div class="screen fade" style="max-width:1400px">';
  h += '<div class="spread wrap" style="margin-bottom:12px;gap:10px"><div class="row gap2"><span class="icosq acc" style="width:34px;height:34px">' + svg("calendar") + '</span><h1 class="ptitle" style="font-size:19px">' + tx("July 2026", "Lipiec 2026") + '</h1></div>' +
    '<div class="row gap2"><button class="iconbtn" data-fake style="border:1px solid var(--border)">‹</button><button class="btn sm sec" data-fake>' + tx("Today", "Dziś") + '</button><button class="iconbtn" data-fake style="border:1px solid var(--border)">›</button>' +
    '<div class="seg"><button data-fake>' + tx("Day", "Dzień") + '</button><button data-fake>' + tx("Week", "Tydzień") + '</button><button class="on">' + tx("Month", "Miesiąc") + '</button><button data-fake>' + tx("Agenda", "Agenda") + '</button></div><button class="btn primary" data-fake>' + svg("plus") + tx("New", "Nowe") + '</button></div></div>';
  h += aibar(tx("e.g. “Acme call Thursday 3pm” — type it, AI schedules it", "np. „call z Acme czwartek 15:00” — wpisz, AI zaplanuje"));
  h += '<div class="row gap2 wrap" style="margin:14px 0"><div class="chip on" data-fake><span class="dot" style="background:var(--cat-meeting)"></span>' + tx("Meetings", "Spotkania") + '</div><div class="chip" data-fake><span class="dot" style="background:var(--cat-task)"></span>' + tx("Tasks", "Zadania") + '</div><div class="chip" data-fake><span class="dot" style="background:var(--cat-deadline)"></span>' + tx("Deadlines", "Terminy") + '</div><div class="chip" data-fake><span class="dot" style="background:var(--cat-personal)"></span>' + tx("Personal", "Osobiste") + '</div></div>';
  h += '<div class="calgrid">';
  (LANG === "pl" ? daysPl : days).forEach(function (d) { h += '<div class="calhd">' + d + '</div>'; });
  var lead = 2, total = 35;
  for (var i = 0; i < total; i++) {
    var dnum = i - lead + 1;
    var out = dnum < 1 || dnum > 31;
    var disp = out ? (dnum < 1 ? 29 + dnum : dnum - 31) : dnum;
    var today = dnum === 7;
    h += '<div class="calcell ' + (out ? "out" : "") + (today ? " today" : "") + '"><div class="caldate">' + disp + '</div>';
    if (!out && CAL_EVENTS[dnum]) CAL_EVENTS[dnum].forEach(function (e) {
      h += '<div class="calev" data-fake style="background:var(--cat-' + e[0] + '-soft);color:var(--cat-' + e[0] + ')">' + (e[2] ? e[2] + ' ' : '') + e[1] + '</div>';
    });
    h += '</div>';
  }
  h += '</div>' + joinbar() + '</div>';
  return h;
};

/* MAILBOX */
var MAILS = [
  ["Robert Kowal", "Acme Corp", tx("Re: Pilot agreement & security review", "Re: Umowa pilotażowa i przegląd bezpieczeństwa"), tx("Thanks — we're ready to sign once the security packet is in. One question on data residency…", "Dzięki — podpiszemy, gdy dostaniemy pakiet bezpieczeństwa. Jedno pytanie o rezydencję danych…"), "09:12", 1, 2, "#0891b2"],
  ["Sarah Miller", "Globex", tx("Pricing for 25 seats", "Cennik dla 25 miejsc"), tx("Hi, could you send an annual quote for 25 seats? We saw the demo and liked the citations.", "Cześć, prześlecie ofertę roczną na 25 miejsc? Widzieliśmy demo, cytaty robią wrażenie."), "08:47", 1, 0, "#7c3aed"],
  ["Stripe", "billing", tx("Your invoice for June is ready", "Faktura za czerwiec jest gotowa"), tx("Invoice DC-2026-06 for €1,240 has been paid. View or download your receipt.", "Faktura DC-2026-06 na 1240 € została opłacona. Zobacz lub pobierz potwierdzenie."), tx("yest.", "wcz."), 0, 1, "#635bff"],
  ["Bill Lumbergh", "Initech", tx("Question from your website chat", "Pytanie z czatu na stronie"), tx("The assistant on your site answered most of it, but I wanted to talk to a human about SSO.", "Asystent na stronie odpowiedział na większość, ale chciałbym pogadać z człowiekiem o SSO."), tx("yest.", "wcz."), 0, 0, "#d97706"],
  ["Ania Wójcik", "Demo Company", tx("Acme onboarding plan — draft", "Plan wdrożenia Acme — szkic"), tx("Shared the week-by-week plan in Drive. Can you review the security-review step before the kickoff?", "Wrzuciłam plan tydzień po tygodniu na Drive. Zerkniesz na krok przeglądu bezpieczeństwa przed kickoffem?"), "Mon", 0, 1, "#7c3aed"]
];
VIEWS.mailbox = function () {
  var h = '<div class="fade" style="display:flex;flex-direction:column;height:calc(100vh - 52px);padding:14px clamp(14px,2vw,24px)">';
  h += '<div class="spread wrap" style="margin-bottom:12px"><h1 class="ptitle" style="font-size:19px">' + tx("Inbox", "Skrzynka") + '</h1><div class="search" style="width:280px">' + svg("search") + '<input class="inp" placeholder="' + esc(tx("Search mail…", "Szukaj poczty…")) + '"></div></div>';
  h += '<div class="spread wrap" style="margin-bottom:12px;gap:10px"><div class="seg">' +
    ['inbox|' + tx("Inbox", "Odebrane") + '|5', 'sent|' + tx("Sent", "Wysłane") + '|', 'drafts|' + tx("Drafts", "Szkice") + '|', 'archive|' + tx("Archive", "Archiwum") + '|'].map(function (x) { var p = x.split("|"); return '<button class="' + (p[0] === "inbox" ? "on" : "") + '" data-fake>' + p[1] + (p[2] ? ' <span style="opacity:.7">' + p[2] + '</span>' : '') + '</button>'; }).join("") + '</div>' +
    '<div class="row gap2"><button class="chip" data-fake>' + tx("Unread", "Nieprzeczytane") + '</button><button class="chip" data-fake>' + tx("With attachments", "Z załącznikami") + '</button></div></div>';
  h += '<div class="two-pane" style="flex:1;min-height:0">';
  h += '<div class="card" style="overflow:auto">';
  MAILS.forEach(function (m, i) {
    h += '<div class="mailrow ' + (i === 0 ? "sel unread" : (m[5] ? "unread" : "")) + '" data-fake style="border-bottom:1px solid var(--border)"><span class="mail-av" style="background:' + m[7] + '">' + initials(m[0]) + '</span>' +
      '<div class="stack" style="flex:1;min-width:0;gap:2px"><div class="spread"><span class="ms" style="font-size:14px">' + m[0] + '</span><span class="t3" style="font-size:11.5px">' + m[4] + '</span></div>' +
      '<div class="row gap2">' + (m[5] ? '<span class="dot acc"></span>' : '') + '<span style="font-size:13px;font-weight:500" class="trunc">' + m[2] + '</span>' + (m[6] ? '<span class="pill" style="padding:0 6px"><span style="width:11px;height:11px;display:inline-block">' + svg("clip") + '</span>' + m[6] + '</span>' : '') + '</div>' +
      '<div class="t3 trunc" style="font-size:12px;margin-top:2px">' + m[3] + '</div></div></div>';
  });
  h += '</div>';
  var m = MAILS[0];
  h += '<div class="card" style="overflow:auto"><div style="padding:18px 20px;border-bottom:1px solid var(--border)"><h2 style="font-size:17px;font-weight:600">' + m[2] + '</h2><div class="row gap2" style="margin-top:10px"><span class="mail-av" style="background:' + m[7] + '">' + initials(m[0]) + '</span><div><div style="font-size:13.5px;font-weight:600">' + m[0] + ' <span class="t3" style="font-weight:400">· ' + m[1] + '</span></div><div class="t3" style="font-size:11.5px">' + tx("to me · ", "do mnie · ") + m[4] + '</div></div></div></div>' +
    '<div style="padding:20px;font-size:14px;line-height:1.7">' +
    '<p>' + tx("Hi,", "Cześć,") + '</p><p style="margin-top:12px">' + tx("Thanks for the walkthrough last week — the team was impressed, especially with how every answer cites the underlying source. We're ready to sign the pilot for 60 seats.", "Dzięki za prezentację w zeszłym tygodniu — zespół był pod wrażeniem, zwłaszcza tym, że każda odpowiedź cytuje źródło. Jesteśmy gotowi podpisać pilotaż na 60 miejsc.") + '</p>' +
    '<p style="margin-top:12px">' + tx("One question before we proceed: where is our data stored, and can we keep it in the EU? Our security team will need this for the review.", "Jedno pytanie: gdzie przechowywane są nasze dane i czy mogą zostać w UE? Nasz zespół bezpieczeństwa będzie tego potrzebował do przeglądu.") + '</p>' +
    '<p style="margin-top:12px">' + tx("Best,", "Pozdrawiam,") + '<br>Robert</p>' +
    '<div class="card pad-sm" style="margin-top:16px;background:var(--surface-2)"><div class="row gap2"><span class="icosq acc" style="width:26px;height:26px">' + svg("spark") + '</span><b style="font-size:12.5px">' + tx("Suggested reply · from your playbook", "Sugerowana odpowiedź · z playbooka") + '</b></div><p class="muted" style="font-size:12.5px;margin-top:8px">' + tx("Data is stored in the EU (Frankfurt). Security packet with sub-processors and data-residency details is attached — happy to book a call with your security team.", "Dane przechowywane w UE (Frankfurt). Pakiet bezpieczeństwa z podprocesorami i szczegółami rezydencji w załączniku — chętnie umówimy call z Waszym zespołem bezpieczeństwa.") + '</p></div>' +
    '<div class="row gap2" style="margin-top:16px"><button class="btn primary" data-fake>' + svg("reply") + tx("Reply", "Odpowiedz") + '</button><button class="btn sec" data-fake>' + svg("spark") + tx("Reply with AI", "Odpowiedz z AI") + '</button></div></div></div>';
  h += '</div></div>';
  return h;
};
VIEWS.needsReply = function () {
  var h = '<div class="screen fade">' + phead(tx("To reply", "Do odpowiedzi"), tx("Emails the AI flagged as needing a human response, ranked by urgency.", "E-maile oznaczone przez AI jako wymagające odpowiedzi człowieka, wg pilności."), '');
  var items = [
    [MAILS[0], tx("High — client, revenue at stake", "Wysoka — klient, przychód"), "err"],
    [MAILS[1], tx("Medium — inbound lead", "Średnia — lead przychodzący"), "warn"],
    [MAILS[3], tx("Medium — SSO question", "Średnia — pytanie o SSO"), "warn"]
  ];
  h += '<div class="stack gap3" style="max-width:900px">';
  items.forEach(function (it) { var m = it[0];
    h += '<div class="card card-hover pad row gap3"><span class="mail-av" style="background:' + m[7] + '">' + initials(m[0]) + '</span><div style="flex:1;min-width:0"><div class="spread"><b style="font-size:14px">' + m[0] + ' <span class="t3" style="font-weight:400">· ' + m[1] + '</span></b><span class="badge ' + it[2] + '">' + it[1] + '</span></div><div style="font-size:13px;font-weight:500;margin-top:3px">' + m[2] + '</div><div class="t3 clamp2" style="font-size:12.5px;margin-top:3px">' + m[3] + '</div></div><button class="btn sm primary" data-fake>' + svg("reply") + tx("Reply", "Odpowiedz") + '</button></div>';
  });
  h += '</div>' + joinbar() + '</div>';
  return h;
};

/* PEOPLE / TEAM */
VIEWS.team = function () {
  var h = '<div class="screen fade">' + phead(tx("Team", "Zespół"), tx("Members, roles and which sources each person can see. Invite teammates or clients.", "Członkowie, role i to, które źródła każdy widzi. Zaproś współpracowników lub klientów."), '');
  h += '<div class="grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">';
  [["8", tx("Members", "Członkowie")], ["37", tx("Questions (7d)", "Pytania (7d)")], ["3", tx("Clients", "Klienci")], ["92%", tx("Answered", "Odpowiedziane")]].forEach(function (s) {
    h += '<div style="border:1px solid var(--border);border-radius:12px;padding:13px 15px"><div style="font-size:22px;font-weight:600" class="tnum">' + s[0] + '</div><div class="t3" style="font-size:12px;margin-top:3px">' + s[1] + '</div></div>';
  });
  h += '</div>';
  h += '<div class="eyebrow" style="margin-bottom:10px">' + tx("Members", "Członkowie") + '</div><div class="stack gap2" style="max-width:960px">';
  PEOPLE.forEach(function (p) {
    var tone = p.role === "owner" ? "warn" : p.role === "client" ? "acc" : "neutral";
    h += '<div class="card row gap3" style="padding:12px 14px">' + avatar(p.name, "md") + '<div style="flex:1;min-width:0"><div class="row gap2"><b style="font-size:13.5px">' + p.name + '</b><span class="badge ' + tone + '">' + tx(ROLE[p.role][0], ROLE[p.role][1]) + '</span></div><div class="t3" style="font-size:12px;margin-top:2px">' + tx(p.title_en, p.title_pl) + ' · ' + tx("active today", "aktywny dziś") + '</div></div>' +
      '<select class="selbox" style="height:30px"><option>' + tx(ROLE[p.role][0], ROLE[p.role][1]) + '</option><option>' + tx("Admin", "Administrator") + '</option><option>' + tx("Member", "Członek") + '</option></select></div>';
  });
  h += '</div>';
  h += '<div class="grid" style="grid-template-columns:1fr 1fr;margin-top:22px;max-width:960px">';
  h += '<div class="card pad"><div class="eyebrow" style="margin-bottom:10px">' + tx("Invite teammate", "Zaproś współpracownika") + '</div><div class="row gap2"><select class="selbox" style="flex:1"><option>' + tx("Member", "Członek") + '</option><option>' + tx("Admin", "Administrator") + '</option></select><button class="btn primary" data-fake>' + svg("plus") + tx("Generate link", "Generuj link") + '</button></div><div style="margin-top:12px;border:1px solid var(--border);background:var(--surface-2);border-radius:9px;padding:9px 11px;font-family:ui-monospace,monospace;font-size:11.5px;color:var(--text-2)" class="trunc">app.certemis.com/register?invite=nW8kQ…</div></div>';
  h += '<div class="card pad"><div class="eyebrow" style="margin-bottom:10px">' + tx("Source access", "Dostęp do źródeł") + '</div><p class="muted" style="font-size:12.5px">' + tx("Workspace is in restricted mode — members only see sources they're granted.", "Workspace w trybie ograniczonym — członkowie widzą tylko przyznane źródła.") + '</p><div class="row wrap gap2" style="margin-top:10px"><span class="pill">GitHub</span><span class="pill">Slack</span><span class="pill" style="border-color:var(--warning);background:var(--warning-soft);color:var(--warning)">🔒 Gmail</span><span class="pill" style="border-color:var(--warning);background:var(--warning-soft);color:var(--warning)">🔒 ' + tx("Finance", "Finanse") + '</span></div></div>';
  h += '</div>' + joinbar() + '</div>';
  return h;
};

/* ASSISTANT */
VIEWS.assistant = function () {
  var h = '<div class="screen fade" style="max-width:820px">' + phead(tx("Assistant", "Asystent"), tx("Ask the assistant to do things across your workspace — it can draft, schedule and summarize.", "Poproś asystenta, żeby coś zrobił w workspace — napisze, zaplanuje i podsumuje."), '');
  h += '<div class="card pad stack gap4"><div class="row gap3" style="align-items:flex-start"><span class="avatar md" style="background:var(--accent-soft);color:var(--accent)"><span style="width:16px;height:16px;display:block">' + svg("spark") + '</span></span><div class="ans" style="flex:1">' + tx("Hi 👋 I can help across Demo Company. Try: <b>“Draft a reply to Robert about data residency”</b>, <b>“Schedule the Acme onboarding call Thursday 3pm”</b>, or <b>“Summarize this week for the board”</b>.", "Cześć 👋 Pomogę w całym Demo Company. Spróbuj: <b>„Napisz odpowiedź do Roberta o rezydencji danych”</b>, <b>„Zaplanuj call wdrożeniowy Acme czwartek 15:00”</b> lub <b>„Podsumuj tydzień dla zarządu”</b>.") + '</div></div>';
  h += '<div class="row wrap gap2">' + chip(tx("Draft reply to Robert", "Napisz odpowiedź do Roberta")) + chip(tx("Schedule Acme call", "Zaplanuj call Acme")) + chip(tx("Weekly summary", "Podsumowanie tygodnia")) + '</div>';
  h += aibar(tx("Ask the assistant to do something…", "Poproś asystenta o coś…")) + '</div>' + joinbar() + '</div>';
  return h;
};
/* ONBOARDING */
VIEWS.wdrozenie = function () {
  var steps = [
    [tx("Connect your first source", "Podłącz pierwsze źródło"), tx("GitHub, Slack, Drive and more.", "GitHub, Slack, Drive i więcej."), 1],
    [tx("Invite your team", "Zaproś zespół"), tx("Members, admins or clients.", "Członkowie, administratorzy lub klienci."), 1],
    [tx("Ask your first question", "Zadaj pierwsze pytanie"), tx("See an answer with citations.", "Zobacz odpowiedź z cytatami."), 1],
    [tx("Create a playbook", "Utwórz playbook"), tx("Turn a good answer into an official one.", "Zamień dobrą odpowiedź w oficjalną."), 1],
    [tx("Connect Jira", "Podłącz Jira"), tx("Bring issues into your company memory.", "Wciągnij zgłoszenia do pamięci firmy."), 0],
    [tx("Set up the widget", "Skonfiguruj widget"), tx("Answer visitors on your website.", "Odpowiadaj odwiedzającym na stronie."), 0]
  ];
  var h = '<div class="screen fade" style="max-width:760px">' + phead(tx("Onboarding", "Wdrożenie"), tx("A few steps to get the most out of Certemis.", "Kilka kroków, by wycisnąć z Certemis maksimum."), '');
  h += '<div class="card pad"><div class="spread" style="margin-bottom:14px"><b>' + tx("4 of 6 complete", "4 z 6 ukończone") + '</b><div class="prog" style="width:160px"><i style="width:66%"></i></div></div><div class="stack gap2">';
  steps.forEach(function (s, i) {
    h += '<div class="row gap3" style="padding:11px;border:1px solid var(--border);border-radius:11px;' + (s[2] ? "background:var(--success-soft);border-color:color-mix(in srgb,var(--success) 30%,transparent)" : "") + '"><span class="icosq" style="width:30px;height:30px;' + (s[2] ? "background:var(--success);color:#fff" : "background:var(--surface-hover);color:var(--text-3)") + '">' + (s[2] ? svg("check") : String(i + 1)) + '</span><div style="flex:1"><div style="font-size:13.5px;font-weight:600">' + s[0] + '</div><div class="t3" style="font-size:12px">' + s[1] + '</div></div>' + (s[2] ? '<span class="badge ok">' + tx("Done", "Gotowe") + '</span>' : '<button class="btn sm primary" data-fake>' + tx("Start", "Zacznij") + '</button>') + '</div>';
  });
  h += '</div></div>' + joinbar() + '</div>';
  return h;
};
/* FIND HELP */
VIEWS.experts = function () {
  var h = '<div class="screen fade">' + phead(tx("Find help", "Kto pomoże"), tx("Not sure who knows something? Certemis points you to the right person based on what they work on.", "Nie wiesz, kto coś wie? Certemis wskaże właściwą osobę na podstawie tego, czym się zajmuje."), '');
  var experts = [
    ["Piotr Nowak", tx("Auth, infrastructure, incidents", "Auth, infrastruktura, incydenty"), "142"],
    ["Ania Wójcik", tx("Product, roadmap, onboarding", "Produkt, roadmapa, wdrożenia"), "98"],
    ["Ewa Dąbrowska", tx("Billing, refunds, support policy", "Faktury, zwroty, polityka wsparcia"), "76"],
    ["Jakub Lewandowski", tx("Pricing, contracts, security reviews", "Cennik, umowy, przeglądy bezpieczeństwa"), "54"]
  ];
  h += '<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">';
  experts.forEach(function (e) {
    h += '<div class="card card-hover pad stack gap3"><div class="row gap3">' + avatar(e[0], "lg") + '<div><div style="font-size:14px;font-weight:600">' + e[0] + '</div><div class="t3" style="font-size:12px">' + e[2] + ' ' + tx("answers", "odpowiedzi") + '</div></div></div><p class="muted" style="font-size:12.5px">' + tx("Knows about: ", "Wie o: ") + e[1] + '</p><button class="btn sm sec" data-fake>' + svg("chat") + tx("Ask ", "Zapytaj ") + e[0].split(" ")[0] + '</button></div>';
  });
  h += '</div>' + joinbar() + '</div>';
  return h;
};
/* CLIENTS */
VIEWS.clients = function () {
  var h = '<div class="screen fade">' + phead(tx("Clients", "Klienci"), tx("Give clients a scoped, read-only view of exactly what you choose to share.", "Daj klientom ograniczony, tylko-do-odczytu widok dokładnie tego, co udostępnisz."), '<button class="btn primary" data-fake>' + svg("plus") + tx("Invite client", "Zaproś klienta") + '</button>');
  var clients = [
    ["Acme Corp", "Robert Kowal", tx("Pilot · 60 seats", "Pilotaż · 60 miejsc"), tx("Onboarding plan, security packet", "Plan wdrożenia, pakiet bezpieczeństwa"), "ok"],
    ["Globex", "Sarah Miller", tx("Prospect", "Potencjalny"), tx("Pricing, demo notes", "Cennik, notatki z demo"), "warn"],
    ["Initech", "Bill Lumbergh", tx("Prospect", "Potencjalny"), tx("Widget only", "Tylko widget"), "warn"]
  ];
  h += '<div class="stack gap2" style="max-width:960px">';
  clients.forEach(function (c) {
    h += '<div class="card row gap3" style="padding:13px 15px"><span class="icosq acc" style="width:38px;height:38px">' + svg("briefcase") + '</span><div style="flex:1;min-width:0"><div class="row gap2"><b style="font-size:14px">' + c[0] + '</b><span class="badge ' + c[4] + '">' + c[2] + '</span></div><div class="t3" style="font-size:12px;margin-top:2px">' + c[1] + ' · ' + tx("shared: ", "udostępniono: ") + c[3] + '</div></div><button class="btn sm sec" data-fake>' + svg("eye") + tx("Manage access", "Zarządzaj dostępem") + '</button></div>';
  });
  h += '</div>' + joinbar() + '</div>';
  return h;
};
/* WIDGET SETTINGS */
VIEWS.widget = function () {
  var h = '<div class="screen fade">' + phead(tx("Widget settings", "Ustawienia widgetu"), tx("An embeddable assistant that answers your website visitors from your public knowledge.", "Osadzalny asystent, który odpowiada odwiedzającym stronę na podstawie Twojej publicznej wiedzy."), '');
  h += '<div class="grid" style="grid-template-columns:1fr 1fr">';
  h += '<div class="card pad stack gap4"><div class="eyebrow">' + tx("Appearance", "Wygląd") + '</div>' +
    '<label style="font-size:13px">' + tx("Greeting", "Powitanie") + '<input class="inp" style="margin-top:6px" value="' + esc(tx("Hi! Ask me anything about Demo Company.", "Cześć! Zapytaj mnie o Demo Company.")) + '"></label>' +
    '<div class="row gap2"><span style="font-size:13px">' + tx("Accent", "Akcent") + '</span><span class="dot" style="width:22px;height:22px;background:var(--accent)"></span><span class="dot" style="width:22px;height:22px;background:#2563eb"></span><span class="dot" style="width:22px;height:22px;background:#db2777"></span></div>' +
    '<div><div class="eyebrow" style="margin-bottom:8px">' + tx("Embed code", "Kod osadzania") + '</div><div style="border:1px solid var(--border);background:var(--surface-2);border-radius:9px;padding:11px;font-family:ui-monospace,monospace;font-size:11.5px;color:var(--text-2)">&lt;script src="app.certemis.com/embed.js" data-ws="demo-company"&gt;&lt;/script&gt;</div></div></div>';
  h += '<div class="card pad"><div class="eyebrow" style="margin-bottom:12px">' + tx("Live preview", "Podgląd na żywo") + '</div><div style="border:1px solid var(--border);border-radius:14px;padding:16px;background:var(--surface-2);min-height:260px" class="stack gap3"><div class="row gap2"><span class="icosq acc" style="width:30px;height:30px">' + svg("chat") + '</span><b style="font-size:13px">Demo Company</b></div><div class="cbub them" style="max-width:90%">' + tx("Hi! Ask me anything about Demo Company.", "Cześć! Zapytaj mnie o Demo Company.") + '</div><div class="cbub me" style="max-width:90%;align-self:flex-end">' + tx("Do you support SSO?", "Wspieracie SSO?") + '</div><div class="cbub them" style="max-width:90%">' + tx("Yes — SAML & Google SSO on Team and Enterprise plans.", "Tak — SAML i Google SSO w planach Team i Enterprise.") + '</div></div></div>';
  h += '</div>' + joinbar() + '</div>';
  return h;
};
/* WIDGET STATS */
VIEWS.wstat = function () {
  var h = '<div class="screen fade">' + phead(tx("Widget stats", "Statystyki widgetu"), tx("How your website assistant is performing over the last 30 days.", "Jak radzi sobie asystent na stronie w ostatnich 30 dniach."), '');
  h += '<div class="tiles" style="margin-bottom:20px">';
  [["214", tx("Conversations", "Rozmowy"), "+18%"], ["92%", tx("Auto-resolved", "Auto-rozwiązane"), "+4pp"], ["11", tx("Leads captured", "Zebrane leady"), "+3"], ["4.6", tx("Avg. rating", "Śr. ocena"), "+0.2"]].forEach(function (s) {
    h += '<div class="tile"><div class="tv tnum">' + s[0] + '</div><div class="tl">' + s[1] + '</div><div class="td up">▲ ' + s[2] + '</div></div>';
  });
  h += '</div>';
  h += '<div class="card pad"><div class="eyebrow" style="margin-bottom:14px">' + tx("Conversations per day", "Rozmowy dziennie") + '</div><div style="display:flex;align-items:flex-end;gap:6px;height:150px">';
  [40, 55, 48, 70, 62, 80, 58, 90, 72, 66, 85, 95, 78, 88].forEach(function (v) { h += '<div style="flex:1;background:var(--accent-soft);border-radius:6px 6px 0 0;height:' + v + '%;position:relative"><div style="position:absolute;inset:auto 0 0;height:' + Math.round(v * 0.55) + '%;background:var(--accent);border-radius:6px 6px 0 0"></div></div>'; });
  h += '</div></div>' + joinbar() + '</div>';
  return h;
};
/* LEADS */
VIEWS.leady = function () {
  var h = '<div class="screen fade">' + phead(tx("Leads", "Leady"), tx("People who talked to your widget and left contact details or asked to be reached.", "Osoby, które rozmawiały z widgetem i zostawiły kontakt lub poprosiły o kontakt."), '');
  var leads = [
    ["Sarah Miller", "Globex", tx("Pricing for 25 seats", "Cennik dla 25 miejsc"), "2h", "warn"],
    ["Bill Lumbergh", "Initech", tx("SSO question", "Pytanie o SSO"), "6h", "warn"],
    ["Robert Kowal", "Acme Corp", tx("Demo requested", "Prośba o demo"), tx("yest.", "wcz."), "ok"],
    ["Dana White", "Umbrella", tx("Data residency", "Rezydencja danych"), "2d", "neutral"]
  ];
  h += '<div class="card" style="overflow:hidden;max-width:960px"><div class="divlist">';
  leads.forEach(function (l) {
    h += '<div class="lrow" data-fake style="border-radius:0;padding:12px 15px">' + avatar(l[0], "sm") + '<div style="flex:1;min-width:0"><div class="lt">' + l[0] + ' <span class="t3" style="font-weight:400">· ' + l[1] + '</span></div><div class="ld trunc">' + l[2] + '</div></div><span class="badge ' + l[4] + '">' + (l[4] === "ok" ? tx("Hot", "Gorący") : l[4] === "warn" ? tx("New", "Nowy") : tx("Cold", "Zimny")) + '</span><span class="rt">' + l[3] + '</span></div>';
  });
  h += '</div></div>' + joinbar() + '</div>';
  return h;
};

/* ── router ───────────────────────────────────────────────────────────── */
function go(view) { VIEW = view; expandParentOf(view); render(); try { $("main").scrollTo(0, 0); } catch (e) {} }
function render() {
  renderNav();
  var fn = VIEWS[VIEW] || VIEWS.start;
  $("main").innerHTML = fn();
  $("main").querySelectorAll("[data-goto]").forEach(function (b) { b.onclick = function () { go(b.getAttribute("data-goto")); }; });
  $("main").querySelectorAll("[data-thread]").forEach(function (b) { b.onclick = function () { CUR_THREAD = b.getAttribute("data-thread"); render(); }; });
  $("main").querySelectorAll("[data-ch]").forEach(function (b) { b.onclick = function () { CUR_CH = b.getAttribute("data-ch"); render(); }; });
  $("main").querySelectorAll("[data-fake]").forEach(function (b) {
    b.addEventListener(b.tagName === "FORM" ? "submit" : "click", function (e) { e.preventDefault(); demoNudge(); });
  });
  var j2 = $("joinCta2"); if (j2) j2.onclick = openWaitlist;
}

/* ── topbar interactions ──────────────────────────────────────────────── */
var nudged = 0;
function demoNudge() {
  toast(tx("This is a demo — actions are disabled.", "To demo — akcje są wyłączone."));
  if (++nudged % 3 === 0) setTimeout(openWaitlist, 500);
}
function toast(msg) { var el = $("toast"); el.innerHTML = svg("spark") + esc(msg); el.classList.add("on"); clearTimeout(toast._t); toast._t = setTimeout(function () { el.classList.remove("on"); }, 2600); }
function openModal(html) { $("modal").innerHTML = html; $("mask").classList.add("on"); }
function closeModal() { $("mask").classList.remove("on"); }
function openWaitlist() {
  openModal('<div class="modal-h"><div><div class="mt">' + t("wl.title") + '</div><div class="md">' + t("wl.desc") + '</div></div><div class="x" id="wx">✕</div></div>' +
    '<div class="waitlist-hero"><div class="row gap2"><span class="icosq acc" style="width:32px;height:32px">' + svg("spark") + '</span><b style="font-size:13px">' + tx("You just saw the demo. Get this for your team.", "Właśnie zobaczyłeś demo. Zdobądź to dla zespołu.") + '</b></div></div>' +
    '<div class="modal-b stack gap3" style="margin-top:14px"><label style="font-size:12.5px;font-weight:500">' + t("wl.email") + '<input class="inp" style="margin-top:5px" placeholder="you@company.com"></label>' +
    '<label style="font-size:12.5px;font-weight:500">' + t("wl.company") + '<input class="inp" style="margin-top:5px" placeholder="' + esc(tx("Your company", "Twoja firma")) + '"></label></div>' +
    '<div class="modal-f"><button class="btn ghost" id="wlCancel">' + t("cancel") + '</button><button class="btn primary" id="wlSend">' + svg("arrow") + t("wl.submit") + '</button></div>');
  $("wx").onclick = closeModal; $("wlCancel").onclick = closeModal;
  $("wlSend").onclick = function () { closeModal(); toast(t("wl.done")); };
}
function applyLang() {
  document.documentElement.lang = LANG;
  $("langLabel").textContent = LANG.toUpperCase();
  document.querySelectorAll("[data-i18n]").forEach(function (n) { n.textContent = t(n.getAttribute("data-i18n")); });
  $("langDD").querySelectorAll(".dd-opt").forEach(function (o) { o.classList.toggle("sel", o.getAttribute("data-lang") === LANG); });
  render();
}
function applyTheme() {
  document.documentElement.classList.toggle("dark", THEME === "dark");
  $("themeIcon").innerHTML = THEME === "dark"
    ? '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'
    : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
}
function closeMob() { $("sidebar").classList.remove("open"); $("scrim").classList.remove("on"); }

function bellItems() {
  var items = [
    ["reply", tx("Robert (Acme) is awaiting your reply", "Robert (Acme) czeka na odpowiedź"), tx("about data residency", "o rezydencję danych"), "20m", "err"],
    ["github", tx("PR #412 merged by Piotr", "PR #412 scalony przez Piotra"), "auth: remove legacy flow", "1h", "acc"],
    ["flag", tx("Onboarding step overdue", "Zaległy krok wdrożenia"), tx("Connect Jira", "Podłącz Jira"), "1d", "warn"]
  ];
  var h = '<div class="dd-head"><span>' + tx("Notifications", "Powiadomienia") + '</span><span style="color:var(--accent);font-size:12px;cursor:pointer">' + tx("Mark all read", "Oznacz przeczytane") + '</span></div>';
  items.forEach(function (i) {
    var ic = IP[i[0]] ? svg(i[0]) : logo(i[0]);
    var bg = i[4] === "err" ? "background:var(--danger-soft);color:var(--danger)" : i[4] === "warn" ? "background:var(--warning-soft);color:var(--warning)" : "background:var(--accent-soft);color:var(--accent)";
    h += '<div class="dd-item" data-nudge><div class="dd-ic" style="' + bg + '">' + ic + '</div><div style="flex:1"><div class="dd-t">' + i[1] + '</div><div class="dd-d">' + i[2] + '</div><div class="dd-time">' + i[3] + '</div></div></div>';
  });
  return h;
}
function wireBell() { $("bellDD").querySelectorAll("[data-nudge]").forEach(function (n) { n.onclick = function () { $("bellDD").classList.remove("on"); go("mailbox"); }; }); }

function init() {
  applyTheme();
  $("langLabel").textContent = LANG.toUpperCase();
  $("bellDD").innerHTML = bellItems();
  document.querySelectorAll("[data-i18n]").forEach(function (n) { n.textContent = t(n.getAttribute("data-i18n")); });
  $("langDD").querySelectorAll(".dd-opt").forEach(function (o) { o.classList.toggle("sel", o.getAttribute("data-lang") === LANG); });
  render();

  $("themeBtn").onclick = function () { THEME = THEME === "dark" ? "light" : "dark"; localStorage.setItem("certemis_demo_theme", THEME); applyTheme(); };
  $("langBtn").onclick = function (e) { e.stopPropagation(); $("langDD").classList.toggle("on"); $("bellDD").classList.remove("on"); };
  $("langDD").querySelectorAll(".dd-opt").forEach(function (o) { o.onclick = function () { LANG = o.getAttribute("data-lang"); localStorage.setItem("certemis_lang", LANG); $("langDD").classList.remove("on"); $("bellDD").innerHTML = bellItems(); wireBell(); applyLang(); }; });
  $("bellBtn").onclick = function (e) { e.stopPropagation(); $("bellDD").classList.toggle("on"); $("langDD").classList.remove("on"); };
  wireBell();
  $("paletteBtn").onclick = function () { toast(tx("Command palette — try it in the real app.", "Paleta poleceń — wypróbuj w aplikacji.")); };
  $("topJoin").onclick = function (e) { e.preventDefault(); openWaitlist(); };
  $("mobMenu").onclick = function () { $("sidebar").classList.toggle("open"); $("scrim").classList.toggle("on"); };
  $("scrim").onclick = closeMob;
  document.addEventListener("click", function () { $("langDD").classList.remove("on"); $("bellDD").classList.remove("on"); });
  document.addEventListener("keydown", function (e) { if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) { e.preventDefault(); $("paletteBtn").click(); } });
  $("mask").onclick = function (e) { if (e.target === $("mask")) closeModal(); };
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
