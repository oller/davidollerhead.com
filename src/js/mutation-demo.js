// 6-step mutation testing walkthrough
(() => {
  const stage = document.querySelector("[data-mstage]");
  if (!stage) return;

  const q = (sel) => stage.querySelector(sel);
  const segs = [...stage.querySelectorAll("[data-step]")];
  const rows = Object.fromEntries(
    [...stage.querySelectorAll("[data-mstage-row]")].map((tr) => [tr.dataset.mstageRow, tr])
  );
  const cells = Object.fromEntries(
    [...stage.querySelectorAll("[data-cell]")].map((td) => [td.dataset.cell, td])
  );

  const counterEl = q("[data-mstage-counter]");
  const codeEl = q("[data-mstage-code]");
  const narrativeEl = q("[data-mstage-narrative]");
  const kickerEl = q("[data-mstage-kicker]");
  const headlineEl = q("[data-mstage-headline]");
  const copyEl = q("[data-mstage-copy]");
  const mutVal = q("[data-mstage-mut-val]");
  const mutBar = q("[data-mstage-mut-bar]");
  const prevBtn = q("[data-mstage-prev]");
  const nextBtn = q("[data-mstage-next]");
  const liveEl = q("[data-mstage-live]");

  const FN_SIG = `<span class="tok-kw">export</span> <span class="tok-kw">const</span> <span class="tok-fn">canVote</span> <span class="tok-op">=</span> <span class="tok-punct">(</span><span class="tok-param">age</span><span class="tok-op">:</span> <span class="tok-type">number</span><span class="tok-punct">)</span><span class="tok-op">:</span> <span class="tok-type">boolean</span> <span class="tok-op">=&gt;</span>`;
  const EXPR_ORIG = `<span class="tok-var">age</span> <span class="tok-op">&gt;=</span> <span class="tok-num">18</span>`;

  const assertLine = (age, expected, noteHtml, dim = false) =>
    `<span${dim ? ' class="mstage-dim"' : ""}>  <span class="tok-fn">expect</span><span class="tok-punct">(</span><span class="tok-fn">canVote</span><span class="tok-punct">(</span><span class="tok-num">${age}</span><span class="tok-punct">)).</span><span class="tok-fn">toBe</span><span class="tok-punct">(</span><span class="tok-num">${expected}</span><span class="tok-punct">);</span> ${noteHtml}</span>`;

  const code = (exprHtml, assertions, { dim = true, title = "lets adults vote" } = {}) => {
    const dimAttr = dim ? ' class="mstage-dim"' : "";
    return [
      `<span${dimAttr}>${FN_SIG}</span>`,
      `<span>  ${exprHtml}<span class="tok-punct">;</span></span>`,
      `<span> </span>`,
      `<span${dimAttr}><span class="tok-fn">it</span><span class="tok-punct">(</span><span class="tok-str">'${title}'</span><span class="tok-punct">,</span> <span class="tok-punct">()</span> <span class="tok-op">=&gt;</span> <span class="tok-punct">{</span></span>`,
      ...assertions,
      `<span${dimAttr}><span class="tok-punct">});</span></span>`,
    ].join("\n");
  };

  const STEPS = [
    {
      kicker: "Starting point",
      tone: "neutral",
      headline: "100% coverage. Test passes.",
      copy: "Everything looks green. Next, mutation testing will break this function in small ways while leaving the test untouched. If the test still passes on broken code, that mutant has survived.",
      nextLabel: "Break the code →",
      code: code(EXPR_ORIG, [assertLine(30, "true", `<span class="mstage-ok">// ✓ pass</span>`)], { dim: false }),
      cells: {},
      mut: { pct: 0, text: "Not run yet", tone: "fail" },
    },
    {
      kicker: "Mutant 1 · >= becomes >",
      tone: "fail",
      headline: "Mutant survives",
      copy: "18-year-olds can no longer vote, yet the test still passes. A passing test on broken code means a real bug could ship unnoticed.",
      nextLabel: "Try another mutant →",
      activeRow: "gt",
      code: code(`<span class="mstage-mut">age &gt; 18</span>`, [
        assertLine(30, "true", `<span class="mstage-ok">// ✓ passes</span>`),
      ]),
      cells: { "orig-gt": "fail" },
      mut: { pct: 0, text: "0 of 1 killed", tone: "fail" },
    },
    {
      kicker: "Mutant 2 · condition becomes true",
      tone: "fail",
      headline: "Mutant survives",
      copy: "Now everyone can vote, regardless of age. Our test still doesn't blink because nothing ever checks for false.",
      nextLabel: "Try one more →",
      activeRow: "true",
      code: code(`<span class="mstage-mut">true</span>`, [
        assertLine(30, "true", `<span class="mstage-ok">// ✓ passes</span>`),
      ]),
      cells: { "orig-gt": "fail", "orig-true": "fail" },
      mut: { pct: 0, text: "0 of 2 killed", tone: "fail" },
    },
    {
      kicker: "Mutant 3 · >= becomes <",
      tone: "pass",
      headline: "Mutant killed (33% score)",
      copy: "Adults can no longer vote, so the test finally fails. Only 1 of 3 mutants was caught (33%), while line coverage stayed at 100% the entire time.",
      nextLabel: "Strengthen the test →",
      activeRow: "lt",
      code: code(`<span class="mstage-mut">age &lt; 18</span>`, [
        assertLine(30, "true", `<span class="mstage-bad">// ✕ fails</span>`),
      ]),
      cells: { "orig-gt": "fail", "orig-true": "fail", "orig-lt": "pass" },
      mut: { pct: 33, text: "1 of 3 killed (33%)", tone: "fail" },
    },
    {
      kicker: "Fix the blind spots",
      tone: "accent",
      headline: "Test the boundary",
      copy: "Restore the real code and add two targeted assertions: the exact boundary (18) and someone just under it (17). All assertions pass.",
      nextLabel: "Re-run all 3 mutants →",
      code: code(
        EXPR_ORIG,
        [
          assertLine(30, "true", `<span class="mstage-ok">// ✓ pass</span>`, true),
          assertLine(18, "true", `<span class="mstage-ok">// ✓ boundary</span>`),
          assertLine(17, "false", `<span class="mstage-ok">// ✓ under 18</span>`),
        ],
        { title: "lets people vote from 18" }
      ),
      cells: { "orig-gt": "fail", "orig-true": "fail", "orig-lt": "pass" },
      mut: { pct: 33, text: "1 of 3 killed (33%)", tone: "fail" },
    },
    {
      kicker: "Re-run complete",
      tone: "pass",
      headline: "33% → 100% killed",
      copy: "Run the same three mutants again and every one of them fails a test. Line coverage never budged from 100%, yet the suite is dramatically stronger.",
      nextLabel: "↻ Start over",
      code: code(
        EXPR_ORIG,
        [
          assertLine(30, "true", `<span class="mstage-kills">// kills &gt;= → &lt;</span>`),
          assertLine(18, "true", `<span class="mstage-kills">// kills &gt;= → &gt;</span>`),
          assertLine(17, "false", `<span class="mstage-kills">// kills → true</span>`),
        ],
        { title: "lets people vote from 18" }
      ),
      cells: {
        "orig-gt": "fail",
        "orig-true": "fail",
        "orig-lt": "pass",
        "imp-gt": "pass",
        "imp-true": "pass",
        "imp-lt": "pass",
      },
      mut: { pct: 100, text: "3 of 3 killed (100%)", tone: "pass" },
    },
  ];

  const pillHtml = (state) =>
    state === "pass"
      ? `<span class="mstage-pill mstage-pill-pass"><span aria-hidden="true">✓</span> Killed</span>`
      : `<span class="mstage-pill mstage-pill-fail"><span aria-hidden="true">✕</span> Survived</span>`;

  let idx = 0;

  const go = (next) => {
    if (next < 0 || next >= STEPS.length || next === idx) return;
    idx = next;
    const s = STEPS[idx];

    counterEl.textContent = `${idx + 1} / ${STEPS.length}`;
    segs.forEach((seg, i) => {
      seg.toggleAttribute("aria-current", i === idx);
      if (i === idx) seg.setAttribute("aria-current", "step");
      seg.toggleAttribute("data-passed", i < idx);
    });

    narrativeEl.dataset.tone = s.tone;
    kickerEl.textContent = s.kicker;
    headlineEl.textContent = s.headline;
    copyEl.textContent = s.copy;
    codeEl.innerHTML = s.code;

    Object.entries(rows).forEach(([id, tr]) => tr.toggleAttribute("data-active", id === s.activeRow));
    Object.entries(cells).forEach(([key, td]) => {
      const val = s.cells[key];
      td.innerHTML = val ? pillHtml(val) : `<span class="mstage-dot-empty">&middot;</span>`;
    });

    mutVal.textContent = s.mut.text;
    mutBar.style.width = `${s.mut.pct}%`;
    mutBar.className = `mstage-fill mstage-fill-${s.mut.tone}`;

    prevBtn.setAttribute("aria-disabled", String(idx === 0));
    nextBtn.textContent = s.nextLabel;
    liveEl.textContent = `Step ${idx + 1} of ${STEPS.length}: ${s.headline}. ${s.copy}`;
  };

  prevBtn.addEventListener("click", () => {
    if (prevBtn.getAttribute("aria-disabled") !== "true") go(idx - 1);
  });

  nextBtn.addEventListener("click", () => go(idx === STEPS.length - 1 ? 0 : idx + 1));
  segs.forEach((seg) => seg.addEventListener("click", () => go(Number(seg.dataset.step))));

  document.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
    if (e.target instanceof Element && e.target.closest("input, textarea, select, [contenteditable], pre.shiki")) return;
    const r = stage.getBoundingClientRect();
    if (r.bottom <= 0 || r.top >= window.innerHeight) return;

    e.preventDefault();
    if (e.key === "ArrowRight" && idx < STEPS.length - 1) go(idx + 1);
    if (e.key === "ArrowLeft" && idx > 0) go(idx - 1);
  });
})();
