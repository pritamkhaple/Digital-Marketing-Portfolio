/* ============================================================
   PRITAM KHAPLE PORTFOLIO — script.js (Enhanced Animations)
   ============================================================ */

/* ============================================================
   1. CUSTOM CURSOR
   ============================================================ */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) { cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px'; }
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.14;
  followerY += (mouseY - followerY) * 0.14;
  if (cursorFollower) { cursorFollower.style.left = followerX + 'px'; cursorFollower.style.top = followerY + 'px'; }
  requestAnimationFrame(animateFollower);
}
animateFollower();

/* ============================================================
   2. NAV SCROLL BEHAVIOUR
   ============================================================ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ============================================================
   3. MOBILE MENU
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ============================================================
   4. HERO GRID
   ============================================================ */
function buildHeroGrid() {
  const grid = document.getElementById('heroGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const cellSize = 40;
  const cols = Math.ceil(grid.offsetWidth / cellSize);
  const rows = Math.ceil(grid.offsetHeight / cellSize);
  const total = cols * rows;
  grid.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
  grid.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < total; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    cell.addEventListener('mouseenter', () => cell.classList.add('glowing'));
    cell.addEventListener('mouseleave', () => setTimeout(() => cell.classList.remove('glowing'), 600));
    frag.appendChild(cell);
  }
  grid.appendChild(frag);
  setInterval(() => {
    const cells = grid.querySelectorAll('.grid-cell');
    const idx = Math.floor(Math.random() * total);
    if (cells[idx]) { cells[idx].classList.add('glowing'); setTimeout(() => cells[idx].classList.remove('glowing'), 1200); }
  }, 800);
}
buildHeroGrid();
let resizeTimer;
window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(buildHeroGrid, 200); }, { passive: true });

/* ============================================================
   5. TYPED TEXT EFFECT
   ============================================================ */
const phrases = ['Ranking pages. Growing brands.','From keywords to conversions.','SEO, social, content, and email, together.','Reels that grow. Creatives that convert.','54.8% organic growth. Real numbers.'];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
  if (!typedEl) return;
  const current = phrases[phraseIndex];
  typedEl.textContent = current.slice(0, charIndex);
  const speed = isDeleting ? 40 : 70;
  if (!isDeleting && charIndex < current.length) { charIndex++; setTimeout(typeLoop, speed); }
  else if (!isDeleting && charIndex === current.length) { setTimeout(() => { isDeleting = true; typeLoop(); }, 2200); }
  else if (isDeleting && charIndex > 0) { charIndex--; setTimeout(typeLoop, speed); }
  else { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; setTimeout(typeLoop, 400); }
}
setTimeout(typeLoop, 1200);

/* ============================================================
   6. SCROLL REVEAL
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   7. SKILL BAR ANIMATION
   ============================================================ */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const b = e.target;
      setTimeout(() => { b.style.width = b.getAttribute('data-width') + '%'; }, 200);
      barObserver.unobserve(b);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.skill-bar-fill').forEach(b => barObserver.observe(b));

/* ============================================================
   8. STATS COUNT-UP + LIGHTHOUSE COLOR
   ============================================================ */
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.getAttribute('data-target'), 10);
    const start = performance.now();
    function update(now) {
      const p = Math.min((now - start) / 1800, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const cur = Math.round(ease * target);
      el.textContent = cur;
      if (el.getAttribute('data-target') === '91') {
        if (cur < 50) { el.style.color = '#ef4444'; el.style.textShadow = 'none'; }
        else if (cur < 90) { el.style.color = '#f97316'; el.style.textShadow = 'none'; }
        else { el.style.color = '#22c55e'; el.style.textShadow = '0 0 20px rgba(34,197,94,0.45)'; }
      }
      if (p < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => countObserver.observe(el));

/* ============================================================
   9. MAGNETIC BUTTONS
   ============================================================ */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX - r.left - r.width/2) * 0.25}px, ${(e.clientY - r.top - r.height/2) * 0.25}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

