"use strict";
function $(id){return document.getElementById(id)}
function run(fn){try{fn()}catch(e){console.error('[demo]',e)}}
var ICONS={
 github:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 5 18 5c.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg>',
 slack:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 15.2a2 2 0 1 1-2-2h2zm1 0a2 2 0 0 1 4 0v5a2 2 0 1 1-4 0zM8 5a2 2 0 1 1 2-2v2zm0 1a2 2 0 0 1 0 4H3a2 2 0 1 1 0-4zm11 3.2a2 2 0 1 1 2 2h-2zm-1 0a2 2 0 0 1-4 0v-5a2 2 0 1 1 4 0zM16 19a2 2 0 1 1-2 2v-2zm0-1a2 2 0 0 1 0-4h5a2 2 0 1 1 0 4z"/></svg>',
 confluence:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.4 16.6c-.2.4-.1.8.3 1l3.4 2.1c.4.2.8.1 1-.3.2-.4 2-3.3 6.4-1.2l3.4 1.6c.4.2.9 0 1-.4l1.6-3.7c.2-.4 0-.8-.4-1-1-.5-3-1.4-4.8-2.3-6.5-3.1-11-1.2-12 .5zm19.2-9.2c.2-.4.1-.8-.3-1l-3.4-2.1c-.4-.3-.8-.1-1 .3-.2.4-2 3.3-6.4 1.2L7.1 4.2c-.4-.2-.9 0-1 .4L4.5 8.3c-.2.4 0 .8.4 1 1 .5 3 1.4 4.8 2.3 6.5 3.1 11 1.1 12-.6z"/></svg>',
 drive:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.7 3.5 1.2 15l3.2 5.5 6.5-11.3zm8.6 0H9.9l6.5 11.3H23zM6 16.3 2.8 21.8h13l3.2-5.5z"/></svg>',
 notion:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 3.7 14.8 3c1.3-.1 1.6 0 2.4.6l3.3 2.3c.5.4.7.5.7 1v13.4c0 .8-.3 1.3-1.3 1.4l-12 .7c-.8 0-1.2-.1-1.6-.7L3.3 18c-.4-.6-.6-1-.6-1.6V5c0-.7.3-1.2 1.1-1.3zm10.8 2.6c0-.6-.3-.8-1-.7l-6.4.4c-.5.1-.6.3-.4.6l1.6 1.3 3.4-.2c.5 0 .6-.3.4-.5zm.3 13V8.4c0-.4-.1-.6-.5-.5l-3.4.2c-.4 0-.5.3-.5.6v10.5c0 .4.2.5.6.5l3.3-.2c.4 0 .5-.2.4-.6z"/></svg>',
 jira:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.6 0H23a5.4 5.4 0 0 1-5.4 5.4h-2.1v2a5.4 5.4 0 0 1-5.3 5.4V1.1C10.2.5 10.7 0 11.6 0zM6 5.7h11.4A5.4 5.4 0 0 1 12 11h-2v2.1a5.4 5.4 0 0 1-5.4 5.3V6.8c0-.6.5-1 1.1-1z"/></svg>',
 linear:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.1 13.4 10.6 22a10 10 0 0 1-8.5-8.6zM2 11.2 12.8 22A10 10 0 0 0 22 12.8L11.2 2A10 10 0 0 0 2 11.2zM4.3 6.6 17.4 19.7A10 10 0 0 0 20 17L7 4A10 10 0 0 0 4.3 6.6z"/></svg>',
 gdocs:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm0 0v6h6M8 13h8M8 17h6"/></svg>',
 asana:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="6.5" r="3.2"/><circle cx="6.2" cy="16" r="3.2"/><circle cx="17.8" cy="16" r="3.2"/></svg>',
 teams:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 6.5a3 3 0 1 1-3-3 3 3 0 0 1 3 3zM20 8a2.2 2.2 0 1 1-2.2-2.2A2.2 2.2 0 0 1 20 8zM3 10h11v7a4 4 0 0 1-4 4 4 4 0 0 1-4-4v-1H3zm14 .5h4V16a3 3 0 0 1-4 2.8z"/></svg>',
 gitlab:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 22 3.7-11.3H8.3zM3 10.7 4.6 5.6 6.2 10.7zM21 10.7l-1.6-5.1-1.6 5.1zm-18 0L12 22 3 10.7h.0zm18 0L12 22l9-11.3z"/></svg>',
 zendesk:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 7v15L3 22zm2 9.5a4.5 4.5 0 0 1 9 0H13zM11 7.5a4.5 4.5 0 0 1-9 0h9zM13 2h8l-8 9z"/></svg>'
};
function ico(k){return ICONS[k]||''}

/* ===== toast ===== */
function toast(msg,kind){
  var t=document.createElement('div');t.className='toast';
  var c=kind==='info'?'var(--acc)':'var(--ok)';
  t.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="'+c+'" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>'+msg;
  $('toastWrap').appendChild(t);
  setTimeout(function(){t.style.opacity='0';t.style.transition='.3s';setTimeout(function(){t.remove()},300)},2600);
}
/* ===== modal ===== */
function openModal(html){$('modalBox').innerHTML=html;$('modalMask').classList.add('on');}
function closeModal(){$('modalMask').classList.remove('on');}
$('modalMask').addEventListener('click',function(e){if(e.target===$('modalMask'))closeModal();});

