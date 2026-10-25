'use strict';
/* Jornada — fichaje personal (entrada, pausa, salida). Todo vive en este dispositivo (localStorage). */

const KEY = 'jornada-v1';
const VERSION = '1.3';
const MIN = 60000;

/* ---------- textos (en català) ---------- */

const L = {
  locale: 'ca-ES',
  tab_today: 'Avui', tab_week: 'Setmana', tab_month: 'Mes', tab_settings: 'Ajustos',
  hello: 'Hola, {n}', hello_anon: 'Jornada',
  st_out: 'Fora de jornada', st_in: 'Treballant', st_paused: 'En pausa',
  since: 'des de les {t}', last_out: 'Última sortida {d} a les {t}', first_time: 'Prem Entrar quan comencis',
  in: 'Entrar', pause: 'Pausa', resume: 'Reprendre', out: 'Sortir',
  today_cap: 'Avui', week_cap: 'Aquesta setmana', of_h: 'de {h}',
  left: 'Falten', extra: 'Extra', complete: 'Completa',
  tramos_today: "Trams d'avui", edit: 'Editar', add: 'Afegir', none_today: 'Avui encara no hi ha cap horari.',
  now: 'ara', break_: 'Pausa', running: 'en curs',
  t_in: 'Entrada a les {t}', t_pause: 'Pausa a les {t}', t_resume: 'De tornada a les {t}', t_out: 'Sortida a les {t}', undo: 'Desfer',
  forgot: 'Portes {d} seguides. Et vas oblidar de sortir?', fix: 'Corregir',
  backup_nag: "Fa {n} dies de la teva última còpia de seguretat.", backup_never: 'Encara no has desat cap còpia de seguretat.', backup_do: 'Desar',
  install_title: "Afegeix-la a la pantalla d'inici", install_text: "Prem Compartir i després «Afegeix a la pantalla d'inici». Així s'obre com una app i els horaris hi queden desats.", dismiss: 'Entesos',
  week_n: 'Setmana {n}', total: 'Total', planned: 'Previstes', days_worked: 'Dies', worked: 'Treballades',
  share_report: "Compartir l'informe", no_work: 'Sense horaris', future: '—',
  month_weeks: 'Setmanes', extra_h: 'Hores extra', expenses: 'Despeses', to_collect: 'A cobrar',
  send_pdf: 'Enviar el registre', other_formats: 'Altres formats (text, Excel)', pdf_ready: 'El PDF és a punt', share: 'Compartir', pdf_err: "No s'ha pogut crear el PDF.",
  exp_none: 'Cap despesa aquest mes.', exp_new: 'Nova despesa', exp_edit: 'Despesa', exp_km: 'Quilometratge', exp_other: 'Altres',
  exp_date: 'Data', exp_route: 'Trajecte', exp_route_ph: 'Granollers – Teatre (Mataró)', exp_km_one: "Km d'anada", exp_rt: 'Anada i tornada',
  exp_concept: 'Concepte', exp_concept_ph: 'P. ex. pàrquing', exp_amount: 'Import', exp_delete: 'Eliminar la despesa',
  exp_err: "Falta la data, el concepte o l'import.", exp_saved: 'Despesa desada', exp_deleted: 'Despesa eliminada', rt_short: 'anada i tornada',
  in_short: 'Entrada', out_short: 'Sortida', add_tramo: 'Afegir tram', note: 'Concepte', note_ph: 'P. ex. Milnotes + Nit des de casa',
  cancel: 'Cancel·lar', done: 'Fet', delete: 'Eliminar', day_total: 'Total del dia', next_day: '+1 dia', open_hint: 'Deixa-la buida si continues treballant',
  err_overlap: 'Hi ha trams que se solapen. Revisa les hores.', err_noend: "Falta l'hora de sortida d'un tram.", err_future: 'Un tram acaba més tard que ara.', err_open: "Només pot quedar obert l'últim tram d'avui.",
  rep_title: 'Registre horari', rep_week: 'Setmana {n} · {r}', rep_week_tot: 'Total setmana: {t}', rep_extra_w: 'extra {t}',
  rep_total: 'Total: {t} de {p} previstes', rep_total_m: 'Total del mes: {t}', rep_exp_tot: 'Total despeses: {t}', rep_owed: 'A cobrar: {t}', rep_extra: 'Hores extra: {t}', rep_noextra: 'Sense hores extra',
  sh_text: 'Enviar com a text', sh_csv: 'Exportar a Excel (CSV)', sh_copy: 'Copiar el text', copied: 'Text copiat',
  profile: 'Perfil', name: 'Nom', company: 'Empresa', city: 'Població', schedule: 'Contracte', weekly: 'Hores per setmana', c_start: 'Inici', c_end: 'Final',
  pay: 'Pagaments', extra_rate: 'Preu hora extra', km_rate: 'Preu per km',
  pay_foot: "Serveixen per calcular el que queda per cobrar cada mes. Cada desplaçament es queda amb el preu per km del dia que l'afegeixes.",
  weekly_foot: "Dins de cada setmana (de dilluns a diumenge), un cop fetes aquestes hores, la resta compten com a hores extra. Les setmanes on comença o acaba el contracte compten la part proporcional.",
  backup: 'Còpia de seguretat', backup_export: 'Desar una còpia', backup_import: 'Restaurar una còpia',
  backup_last: 'Última còpia: {d}.', backup_none: 'Encara no hi ha cap còpia.',
  backup_foot: "Al menú Compartir tria «Desa a Arxius» i desa-la a l'iCloud Drive.",
  import_q: 'Restaurar aquesta còpia?', import_msg: "S'afegiran {a} trams i {b} despeses de la còpia ({d}). El que ja tens no es toca.", import_none: 'Aquesta còpia no té res de nou.', import_ok: 'Còpia restaurada', import_bad: 'Aquest arxiu no és una còpia de Jornada.', restore: 'Restaurar',
  data: 'Dades', erase: 'Esborrar tots els horaris', erase_q: 'Esborrar tots els horaris?', erase_msg: "S'esborraran els horaris i les despeses. No es pot desfer: desa abans una còpia de seguretat.", erase_btn: 'Esborrar', erased: 'Horaris esborrats',
  about: 'Jornada {v}',
  today_word: 'avui', yesterday: 'ahir', days_ago: 'fa {n} dies',
  err_save: "No s'ha pogut desar. Fes una còpia de seguretat com més aviat millor.",
  saved: 'Desat', deleted: 'Tram eliminat',
  csv_head: ['Data', 'Dia', 'Matí entrada', 'Matí sortida', 'Tarda entrada', 'Tarda sortida', 'Nit entrada', 'Nit sortida', 'T. hores', 'T. extres', 'Concepte'],
  csv_tot: 'TOTALS', csv_exp: 'Desplaçaments i despeses', csv_exp_head: ['Data', 'Concepte', 'Km', 'Import (€)'],
  chart_note: 'La línia blava marca {a} per dia, la mitjana per arribar a {w} en 5 dies. Cada barra són les hores fetes aquell dia.',
  wd_short: ['Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds', 'Dg'],
  h: 'h', min: 'min',
};

const t = (k, vars = {}) => String(L[k] ?? k).replace(/\{(\w+)\}/g, (_, v) => vars[v] ?? '');

/* ---------- utilidades ---------- */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

const sod = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const monday = d => { const x = sod(d); return addDays(x, -((x.getDay() + 6) % 7)); };
const keyOf = d => { const x = new Date(d); return `${x.getFullYear()}-${pad(x.getMonth() + 1)}-${pad(x.getDate())}`; };
const dateOf = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
const at = (k, hhmm) => { const [h, m] = hhmm.split(':').map(Number); const d = dateOf(k); d.setHours(h, m, 0, 0); return d.getTime(); };
const hhmm = ms => { const d = new Date(ms); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; };
function isoWeek(d) {
  const th = addDays(monday(d), 3);
  const w1 = monday(new Date(th.getFullYear(), 0, 4));
  return 1 + Math.round((th - w1) / (7 * 864e5));
}

const fmt = (opts, d) => new Intl.DateTimeFormat(L.locale, opts).format(d);
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

/** 270 → "4 h 30 min" */
function fmtHM(mins) {
  mins = Math.max(0, Math.round(mins));
  const h = Math.floor(mins / 60), m = mins % 60;
  if (h && m) return `${h} ${L.h} ${m} ${L.min}`;
  if (h) return `${h} ${L.h}`;
  return `${m} ${L.min}`;
}
/** 270 → "4:30" */
const fmtClock = mins => `${Math.floor(Math.max(0, mins) / 60)}:${pad(Math.max(0, Math.round(mins)) % 60)}`;

/** "16–22 nov", "26 oct – 1 nov" */
function spanLabel(a, b) {
  const mo = d => fmt({ month: 'short' }, d).replace('.', '');
  if (a.getMonth() === b.getMonth()) return `${a.getDate() === b.getDate() ? '' : `${a.getDate()}–`}${b.getDate()} ${mo(b)}`;
  return `${a.getDate()} ${mo(a)} – ${b.getDate()} ${mo(b)}`;
}
const rangeLabel = mon => spanLabel(mon, addDays(mon, 6));
function relDay(ms) {
  const diff = Math.round((sod(Date.now()) - sod(ms)) / 864e5);
  if (diff <= 0) return t('today_word');
  if (diff === 1) return t('yesterday');
  return t('days_ago', { n: diff });
}

/* ---------- datos ---------- */