/* ============================================================
   10. EXPERIENCE TABS
   ============================================================ */
const tabBtns = document.querySelectorAll('.exp-tab-btn');
const panels = document.querySelectorAll('.exp-panel');

function activateTab(btn) {
  tabBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  panels.forEach(p => p.classList.remove('active'));
  const t = document.getElementById('exp-' + btn.getAttribute('data-tab'));
  if (t) t.classList.add('active');
  moveIndicator(btn);
}

function moveIndicator(btn) {
  const ind = document.getElementById('expTabIndicator');
  const navEl = document.getElementById('expTabNav');
  if (!ind || !navEl) return;
  if (window.getComputedStyle(navEl).flexDirection !== 'column') return;
  const nr = navEl.getBoundingClientRect(), br = btn.getBoundingClientRect();
  ind.style.top = (br.top - nr.top) + 'px';
  ind.style.height = br.height + 'px';
}

tabBtns.forEach(btn => btn.addEventListener('click', () => activateTab(btn)));
window.addEventListener('load', () => { const a = document.querySelector('.exp-tab-btn.active'); if (a) moveIndicator(a); });
window.addEventListener('resize', () => { const a = document.querySelector('.exp-tab-btn.active'); if (a) moveIndicator(a); }, { passive: true });

/* Mobile accordion: wrap each panel's content (after the header) into a
   collapsible body, and toggle it on header click when in mobile layout. */
(function() {
  panels.forEach(panel => {
    const header = panel.querySelector('.exp-panel-header');
    if (!header) return;
    const body = document.createElement('div');
    body.className = 'exp-panel-body';
    let node = header.nextSibling;
    while (node) {
      const after = node.nextSibling;
      body.appendChild(node);
      node = after;
    }
    panel.appendChild(body);

    header.addEventListener('click', () => {
      if (window.innerWidth > 768) return;
      panel.classList.toggle('expanded');
    });
  });
  const first = document.querySelector('.exp-panel');
  if (first) first.classList.add('expanded');
})();

/* ============================================================
   11. NAV SCROLL SPY
   ============================================================ */
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.nav-links a').forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
      });
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

/* ============================================================
   12. CARD TILT EFFECT
   ============================================================ */
document.querySelectorAll('.skill-card, .cs-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 6;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -6;
    card.style.transform = `translateY(-6px) rotateX(${y}deg) rotateY(${x}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.6s cubic-bezier(0.4,0,0.2,1)';
  });
});

/* ============================================================
   13. CONTACT CARDS STAGGER
   ============================================================ */
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach((c, i) => {
  c.style.opacity = '0'; c.style.transform = 'translateY(24px)';
  c.style.transition = `opacity 0.5s ease ${i*0.1}s, transform 0.5s ease ${i*0.1}s`;
});
const contactObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    contactCards.forEach(c => { c.style.opacity = '1'; c.style.transform = 'translateY(0)'; });
    contactObs.disconnect();
  }
}, { threshold: 0.2 });
const contactSection = document.getElementById('contact');
if (contactSection) contactObs.observe(contactSection);

/* =================================================================
   ★ ★ ★  NEW ENHANCED ANIMATIONS  ★ ★ ★
   ================================================================= */

/* ============================================================
   A. SCROLL PROGRESS BAR
   ============================================================ */
(function() {
  const bar = document.createElement('div');
  bar.id = 'scrollProgress';
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    bar.style.width = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100) + '%';
  }, { passive: true });
})();

/* ============================================================
   B. CURSOR PARTICLE TRAIL
   ============================================================ */
(function() {
  const cvs = document.createElement('canvas');
  cvs.id = 'particleCanvas';
  document.body.appendChild(cvs);
  const ctx = cvs.getContext('2d');
  const pts = [];
  let lx = 0, ly = 0;

  function rsz() { cvs.width = window.innerWidth; cvs.height = window.innerHeight; }
  rsz();
  window.addEventListener('resize', rsz, { passive: true });

  document.addEventListener('mousemove', (e) => {
    if (Math.hypot(e.clientX - lx, e.clientY - ly) < 5) return;
    lx = e.clientX; ly = e.clientY;
    for (let i = 0; i < 5; i++) {
      pts.push({
        x: e.clientX + (Math.random()-0.5)*10, y: e.clientY + (Math.random()-0.5)*10,
        vx: (Math.random()-0.5)*1.6, vy: (Math.random()-0.5)*1.6 - 1,
        life: 1, size: Math.random()*2.5+0.5, hue: 260+Math.random()*40
      });
    }
  });

  (function loop() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    for (let i = pts.length-1; i >= 0; i--) {
      const p = pts[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.025; p.life -= 0.022;
      if (p.life <= 0) { pts.splice(i,1); continue; }
      ctx.globalAlpha = p.life * 0.65;
      ctx.fillStyle = `hsla(${p.hue},80%,72%,${p.life})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  })();
})();

