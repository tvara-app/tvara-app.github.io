import "./styles.css";
/* The only script the browser runs. The pages are already complete HTML; this
   adds motion to them and nothing else, so with it blocked or broken the site
   still reads. No framework ships to the reader. */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(pointer: fine)").matches;
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ---- arrival ---- */
const revealed = [...$$("[data-reveal]"), ...$$("[data-reveal-group]").flatMap((g) => Array.from(g.children))];
if (reduced) {
  gsap.set(revealed, { opacity: 1, y: 0 });
} else {
  $$("[data-reveal], [data-reveal-group]").forEach((el) => {
    const group = el.hasAttribute("data-reveal-group");
    const targets = group ? Array.from(el.children) : [el];
    gsap.fromTo(targets, { opacity: 0, y: 18 }, {
      opacity: 1, y: 0, duration: .6, ease: "power2.out", stagger: group ? .07 : 0,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });
}

/* ---- hero title: each line out of its own mask ---- */
const hero = $(".hero-title");
if (hero) {
  const rows = $$(".line", hero);
  gsap.set(rows, { opacity: 1 });
  if (!reduced) gsap.from($$(".line > span", hero), { yPercent: 112, duration: .95, ease: "power4.out", stagger: .075 });
}

/* ---- the plate follows the pointer by a few pixels ---- */
const plate = $(".field-parallax");
if (plate && !reduced && fine) {
  const px = gsap.quickTo(plate, "x", { duration: 1.1, ease: "power3.out" });
  const py = gsap.quickTo(plate, "y", { duration: 1.1, ease: "power3.out" });
  addEventListener("pointermove", (e) => {
    px((e.clientX / innerWidth - .5) * -26);
    py((e.clientY / innerHeight - .5) * -18);
  }, { passive: true });
}

/* ---- how far down the page you are ---- */
const bar = $(".progress");
if (bar) {
  const set = gsap.quickSetter(bar, "scaleX");
  ScrollTrigger.create({ start: 0, end: "max", onUpdate: (s) => set(s.progress), onRefresh: (s) => set(s.progress) });
}

/* ---- the navigation underline ---- */
const nav = $("nav[aria-label='Primary']");
const ink = $(".nav-ink");
if (nav && ink) {
  const place = () => {
    const active = $('a[aria-current="page"]', nav);
    if (!active) return gsap.set(ink, { opacity: 0 });
    const a = active.getBoundingClientRect(), n = nav.getBoundingClientRect();
    gsap.set(ink, { x: a.left - n.left, width: a.width, opacity: 1 });
  };
  place();
  addEventListener("resize", place);
  if (document.fonts) document.fonts.ready.then(place);
}

/* ---- the section rail, built from the sections the page declares ---- */
const sections = $$("[data-section]");
if (sections.length > 1) {
  const rail = document.createElement("div");
  rail.className = "rail";
  rail.setAttribute("role", "navigation");
  rail.setAttribute("aria-label", "Sections of this page");
  sections.forEach((s, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.innerHTML = `<span class="name"></span><span class="tick" aria-hidden="true"></span>`;
    $(".name", b).textContent = s.dataset.section;
    b.addEventListener("click", () => s.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }));
    if (i === 0) b.setAttribute("aria-current", "true");
    rail.append(b);
  });
  $(".shell").append(rail);
  const buttons = $$("button", rail);
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const i = sections.indexOf(e.target);
      buttons.forEach((b, j) => b.setAttribute("aria-current", String(j === i)));
    }
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => io.observe(s));
}

/* ---- a few pixels of pull on the button a page is built around ---- */
if (!reduced && fine) {
  $$("[data-magnetic]").forEach((el) => {
    const x = gsap.quickTo(el, "x", { duration: .5, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: .5, ease: "power3.out" });
    el.addEventListener("pointermove", (e) => {
      const b = el.getBoundingClientRect();
      x(((e.clientX - b.left) / b.width - .5) * 14);
      y(((e.clientY - b.top) / b.height - .5) * 7);
    });
    el.addEventListener("pointerleave", () => { x(0); y(0); });
  });
}