const DEFAULTS = {
  v: 1,
  settings: { name: 'Marc', company: 'Milnotes', city: 'Granollers', weekly: 20 * 60, start: null, end: null, extraRate: 10, kmRate: 0.26, lastBackup: null },
  entries: [], notes: {}, expenses: [], pausedAt: null,
};
const isKey = k => typeof k === 'string' && /^\d{4}-\d\d-\d\d$/.test(k);

function normalize(d) {
  if (!d || typeof d !== 'object' || !Array.isArray(d.entries)) return null;
  const settings = { ...DEFAULTS.settings, ...(d.settings || {}) };
  if (!isKey(settings.start)) settings.start = null;
  if (!isKey(settings.end)) settings.end = null;
  return {
    v: 1,
    settings,
    entries: d.entries
      .filter(e => e && Number.isFinite(e.start))
      .map(e => ({ id: String(e.id || uid()), start: e.start, end: Number.isFinite(e.end) ? e.end : null, ...(isKey(e.day) ? { day: e.day } : {}) })),
    notes: d.notes && typeof d.notes === 'object' ? d.notes : {},
    expenses: (Array.isArray(d.expenses) ? d.expenses : [])
      .filter(x => x && isKey(x.date))
      .map(x => (x.kind === 'km'
        ? { id: String(x.id || uid()), date: x.date, kind: 'km', desc: String(x.desc || ''), km1: +x.km1 || 0, rt: !!x.rt, rate: typeof x.rate === 'number' ? x.rate : settings.kmRate }
        : { id: String(x.id || uid()), date: x.date, kind: 'other', desc: String(x.desc || ''), amount: +x.amount || 0 })),
    pausedAt: Number.isFinite(d.pausedAt) ? d.pausedAt : null,
    updatedAt: d.updatedAt || null,
  };
}
function load() {
  try {
    const d = normalize(JSON.parse(localStorage.getItem(KEY)));
    if (d) return d;
  } catch { /* primera vez o datos ilegibles */ }
  return structuredClone(DEFAULTS);
}
function save() {
  db.updatedAt = Date.now();
  db.entries.sort((a, b) => a.start - b.start);
  try { localStorage.setItem(KEY, JSON.stringify(db)); }
  catch { dialog({ title: t('err_save'), buttons: [{ label: 'OK' }] }); }
}

let db = load();

/* minutos de un tramo, contados entre las horas que se ven (HH:MM) para que los totales cuadren con lo mostrado */
const minsOf = (e, now = Date.now()) => Math.max(0, Math.floor((e.end ?? now) / MIN) - Math.floor(e.start / MIN));
const openEntry = () => db.entries.find(e => e.end == null);
/* un tram compta el dia que comença; `day` el pot deixar al dia anterior (una nit que comença a les 0:00) */
const dayOf = e => e.day || keyOf(e.start);
const entriesOn = k => db.entries.filter(e => dayOf(e) === k).sort((a, b) => a.start - b.start);
const dayMins = (k, now) => entriesOn(k).reduce((s, e) => s + minsOf(e, now), 0);
function weekMins(mon, now = Date.now()) {
  let s = 0;
  for (let i = 0; i < 7; i++) s += dayMins(keyOf(addDays(mon, i)), now);
  return s;
}
function status() {
  if (openEntry()) return 'in';
  if (db.pausedAt && keyOf(db.pausedAt) === keyOf(Date.now())) return 'paused';
  return 'out';
}

/* contracte: abans de l'inici no hi ha res, i les setmanes on comença o acaba compten la part proporcional */
const startKey = () => db.settings.start || db.entries.reduce((k, e) => (dayOf(e) < k ? dayOf(e) : k), keyOf(Date.now()));
const firstMon = () => monday(dateOf(startKey()));
const inContract = k => (!db.settings.start || k >= db.settings.start) && (!db.settings.end || k <= db.settings.end);
function weekTarget(mon) {
  let n = 0;
  for (let i = 0; i < 7; i++) if (inContract(keyOf(addDays(mon, i)))) n++;
  return (db.settings.weekly * n) / 7;
}
/* hores extra de cada dia: dins la setmana, un cop fetes les hores de contracte, la resta són extra */
function weekExtras(mon, now = Date.now()) {
  const target = weekTarget(mon);
  let cum = 0;
  return [...Array(7)].map((_, i) => {
    const m = dayMins(keyOf(addDays(mon, i)), now);
    const x = Math.max(0, cum + m - target) - Math.max(0, cum - target);
    cum += m;
    return x;
  });
}
const dayExtra = (k, now) => weekExtras(monday(dateOf(k)), now)[(dateOf(k).getDay() + 6) % 7];

/* trossos de setmana entre dos dies (un mes o una setmana): hores, extra i hores de contracte que quedaven */
function periods(from, to, now = Date.now()) {
  const s0 = startKey();
  if (from < s0) from = s0;
  if (from > to) return [];
  const out = [];
  for (let mon = monday(dateOf(from)); keyOf(mon) <= to; mon = addDays(mon, 7)) {
    const a = keyOf(mon) < from ? from : keyOf(mon);
    const sun = keyOf(addDays(mon, 6)), b = sun > to ? to : sun;
    const ex = weekExtras(mon, now), target = weekTarget(mon);
    let worked = 0, extra = 0, before = 0;
    for (let i = 0; i < 7; i++) {
      const k = keyOf(addDays(mon, i)), mm = dayMins(k, now);
      if (k < a) before += mm;
      else if (k <= b) { worked += mm; extra += ex[i]; }
    }
    out.push({ mon, a, b, worked, extra, target, left: Math.max(0, target - before), fut: a > keyOf(now) });
  }
  return out;
}
const monthKeys = (y, m) => [keyOf(new Date(y, m, 1)), keyOf(new Date(y, m + 1, 0))];