/* ============================================================
   C. GLITCH SCRAMBLE ON SECTION LABELS
   ============================================================ */
(function() {
  const ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
  function glitch(el) {
    const orig = el.textContent;
    let it = 0;
    clearInterval(el._gi);
    el._gi = setInterval(() => {
      el.textContent = orig.split('').map((c, i) => {
        if (c === ' ' || c === '·') return c;
        if (i < it) return orig[i];
        return ch[Math.floor(Math.random()*ch.length)];
      }).join('');
      it += 0.55;
      if (it >= orig.length) { el.textContent = orig; clearInterval(el._gi); }
    }, 28);
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { setTimeout(() => glitch(e.target), 120); obs.unobserve(e.target); } });
  }, { threshold: 0.9 });
  document.querySelectorAll('.section-label').forEach(el => obs.observe(el));
})();

/* ============================================================
   D. KEYWORD RANK TICKER (Fixed bottom)
   ============================================================ */
(function() {
  const kw = [
    '⬆ solar panels aurangabad #1','⬆ B2B solar leads #3','⬆ solar EPC company #2',
    '⬆ core web vitals fix #4','⬆ SEO analyst maharashtra #1','⬆ technical SEO specialist #5',
    '⬆ google AI overview #2','⬆ local SEO aurangabad #1','⬆ organic traffic growth #3',
    '⬆ pagespeed score 91 ✦','⬆ lead generation +2018% ✦','⬆ AEO content strategy #2',
    '⬆ knowledge panel won ✦','⬆ featured snippet secured ✦','⬆ non-brand clicks +313 ✦',
  ];
  const ticker = document.createElement('div');
  ticker.id = 'rankTicker';
  const track = document.createElement('div');
  track.className = 'ticker-track';
  track.innerHTML = [...kw,...kw].map(k => `<span class="ticker-item">${k}</span>`).join('');
  ticker.appendChild(track);
  document.body.appendChild(ticker);
})();

/* ============================================================
   E. SERP FLOAT CARD (Hero — parallax tilt)
   ============================================================ */