/* ---- cards light where the cursor is ---- */
if (fine) {
  $$("[data-spotlight]").forEach((el) => {
    let queued = 0;
    el.addEventListener("pointermove", (e) => {
      if (queued) return;
      const b = el.getBoundingClientRect(), mx = e.clientX - b.left, my = e.clientY - b.top;
      queued = requestAnimationFrame(() => {
        queued = 0;
        el.style.setProperty("--mx", mx + "px");
        el.style.setProperty("--my", my + "px");
      });
    });
  });
}

/* ---- the hero mock: one slow loop, plus a little scroll drift ---- */
const mock = $("[data-mock]");
if (mock && !reduced) {
  const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });
  tl.to($(".mock-thumb", mock), { yPercent: 240, duration: 7 })
    .to($(".mock-peek", mock), { opacity: 1, x: 0, duration: .5, ease: "power3.out" }, 2.2)
    .to($(".mock-peek", mock), { opacity: 0, x: 8, duration: .4 }, 4.4)
    .to($(".mock-thumb", mock), { yPercent: 0, duration: 6 }, ">1");
  gsap.to($$(".mock-row span", mock), {
    opacity: .34, duration: 2.6, ease: "sine.inOut",
    stagger: { each: .18, from: "random", yoyo: true, repeat: -1 },
  });
  gsap.to(mock, { y: -34, ease: "none", scrollTrigger: { trigger: mock, start: "top bottom", end: "bottom top", scrub: .6 } });
}

/* ---- the simulation ----
   A chat site in a window with the extension working inside it. Every tool on
   the navigator does here what it does there; the walkthrough drives the same
   functions a visitor's clicks do and yields the moment anyone touches it. */