/* despeses: quilometratge (km d'anada, ×2 si és anada i tornada) o un import */
const expKm = x => (x.kind === 'km' ? x.km1 * (x.rt ? 2 : 1) : 0);
const expAmount = x => (x.kind === 'km' ? Math.round(expKm(x) * x.rate * 100) / 100 : x.amount);
function monthExpenses(y, m) {
  const [first, last] = monthKeys(y, m), s0 = db.settings.start;
  // el primer mes de contracte també recull les despeses d'abans de començar
  const early = s0 && s0 >= first && s0 <= last;
  return db.expenses.filter(x => (x.date >= first && x.date <= last) || (early && x.date < first)).sort((a, b) => a.date.localeCompare(b.date));
}
const fmtNum = (v, d = 2) => (Math.round(v * 10 ** d) / 10 ** d).toLocaleString(L.locale, { maximumFractionDigits: d });
const fmtEUR = v => `${v.toLocaleString(L.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
const parseNum = v => { const n = parseFloat(String(v ?? '').replace(/\s/g, '').replace(',', '.')); return Number.isFinite(n) ? n : 0; };

/* trams d'un dia repartits en matí, tarda i nit, com al full de registre */
function daySlots(k) {
  const out = { mati: [], tarda: [], nit: [] };
  for (const e of entriesOn(k)) {
    const d = new Date(e.start), mm = d.getHours() * 60 + d.getMinutes();
    out[keyOf(e.start) !== k || mm >= 21 * 60 + 30 ? 'nit' : mm < 14 * 60 ? 'mati' : 'tarda'].push(e);
  }
  return out;
}
/* "9:30", amb * si ja és el dia següent */
const clockAt = (k, ms) => { const d = new Date(ms); return `${d.getHours()}:${pad(d.getMinutes())}${keyOf(ms) !== k ? '*' : ''}`; };

/* ---------- estado de la interfaz ---------- */

const ui = { tab: 'today', week: monday(new Date()), month: { y: new Date().getFullYear(), m: new Date().getMonth() }, anim: true };

/* ---------- acciones de fichaje ---------- */

function act(kind) {
  const before = JSON.stringify(db);
  const now = Math.floor(Date.now() / 1000) * 1000;
  const open = openEntry();
  if (kind === 'in' || kind === 'resume') {
    const last = db.entries.filter(e => e.end != null).sort((a, b) => b.end - a.end)[0];
    // pausa de menos de un minuto: se reabre el tramo en vez de partirlo
    if (kind === 'resume' && last && db.pausedAt && now - db.pausedAt < MIN) last.end = null;
    else db.entries.push({ id: uid(), start: now, end: null });
    db.pausedAt = null;
  } else if (kind === 'pause') {
    if (!open) return;
    open.end = now; db.pausedAt = now;
  } else if (kind === 'out') {
    if (open) open.end = now;
    db.pausedAt = null;
  }
  save();
  haptic();
  requestPersist();
  render();
  toast(t('t_' + kind, { t: hhmm(now) }), () => { db = normalize(JSON.parse(before)); save(); render(); });
}

/* ---------- iconos ---------- */

const ICON = {
  today: '<svg viewBox="0 0 28 28"><circle cx="14" cy="15.5" r="9"/><path d="M14 10.5v5l3 2M11.5 3.5h5M14 3.5v3"/></svg>',
  week: '<svg viewBox="0 0 28 28"><rect x="4" y="5.5" width="20" height="18" rx="4"/><path d="M4 11h20M9.5 3v4.5M18.5 3v4.5"/><path d="M8.5 15.5h2M13 15.5h2M17.5 15.5h2M8.5 19h2M13 19h2" stroke-width="2.2"/></svg>',
  month: '<svg viewBox="0 0 28 28"><path d="M6 23V15M11.3 23V9M16.6 23v-11M22 23V5" stroke-width="3.2"/></svg>',
  settings: '<svg viewBox="0 0 28 28"><path d="M4 8h20M4 14h20M4 20h20" stroke-width="1.6"/><circle cx="10" cy="8" r="2.6" class="knob"/><circle cx="18" cy="14" r="2.6" class="knob"/><circle cx="8" cy="20" r="2.6" class="knob"/></svg>',
  play: '<svg viewBox="0 0 20 20"><path d="M6 4.2v11.6a.8.8 0 0 0 1.2.7l9.6-5.8a.8.8 0 0 0 0-1.4L7.2 3.5a.8.8 0 0 0-1.2.7Z" fill="currentColor" stroke="none"/></svg>',
  pause: '<svg viewBox="0 0 20 20"><rect x="5" y="4" width="3.4" height="12" rx="1.2" fill="currentColor" stroke="none"/><rect x="11.6" y="4" width="3.4" height="12" rx="1.2" fill="currentColor" stroke="none"/></svg>',
  stop: '<svg viewBox="0 0 20 20"><rect x="4.5" y="4.5" width="11" height="11" rx="2.4" fill="currentColor" stroke="none"/></svg>',
  share: '<svg viewBox="0 0 24 24"><path d="M12 3.5v11M8 7.2l4-3.9 4 3.9"/><path d="M8.5 10.5H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1.5"/></svg>',
  chevL: '<svg viewBox="0 0 24 24"><path d="M14.5 5.5 8 12l6.5 6.5"/></svg>',
  chevR: '<svg viewBox="0 0 24 24"><path d="M9.5 5.5 16 12l-6.5 6.5"/></svg>',
  chev: '<svg viewBox="0 0 24 24" class="chev"><path d="M9.5 6 15.5 12l-6 6"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 6v12M6 12h12"/></svg>',
  minus: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor" stroke="none"/><path d="M7.5 12h9" stroke="#fff" stroke-width="2.2"/></svg>',
  note: '<svg viewBox="0 0 24 24"><path d="M6 4.5h12a1.5 1.5 0 0 1 1.5 1.5v8.5L14.5 19.5H6A1.5 1.5 0 0 1 4.5 18V6A1.5 1.5 0 0 1 6 4.5Z"/><path d="M14.5 19.5V16a1.5 1.5 0 0 1 1.5-1.5h3.5"/></svg>',
  doc: '<svg viewBox="0 0 24 24"><path d="M7 3.5h6.5l5 5V19a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z"/><path d="M13.5 3.5V7a1.5 1.5 0 0 0 1.5 1.5h3.5M9 13h6M9 16.5h4"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 3.2 5 6v5.6c0 4.3 3 7.8 7 9.2 4-1.4 7-4.9 7-9.2V6l-7-2.8Z"/></svg>',
  install: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M12 8.5v7M8.5 12h7"/></svg>',
};

/* ---------- render principal ---------- */

function render() {
  renderTabbar();
  const v = $('#view');
  v.className = 'view view-' + ui.tab + (ui.anim ? ' enter' : '');
  v.innerHTML = { today: viewToday, week: viewWeek, month: viewMonth, settings: viewSettings }[ui.tab]();
  ui.anim = false;
  if (ui.tab === 'today') live();
  if (ui.tab === 'month') setTimeout(() => loadPDF().catch(() => { /* sense connexió: es tornarà a provar */ }), 400);
}

function renderTabbar() {
  const tabs = ['today', 'week', 'month', 'settings'];
  $('#tabbar').innerHTML = tabs.map(k => `
    <button class="tab${ui.tab === k ? ' on' : ''}" data-tab="${k}" aria-label="${esc(t('tab_' + k))}"${ui.tab === k ? ' aria-current="page"' : ''}>
      ${ICON[k]}<span>${esc(t('tab_' + k))}</span>
    </button>`).join('');
}

function go(tab) {
  if (tab === ui.tab) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  ui.tab = tab; ui.anim = true;
  if (tab === 'week' && !ui.weekPinned) ui.week = monday(new Date());
  ui.weekPinned = false;
  window.scrollTo(0, 0);
  render();
}

/* ---------- Hoy ---------- */

function ring(pct, extraPct) {
  const R = 84, C = 2 * Math.PI * R;
  const p = Math.min(1, Math.max(0, pct)), x = Math.min(1, Math.max(0, extraPct));
  return `<svg class="ring" viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r="${R}" class="ring-track"/>
    <circle cx="100" cy="100" r="${R}" class="ring-main" style="stroke-dasharray:${(p * C).toFixed(2)} ${C.toFixed(2)};opacity:${p > 0 ? 1 : 0}"/>
    <circle cx="100" cy="100" r="${R}" class="ring-extra" style="stroke-dasharray:${(x * C).toFixed(2)} ${C.toFixed(2)};opacity:${x > 0 ? 1 : 0}"/>
  </svg>`;
}

function viewToday() {
  const now = Date.now();
  const k = keyOf(now);
  const st = status();
  const open = openEntry();
  const target = weekTarget(monday(now));
  const wk = weekMins(monday(now), now);
  const extra = Math.max(0, wk - target), left = Math.max(0, target - wk);
  const name = (db.settings.name || '').trim().split(/\s+/)[0];

  let sub;
  if (st === 'in') sub = t('since', { t: hhmm(open.start) });
  else if (st === 'paused') sub = t('since', { t: hhmm(db.pausedAt) });
  else {
    const last = db.entries.filter(e => e.end != null).sort((a, b) => b.end - a.end)[0];
    sub = last ? t('last_out', { d: relDay(last.end), t: hhmm(last.end) }) : t('first_time');
  }

  const buttons = st === 'out'
    ? `<button class="btn btn-go" data-act="in">${ICON.play}<span>${t('in')}</span></button>`
    : st === 'in'
      ? `<button class="btn btn-pause" data-act="pause">${ICON.pause}<span>${t('pause')}</span></button>
         <button class="btn btn-stop" data-act="out">${ICON.stop}<span>${t('out')}</span></button>`
      : `<button class="btn btn-go" data-act="resume">${ICON.play}<span>${t('resume')}</span></button>
         <button class="btn btn-stop-soft" data-act="out">${ICON.stop}<span>${t('out')}</span></button>`;

  // avisos
  let notices = '';
  if (isIOS && !standalone && !lsGet('jornada-install-ok')) {
    notices += `<div class="notice">
      <div class="notice-ic">${ICON.install}</div>
      <div class="notice-body"><strong>${t('install_title')}</strong><p>${t('install_text')}</p></div>
      <button class="link" data-do="install-ok">${t('dismiss')}</button></div>`;
  }
  if (open && now - open.start > 12 * 3600e3) {
    notices += `<div class="notice warn">
      <div class="notice-body"><p>${t('forgot', { d: fmtHM(minsOf(open, now)) })}</p></div>
      <button class="link" data-day="${keyOf(open.start)}">${t('fix')}</button></div>`;
  }
  const lb = db.settings.lastBackup;
  const backupDays = lb ? Math.floor((now - lb) / 864e5) : null;
  if (db.entries.length >= 3 && (lb == null || backupDays >= 14) && st !== 'in') {
    notices += `<div class="notice">
      <div class="notice-ic">${ICON.shield}</div>
      <div class="notice-body"><p>${lb == null ? t('backup_never') : t('backup_nag', { n: backupDays })}</p></div>
      <button class="link" data-do="backup">${t('backup_do')}</button></div>`;
  }

  return `
  <header class="top">
    <p class="eyebrow">${esc(cap(fmt({ weekday: 'long', day: 'numeric', month: 'long' }, now)))}</p>
    <h1>${esc(name ? t('hello', { n: name }) : t('hello_anon'))}</h1>
  </header>
  ${notices ? `<div class="notices">${notices}</div>` : ''}
  <div class="today">
    <section class="hero">
      <div class="ring-wrap">
        ${ring(wk / target, extra / target)}
        <div class="ring-center">
          <span class="cap">${t('today_cap')}</span>
          <span class="big" id="big"></span>
        </div>
      </div>
      <div class="stats">
        <div class="stat"><span class="cap"><i class="dot dot-ink"></i>${t('week_cap')}</span><b>${fmtHM(wk)}</b><small>${t('of_h', { h: fmtHM(target) })}</small></div>
        ${extra > 0
          ? `<div class="stat"><span class="cap"><i class="dot dot-accent"></i>${t('extra')}</span><b class="c-accent">+${fmtHM(extra)}</b><small>${t('week_n', { n: isoWeek(now) })}</small></div>`
          : left > 0
            ? `<div class="stat"><span class="cap"><i class="dot dot-track"></i>${t('left')}</span><b>${fmtHM(left)}</b><small>${t('week_n', { n: isoWeek(now) })}</small></div>`
            : `<div class="stat"><span class="cap"><i class="dot dot-ink"></i>${t('complete')}</span><b class="c-accent">✓</b><small>${t('week_n', { n: isoWeek(now) })}</small></div>`}
      </div>
    </section>
    <section class="control">
      <button class="state state-${st}" data-day="${k}">
        <i class="pulse"></i>
        <span class="state-txt"><b>${t('st_' + st)}</b><span>${esc(sub)}</span></span>
        ${st === 'paused' ? `<span class="state-dur" id="pausedur"></span>` : ''}
      </button>
      <div class="buttons n${st === 'out' ? 1 : 2}">${buttons}</div>
      <div class="group-head"><h2>${t('tramos_today')}</h2><button class="link" data-day="${k}">${entriesOn(k).length ? t('edit') : t('add')}</button></div>
      ${timeline(k, now)}
    </section>
  </div>`;
}

function timeline(k, now) {
  const list = entriesOn(k);
  if (!list.length) return `<p class="empty">${t('none_today')}</p>`;
  let html = '<ul class="list timeline">';
  list.forEach((e, i) => {
    if (i > 0) {
      const gap = Math.floor(e.start / MIN) - Math.floor(list[i - 1].end / MIN);
      if (gap > 0) html += `<li class="row gap"><i class="tl-dot hollow"></i><span class="row-main">${t('break_')}</span><span class="row-val">${fmtHM(gap)}</span></li>`;
    }
    const running = e.end == null;
    html += `<li class="sw" data-id="${esc(e.id)}">
      <button class="sw-del" data-swdel="${esc(e.id)}">${t('delete')}</button>
      <div class="row sw-row${running ? ' running' : ''}" data-day="${k}">
      <i class="tl-dot"></i>
      <span class="row-main tnum">${hhmm(e.start)} – ${running ? `<span class="c-run">${t('now')}</span>` : hhmm(e.end)}${e.end && keyOf(e.end) !== k ? ` <sup>${t('next_day')}</sup>` : ''}</span>
      <span class="row-val tnum">${fmtHM(minsOf(e, now))}</span></div></li>`;
  });
  if (db.pausedAt && status() === 'paused') {
    html += `<li class="row gap"><i class="tl-dot hollow pulse-o"></i><span class="row-main">${t('break_')} · ${t('running')}</span><span class="row-val tnum">${fmtHM(Math.floor(now / MIN) - Math.floor(db.pausedAt / MIN))}</span></li>`;
  }
  const note = db.notes[k];
  if (note) html += `<li class="row note-row" data-day="${k}">${ICON.note}<span class="row-main">${esc(note)}</span></li>`;
  return html + '</ul>';
}

/* actualización en vivo del contador grande; cada minuto se repinta la vista */
let lastMinute = null;
function live() {
  const big = $('#big');
  if (!big) return;
  const now = Date.now();
  const k = keyOf(now);
  const list = entriesOn(k);
  const open = openEntry();
  let secs = list.filter(e => e.end != null).reduce((s, e) => s + minsOf(e) * 60, 0);
  if (open && keyOf(open.start) === k) secs += Math.floor((now - open.start) / 1000);
  else if (open) secs = Math.floor((now - open.start) / 1000) + secs; // tramo que viene de ayer
  const h = Math.floor(secs / 3600), m = Math.floor(secs / 60) % 60, s = secs % 60;
  big.innerHTML = open
    ? `${h}:${pad(m)}<small>:${pad(s)}</small>`
    : `${h}:${pad(m)}`;
}

/* ---------- Semana ---------- */

function viewWeek() {
  const now = Date.now();
  const mon = ui.week;
  const isCurrent = +mon === +monday(now);
  const target = weekTarget(mon);
  const days = [...Array(7)].map((_, i) => addDays(mon, i));
  const mins = days.map(d => dayMins(keyOf(d), now));
  const total = mins.reduce((a, b) => a + b, 0);
  const extra = Math.max(0, total - target), left = Math.max(0, target - total);
  const todayK = keyOf(now), s0 = startKey();
  // gráfico: escala en múltiplos de 2 h (mín. 8 h) y una línea con la media diaria para llegar al objetivo en 5 días
  const avg = Math.round(target / 5);
  const scale = Math.max(480, Math.ceil(Math.max(avg, ...mins) / 120) * 120);
  const ticks = [0, scale / 2, scale].filter(v => Math.abs(v - avg) > scale * 0.15);
  const y = v => ((v / scale) * 100).toFixed(2);
  // barra: hasta el objetivo en grafito; si se pasa, la escala crece y el exceso va en azul a continuación
  const span = Math.max(total, target);
  const pct = (Math.min(total, target) / span) * 100, xpct = (extra / span) * 100;

  const chart = days.map((d, i) => {
    const k = keyOf(d);
    const fut = d > new Date(now) || k < s0;
    return `<button class="col${k === todayK ? ' is-today' : ''}" data-day="${k}"${fut ? ' disabled' : ''} aria-label="${esc(fmt({ weekday: 'long' }, d))} ${mins[i] ? fmtHM(mins[i]) : ''}">
      <span class="col-zone">${mins[i] ? `<span class="col-bar" style="height:max(3px, ${y(mins[i])}%)"><span class="col-val tnum">${fmtClock(mins[i])}</span></span>` : ''}</span>
      <span class="col-lbl">${L.wd_short[i]}</span>
    </button>`;
  }).join('');
  const grid = ticks.map(v => `<i class="grid" style="bottom:${y(v)}%"><span>${v ? `${v / 60} ${L.h}` : '0'}</span></i>`).join('')
    + `<i class="ref" style="bottom:${y(avg)}%"><span>${fmtClock(avg).replace(':00', '')} ${L.h}</span></i>`;

  const rows = days.map((d, i) => {
    const k = keyOf(d);
    // dies futurs o d'abans del contracte: no es poden editar
    const fut = (d > new Date(now) && k !== todayK) || k < s0;
    const list = entriesOn(k);
    const spans = list.map(e => `${hhmm(e.start)}–${e.end ? hhmm(e.end) : t('now')}`).join(' · ');
    return `<li><button class="row tap" data-day="${k}"${fut ? ' disabled' : ''}>
      <span class="day-k"><b>${esc(fmt({ weekday: 'short' }, d).replace('.', ''))}</b><span>${d.getDate()}</span></span>
      <span class="row-main"><span class="spans tnum">${list.length ? spans : `<span class="muted">${fut ? t('future') : t('no_work')}</span>`}</span>${db.notes[k] ? `<span class="note-line">${esc(db.notes[k])}</span>` : ''}</span>
      <span class="row-val tnum">${mins[i] ? fmtHM(mins[i]) : ''}</span>${fut ? '' : ICON.chev}
    </button></li>`;
  }).join('');

  return `
  <header class="top">
    <p class="eyebrow">${t('week_n', { n: isoWeek(mon) })}</p>
    <div class="title-row">
      <h1>${esc(rangeLabel(mon))}</h1>
      <div class="nav">
        <button class="icon-btn" data-week="-1" aria-label="‹"${+mon <= +firstMon() ? ' disabled' : ''}>${ICON.chevL}</button>
        <button class="icon-btn" data-week="1" aria-label="›"${isCurrent ? ' disabled' : ''}>${ICON.chevR}</button>
      </div>
    </div>
  </header>
  <div class="split">
    <section class="card summary">
      <div class="sum-top">
        <div><span class="cap">${t('worked')}</span><b class="sum-big tnum">${fmtHM(total)}</b><small>${t('of_h', { h: fmtHM(target) })}</small></div>
        ${extra > 0 ? `<span class="pill pill-accent">+${fmtHM(extra)} ${t('extra').toLowerCase()}</span>`
          : left > 0 ? `<span class="pill">${t('left')} ${fmtHM(left)}</span>`
          : `<span class="pill pill-ink">${t('complete')}</span>`}
      </div>
      <div class="bar-track"><i class="bar-main" style="width:${pct}%"></i><i class="bar-extra" style="left:${pct}%;width:${xpct}%"></i></div>
      <div class="chart"><div class="plot">${grid}</div><div class="cols">${chart}</div></div>
      <p class="chart-note">${t('chart_note', { a: fmtHM(avg), w: fmtHM(target) })}</p>
    </section>
    <section>
      <ul class="list days">${rows}</ul>
      <button class="btn-wide" data-share="week">${ICON.share}<span>${t('share_report')}</span></button>
    </section>
  </div>`;
}

/* ---------- Mes (natural, de l'1 a l'últim dia, com el full de registre) ---------- */

function monthData(y, m, now = Date.now()) {
  const [first, last] = monthKeys(y, m);
  const ps = periods(first, last, now);
  const total = ps.reduce((s, p) => s + p.worked, 0), extra = ps.reduce((s, p) => s + p.extra, 0);
  const exps = monthExpenses(y, m);
  const spent = exps.reduce((s, x) => s + expAmount(x), 0);
  const owed = Math.round(((extra / 60) * db.settings.extraRate + spent) * 100) / 100;
  return { periods: ps, total, extra, exps, spent, owed };
}

function viewMonth() {
  const now = Date.now();
  const { y, m } = ui.month;
  const cur = new Date(now);
  const isCurrent = y === cur.getFullYear() && m === cur.getMonth();
  const d = monthData(y, m, now);
  const canPrev = keyOf(new Date(y, m, 0)) >= startKey();
  const short = (o, dt) => fmt(o, dt).replace('.', '');
  const rows = d.periods.map(p => `
    <li><button class="row tap" data-goweek="${+p.mon}"${p.fut ? ' disabled' : ''}>
      <span class="row-main"><b>${t('week_n', { n: isoWeek(p.mon) })}</b><span class="sub">${esc(spanLabel(dateOf(p.a), dateOf(p.b)))}</span></span>
      ${p.extra >= 0.5 ? `<span class="pill pill-accent sm">+${fmtHM(p.extra)}</span>` : ''}
      <span class="row-val tnum">${p.fut ? '' : fmtHM(p.worked)}</span>${p.fut ? '' : ICON.chev}
    </button></li>`).join('');
  const exRows = d.exps.map(x => {
    const dt = dateOf(x.date);
    return `<li><button class="row tap" data-exp="${esc(x.id)}">
      <span class="day-k"><b>${esc(dt.getMonth() !== m ? short({ month: 'short' }, dt) : short({ weekday: 'short' }, dt))}</b><span>${dt.getDate()}</span></span>
      <span class="row-main"><span class="ex-desc">${esc(x.desc)}</span><span class="sub">${x.kind === 'km' ? `${fmtNum(expKm(x))} km${x.rt ? ` · ${t('rt_short')}` : ''}` : t('exp_other')}</span></span>
      <span class="row-val tnum">${fmtEUR(expAmount(x))}</span>${ICON.chev}
    </button></li>`;
  }).join('');

  return `
  <header class="top">
    <p class="eyebrow">${y}</p>
    <div class="title-row">
      <h1>${esc(cap(fmt({ month: 'long' }, new Date(y, m, 1))))}</h1>
      <div class="nav">
        <button class="icon-btn" data-month="-1" aria-label="‹"${canPrev ? '' : ' disabled'}>${ICON.chevL}</button>
        <button class="icon-btn" data-month="1" aria-label="›"${isCurrent ? ' disabled' : ''}>${ICON.chevR}</button>
      </div>
    </div>
  </header>
  <div class="split">
    <section>
      <div class="tiles">
        <div class="tile"><span class="cap">${t('worked')}</span><b class="tnum">${fmtHM(d.total)}</b></div>
        <div class="tile"><span class="cap">${t('extra_h')}</span><b class="tnum ${d.extra >= 0.5 ? 'c-accent' : ''}">${d.extra >= 0.5 ? '+' + fmtHM(d.extra) : '0'}</b></div>
        <div class="tile"><span class="cap">${t('expenses')}</span><b class="tnum">${fmtEUR(d.spent)}</b></div>
        <div class="tile"><span class="cap">${t('to_collect')}</span><b class="tnum">${fmtEUR(d.owed)}</b></div>
      </div>
      <button class="btn-primary" data-pdf="1">${ICON.doc}<span>${t('send_pdf')}</span></button>
      <button class="btn-link" data-share="month">${t('other_formats')}</button>
    </section>
    <section>
      <div class="group-head"><h2>${t('month_weeks')}</h2></div>
      <ul class="list">${rows}</ul>
      <div class="group-head"><h2>${t('expenses')}</h2><button class="link" data-exp="new">${t('add')}</button></div>
      ${exRows ? `<ul class="list">${exRows}</ul>` : `<p class="empty">${t('exp_none')}</p>`}
    </section>
  </div>`;
}

/* ---------- Ajustes ---------- */

function viewSettings() {
  const s = db.settings;
  const lb = s.lastBackup;
  const money = (k, unit) => `<input id="f-${k}" data-set="${k}" data-type="num" inputmode="decimal" value="${esc(fmtNum(s[k]))}" enterkeyhint="done"><span class="unit">${unit}</span>`;
  return `
  <header class="top"><h1>${t('tab_settings')}</h1></header>
  <div class="split">
    <section>
      <div class="group-head"><h2>${t('profile')}</h2></div>
      <ul class="list form">
        <li class="row"><label for="f-name">${t('name')}</label><input id="f-name" data-set="name" value="${esc(s.name)}" autocomplete="name" enterkeyhint="done"></li>
        <li class="row"><label for="f-co">${t('company')}</label><input id="f-co" data-set="company" value="${esc(s.company)}" enterkeyhint="done"></li>
        <li class="row"><label for="f-city">${t('city')}</label><input id="f-city" data-set="city" value="${esc(s.city)}" enterkeyhint="done"></li>
      </ul>
      <div class="group-head"><h2>${t('schedule')}</h2></div>
      <ul class="list form">
        <li class="row"><span class="row-main">${t('weekly')}</span>
          <span class="stepper"><button data-step="-30" aria-label="−">−</button><b class="tnum">${fmtClock(s.weekly)}</b><button data-step="30" aria-label="+">+</button></span></li>
        <li class="row"><label for="f-start">${t('c_start')}</label><input type="date" id="f-start" data-set="start" data-type="date" value="${s.start || ''}"></li>
        <li class="row"><label for="f-end">${t('c_end')}</label><input type="date" id="f-end" data-set="end" data-type="date" value="${s.end || ''}"></li>
      </ul>
      <p class="foot">${t('weekly_foot')}</p>
      <div class="group-head"><h2>${t('pay')}</h2></div>
      <ul class="list form">
        <li class="row"><label for="f-extraRate">${t('extra_rate')}</label>${money('extraRate', '€/h')}</li>
        <li class="row"><label for="f-kmRate">${t('km_rate')}</label>${money('kmRate', '€/km')}</li>
      </ul>
      <p class="foot">${t('pay_foot')}</p>
    </section>
    <section>
      <div class="group-head"><h2>${t('backup')}</h2></div>
      <ul class="list">
        <li><button class="row tap c-link" data-do="backup">${ICON.shield}<span class="row-main">${t('backup_export')}</span></button></li>
        <li><label class="row tap c-link">${ICON.note}<span class="row-main">${t('backup_import')}</span><input type="file" id="f-import" accept=".json,application/json" hidden></label></li>
      </ul>
      <p class="foot">${lb ? t('backup_last', { d: relDay(lb) }) : t('backup_none')} ${t('backup_foot')}</p>
      <div class="group-head"><h2>${t('data')}</h2></div>
      <ul class="list"><li><button class="row tap c-red" data-do="erase"><span class="row-main">${t('erase')}</span></button></li></ul>
      <p class="foot center">${t('about', { v: VERSION })}</p>
    </section>
  </div>`;
}

/* ---------- full d'una despesa ---------- */

function openExpense(id) {
  const x0 = id ? db.expenses.find(x => x.id === id) : null;
  if (id && !x0) return;
  const f = { kind: 'km', desc: '', km1: 0, rt: true, amount: 0, rate: db.settings.kmRate, ...(x0 || { id: uid(), date: keyOf(Date.now()) }) };
  const sheet = openSheet(`
    <div class="sheet-bar">
      <button class="link" data-x="cancel">${t('cancel')}</button>
      <h3>${t(x0 ? 'exp_edit' : 'exp_new')}</h3>
      <button class="link strong" data-x="save">${t('done')}</button>
    </div>
    <div class="sheet-body"></div>`);
  const body = $('.sheet-body', sheet.el);
  const km = () => f.km1 * (f.rt ? 2 : 1);
  const total = () => (f.kind === 'km' ? Math.round(km() * f.rate * 100) / 100 : f.amount);
  const calc = () => (f.kind === 'km' ? `${fmtNum(km())} km × ${fmtNum(f.rate)} €/km` : t('exp_amount'));
  const num = v => (v ? fmtNum(v) : '');

  function draw() {
    const isKm = f.kind === 'km';
    body.innerHTML = `
      <div class="seg" role="tablist">${['km', 'other'].map(k => `<button role="tab" data-kind="${k}" class="${f.kind === k ? 'on' : ''}" aria-selected="${f.kind === k}">${t(k === 'km' ? 'exp_km' : 'exp_other')}</button>`).join('')}</div>
      <ul class="list form">
        <li class="row"><label for="x-date">${t('exp_date')}</label><input type="date" id="x-date" data-f="date" value="${f.date}"></li>
        <li class="row"><label for="x-desc">${t(isKm ? 'exp_route' : 'exp_concept')}</label><input id="x-desc" data-f="desc" value="${esc(f.desc)}" placeholder="${esc(t(isKm ? 'exp_route_ph' : 'exp_concept_ph'))}" enterkeyhint="next"></li>
        ${isKm ? `
        <li class="row"><label for="x-km">${t('exp_km_one')}</label><input id="x-km" data-f="km1" inputmode="decimal" value="${num(f.km1)}" placeholder="0" enterkeyhint="done"><span class="unit">km</span></li>
        <li class="row"><label for="x-rt" class="row-main">${t('exp_rt')}</label><input type="checkbox" class="toggle" id="x-rt" data-f="rt"${f.rt ? ' checked' : ''}></li>`
        : `<li class="row"><label for="x-amt">${t('exp_amount')}</label><input id="x-amt" data-f="amount" inputmode="decimal" value="${num(f.amount)}" placeholder="0" enterkeyhint="done"><span class="unit">€</span></li>`}
      </ul>
      <ul class="list total"><li class="row"><span class="row-main" id="x-calc">${esc(calc())}</span><b class="row-val tnum" id="x-tot">${fmtEUR(total())}</b></li></ul>
      ${x0 ? `<button class="btn-wide c-red" data-x="del">${t('exp_delete')}</button>` : ''}
      <p class="err" hidden></p>`;
  }
  draw();
  const update = () => { $('#x-calc', body).textContent = calc(); $('#x-tot', body).textContent = fmtEUR(total()); };
  body.addEventListener('input', e => {
    const k = e.target.dataset.f;
    if (!k) return;
    f[k] = k === 'rt' ? e.target.checked : k === 'km1' || k === 'amount' ? parseNum(e.target.value) : e.target.value;
    update();
  });
  body.addEventListener('change', e => { if (e.target.dataset.f === 'rt') haptic(); });

  sheet.el.addEventListener('click', e => {
    const kind = e.target.closest('[data-kind]')?.dataset.kind;
    if (kind && kind !== f.kind) { f.kind = kind; haptic(); draw(); return; }
    const x = e.target.closest('[data-x]')?.dataset.x;
    if (x === 'cancel') sheet.close();
    if (x === 'del') {
      const before = JSON.stringify(db);
      db.expenses = db.expenses.filter(z => z.id !== f.id);
      save(); haptic(); sheet.close(); render();
      toast(t('exp_deleted'), () => { db = normalize(JSON.parse(before)); save(); render(); });
    }
    if (x === 'save') {
      const err = $('.err', body);
      if (!isKey(f.date) || !f.desc.trim() || !(f.kind === 'km' ? f.km1 > 0 : f.amount > 0)) {
        err.textContent = t('exp_err'); err.hidden = false; haptic(); return;
      }
      const rec = f.kind === 'km'
        ? { id: f.id, date: f.date, kind: 'km', desc: f.desc.trim(), km1: f.km1, rt: !!f.rt, rate: f.rate }
        : { id: f.id, date: f.date, kind: 'other', desc: f.desc.trim(), amount: Math.round(f.amount * 100) / 100 };
      db.expenses = db.expenses.filter(z => z.id !== f.id).concat(rec);
      save(); haptic(); sheet.close(); render();
      toast(t('exp_saved'));
    }
  });
}

/* ---------- editor de un día ---------- */

function openDay(k) {
  const now = Date.now();
  const isToday = k === keyOf(now);
  let rows = entriesOn(k).map(e => ({ id: e.id, s: hhmm(e.start), e: e.end == null ? '' : hhmm(e.end), s0: e.start, e0: e.end }));
  let note = db.notes[k] || '';
  const title = cap(fmt({ weekday: 'long', day: 'numeric', month: 'long' }, dateOf(k)));

  const sheet = openSheet(`
    <div class="sheet-bar">
      <button class="link" data-x="cancel">${t('cancel')}</button>
      <h3>${esc(title)}</h3>
      <button class="link strong" data-x="save">${t('done')}</button>
    </div>
    <div class="sheet-body"></div>`);
  const body = $('.sheet-body', sheet.el);

  const parse = r => {
    if (!r.s) return null;
    const start = r.s === (r.s0 != null ? hhmm(r.s0) : null) ? r.s0 : at(k, r.s);
    if (!r.e) return { start, end: null };
    let end = r.e0 != null && r.e === hhmm(r.e0) ? r.e0 : at(k, r.e);
    if (end <= start) end += 864e5;
    return { start, end };
  };
  const totalMins = () => rows.reduce((s, r) => { const p = parse(r); return p ? s + minsOf(p) : s; }, 0);

  function draw() {
    body.innerHTML = `
      <ul class="list edit">
        ${rows.map((r, i) => {
          const p = parse(r);
          return `<li class="row" data-i="${i}">
            <button class="del" data-del="${i}" aria-label="${t('delete')}">${ICON.minus}</button>
            <label class="tfield"><span>${t('in_short')}${p && keyOf(p.start) !== k ? ` <sup>${t('next_day')}</sup>` : ''}</span><input type="time" data-f="s" value="${r.s}"></label>
            <span class="arrow">→</span>
            <label class="tfield"><span>${t('out_short')}${p && p.end && keyOf(p.end) !== k ? ` <sup>${t('next_day')}</sup>` : ''}</span><input type="time" data-f="e" value="${r.e}"${!r.e ? ' class="is-open"' : ''}></label>
            <span class="row-val tnum">${p ? fmtHM(minsOf(p)) : ''}</span>
          </li>`;
        }).join('')}
        <li><button class="row tap c-link" data-x="add">${ICON.plus}<span class="row-main">${t('add_tramo')}</span></button></li>
      </ul>
      ${isToday && rows.some(r => !r.e) ? `<p class="foot">${t('open_hint')}</p>` : ''}
      <ul class="list total"><li class="row"><span class="row-main">${t('day_total')}</span><b class="row-val tnum" id="d-total">${fmtHM(totalMins())}</b></li></ul>
      <div class="group-head"><h2>${t('note')}</h2></div>
      <textarea class="note" rows="2" placeholder="${esc(t('note_ph'))}">${esc(note)}</textarea>
      <p class="err" hidden></p>`;
  }
  draw();

  body.addEventListener('input', e => {
    const f = e.target.dataset.f;
    if (f) {
      const i = +e.target.closest('[data-i]').dataset.i;
      rows[i][f] = e.target.value;
      const p = parse(rows[i]);
      $('.row-val', e.target.closest('[data-i]')).textContent = p ? fmtHM(minsOf(p)) : '';
      $('#d-total', body).textContent = fmtHM(totalMins());
      e.target.classList.toggle('is-open', !e.target.value);
    }
    if (e.target.classList.contains('note')) note = e.target.value;
  });
  body.addEventListener('change', e => { if (e.target.dataset.f) draw(); });

  sheet.el.addEventListener('click', e => {
    const del = e.target.closest('[data-del]');
    if (del) { rows.splice(+del.dataset.del, 1); haptic(); draw(); return; }
    const x = e.target.closest('[data-x]')?.dataset.x;
    if (x === 'cancel') sheet.close();
    if (x === 'add') {
      // propuesta: 4 h tras el último tramo (con 1 h de pausa), o antes del primero si el último sigue abierto
      const ps = rows.map(parse).filter(Boolean).sort((a, b) => a.start - b.start);
      const dayStart = +dateOf(k), dayEnd = +addDays(dateOf(k), 1) - MIN;
      const limit = isToday ? Math.min(dayEnd, Date.now()) : dayEnd;
      let s, e2;
      if (!ps.length) { s = at(k, '09:00'); e2 = at(k, '13:00'); }
      else if (ps[ps.length - 1].end != null) { s = ps[ps.length - 1].end + 60 * MIN; e2 = s + 240 * MIN; }
      else { e2 = ps[0].start - 60 * MIN; s = e2 - 240 * MIN; }
      e2 = Math.min(e2, limit); s = Math.max(dayStart, Math.min(s, e2 - 30 * MIN));
      rows.push({ id: uid(), s: hhmm(s), e: hhmm(e2), s0: null, e0: null });
      rows.sort((a, b) => (parse(a)?.start ?? 0) - (parse(b)?.start ?? 0));
      draw();
    }
    if (x === 'save') {
      const err = $('.err', body);
      const parsed = [];
      for (const r of rows) {
        const p = parse(r);
        if (!p) continue;
        parsed.push({ id: r.id, ...p, ...(keyOf(p.start) !== k ? { day: k } : {}) });
      }
      parsed.sort((a, b) => a.start - b.start);
      const fail = msg => { err.textContent = msg; err.hidden = false; haptic(); };
      for (let i = 0; i < parsed.length; i++) {
        const p = parsed[i];
        if (p.end == null && !(isToday && i === parsed.length - 1)) return fail(isToday ? t('err_open') : t('err_noend'));
        if (p.end == null && p.start > Date.now()) return fail(t('err_future'));
        if (p.end != null && p.end > Date.now() + MIN) return fail(t('err_future'));
        if (i > 0 && p.start < parsed[i - 1].end) return fail(t('err_overlap'));
      }
      const others = db.entries.filter(e => dayOf(e) !== k);
      if (parsed.some(p => p.end == null) && others.some(e => e.end == null)) return fail(t('err_open'));
      db.entries = others.concat(parsed);
      if (note.trim()) db.notes[k] = note.trim(); else delete db.notes[k];
      if (openEntry()) db.pausedAt = null;
      else if (isToday && db.pausedAt) {
        const lastToday = parsed[parsed.length - 1];
        db.pausedAt = lastToday ? lastToday.end : null;
      }
      save();
      haptic();
      sheet.close();
      render();
      toast(t('saved'));
    }
  });
}

/* ---------- lliscar un tram cap a l'esquerra per eliminar-lo (com a iOS) ---------- */

const SW = 88;
const swipe = { el: null, open: null, x0: 0, y0: 0, x: 0, base: 0, lock: null, block: false };

function swipeSet(row, x, anim) {
  const li = row.parentElement;
  row.style.transition = anim ? '' : 'none';
  row.style.transform = x ? `translateX(${x}px)` : '';
  // el botó vermell només ocupa el que s'ha destapat
  li.classList.toggle('dragging', !anim);
  li.style.setProperty('--sw', `${-x}px`);
  li.classList.toggle('is-full', -x > row.offsetWidth * 0.55);
}
function swipeClose() {
  if (swipe.open) swipeSet(swipe.open, 0, true);
  swipe.open = null;
}
function blockClick() { swipe.block = true; setTimeout(() => { swipe.block = false; }, 400); }

document.addEventListener('pointerdown', e => {
  const row = e.target.closest('.sw-row');
  if (swipe.open && row !== swipe.open && !e.target.closest('.sw-del')) { swipeClose(); blockClick(); return; }
  if (!row) return;
  Object.assign(swipe, { el: row, x0: e.clientX, y0: e.clientY, x: 0, lock: null, base: row === swipe.open ? -SW : 0 });
});
document.addEventListener('pointermove', e => {
  const row = swipe.el;
  if (!row) return;
  const dx = e.clientX - swipe.x0, dy = e.clientY - swipe.y0;
  if (!swipe.lock) {
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
    swipe.lock = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    if (swipe.lock === 'x') try { row.setPointerCapture(e.pointerId); } catch { /* sense captura */ }
  }
  if (swipe.lock !== 'x') return;
  swipe.x = Math.min(0, swipe.base + dx);
  const wasFull = row.parentElement.classList.contains('is-full');
  swipeSet(row, swipe.x, false);
  if (wasFull !== row.parentElement.classList.contains('is-full')) haptic();
});
function swipeEnd() {
  const row = swipe.el;
  swipe.el = null;
  // tocar la fila oberta la tanca, sense obrir l'editor
  if (row && !swipe.lock && row === swipe.open) { swipeClose(); blockClick(); return; }
  if (!row || swipe.lock !== 'x') return;
  blockClick();
  if (row.parentElement.classList.contains('is-full')) return delEntry(row.parentElement.dataset.id);
  const open = -swipe.x > SW / 2;
  swipeSet(row, open ? -SW : 0, true);
  swipe.open = open ? row : null;
}
document.addEventListener('pointerup', swipeEnd);
document.addEventListener('pointercancel', swipeEnd);
// el toc que acaba un lliscament no ha d'obrir l'editor
document.addEventListener('click', e => {
  if (swipe.block && !e.target.closest('.sw-del')) { e.stopPropagation(); e.preventDefault(); swipe.block = false; }
}, true);

function delEntry(id) {
  const e = db.entries.find(x => x.id === id);
  if (!e) return;
  const before = JSON.stringify(db);
  const li = $(`.sw[data-id="${CSS.escape(id)}"]`);
  swipe.open = null;
  if (li) swipeSet($('.sw-row', li), -li.offsetWidth, true);
  db.entries = db.entries.filter(x => x !== e);
  if (e.end == null) db.pausedAt = null;
  else if (db.pausedAt) { const last = entriesOn(keyOf(db.pausedAt)).pop(); db.pausedAt = last && last.end != null ? last.end : null; }
  save();
  haptic();
  setTimeout(render, li ? 220 : 0);
  toast(t('deleted'), () => { db = normalize(JSON.parse(before)); save(); render(); });
}

/* ---------- informes ---------- */

function reportScope(scope, now = Date.now()) {
  const today = keyOf(now);
  if (scope === 'week') {
    const mon = ui.week, sun = keyOf(addDays(mon, 6));
    return { periods: periods(keyOf(mon), sun < today ? sun : today, now), exps: [], title: `${t('week_n', { n: isoWeek(mon) })} · ${rangeLabel(mon)} ${mon.getFullYear()}` };
  }
  const { y, m } = ui.month;
  const [first, last] = monthKeys(y, m);
  return { periods: periods(first, last < today ? last : today, now), exps: monthExpenses(y, m), title: cap(fmt({ month: 'long', year: 'numeric' }, new Date(y, m, 1))) };
}
function who() {
  const s = db.settings;
  return [s.name, s.company].map(x => (x || '').trim()).filter(Boolean).join(' · ');
}
const expLabel = x => (x.kind === 'km' ? `${x.desc}${x.rt ? `, ${t('rt_short')}` : ''}` : x.desc);
function* daysOf(p) { for (let d = dateOf(p.a); keyOf(d) <= p.b; d = addDays(d, 1)) yield d; }

function reportText(scope) {
  const { periods: ps, exps, title } = reportScope(scope);
  const lines = [`${t('rep_title')}${who() ? ' · ' + who() : ''}`, title, ''];
  let tot = 0, ext = 0;
  for (const p of ps) {
    if (ps.length > 1) lines.push(t('rep_week', { n: isoWeek(p.mon), r: spanLabel(dateOf(p.a), dateOf(p.b)) }));
    for (const d of daysOf(p)) {
      const k = keyOf(d), list = entriesOn(k);
      if (!list.length) continue;
      const spans = list.map(e => `${hhmm(e.start)}–${e.end ? hhmm(e.end) : t('now')}`).join(', ');
      const x = dayExtra(k);
      lines.push(`${fmt({ weekday: 'short' }, d).replace('.', '')} ${d.getDate()}/${d.getMonth() + 1}  ${spans}  →  ${fmtHM(dayMins(k))}${x >= 0.5 ? ` · ${t('rep_extra_w', { t: fmtHM(x) })}` : ''}${db.notes[k] ? `  (${db.notes[k]})` : ''}`);
    }
    tot += p.worked; ext += p.extra;
    if (ps.length > 1) lines.push(`${t('rep_week_tot', { t: fmtHM(p.worked) })}${p.extra >= 0.5 ? ` (${t('rep_extra_w', { t: fmtHM(p.extra) })})` : ''}`, '');
  }
  if (ps.length <= 1) lines.push('');
  lines.push(scope === 'week' ? t('rep_total', { t: fmtHM(tot), p: fmtHM(weekTarget(ui.week)) }) : t('rep_total_m', { t: fmtHM(tot) }));
  lines.push(ext >= 0.5 ? t('rep_extra', { t: fmtHM(ext) }) : t('rep_noextra'));
  if (exps.length) {
    lines.push('', `${t('expenses')}:`);
    for (const x of exps) {
      const d = dateOf(x.date);
      lines.push(`${d.getDate()}/${d.getMonth() + 1}  ${expLabel(x)}${x.kind === 'km' ? ` · ${fmtNum(expKm(x))} km` : ''}  →  ${fmtEUR(expAmount(x))}`);
    }
    lines.push(t('rep_exp_tot', { t: fmtEUR(exps.reduce((s, x) => s + expAmount(x), 0)) }));
  }
  if (scope === 'month') lines.push('', t('rep_owed', { t: fmtEUR(monthData(ui.month.y, ui.month.m).owed) }));
  return lines.join('\n');
}

/* CSV amb les mateixes columnes que el full de registre */
function reportCSV(scope) {
  const { periods: ps, exps } = reportScope(scope);
  const dec = m => (m >= 0.5 ? (m / 60).toFixed(2).replace('.', ',') : '');
  const eur = v => v.toFixed(2).replace('.', ',');
  const q = v => (/[";\n]/.test(v) ? `"${String(v).replace(/"/g, '""')}"` : v);
  const dmy = d => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  const out = [L.csv_head.join(';')];
  let tot = 0, ext = 0;
  for (const p of ps) {
    for (const d of daysOf(p)) {
      const k = keyOf(d), mins = dayMins(k);
      if (!mins && !db.notes[k]) continue;
      const sl = daySlots(k);
      const col = (list, end) => list.map(e => (end ? (e.end ? clockAt(k, e.end) : '') : clockAt(k, e.start))).join(' / ');
      const x = dayExtra(k);
      tot += mins; ext += x;
      out.push([dmy(d), fmt({ weekday: 'long' }, d), col(sl.mati), col(sl.mati, 1), col(sl.tarda), col(sl.tarda, 1), col(sl.nit), col(sl.nit, 1), dec(mins), dec(x), q(db.notes[k] || '')].join(';'));
    }
  }
  out.push([L.csv_tot, '', '', '', '', '', '', '', dec(tot), dec(ext), ''].join(';'));
  if (exps.length) {
    out.push('', L.csv_exp, L.csv_exp_head.join(';'));
    for (const x of exps) out.push([dmy(dateOf(x.date)), q(expLabel(x)), x.kind === 'km' ? fmtNum(expKm(x)) : '', eur(expAmount(x))].join(';'));
    out.push([L.csv_tot, '', fmtNum(exps.reduce((s, x) => s + expKm(x), 0)), eur(exps.reduce((s, x) => s + expAmount(x), 0))].join(';'));
  }
  return '\ufeff' + out.join('\r\n');
}