(function() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const card = document.createElement('div');
  card.id = 'serpFloatCard';
  card.innerHTML = `
    <div class="serp-top">
      <svg class="serp-g-icon" viewBox="0 0 24 24" fill="none" width="18" height="18">
        <circle cx="12" cy="12" r="10" stroke="rgba(139,92,246,0.35)" stroke-width="1.2"/>
        <path d="M19.8 12.2h-7.8v2.9h4.4C15.6 16.9 14 18 12 18c-3.3 0-6-2.7-6-6s2.7-6 6-6c1.5 0 2.8.5 3.8 1.4l2.1-2.1C16.2 3.9 14.2 3 12 3 6.5 3 2 7.5 2 13s4.5 10 10 10 10-4.5 10-10v-.8z" fill="rgba(139,92,246,0.55)"/>
      </svg>
      <span class="serp-query-text">digital marketing executive aurangabad</span>
    </div>
    <div class="serp-ai-block">
      <span class="serp-ai-badge">✦ AI Overview</span>
      <p class="serp-ai-text">Pritam Khaple, Digital Marketing Executive with verified results: 54.8% organic growth, 10,163 GBP profile views, PageSpeed 91 in 6 months at Infisol Energy...</p>
    </div>
    <div class="serp-result-row">
      <div class="serp-fav"></div>
      <div class="serp-result-info">
        <div class="serp-url">pritam-khaple-seo-portfolio.netlify.app</div>
        <div class="serp-title">Pritam Khaple, Digital Marketing Executive | Proven Results</div>
        <div class="serp-snippet">Technical SEO · Social Media · Content · Email Marketing · Reels · Canva Design</div>
      </div>
    </div>
    <div class="serp-pills">
      <span class="serp-pill p1">📍 Local Pack #1</span>
      <span class="serp-pill p2">Featured Snippet</span>
      <span class="serp-pill p3">Knowledge Panel</span>
    </div>`;
  hero.appendChild(card);

  document.addEventListener('mousemove', (e) => {
    if (window.scrollY > window.innerHeight * 0.6) return;
    const rx = (e.clientX / window.innerWidth - 0.5) * 16;
    const ry = (e.clientY / window.innerHeight - 0.5) * 10;
    card.style.transform = `rotateX(${-ry}deg) rotateY(${rx}deg)`;
  });
})();

/* ============================================================
   F. GOOGLEBOT CRAWL NODE GRAPH (Skills background)
   ============================================================ */
(function() {
  const sec = document.getElementById('skills');
  if (!sec) return;
  sec.style.position = 'relative';
  const cvs = document.createElement('canvas');
  cvs.className = 'crawl-bg-canvas';
  sec.insertBefore(cvs, sec.firstChild);
  const ctx = cvs.getContext('2d');

  function rsz() { cvs.width = sec.offsetWidth; cvs.height = sec.offsetHeight; }
  rsz();
  window.addEventListener('resize', rsz, { passive: true });

  const urls = ['/', '/about', '/skills', '/blog', '/sitemap.xml', '/robots.txt',
    '/contact', '/case-study', '/schema', '/gsc', '/ga4', '/ahrefs',
    '/local', '/aeo', '/cwv', '/faq', '/gbp', '/search'];

  let nodes = urls.map(url => ({
    x: 60 + Math.random() * (cvs.width - 120),
    y: 60 + Math.random() * (cvs.height - 120),
    vx: (Math.random()-0.5)*0.22, vy: (Math.random()-0.5)*0.22,
    r: Math.random()*2+1.5, url, visited: false
  }));

  let botFrom = 0, botTo = 1, botProg = 0, running = false;

  function draw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x<40||n.x>cvs.width-40) n.vx*=-1;
      if (n.y<40||n.y>cvs.height-40) n.vy*=-1;
    });

    // Edges
    for (let i=0;i<nodes.length;i++) for (let j=i+1;j<nodes.length;j++) {
      const d = Math.hypot(nodes[i].x-nodes[j].x, nodes[i].y-nodes[j].y);
      if (d<170) {
        ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y);
        ctx.strokeStyle=`rgba(139,92,246,${0.065*(1-d/170)})`; ctx.lineWidth=0.5; ctx.stroke();
      }
    }

    // Nodes
    nodes.forEach((n,i) => {
      const act = i===botFrom||i===botTo;
      ctx.beginPath(); ctx.arc(n.x,n.y,act?n.r+2.5:n.r,0,Math.PI*2);
      ctx.fillStyle = n.visited?'rgba(139,92,246,0.32)':act?'rgba(167,139,250,0.75)':'rgba(139,92,246,0.1)';
      ctx.fill();
      if (act) { ctx.strokeStyle='rgba(167,139,250,0.45)'; ctx.lineWidth=1; ctx.stroke(); }
      ctx.fillStyle=`rgba(167,139,250,${act?0.65:0.18})`;
      ctx.font=`${act?9:8}px monospace`; ctx.textAlign='center';
      ctx.fillText(n.url, n.x, n.y-n.r-5);
    });

    // Crawler
    botProg += 0.007;
    const f=nodes[botFrom], t=nodes[botTo];
    const bx=f.x+(t.x-f.x)*botProg, by=f.y+(t.y-f.y)*botProg;

    // Trail
    ctx.beginPath(); ctx.moveTo(f.x,f.y); ctx.lineTo(bx,by);
    ctx.strokeStyle='rgba(139,92,246,0.25)'; ctx.lineWidth=1; ctx.stroke();

    // Bot
    ctx.beginPath(); ctx.arc(bx,by,5,0,Math.PI*2);
    ctx.fillStyle='rgba(167,139,250,1)'; ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,0.35)'; ctx.lineWidth=1.5; ctx.stroke();

    // Pulse ring
    const pulse = (Date.now()%1200)/1200;
    ctx.beginPath(); ctx.arc(bx,by,5+pulse*18,0,Math.PI*2);
    ctx.strokeStyle=`rgba(139,92,246,${0.35*(1-pulse)})`; ctx.lineWidth=0.8; ctx.stroke();

    if (botProg>=1) {
      nodes[botFrom].visited=true; botFrom=botTo; botProg=0;
      let best=-1, bestD=Infinity;
      for (let j=0;j<nodes.length;j++) {
        if (j===botFrom||nodes[j].visited) continue;
        const d=Math.hypot(nodes[botFrom].x-nodes[j].x, nodes[botFrom].y-nodes[j].y);
        if (d<bestD) { bestD=d; best=j; }
      }
      if (best===-1) { nodes.forEach(n=>n.visited=false); best=(botFrom+1)%nodes.length; }
      botTo=best;
    }
    requestAnimationFrame(draw);
  }

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !running) { running=true; draw(); }
    obs.disconnect();
  }, { threshold: 0.05 });
  obs.observe(sec);
})();

