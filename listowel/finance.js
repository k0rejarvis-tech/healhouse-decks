/* ══════════════════════════════════════════════════
   HEAL HOUSE LISTOWEL — BCH vs TRADITIONAL FINANCE MODEL
   All numbers verified against:
   - PPTX (HealHouse_Investor_v3_clean.pptx) — operating pro forma
   - PDF (2026-04-21_469 Main St W_SS03.pdf) — building program
   ══════════════════════════════════════════════════ */
(function(){
  'use strict';

  // ── BUILDING (verified from PDF site plan + PPTX) ──
  const BUILDING = {
    address: '469 Main St W, Listowel, ON',
    storeys: 5,
    gfa: 25000,        // SF (PDF: 2670 SM ≈ 28,740 — PPTX uses ±25,000 marketing figure)
    units: 49,
    beds: 94,
    wellness: 3000,    // SF wellness hub
    suiteMix: [
      { type: '1 Bedroom (330–575 SF)',     units: 12, rent: 4150 },
      { type: '1 Bedroom Accessible (222 SF)', units: 6,  rent: 3650 },
      { type: '2 Bedroom (438–503 SF)',     units: 26, rent: 4995 },
      { type: '3 Bedroom (513–575 SF)',     units: 5,  rent: 5995 },
    ],
  };

  // ── OPERATING PRO FORMA (verified from PPTX slide 11) ──
  const NOI_5YR = [473403, 697088, 911410, 1024015, 1140908];
  const REV_5YR = [2553403, 2977088, 3351410, 3574015, 3800908];
  const OCC_5YR = [0.82, 0.89, 0.93, 0.94, 0.95];

  // ── ASSUMPTIONS (user-tweakable) ──
  const DEFAULTS = {
    tpc: 22000000,         // Total Project Cost (incl. land, hard, soft, FF&E, contingency)
    bchRate: 4.15,
    bchAm: 50,
    convRate: 5.99,
    convAm: 30,
    convLTC: 75,           // % loan-to-cost on conventional
    growthRate: 2.5,       // % annual NOI growth post-Year 5
    exitCap: 6.25,         // % exit cap rate
    holdYears: 5,
  };

  let P = { ...DEFAULTS };

  // ── HELPERS ──
  function annualDS(principal, ratePct, years){
    const m = (ratePct/100) / 12;
    const n = years * 12;
    if (m === 0) return principal / years;
    return principal * (m * Math.pow(1+m, n)) / (Math.pow(1+m, n) - 1) * 12;
  }
  function remBalance(principal, ratePct, years, paid){
    const m = (ratePct/100)/12, n = years*12;
    const pmt = principal * (m*Math.pow(1+m,n)) / (Math.pow(1+m,n)-1);
    const k = paid * 12;
    return principal*Math.pow(1+m,k) - pmt*((Math.pow(1+m,k)-1)/m);
  }
  function noiFor(year){
    if (year <= 5) return NOI_5YR[year-1];
    return NOI_5YR[4] * Math.pow(1 + P.growthRate/100, year - 5);
  }
  function fmt(n, opts={}){
    const neg = n < 0;
    n = Math.abs(n);
    let s;
    if (opts.precise) s = '$' + Math.round(n).toLocaleString();
    else if (n >= 1e6) s = '$' + (n/1e6).toFixed(2) + 'M';
    else if (n >= 1e3) s = '$' + Math.round(n/1000) + 'K';
    else s = '$' + Math.round(n);
    return neg ? '-' + s : s;
  }
  function fmtPct(n, decimals=1){ return n.toFixed(decimals) + '%'; }

  // ── COMPUTE THE TWO STACKS ──
  function compute(){
    const tpc = P.tpc;

    // BCH STACK
    const bch = {
      forgivable: tpc * 0.40,
      loan:       tpc * 0.50,
      ownerEq:    tpc * 0.05,
      munic:      tpc * 0.05,
      rate:       P.bchRate,
      am:         P.bchAm,
    };
    bch.ds = annualDS(bch.loan, bch.rate, bch.am);

    // CONVENTIONAL STACK
    const trad = {
      loan:       tpc * (P.convLTC/100),
      ownerEq:    tpc * (1 - P.convLTC/100),
      rate:       P.convRate,
      am:         P.convAm,
    };
    trad.ds = annualDS(trad.loan, trad.rate, trad.am);

    // 20-yr cash flow projection
    const projection = [];
    let bchCum = 0, tradCum = 0;
    for (let y = 1; y <= 20; y++){
      const noi = noiFor(y);
      const bchCF = noi - bch.ds;
      const tradCF = noi - trad.ds;
      bchCum += bchCF;
      tradCum += tradCF;
      projection.push({
        year: y, noi,
        bchDS: bch.ds, bchCF, bchDCR: noi / bch.ds, bchCum,
        tradDS: trad.ds, tradCF, tradDCR: noi / trad.ds, tradCum,
      });
    }

    // Exit metrics at Year `holdYears`
    const hold = P.holdYears;
    const exitNOI = noiFor(hold);
    const exitVal = exitNOI / (P.exitCap/100);
    const bchBal = remBalance(bch.loan, bch.rate, bch.am, hold);
    const tradBal = remBalance(trad.loan, trad.rate, trad.am, hold);
    const bchSaleNet = exitVal - bchBal;
    const tradSaleNet = exitVal - tradBal;

    // Cumulative CF over hold
    let bchHoldCF = 0, tradHoldCF = 0;
    for (let y = 1; y <= hold; y++){
      bchHoldCF += projection[y-1].bchCF;
      tradHoldCF += projection[y-1].tradCF;
    }

    const bchTotal = bchHoldCF + bchSaleNet;
    const tradTotal = tradHoldCF + tradSaleNet;

    // Simple IRR
    function irr(cf){
      let r = 0.12;
      for (let i = 0; i < 200; i++){
        let npv = 0, dnpv = 0;
        for (let t = 0; t < cf.length; t++){
          npv += cf[t] / Math.pow(1+r, t);
          if (t > 0) dnpv += -t * cf[t] / Math.pow(1+r, t+1);
        }
        if (Math.abs(npv) < 1) return r;
        const next = r - npv/dnpv;
        if (!isFinite(next) || next < -0.99) { r = -0.5; continue; }
        r = next;
      }
      return r;
    }
    const bchCFs = [-bch.ownerEq, ...projection.slice(0, hold).map((p,i)=> p.bchCF + (i === hold-1 ? bchSaleNet : 0))];
    const tradCFs = [-trad.ownerEq, ...projection.slice(0, hold).map((p,i)=> p.tradCF + (i === hold-1 ? tradSaleNet : 0))];

    const bchIRR = irr(bchCFs);
    const tradIRR = irr(tradCFs);

    return {
      tpc, bch, trad, projection,
      exit: {
        noi: exitNOI, value: exitVal,
        bchBal, tradBal,
        bchSaleNet, tradSaleNet,
        bchHoldCF, tradHoldCF,
        bchTotal, tradTotal,
        bchMult: bchTotal / bch.ownerEq,
        tradMult: tradTotal / trad.ownerEq,
        bchIRR, tradIRR,
        holdYears: hold,
      }
    };
  }

  // ── EXPOSE ──
  window.HHFinance = {
    DEFAULTS, BUILDING, NOI_5YR, REV_5YR, OCC_5YR,
    get P(){ return P; },
    setP(key, value){ P[key] = value; },
    reset(){ P = { ...DEFAULTS }; },
    compute, fmt, fmtPct, annualDS, remBalance, noiFor,
  };
})();