function fileStamp(scope) {
  if (scope === 'week') return `${ui.week.getFullYear()}-S${pad(isoWeek(ui.week))}`;
  return `${ui.month.y}-${pad(ui.month.m + 1)}`;
}
function slug(s) { return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w]+/g, '-').replace(/^-|-$/g, ''); }

function shareReport(scope) {
  actionSheet([
    { label: t('sh_text'), fn: () => shareText(reportText(scope)) },
    { label: t('sh_csv'), fn: () => shareFile(`Jornada-${slug(db.settings.name) || 'registre'}-${fileStamp(scope)}.csv`, 'text/csv', reportCSV(scope)) },
    { label: t('sh_copy'), fn: async () => { try { await navigator.clipboard.writeText(reportText(scope)); toast(t('copied')); } catch { shareText(reportText(scope)); } } },
  ]);
}

/* ---------- registre mensual en PDF (jsPDF i pdf.js es carreguen quan cal) ---------- */

const BASE = (document.currentScript?.src || location.href).replace(/[^/]*$/, '');
let pdfLib = null;
function loadScript(src) {
  return new Promise((ok, ko) => { const el = document.createElement('script'); el.src = src; el.onload = ok; el.onerror = ko; document.head.append(el); });
}
function loadPDF() {
  pdfLib ||= loadScript(BASE + 'vendor/jspdf.umd.min.js').then(() => loadScript(BASE + 'pdf.js')).catch(e => { pdfLib = null; throw e; });
  return pdfLib;
}
async function sendPDF() {
  const { y, m } = ui.month;
  const ready = !!window.registrePDF;
  try { if (!ready) await loadPDF(); } catch { return dialog({ title: t('pdf_err'), buttons: [{ label: 'OK' }] }); }
  const who = (db.settings.name || '').trim();
  const name = `Registre ${fmt({ month: 'long' }, new Date(y, m, 1))} ${y}${who ? ' - ' + who : ''}.pdf`;
  const blob = registrePDF(y, m);
  // si s'ha hagut de carregar, el toc original ja ha caducat i compartir necessita un toc nou
  if (!ready && !(await dialog({ title: t('pdf_ready'), buttons: [{ label: t('cancel'), value: false }, { label: t('share'), value: true, strong: true }] }))) return;
  shareFile(name, 'application/pdf', blob);
}

