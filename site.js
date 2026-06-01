(function () {
  "use strict";

  // Signal JS is active so CSS can enable motion (page fade, reveal blur) — set ASAP to avoid a flash.
  document.documentElement.classList.add("js-ready");

  // Reveal the body (fade-in) independently of all other logic, so a failure elsewhere can never
  // leave the page stuck at opacity:0. Under reduced motion CSS keeps the body visible anyway.
  (function revealBody() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    function show() { if (document.body) requestAnimationFrame(function () { document.body.classList.add("page-in"); }); }
    if (document.readyState !== "loading") show();
    else document.addEventListener("DOMContentLoaded", show);
    window.addEventListener("load", show); // failsafe if DOMContentLoaded was missed
  })();

  var I18N = {
    en: {
      "nav.about": "About",
      "nav.product": "Product",
      "nav.usecases": "Use cases",
      "nav.pricing": "Pricing",
      "nav.how": "How it works",
      "nav.early": "Early access",
      "nav.security": "Security",
      "nav.cta": "Join the waitlist",

      "foot.tag": "The operational memory layer for companies. Knowledge that stays in the business - not in people's heads.",
      "foot.h.nav": "Navigate",
      "foot.h.contact": "Contact",
      "foot.rights": "Certemis - Operational Memory Layer for Companies.",

      "home.kicker": "Operational memory layer",
      "home.h1": "Your company's <span class=\"accent\">memory</span>, kept where it belongs.",
      "home.lead": "Certemis is the operational memory layer for companies. It captures how your business actually works — the decisions, context and know-how that normally live only in people's heads — and gives it back to your team the moment they need it.",
      "home.btn1": "Join the waitlist",
      "home.btn2": "How it works",
      "home.note": "Currently in private early access — we're onboarding a first group of founding teams.",
      "g.docs": "Docs", "g.slack": "Slack", "g.repos": "Repos",
      "g.decisions": "Decisions", "g.tickets": "Tickets", "g.wiki": "Wiki",

      "home.s.kicker": "The problem",
      "home.s.h2": "Most of what your company knows is never written down.",
      "home.s.p": "It lives in conversations, inboxes and the heads of a few experienced people. The day they're unavailable — on holiday, between projects, or gone for good — recovering that context costs real time and invites expensive mistakes.",
      "home.stat1cap": "longer to get someone productive when the answer lives in a colleague, not a system.",
      "home.stat2cap": "of experienced people's time lost to questions that were already answered once.",
      "home.stat3cap": "of a project's context can walk out with a single person.",
      "home.stat.note": "Illustrative figures — to be validated with customers.",

      "home.t.kicker": "What Certemis is",
      "home.t.h2": "A memory that stays, even when people move on.",
      "home.t.p": "Not another wiki to write and maintain. Certemis captures context from the tools you already use and turns it into answers — current, in plain language, and limited to what each person is allowed to see.",
      "home.t.btn": "Explore the product",

      "aud.kicker": "Who it's for",
      "aud.h2": "Built for any company where knowledge lives in people, not systems.",
      "aud.1t": "Knowledge that lives in heads", "aud.1p": "When 'how we do this' is something only a few people can answer, every absence becomes a bottleneck. Certemis makes that knowledge available to everyone who's allowed to see it.",
      "aud.2t": "Teams that grow and change", "aud.2p": "New people, departures and reshuffles all erode context. Certemis keeps it in the company, so onboarding is faster and nothing critical leaves with a person.",
      "aud.3t": "Work spread across many fronts", "aud.3p": "Across many projects, clients or products the details blur - what was decided, what was promised, and why. Certemis keeps each thread's context in one place you can simply ask.",

      "int.kicker": "Designed to connect with",
      "int.h2": "Your knowledge, wherever it already lives.",
      "int.p": "Certemis is designed to connect with the tools your team already works in, so your knowledge becomes useful without anyone moving or rewriting it.",
      "int.1t": "Code & repos", "int.1s": "GitHub, GitLab",
      "int.2t": "Team chat", "int.2s": "Slack, Teams",
      "int.3t": "Docs & drives", "int.3s": "Google Drive, Notion",
      "int.4t": "Wikis", "int.4s": "Confluence, Notion",
      "int.5t": "Tickets", "int.5s": "Jira, Linear",
      "int.6t": "Decisions", "int.6s": "Threads, records",
      "int.note": "Integrations shown are planned connectors; availability rolls out during early access.",

      "exp.kicker": "Explore",
      "exp.h2": "Go deeper into Certemis.",
      "exp.1t": "Use cases", "exp.1p": "Where memory earns its keep.",
      "exp.2t": "Security", "exp.2p": "How we protect your knowledge.",
      "exp.3t": "Pricing", "exp.3p": "Plans that grow with your team.",

      "cmp.kicker": "Not another wiki",
      "cmp.h2": "The difference is who keeps it up to date.",
      "cmp.old.h": "The manual way", "cmp.new.h": "With Certemis",
      "cmp.o1": "Someone has to write and update every page.",
      "cmp.o2": "Answers live in five chats - often conflicting.",
      "cmp.o3": "When a senior leaves, the context leaves too.",
      "cmp.n1": "Context is captured automatically as work happens.",
      "cmp.n2": "One current answer, scoped to your permissions.",
      "cmp.n3": "Knowledge stays in the company, not in heads.",

      "term.kicker": "In practice",
      "term.h2": "Ask a question. Get the answer your company already knows.",
      "term.title": "certemis — ask",
      "term.q": "Why did we drop the legacy auth flow?",
      "term.a": "// Pulled from the decision record and the discussion that led to it — scoped to your access.",
      "hero.q": "How do we deploy the billing service?",
      "hero.ans1": "Deploy through the staging pipeline,",
      "hero.ans2": "then promote once checks are green.",
      "hero.ansmeta": "Assembled from your repos, decisions and docs",

      "prod.kicker": "Product",
      "prod.h1": "One place to ask anything your company already figured out.",
      "prod.p": "Certemis pulls the operational knowledge scattered across your tools and your people into one layer your whole team can ask in plain language — and it only ever shows each person what they're allowed to see.",
      "prod.f.h2": "What you get.",
      "f1.t": "Onboarding without the bottleneck", "f1.p": "New people get answers from the system instead of interrupting your most experienced ones. They become useful in days, not weeks — and your seniors stay on real work.",
      "f2.t": "Continuity when people move", "f2.p": "The reasoning behind decisions and the history of a project stay in the company, so a departure or a long holiday no longer resets the team.",
      "f3.t": "One answer, not five", "f3.p": "'How do we do this?' returns a single current answer — instead of five half-right versions scattered across chats and inboxes.",
      "f4.t": "EU-first and private", "f4.p": "EU data residency, GDPR-ready, a Data Processing Agreement with every customer, and a contractual promise we never train models on your data.",
      "f5.t": "Your permissions, respected", "f5.p": "Role-based access means the answer someone gets is always scoped to what they're actually allowed to see — nothing leaks across boundaries.",
      "f6.t": "Low maintenance by design", "f6.p": "Certemis captures context from the work as it happens, so it stays current without the constant upkeep a wiki demands.",
      "prod.sec.kicker": "Security",
      "prod.sec.h2": "Your knowledge, treated as your most sensitive asset.",
      "prod.sec.p": "Encryption in transit and at rest, strict tenant isolation, EU data residency, a Data Processing Agreement with every customer, and a clear contractual commitment that your data is never used to train models.",
      "prod.cta": "Request early access",

      "how.kicker": "How it works",
      "how.h1": "Connected in an afternoon. Useful the same day.",
      "how.p": "Four steps from scattered knowledge to a memory your whole team can simply ask.",
      "s1.t": "Connect your sources", "s1.p": "Point Certemis at the tools where your knowledge already lives. You decide exactly what it can read — and what it must never touch.",
      "s2.t": "It organises everything for you", "s2.p": "Certemis reads and structures the context in the background — no manual tagging, no busywork, nothing for your team to maintain.",
      "s3.t": "Your team just asks", "s3.p": "Anyone asks in plain language and gets a clear answer — always limited to what they're allowed to see.",
      "s4.t": "It gets smarter as you work", "s4.p": "As work happens the memory keeps growing — so the company gets sharper over time instead of forgetting.",
      "how.cta.h2": "Be one of the first teams to run on Certemis.",
      "how.cta.btn": "Join the waitlist",

      "about.kicker": "About Certemis",
      "about.h1": "Your company's knowledge shouldn't leave when people do.",
      "about.p": "Certemis is building the operational memory layer for companies whose real advantage lives in what their people know. We're early, focused, and building alongside the teams who feel the problem most.",
      "about.mission.kicker": "Our mission",
      "about.mission.h": "Make a company's knowledge outlast the people who hold it.",
      "about.mission.p": "Every company loses context when someone leaves, takes a break, or simply forgets. That loss is quiet, constant and expensive — and no wiki has truly solved it, because wikis depend on people remembering to write everything down. We're building a memory a company actually keeps: one that remembers how the work is done and gives it back the moment anyone needs it.",
      "about.values.kicker": "What we believe",
      "about.values.h": "The principles behind how we build.",
      "about.v1t": "Knowledge belongs to the company",
      "about.v1p": "Context shouldn't live or die with individuals. We build so the things a team learns stay with the business — available, current, and never locked in one person's head.",
      "about.v2t": "Privacy is not a feature",
      "about.v2p": "Your knowledge is your most sensitive asset, so we treat it that way from day one — EU-first, permission-aware, and never used to train models on your data.",
      "about.v3t": "Useful beats impressive",
      "about.v3p": "We'd rather earn trust with something that quietly works than ship a demo that dazzles once. Every decision is measured against whether it helps real teams do real work.",
      "about.why.kicker": "Why now",
      "about.why.h": "Why operational memory, and why now.",
      "about.why.p": "Teams have never produced more context — across repos, chats, docs and decisions — and never had a harder time holding onto it. Tools that can finally read and connect that context in plain language only became practical recently. We think it's the right moment to build memory designed to capture how a company works as the work happens, instead of asking people to write it all down after the fact.",
      "about.cta.h": "We're building Certemis with our earliest teams.",
      "about.cta.btn": "Join the waitlist",

      "price.kicker": "Pricing",
      "price.h1": "Pricing that scales with your team, not against it.",
      "price.p": "Every plan includes EU data residency, a DPA, and permission-aware access — and we never train models on your data.",
      "price.per": "/mo",
      "price.custom": "Custom",
      "price.popular": "Most popular",
      "price.s.desc": "For small teams putting their first knowledge into one place.",
      "price.s.f1": "Up to 30 people",
      "price.s.f2": "1 integration",
      "price.s.f3": "1,000 queries / mo",
      "price.s.f4": "Basic RBAC",
      "price.s.f5": "DPA & EU data residency",
      "price.s.f6": "Email support",
      "price.s.cta": "Get started",
      "price.g.desc": "For growing teams that need more sources and more answers.",
      "price.g.f1": "Up to 80 people",
      "price.g.f2": "Up to 3 integrations",
      "price.g.f3": "5,000 queries / mo",
      "price.g.f4": "Full RBAC",
      "price.g.f5": "DPA & EU data residency",
      "price.g.f6": "Priority support",
      "price.g.cta": "Start with Growth",
      "price.sc.desc": "For larger organisations standardising on one memory layer.",
      "price.sc.f1": "Up to 150 people",
      "price.sc.f2": "Unlimited integrations",
      "price.sc.f3": "20,000 queries / mo",
      "price.sc.f4": "Full RBAC + teams",
      "price.sc.f5": "SSO / SAML",
      "price.sc.f6": "Priority + Slack support",
      "price.sc.cta": "Choose Scale",
      "price.e.desc": "For groups and regulated environments with bespoke needs.",
      "price.e.f1": "150+ people / multiple entities",
      "price.e.f2": "Custom integrations",
      "price.e.f3": "Limits by agreement",
      "price.e.f4": "SSO / SAML + audit log",
      "price.e.f5": "Dedicated data residency",
      "price.e.f6": "SLA + dedicated contact",
      "price.e.cta": "Contact us",
      "price.note": "Prices in EUR, billed monthly. <a href=\"early-access.html\">Founding members get 50% off for life.</a>",
      "price.faq.kicker": "Questions",
      "price.faq.h2": "Pricing, answered",
      "price.q1": "Can I change plan later?",
      "price.a1": "Yes. You can move up or down at any time, and the change applies from your next billing cycle - no penalty for switching as your team grows or your needs change.",
      "price.q2": "What counts as a query, and is there fair use?",
      "price.a2": "A query is one question your team asks Certemis and gets an answer to. Monthly limits keep pricing predictable; if you approach your limit we flag it early and help you pick the right plan, rather than cutting you off mid-month.",
      "price.q3": "How does the founding-member discount work?",
      "price.a3": "The first 20 customers who join from the waitlist lock in 50% off these prices for as long as their subscription stays active. Apply for early access to claim it before launch.",
      "price.cta.h": "Lock in founding-member pricing before launch.",
      "price.cta.btn": "Join the waitlist",
      "roi.kicker": "ROI calculator",
      "roi.h2": "See what forgetting costs — and what Certemis could recover.",
      "roi.p": "Move the sliders to estimate the time and money lost to scattered knowledge.",
      "roi.employees": "Employees",
      "roi.hours": "Hours/week each person loses finding answers",
      "roi.rate": "Average hourly cost (gross)",
      "roi.hires": "New hires per year",
      "roi.ramp": "Days to full productivity for a new hire",
      "roi.recover": "How much Certemis realistically recovers",
      "roi.rec.cons": "conservative", "roi.rec.real": "realistic", "roi.rec.opt": "optimistic",
      "roi.res.main": "Certemis could recover",
      "roi.res.peryear": "per year",
      "roi.res.search": "lost to searching / month",
      "roi.res.total": "total lost / year",
      "roi.res.onb": "onboarding cost / year",
      "roi.disclaimer": "An automated estimate based on industry averages. Actual results vary by team, tools and how knowledge is shared.",
      "roi.cta": "Join the waitlist",

      "uc.kicker": "Use cases",
      "uc.h1": "The moments where knowledge quietly slips away.",
      "uc.p": "Four everyday situations where context goes missing — and how Certemis is built to hold onto it.",
      "uc.a.kicker": "Onboarding",
      "uc.a.h": "New people shouldn't have to interrupt someone to begin.",
      "uc.a.p1": "A newcomer's first weeks run on borrowed time. Setup steps, project quirks and 'who knows about this' all live in a few people's heads — so getting started means pulling your most experienced people off real work to answer the same questions again.",
      "uc.a.p2": "With Certemis a new hire asks the system and gets an answer drawn from your repos, docs and past decisions — limited to what they're allowed to see. They find their footing without waiting for a free moment.",
      "uc.a.b1": "Productive in days, not weeks",
      "uc.a.b2": "Fewer repeat questions for your seniors",
      "uc.a.b3": "Every answer scoped to their access",
      "uc.a.stat": "The median time for a new hire to reach full productivity is about 65 days. Certemis cuts the part spent hunting for answers.",
      "uc.b.kicker": "Absences & departures",
      "uc.b.h": "When someone's away, the work shouldn't stall.",
      "uc.b.p1": "Holidays arrive, notice periods are short, and the reasoning behind a decision usually leaves with the person who made it. The rest of the team is left reconstructing 'why did we do it this way' from scattered threads.",
      "uc.b.p2": "Because Certemis captures context as the work happens, it stays in the company. When someone is away or moves on, the team can still ask what was decided and why — and keep moving.",
      "uc.b.b1": "Decisions kept independent of any one person",
      "uc.b.b2": "Cover through holidays and handovers",
      "uc.b.b3": "Less lost with every departure",
      "uc.b.stat": "47% of organisations name lost institutional knowledge as their top offboarding challenge. Certemis keeps that knowledge in the business.",
      "uc.c.kicker": "Client & project context",
      "uc.c.h": "Stop waiting on the one person who remembers.",
      "uc.c.p1": "Across many projects and clients the details blur — what was promised, which approach was chosen, why a request was turned down. When that context lives with one lead, everyone else is blocked until they're free.",
      "uc.c.p2": "Certemis keeps each project's commitments, history and specifics in one place your team can simply ask — so answers come back in seconds, with the context attached.",
      "uc.c.b1": "Commitments and history in one place",
      "uc.c.b2": "Answers without chasing a colleague",
      "uc.c.b3": "Context follows the project, not the person",
      "uc.c.stat": "When project context lives with one person, everyone else waits. Certemis makes it answerable in seconds.",
      "uc.d.kicker": "One source of truth",
      "uc.d.h": "One current answer — not five half-right ones.",
      "uc.d.p1": "The same question gets asked in five chats and gets five slightly different answers, some out of date. People act on whichever they find first, and small inconsistencies quietly turn into real rework.",
      "uc.d.p2": "Certemis gives one current, permission-aware answer to 'how do we do this here' — assembled from where your knowledge actually lives, and kept current as the work evolves.",
      "uc.d.b1": "One answer instead of conflicting copies",
      "uc.d.b2": "Less rework from stale information",
      "uc.d.b3": "The same answer for everyone, within their access",
      "uc.d.stat": "Up to half of new hires can leave within 90 days; inconsistent answers and slow ramp-up are part of why. One current answer helps.",
      "uc.s.kicker": "The cost of forgetting",
      "uc.s.h2": "Lost knowledge is expensive — and measurable.",
      "uc.s.m1": "~65 days", "uc.s.m1c": "median time to full productivity for a new hire",
      "uc.s.m2": "47%", "uc.s.m2c": "name lost institutional knowledge their top offboarding challenge",
      "uc.s.m3": "$7.5k–28k", "uc.s.m3c": "estimated true cost to onboard one new hire",
      "uc.s.src": "Sources: <a href='https://docustream.ai/employee-onboarding-statistics' target='_blank' rel='noopener noreferrer'>Docustream (2025)</a>, <a href='https://speakwiseapp.com/blog/employee-onboarding-statistics' target='_blank' rel='noopener noreferrer'>Speakwise (2026)</a>.",
      "uc.cta.h": "See where Certemis would fit your team.",
      "uc.cta.btn": "Join the waitlist",

      "sec.kicker": "Security",
      "sec.h1": "Built to be trusted with your most sensitive knowledge.",
      "sec.p": "Certemis is designed around a simple principle: your operational knowledge is your most sensitive asset, so it's protected like one - from the first integration onward.",
      "sec.how.kicker": "How we protect your data",
      "sec.how.h": "Security built into the foundations, not bolted on.",
      "sec.f1t": "Encryption everywhere",
      "sec.f1p": "Data is encrypted in transit with TLS and encrypted at rest, so it's protected both on the wire and on disk.",
      "sec.f2t": "Tenant isolation",
      "sec.f2p": "Each customer's data is logically isolated, so one organisation's knowledge is never visible to another.",
      "sec.f3t": "EU data residency",
      "sec.f3p": "Your data is stored and processed in the EU, in line with GDPR - EU-first by design, not as an afterthought.",
      "sec.f4t": "Permission-aware access",
      "sec.f4p": "Role-based access control and least-privilege defaults keep answers scoped to each person; SSO/SAML is available on higher plans.",
      "sec.f5t": "No training on your data",
      "sec.f5p": "Your data is never used to train models - a clear contractual commitment, not a setting you have to go and find.",
      "sec.f6t": "Audit & logging",
      "sec.f6p": "Access and activity are logged - who asked what, and when - so you have a clear trail for review and accountability.",
      "sec.ctrl.kicker": "Your data, your control",
      "sec.ctrl.h": "You decide what Certemis sees - and what it never touches.",
      "sec.ctrl.1": "You choose exactly which sources Certemis connects to, and what stays off-limits.",
      "sec.ctrl.2": "Data can be deleted on request, and is removed when you stop using Certemis.",
      "sec.ctrl.3": "A Data Processing Agreement (DPA) is available with every customer.",
      "sec.comp.kicker": "Compliance & roadmap",
      "sec.comp.h": "Where we are on compliance - honestly.",
      "sec.comp.p": "Certemis is EU-first and GDPR-ready, and we sign a DPA with every customer. Formal certifications such as SOC 2 and ISO 27001 are on our roadmap rather than in place today - and we'd rather tell you that plainly than imply otherwise.",
      "sec.comp.contact": "Need our full security overview or a DPA? Email hello@certemis.com and we'll share what you need.",
      "sec.faq.kicker": "Questions",
      "sec.faq.h2": "Security, answered",
      "sec.q1": "Where is our data stored?",
      "sec.a1": "In the EU. Data is stored and processed within the European Union, in line with GDPR, with encryption in transit and at rest.",
      "sec.q2": "Do you train models on our data?",
      "sec.a2": "No. Your data is never used to train models. This is a contractual commitment we make to every customer, not an option buried in settings.",
      "sec.q3": "What happens to our data after the contract ends?",
      "sec.a3": "When your subscription ends, your data can be exported and is then deleted. Deletion is also available on request at any time while you're a customer.",
      "sec.cta.h": "Security-conscious teams are exactly who we build for.",
      "sec.cta.btn": "Join the waitlist",

      "ea.kicker": "Early access",
      "ea.h1": "Founding members: first 20 customers, 50% off for life.",
      "ea.p": "We're opening a limited founding cohort. Tell us about your team and lock in the founding-member price at launch.",
      "ea.ribbon": "Founding offer - 20 spots only",
      "ea.price.ctx": "on the standard price",
      "ea.price.sub": "A lifetime discount for the first 20 customers - held for as long as your subscription stays active.",
      "ea.term1": "<b>50% off for life</b> - applies the entire time you remain a customer.",
      "ea.term2": "Reserved for the <b>first 20 customers</b> who join from the waitlist.",
      "ea.term3": "Open <b>only to waitlist members</b> - apply below to be eligible.",
      "ea.term4": "Held with <b>continuous subscription</b>. If it lapses, the founding price ends.",
      "ea.meta.l": "Founding cohort filling up", "ea.meta.r": "20 spots",

      "ea.form.h3": "Apply for founding access",
      "ea.form.sub": "Tell us a little about your company so we can tailor your early access.",
      "l.name": "Full name", "l.email": "Work email", "l.company": "Company",
      "l.website": "Company website", "l.country": "Country", "l.size": "Company size",
      "l.role": "Your role", "l.needs": "What would you want Certemis to solve?",
      "ph.name": "Jane Kowalski", "ph.email": "you@company.com", "ph.company": "Company name",
      "ph.website": "company.com", "ph.country": "Start typing your country…", "ph.role": "e.g. CTO, Head of Engineering",
      "ph.needs": "Onboarding speed, knowledge loss when people leave, scattered context...",
      "opt.choose": "Select...",
      "size.1": "1-29 people", "size.2": "30-80 people", "size.3": "81-150 people", "size.4": "150+ people",
      "c.pl": "Poland", "c.de": "Germany", "c.uk": "United Kingdom", "c.nl": "Netherlands",
      "c.fr": "France", "c.es": "Spain", "c.se": "Sweden", "c.other": "Other (EU / UK)",
      "ea.submit": "Apply for founding access",
      "ea.consent": "By applying you agree to receive launch updates from Certemis. Only product news and your founding-member offer - no spam, unsubscribe anytime.",
      "ea.faq.kicker": "Questions",
      "ea.faq.h2": "Good to know",
      "q1": "Is the product available now?", "a1": "Not yet. We're in private early access. Apply and you'll be notified the moment it goes live - applicants get first access to the founding-member offer.",
      "q2": "How does the 50%-for-life offer work?", "a2": "The first 20 customers who join from the waitlist lock in 50% off the standard price for the entire time they stay subscribed, as long as the subscription remains active without interruption.",
      "q3": "What if I pause or cancel?", "a3": "The founding discount is tied to continuous subscription. If it lapses, the founding price ends and standard pricing applies on return.",
      "q4": "Who is Certemis for?", "a4": "Any company where operational knowledge is critical and people come and go — wherever the answer to 'how do we do this?' shouldn't depend on one person being available.",
      "q5": "How is our data protected?", "a5": "EU data residency, GDPR-ready, a DPA with every customer, encryption in transit and at rest, strict tenant isolation, and no training of models on your data.",
      "msg.invalid": "Please enter a valid work email.",
      "msg.demo": "Thank you - your application is recorded. (Demo mode: connect a form endpoint to receive submissions.)",
      "msg.ok": "Thank you - your application is in. We'll be in touch as launch approaches.",
      "msg.err": "Something went wrong. Please email hello@certemis.com and we'll add you.",

      "nav.privacy": "Privacy",
      "priv.kicker": "Legal",
      "priv.h1": "Privacy &amp; data",
      "priv.p": "How we handle the information you share with us - in plain language. Last updated 1 June 2026.",
      "priv.note": "Certemis is being established as a company; this notice will be expanded with full legal details once incorporation is complete.",
      "priv.s1.h": "What we collect",
      "priv.s1.p": "When you apply for early access, we collect only the details you choose to share in the form: your name, work email, company, website, country, team size, role, and a short description of your needs. We don't track you across the web or buy data about you.",
      "priv.s2.h": "How we use it",
      "priv.s2.p": "We use your information for one purpose: to contact you about early access and to let you know when Certemis launches. We never sell or rent your personal data to third parties.",
      "priv.s3.h": "Where it goes",
      "priv.s3.p": "The early-access form is handled by Formspree, our form provider, and this site is hosted on Cloudflare. We keep your details only as long as we need them to stay in touch, and you can ask us to delete them at any time by emailing hello@certemis.com.",
      "priv.s4.h": "Cookies",
      "priv.s4.p": "This site uses no tracking or advertising cookies. Any analytics we run are anonymous and cookieless. Because nothing here requires consent, you won't see a cookie banner.",
      "priv.s5.h": "Your rights",
      "priv.s5.p": "You can ask us to access, correct, or delete the personal data you have shared with us - just email hello@certemis.com and we'll take care of it.",
      "priv.s6.h": "Contact",
      "priv.s6.p": "Questions about privacy or your data? Email us at hello@certemis.com."
    },
    pl: {
      "nav.about": "O nas",
      "nav.product": "Produkt",
      "nav.usecases": "Zastosowania",
      "nav.pricing": "Cennik",
      "nav.how": "Jak to działa",
      "nav.early": "Wczesny dostęp",
      "nav.security": "Bezpieczeństwo",
      "nav.cta": "Dołącz do listy",

      "foot.tag": "Warstwa pamięci operacyjnej dla firm. Wiedza, która zostaje w firmie — nie w głowach ludzi.",
      "foot.h.nav": "Nawigacja",
      "foot.h.contact": "Kontakt",
      "foot.rights": "Certemis — Warstwa Pamięci Operacyjnej dla Firm.",

      "home.kicker": "Warstwa pamięci operacyjnej",
      "home.h1": "<span class=\"accent\">Pamięć</span> Twojej firmy — tam, gdzie jej miejsce.",
      "home.lead": "Certemis to warstwa pamięci operacyjnej dla firm. Utrwala to, jak naprawdę działa Twoja firma — decyzje, kontekst i know-how, które zwykle żyją tylko w głowach ludzi — i oddaje je zespołowi dokładnie wtedy, gdy są potrzebne.",
      "home.btn1": "Dołącz do listy",
      "home.btn2": "Jak to działa",
      "home.note": "Obecnie w prywatnym wczesnym dostępie — wdrażamy pierwszą grupę zespołów founding.",
      "g.docs": "Dokumenty", "g.slack": "Slack", "g.repos": "Repozytoria",
      "g.decisions": "Decyzje", "g.tickets": "Zgłoszenia", "g.wiki": "Wiki",

      "home.s.kicker": "Problem",
      "home.s.h2": "Większość tego, co wie Twoja firma, nigdy nie zostaje zapisana.",
      "home.s.p": "Żyje w rozmowach, skrzynkach i głowach kilku doświadczonych osób. W dniu, gdy są niedostępni — na urlopie, między projektami albo gdy odejdą na dobre — odtworzenie tego kontekstu kosztuje realny czas i grozi kosztowną pomyłką.",
      "home.stat1cap": "dłużej, zanim ktoś staje się produktywny, gdy odpowiedź tkwi w koledze, a nie w systemie.",
      "home.stat2cap": "czasu doświadczonych osób ginie na pytania, na które raz już padła odpowiedź.",
      "home.stat3cap": "kontekstu projektu może odejść wraz z jedną osobą.",
      "home.stat.note": "Dane poglądowe — do walidacji z klientami.",

      "home.t.kicker": "Czym jest Certemis",
      "home.t.h2": "Pamięć, która zostaje — nawet gdy ludzie odchodzą.",
      "home.t.p": "To nie kolejne wiki do pisania i utrzymywania. Certemis zbiera kontekst z narzędzi, których już używasz, i zamienia go w odpowiedzi — aktualne, w naturalnym języku i ograniczone do tego, co dana osoba może zobaczyć.",
      "home.t.btn": "Poznaj produkt",

      "aud.kicker": "Dla kogo",
      "aud.h2": "Dla każdej firmy, w której wiedza żyje w ludziach, a nie w systemach.",
      "aud.1t": "Wiedza, która żyje w głowach", "aud.1p": "Gdy „jak my to robimy” potrafi wyjaśnić tylko kilka osób, każda nieobecność staje się wąskim gardłem. Certemis udostępnia tę wiedzę każdemu, kto ma do niej prawo.",
      "aud.2t": "Zespoły, które rosną i się zmieniają", "aud.2p": "Nowi ludzie, odejścia i przetasowania rozmywają kontekst. Certemis trzyma go w firmie — onboarding jest szybszy, a nic kluczowego nie odchodzi wraz z osobą.",
      "aud.3t": "Praca rozproszona na wielu frontach", "aud.3p": "Przy wielu projektach, klientach czy produktach szczegóły się zacierają — co ustalono, co obiecano i dlaczego. Certemis trzyma kontekst każdego wątku w jednym miejscu, które po prostu pytasz.",

      "int.kicker": "Projektowany, by łączyć się z",
      "int.h2": "Twoja wiedza tam, gdzie już dziś żyje.",
      "int.p": "Certemis jest projektowany tak, by łączyć się z narzędziami, w których zespół już pracuje — Twoja wiedza staje się użyteczna bez przenoszenia jej i przepisywania.",
      "int.1t": "Kod i repozytoria", "int.1s": "GitHub, GitLab",
      "int.2t": "Czat zespołu", "int.2s": "Slack, Teams",
      "int.3t": "Dokumenty i dyski", "int.3s": "Google Drive, Notion",
      "int.4t": "Wiki", "int.4s": "Confluence, Notion",
      "int.5t": "Zgłoszenia", "int.5s": "Jira, Linear",
      "int.6t": "Decyzje", "int.6s": "Wątki, zapisy",
      "int.note": "Pokazane integracje to planowane konektory; dostępność udostępniamy stopniowo w trakcie wczesnego dostępu.",

      "exp.kicker": "Poznaj więcej",
      "exp.h2": "Zajrzyj głębiej w Certemis.",
      "exp.1t": "Zastosowania", "exp.1p": "Tam, gdzie pamięć się przydaje.",
      "exp.2t": "Bezpieczeństwo", "exp.2p": "Jak chronimy Twoją wiedzę.",
      "exp.3t": "Cennik", "exp.3p": "Plany, które rosną z zespołem.",

      "cmp.kicker": "To nie kolejne wiki",
      "cmp.h2": "Różnica polega na tym, kto utrzymuje to na bieżąco.",
      "cmp.old.h": "Sposób ręczny", "cmp.new.h": "Z Certemis",
      "cmp.o1": "Ktoś musi pisać i aktualizować każdą stronę.",
      "cmp.o2": "Odpowiedzi żyją w pięciu czatach — często sprzeczne.",
      "cmp.o3": "Gdy odchodzi senior, odchodzi też kontekst.",
      "cmp.n1": "Kontekst zapisywany automatycznie w trakcie pracy.",
      "cmp.n2": "Jedna aktualna odpowiedź, w zakresie Twoich uprawnień.",
      "cmp.n3": "Wiedza zostaje w firmie, nie w głowach.",

      "term.kicker": "W praktyce",
      "term.h2": "Zadaj pytanie. Dostań odpowiedź, którą Twoja firma już zna.",
      "term.title": "certemis — zapytanie",
      "term.q": "Dlaczego porzuciliśmy stary system logowania?",
      "term.a": "// Wyciągnięte z zapisu decyzji i dyskusji, która do niej doprowadziła — w zakresie Twoich uprawnień.",
      "hero.q": "Jak wdrażamy serwis płatności?",
      "hero.ans1": "Wdrażaj przez pipeline staging,",
      "hero.ans2": "potem promuj po zielonych testach.",
      "hero.ansmeta": "Złożone z Twoich repozytoriów, decyzji i dokumentów",

      "prod.kicker": "Produkt",
      "prod.h1": "Jedno miejsce, by zapytać o wszystko, co Twoja firma już kiedyś rozgryzła.",
      "prod.p": "Certemis zbiera wiedzę operacyjną rozproszoną po Twoich narzędziach i ludziach w jedną warstwę, którą cały zespół pyta naturalnym językiem — i zawsze pokazuje każdemu tylko to, do czego ma prawo.",
      "prod.f.h2": "Co dostajesz.",
      "f1.t": "Onboarding bez wąskiego gardła", "f1.p": "Nowe osoby dostają odpowiedzi z systemu, zamiast przerywać najbardziej doświadczonym. Stają się przydatne w dni, nie tygodnie — a Twoi seniorzy zostają przy realnej pracy.",
      "f2.t": "Ciągłość, gdy ludzie się zmieniają", "f2.p": "Uzasadnienia decyzji i historia projektu zostają w firmie — odejście albo długi urlop nie cofa już zespołu do punktu zero.",
      "f3.t": "Jedna odpowiedź, nie pięć", "f3.p": "„Jak my to robimy?” zwraca jedną aktualną odpowiedź — zamiast pięciu połowicznych wersji rozsianych po czatach i skrzynkach.",
      "f4.t": "EU-first i prywatnie", "f4.p": "Rezydencja danych w UE, zgodność z RODO, umowa powierzenia (DPA) z każdym klientem i umowna gwarancja, że nigdy nie trenujemy modeli na Twoich danych.",
      "f5.t": "Twoje uprawnienia, respektowane", "f5.p": "Kontrola dostępu sprawia, że odpowiedź jest zawsze ograniczona do tego, co dana osoba może zobaczyć — nic nie wycieka poza granice uprawnień.",
      "f6.t": "Niskie utrzymanie z założenia", "f6.p": "Certemis zbiera kontekst z pracy w trakcie jej trwania, więc pozostaje aktualny bez ciągłego nakładu, jakiego wymaga wiki.",
      "prod.sec.kicker": "Bezpieczeństwo",
      "prod.sec.h2": "Twoja wiedza traktowana jak najwrażliwszy zasób.",
      "prod.sec.p": "Szyfrowanie w tranzycie i w spoczynku, ścisła izolacja tenantów, rezydencja danych w UE, umowa powierzenia (DPA) z każdym klientem oraz jasne zobowiązanie umowne, że Twoje dane nigdy nie służą do trenowania modeli.",
      "prod.cta": "Poproś o wczesny dostęp",

      "how.kicker": "Jak to działa",
      "how.h1": "Podłączone w jedno popołudnie. Przydatne tego samego dnia.",
      "how.p": "Cztery kroki od rozproszonej wiedzy do pamięci, którą cały zespół po prostu pyta.",
      "s1.t": "Podłącz źródła", "s1.p": "Wskaż Certemis narzędzia, w których już żyje Twoja wiedza. Ty decydujesz, co może czytać — a czego nie wolno mu dotykać.",
      "s2.t": "Porządkuje wszystko za Ciebie", "s2.p": "Certemis czyta i porządkuje kontekst w tle — bez ręcznego tagowania, bez pracy na siłę, bez niczego do utrzymywania przez zespół.",
      "s3.t": "Zespół po prostu pyta", "s3.p": "Każdy pyta naturalnym językiem i dostaje jasną odpowiedź — zawsze ograniczoną do tego, co może zobaczyć.",
      "s4.t": "Mądrzeje, gdy pracujecie", "s4.p": "W miarę pracy pamięć rośnie — firma z czasem staje się sprawniejsza, zamiast zapominać.",
      "how.cta.h2": "Bądź jednym z pierwszych zespołów na Certemis.",
      "how.cta.btn": "Dołącz do listy",

      "about.kicker": "O Certemis",
      "about.h1": "Wiedza Twojej firmy nie powinna odchodzić razem z ludźmi.",
      "about.p": "Certemis buduje warstwę pamięci operacyjnej dla firm, których prawdziwa przewaga tkwi w wiedzy ich ludzi. Jesteśmy na wczesnym etapie, skupieni i budujemy razem z zespołami, które czują ten problem najmocniej.",
      "about.mission.kicker": "Nasza misja",
      "about.mission.h": "Sprawić, by wiedza firmy przetrwała ludzi, którzy ją trzymają.",
      "about.mission.p": "Każda firma traci kontekst, gdy ktoś odchodzi, robi przerwę albo po prostu zapomina. Ta strata jest cicha, ciągła i kosztowna — i żadne wiki jej nie rozwiązało, bo wiki zależą od tego, czy ludziom chce się wszystko spisywać. Budujemy pamięć, którą firma naprawdę zachowuje: taką, która pamięta, jak wykonuje się pracę, i oddaje to w chwili, gdy ktoś tego potrzebuje.",
      "about.values.kicker": "W co wierzymy",
      "about.values.h": "Zasady, według których budujemy.",
      "about.v1t": "Wiedza należy do firmy",
      "about.v1p": "Kontekst nie powinien żyć ani umierać z pojedynczymi osobami. Budujemy tak, by to, czego uczy się zespół, zostawało w firmie — dostępne, aktualne i nigdy zamknięte w głowie jednej osoby.",
      "about.v2t": "Prywatność to nie funkcja",
      "about.v2p": "Twoja wiedza to Twój najwrażliwszy zasób, więc tak ją traktujemy od pierwszego dnia — EU-first, świadomie uprawnień i nigdy do trenowania modeli na Twoich danych.",
      "about.v3t": "Użyteczne ponad efektowne",
      "about.v3p": "Wolimy zdobyć zaufanie czymś, co po cichu działa, niż pokazać demo, które olśniewa raz. Każdą decyzję mierzymy tym, czy pomaga realnym zespołom w realnej pracy.",
      "about.why.kicker": "Dlaczego teraz",
      "about.why.h": "Dlaczego pamięć operacyjna i dlaczego teraz.",
      "about.why.p": "Zespoły nigdy nie tworzyły tylu informacji — w repozytoriach, czatach, dokumentach i decyzjach — i nigdy nie było tak trudno ich nie tracić. Narzędzia, które potrafią wreszcie czytać i łączyć ten kontekst naturalnym językiem, stały się praktyczne dopiero niedawno. Uważamy, że to właściwy moment, by budować pamięć zaprojektowaną tak, by utrwalała sposób pracy firmy w trakcie jej wykonywania — zamiast prosić ludzi o spisywanie wszystkiego po fakcie.",
      "about.cta.h": "Budujemy Certemis z naszymi pierwszymi zespołami.",
      "about.cta.btn": "Dołącz do listy",

      "price.kicker": "Cennik",
      "price.h1": "Cennik, który rośnie z Twoim zespołem, a nie przeciw niemu.",
      "price.p": "Każdy plan zawiera rezydencję danych w UE, DPA i dostęp świadomy uprawnień — i nigdy nie trenujemy modeli na Twoich danych.",
      "price.per": "/mies",
      "price.custom": "Wycena indywidualna",
      "price.popular": "Najpopularniejszy",
      "price.s.desc": "Dla małych zespołów, które zbierają pierwszą wiedzę w jednym miejscu.",
      "price.s.f1": "Do 30 osób",
      "price.s.f2": "1 integracja",
      "price.s.f3": "1 000 zapytań / mies",
      "price.s.f4": "Podstawowy RBAC",
      "price.s.f5": "DPA i rezydencja danych w UE",
      "price.s.f6": "Wsparcie e-mail",
      "price.s.cta": "Zacznij",
      "price.g.desc": "Dla rosnących zespołów, które potrzebują więcej źródeł i odpowiedzi.",
      "price.g.f1": "Do 80 osób",
      "price.g.f2": "Do 3 integracji",
      "price.g.f3": "5 000 zapytań / mies",
      "price.g.f4": "Pełny RBAC",
      "price.g.f5": "DPA i rezydencja danych w UE",
      "price.g.f6": "Wsparcie priorytetowe",
      "price.g.cta": "Wybierz Growth",
      "price.sc.desc": "Dla większych organizacji standaryzujących jedną warstwę pamięci.",
      "price.sc.f1": "Do 150 osób",
      "price.sc.f2": "Integracje bez limitu",
      "price.sc.f3": "20 000 zapytań / mies",
      "price.sc.f4": "Pełny RBAC + zespoły",
      "price.sc.f5": "SSO / SAML",
      "price.sc.f6": "Wsparcie priorytetowe + Slack",
      "price.sc.cta": "Wybierz Scale",
      "price.e.desc": "Dla grup kapitałowych i środowisk regulowanych o nietypowych potrzebach.",
      "price.e.f1": "150+ osób / wiele spółek",
      "price.e.f2": "Integracje na zamówienie",
      "price.e.f3": "Limity wg umowy",
      "price.e.f4": "SSO / SAML + dziennik audytu",
      "price.e.f5": "Dedykowana rezydencja danych",
      "price.e.f6": "SLA + dedykowany kontakt",
      "price.e.cta": "Skontaktuj się",
      "price.note": "Ceny w EUR, rozliczenie miesięczne. <a href=\"early-access.html\">Founding members: -50% na zawsze.</a>",
      "price.faq.kicker": "Pytania",
      "price.faq.h2": "Cennik bez tajemnic",
      "price.q1": "Czy mogę później zmienić plan?",
      "price.a1": "Tak. Plan możesz zmienić w górę lub w dół w dowolnym momencie, a zmiana obowiązuje od następnego okresu rozliczeniowego - bez kar za przejście, gdy zespół rośnie lub zmieniają się potrzeby.",
      "price.q2": "Czym jest zapytanie i czy obowiązuje fair use?",
      "price.a2": "Zapytanie to jedno pytanie, które zespół zadaje Certemis i na które dostaje odpowiedź. Miesięczne limity utrzymują przewidywalność cen; gdy zbliżasz się do limitu, uprzedzimy Cię odpowiednio wcześnie i pomożemy dobrać właściwy plan, zamiast odcinać dostęp w środku miesiąca.",
      "price.q3": "Jak działa rabat founding-member -50%?",
      "price.a3": "Pierwszych 20 klientów z listy zapisów blokuje 50% od tych cen na cały czas aktywnej subskrypcji. Aplikuj o wczesny dostęp, by zdobyć rabat przed startem.",
      "price.cta.h": "Zablokuj cenę founding-member przed startem.",
      "price.cta.btn": "Dołącz do listy",
      "roi.kicker": "Kalkulator ROI",
      "roi.h2": "Zobacz, ile kosztuje zapominanie — i ile Certemis może odzyskać.",
      "roi.p": "Przesuń suwaki, aby oszacować czas i pieniądze tracone przez rozproszoną wiedzę.",
      "roi.employees": "Pracownicy",
      "roi.hours": "Godziny tygodniowo tracone na szukanie wiedzy (1 osoba)",
      "roi.rate": "Średnia stawka godzinowa (brutto)",
      "roi.hires": "Nowe osoby rocznie",
      "roi.ramp": "Dni do pełnej produktywności nowej osoby",
      "roi.recover": "Ile Certemis realnie odzyskuje",
      "roi.rec.cons": "konserwatywnie", "roi.rec.real": "realistycznie", "roi.rec.opt": "optymistycznie",
      "roi.res.main": "Certemis może odzyskać",
      "roi.res.peryear": "rocznie",
      "roi.res.search": "tracone na szukaniu / mies.",
      "roi.res.total": "łączna strata / rok",
      "roi.res.onb": "koszt onboardingu / rok",
      "roi.disclaimer": "Szacunek poglądowy oparty na średnich branżowych. Realne wyniki zależą od zespołu, narzędzi i sposobu dzielenia się wiedzą.",
      "roi.cta": "Dołącz do listy",

      "uc.kicker": "Zastosowania",
      "uc.h1": "Chwile, w których wiedza po cichu znika.",
      "uc.p": "Cztery codzienne sytuacje, w których ginie kontekst — i jak Certemis jest zbudowany, by go zatrzymać.",
      "uc.a.kicker": "Onboarding",
      "uc.a.h": "Nowi nie powinni przerywać komuś, żeby w ogóle zacząć.",
      "uc.a.p1": "Pierwsze tygodnie nowej osoby toczą się na pożyczonym czasie. Kroki konfiguracji, niuanse projektu i „kto się na tym zna” żyją w głowach kilku osób — więc start oznacza odrywanie najbardziej doświadczonych od realnej pracy, by znów odpowiadali na te same pytania.",
      "uc.a.p2": "Z Certemis nowa osoba pyta system i dostaje odpowiedź złożoną z repozytoriów, dokumentów i wcześniejszych decyzji — ograniczoną do tego, co może zobaczyć. Odnajduje się bez czekania na wolną chwilę.",
      "uc.a.b1": "Produktywni w dni, nie tygodnie",
      "uc.a.b2": "Mniej powtórek dla Twoich seniorów",
      "uc.a.b3": "Każda odpowiedź w zakresie ich uprawnień",
      "uc.a.stat": "Mediana czasu, w którym nowa osoba osiąga pełną produktywność, to około 65 dni. Certemis skraca tę część, którą spędza się na szukaniu odpowiedzi.",
      "uc.b.kicker": "Nieobecności i odejścia",
      "uc.b.h": "Gdy kogoś nie ma, praca nie powinna stawać.",
      "uc.b.p1": "Przychodzą urlopy, okresy wypowiedzenia są krótkie, a uzasadnienie decyzji zwykle odchodzi z osobą, która ją podjęła. Reszcie zostaje odtwarzanie „dlaczego zrobiliśmy to tak” z rozproszonych wątków.",
      "uc.b.p2": "Ponieważ Certemis zbiera kontekst w trakcie pracy, zostaje on w firmie. Gdy kogoś nie ma lub odchodzi, zespół wciąż może zapytać, co i dlaczego ustalono — i działać dalej.",
      "uc.b.b1": "Decyzje niezależne od jednej osoby",
      "uc.b.b2": "Ciągłość przez urlopy i przekazania",
      "uc.b.b3": "Mniej strat przy każdym odejściu",
      "uc.b.stat": "47% organizacji wskazuje utratę wiedzy instytucjonalnej jako główne wyzwanie przy odejściach. Certemis zatrzymuje tę wiedzę w firmie.",
      "uc.c.kicker": "Kontekst klienta i projektu",
      "uc.c.h": "Przestań czekać na jedyną osobę, która pamięta.",
      "uc.c.p1": "Przy wielu projektach i klientach szczegóły się zacierają — co obiecano, którą drogę wybrano, dlaczego odrzucono prośbę. Gdy ten kontekst tkwi w jednej osobie, reszta czeka, aż się zwolni.",
      "uc.c.p2": "Certemis trzyma ustalenia, historię i specyfikę każdego projektu w jednym miejscu, które zespół po prostu pyta — odpowiedzi wracają w sekundy, z dołączonym kontekstem.",
      "uc.c.b1": "Ustalenia i historia w jednym miejscu",
      "uc.c.b2": "Odpowiedzi bez gonienia kolegi",
      "uc.c.b3": "Kontekst idzie za projektem, nie osobą",
      "uc.c.stat": "Gdy kontekst projektu tkwi w jednej osobie, reszta czeka. Certemis sprawia, że można go uzyskać w sekundy.",
      "uc.d.kicker": "Jedno źródło prawdy",
      "uc.d.h": "Jedna aktualna odpowiedź — nie pięć połowicznych.",
      "uc.d.p1": "To samo pytanie pada w pięciu czatach i dostaje pięć nieco innych odpowiedzi, część nieaktualnych. Ludzie działają na tej, którą znajdą pierwszą, a drobne rozbieżności po cichu zamieniają się w realne poprawki.",
      "uc.d.p2": "Certemis daje jedną aktualną, świadomą uprawnień odpowiedź na „jak my to robimy” — złożoną z miejsc, gdzie naprawdę żyje Twoja wiedza, i aktualizowaną wraz z pracą.",
      "uc.d.b1": "Jedna odpowiedź zamiast sprzecznych kopii",
      "uc.d.b2": "Mniej poprawek przez nieaktualne dane",
      "uc.d.b3": "Ta sama odpowiedź dla każdego, w zakresie uprawnień",
      "uc.d.stat": "Nawet połowa nowych osób potrafi odejść w 90 dni; sprzeczne odpowiedzi i wolne wdrożenie są częścią przyczyny. Jedna aktualna odpowiedź pomaga.",
      "uc.s.kicker": "Koszt zapominania",
      "uc.s.h2": "Utracona wiedza jest kosztowna — i mierzalna.",
      "uc.s.m1": "~65 dni", "uc.s.m1c": "mediana czasu do pełnej produktywności nowej osoby",
      "uc.s.m2": "47%", "uc.s.m2c": "wskazuje utratę wiedzy instytucjonalnej jako główne wyzwanie przy odejściach",
      "uc.s.m3": "$7,5–28 tys.", "uc.s.m3c": "szacowany realny koszt wdrożenia jednej nowej osoby",
      "uc.s.src": "Źródła: <a href='https://docustream.ai/employee-onboarding-statistics' target='_blank' rel='noopener noreferrer'>Docustream (2025)</a>, <a href='https://speakwiseapp.com/blog/employee-onboarding-statistics' target='_blank' rel='noopener noreferrer'>Speakwise (2026)</a>.",
      "uc.cta.h": "Zobacz, gdzie Certemis pasuje do Twojego zespołu.",
      "uc.cta.btn": "Dołącz do listy",

      "sec.kicker": "Bezpieczeństwo",
      "sec.h1": "Zbudowany tak, by powierzyć mu najwrażliwszą wiedzę.",
      "sec.p": "Certemis projektujemy wokół prostej zasady: wiedza operacyjna to Twój najwrażliwszy zasób, więc chronimy ją jak zasób - od pierwszej integracji.",
      "sec.how.kicker": "Jak chronimy dane",
      "sec.how.h": "Bezpieczeństwo wbudowane w fundamenty, nie doklejone później.",
      "sec.f1t": "Szyfrowanie wszędzie",
      "sec.f1p": "Dane są szyfrowane w tranzycie (TLS) i w spoczynku, więc są chronione zarówno w transmisji, jak i na dysku.",
      "sec.f2t": "Izolacja tenantów",
      "sec.f2p": "Dane każdego klienta są logicznie odizolowane, więc wiedza jednej organizacji nigdy nie jest widoczna dla innej.",
      "sec.f3t": "Rezydencja danych w UE",
      "sec.f3p": "Twoje dane są przechowywane i przetwarzane w UE, zgodnie z RODO - EU-first z założenia, nie po fakcie.",
      "sec.f4t": "Dostęp świadomy uprawnień",
      "sec.f4p": "Kontrola dostępu oparta na rolach i domyślne najmniejsze uprawnienia utrzymują odpowiedzi w zakresie danej osoby; SSO/SAML dostępne w wyższych planach.",
      "sec.f5t": "Brak treningu na Twoich danych",
      "sec.f5p": "Twoje dane nigdy nie służą do trenowania modeli - to jasne zobowiązanie umowne, a nie ustawienie, które trzeba odnaleźć.",
      "sec.f6t": "Audyt i logowanie",
      "sec.f6p": "Dostęp i aktywność są logowane - kto, o co i kiedy pytał - więc masz czytelny ślad do przeglądu i rozliczalności.",
      "sec.ctrl.kicker": "Twoje dane, Twoja kontrola",
      "sec.ctrl.h": "To Ty decydujesz, co Certemis widzi - a czego nigdy nie dotyka.",
      "sec.ctrl.1": "Sam wybierasz, do których źródeł Certemis się podłącza, a co pozostaje poza zasięgiem.",
      "sec.ctrl.2": "Dane można usunąć na żądanie i są usuwane, gdy przestajesz korzystać z Certemis.",
      "sec.ctrl.3": "Umowa powierzenia przetwarzania (DPA) jest dostępna dla każdego klienta.",
      "sec.comp.kicker": "Zgodność i roadmapa",
      "sec.comp.h": "Gdzie jesteśmy ze zgodnością - uczciwie.",
      "sec.comp.p": "Certemis jest EU-first i RODO-ready, a z każdym klientem podpisujemy DPA. Formalne certyfikaty, takie jak SOC 2 i ISO 27001, są na naszej roadmapie, a nie wdrożone już dziś - i wolimy powiedzieć to wprost, niż sugerować inaczej.",
      "sec.comp.contact": "Potrzebujesz pełnego security overview albo DPA? Napisz na hello@certemis.com, a prześlemy to, czego potrzebujesz.",
      "sec.faq.kicker": "Pytania",
      "sec.faq.h2": "Bezpieczeństwo bez tajemnic",
      "sec.q1": "Gdzie przechowywane są nasze dane?",
      "sec.a1": "W UE. Dane są przechowywane i przetwarzane w Unii Europejskiej, zgodnie z RODO, z szyfrowaniem w tranzycie i w spoczynku.",
      "sec.q2": "Czy trenujecie modele na naszych danych?",
      "sec.a2": "Nie. Twoje dane nigdy nie służą do trenowania modeli. To zobowiązanie umowne wobec każdego klienta, a nie opcja ukryta w ustawieniach.",
      "sec.q3": "Co dzieje się z naszymi danymi po zakończeniu umowy?",
      "sec.a3": "Po zakończeniu subskrypcji dane można wyeksportować, a następnie są usuwane. Usunięcie jest też dostępne na żądanie w dowolnym momencie współpracy.",
      "sec.cta.h": "Zespoły dbające o bezpieczeństwo to dokładnie ci, dla których budujemy.",
      "sec.cta.btn": "Dołącz do listy",

      "ea.kicker": "Wczesny dostęp",
      "ea.h1": "Founding members: pierwszych 20 klientów, 50% taniej na zawsze.",
      "ea.p": "Otwieramy ograniczoną grupę founding. Opowiedz nam o swoim zespole i zablokuj cenę founding-member na starcie.",
      "ea.ribbon": "Oferta founding — tylko 20 miejsc",
      "ea.price.ctx": "od ceny standardowej",
      "ea.price.sub": "Dożywotni rabat dla pierwszych 20 klientów — utrzymany tak długo, jak aktywna jest subskrypcja.",
      "ea.term1": "<b>50% taniej na zawsze</b> — przez cały czas, gdy jesteś klientem.",
      "ea.term2": "Zarezerwowane dla <b>pierwszych 20 klientów</b> z listy.",
      "ea.term3": "Dostępne <b>tylko dla osób z listy</b> — wypełnij formularz, by się kwalifikować.",
      "ea.term4": "Utrzymane przy <b>ciągłości subskrypcji</b>. Po przerwie cena founding wygasa.",
      "ea.meta.l": "Grupa founding się zapełnia", "ea.meta.r": "20 miejsc",

      "ea.form.h3": "Aplikuj o dostęp founding",
      "ea.form.sub": "Napisz nam trochę o swojej firmie, byśmy dopasowali wczesny dostęp.",
      "l.name": "Imię i nazwisko", "l.email": "E-mail służbowy", "l.company": "Firma",
      "l.website": "Strona firmy", "l.country": "Kraj", "l.size": "Wielkość firmy",
      "l.role": "Twoja rola", "l.needs": "Co Certemis mialby rozwiazac u Was?",
      "ph.name": "Jan Kowalski", "ph.email": "ty@firma.com", "ph.company": "Nazwa firmy",
      "ph.website": "firma.pl", "ph.country": "Zacznij wpisywać kraj…", "ph.role": "np. CTO, Head of Engineering",
      "ph.needs": "Tempo onboardingu, utrata wiedzy przy odejściach, rozproszony kontekst…",
      "opt.choose": "Wybierz…",
      "size.1": "1–29 osób", "size.2": "30–80 osób", "size.3": "81–150 osób", "size.4": "150+ osób",
      "c.pl": "Polska", "c.de": "Niemcy", "c.uk": "Wielka Brytania", "c.nl": "Holandia",
      "c.fr": "Francja", "c.es": "Hiszpania", "c.se": "Szwecja", "c.other": "Inny (UE / UK)",
      "ea.submit": "Aplikuj o dostęp founding",
      "ea.consent": "Wysyłając zgodę, akceptujesz otrzymywanie informacji o starcie Certemis. Tylko wiadomości o produkcie i Twojej ofercie founding — bez spamu, rezygnacja w każdej chwili.",
      "ea.faq.kicker": "Pytania",
      "ea.faq.h2": "Warto wiedzieć",
      "q1": "Czy produkt jest już dostępny?", "a1": "Jeszcze nie. Jesteśmy w prywatnym wczesnym dostępie. Po aplikacji powiadomimy Cię w chwili startu — aplikujący mają pierwszeństwo do oferty founding.",
      "q2": "Jak działa oferta 50% na zawsze?", "a2": "Pierwszych 20 klientów z listy blokuje 50% od ceny standardowej na cały czas subskrypcji, dopóki pozostaje ona aktywna bez przerw.",
      "q3": "Co jeśli wstrzymam lub zrezygnuję?", "a3": "Rabat founding jest powiązany z ciągłością subskrypcji. Po przerwie cena founding wygasa i obowiązuje cennik standardowy.",
      "q4": "Dla kogo jest Certemis?", "a4": "Każda firma, w której wiedza operacyjna jest kluczowa, a ludzie przychodzą i odchodzą — wszędzie tam, gdzie odpowiedź na „jak my to robimy?” nie powinna zależeć od dostępności jednej osoby.",
      "q5": "Jak chronione są nasze dane?", "a5": "Rezydencja danych w UE, zgodność z RODO, DPA z każdym klientem, szyfrowanie w tranzycie i spoczynku, ścisła izolacja tenantów i brak treningu modeli na Twoich danych.",
      "msg.invalid": "Podaj prawidłowy e-mail służbowy.",
      "msg.demo": "Dziękujemy — Twoja aplikacja została zapisana. (Tryb demo: podłącz endpoint formularza, by odbierać zgłoszenia.)",
      "msg.ok": "Dziękujemy — aplikacja przyjęta. Odezwiemy się w okolicach startu.",
      "msg.err": "Coś poszło nie tak. Napisz na hello@certemis.com, a dodamy Cię ręcznie.",

      "nav.privacy": "Prywatność",
      "priv.kicker": "Informacje prawne",
      "priv.h1": "Prywatność i dane",
      "priv.p": "Jak postępujemy z informacjami, które nam przekazujesz — prostym językiem. Ostatnia aktualizacja: 1 czerwca 2026.",
      "priv.note": "Certemis jest w trakcie rejestracji jako spółka; ta informacja zostanie rozszerzona o pełne dane prawne po zakończeniu rejestracji.",
      "priv.s1.h": "Co zbieramy",
      "priv.s1.p": "Gdy aplikujesz o wczesny dostęp, zbieramy wyłącznie dane, które sam zdecydujesz się podać w formularzu: imię, służbowy e-mail, firmę, stronę, kraj, wielkość zespołu, rolę oraz krótki opis potrzeb. Nie śledzimy Cię w sieci ani nie kupujemy danych na Twój temat.",
      "priv.s2.h": "Jak je wykorzystujemy",
      "priv.s2.p": "Twoje dane wykorzystujemy w jednym celu: aby skontaktować się z Tobą w sprawie wczesnego dostępu i poinformować Cię o starcie Certemis. Nigdy nie sprzedajemy ani nie wynajmujemy Twoich danych osobowych podmiotom trzecim.",
      "priv.s3.h": "Gdzie trafiają",
      "priv.s3.p": "Formularz wczesnego dostępu obsługuje Formspree — nasz dostawca formularzy, a strona jest hostowana w Cloudflare. Przechowujemy Twoje dane tylko tak długo, jak potrzebujemy ich do kontaktu, a w każdej chwili możesz poprosić o ich usunięcie, pisząc na hello@certemis.com.",
      "priv.s4.h": "Pliki cookie",
      "priv.s4.p": "Ta strona nie używa plików cookie śledzących ani reklamowych. Ewentualna analityka jest anonimowa i nie korzysta z cookies. Ponieważ nic tutaj nie wymaga zgody, nie zobaczysz banera cookie.",
      "priv.s5.h": "Twoje prawa",
      "priv.s5.p": "Możesz poprosić o dostęp do swoich danych osobowych, ich poprawienie lub usunięcie — wystarczy napisać na hello@certemis.com, a my się tym zajmiemy.",
      "priv.s6.h": "Kontakt",
      "priv.s6.p": "Masz pytania o prywatność lub swoje dane? Napisz do nas na hello@certemis.com."
    }
  };

  var LS_KEY = "certemis_lang";
  var lang = localStorage.getItem(LS_KEY) || "en";
  if (!I18N[lang]) lang = "en";

  function t(key) { return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || ""; }

  function apply() {
    document.documentElement.lang = lang;
    var els = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      var v = t(els[i].getAttribute("data-i18n"));
      if (v) els[i].innerHTML = v;
    }
    var phs = document.querySelectorAll("[data-i18n-ph]");
    for (var j = 0; j < phs.length; j++) {
      var pv = t(phs[j].getAttribute("data-i18n-ph"));
      if (pv) phs[j].setAttribute("placeholder", pv);
    }
    var sel = document.getElementById("langSel");
    if (sel) sel.value = lang;
    var selM = document.getElementById("langSelMobile");
    if (selM) selM.value = lang;
  }

  function setLang(l) {
    if (!I18N[l]) return;
    lang = l; localStorage.setItem(LS_KEY, l); apply();
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply();

    var langSel = document.getElementById("langSel");
    if (langSel) langSel.addEventListener("change", function () { setLang(langSel.value); });
    var langSelMobile = document.getElementById("langSelMobile");
    if (langSelMobile) langSelMobile.addEventListener("change", function () { setLang(langSelMobile.value); });

    var hd = document.getElementById("hd");
    var heroDark = document.querySelector("[data-hero-dark]");
    function onScroll() {
      var y = window.scrollY;
      if (hd) {
        hd.classList.toggle("solid", y > 20);
        if (heroDark) {
          var limit = heroDark.offsetHeight - 90;
          hd.classList.toggle("on-dark", y < limit);
        }
      }
      var h = document.documentElement;
      var p = document.getElementById("progress");
      if (p) p.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var burger = document.getElementById("burger");
    var mobile = document.getElementById("mobile");
    if (burger && mobile) burger.addEventListener("click", function () { mobile.classList.toggle("open"); });

    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: .15 });
    var rev = document.querySelectorAll(".reveal");
    for (var k = 0; k < rev.length; k++) io.observe(rev[k]);

    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, target = +el.dataset.count, span = el.querySelector(".v");
        el.classList.add("sfx-counted"); // triggers a one-time entry pop on the number (CSS, motion-gated)
        var cur = 0, step = Math.max(1, Math.round(target / 38));
        var tm = setInterval(function () { cur += step; if (cur >= target) { cur = target; clearInterval(tm); } span.textContent = cur; }, 26);
        cio.unobserve(el);
      });
    }, { threshold: .6 });
    var counts = document.querySelectorAll("[data-count]");
    for (var m = 0; m < counts.length; m++) cio.observe(counts[m]);

    var FORM_ACTION = "https://formspree.io/f/xnjryoyq";

    var form = document.getElementById("apply");
    if (form) {
      var msg = document.getElementById("formMsg");
      var show = function (cls, key) { msg.className = "msg " + cls; msg.textContent = t(key); };
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var emailEl = form.querySelector("[name=email]");
        var email = emailEl ? emailEl.value.trim() : "";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { show("err", "msg.invalid"); return; }
        if (!FORM_ACTION) { show("ok", "msg.demo"); form.reset(); return; }
        fetch(FORM_ACTION, { method: "POST", headers: { "Accept": "application/json" }, body: new FormData(form) })
          .then(function (r) { if (r.ok) { show("ok", "msg.ok"); form.reset(); } else { show("err", "msg.err"); } })
          .catch(function () { show("err", "msg.err"); });
      });
    }

    var yr = document.getElementById("yr");
    if (yr) yr.textContent = new Date().getFullYear();

    initMotion();
    initScrollFX();
    initROI();
  });

  // ===== Premium motion layer (additive, GPU-only, fully gated) =====
  function initMotion() {
    var reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    var fineMQ = window.matchMedia("(pointer: fine)");
    var motionOK = !reduceMQ.matches;
    var rich = motionOK && fineMQ.matches && window.innerWidth > 900;
    var body = document.body;

    // 6. Page fade-in is handled by the standalone revealBody() above.
    // 6b. Fade-out before navigating to another internal page.
    if (motionOK) {
      document.addEventListener("click", function (e) {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        var a = e.target.closest ? e.target.closest("a") : null;
        if (!a) return;
        var href = a.getAttribute("href");
        if (!href || a.target === "_blank" || a.hasAttribute("download")) return;
        if (/^(mailto:|tel:|#)/i.test(href)) return;
        var url;
        try { url = new URL(a.href, location.href); } catch (_) { return; }
        if (url.origin !== location.origin) return;        // external
        if (url.pathname === location.pathname) return;     // same page / #anchor
        e.preventDefault();
        body.classList.remove("page-in");
        body.classList.add("page-out");
        setTimeout(function () { window.location.href = a.href; }, 240);
      });
      window.addEventListener("pageshow", function (ev) {
        if (ev.persisted) { body.classList.remove("page-out"); body.classList.add("page-in"); }
      });
    }

    // 5. Progress bars fill from 0 to their CSS width when scrolled into view.
    if (motionOK) {
      var bars = document.querySelectorAll(".pbar > i");
      if (bars.length && "IntersectionObserver" in window) {
        var pio = new IntersectionObserver(function (es) {
          es.forEach(function (en) {
            if (!en.isIntersecting) return;
            var bar = en.target, target = getComputedStyle(bar).width;
            bar.style.width = "0px";
            void bar.offsetWidth;                            // reflow so the transition runs
            requestAnimationFrame(function () { bar.style.width = target; });
            pio.unobserve(bar);
          });
        }, { threshold: .4 });
        for (var pb = 0; pb < bars.length; pb++) pio.observe(bars[pb]);
      }
    }

    if (!rich) return; // parallax, cursor glow and magnetic buttons: desktop + fine pointer + motion only

    var raf = null;

    // 1. Hero graph parallax — move the whole .viz wrapper (never .flt, to keep its float keyframes).
    var viz = document.querySelector(".viz");
    var vizHost = viz ? (viz.closest("[data-hero-dark]") || viz.closest("section")) : null;
    var pTX = 0, pTY = 0, pCX = 0, pCY = 0;

    // 2. Cursor glow on dark hero sections.
    var glows = [];
    var hosts = document.querySelectorAll("[data-hero-dark]");
    for (var h = 0; h < hosts.length; h++) {
      var sec = hosts[h];
      sec.classList.add("cg-host");
      var g = document.createElement("div"); g.className = "cursor-glow";
      var blob = document.createElement("b"); g.appendChild(blob);
      sec.insertBefore(g, sec.firstChild);
      glows.push({ sec: sec, el: g, blob: blob, tx: 0, ty: 0, cx: 0, cy: 0, on: false });
    }

    function loop() {
      raf = null;
      var need = false;
      if (viz) {
        pCX += (pTX - pCX) * 0.08; pCY += (pTY - pCY) * 0.08;
        viz.style.transform = "translate3d(" + pCX.toFixed(2) + "px," + pCY.toFixed(2) + "px,0)";
        if (Math.abs(pTX - pCX) > 0.1 || Math.abs(pTY - pCY) > 0.1) need = true;
      }
      for (var i = 0; i < glows.length; i++) {
        var gg = glows[i];
        gg.cx += (gg.tx - gg.cx) * 0.14; gg.cy += (gg.ty - gg.cy) * 0.14;
        gg.blob.style.transform = "translate3d(" + gg.cx.toFixed(1) + "px," + gg.cy.toFixed(1) + "px,0)";
        if (gg.on && (Math.abs(gg.tx - gg.cx) > 0.3 || Math.abs(gg.ty - gg.cy) > 0.3)) need = true;
      }
      if (need) raf = requestAnimationFrame(loop);
    }
    function kick() { if (!raf) raf = requestAnimationFrame(loop); }

    if (viz && vizHost) {
      vizHost.addEventListener("mousemove", function (e) {
        var r = vizHost.getBoundingClientRect();
        var nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        var ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        pTX = Math.max(-1, Math.min(1, nx)) * 8;
        pTY = Math.max(-1, Math.min(1, ny)) * 8;
        kick();
      });
      vizHost.addEventListener("mouseleave", function () { pTX = 0; pTY = 0; kick(); });
    }

    glows.forEach(function (gg) {
      gg.sec.addEventListener("mousemove", function (e) {
        var r = gg.sec.getBoundingClientRect();
        gg.tx = e.clientX - r.left; gg.ty = e.clientY - r.top;
        if (!gg.on) { gg.on = true; gg.cx = gg.tx; gg.cy = gg.ty; gg.el.style.opacity = "1"; }
        kick();
      });
      gg.sec.addEventListener("mouseleave", function () { gg.on = false; gg.el.style.opacity = "0"; });
    });

    // 3. Magnetic buttons — follow the cursor a few px + scale; CSS .2s transition smooths the return.
    var mags = document.querySelectorAll(".btn, .cta");
    for (var b = 0; b < mags.length; b++) {
      (function (el) {
        var pending = false;
        el.addEventListener("mousemove", function (e) {
          if (pending) return;
          pending = true;
          requestAnimationFrame(function () {
            pending = false;
            var r = el.getBoundingClientRect();
            var dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
            var dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
            el.style.transform = "translate(" + (dx * 4).toFixed(2) + "px," + (dy * 4).toFixed(2) + "px) scale(1.02)";
          });
        });
        el.addEventListener("mouseleave", function () { el.style.transform = ""; });
      })(mags[b]);
    }
  }

  // ===== Scroll-reactive content effects (content sections only, not banners) =====
  // [data-sfx="rise"]  -> gentle vertical parallax as the element moves through the viewport
  // [data-sfx="line"]  -> sets --sp (0..1) scroll progress; CSS draws a line via scaleX(var(--sp))
  function initScrollFX() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var els = [].slice.call(document.querySelectorAll("[data-sfx]"));
    if (!els.length) return;
    var ticking = false;
    function update() {
      ticking = false;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = 0; i < els.length; i++) {
        var el = els[i], r = el.getBoundingClientRect();
        if (r.bottom < -120 || r.top > vh + 120) continue; // skip far off-screen
        var p = (vh - r.top) / (vh + r.height);
        p = p < 0 ? 0 : p > 1 ? 1 : p;
        if (el.getAttribute("data-sfx") === "rise") {
          var amp = parseFloat(el.getAttribute("data-sfx-amp")) || 60;
          el.style.transform = "translate3d(0," + (-p * amp).toFixed(1) + "px,0)"; // drifts up as it scrolls through
        } else {
          el.style.setProperty("--sp", p.toFixed(3));
        }
      }
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  // ===== Live ROI calculator (pricing.html) =====
  function initROI() {
    var root = document.getElementById("roi");
    if (!root) return;
    var inputs = ["roiEmp", "roiHours", "roiRate", "roiHires", "roiRamp", "roiRec"];
    function num(id) { var e = document.getElementById(id); return e ? (parseFloat(e.value) || 0) : 0; }
    function money(n) { return "€" + Math.round(n).toLocaleString(lang === "pl" ? "pl-PL" : "en-US"); }
    function set(id, v) { var e = document.getElementById(id); if (e) e.textContent = v; }
    function fill(id, min, max) {
      var e = document.getElementById(id); if (!e) return;
      var pct = (num(id) - min) / (max - min) * 100;
      e.style.setProperty("--fp", Math.max(0, Math.min(100, pct)).toFixed(1) + "%");
    }
    function recompute() {
      var emp = num("roiEmp"), hrs = num("roiHours"), rate = num("roiRate"),
          hires = num("roiHires"), ramp = num("roiRamp"), rec = num("roiRec");
      var searchMonth = emp * hrs * 4.33 * rate;
      var searchYear = searchMonth * 12;
      var onbYear = hires * (ramp * 8 * rate * 0.5);
      var totalYear = searchYear + onbYear;
      var recoverYear = totalYear * (rec / 100);
      set("roiRecoverYear", money(recoverYear));
      set("roiSearchMonth", money(searchMonth));
      set("roiTotalYear", money(totalYear));
      set("roiOnbYear", money(onbYear));
      set("roiEmpV", emp); set("roiHoursV", hrs); set("roiHiresV", hires);
      set("roiRampV", ramp); set("roiRecV", Math.round(rec) + "%");
      var hint = document.getElementById("roiRecHint");
      if (hint) hint.textContent = t(rec <= 29 ? "roi.rec.cons" : rec <= 45 ? "roi.rec.real" : "roi.rec.opt");
      fill("roiEmp", 1, 500); fill("roiHours", 0, 15); fill("roiHires", 0, 100);
      fill("roiRamp", 10, 120); fill("roiRec", 10, 60);
    }
    for (var i = 0; i < inputs.length; i++) {
      var el = document.getElementById(inputs[i]);
      if (el) el.addEventListener("input", recompute);
    }
    // re-render (locale formatting + hint) when the language changes
    ["langSel", "langSelMobile"].forEach(function (id) {
      var s = document.getElementById(id);
      if (s) s.addEventListener("change", function () { setTimeout(recompute, 0); });
    });
    recompute();
  }

})();