/* ============================================================
   G. GSC SELF-DRAWING CHART (Case Studies)
   ============================================================ */
(function() {
  const sec = document.getElementById('casestudies');
  if (!sec) return;

  const wrap = document.createElement('div');
  wrap.className = 'gsc-chart-wrap';
  wrap.innerHTML = '<div class="gsc-chart-header"><span class="gsc-chart-title">Organic Performance: GSC Snapshot</span><span class="gsc-chart-badge">+54.8% Clicks ↑</span></div>';

  const cvs = document.createElement('canvas');
  cvs.className = 'gsc-chart-canvas';
  cvs.width = 900; cvs.height = 180;
  wrap.appendChild(cvs);

  const cont = sec.querySelector('.container');
  const hdr = sec.querySelector('.section-header');
  if (cont && hdr) cont.insertBefore(wrap, hdr.nextSibling);

  const gCtx = cvs.getContext('2d');
  const months = ['Aug','Sep','Oct','Nov','Dec','Jan','Feb'];
  const clicks =      [12, 28,  45,  67,  89, 120, 156];
  const impressions = [180,320, 520, 780,1100,1450,1820];
  let prog = 0, started = false;

  function norm(data, H, PB) {
    const mx = Math.max(...data);
    return data.map(v => H - PB - ((v/mx)*(H-PB*2.5)));
  }

  function draw(p) {
    const W=cvs.width, H=cvs.height, PL=14, PR=14, PT=28, PB=26;
    const cH=H-PT-PB, cW=W-PL-PR;
    gCtx.clearRect(0,0,W,H);
    const ck=norm(clicks,H,PB), im=norm(impressions,H,PB);
    const n=months.length, xStep=cW/(n-1);
    const vis=Math.ceil(p*(n-1))+1, sub=(p*(n-1))%1;

    // Grid
    for(let i=0;i<=3;i++){
      gCtx.beginPath(); gCtx.moveTo(PL,PT+(cH/3)*i); gCtx.lineTo(W-PR,PT+(cH/3)*i);
      gCtx.strokeStyle='rgba(255,255,255,0.04)'; gCtx.lineWidth=1; gCtx.stroke();
    }

    function drawLine(yArr, color, lw) {
      gCtx.beginPath();
      for(let i=0;i<vis&&i<n;i++){
        const x=PL+i*xStep, y=yArr[i];
        if(i===0){gCtx.moveTo(x,y);}
        else if(i===vis-1&&p<1){
          const px=PL+(i-1)*xStep, py=yArr[i-1];
          gCtx.lineTo(px+(x-px)*sub, py+(y-py)*sub);
        } else { gCtx.lineTo(x,y); }
      }
      gCtx.strokeStyle=color; gCtx.lineWidth=lw; gCtx.lineJoin='round'; gCtx.stroke();
    }

    // Area fill under clicks
    gCtx.beginPath();
    gCtx.moveTo(PL, ck[0]);
    for(let i=1;i<vis&&i<n;i++) gCtx.lineTo(PL+i*xStep, ck[i]);
    const lx=PL+Math.min(vis-1,n-1)*xStep;
    gCtx.lineTo(lx,H-PB); gCtx.lineTo(PL,H-PB); gCtx.closePath();
    const g=gCtx.createLinearGradient(0,PT,0,H-PB);
    g.addColorStop(0,'rgba(139,92,246,0.2)'); g.addColorStop(1,'rgba(139,92,246,0)');
    gCtx.fillStyle=g; gCtx.fill();

    drawLine(im,'rgba(96,165,250,0.5)',1.5);
    drawLine(ck,'rgba(139,92,246,0.95)',2.5);

    for(let i=0;i<vis&&i<n;i++){
      const x=PL+i*xStep;
      gCtx.beginPath(); gCtx.arc(x,ck[i],3.5,0,Math.PI*2);
      gCtx.fillStyle='#a78bfa'; gCtx.fill();
      gCtx.strokeStyle='rgba(139,92,246,0.5)'; gCtx.lineWidth=1; gCtx.stroke();
      gCtx.fillStyle='rgba(255,255,255,0.25)';
      gCtx.font='10px DM Sans,sans-serif'; gCtx.textAlign='center';
      gCtx.fillText(months[i],x,H-8);
    }

    gCtx.font='10px DM Sans,sans-serif'; gCtx.textAlign='left';
    gCtx.fillStyle='rgba(139,92,246,0.9)'; gCtx.fillText('● Clicks', PL, PT-10);
    gCtx.fillStyle='rgba(96,165,250,0.7)'; gCtx.fillText('● Impressions', PL+58, PT-10);
    gCtx.fillStyle='rgba(255,255,255,0.4)'; gCtx.textAlign='right';
    gCtx.fillText('+54.8% ↑', W-PR, PT-10);
  }

  function animate() {
    if(prog>=1) return;
    prog=Math.min(prog+0.011,1); draw(prog); requestAnimationFrame(animate);
  }

  const obs=new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting&&!started){started=true;animate();}
  },{threshold:0.25});
  obs.observe(wrap);
})();