async function shareText(text) {
  if (navigator.share) { try { await navigator.share({ text }); } catch { /* cancelado */ } return; }
  try { await navigator.clipboard.writeText(text); toast(t('copied')); } catch { /* sin permisos */ }
}
async function shareFile(name, type, content) {
  const file = new File([content], name, { type });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try { await navigator.share({ files: [file] }); return true; }
    catch (e) { if (e.name === 'AbortError') return false; }
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file); a.download = name;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 10000);
  return true;
}

/* ---------- copias de seguridad ---------- */

async function backup() {
  const d = new Date();
  const name = `Jornada-copia-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}.json`;
  const data = JSON.stringify({ app: 'jornada', exportedAt: d.toISOString(), ...db, settings: { ...db.settings, lastBackup: Date.now() } }, null, 1);
  if (await shareFile(name, 'application/json', data)) {
    db.settings.lastBackup = Date.now(); save(); render();
  }
}

async function importFile(file) {
  let d;
  try { d = normalize(JSON.parse(await file.text())); } catch { d = null; }
  if (!d) return dialog({ title: t('import_bad'), buttons: [{ label: 'OK' }] });
  const ids = new Set(db.entries.map(e => e.id)), xids = new Set(db.expenses.map(x => x.id));
  const clash = e => db.entries.some(o => o.start < (e.end ?? Infinity) && e.start < (o.end ?? Infinity));
  const add = d.entries.filter(e => !ids.has(e.id) && !clash(e));
  const addX = d.expenses.filter(x => !xids.has(x.id));
  if (!add.length && !addX.length) return dialog({ title: t('import_none'), buttons: [{ label: 'OK' }] });
  const when = d.updatedAt ? `${fmt({ day: 'numeric', month: 'short', year: 'numeric' }, d.updatedAt)}` : file.name;
  const ok = await dialog({ title: t('import_q'), message: t('import_msg', { a: add.length, b: addX.length, d: when }), buttons: [{ label: t('cancel'), value: false }, { label: t('restore'), value: true, strong: true }] });
  if (!ok) return;
  lsSet(KEY + '-antes-de-restaurar', JSON.stringify(db));
  db.entries.push(...add);
  db.expenses.push(...addX);
  for (const [k, v] of Object.entries(d.notes)) if (!db.notes[k]) db.notes[k] = v;
  db.settings = { ...db.settings, ...d.settings, lastBackup: db.settings.lastBackup };
  save(); render(); toast(t('import_ok'));
}