const sim = $("[data-sim]");
if (sim) {
  const D = JSON.parse($("[data-sim-data]", sim).dataset.simData);
  const win = $(".sim-window", sim);
  const chat = $("[data-sim-chat]", sim);
  const thread = $("[data-sim-thread]", sim);
  const mini = $("[data-sim-mini]", sim);
  const map = $("[data-sim-map]", sim);
  const bars = $("[data-sim-bars]", sim);
  const lens = $("[data-sim-lens]", sim);
  const asleepOut = $("[data-sim-count-asleep]", sim);
  const tip = $("[data-sim-tip]", sim);
  const preview = $("[data-sim-preview]", sim);
  const panel = $("[data-sim-panel]", sim);
  const panelList = $("[data-sim-panel-list]", sim);
  const find = $("[data-sim-find]", sim);
  const input = $("[data-sim-input]", sim);
  const countOut = $("[data-sim-count]", sim);
  const sheet = $("[data-sim-sheet]", sim);
  const sheetTitle = $("[data-sim-sheet-title]", sim);
  const sheetBody = $("[data-sim-sheet-body]", sim);
  const sheetNote = $("[data-sim-sheet-note]", sim);
  const sheetGo = $("[data-sim-sheet-go]", sim);
  const card = $("[data-sim-card]", sim);
  const resume = $("[data-sim-resume]", sim);
  const toast = $("[data-sim-toast]", sim);
  const composer = $("[data-sim-composer]", sim);
  const hint = $("[data-sim-hint]", sim);
  const lenOut = $("[data-sim-len]", sim);

  const TOTAL = 1471;                       // the conversation's real length
  const MOUNTED_ELSEWHERE = () => TOTAL - msgs.length;   // what the page has not put in the DOM
  let msgs = $$(".sim-msg", thread);
  let plain = msgs.map((m) => $("[data-sim-text]", m).textContent);
  let tab = "outline";

  /* ---- the map ----
     One tick per message, hung off the track, as wide as the message is long. */
  let bar = [];
  function drawBars() {
    bars.innerHTML = "";
    const longest = Math.max(...plain.map((t) => t.length));
    bar = msgs.map((m, i) => {
      const el = document.createElement("i");
      el.style.top = (i / msgs.length) * 100 + "%";
      el.style.width = (20 + 80 * (plain[i].length / longest)) + "%";
      if (m.dataset.code) el.classList.add("code");
      if (m.classList.contains("starred")) el.classList.add("starred");
      bars.append(el);
      return el;
    });
  }

  const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

  let queued = false;
  function sync() {
    queued = false;
    const view = chat.clientHeight;
    const full = chat.scrollHeight;
    const h = map.clientHeight;

    /* The lens is the viewport, on the map. Clamped rather than trusted, with
       the same 15px floor the extension uses — a true-to-scale lens on a long
       chat is a couple of pixels and unusable. */
    const lensH = clamp(h * (view / full), 15, h);
    const top = clamp((chat.scrollTop / full) * h, 0, h - lensH);
    lens.style.height = lensH + "px";
    lens.style.top = top + "px";

    const first = (top / h) * msgs.length;
    const last = ((top + lensH) / h) * msgs.length;

    let asleep = 0;
    msgs.forEach((m, i) => {
      const y = m.offsetTop - chat.scrollTop;
      const out = y + m.offsetHeight < -view * 0.5 || y > view * 1.5;
      m.classList.toggle("asleep", out);
      if (out) asleep++;
      const b = bar[i];
      if (!b) return;
      const inside = i >= first - .5 && i <= last + .5;
      b.classList.toggle("in", inside);
      b.classList.toggle("near", !inside && Math.min(Math.abs(i - first), Math.abs(i - last)) < msgs.length * .08);
    });
    asleepOut.textContent = String(TOTAL - msgs.length + asleep);
    asleepOut.title = `${TOTAL - msgs.length + asleep} of ${TOTAL} messages asleep`;
  }
  chat.addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(sync); } }, { passive: true });
  addEventListener("resize", () => requestAnimationFrame(sync));

  const flash = (m) => { m.classList.add("flash"); setTimeout(() => m.classList.remove("flash"), 900); };
  const jump = (i) => {
    const m = msgs[i];
    if (!m) return;
    chat.scrollTo({ top: Math.max(0, m.offsetTop - 30), behavior: reduced ? "auto" : "smooth" });
    flash(m);
  };
  const indexAt = (e) => {
    const r = map.getBoundingClientRect();
    return clamp(Math.floor(((e.clientY - r.top) / r.height) * msgs.length), 0, msgs.length - 1);
  };

  /* Panels are positioned against the window, and clamped inside it. */
  function place(el, y) {
    const w = win.getBoundingClientRect();
    el.hidden = false;
    el.style.top = clamp(y - w.top - el.offsetHeight / 2, 8, w.height - el.offsetHeight - 8) + "px";
  }

  map.addEventListener("pointermove", (e) => {
    const i = indexAt(e);
    $("[data-sim-preview-meta]", sim).textContent = `message ${i + 1} · ${$(".sim-time", msgs[i]).textContent}`;
    $("[data-sim-preview-text]", sim).textContent = plain[i].slice(0, 150) + (plain[i].length > 150 ? "…" : "");
    tip.hidden = true;
    place(preview, e.clientY);
    /* Dock-style swell: the ticks nearest the cursor lengthen a little. */
    bar.forEach((b, j) => {
      const d = Math.abs(j - i);
      b.style.transform = d > 4 ? "" : `scaleX(${1 + (1 - d / 4) * .5})`;
    });
  });
  map.addEventListener("pointerleave", () => {
    preview.hidden = true;
    bar.forEach((b) => { b.style.transform = ""; });
  });
  map.addEventListener("click", (e) => jump(indexAt(e)));

  /* ---- tool tips, the way the extension's own toolbar does them ---- */
  $$("[data-tip]", sim).forEach((b) => {
    b.addEventListener("pointerenter", (e) => {
      const [title, body] = b.dataset.tip.split("|");
      $("b", tip).textContent = title;
      $("span", tip).textContent = body;
      preview.hidden = true;
      place(tip, e.clientY);
    });
    b.addEventListener("pointerleave", () => { tip.hidden = true; });
  });

  /* ---- stars ---- */
  sim.addEventListener("click", (e) => {
    const b = e.target.closest("[data-sim-star]");
    if (!b) return;
    const m = b.closest(".sim-msg");
    const on = b.getAttribute("aria-pressed") !== "true";
    b.setAttribute("aria-pressed", String(on));
    m.classList.toggle("starred", on);
    drawBars();
    if (!panel.hidden && tab === "starred") openPanel("starred");
  });

  /* ---- outline and starred ---- */
  function openPanel(which) {
    tab = which;
    $$("[data-sim-tab]", sim).forEach((t) => t.setAttribute("aria-pressed", String(t.dataset.simTab === which)));
    panelList.innerHTML = "";
    const rows = [];
    msgs.forEach((m, i) => {
      if (which === "starred") {
        if (m.classList.contains("starred")) rows.push({ i, kind: "starred", text: plain[i] });
      } else if (m.classList.contains("you")) rows.push({ i, kind: "you asked", text: plain[i] });
      else if (m.dataset.h) rows.push({ i, kind: "heading", text: m.dataset.h });
    });
    if (!rows.length) {
      const li = document.createElement("li");
      li.className = "empty";
      li.textContent = "Nothing starred yet. Hover a message and press its star — stars are saved per conversation.";
      panelList.append(li);
    } else {
      rows.forEach((r) => {
        const li = document.createElement("li");
        const b = document.createElement("button");
        b.type = "button";
        b.innerHTML = '<span class="kind"></span><span class="label"></span>';
        const kind = $(".kind", b);
        kind.textContent = r.kind;
        if (r.kind === "starred") kind.classList.add("star");
        $(".label", b).textContent = r.text.length > 62 ? r.text.slice(0, 62) + "…" : r.text;
        b.addEventListener("click", () => jump(r.i));
        li.append(b);
        panelList.append(li);
      });
    }
    panel.hidden = false;
    setTool("outline");
  }
  $$("[data-sim-tab]", sim).forEach((t) => t.addEventListener("click", () => openPanel(t.dataset.simTab)));

  /* ---- search ---- */
  let hits = [], at = -1;
  function highlight(q) {
    hits = [];
    msgs.forEach((m, i) => {
      const p = $("[data-sim-text]", m);
      if (!q) { p.textContent = plain[i]; return; }
      const rx = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig");
      const frag = document.createDocumentFragment();
      plain[i].split(rx).forEach((part) => {
        if (part.toLowerCase() === q.toLowerCase() && part) {
          const mk = document.createElement("mark");
          mk.textContent = part;
          frag.append(mk);
          hits.push({ mark: mk, i });
        } else if (part) frag.append(document.createTextNode(part));
      });
      p.textContent = "";
      p.append(frag);
    });
    at = -1;
  }
  function stepHit(delta) {
    if (!hits.length) return;
    hits.forEach((h) => h.mark.classList.remove("on"));
    at = (at + delta + hits.length) % hits.length;
    hits[at].mark.classList.add("on");
    jump(hits[at].i);
  }
  input.addEventListener("input", () => {
    const q = input.value.trim();
    highlight(q);
    countOut.textContent = q.length < 2 ? "type to search"
      : `${hits.length} here · ${MOUNTED_ELSEWHERE().toLocaleString("en")} further back`;
    if (hits.length) stepHit(1);
  });
  find.addEventListener("submit", (e) => { e.preventDefault(); stepHit(1); });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); stepHit(e.shiftKey ? -1 : 1); }
    if (e.key === "Escape") closeAll();
  });

  /* ---- the sheets: Context Bridge, and carrying a chat over ---- */
  function openBridge() {
    sheetTitle.textContent = "Context Bridge — your own archive";
    sheetBody.innerHTML = "";
    D.archive.forEach((a, i) => {
      const l = document.createElement("label");
      l.className = "sim-pick";
      l.innerHTML = '<input type="checkbox"><span><span class="meta"></span><p></p></span>';
      $("input", l).checked = i === 0;
      $(".meta", l).textContent = `${a.where} · ${a.when}`;
      $("p", l).textContent = a.text;
      sheetBody.append(l);
    });
    sheetNote.textContent = "Nothing is sent anywhere. The passages go into the box you are typing in.";
    sheetGo.textContent = "Insert into prompt";
    sheetGo.onclick = () => {
      const picked = $$(".sim-pick input", sheetBody).filter((c) => c.checked).length;
      closeAll();
      composer.textContent = picked
        ? `Context from ${picked} archived passage${picked > 1 ? "s" : ""} + your prompt…`
        : "Send a message…";
      composer.classList.toggle("filled", picked > 0);
      say(picked ? `${picked} passage${picked > 1 ? "s" : ""} placed in the prompt box. You press send.` : "Nothing selected, nothing inserted.");
    };
    sheet.hidden = false;
    setTool("bridge");
  }

  function openCarry() {
    const stars = msgs.filter((m) => m.classList.contains("starred")).length;
    sheetTitle.textContent = "Continue in a new chat";
    sheetBody.innerHTML = "";
    [["The goal", plain[0]],
     ["Starred", stars ? `${stars} message${stars > 1 ? "s" : ""} you starred` : "none yet — star one and it is carried too"],
     ["Where it stands", plain[plain.length - 1]]].forEach(([k, v]) => {
      const l = document.createElement("div");
      l.className = "sim-pick";
      l.innerHTML = '<span></span><span><span class="meta"></span><p></p></span>';
      $(".meta", l).textContent = k;
      $("p", l).textContent = v.length > 130 ? v.slice(0, 130) + "…" : v;
      sheetBody.append(l);
    });
    sheetNote.textContent = "Quoted from this chat, never summarised. Nothing is sent for you.";
    sheetGo.textContent = "Open a new chat";
    sheetGo.onclick = () => { closeAll(); say("A new conversation would open with that context already in the prompt box."); };
    sheet.hidden = false;
    setTool("carry");
  }

  /* ---- mount older messages ---- */
  let mounted = false;
  function mountOlder() {
    if (mounted) return say("Every older message is already in the page.");
    mounted = true;
    const before = chat.scrollHeight;
    D.older.forEach((m) => {
      const el = document.createElement("article");
      el.className = "sim-msg " + m.r;
      el.dataset.h = m.h || "";
      const p = document.createElement("p");
      p.dataset.simText = "";
      p.textContent = m.x;
      const foot = document.createElement("footer");
      foot.innerHTML = '<span class="sim-time"></span><button type="button" class="sim-star" data-sim-star aria-pressed="false" aria-label="Star this message"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4l2.3 4.9 5.2.7-3.8 3.6 1 5.2-4.7-2.6-4.7 2.6 1-5.2L4.5 9.6l5.2-.7z"/></svg></button>';
      $(".sim-time", foot).textContent = m.t;
      el.append(p, foot);
      thread.prepend(el);
    });
    msgs = $$(".sim-msg", thread);
    msgs.forEach((m, i) => { m.dataset.i = i; });
    plain = msgs.map((m) => $("[data-sim-text]", m).textContent);
    chat.scrollTop += chat.scrollHeight - before;   // keep the reader where they were
    drawBars();
    sync();
    lenOut.textContent = TOTAL.toLocaleString("en") + " messages";
    say("Older messages mounted into the page. The site's own find-in-page reaches them now.");
  }

  /* ---- small things ---- */
  let toastTimer;
  function say(text) {
    toast.textContent = text;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 4200);
  }
  function setTool(active) {
    $$("[data-sim-tool]", sim).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.simTool === active)));
  }
  function closeAll() {
    [panel, find, sheet, preview, tip].forEach((el) => { el.hidden = true; });
    setTool("");
    highlight("");
  }

  $$("[data-sim-tool]", sim).forEach((b) => {
    b.addEventListener("click", () => {
      const act = b.dataset.simTool;
      const already = b.getAttribute("aria-pressed") === "true";
      closeAll();
      if (already) return;
      if (act === "outline") return openPanel(tab);
      if (act === "search") { find.hidden = false; setTool("search"); input.focus(); return; }
      if (act === "bridge") return openBridge();
      if (act === "carry") return openCarry();
      if (act === "history") return mountOlder();
      if (act === "md") return say("conversation.md — all 1,471 messages, written to Downloads/Tvara.");
      if (act === "json") return say("conversation.json — role, text and timestamp per message, written to Downloads/Tvara.");
    });
  });

  $$("[data-sim-close]", sim).forEach((b) => b.addEventListener("click", closeAll));
  sim.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });

  $("[data-sim-collapse]", sim).addEventListener("click", () => {
    const now = mini.dataset.collapsed !== "true";
    mini.dataset.collapsed = String(now);
    if (now) closeAll();
  });

  /* ---- the chat card, on the site's own conversation list ---- */
  $$("[data-sim-conv]", sim).forEach((row) => {
    row.addEventListener("pointerenter", () => {
      const c = D.side[Number(row.dataset.simConv)];
      card.innerHTML = '<b></b><dl></dl>';
      $("b", card).textContent = c.title;
      const dl = $("dl", card);
      [["messages", c.n], ["you asked", c.q], ["starred", c.s], ["created", c.made], ["last opened", c.seen]]
        .forEach(([k, v]) => {
          const dt = document.createElement("dt"); dt.textContent = k;
          const dd = document.createElement("dd"); dd.textContent = v;
          dl.append(dt, dd);
        });
      const w = win.getBoundingClientRect(), r = row.getBoundingClientRect();
      card.hidden = false;
      card.style.left = "190px";
      card.style.top = clamp(r.top - w.top, 8, w.height - card.offsetHeight - 8) + "px";
    });
    row.addEventListener("pointerleave", () => { card.hidden = true; });
  });

  /* ---- resume ---- */
  resume.addEventListener("click", () => {
    resume.hidden = true;
    jump(Math.floor(msgs.length / 2));
    say("Anchored to the message, not a pixel offset — it survives reloads and reflows.");
  });

  drawBars();
  /* A chat opens at its end, the way these sites do — which is also what makes
     the resume chip mean something. */
  chat.scrollTop = chat.scrollHeight;
  sync();

  /* ---- the walkthrough ---- */
  let tour = [], driving = false;
  const HINT_IDLE = "Your turn. Hover the map to read a message, click to land on it, star something, or press any tool on the navigator.";
  const at_ = (ms, fn) => tour.push(setTimeout(fn, ms));
  function stop() {
    tour.forEach(clearTimeout); tour = [];
    if (!driving) return;
    driving = false;
    hint.textContent = HINT_IDLE;
  }
  function walkthrough() {
    stop(); closeAll(); resume.hidden = false; mini.dataset.collapsed = "false";
    chat.scrollTo({ top: 0, behavior: "auto" });
    driving = true;
    hint.textContent = "Watching a walkthrough — touch anything to take over.";
    at_(500, () => { hint.textContent = "Reopen a long chat and one tap returns you to the message you were reading."; });
    at_(2200, () => { resume.click(); hint.textContent = "Off-screen messages are asleep: still in the page, no longer drawn. The number under the map counts them."; });
    at_(4600, () => { openPanel("outline"); hint.textContent = "The outline is every question you asked and every heading in the answers."; });
    at_(7000, () => {
      closeAll(); find.hidden = false; setTool("search");
      hint.textContent = "Search reads the archived copy too, so the count says where the rest of the matches are.";
      const q = "archive"; let n = 0;
      const type = () => {
        if (!driving) return;
        input.value = q.slice(0, ++n);
        input.dispatchEvent(new Event("input"));
        if (n < q.length) at_(90, type);
      };
      type();
    });
    at_(10400, () => { closeAll(); input.value = ""; openBridge(); hint.textContent = "Context Bridge pulls a passage out of your own archive into the prompt you are writing."; });
    at_(13200, () => { closeAll(); hint.textContent = HINT_IDLE; driving = false; });
  }
  ["pointerdown", "keydown", "wheel"].forEach((ev) => sim.addEventListener(ev, stop, { passive: true }));
  $("[data-sim-replay]", sim).addEventListener("click", (e) => { e.stopPropagation(); walkthrough(); });

  let played = false;
  new IntersectionObserver(([e]) => {
    if (!e.isIntersecting || played || reduced) return;
    played = true;
    walkthrough();
  }, { threshold: .5 }).observe(sim);
}

/* ---- the questions ---- */
const qa = $("[data-accordion]");
if (qa) {
  qa.addEventListener("click", (e) => {
    const btn = e.target.closest(".qa-btn");
    if (!btn) return;
    const item = btn.closest(".qa-item");
    const opening = item.dataset.open !== "true";
    $$(".qa-item", qa).forEach((other) => {
      const open = other === item && opening;
      other.dataset.open = String(open);
      $(".qa-btn", other).setAttribute("aria-expanded", String(open));
      const panel = $(".qa-panel", other);
      if (open) panel.removeAttribute("inert"); else panel.setAttribute("inert", "");
    });
  });
}