/* ============================================================
   H. CLICK RIPPLE EFFECT
   ============================================================ */
document.addEventListener('click', (e) => {
  const r = document.createElement('div');
  r.className = 'click-ripple';
  r.style.left = e.clientX + 'px';
  r.style.top = e.clientY + 'px';
  document.body.appendChild(r);
  setTimeout(() => r.remove(), 900);
});

/* ============================================================
   I. AURORA MOUSE FOLLOW (Hero)
   ============================================================ */
(function() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const blob = document.createElement('div');
  blob.id = 'auroraBlob';
  hero.appendChild(blob);
  let ax=window.innerWidth/2, ay=window.innerHeight/2, tx=ax, ty=ay;
  document.addEventListener('mousemove',(e)=>{ if(window.scrollY<window.innerHeight){tx=e.clientX;ty=e.clientY;} });
  (function loop(){ ax+=(tx-ax)*0.045; ay+=(ty-ay)*0.045; blob.style.left=ax+'px'; blob.style.top=ay+'px'; requestAnimationFrame(loop); })();
})();

/* ============================================================
   J. STAGGERED SKILL CARD BOUNCE ENTRANCE
   ============================================================ */
(function() {
  const cards = document.querySelectorAll('.skill-card');
  cards.forEach((c,i) => {
    c.style.opacity='0'; c.style.transform='translateY(48px) scale(0.94)';
    c.style.transition=`opacity 0.5s ease ${i*0.07}s, transform 0.65s cubic-bezier(0.34,1.56,0.64,1) ${i*0.07}s`;
  });
  const obs = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){
      cards.forEach(c=>{ c.style.opacity='1'; c.style.transform='translateY(0) scale(1)'; });
      obs.disconnect();
    }
  },{threshold:0.1});
  const s=document.getElementById('skills');
  if(s) obs.observe(s);
})();

