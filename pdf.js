'use strict';
/* Registre mensual en PDF amb el format del full de Milnotes («Registre treballadors a temps parcial»)
   i un annex amb les setmanes, els desplaçaments i el que queda per cobrar. Fa servir jsPDF i les dades de l'app. */
(() => {
  const MESOS = ['gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre'];
  const DIES = ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'];
  const DIES_LLARGS = ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte'];
  const deMes = m => (/^[aeo]/.test(MESOS[m]) ? "d'" : 'de ') + MESOS[m];
  const dataLlarga = k => { const d = dateOf(k); return `${d.getDate()} ${deMes(d.getMonth())}`; };
  const rang = (a, b) => (a === b ? dataLlarga(b) : `${dateOf(a).getDate()} – ${dataLlarga(b)}`);
  const dmy = k => { const d = dateOf(k); return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`; };
  const hores = m => fmtNum(m / 60);
  const horesCel = m => (m >= 0.5 ? hores(m) : '');

  // A4 en mil·límetres
  const PW = 210, PH = 297, ML = 14, W = 182, MB = 14;
  const INK = [29, 29, 31], MUTED = [110, 110, 115], RULE = [150, 150, 156], HEAD = [240, 240, 243], WEEKEND = [248, 248, 250];
  const pt = v => v * 0.3528;

  window.registrePDF = function (y, m, now = Date.now()) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
    const s = db.settings, today = keyOf(now);
    const [first, last] = monthKeys(y, m);
    const fins = last < today ? last : today;
    const s0 = startKey(), from = first > s0 ? first : s0;
    const ps = periods(first, fins, now).filter(p => !p.fut);
    const exps = monthExpenses(y, m);
    const MES = `${cap(MESOS[m])} ${y}`;
    const contracte = fmtNum(s.weekly / 60);

    doc.setProperties({ title: `Registre ${MES} - ${s.name}`, author: s.name, subject: 'Registre treballadors a temps parcial', creator: 'Jornada' });
    doc.setLineWidth(0.2);
    doc.setDrawColor(...RULE);

    const font = (size, style = 'normal', color = INK) => { doc.setFont('helvetica', style); doc.setFontSize(size); doc.setTextColor(...color); };
    const box = (x, y0, w, h, fill) => { if (fill) { doc.setFillColor(...fill); doc.rect(x, y0, w, h, 'F'); } doc.rect(x, y0, w, h, 'S'); };
    // text dins d'una cel·la, centrat en vertical (una o més línies)
    function inCell(lines, x, y0, w, h, { align = 'center', size = 7.5, style = 'normal', color = INK, pad: p = 1.8, lh } = {}) {
      lines = [].concat(lines).filter(l => l !== '' && l != null);
      if (!lines.length) return;
      font(size, style, color);
      const LH = lh || pt(size) * 1.2, capH = pt(size) * 0.72;
      const top = y0 + (h - LH * lines.length) / 2;
      const tx = align === 'left' ? x + p : align === 'right' ? x + w - p : x + w / 2;
      lines.forEach((l, i) => doc.text(String(l), tx, top + LH * i + (LH + capH) / 2, { align }));
    }
    function underlined(str, x, y0, size, style = 'bold') {
      font(size, style);
      doc.text(str, x, y0);
      doc.setDrawColor(...INK); doc.setLineWidth(0.25);
      doc.line(x, y0 + 0.9, x + doc.getTextWidth(str), y0 + 0.9);
      doc.setDrawColor(...RULE); doc.setLineWidth(0.2);
    }

    /* ---------- pàgina 1: el full de registre ---------- */

    underlined('REGISTRE TREBALLADORS A TEMPS PARCIAL', ML, 20, 13);
    [['EMPRESA:', s.company], ['TREBALLADOR:', s.name], ['HORES SEGONS CONTRACTE:', `${contracte} h setmanals (de dilluns a diumenge)`], ['MES/ANY:', MES]]
      .forEach(([label, value], i) => {
        const yy = 31 + i * 6.4;
        underlined(label, ML, yy, 8.5);
        font(10, label === 'MES/ANY:' ? 'bold' : 'normal');
        doc.text(String(value || ''), ML + 50, yy);
      });

    // columnes: dia, matí/tarda/nit (entrada i sortida), hores, extres, concepte
    const CW = [13, 14, 14, 14, 14, 14, 14, 14, 14, 57];
    const X = CW.reduce((a, w, i) => (a.push(i ? a[i - 1] + CW[i - 1] : ML), a), []);
    const T0 = 59, H1 = 5, H2 = 4.4;
    function header(top) {
      box(X[0], top, CW[0], H1 + H2, HEAD); inCell('DIA', X[0], top, CW[0], H1 + H2, { style: 'bold', size: 6.8 });
      ['MATÍ', 'TARDA', 'NIT'].forEach((g, i) => {
        const x = X[1 + i * 2];
        box(x, top, CW[1] * 2, H1, HEAD); inCell(g, x, top, CW[1] * 2, H1, { style: 'bold', size: 6.8 });
        ['ENTRADA', 'SORTIDA'].forEach((sub, j) => { box(x + CW[1] * j, top + H1, CW[1], H2, HEAD); inCell(sub, x + CW[1] * j, top + H1, CW[1], H2, { style: 'bold', size: 5.6 }); });
      });
      [['T. HORES', 7], ['T. EXTRES', 8], ['CONCEPTE', 9]].forEach(([lbl, i]) => { box(X[i], top, CW[i], H1 + H2, HEAD); inCell(lbl, X[i], top, CW[i], H1 + H2, { style: 'bold', size: 6.8 }); });
      return top + H1 + H2;
    }

    const LH = 2.95;
    const rows = [];
    let totMins = 0, totExtra = 0, nextDay = false;
    for (let d = dateOf(first); keyOf(d) <= last; d = addDays(d, 1)) {
      const k = keyOf(d), active = k >= s0 && k <= fins;
      const sl = active ? daySlots(k) : { mati: [], tarda: [], nit: [] };
      const cells = ['mati', 'tarda', 'nit'].flatMap(p => [sl[p].map(e => clockAt(k, e.start)), sl[p].map(e => (e.end ? clockAt(k, e.end) : 'ara'))]);
      if (cells.some(c => c.some(v => v.endsWith('*')))) nextDay = true;
      const mins = active ? dayMins(k, now) : 0, x = active ? dayExtra(k, now) : 0;
      totMins += mins; totExtra += x;
      font(7);
      const concept = active && db.notes[k] ? doc.splitTextToSize(db.notes[k], CW[9] - 3.6) : [];
      rows.push({ d, cells, mins, x, concept, n: Math.max(1, ...cells.map(c => c.length), concept.length), we: d.getDay() % 6 === 0 });
    }

    // peu: notes, base legal i signatures
    let foot = `T. HORES: hores treballades el dia. T. EXTRES: part d'aquestes hores que passa de les ${contracte} h setmanals de contracte (vegeu l'annex).`;
    if (nextDay) foot += ' * Hora del dia següent (passada la mitjanit).';
    if (fins < last) foot += ` Registre actualitzat fins al ${dataLlarga(fins)}.`;
    const legal = "Registre basat en l'obligació establerta a l'art. 12.4.c del text refós de l'Estatut dels Treballadors (RDL 2/2015).";
    font(7, 'italic');
    const footL = doc.splitTextToSize(foot, W), legalL = doc.splitTextToSize(legal, W);
    const SIG_H = 24, sigY = PH - MB - 8 - SIG_H;
    const notesH = (footL.length + legalL.length) * 3.1 + 2;

    // alçada de fila perquè tot el mes càpiga en una pàgina
    const B0 = T0 + H1 + H2;
    const bodyMax = sigY - 5 - notesH - 4 - 6.4 - 3 - B0;
    const extraH = rows.reduce((a, r) => a + Math.max(0, r.n * LH + 1.4 - 4.4), 0);
    const rowH = Math.min(6.4, Math.max(4.4, (bodyMax - extraH) / rows.length));
    const heights = rows.map(r => Math.max(rowH, r.n * LH + 1.4));
    const fits = heights.reduce((a, h) => a + h, 0) <= bodyMax + 0.5;

    let yy = header(T0);
    rows.forEach((r, i) => {
      const h = heights[i];
      if (yy + h > PH - MB - 8) { doc.addPage(); yy = header(20); }
      const fill = r.we ? WEEKEND : null;
      box(X[0], yy, CW[0], h, fill);
      const dn = String(r.d.getDate()), by = yy + h / 2 + pt(7.5) * 0.36;
      font(7.5, 'bold'); doc.text(dn, X[0] + 1.8, by);
      const dw = doc.getTextWidth(dn);
      font(7, 'normal', MUTED); doc.text(DIES[r.d.getDay()], X[0] + 1.8 + dw + 1.1, by);
      r.cells.forEach((c, j) => { box(X[j + 1], yy, CW[j + 1], h, fill); inCell(c, X[j + 1], yy, CW[j + 1], h, { size: 7.5, lh: LH }); });
      box(X[7], yy, CW[7], h, fill); inCell(horesCel(r.mins), X[7], yy, CW[7], h, { size: 7.5 });
      box(X[8], yy, CW[8], h, fill); inCell(horesCel(r.x), X[8], yy, CW[8], h, { size: 7.5 });
      box(X[9], yy, CW[9], h, fill); inCell(r.concept, X[9], yy, CW[9], h, { size: 7, lh: LH, align: 'left' });
      yy += h;
    });

    yy += 3;
    const TW = 26;
    box(X[7] - TW, yy, TW, 6.4, HEAD); inCell('TOTALS', X[7] - TW, yy, TW, 6.4, { style: 'bold', size: 8 });
    box(X[7], yy, CW[7], 6.4); inCell(hores(totMins), X[7], yy, CW[7], 6.4, { style: 'bold', size: 8 });
    box(X[8], yy, CW[8], 6.4); inCell(hores(totExtra), X[8], yy, CW[8], 6.4, { style: 'bold', size: 8 });
    yy += 6.4 + 5;

    let sy = sigY;
    if (!fits || yy + notesH > sigY - 3) { doc.addPage(); yy = 20; sy = yy + notesH + 8; }
    font(7, 'italic', MUTED); footL.forEach(l => { doc.text(l, ML, yy); yy += 3.1; });
    font(7, 'italic', INK); legalL.forEach(l => { doc.text(l, ML, yy); yy += 3.1; });

    [['SIGNATURA EMPRESA', ML, ''], ['SIGNATURA TREBALLADOR', PW - ML - 86, s.name]].forEach(([label, x, name]) => {
      box(x, sy, 86, SIG_H);
      underlined(label, x + 2.6, sy + 5, 7.5);
      if (name) { font(7.5, 'normal', MUTED); doc.text(name, x + 2.6, sy + SIG_H - 3); }
    });

    /* ---------- annex ---------- */

    doc.addPage();
    let ay = 20;
    const need = h => { if (ay + h > PH - MB - 8) { doc.addPage(); ay = 20; } };
    const h2 = str => { need(16); font(9.5, 'bold'); doc.text(str, ML, ay); ay += 3.5; };
    const note = str => { font(7.5, 'italic', MUTED); doc.splitTextToSize(str, W).forEach(l => { need(3.3); doc.text(l, ML, ay + 2.4); ay += 3.3; }); ay += 1; };
    function table(cols, data, { total = false } = {}) {
      const H = 6.4, LH2 = 3.4;
      need(H * 2);
      let x = ML;
      cols.forEach(c => { box(x, ay, c.w, H, HEAD); inCell(c.t, x, ay, c.w, H, { style: 'bold', size: 7.5, align: c.a || 'left', pad: 2.4 }); x += c.w; });
      ay += H;
      data.forEach((r, ri) => {
        const bold = total && ri === data.length - 1;
        font(8.2, bold ? 'bold' : 'normal');
        const wrapped = r.map((v, i) => doc.splitTextToSize(String(v ?? ''), cols[i].w - 4.8));
        const h = Math.max(H, Math.max(...wrapped.map(l => l.length)) * LH2 + 2.4);
        need(h);
        let x2 = ML;
        cols.forEach((c, i) => { box(x2, ay, c.w, h, bold ? HEAD : null); inCell(wrapped[i], x2, ay, c.w, h, { size: 8.2, style: bold ? 'bold' : 'normal', align: c.a || 'left', pad: 2.4, lh: LH2 }); x2 += c.w; });
        ay += h;
      });
      ay += 2.5;
    }

    underlined(`ANNEX – ${MES}`, ML, ay, 12);
    ay += 10;

    // 1. setmanes
    h2('1. Hores de contracte i hores extres per setmana');
    let sw = 0, sl = 0, sx = 0;
    const rows1 = ps.map(p => {
      sw += p.worked; sl += p.left; sx += p.extra;
      const fa = p.b === today && today < keyOf(addDays(p.mon, 6)) ? ' (fins avui)' : '';
      return [`${rang(p.a, p.b)}${fa}`, `${hores(p.worked)} h`, `${hores(p.left)} h`, `${hores(p.extra)} h`];
    });
    rows1.push(['Total', `${hores(sw)} h`, `${hores(sl)} h`, `${hores(sx)} h`]);
    table([{ t: 'Setmana', w: 92 }, { t: 'Hores treballades', w: 30, a: 'right' }, { t: 'Hores contracte', w: 30, a: 'right' }, { t: 'Hores extres', w: 30, a: 'right' }], rows1, { total: true });
    note(`Dins de cada setmana (de dilluns a diumenge), un cop arribades les ${contracte} h de contracte, la resta d'hores són extres.`);
    for (const p of ps) {
      if (p.target >= s.weekly - 0.01) continue;
      const n = Math.round((p.target * 7) / s.weekly);
      const ks = [...Array(7)].map((_, i) => keyOf(addDays(p.mon, i)));
      const ini = s.start && ks.includes(s.start), fi = s.end && ks.includes(s.end);
      const k = ini ? s.start : s.end, d = dateOf(k);
      if (ini || fi) note(`El contracte ${ini ? 'comença' : 'acaba'} el ${DIES_LLARGS[d.getDay()]} ${dataLlarga(k)}, per això aquella setmana compta la part proporcional (${contracte} h × ${n}/7 dies = ${hores(p.target)} h).`);
    }
    const prev = ps.find(p => p.left < p.target - 0.01);
    if (prev) note(`La setmana que comença el ${dataLlarga(keyOf(prev.mon))} ve del mes anterior: les hores de contracte són les que quedaven per fer aquella setmana.`);
    ay += 4;

    // 2. desplaçaments i despeses
    h2('2. Desplaçaments amb cotxe propi i altres despeses');
    const kmX = exps.filter(x => x.kind === 'km'), other = exps.filter(x => x.kind !== 'km');
    const kmTot = kmX.reduce((a, x) => a + expKm(x), 0), kmSum = kmX.reduce((a, x) => a + expAmount(x), 0);
    const otherSum = other.reduce((a, x) => a + expAmount(x), 0);
    const rates = [...new Set(kmX.map(x => x.rate))];
    if (!exps.length) note('Cap desplaçament ni despesa aquest mes.');
    else {
      const rows2 = exps.map(x => [dmy(x.date), expLabel(x), x.kind === 'km' ? `${fmtNum(expKm(x))} km` : '', fmtEUR(expAmount(x))]);
      rows2.push(['', 'Total', kmTot ? `${fmtNum(kmTot)} km` : '', fmtEUR(kmSum + otherSum)]);
      table([{ t: 'Data', w: 24 }, { t: 'Trajecte / concepte', w: 98 }, { t: 'Km', w: 26, a: 'right' }, { t: 'Import', w: 34, a: 'right' }], rows2, { total: true });
      if (rates.length) note(`Quilometratge calculat a ${rates.map(r => `${fmtNum(r)} €/km`).join(' i ')}.`);
      const early = exps.filter(x => x.date < first);
      if (early.length) note(`Les despeses d'abans de l'inici del contracte (${early.map(x => dmy(x.date)).join(', ')}) es liquiden en aquest primer mes.`);
    }
    ay += 4;

    // 3. pendent de pagament
    h2('3. Pendent de pagament');
    const xh = sx / 60, rate = s.extraRate;
    const rows3 = [];
    if (sx >= 0.5 && rate > 0) rows3.push([`Hores extres (${rang(from, fins)})`, `${fmtNum(xh)} h × ${fmtNum(rate)} €/h`, fmtEUR(Math.round(xh * rate * 100) / 100)]);
    if (kmX.length) rows3.push(['Quilometratge', rates.length === 1 ? `${fmtNum(kmTot)} km × ${fmtNum(rates[0])} €/km` : `${fmtNum(kmTot)} km`, fmtEUR(kmSum)]);
    if (other.length) rows3.push(['Altres despeses', `${other.length} ${other.length === 1 ? 'despesa' : 'despeses'}`, fmtEUR(otherSum)]);
    if (!rows3.length) note('No hi ha res pendent de pagament aquest mes.');
    else {
      const owed = Math.round((xh * rate + kmSum + otherSum) * 100) / 100;
      rows3.push(['TOTAL PENDENT', '', fmtEUR(owed)]);
      table([{ t: 'Concepte', w: 92 }, { t: 'Càlcul', w: 52, a: 'right' }, { t: 'Import', w: 38, a: 'right' }], rows3, { total: true });
      if (sx >= 0.5 && rate > 0) note(`Preu per hora extra: ${fmtNum(rate)} €/h.`);
    }

    need(24);
    ay += 9;
    font(9.5);
    doc.text(`${s.city ? `${s.city}, ` : ''}${dataLlarga(today)} de ${dateOf(today).getFullYear()}`, ML, ay);
    ay += 8;
    font(9.5, 'bold');
    doc.text(s.name || '', ML, ay);

    // peu de pàgina
    const n = doc.getNumberOfPages();
    for (let i = 1; i <= n; i++) {
      doc.setPage(i);
      font(6.5, 'normal', MUTED);
      doc.text(`Registre ${MES} · ${s.name || ''}`, ML, PH - 8);
      doc.text(`${i} / ${n}`, PW - ML, PH - 8, { align: 'right' });
    }
    return doc.output('blob');
  };
})();