async function erase() {
  const ok = await dialog({ title: t('erase_q'), message: t('erase_msg'), buttons: [{ label: t('cancel'), value: false }, { label: t('erase_btn'), value: true, danger: true }] });
  if (!ok) return;
  lsSet(KEY + '-antes-de-borrar', JSON.stringify(db));
  db = { ...structuredClone(DEFAULTS), settings: db.settings };
  save(); render(); toast(t('erased'));
}

/* ---------- capas: hoja, diálogo, menú, aviso ---------- */

function openSheet(inner) {
  const wrap = document.createElement('div');
  wrap.className = 'layer sheet-layer';
  wrap.innerHTML = `<div class="backdrop"></div><div class="sheet" role="dialog" aria-modal="true"><div class="grabber"></div>${inner}</div>`;
  $('#layers').append(wrap);
  document.body.classList.add('locked');
  requestAnimationFrame(() => requestAnimationFrame(() => wrap.classList.add('open')));
  const close = () => {
    wrap.classList.remove('open');
    wrap.addEventListener('transitionend', () => { wrap.remove(); if (!$('#layers').children.length) document.body.classList.remove('locked'); }, { once: true });
    setTimeout(() => { if (wrap.isConnected) { wrap.remove(); if (!$('#layers').children.length) document.body.classList.remove('locked'); } }, 500);
  };
  $('.backdrop', wrap).addEventListener('click', close);
  // arrastrar hacia abajo para cerrar
  const sh = $('.sheet', wrap);
  let y0 = null, dy = 0;
  sh.addEventListener('touchstart', e => {
    if (!e.target.closest('.grabber, .sheet-bar') || e.target.closest('button')) return;
    y0 = e.touches[0].clientY; dy = 0; sh.style.transition = 'none';
  }, { passive: true });
  sh.addEventListener('touchmove', e => {
    if (y0 == null) return;
    dy = Math.max(0, e.touches[0].clientY - y0);
    sh.style.transform = `translateY(${dy}px)`;
  }, { passive: true });
  sh.addEventListener('touchend', () => {
    if (y0 == null) return;
    sh.style.transition = ''; sh.style.transform = '';
    if (dy > 110) close();
    y0 = null;
  });
  return { el: wrap, close };
}