/* ============================================================
   K. SECTION FADE-SLIDE TRANSITIONS
   ============================================================ */
(function() {
  document.querySelectorAll('.section').forEach(s=>{
    s.style.opacity='0'; s.style.transform='translateY(18px)';
    s.style.transition='opacity 0.85s cubic-bezier(0.4,0,0.2,1),transform 0.85s cubic-bezier(0.4,0,0.2,1)';
  });
  const hero=document.querySelector('.hero');
  if(hero){hero.style.opacity='1';hero.style.transform='none';}
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';obs.unobserve(e.target);}
    });
  },{threshold:0.04});
  document.querySelectorAll('.section').forEach(s=>obs.observe(s));
})();

/* ============================================================
   L. CERT BADGE RADIAL SPOTLIGHT HOVER
   ============================================================ */
document.querySelectorAll('.cert-badge').forEach(badge => {
  badge.addEventListener('mousemove', (e) => {
    const r = badge.getBoundingClientRect();
    badge.style.background = `radial-gradient(circle at ${((e.clientX-r.left)/r.width*100).toFixed(1)}% ${((e.clientY-r.top)/r.height*100).toFixed(1)}%, rgba(139,92,246,0.18) 0%, var(--bg-card) 65%)`;
  });
  badge.addEventListener('mouseleave', () => { badge.style.background = ''; });
});

/* ============================================================
   M. EXP HIGHLIGHT CARD SPRING HOVER
   ============================================================ */
document.querySelectorAll('.exp-highlight-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform='translateY(-5px) scale(1.04)';
    card.style.boxShadow='0 0 28px rgba(139,92,246,0.28), inset 0 0 10px rgba(139,92,246,0.06)';
    card.style.borderColor='rgba(139,92,246,0.45)';
    card.style.transition='all 0.35s cubic-bezier(0.34,1.56,0.64,1)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform=''; card.style.boxShadow=''; card.style.borderColor='';
    card.style.transition='all 0.4s ease';
  });
});

/* ============================================================
   N. FOOTER FADE IN
   ============================================================ */
(function() {
  const footer=document.querySelector('.footer');
  if(!footer) return;
  footer.style.opacity='0'; footer.style.transform='translateY(12px)';
  footer.style.transition='opacity 0.7s ease, transform 0.7s ease';
  const obs=new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){footer.style.opacity='1';footer.style.transform='translateY(0)';obs.disconnect();}
  },{threshold:0.3});
  obs.observe(footer);
})();

/* ============================================================
   O. ABOUT CHIP FLOAT ANIMATION (stagger)
   ============================================================ */
document.querySelectorAll('.about-chips .chip').forEach((chip, i) => {
  chip.style.animationDelay = `${i * 0.12}s`;
  chip.classList.add('chip-float');
});

/* ============================================================
   P. CREATIVE SHOWCASE LIGHTBOX
   ============================================================ */
