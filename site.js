(function () {
  "use strict";

  var I18N = {
    en: {
      "nav.about": "About",
      "nav.product": "Product",
      "nav.how": "How it works",
      "nav.early": "Early access",
      "nav.cta": "Join the waitlist",

      "foot.tag": "The operational memory layer for companies. Knowledge that stays in the business - not in people's heads.",
      "foot.h.nav": "Navigate",
      "foot.h.contact": "Contact",
      "foot.rights": "Certemis - Operational Memory Layer for Companies.",

      "home.kicker": "Operational memory layer",
      "home.h1": "Your company's <span class=\"accent\">memory</span>, kept where it belongs.",
      "home.lead": "Certemis is the operational memory layer for software houses and agencies. It captures how your company actually works - decisions, context, know-how - so the knowledge stays in the business, not in people's heads.",
      "home.btn1": "Join the waitlist",
      "home.btn2": "How it works",
      "home.note": "Currently in private early access. Founding-member access is opening to a limited cohort.",
      "g.docs": "Docs", "g.slack": "Slack", "g.repos": "Repos",
      "g.decisions": "Decisions", "g.tickets": "Tickets", "g.wiki": "Wiki",

      "home.s.kicker": "The cost of forgetting",
      "home.s.h2": "When someone leaves, the company forgets.",
      "home.s.p": "The most valuable knowledge lives in people's heads, scattered threads, and the memory of a few seniors. When they leave, take leave, or simply forget - you pay for it again and again.",
      "home.stat1cap": "longer onboarding when new hires depend on seniors instead of a system.",
      "home.stat2cap": "of senior time lost to repeated questions that already have an answer.",
      "home.stat3cap": "of project context can leave with a single departure.",
      "home.stat.note": "Illustrative figures - to be validated with customers.",

      "home.t.kicker": "What Certemis is",
      "home.t.h2": "Memory that doesn't leave with the people.",
      "home.t.p": "Not another wiki you have to write and maintain. Certemis captures operational context and gives it back to your team on demand.",
      "home.t.btn": "Explore the product",

      "aud.kicker": "Who it's for",
      "aud.h2": "Made for teams that run on people's knowledge.",
      "aud.1t": "Software houses", "aud.1p": "Project-based, senior-heavy, high rotation. Onboarding and context loss hit hardest here.",
      "aud.2t": "Digital & creative agencies", "aud.2p": "Many clients, much context - who agreed what, and why. Keep it all in one place.",
      "aud.3t": "Consulting & IT services", "aud.3p": "Knowledge is the product. Losing it is the most expensive thing that can happen.",

      "cmp.kicker": "Not another wiki",
      "cmp.h2": "The difference is who does the work.",
      "cmp.old.h": "The manual way", "cmp.new.h": "With Certemis",
      "cmp.o1": "Someone has to write and update every page.",
      "cmp.o2": "Answers live in five chats - often conflicting.",
      "cmp.o3": "When a senior leaves, the context leaves too.",
      "cmp.n1": "Context is captured automatically as work happens.",
      "cmp.n2": "One current answer, scoped to your permissions.",
      "cmp.n3": "Knowledge stays in the company, not in heads.",

      "term.kicker": "In practice",
      "term.h2": "Ask in plain language. Get the company's answer.",
      "term.title": "certemis - ask",
      "term.q": "How do we deploy the billing service?",
      "term.a": "// Answer assembled from your repos, decisions and docs - scoped to your access.",

      "prod.kicker": "Product",
      "prod.h1": "One memory layer for everything your company knows.",
      "prod.p": "Certemis unifies the operational knowledge scattered across your tools and your people into a single, permission-aware layer your whole team can query in plain language.",
      "prod.f.h2": "Built for how technical teams actually work.",
      "f1.t": "Faster onboarding", "f1.p": "New people ask the system instead of pulling a senior off client work. Ramp-up in days, not weeks.",
      "f2.t": "Continuity", "f2.p": "Project knowledge and the reasoning behind decisions stay in the company as people rotate.",
      "f3.t": "One source of truth", "f3.p": "How do we do this? gets one current answer - not five conflicting ones across five chats.",
      "f4.t": "EU-first & private", "f4.p": "EU data residency, GDPR-ready, a DPA with every client, and no training of models on your data.",
      "f5.t": "Permissions respected", "f5.p": "Role-based access means the system never shows anyone more than they're allowed to see.",
      "f6.t": "Low maintenance", "f6.p": "Built to capture context automatically - without the discipline a manual wiki demands.",
      "prod.sec.kicker": "Security",
      "prod.sec.h2": "Your knowledge, treated as your most sensitive asset.",
      "prod.sec.p": "Encryption in transit and at rest, strict tenant isolation, EU data residency, a Data Processing Agreement with every customer, and a clear contractual commitment that your data is never used to train models.",
      "prod.cta": "Request early access",

      "how.kicker": "How it works",
      "how.h1": "Set up once. Useful from day one.",
      "how.p": "Four steps from scattered knowledge to a living memory your whole team can query.",
      "s1.t": "Connect your knowledge sources", "s1.p": "Point Certemis at where your knowledge already lives. You choose exactly what it remembers - and what it never touches.",
      "s2.t": "It organises and indexes automatically", "s2.p": "Certemis ingests and structures the context in the background. No manual tagging, no busywork for your team.",
      "s3.t": "Your team just asks", "s3.p": "Anyone gets answers on demand, in plain language, scoped strictly to what they are allowed to see.",
      "s4.t": "Knowledge compounds", "s4.p": "As work happens the memory grows - so the company gets smarter over time instead of forgetting.",
      "how.cta.h2": "Be among the first teams to run on Certemis.",
      "how.cta.btn": "Join the waitlist",

      "about.kicker": "About Certemis",
      "about.h1": "We keep what your company knows from walking out the door.",
      "about.p": "Certemis is building the operational memory layer for teams whose most valuable knowledge lives in people's heads. We're early, focused, and building alongside the teams who feel the problem most.",
      "about.mission.kicker": "Our mission",
      "about.mission.h": "Make a company's knowledge outlast the people who hold it.",
      "about.mission.p": "Every team loses context when someone leaves, takes a break, or simply forgets. We started Certemis because that loss is quiet, constant, and expensive - and because no wiki has ever truly solved it. Our mission is to give companies a memory of their own: one place that remembers how the work is actually done, and gives it back the moment anyone needs it.",
      "about.values.kicker": "What we believe",
      "about.values.h": "The principles behind how we build.",
      "about.v1t": "Knowledge belongs to the company",
      "about.v1p": "Context shouldn't live or die with individuals. We build so the things your team learns stay with the business - accessible, current, and never locked in one person's head.",
      "about.v2t": "Privacy is not a feature",
      "about.v2p": "Your knowledge is your most sensitive asset, so we treat it that way from day one - EU-first, permission-aware, and never used to train models on your data.",
      "about.v3t": "Useful beats impressive",
      "about.v3p": "We'd rather earn trust with something that quietly works than ship a demo that dazzles once. Every decision is measured against whether it helps real teams do real work.",
      "about.why.kicker": "Why now",
      "about.why.h": "Why operational memory, and why now.",
      "about.why.p": "Teams have never produced more context - across repos, chats, docs and decisions - and have never had a harder time holding onto it. Tools that can finally read and connect that context in plain language only became practical recently. We think the timing is right to build memory that captures how a company works as the work happens, instead of asking people to write it all down after the fact.",
      "about.cta.h": "We're building Certemis with our earliest teams.",
      "about.cta.btn": "Join the waitlist",

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
      "q4": "Who is Certemis for?", "a4": "Teams where operational knowledge is critical and people rotate - software houses, agencies, and consulting firms.",
      "q5": "How is our data protected?", "a5": "EU data residency, GDPR-ready, a DPA with every customer, encryption in transit and at rest, strict tenant isolation, and no training of models on your data.",
      "msg.invalid": "Please enter a valid work email.",
      "msg.demo": "Thank you - your application is recorded. (Demo mode: connect a form endpoint to receive submissions.)",
      "msg.ok": "Thank you - your application is in. We'll be in touch as launch approaches.",
      "msg.err": "Something went wrong. Please email hello@certemis.com and we'll add you."
    },
    pl: {
      "nav.about": "O nas",
      "nav.product": "Produkt",
      "nav.how": "Jak to działa",
      "nav.early": "Wczesny dostęp",
      "nav.cta": "Dołącz do listy",

      "foot.tag": "Warstwa pamięci operacyjnej dla firm. Wiedza, która zostaje w firmie — nie w głowach ludzi.",
      "foot.h.nav": "Nawigacja",
      "foot.h.contact": "Kontakt",
      "foot.rights": "Certemis — Warstwa Pamięci Operacyjnej dla Firm.",

      "home.kicker": "Warstwa pamięci operacyjnej",
      "home.h1": "<span class=\"accent\">Pamięć</span> Twojej firmy — tam, gdzie jej miejsce.",
      "home.lead": "Certemis to warstwa pamięci operacyjnej dla software house'ów i agencji. Utrwala to, jak naprawdę pracuje Twoja firma — decyzje, kontekst, know-how — tak by wiedza zostawała w firmie, a nie w głowach ludzi.",
      "home.btn1": "Dołącz do listy",
      "home.btn2": "Jak to działa",
      "home.note": "Obecnie w prywatnym wczesnym dostępie. Otwieramy miejsca dla ograniczonej grupy founding members.",
      "g.docs": "Dokumenty", "g.slack": "Slack", "g.repos": "Repozytoria",
      "g.decisions": "Decyzje", "g.tickets": "Zgłoszenia", "g.wiki": "Wiki",

      "home.s.kicker": "Koszt zapominania",
      "home.s.h2": "Gdy ktoś odchodzi, firma zapomina.",
      "home.s.p": "Najcenniejsza wiedza żyje w głowach ludzi, w rozproszonych wątkach i w pamięci kilku seniorów. Gdy odchodzą, biorą urlop albo po prostu zapominają — płacisz za to raz za razem.",
      "home.stat1cap": "dłuższy onboarding, gdy nowi zależą od seniorów zamiast od systemu.",
      "home.stat2cap": "czasu seniorów traconego na powtarzalne pytania, które mają już odpowiedź.",
      "home.stat3cap": "kontekstu projektu może odejść wraz z jedną osobą.",
      "home.stat.note": "Dane poglądowe — do walidacji z klientami.",

      "home.t.kicker": "Czym jest Certemis",
      "home.t.h2": "Pamięć, która nie odchodzi razem z ludźmi.",
      "home.t.p": "To nie kolejne wiki, które trzeba pisać i utrzymywać. Certemis utrwala kontekst operacyjny i oddaje go zespołowi na żądanie.",
      "home.t.btn": "Poznaj produkt",

      "aud.kicker": "Dla kogo",
      "aud.h2": "Dla zespołów, które żyją wiedzą ludzi.",
      "aud.1t": "Software house'y", "aud.1p": "Projektowe, dużo seniorów, wysoka rotacja. Onboarding i utrata kontekstu bolą tu najbardziej.",
      "aud.2t": "Agencje cyfrowe i kreatywne", "aud.2p": "Wielu klientów, dużo kontekstu — kto co ustalił i dlaczego. Trzymaj to w jednym miejscu.",
      "aud.3t": "Konsulting i usługi IT", "aud.3p": "Wiedza jest produktem. Jej utrata to najdroższa rzecz, jaka może się zdarzyć.",

      "cmp.kicker": "To nie kolejne wiki",
      "cmp.h2": "Różnica polega na tym, kto wykonuje pracę.",
      "cmp.old.h": "Sposób ręczny", "cmp.new.h": "Z Certemis",
      "cmp.o1": "Ktoś musi pisać i aktualizować każdą stronę.",
      "cmp.o2": "Odpowiedzi żyją w pięciu czatach — często sprzeczne.",
      "cmp.o3": "Gdy odchodzi senior, odchodzi też kontekst.",
      "cmp.n1": "Kontekst zapisywany automatycznie w trakcie pracy.",
      "cmp.n2": "Jedna aktualna odpowiedź, w zakresie Twoich uprawnień.",
      "cmp.n3": "Wiedza zostaje w firmie, nie w głowach.",

      "term.kicker": "W praktyce",
      "term.h2": "Pytaj naturalnym językiem. Dostań odpowiedź firmy.",
      "term.title": "certemis - zapytanie",
      "term.q": "Jak wdrażamy serwis płatności?",
      "term.a": "// Odpowiedź złożona z repozytoriów, decyzji i dokumentów — w zakresie Twoich uprawnień.",

      "prod.kicker": "Produkt",
      "prod.h1": "Jedna warstwa pamięci dla całej wiedzy firmy.",
      "prod.p": "Certemis łączy wiedzę operacyjną rozproszoną po narzędziach i ludziach w jedną, świadomą uprawnień warstwę, którą cały zespół może odpytywać naturalnym językiem.",
      "prod.f.h2": "Zbudowane pod realną pracę technicznych zespołów.",
      "f1.t": "Szybszy onboarding", "f1.p": "Nowi pytają system, zamiast odrywać seniora od pracy dla klienta. Wdrożenie w dni, nie tygodnie.",
      "f2.t": "Ciągłość", "f2.p": "Wiedza o projektach i uzasadnienia decyzji zostają w firmie mimo rotacji ludzi.",
      "f3.t": "Jedno źródło prawdy", "f3.p": "„Jak my to robimy?” ma jedną aktualną odpowiedź — nie pięć sprzecznych w pięciu czatach.",
      "f4.t": "EU-first i prywatność", "f4.p": "Rezydencja danych w UE, zgodność z RODO, DPA z każdym klientem i brak treningu modeli na Twoich danych.",
      "f5.t": "Uprawnienia respektowane", "f5.p": "Kontrola dostępu sprawia, że system nie pokazuje nikomu więcej, niż mu wolno.",
      "f6.t": "Niskie utrzymanie", "f6.p": "Utrwala kontekst automatycznie — bez dyscypliny, jakiej wymaga ręczne wiki.",
      "prod.sec.kicker": "Bezpieczeństwo",
      "prod.sec.h2": "Twoja wiedza traktowana jak najwrażliwszy zasób.",
      "prod.sec.p": "Szyfrowanie w tranzycie i w spoczynku, ścisła izolacja tenantów, rezydencja danych w UE, umowa powierzenia (DPA) z każdym klientem oraz jasne zobowiązanie umowne, że Twoje dane nigdy nie służą do trenowania modeli.",
      "prod.cta": "Poproś o wczesny dostęp",

      "how.kicker": "Jak to działa",
      "how.h1": "Konfigurujesz raz. Działa od pierwszego dnia.",
      "how.p": "Cztery kroki od rozproszonej wiedzy do żywej pamięci, którą odpyta cały zespół.",
      "s1.t": "Podłącz źródła wiedzy", "s1.p": "Wskaż Certemis, gdzie już żyje Twoja wiedza. Sam decydujesz, co system pamięta — a czego nigdy nie dotyka.",
      "s2.t": "Porządkuje i indeksuje automatycznie", "s2.p": "Certemis wczytuje i strukturyzuje kontekst w tle. Bez ręcznego tagowania i pracy dla zespołu.",
      "s3.t": "Zespół po prostu pyta", "s3.p": "Każdy dostaje odpowiedzi na żądanie, naturalnym językiem, ściśle w zakresie swoich uprawnień.",
      "s4.t": "Wiedza się kumuluje", "s4.p": "W miarę pracy pamięć rośnie — firma mądrzeje z czasem, zamiast zapominać.",
      "how.cta.h2": "Bądź wśród pierwszych zespołów na Certemis.",
      "how.cta.btn": "Dołącz do listy",

      "about.kicker": "O Certemis",
      "about.h1": "Sprawiamy, że wiedza firmy nie wychodzi razem z ludźmi.",
      "about.p": "Certemis buduje warstwę pamięci operacyjnej dla zespołów, których najcenniejsza wiedza żyje w głowach ludzi. Jesteśmy na wczesnym etapie - skupieni i budujący razem z zespołami, które najmocniej odczuwają ten problem.",
      "about.mission.kicker": "Nasza misja",
      "about.mission.h": "Sprawić, by wiedza firmy przetrwała ludzi, którzy ją trzymają.",
      "about.mission.p": "Każdy zespół traci kontekst, gdy ktoś odchodzi, bierze urlop albo po prostu zapomina. Założyliśmy Certemis, bo ta strata jest cicha, ciągła i kosztowna - a żadne wiki nigdy jej naprawdę nie rozwiązało. Naszą misją jest dać firmom własną pamięć: jedno miejsce, które pamięta, jak naprawdę wykonuje się pracę, i oddaje to w chwili, gdy ktokolwiek tego potrzebuje.",
      "about.values.kicker": "W co wierzymy",
      "about.values.h": "Zasady, według których budujemy.",
      "about.v1t": "Wiedza należy do firmy",
      "about.v1p": "Kontekst nie powinien żyć ani ginąć razem z pojedynczymi osobami. Budujemy tak, by to, czego uczy się zespół, zostawało w firmie - dostępne, aktualne i nigdy zamknięte w jednej głowie.",
      "about.v2t": "Prywatność to nie dodatek",
      "about.v2p": "Twoja wiedza to najwrażliwszy zasób, więc tak ją traktujemy od pierwszego dnia - EU-first, świadoma uprawnień i nigdy nieużywana do trenowania modeli na Twoich danych.",
      "about.v3t": "Użyteczne ponad efektowne",
      "about.v3p": "Wolimy zdobyć zaufanie czymś, co po cichu działa, niż pokazać demo, które olśniewa tylko raz. Każdą decyzję mierzymy tym, czy pomaga realnym zespołom w realnej pracy.",
      "about.why.kicker": "Dlaczego teraz",
      "about.why.h": "Dlaczego pamięć operacyjna i dlaczego teraz.",
      "about.why.p": "Zespoły nigdy nie tworzyły tyle kontekstu - w repozytoriach, czatach, dokumentach i decyzjach - i nigdy nie było im trudniej go utrzymać. Narzędzia, które potrafią wreszcie czytać i łączyć ten kontekst naturalnym językiem, stały się praktyczne dopiero niedawno. Uważamy, że to właściwy moment, by budować pamięć utrwalającą sposób pracy firmy w trakcie jej trwania, zamiast prosić ludzi, by spisywali wszystko po fakcie.",
      "about.cta.h": "Budujemy Certemis z naszymi pierwszymi zespołami.",
      "about.cta.btn": "Dołącz do listy",

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
      "q4": "Dla kogo jest Certemis?", "a4": "Dla zespołów, w których wiedza operacyjna jest kluczowa, a ludzie rotują — software house'y, agencje i firmy konsultingowe.",
      "q5": "Jak chronione są nasze dane?", "a5": "Rezydencja danych w UE, zgodność z RODO, DPA z każdym klientem, szyfrowanie w tranzycie i spoczynku, ścisła izolacja tenantów i brak treningu modeli na Twoich danych.",
      "msg.invalid": "Podaj prawidłowy e-mail służbowy.",
      "msg.demo": "Dziękujemy — Twoja aplikacja została zapisana. (Tryb demo: podłącz endpoint formularza, by odbierać zgłoszenia.)",
      "msg.ok": "Dziękujemy — aplikacja przyjęta. Odezwiemy się w okolicach startu.",
      "msg.err": "Coś poszło nie tak. Napisz na hello@certemis.com, a dodamy Cię ręcznie."
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
  }

  function setLang(l) {
    if (!I18N[l]) return;
    lang = l; localStorage.setItem(LS_KEY, l); apply();
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply();

    var langSel = document.getElementById("langSel");
    if (langSel) langSel.addEventListener("change", function () { setLang(langSel.value); });

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
  });
})();