function dialog({ title, message = '', buttons }) {
  return new Promise(resolve => {
    const wrap = document.createElement('div');
    wrap.className = 'layer alert-layer';
    wrap.innerHTML = `<div class="backdrop"></div><div class="alert" role="alertdialog" aria-modal="true">
      <div class="alert-txt"><h3>${esc(title)}</h3>${message ? `<p>${esc(message)}</p>` : ''}</div>
      <div class="alert-btns n${buttons.length}">${buttons.map((b, i) => `<button data-i="${i}" class="${b.strong ? 'strong' : ''}${b.danger ? ' danger' : ''}">${esc(b.label)}</button>`).join('')}</div></div>`;
    $('#layers').append(wrap);
    requestAnimationFrame(() => requestAnimationFrame(() => wrap.classList.add('open')));
    wrap.addEventListener('click', e => {
      const b = e.target.closest('[data-i]');
      if (!b) return;
      wrap.classList.remove('open');
      setTimeout(() => wrap.remove(), 220);
      resolve(buttons[+b.dataset.i].value);
    });
  });
}

function actionSheet(items) {
  const wrap = document.createElement('div');
  wrap.className = 'layer action-layer';
  wrap.innerHTML = `<div class="backdrop"></div><div class="actions">
    <div class="act-group">${items.map((it, i) => `<button data-i="${i}">${esc(it.label)}</button>`).join('')}</div>
    <div class="act-group"><button class="strong" data-i="-1">${t('cancel')}</button></div></div>`;
  $('#layers').append(wrap);
  requestAnimationFrame(() => requestAnimationFrame(() => wrap.classList.add('open')));
  const close = () => { wrap.classList.remove('open'); setTimeout(() => wrap.remove(), 300); };
  wrap.addEventListener('click', e => {
    const b = e.target.closest('[data-i]');
    if (!b && !e.target.classList.contains('backdrop')) return;
    close();
    // la llamada a share debe ir dentro del gesto del usuario
    if (b && +b.dataset.i >= 0) items[+b.dataset.i].fn();
  });
}