/* ===== i18n ===== */
var DICT={en:{},pl:{
 tour:"Przewodnik",language:"Język",notifications:"Powiadomienia",
 ntf1t:"Wykryto lukę w wiedzy",ntf1d:"5 pytań bez pewnej odpowiedzi w tym tygodniu.",
 ntf2t:"Synchronizacja zakończona",ntf2d:"Slack zsynchronizował 14 nowych wiadomości.",
 ntf3t:"Nowy członek zespołu",ntf3d:"Aisha Said przyjęła zaproszenie.",
 back:"Wróć do strony",pricing:"Cennik",waitlist:"Dołącz do listy",
 g_operate:"Praca",nav_ask:"Pytaj i znajduj",nav_saved:"Zapisane odpowiedzi",
 g_knowledge:"Wiedza",nav_sources:"Połączone źródła",nav_ingestion:"Status synchronizacji",nav_gaps:"Luki w wiedzy",
 g_team:"Zespół",nav_members:"Członkowie i role",nav_audit:"Dziennik audytu",
 g_insights:"Analizy",nav_analytics:"Analityka",nav_reports:"Raporty",nav_settings:"Ustawienia",
 ws_plan:"Demo · 42 miejsca",
 ask_title:"Zapytaj firmę o cokolwiek",ask_sub:"Wpisz pytanie zwykłym językiem. Certemis tworzy odpowiedź z Twoich narzędzi i pokazuje dokładne źródła.",
 ask_step1:"1 · Twoje pytanie",ask_btn:"Zapytaj",ask_step2:"2 · Odpowiedź",ask_genfrom:"Na podstawie",ask_sources_l:"źródeł",
 save:"Zapisz",copy:"Kopiuj",ask_helpful:"Pomocne?",ask_step3:"3 · Źródła tej odpowiedzi",
 ask_src_hint:"To dokumenty, z których powstała odpowiedź. Kliknij źródło, aby je otworzyć.",
 th_source:"Źródło",th_document:"Dokument",th_confidence:"Pewność",th_access:"Dostęp",
 lg_high:"Wysoka pewność (90%+)",lg_good:"Dobra (75–89%)",lg_partial:"Częściowa (<75%)",lg_restricted:"widoczne tylko dla osób z dostępem",
 saved_title:"Zapisane odpowiedzi",saved_sub:"Uporządkowana, wielokrotnego użytku wiedza — pogrupowana w kolekcje dla całego zespołu. Otwórz kolekcję, aby zobaczyć odpowiedzi.",
 saved_new:"Nowa kolekcja",saved_all:"Wszystkie kolekcje",
 src_title:"Połączone źródła",src_sub:"Certemis czyta z narzędzi, których już używasz. Połącz lub odłącz dowolne źródło i zdecyduj, co pozostaje poza zasięgiem.",
 src_request:"Poproś o integrację",src_add:"Dodaj integrację",src_offlimits:"Ty decydujesz, co jest wyłączone",src_addexcl:"Dodaj wykluczenie",
 ing_title:"Status synchronizacji",ing_sub:"Każda synchronizacja jest śledzona. Uruchom ją na żądanie, wstrzymaj źródło i sprawdź, co jest w pamięci.",
 ing_syncall:"Synchronizuj wszystko",ing_k1:"Elementy w pamięci",ing_k2:"Zsync. w 24h",ing_k3:"Śr. czas synchr.",ing_k4:"Błędy (24h)",
 ing_healthy:"▲ w normie",ing_persource:"na źródło",ing_allgood:"wszystko OK",
 th_items:"Elementy",th_progress:"Postęp",th_status:"Status",th_lastsync:"Ostatnia synchr.",
 gap_title:"Luki w wiedzy",gap_sub:"Pytania zespołu, na które Certemis nie odpowiedział z pewnością. Zamknij lukę, dodając źródło lub przypisując właściciela.",
 gap_k1:"Otwarte luki",gap_k2:"Zamknięte (30d)",gap_k3:"Pokrycie odpowiedzi",gap_k4:"Śr. pewność",
 th_question:"Pytanie",th_asked:"Pytano",th_bestconf:"Najlepsza pewność",th_suggested:"Sugerowane działanie",
 mem_title:"Członkowie i role",mem_sub:"Kontrola dostępu oparta na rolach. Każdy widzi tylko to, na co pozwala jego rola.",
 mem_invite:"Zaproś członka",mem_members:"Członkowie",mem_matrix:"Uprawnienia wg roli",
 th_member:"Członek",th_role:"Rola",th_sources:"Źródła",th_lastactive:"Ostatnia aktywność",th_permission:"Uprawnienie",
 perm_ask:"Pytaj i znajduj",perm_restricted:"Widzi źródła ograniczone",perm_managesrc:"Zarządza źródłami",perm_managemem:"Zarządza członkami i rolami",perm_audit:"Widzi dziennik audytu",perm_billing:"Rozliczenia i plan",
 aud_title:"Dziennik audytu",aud_sub:"Niezmienialny zapis każdego dostępu, synchronizacji i zmiany. Filtruj, szukaj i eksportuj dla audytorów.",
 aud_export:"Eksport CSV",aud_compliance:"Stworzony pod audyty <b>SOC 2</b>, <b>ISO 27001</b> i <b>GDPR</b> — każde zdarzenie jest niezmienialne i można je wyeksportować.",
 aud_search:"Szukaj zdarzeń…",aud_allactions:"Wszystkie akcje",aud_today:"Dziś",aud_7d:"Ostatnie 7 dni",aud_30d:"Ostatnie 30 dni",
 th_time:"Czas",th_actor:"Osoba",th_action:"Akcja",th_target:"Cel",aud_loadmore:"Pokaż więcej",
 an_title:"Analityka",an_sub:"O co pyta zespół, jak dobrze jest to odpowiedziane i ile czasu Certemis oszczędza.",
 an_7d:"7d",an_30d:"30d",an_90d:"90d",an_export:"Eksport raportu",
 an_k1:"Odpowiedzi",an_k2:"Śr. czas odpowiedzi",an_k3:"Zaoszcz. czas",an_k4:"Aktywni członkowie",
 an_trend:"Odpowiedzi w czasie",an_coverage:"Pokrycie wiedzy",
 an_cov1:"91% odpowiedzi z wysoką pewnością",an_cov2:"7% częściowych — zasugeruj dodanie źródła",an_cov3:"2% bez odpowiedzi — oznaczono lukę",
 an_topics:"Najczęstsze tematy",topic_onboarding:"Onboarding",topic_arch:"Architektura",topic_client:"Projekty klientów",topic_incidents:"Incydenty",topic_billing:"Rozliczenia / proces",an_active:"Najaktywniejsi członkowie",
 rep_title:"Raporty",rep_sub:"Cykliczne i na żądanie raporty do udostępnienia zarządowi, działowi bezpieczeństwa i audytorom.",
 set_title:"Ustawienia",set_sub:"Workspace, wygląd, język, bezpieczeństwo i powiadomienia.",
 set_workspace:"Workspace",set_wsname:"Nazwa workspace",set_region:"Region danych",set_seats:"Wykorzystanie miejsc",set_seatsuse:"Użyto 5 z 42 miejsc",set_billing:"Zarządzaj rozliczeniami",
 set_security:"Bezpieczeństwo",sec_2fa:"Wymagaj 2FA",sec_2fa_d:"Każdy członek musi logować się z 2FA.",sec_sso:"SSO / SAML",sec_sso_d:"Logowanie przez Twojego dostawcę tożsamości.",
 sec_ip:"Lista dozwolonych IP",sec_ip_d:"Ogranicz dostęp do biura i zakresów VPN.",sec_eu:"Rezydencja danych w UE",sec_eu_d:"Przechowuj i przetwarzaj dane w UE.",
 sec_timeout:"Wygasanie sesji",sec_timeout_d:"Wyloguj członków po bezczynności.",set_sessions:"Aktywne sesje",set_revoke:"Odbierz",
 set_appearance:"Wygląd",set_theme:"Motyw",set_light:"Jasny",set_dark:"Ciemny",set_language:"Język",set_accent:"Kolor akcentu",
 set_notif:"Powiadomienia",ntf_digest:"Tygodniowy przegląd wiedzy",ntf_digest_d:"Poniedziałkowe podsumowanie pytań zespołu.",
 ntf_sec:"Alerty bezpieczeństwa",ntf_sec_d:"Nowe logowania, zmiany ról, eksporty.",ntf_gap:"Alerty o lukach",ntf_gap_d:"Gdy pytania pozostają bez odpowiedzi.",
 ntf_sync:"Błędy synchronizacji",ntf_sync_d:"Gdy źródło przestaje się synchronizować.",
 set_data:"Dane i prywatność",set_retention:"Przechowywanie danych",set_retention_d:"Jak długo trzymane są zaindeksowane treści.",set_unlimited:"Bez limitu",
 set_exportdata:"Eksportuj dane workspace",set_delete:"Usuń workspace",set_delete_d:"Tylko właściciel może usunąć. Wyłączone w demie.",
 tour_skip:"Pomiń",nudge_txt:"<b>Pierwszy raz?</b> Skorzystaj z szybkiego przewodnika — pokażemy, co robi każda część i co możesz wypróbować.",nudge_start:"Rozpocznij",nudge_later:"Może później",
 m_save:"Zapisz",m_cancel:"Anuluj",m_create:"Utwórz",m_send:"Wyślij",m_connect:"Połącz",m_invite:"Wyślij zaproszenie",m_add:"Dodaj",
 t_saved:"Odpowiedź zapisana",t_copied:"Skopiowano do schowka",t_feedback:"Dzięki za opinię",t_colcreated:"Utworzono kolekcję",t_connected:"Źródło połączone",t_disconnected:"Źródło odłączone",t_reqsent:"Prośba wysłana — zespół Certemis się odezwie",t_excladded:"Dodano wykluczenie",t_synced:"Synchronizacja zakończona",t_paused:"Źródło wstrzymane",t_resumed:"Wznowiono synchronizację",t_invited:"Zaproszenie wysłane",t_removed:"Usunięto członka",t_rolechg:"Zmieniono rolę",t_exported:"Wyeksportowano plik CSV",t_revoked:"Sesja odebrana",t_reportdl:"Pobrano raport",t_dataexp:"Przygotowano eksport danych",t_wsname:"Zapisano nazwę workspace",
 mt_newcol:"Nowa kolekcja",md_newcol:"Pogrupuj powiązane odpowiedzi w jednym miejscu.",f_name:"Nazwa",f_color:"Kolor",
 mt_addint:"Dodaj integrację",md_addint:"Połącz kolejne narzędzie ze swoją pamięcią operacyjną.",
 mt_reqint:"Poproś o integrację",md_reqint:"Nie ma Twojego narzędzia? Powiedz, czego potrzebujesz — zespół Certemis się odezwie.",
 f_tool:"Narzędzie",f_scope:"Czego potrzebujesz i w jakim zakresie?",f_email:"E-mail kontaktowy",
 mt_invite:"Zaproś członka",md_invite:"Wyślij zaproszenie i od razu ustaw rolę oraz zakres źródeł.",f_role:"Rola",f_scopeacc:"Zakres źródeł",
 mt_addexcl:"Dodaj wykluczenie",md_addexcl:"Wyklucz źródło lub ścieżkę z pamięci.",f_path:"Kanał, folder lub ścieżka",
 connect:"Połącz",disconnect:"Odłącz",configure:"Konfiguruj",connected:"Połączono",notconnected:"Niepołączone",
 syncnow:"Synchronizuj",pause:"Wstrzymaj",resume:"Wznów",uptodate:"Aktualne",syncing:"Synchronizacja",paused:"Wstrzymane",
 gap_addsrc:"Dodaj źródło",gap_assign:"Przypisz właściciela",remove:"Usuń",askagain:"Zapytaj ponownie",
 rep_download:"Pobierz",rep_schedule:"Harmonogram",rep_on:"włączony",rep_off:"wyłączony"
}};
var LANG='en';
function t(k){var d=DICT[LANG]&&DICT[LANG][k];return d!=null?d:(DICT.en[k]!=null?DICT.en[k]:k);}
function applyLang(){
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var k=el.getAttribute('data-i18n');if(LANG==='pl'&&DICT.pl[k]!=null)el.innerHTML=DICT.pl[k];else if(el.hasAttribute('data-en'))el.innerHTML=el.getAttribute('data-en');
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(function(el){var k=el.getAttribute('data-i18n-ph');if(LANG==='pl'&&DICT.pl[k]!=null)el.placeholder=DICT.pl[k];});
  document.documentElement.lang=LANG;
}
/* snapshot english defaults so we can switch back */
document.querySelectorAll('[data-i18n]').forEach(function(el){el.setAttribute('data-en',el.innerHTML);if(DICT.en[el.getAttribute('data-i18n')]==null)DICT.en[el.getAttribute('data-i18n')]=el.innerHTML;});
document.querySelectorAll('[data-i18n-ph]').forEach(function(el){if(DICT.en[el.getAttribute('data-i18n-ph')]==null)DICT.en[el.getAttribute('data-i18n-ph')]=el.placeholder;});
function setLang(l){LANG=l;applyLang();
  document.querySelectorAll('[data-lang]').forEach(function(o){o.classList.toggle('sel',o.getAttribute('data-lang')===l)});
  document.querySelectorAll('#langSeg button').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-lang-set')===l)});
  try{localStorage.setItem('certemis-demo-lang',l)}catch(e){}
  rerender();
}
Object.assign(DICT.en,{
 m_save:"Save",m_cancel:"Cancel",m_create:"Create",m_send:"Send",m_connect:"Connect",m_invite:"Send invitation",m_add:"Add",
 t_saved:"Answer saved",t_copied:"Copied to clipboard",t_feedback:"Thanks for the feedback",t_colcreated:"Collection created",t_connected:"Source connected",t_disconnected:"Source disconnected",t_reqsent:"Request sent — the Certemis team will reach out",t_excladded:"Exclusion added",t_synced:"Sync complete",t_paused:"Source paused",t_resumed:"Sync resumed",t_invited:"Invitation sent",t_removed:"Member removed",t_rolechg:"Role updated",t_exported:"CSV exported",t_revoked:"Session revoked",t_reportdl:"Report downloaded",t_dataexp:"Data export prepared",t_wsname:"Workspace name saved",
 mt_newcol:"New collection",md_newcol:"Group related answers in one place.",f_name:"Name",f_color:"Color",
 mt_addint:"Add integration",md_addint:"Connect another tool to your operational memory.",
 mt_reqint:"Request an integration",md_reqint:"Don't see your tool? Tell us what you need — the Certemis team will reach out.",
 f_tool:"Tool",f_scope:"What do you need, and in what scope?",f_email:"Contact email",
 mt_invite:"Invite member",md_invite:"Send an invitation and set their role and source scope.",f_role:"Role",f_scopeacc:"Source scope",
 mt_addexcl:"Add exclusion",md_addexcl:"Exclude a source or path from memory.",f_path:"Channel, folder or path",
 connect:"Connect",disconnect:"Disconnect",configure:"Configure",connected:"Connected",notconnected:"Not connected",
 syncnow:"Sync now",pause:"Pause",resume:"Resume",uptodate:"Up to date",syncing:"Syncing",paused:"Paused",
 gap_addsrc:"Add source",gap_assign:"Assign owner",remove:"Remove",askagain:"Ask again",
 rep_download:"Download",rep_schedule:"Schedule",rep_on:"on",rep_off:"off"
});