(function() {
  const lightbox = document.getElementById('lightbox');
  const inner = document.getElementById('lightboxInner');
  if (!lightbox) return;

  function closeLightbox() {
    lightbox.classList.remove('open');
    const vid = inner.querySelector('video');
    if (vid) vid.pause();
    // Stop YouTube iframe by clearing src (resetting it stops audio/video immediately)
    const iframe = inner.querySelector('iframe');
    if (iframe) iframe.src = '';
  }

  function openImageLightbox(card) {
    const imgEl = card.querySelector('img');
    const src = imgEl ? imgEl.getAttribute('src') : '';
    const title = card.querySelector('.creative-name') ? card.querySelector('.creative-name').textContent : '';
    const tag = card.getAttribute('data-tag') || '';

    inner.innerHTML = '<button class="lightbox-close" id="lightboxClose">&times;</button>';
    if (src) {
      const img = document.createElement('img');
      img.src = src;
      img.alt = title;
      inner.appendChild(img);
    }
    const caption = document.createElement('div');
    caption.className = 'lightbox-caption';
    caption.textContent = tag + (title ? (': ' + title) : '');
    inner.appendChild(caption);

    inner.querySelector('#lightboxClose').addEventListener('click', closeLightbox);
    lightbox.classList.add('open');
  }

  function openVideoLightbox(card) {
    const src = card.getAttribute('data-video');
    const title = card.getAttribute('data-title') || '';

    inner.innerHTML = '<button class="lightbox-close" id="lightboxClose">&times;</button>';
    if (src) {
      const isYouTube = src.includes('youtube.com/embed/');
      if (isYouTube) {
        // Render YouTube Shorts iframe (vertical 9:16)
        const iframe = document.createElement('iframe');
        iframe.src = src;
        iframe.className = 'yt-shorts-frame';
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('frameborder', '0');
        inner.appendChild(iframe);
      } else {
        // Fallback: render local video element
        const spinner = document.createElement('div');
        spinner.className = 'lightbox-spinner';
        inner.appendChild(spinner);

        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.style.opacity = '0';
        video.addEventListener('canplay', () => {
          spinner.remove();
          video.style.opacity = '1';
        });
        inner.appendChild(video);
      }
    }
    if (title) {
      const caption = document.createElement('div');
      caption.className = 'lightbox-caption';
      caption.textContent = title;
      inner.appendChild(caption);
    }

    inner.querySelector('#lightboxClose').addEventListener('click', closeLightbox);
    lightbox.classList.add('open');
  }

  document.querySelectorAll('.creative-card[data-lightbox]').forEach(card => {
    card.addEventListener('click', () => openImageLightbox(card));
  });

  document.querySelectorAll('.reel-card[data-video]').forEach(card => {
    card.addEventListener('click', () => openVideoLightbox(card));
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();

/* Note: creative-card and reel-card entrance animation is handled by the
   sitewide .scroll-reveal system above (section A), using each card's
   inline --delay for stagger timing. No separate observer needed here. */

/* ============================================================
   R. MOBILE "VIEW MORE" PAGINATION (Creative & Reels)
   ============================================================ */
(function() {
  function setupLoadMore(gridSelector, buttonId, initial, step) {
    const grid = document.querySelector(gridSelector);
    const btn = document.getElementById(buttonId);
    if (!grid || !btn) return;
    const cards = Array.from(grid.children);
    const wrap = btn.parentElement;
    const mq = window.matchMedia('(max-width: 768px)');
    let shown = initial;

    function apply() {
      if (mq.matches) {
        shown = initial;
        cards.forEach((c, i) => { c.style.display = i < initial ? '' : 'none'; });
        const hasMore = cards.length > initial;
        btn.style.display = hasMore ? 'inline-flex' : 'none';
        wrap.style.display = hasMore ? 'flex' : 'none';
      } else {
        cards.forEach(c => { c.style.display = ''; });
        btn.style.display = 'none';
        wrap.style.display = 'none';
      }
    }

    btn.addEventListener('click', () => {
      const next = cards.slice(shown, shown + step);
      next.forEach(c => { c.style.display = ''; });
      shown += step;
      if (shown >= cards.length) {
        btn.style.display = 'none';
        wrap.style.display = 'none';
      }
    });

    mq.addEventListener('change', apply);
    apply();
  }

  setupLoadMore('.creative-grid', 'creativeLoadMore', 3, 4);
  setupLoadMore('.reels-grid', 'reelsLoadMore', 3, 4);
})();