let toastTimer;
function toast(msg, undo) {
  const el = $('#toast');
  el.innerHTML = `<span>${esc(msg)}</span>${undo ? `<button class="link">${t('undo')}</button>` : ''}`;
  el.classList.add('show');
  if (undo) $('button', el).onclick = () => { undo(); el.classList.remove('show'); haptic(); };
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), undo ? 5000 : 2200);
}

/* vibración ligera en iOS 18+ (truco del interruptor nativo) */
function haptic() {
  try {
    if (navigator.vibrate) { navigator.vibrate(12); return; }
    const l = document.createElement('label');
    const i = document.createElement('input');
    i.type = 'checkbox'; i.setAttribute('switch', '');
    l.append(i); l.style.display = 'none';
    document.body.append(l); l.click(); l.remove();
  } catch { /* sin vibración */ }
}

function requestPersist() { try { navigator.storage?.persist?.(); } catch { /* opcional */ } }
function lsGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch { /* lleno */ } }

const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const standalone = navigator.standalone === true || matchMedia('(display-mode: standalone)').matches;

/* ---------- eventos ---------- */

document.addEventListener('click', e => {
  const el = e.target.closest('button, [data-day], [data-goweek]');
  if (!el || el.disabled) return;
  const d = el.dataset;
  if (d.tab) return go(d.tab);
  if (d.act) return act(d.act);
  if (d.share) return shareReport(d.share);
  if (d.pdf) return sendPDF();
  if (d.exp) return openExpense(d.exp === 'new' ? null : d.exp);
  if (d.week) { ui.week = addDays(ui.week, 7 * +d.week); haptic(); return render(); }
  if (d.month) {
    const n = new Date(ui.month.y, ui.month.m + +d.month, 1);
    ui.month = { y: n.getFullYear(), m: n.getMonth() }; haptic(); return render();
  }
  if (d.goweek) { ui.week = monday(new Date(+d.goweek)); ui.weekPinned = true; return go('week'); }
  if (d.step) {
    db.settings.weekly = Math.min(60 * 60, Math.max(30, db.settings.weekly + +d.step));
    save(); haptic(); return render();
  }
  if (d.do === 'install-ok') { lsSet('jornada-install-ok', '1'); return render(); }
  if (d.do === 'backup') return backup();
  if (d.do === 'erase') return erase();
  if (d.swdel) return delEntry(d.swdel);
  if (d.day && !el.closest('.layer')) return openDay(d.day);
});

document.addEventListener('change', e => {
  const k = e.target.dataset.set;
  if (k) {
    const type = e.target.dataset.type, v = e.target.value;
    db.settings[k] = type === 'num' ? parseNum(v) : type === 'date' ? (isKey(v) ? v : null) : v.trim();
    if (type === 'num') e.target.value = fmtNum(db.settings[k]);
    save();
  }
  if (e.target.id === 'f-import' && e.target.files[0]) { importFile(e.target.files[0]); e.target.value = ''; }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.matches('input[data-set]')) e.target.blur();
});

/* reloj: segundos en Hoy y repintado cada minuto (o al volver a la app) */
setInterval(() => {
  if ($('#layers').children.length && ui.tab !== 'today') return;
  const m = Math.floor(Date.now() / MIN);
  if (m !== lastMinute && !swipe.open && !swipe.el) {
    lastMinute = m;
    if (ui.tab !== 'settings' && !document.activeElement?.matches('input, select, textarea')) render();
  } else if (ui.tab === 'today') live();
}, 1000);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') { db = load(); lastMinute = Math.floor(Date.now() / MIN); if (ui.tab !== 'settings') render(); }
});

/* ---------- arranque ---------- */

lastMinute = Math.floor(Date.now() / MIN);
render();
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