/* ===== ASK ===== */
function srcRow(ico,name,doc,conf,access,accBadge){
  var cls=conf>=90?'ok':(conf>=75?'':'warn');
  return '<tr><td><div class="row"><span class="src-ico">'+ico(arguments[0])+'</span> '+name+'</div></td><td>'+doc+'</td><td><div class="conf"><div class="conf-bar '+cls+'"><i style="width:'+conf+'%"></i></div><span class="conf-num">'+conf+'%</span></div></td><td><span class="badge '+accBadge+'">'+access+'</span></td></tr>';
}
function sr(k,name,doc,conf,access,accBadge){
  var cls=conf>=90?'ok':(conf>=75?'':'warn');
  return '<tr><td><div class="row"><span class="src-ico">'+ico(k)+'</span> '+name+'</div></td><td>'+doc+'</td><td><div class="conf"><div class="conf-bar '+cls+'"><i style="width:'+conf+'%"></i></div><span class="conf-num">'+conf+'%</span></div></td><td><span class="badge '+accBadge+'">'+access+'</span></td></tr>';
}
var ASKDATA={
 payments:{q:"How did we resolve the payments outage in March, and who owns the runbook?",time:'3.1',a:'The March payments outage (Mar 14, 2026) was caused by the payment provider rejecting retries after a token refresh failure.<span class="cite">1</span> The team mitigated it by switching to the failover provider and shipping a fix to the retry logic that backs off and re-authenticates before retrying.<span class="cite">2</span> The incident was fully resolved in 1h 47m.<span class="cite">1</span><br><br>The <b>payment failover runbook</b> is owned by <b>Marta Kowalska (Platform lead)</b>, last reviewed Apr 2, 2026.<span class="cite">3</span> The retry fix was authored by <b>Daniel Reyes</b> and reviewed by Marta.<span class="cite">2</span>',
  s:[['slack','Slack · #incidents','Postmortem: payments outage — Mar 14',96,'All members','neutral'],['github','GitHub · northwind/api','PR #1284 — retry backoff &amp; re-auth',92,'Engineering','neutral'],['confluence','Confluence','Runbook: payment provider failover',88,'Engineering','neutral'],['drive','Google Drive','Q1 incident review (deck)',74,'Restricted','acc']]},
 db:{q:"What did we decide about our database stack?",time:'2.4',a:'You standardised on <b>PostgreSQL with the pgvector extension</b> as the primary store — decided in <b>ADR-002</b> (Feb 2026).<span class="cite">1</span> The rationale: one database for both relational data and vector search, hosted in the EU, avoiding a separate vector database to operate.<span class="cite">2</span> Owner: <b>Daniel Reyes</b>. Recorded trade-off: revisit a dedicated vector store if embeddings exceed ~5M rows.<span class="cite">1</span>',
  s:[['github','GitHub · northwind/stack','ADR-002 — database &amp; vector search',95,'Engineering','neutral'],['slack','Slack · #architecture','Thread: Postgres vs dedicated vector DB',90,'All members','neutral'],['confluence','Confluence','Data stack overview',86,'Engineering','neutral']]},
 onboard:{q:"How do I onboard a new backend engineer?",time:'2.8',a:'<b>Day 1:</b> request access via SSO in <b>#it</b>, clone <b>northwind/api</b> and run <code>make setup</code>.<span class="cite">1</span> <b>Week 1:</b> pair with your buddy on a starter ticket and read the <b>Architecture decisions</b> collection.<span class="cite">2</span> Across the last five hires, the <b>average time to first merged PR was 4 days</b>.<span class="cite">3</span>',
  s:[['confluence','Confluence','Engineering onboarding checklist',94,'Engineering','neutral'],['slack','Slack · #onboarding','Buddy assignment thread',88,'All members','neutral'],['github','GitHub · northwind/api','README — local setup',85,'Engineering','neutral']]},
 atlas:{q:"What are the open risks on the Atlas Bank project?",time:'3.0',a:'There are <b>three open risks</b> on Atlas Bank: (1) security questionnaire due <b>Jun 12</b> — owner Marta;<span class="cite">1</span> (2) data residency must be <b>EU-only</b>, confirmed;<span class="cite">2</span> (3) third-party KYC vendor SLA <b>not yet signed</b> — blocking go-live.<span class="cite">3</span> Last status update was 3 days ago.',
  s:[['drive','Google Drive','Atlas Bank — risk register',93,'Restricted','acc'],['slack','Slack · #client-atlas','Weekly status update',89,'Project team','neutral'],['jira','Jira · ATLAS','Epic: compliance &amp; go-live',82,'Project team','neutral']]},
 billing:{q:"Who knows our billing module best?",time:'2.2',a:'By contribution and recent activity, the strongest owner of the billing module is <b>Daniel Reyes</b> — 42 commits to <code>billing/*</code> and author of the invoicing service.<span class="cite">1</span> <b>Aisha Said</b> is the next best contact.<span class="cite">2</span> <b>Marta Kowalska</b> reviewed the original design.<span class="cite">3</span>',
  s:[['github','GitHub · northwind/api','billing/ — commit history',96,'Engineering','neutral'],['slack','Slack · #billing','Recent invoicing fixes',87,'All members','neutral'],['confluence','Confluence','Billing architecture',84,'Engineering','neutral']]}
};
function fb(q){return{q:q,time:(2+Math.random()).toFixed(1),a:'I searched across Slack, GitHub, Confluence and Google Drive for <b>"'+q.replace(/</g,'&lt;')+'"</b>. Below are the most relevant sources — open any of them to read the detail.',s:[['slack','Slack · #general','Most relevant discussion',71,'All members','neutral'],['confluence','Confluence','Related page',64,'Engineering','neutral']]};}
var currentAns=null;
function renderAns(d){
  currentAns=d;
  $('srcCount').textContent=d.s.length;$('genTime').textContent=d.time;
  $('answerText').innerHTML=d.a;
  $('srcBody').innerHTML=d.s.map(function(r){return sr(r[0],r[1],r[2],r[3],r[4],r[5])}).join('');
  var sv=$('saveAns');sv.classList.remove('accent');sv.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>'+t('save');
}
function ask(d){$('srcCount').textContent='…';$('answerText').innerHTML='<span class="typing"><i></i><i></i><i></i></span>';$('srcBody').innerHTML='';setTimeout(function(){renderAns(d)},850);}
function runInput(){var v=$('askInput').value.trim(),hit=null;for(var k in ASKDATA){if(ASKDATA[k].q.toLowerCase()===v.toLowerCase()){hit=ASKDATA[k];break}}ask(hit||fb(v||'(empty)'));}
run(function(){
  renderAns(ASKDATA.payments);
  $('askGo').addEventListener('click',runInput);
  $('askInput').addEventListener('keydown',function(e){if(e.key==='Enter')runInput()});
  document.querySelectorAll('.chip').forEach(function(c){c.addEventListener('click',function(){var d=ASKDATA[c.getAttribute('data-key')];$('askInput').value=d.q;ask(d)})});
  $('saveAns').addEventListener('click',function(){this.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>'+(LANG==='pl'?'Zapisano':'Saved');this.classList.add('accent');toast(t('t_saved'))});
  $('copyAns').addEventListener('click',function(){var tx=$('answerText').innerText;if(navigator.clipboard)navigator.clipboard.writeText(tx)['catch'](function(){});toast(t('t_copied'))});
  $('thumbUp').addEventListener('click',function(){toast(t('t_feedback'))});
  $('thumbDown').addEventListener('click',function(){toast(t('t_feedback'))});
});

/* ===== SAVED collections ===== */
var COLLECTIONS=[
 {id:'onboarding',name:'Onboarding',color:'#2E5BFF',desc:'Setup, accounts, who-does-what',n:12,when:'2d ago',icon:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9"/>',items:[{q:'How do I onboard a new backend engineer?',a:'Day 1 SSO access, clone repo, run make setup. Week 1 pair on a starter ticket. Avg 4 days to first merged PR.',src:'Confluence · Slack · GitHub'},{q:'What accounts does a new hire need?',a:'SSO, GitHub org, Slack, 1Password and EU staging. Requested in #it.',src:'Confluence'},{q:'Who is my onboarding buddy?',a:'Assigned by the team lead on day one, posted in #onboarding.',src:'Slack'}]},
 {id:'incidents',name:'Incidents & postmortems',color:'#ef4444',desc:'What broke, root cause, fixes',n:8,when:'6h ago',icon:'<path d="M10.3 3.6 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/>',items:[{q:'How did we resolve the March payments outage?',a:'Provider rejected retries after token refresh failure. Failover + retry fix. Resolved in 1h 47m.',src:'Slack · GitHub · Confluence'},{q:'What is our incident severity scale?',a:'SEV1 outage, SEV2 degraded, SEV3 internal. SEV1/2 require a postmortem within 48h.',src:'Confluence'}]},
 {id:'architecture',name:'Architecture decisions',color:'#10b981',desc:'Why we chose what we chose',n:15,when:'1w ago',icon:'<path d="M12 2 2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',items:[{q:'What did we decide about our database stack?',a:'PostgreSQL + pgvector, one store, EU-hosted. ADR-002. Owner: Daniel.',src:'GitHub · Slack · Confluence'},{q:'Why Next.js over a separate SPA?',a:'Single codebase, SSR for SEO and faster first paint, easier hiring. ADR-001.',src:'GitHub'}]},
 {id:'atlas',name:'Client: Atlas Bank',color:'#f59e0b',desc:'Scope, contacts, open risks',n:6,when:'3d ago',icon:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',items:[{q:'What are the open risks on Atlas Bank?',a:'Security questionnaire due Jun 12, EU residency confirmed, KYC vendor SLA unsigned.',src:'Drive · Slack · Jira'},{q:'Who is the client contact?',a:'Their Head of Security; weekly sync Thursdays in #client-atlas.',src:'Slack'}]},
 {id:'process',name:'Processes & policies',color:'#8b5cf6',desc:'Reviews, releases, security',n:11,when:'4d ago',icon:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',items:[{q:'What is our code review policy?',a:'One approval, CI green, no direct pushes to main. Security changes need two reviewers.',src:'Confluence'},{q:'How do we ship a release?',a:'Tag main, CI builds, staging smoke test, promote to prod. Rollback is one command.',src:'GitHub · Confluence'}]}
];
function renderCollections(){
  var g=$('colGrid');g.innerHTML='';
  COLLECTIONS.forEach(function(c){
    var b=document.createElement('button');b.className='card col-card';
    b.innerHTML='<div class="col-ico" style="background:'+c.color+';border-color:transparent"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">'+c.icon+'</svg></div><div style="font-weight:600;font-size:15px">'+c.name+'</div><div class="tiny muted" style="margin-top:3px">'+c.desc+'</div><div class="row tiny muted" style="margin-top:14px;gap:14px"><span>'+c.n+' '+(LANG==='pl'?'odpowiedzi':'answers')+'</span><span>·</span><span>'+(LANG==='pl'?'Zaktualizowano':'Updated')+' '+c.when+'</span></div>';
    b.addEventListener('click',function(){openCollection(c)});
    g.appendChild(b);
  });
  var nb=document.createElement('div');nb.className='card col-card';nb.style.cssText='display:flex;align-items:center;justify-content:center;border-style:dashed;color:var(--tx-2);min-height:150px';
  nb.innerHTML='<div style="text-align:center"><div style="font-size:24px;line-height:1">+</div><div class="tiny" style="margin-top:6px">'+t('saved_new')+'</div></div>';
  nb.addEventListener('click',newCollection);g.appendChild(nb);
}
function openCollection(c){
  $('savedGrid').style.display='none';$('savedDetail').style.display='block';
  $('detTitle').textContent=c.name;$('detSub').textContent=c.n+' '+(LANG==='pl'?'zapisanych odpowiedzi · zaktualizowano':'saved answers · updated')+' '+c.when;
  $('detList').innerHTML=c.items.map(function(it){return '<div class="det-row"><div class="det-q">'+it.q+'</div><div class="det-a">'+it.a+'</div><div class="det-meta"><span>'+(LANG==='pl'?'Źródła':'Sources')+': '+it.src+'</span></div></div>'}).join('');
  $('main').scrollTop=0;
}
function newCollection(){
  openModal('<div class="modal-h"><div><div class="mt">'+t('mt_newcol')+'</div><div class="md">'+t('md_newcol')+'</div></div><div class="x" id="mx">&#10005;</div></div>'+
   '<div class="fld-row"><label class="fld-lbl">'+t('f_name')+'</label><input class="fld" id="ncName" placeholder="e.g. Security &amp; compliance"></div>'+
   '<div class="fld-row"><label class="fld-lbl">'+t('f_color')+'</label><div class="swatch-pick" id="ncColors">'+
     ['#2E5BFF','#ef4444','#10b981','#f59e0b','#8b5cf6','#0891b2'].map(function(c,i){return '<span class="swatch'+(i===0?' sel':'')+'" style="background:'+c+'" data-c="'+c+'"></span>'}).join('')+'</div></div>'+
   '<div class="modal-foot"><button class="btn" id="mc">'+t('m_cancel')+'</button><button class="btn accent" id="mok">'+t('m_create')+'</button></div>');
  var col='#2E5BFF';
  document.querySelectorAll('#ncColors .swatch').forEach(function(s){s.addEventListener('click',function(){document.querySelectorAll('#ncColors .swatch').forEach(function(x){x.classList.remove('sel')});s.classList.add('sel');col=s.getAttribute('data-c')})});
  $('mx').onclick=closeModal;$('mc').onclick=closeModal;
  $('mok').onclick=function(){var nm=$('ncName').value.trim()||(LANG==='pl'?'Nowa kolekcja':'New collection');COLLECTIONS.push({id:'c'+Date.now(),name:nm,color:col,desc:LANG==='pl'?'Pusta kolekcja':'Empty collection',n:0,when:LANG==='pl'?'teraz':'just now',icon:'<path d="M3 7h18M3 12h18M3 17h18"/>',items:[]});renderCollections();closeModal();toast(t('t_colcreated'))};
}
run(function(){renderCollections();$('newColBtn').addEventListener('click',newCollection);$('detBack').addEventListener('click',function(){$('savedDetail').style.display='none';$('savedGrid').style.display='block'})});

/* ===== SOURCES ===== */
var SOURCES=[
 {id:'github',name:'GitHub',meta:'northwind org',connected:true,desc:'Code, PRs, issues and decisions.',stats:[['4','repos'],['2,841','items'],['3m','sync']]},
 {id:'slack',name:'Slack',meta:'demo.slack.com',connected:true,desc:'Discussions and decisions.',stats:[['18','channels'],['19,402','items'],['now','sync']]},
 {id:'confluence',name:'Confluence',meta:'Engineering space',connected:true,desc:'Wikis and runbooks.',stats:[['126','pages'],['126','items'],['12m','sync']]},
 {id:'drive',name:'Google Drive',meta:'Shared drive',connected:true,desc:'Docs, decks and specs.',stats:[['2','folders'],['438','items'],['1h','sync']]},
 {id:'notion',name:'Notion',meta:'',connected:false,desc:'Sync wikis, specs and meeting notes.'},
 {id:'jira',name:'Jira',meta:'',connected:false,desc:'Pull tickets, epics and resolutions.'}
];
function renderSources(){
  var g=$('srcGrid');g.innerHTML='';var cc=0;
  SOURCES.forEach(function(s,idx){
    var card=document.createElement('div');card.className='card src-card';
    var head='<div class="top"><div class="src-logo">'+ico(s.id)+'</div><div><div style="font-weight:600">'+s.name+'</div><div class="src-meta">'+(s.connected?(s.meta||''):t('notconnected'))+'</div></div><div style="margin-left:auto">'+(s.connected?'<span class="badge ok"><span class="dot ok"></span>'+t('connected')+'</span>':'')+'</div></div>';
    var body;
    if(s.connected){cc++;
      var st=(s.stats||[]).map(function(x){return '<div><div class="n">'+x[0]+'</div><div class="l">'+x[1]+'</div></div>'}).join('');
      body='<div class="src-stat">'+st+'</div><div class="src-actions"><button class="btn sm" data-cfg="'+idx+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.3 1a7 7 0 0 0-1.7-1l-.3-2.5h-4l-.3 2.5a7 7 0 0 0-1.7 1l-2.3-1-2 3.4 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 1.7 1l.3 2.5h4l.3-2.5a7 7 0 0 0 1.7-1l2.3 1 2-3.4-2-1.5a7 7 0 0 0 .1-1z"/></svg>'+t('configure')+'</button><button class="btn sm danger" data-dis="'+idx+'">'+t('disconnect')+'</button></div>';
    } else {
      body='<div class="src-stat tiny muted" style="padding-top:14px">'+s.desc+'</div><div class="src-actions"><button class="btn sm accent" data-con="'+idx+'" style="width:100%">'+t('connect')+'</button></div>';
    }
    card.innerHTML=head+body;g.appendChild(card);
  });
  $('srcCountBadge').textContent=cc;
  g.querySelectorAll('[data-con]').forEach(function(b){b.addEventListener('click',function(){var s=SOURCES[+b.getAttribute('data-con')];s.connected=true;s.meta=(LANG==='pl'?'Połączono teraz':'Connected just now');s.stats=[['1','space'],[t('syncing'),'status'],['now','started']];renderSources();toast(t('t_connected'))})});
  g.querySelectorAll('[data-dis]').forEach(function(b){b.addEventListener('click',function(){var s=SOURCES[+b.getAttribute('data-dis')];s.connected=false;renderSources();toast(t('t_disconnected'))})});
  g.querySelectorAll('[data-cfg]').forEach(function(b){b.addEventListener('click',function(){toast(LANG==='pl'?'Otwarto konfigurację zakresu':'Opened scope configuration','info')})});
}
var AVAILABLE=[['linear','Linear'],['asana','Asana'],['teams','Microsoft Teams'],['gdocs','Google Docs'],['gitlab','GitLab'],['zendesk','Zendesk']];
function addIntegration(){
  openModal('<div class="modal-h"><div><div class="mt">'+t('mt_addint')+'</div><div class="md">'+t('md_addint')+'</div></div><div class="x" id="mx">&#10005;</div></div>'+
   '<div class="int-grid">'+AVAILABLE.map(function(a,i){return '<div class="int-card"><div class="src-logo">'+ico(a[0])+'</div><div class="int-name">'+a[1]+'</div><button class="btn sm accent" data-ai="'+i+'">'+t('connect')+'</button></div>'}).join('')+'</div>'+
   '<div class="modal-foot"><button class="btn" id="mc">'+t('m_cancel')+'</button><button class="btn" id="reqFromAdd">'+t('src_request')+'</button></div>');
  $('mx').onclick=closeModal;$('mc').onclick=closeModal;$('reqFromAdd').onclick=requestIntegration;
  document.querySelectorAll('[data-ai]').forEach(function(b){b.addEventListener('click',function(){var a=AVAILABLE[+b.getAttribute('data-ai')];SOURCES.push({id:a[0],name:a[1],meta:(LANG==='pl'?'Połączono teraz':'Connected just now'),connected:true,desc:'',stats:[['1','space'],[t('syncing'),'status'],['now','started']]});renderSources();closeModal();toast(t('t_connected'))})});
}
function requestIntegration(){
  openModal('<div class="modal-h"><div><div class="mt">'+t('mt_reqint')+'</div><div class="md">'+t('md_reqint')+'</div></div><div class="x" id="mx">&#10005;</div></div>'+
   '<div class="fld-row"><label class="fld-lbl">'+t('f_tool')+'</label><input class="fld" id="riTool" placeholder="e.g. HubSpot, Monday, Intercom…"></div>'+
   '<div class="fld-row"><label class="fld-lbl">'+t('f_scope')+'</label><textarea class="fld" id="riScope" rows="3" placeholder="e.g. read-only access to deals and notes"></textarea></div>'+
   '<div class="fld-row"><label class="fld-lbl">'+t('f_email')+'</label><input class="fld" id="riEmail" placeholder="you@company.com"></div>'+
   '<div class="modal-foot"><button class="btn" id="mc">'+t('m_cancel')+'</button><button class="btn accent" id="mok">'+t('m_send')+'</button></div>');
  $('mx').onclick=closeModal;$('mc').onclick=closeModal;$('mok').onclick=function(){closeModal();toast(t('t_reqsent'))};
}
var OFF=[{dot:'err',html:'Slack channels <b>#salaries</b>, <b>#founders</b> and any DM'},{dot:'err',html:'Google Drive folder <b>HR &amp; Contracts</b>'},{dot:'warn',html:'Restricted-source answers only shown to members with access'}];
function renderOff(){
  $('offList').innerHTML=OFF.map(function(o,i){return '<div class="off-item"><span class="dot '+o.dot+'"></span> '+o.html+'<span class="rm" data-off="'+i+'" title="'+t('remove')+'">&#10005;</span></div>'}).join('');
  document.querySelectorAll('[data-off]').forEach(function(x){x.addEventListener('click',function(){OFF.splice(+x.getAttribute('data-off'),1);renderOff()})});
}
function addExclusion(){
  openModal('<div class="modal-h"><div><div class="mt">'+t('mt_addexcl')+'</div><div class="md">'+t('md_addexcl')+'</div></div><div class="x" id="mx">&#10005;</div></div>'+
   '<div class="fld-row"><label class="fld-lbl">'+t('f_path')+'</label><input class="fld" id="exPath" placeholder="#channel, folder name or path"></div>'+
   '<div class="modal-foot"><button class="btn" id="mc">'+t('m_cancel')+'</button><button class="btn accent" id="mok">'+t('m_add')+'</button></div>');
  $('mx').onclick=closeModal;$('mc').onclick=closeModal;$('mok').onclick=function(){var v=$('exPath').value.trim();if(v)OFF.unshift({dot:'err',html:'<b>'+v.replace(/</g,'&lt;')+'</b>'});renderOff();closeModal();toast(t('t_excladded'))};
}
run(function(){renderSources();renderOff();$('addIntBtn').addEventListener('click',addIntegration);$('reqIntBtn').addEventListener('click',requestIntegration);$('addOffBtn').addEventListener('click',addExclusion)});

/* ===== INGESTION ===== */
var ING=[
 {id:'slack',name:'Slack',items:'19,402',pct:100,status:'ok'},
 {id:'github',name:'GitHub',items:'2,841',pct:68,status:'syncing'},
 {id:'confluence',name:'Confluence',items:'126',pct:100,status:'ok'},
 {id:'drive',name:'Google Drive',items:'438',pct:100,status:'ok'}
];
function ingBadge(s){if(s==='ok')return '<span class="badge ok"><span class="dot ok"></span>'+t('uptodate')+'</span>';if(s==='syncing')return '<span class="badge acc"><span class="dot acc"></span>'+t('syncing')+'</span>';return '<span class="badge neutral"><span class="dot idle"></span>'+t('paused')+'</span>';}
function renderIng(){
  $('ingBody').innerHTML=ING.map(function(r,i){
    var pc=r.status==='ok'?'ok':(r.status==='paused'?'idle':'');
    var act=r.status==='paused'?'<button class="btn sm" data-res="'+i+'">'+t('resume')+'</button>':'<button class="btn sm" data-sync="'+i+'">'+t('syncnow')+'</button><button class="btn sm" data-pause="'+i+'">'+t('pause')+'</button>';
    return '<tr><td><div class="row"><span class="src-ico">'+ico(r.id)+'</span> '+r.name+'</div></td><td>'+r.items+'</td><td><div class="prog '+pc+'"><i style="width:'+r.pct+'%"></i></div></td><td>'+ingBadge(r.status)+'</td><td class="muted">'+(r.status==='syncing'?'now':(r.status==='paused'?'paused':'just now'))+'</td><td style="text-align:right;white-space:nowrap">'+act+'</td></tr>';
  }).join('');
  $('ingBody').querySelectorAll('[data-sync]').forEach(function(b){b.addEventListener('click',function(){var r=ING[+b.getAttribute('data-sync')];r.status='syncing';r.pct=20;renderIng();setTimeout(function(){r.pct=100;r.status='ok';renderIng();toast(t('t_synced'))},700)})});
  $('ingBody').querySelectorAll('[data-pause]').forEach(function(b){b.addEventListener('click',function(){var r=ING[+b.getAttribute('data-pause')];r.status='paused';renderIng();toast(t('t_paused'))})});
  $('ingBody').querySelectorAll('[data-res]').forEach(function(b){b.addEventListener('click',function(){var r=ING[+b.getAttribute('data-res')];r.status='ok';r.pct=100;renderIng();toast(t('t_resumed'))})});
}
run(function(){renderIng();$('syncAllBtn').addEventListener('click',function(){ING.forEach(function(r){if(r.status!=='paused'){r.status='syncing';r.pct=30}});renderIng();setTimeout(function(){ING.forEach(function(r){if(r.status==='syncing'){r.pct=100;r.status='ok'}});renderIng();toast(t('t_synced'))},800)})});

/* ===== KNOWLEDGE GAPS ===== */
var GAPS=[
 {q:'What is our refund and chargeback policy?',asked:14,conf:48,action:'add'},
 {q:'Which client owns the Helsinki data-center contract?',asked:9,conf:52,action:'assign'},
 {q:'What is the SLA for the mobile team?',asked:7,conf:61,action:'add'},
 {q:'Who approved the 2026 tooling budget?',asked:6,conf:39,action:'assign'},
 {q:'How do we handle GDPR data-deletion requests?',asked:5,conf:66,action:'add'}
];
function renderGaps(){
  $('gapBody').innerHTML=GAPS.map(function(g,i){
    var lbl=g.action==='add'?t('gap_addsrc'):t('gap_assign');
    return '<tr><td style="max-width:280px">'+g.q+'</td><td>'+g.asked+'&times;</td><td><div class="conf"><div class="conf-bar warn"><i style="width:'+g.conf+'%"></i></div><span class="conf-num">'+g.conf+'%</span></div></td><td class="muted">'+(g.action==='add'?(LANG==='pl'?'Dodaj brakujące źródło':'Add the missing source'):(LANG==='pl'?'Przypisz właściciela wiedzy':'Assign a knowledge owner'))+'</td><td style="text-align:right;white-space:nowrap"><button class="btn sm accent" data-gap="'+i+'">'+lbl+'</button></td></tr>';
  }).join('')||'<tr><td colspan="5" class="muted" style="text-align:center;padding:26px">'+(LANG==='pl'?'Brak otwartych luk — świetna robota!':'No open gaps — great work!')+'</td></tr>';
  $('gapBody').querySelectorAll('[data-gap]').forEach(function(b){b.addEventListener('click',function(){GAPS.splice(+b.getAttribute('data-gap'),1);renderGaps();toast(LANG==='pl'?'Lukę oznaczono jako zamkniętą':'Gap marked as resolved')})});
}
run(function(){renderGaps()});

/* ===== MEMBERS ===== */
var MEM=[
 {init:'MK',name:'Marta Kowalska',role:'Owner',scope:'All',active:'now'},
 {init:'DR',name:'Daniel Reyes',role:'Admin',scope:'All',active:'8m ago'},
 {init:'AS',name:'Aisha Said',role:'Member',scope:'Engineering',active:'1h ago'},
 {init:'TN',name:'Tomek Nowak',role:'Member',scope:'Engineering',active:'2h ago'},
 {init:'JL',name:'Júlia Lima · contractor',role:'Guest',scope:'Public only',active:'yesterday'}
];
var ROLES=['Owner','Admin','Member','Guest'];
function renderMembers(){
  $('memBody').innerHTML=MEM.map(function(m,i){
    var opts=ROLES.map(function(r){return '<option'+(r===m.role?' selected':'')+'>'+r+'</option>'}).join('');
    var rm=m.role==='Owner'?'':'<button class="iconbtn" data-rm="'+i+'" title="'+t('remove')+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>';
    return '<tr><td><div class="row"><span class="avatar">'+m.init+'</span> '+m.name+'</div></td><td><select class="fld" style="width:auto;padding:6px 28px 6px 10px;height:auto" data-role="'+i+'">'+opts+'</select></td><td class="muted">'+m.scope+'</td><td class="muted">'+m.active+'</td><td style="text-align:right">'+rm+'</td></tr>';
  }).join('');
  $('memBody').querySelectorAll('[data-role]').forEach(function(s){s.addEventListener('change',function(){MEM[+s.getAttribute('data-role')].role=s.value;toast(t('t_rolechg'))})});
  $('memBody').querySelectorAll('[data-rm]').forEach(function(b){b.addEventListener('click',function(){MEM.splice(+b.getAttribute('data-rm'),1);renderMembers();updateSeats();toast(t('t_removed'))})});
}
function updateSeats(){var txt=(LANG==='pl'?('Użyto '+MEM.length+' z 42 miejsc'):(MEM.length+' / 42 seats used'));if($('seatUse'))$('seatUse').textContent=txt;}
function inviteMember(){
  openModal('<div class="modal-h"><div><div class="mt">'+t('mt_invite')+'</div><div class="md">'+t('md_invite')+'</div></div><div class="x" id="mx">&#10005;</div></div>'+
   '<div class="fld-row"><label class="fld-lbl">'+t('f_name')+'</label><input class="fld" id="ivName" placeholder="Full name"></div>'+
   '<div class="fld-row"><label class="fld-lbl">'+t('f_email')+'</label><input class="fld" id="ivEmail" placeholder="name@company.com"></div>'+
   '<div class="fld-row"><label class="fld-lbl">'+t('f_role')+'</label><select class="fld" id="ivRole"><option>Member</option><option>Admin</option><option>Guest</option></select></div>'+
   '<div class="fld-row"><label class="fld-lbl">'+t('f_scopeacc')+'</label><select class="fld" id="ivScope"><option>Engineering</option><option>All</option><option>Public only</option></select></div>'+
   '<div class="modal-foot"><button class="btn" id="mc">'+t('m_cancel')+'</button><button class="btn accent" id="mok">'+t('m_invite')+'</button></div>');
  $('mx').onclick=closeModal;$('mc').onclick=closeModal;
  $('mok').onclick=function(){var nm=$('ivName').value.trim()||'New Member';var ini=nm.split(/\s+/).map(function(w){return w[0]}).slice(0,2).join('').toUpperCase();MEM.push({init:ini,name:nm,role:$('ivRole').value,scope:$('ivScope').value,active:(LANG==='pl'?'zaproszono':'invited')});renderMembers();updateSeats();closeModal();toast(t('t_invited'))};
}
run(function(){renderMembers();updateSeats();$('inviteBtn').addEventListener('click',inviteMember)});

/* ===== AUDIT ===== */
var AUD=[
 ['10:42:18','Aisha Said','query','"payments outage runbook"','10.0.2.41'],
 ['10:31:05','system','sync','Slack · #incidents (+14)','—'],
 ['10:12:50','Daniel Reyes','query','"who owns billing module"','10.0.2.22'],
 ['09:58:47','Marta Kowalska','role change','Júlia Lima → Guest','10.0.2.10'],
 ['09:50:12','Daniel Reyes','source added','Confluence · Engineering','10.0.2.22'],
 ['09:41:09','Tomek Nowak','query','"release checklist"','10.0.2.31'],
 ['09:30:00','system','sync','GitHub · northwind/api','—'],
 ['09:14:33','Marta Kowalska','excluded','Slack · #salaries','10.0.2.10'],
 ['08:55:20','Aisha Said','query','"GDPR deletion process"','10.0.2.41'],
 ['08:47:01','Marta Kowalska','export','Audit log (CSV)','10.0.2.10'],
 ['08:30:14','system','sync','Confluence · Engineering','—'],
 ['08:12:42','Daniel Reyes','role change','Aisha Said → Member','10.0.2.22'],
 ['07:58:03','Tomek Nowak','query','"staging environment setup"','10.0.2.31'],
 ['07:40:55','system','sync','Google Drive · Shared drive','—']
];
var auditShown=8;
function actBadge(a){var m={'query':'acc','sync':'neutral','role change':'warn','source added':'ok','excluded':'neutral','export':'acc'};return '<span class="badge '+(m[a]||'neutral')+'">'+a+'</span>';}
function renderAudit(){
  var q=($('auditSearch').value||'').toLowerCase();var f=$('auditFilter').value;
  var rows=AUD.filter(function(r){var okF=!f||r[2]===f;var okQ=!q||(r[1]+' '+r[2]+' '+r[3]).toLowerCase().indexOf(q)>=0;return okF&&okQ});
  var vis=rows.slice(0,auditShown);
  $('auditBody').innerHTML=vis.map(function(r){return '<tr><td class="muted">'+r[0]+'</td><td>'+r[1]+'</td><td>'+actBadge(r[2])+'</td><td>'+r[3]+'</td><td class="muted">'+r[4]+'</td></tr>'}).join('')||'<tr><td colspan="5" class="muted" style="text-align:center;padding:24px">'+(LANG==='pl'?'Brak zdarzeń':'No events')+'</td></tr>';
  $('auditMore').style.display=rows.length>auditShown?'inline-flex':'none';
}
function exportAuditCSV(){
  var head='Time,Actor,Action,Target,IP\n';
  var body=AUD.map(function(r){return r.map(function(c){return '"'+String(c).replace(/&amp;/g,'&').replace(/"/g,'""')+'"'}).join(',')}).join('\n');
  var blob=new Blob([head+body],{type:'text/csv'});var url=URL.createObjectURL(blob);
  var a=document.createElement('a');a.href=url;a.download='certemis-audit-log.csv';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
  toast(t('t_exported'));
}
run(function(){
  renderAudit();
  $('auditSearch').addEventListener('input',function(){auditShown=8;renderAudit()});
  $('auditFilter').addEventListener('change',function(){auditShown=8;renderAudit()});
  $('auditRange').addEventListener('change',renderAudit);
  $('auditMore').addEventListener('click',function(){auditShown+=6;renderAudit()});
  $('exportAudit').addEventListener('click',exportAuditCSV);
});

/* ===== ANALYTICS ===== */
var RANGES={
 7:{k1:'286',k2:'3.0s',k3:'72h',k4:'34 / 42',line:[28,34,30,41,38,46,52]},
 30:{k1:'1,284',k2:'3.2s',k3:'312h',k4:'38 / 42',line:[120,150,140,180,210,240,260,248,290,312,300,340]},
 90:{k1:'3,940',k2:'3.4s',k3:'910h',k4:'41 / 42',line:[210,260,240,320,300,380,420,460,520,560,610,680,720,800,860,910]}
};
var curRange=30;
function buildLine(vals){
  var w=320,h=110,max=Math.max.apply(null,vals),min=Math.min.apply(null,vals),rng=(max-min)||1;
  var pts=vals.map(function(v,i){var x=(i/(vals.length-1))*(w-10)+5;var y=h-10-((v-min)/rng)*(h-28);return [x,y]});
  var line=pts.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1)}).join(' ');
  var area='5,'+(h-10)+' '+line+' '+(w-5)+','+(h-10);
  var grid='';for(var g=0;g<3;g++){var gy=10+g*((h-28)/2);grid+='<line x1="5" y1="'+gy.toFixed(1)+'" x2="'+(w-5)+'" y2="'+gy.toFixed(1)+'" stroke="var(--bd)" stroke-width="1"/>'}
  var last=pts[pts.length-1];
  return '<svg viewBox="0 0 '+w+' '+h+'" width="100%" style="display:block"><defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--acc)" stop-opacity=".22"/><stop offset="1" stop-color="var(--acc)" stop-opacity="0"/></linearGradient></defs>'+grid+'<polygon points="'+area+'" fill="url(#lg)"/><polyline points="'+line+'" fill="none" stroke="var(--acc)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/><circle cx="'+last[0].toFixed(1)+'" cy="'+last[1].toFixed(1)+'" r="4" fill="var(--acc)"/></svg>';
}
function buildDonut(pct){
  var r=52,c=2*Math.PI*r,off=c*(1-pct/100);
  return '<svg viewBox="0 0 140 140" width="150" height="150"><circle cx="70" cy="70" r="52" fill="none" stroke="var(--panel-3)" stroke-width="14"/><circle cx="70" cy="70" r="52" fill="none" stroke="var(--acc)" stroke-width="14" stroke-linecap="round" stroke-dasharray="'+c.toFixed(1)+'" stroke-dashoffset="'+off.toFixed(1)+'" transform="rotate(-90 70 70)"/><text x="70" y="70" text-anchor="middle" dominant-baseline="central" font-size="30" font-weight="700" fill="var(--tx)">'+pct+'%</text></svg>';
}
function renderAnalytics(r){
  curRange=r;var d=RANGES[r];
  $('anK1').textContent=d.k1;$('anK2').textContent=d.k2;$('anK3').textContent=d.k3;$('anK4').textContent=d.k4;
  $('lineWrap').innerHTML=buildLine(d.line);
  $('donutWrap').innerHTML=buildDonut(91);
  document.querySelectorAll('#anRange button').forEach(function(b){b.classList.toggle('on',+b.getAttribute('data-r')===r)});
}
run(function(){
  renderAnalytics(30);
  document.querySelectorAll('#anRange button').forEach(function(b){b.addEventListener('click',function(){renderAnalytics(+b.getAttribute('data-r'))})});
  $('anExport').addEventListener('click',function(){toast(t('t_reportdl'))});
});

/* ===== REPORTS ===== */
var REP=[
 {title:'Weekly knowledge digest',title_pl:'Tygodniowy przegląd wiedzy',desc:'What your team asked, top topics and time saved.',desc_pl:'O co pytał zespół, najczęstsze tematy i zaoszczędzony czas.',sched:'Every Monday 09:00',sched_pl:'W każdy poniedziałek 09:00',on:true,fmt:'PDF',color:'#2E5BFF'},
 {title:'Security & access review',title_pl:'Przegląd bezpieczeństwa i dostępu',desc:'Sign-ins, role changes, exports and restricted access.',desc_pl:'Logowania, zmiany ról, eksporty i dostęp ograniczony.',sched:'Monthly',sched_pl:'Co miesiąc',on:true,fmt:'PDF',color:'#10b981'},
 {title:'Ingestion health',title_pl:'Kondycja synchronizacji',desc:'Sync status, errors and items added per source.',desc_pl:'Status synchronizacji, błędy i elementy na źródło.',sched:'Off',sched_pl:'Wyłączony',on:false,fmt:'CSV',color:'#f59e0b'},
 {title:'Adoption report',title_pl:'Raport adopcji',desc:'Active members, questions per team, coverage.',desc_pl:'Aktywni członkowie, pytania na zespół, pokrycie.',sched:'Quarterly',sched_pl:'Co kwartał',on:true,fmt:'PDF',color:'#8b5cf6'}
];
function renderReports(){
  $('repGrid').innerHTML=REP.map(function(r,i){
    var title=LANG==='pl'?r.title_pl:r.title,desc=LANG==='pl'?r.desc_pl:r.desc,sched=LANG==='pl'?r.sched_pl:r.sched;
    return '<div class="card card-pad"><div class="row" style="align-items:flex-start"><div class="col-ico" style="background:'+r.color+';border-color:transparent;margin:0 12px 0 0"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg></div><div style="flex:1"><div style="font-weight:600;font-size:14.5px">'+title+'</div><div class="tiny muted" style="margin-top:3px">'+desc+'</div></div><span class="badge neutral">'+r.fmt+'</span></div>'+
     '<div class="set-row" style="border:none;padding:14px 0 0"><div><div class="set-name">'+t('rep_schedule')+'</div><div class="set-desc">'+sched+'</div></div><div class="sw'+(r.on?' on':'')+'" data-rep="'+i+'"></div></div>'+
     '<button class="btn" data-dl="'+i+'" style="width:100%;margin-top:10px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>'+t('rep_download')+' '+r.fmt+'</button></div>';
  }).join('');
  $('repGrid').querySelectorAll('[data-rep]').forEach(function(s){s.addEventListener('click',function(){var r=REP[+s.getAttribute('data-rep')];r.on=!r.on;s.classList.toggle('on');toast(r.on?(LANG==='pl'?'Harmonogram włączony':'Schedule turned on'):(LANG==='pl'?'Harmonogram wyłączony':'Schedule turned off'))})});
  $('repGrid').querySelectorAll('[data-dl]').forEach(function(b){b.addEventListener('click',function(){toast(t('t_reportdl'))})});
}
run(function(){renderReports()});

/* ===== SETTINGS extras ===== */
run(function(){
  $('wsNameInput').addEventListener('change',function(){toast(t('t_wsname'))});
  $('exportData').addEventListener('click',function(){toast(t('t_dataexp'))});
  document.querySelectorAll('.revokeBtn').forEach(function(b){b.addEventListener('click',function(){b.textContent=LANG==='pl'?'Odebrano':'Revoked';b.disabled=true;b.classList.remove('danger');toast(t('t_revoked'))})});
});

/* ===== navigation / theme / accent / switches ===== */
function showScreen(id){
  document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active')});
  var el=$('screen-'+id);if(el)el.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(function(n){n.classList.toggle('active',n.getAttribute('data-screen')===id)});
  $('main').scrollTop=0;
  if(window.innerWidth<760)$('sidebar').classList.add('collapsed');
}
run(function(){
  document.querySelectorAll('.nav-item').forEach(function(n){n.addEventListener('click',function(){showScreen(n.getAttribute('data-screen'))})});
  $('sideToggle').addEventListener('click',function(){$('sidebar').classList.toggle('collapsed')});
});
function setTheme(th){
  document.documentElement.setAttribute('data-theme',th);
  $('iconMoon').style.display=th==='dark'?'block':'none';$('iconSun').style.display=th==='dark'?'none':'block';
  document.querySelectorAll('#themeSeg button').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-theme-set')===th)});
  try{localStorage.setItem('certemis-demo-theme',th)}catch(e){}
  applyAccent();
}
var curAccent={light:'#2E5BFF',dark:'#4d72ff'};
function hexA(h,a){var n=parseInt(h.slice(1),16);return'rgba('+((n>>16)&255)+','+((n>>8)&255)+','+(n&255)+','+a+')';}
function applyAccent(){var th=document.documentElement.getAttribute('data-theme');var c=th==='dark'?curAccent.dark:curAccent.light;document.documentElement.style.setProperty('--acc',c);document.documentElement.style.setProperty('--acc-soft',hexA(c,th==='dark'?.16:.10));}
run(function(){
  $('themeBtn').addEventListener('click',function(){setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark')});
  document.querySelectorAll('#themeSeg button').forEach(function(b){b.addEventListener('click',function(){setTheme(b.getAttribute('data-theme-set'))})});
  document.querySelectorAll('.swatch[data-accent]').forEach(function(s){s.addEventListener('click',function(){document.querySelectorAll('.swatch[data-accent]').forEach(function(x){x.classList.remove('sel')});s.classList.add('sel');curAccent={light:s.getAttribute('data-accent'),dark:s.getAttribute('data-accent-dark')};applyAccent()})});
  document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-sw]')){e.target.closest('[data-sw]').classList.toggle('on')}});
  $('fsBtn').addEventListener('click',function(){if(!document.fullscreenElement){if(document.documentElement.requestFullscreen)document.documentElement.requestFullscreen()}else{document.exitFullscreen()}});
});
/* dropdowns */
run(function(){
  function tog(id){var d=$(id);var on=d.classList.contains('on');document.querySelectorAll('.dd').forEach(function(x){x.classList.remove('on')});if(!on)d.classList.add('on')}
  $('bellBtn').addEventListener('click',function(e){e.stopPropagation();tog('bellDD')});
  $('langBtn').addEventListener('click',function(e){e.stopPropagation();tog('langDD')});
  document.addEventListener('click',function(){document.querySelectorAll('.dd').forEach(function(x){x.classList.remove('on')})});
  document.querySelectorAll('.dd').forEach(function(d){d.addEventListener('click',function(e){e.stopPropagation()})});
  document.querySelectorAll('[data-lang]').forEach(function(o){o.addEventListener('click',function(){setLang(o.getAttribute('data-lang'));$('langDD').classList.remove('on')})});
  document.querySelectorAll('#langSeg button').forEach(function(b){b.addEventListener('click',function(){setLang(b.getAttribute('data-lang-set'))})});
});

/* ===== rerender on language change ===== */
function rerender(){run(function(){if(currentAns)renderAns(currentAns)});run(renderCollections);run(renderSources);run(renderOff);run(renderIng);run(renderGaps);run(renderMembers);run(updateSeats);run(renderAudit);run(function(){renderAnalytics(curRange)});run(renderReports);}

/* ===== guided tour ===== */
var TOUR=[
 {screen:'ask',sel:'#screen-ask .askbox',title:'Ask anything',title_pl:'Pytaj o cokolwiek',text:'Start here. Type a question in plain language and press Ask — the answer is built from your own tools.',text_pl:'Zacznij tutaj. Wpisz pytanie zwykłym językiem i kliknij Zapytaj — odpowiedź powstaje z Twoich narzędzi.',place:'bottom'},
 {screen:'ask',sel:'#screen-ask .chips',title:'Not sure what to ask?',title_pl:'Nie wiesz, o co zapytać?',text:'Click a suggested question and watch a real answer with sources appear instantly.',text_pl:'Kliknij sugerowane pytanie i zobacz prawdziwą odpowiedź ze źródłami.',place:'bottom'},
 {screen:'saved',sel:'.nav-item[data-screen="saved"]',title:'Save the good ones',title_pl:'Zapisuj najlepsze',text:'Open a collection to read its saved answers, or create a new one — a living handbook for your team.',text_pl:'Otwórz kolekcję, by zobaczyć zapisane odpowiedzi, lub utwórz nową — żywy podręcznik zespołu.',place:'right'},
 {screen:'sources',sel:'.nav-item[data-screen="sources"]',title:'Connect your tools',title_pl:'Połącz narzędzia',text:'Connect or disconnect any source, add new integrations, or request one — and decide what stays off-limits.',text_pl:'Połącz lub odłącz źródło, dodaj integrację albo poproś o nową — i zdecyduj, co zostaje wyłączone.',place:'right'},
 {screen:'gaps',sel:'.nav-item[data-screen="gaps"]',title:'Close knowledge gaps',title_pl:'Zamykaj luki w wiedzy',text:'See the questions Certemis could not answer well, and fix them by adding a source or owner.',text_pl:'Zobacz pytania bez dobrej odpowiedzi i napraw je, dodając źródło lub właściciela.',place:'right'},
 {screen:'members',sel:'.nav-item[data-screen="members"]',title:'Control who sees what',title_pl:'Kontroluj dostęp',text:'Invite members, change roles, and review the permission matrix — full role-based access.',text_pl:'Zapraszaj członków, zmieniaj role i przeglądaj macierz uprawnień — pełna kontrola dostępu.',place:'right'},
 {screen:'audit',sel:'.nav-item[data-screen="audit"]',title:'Audit-ready',title_pl:'Gotowe na audyt',text:'Search, filter and export the full audit log — built for SOC 2, ISO 27001 and GDPR.',text_pl:'Szukaj, filtruj i eksportuj pełny dziennik audytu — pod SOC 2, ISO 27001 i GDPR.',place:'right'},
 {screen:'analytics',sel:'.nav-item[data-screen="analytics"]',title:'Measure the impact',title_pl:'Mierz efekty',text:'Charts for questions, coverage and hours saved — switch the date range and export a report.',text_pl:'Wykresy pytań, pokrycia i zaoszczędzonych godzin — zmień zakres dat i wyeksportuj raport.',place:'right'},
 {screen:'settings',sel:'#langBtn',title:'English or Polski',title_pl:'English lub Polski',text:'Switch the whole interface language here — and set theme, accent, security and notifications in Settings.',text_pl:'Tu przełączysz język całego interfejsu — a w Ustawieniach ustawisz motyw, akcent, bezpieczeństwo i powiadomienia.',place:'bottom'},
 {screen:'ask',sel:'.tb-btn.accent',title:'Like what you see?',title_pl:'Podoba Ci się?',text:'Join the waitlist to get early access to Certemis for your team.',text_pl:'Dołącz do listy oczekujących, aby uzyskać wczesny dostęp do Certemis.',place:'bottom'}
];
var ti=0,tourOpen=false,dotsEl=$('tourDots');
TOUR.forEach(function(){var i=document.createElement('i');dotsEl.appendChild(i)});
function positionStep(){
  var step=TOUR[ti],el=document.querySelector(step.sel);if(!el)return;
  var r=el.getBoundingClientRect(),pad=8,spot=$('spot');spot.classList.add('on');
  spot.style.left=(r.left-pad)+'px';spot.style.top=(r.top-pad)+'px';spot.style.width=(r.width+pad*2)+'px';spot.style.height=(r.height+pad*2)+'px';
  var coach=$('coach');coach.classList.add('on');var cw=coach.offsetWidth,ch=coach.offsetHeight,top,left;
  if(step.place==='top'){top=r.top-ch-14;left=r.left}else if(step.place==='right'){top=r.top;left=r.right+14}else{top=r.bottom+14;left=r.left}
  left=Math.max(12,Math.min(left,window.innerWidth-cw-12));top=Math.max(64,Math.min(top,window.innerHeight-ch-12));
  coach.style.left=left+'px';coach.style.top=top+'px';
  $('tourStep').textContent='Step '+(ti+1)+' / '+TOUR.length;
  $('tourTitle').textContent=LANG==='pl'?step.title_pl:step.title;
  $('tourText').textContent=LANG==='pl'?step.text_pl:step.text;
  $('tourNext').textContent=ti===TOUR.length-1?(LANG==='pl'?'Zakończ':'Finish'):(LANG==='pl'?'Dalej':'Next');
  dotsEl.querySelectorAll('i').forEach(function(d,i){d.classList.toggle('on',i===ti)});
}
function goStep(){var step=TOUR[ti];if(step.screen)showScreen(step.screen);$('sidebar').classList.remove('collapsed');var el=document.querySelector(step.sel);if(el)el.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(positionStep,320);}
function hideNudge(){$('nudge').classList.remove('on');$('tourBtn').classList.remove('pulse');}
function openTour(){ti=0;tourOpen=true;hideNudge();goStep();}
function closeTour(){tourOpen=false;$('spot').classList.remove('on');$('coach').classList.remove('on');}
run(function(){
  $('tourBtn').addEventListener('click',openTour);
  $('tourSkip').addEventListener('click',closeTour);
  $('tourNext').addEventListener('click',function(){if(ti===TOUR.length-1){closeTour()}else{ti++;goStep()}});
  window.addEventListener('resize',function(){if(tourOpen)positionStep()});
  $('nudgeStart').addEventListener('click',openTour);$('nudgeNo').addEventListener('click',hideNudge);
});

/* ===== init ===== */
run(function(){
  try{var sl=localStorage.getItem('certemis-demo-lang');if(sl)LANG=sl;}catch(e){}
  try{var stt=localStorage.getItem('certemis-demo-theme');setTheme(stt||'dark');}catch(e){setTheme('dark');}
  setLang(LANG);
  if(window.innerWidth<760)$('sidebar').classList.add('collapsed');
  $('tourBtn').classList.add('pulse');
  setTimeout(function(){if(!tourOpen)$('nudge').classList.add('on')},800);
});
