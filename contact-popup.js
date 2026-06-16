/**
 * YOLO Collective — Contact Popup
 * Auto-injects a beautiful slide-up contact sheet.
 * Trigger by adding class "open-contact-popup" to any element.
 */
(function () {
  var CSS = `
    /* ── POPUP OVERLAY ── */
    .ycp-overlay {
      position: fixed;
      inset: 0;
      z-index: 9998;
      background: rgba(0, 0, 0, 0);
      backdrop-filter: blur(0px);
      -webkit-backdrop-filter: blur(0px);
      pointer-events: none;
      transition: background 0.4s ease, backdrop-filter 0.4s ease;
    }
    .ycp-overlay.ycp-open {
      background: rgba(0, 0, 0, 0.72);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      pointer-events: all;
    }

    /* ── SHEET ── */
    .ycp-sheet {
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) translateY(100%);
      width: min(780px, 100%);
      max-height: 92vh;
      overflow-y: auto;
      z-index: 9999;
      background: #0f0f0f;
      border-radius: 28px 28px 0 0;
      border-top: 1px solid rgba(116, 172, 223, 0.2);
      box-shadow: 0 -24px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.04);
      transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1);
      overscroll-behavior: contain;
    }
    .ycp-sheet.ycp-open {
      transform: translateX(-50%) translateY(0);
    }

    /* ── DRAG HANDLE ── */
    .ycp-handle {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 14px 0 0;
      gap: 10px;
      position: sticky;
      top: 0;
      background: #0f0f0f;
      z-index: 1;
      border-radius: 28px 28px 0 0;
    }
    .ycp-handle-bar {
      width: 40px;
      height: 4px;
      border-radius: 100px;
      background: rgba(255,255,255,0.15);
    }
    .ycp-close {
      position: absolute;
      top: 14px;
      right: 20px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255,255,255,0.08);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255,255,255,0.6);
      font-size: 18px;
      line-height: 1;
      transition: background 0.2s, color 0.2s;
    }
    .ycp-close:hover { background: rgba(255,255,255,0.14); color: #fff; }

    /* ── HEADER ── */
    .ycp-header {
      padding: 18px 28px 0;
      text-align: center;
    }
    .ycp-eyebrow {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #74ACDF;
      margin: 0 0 6px;
      font-family: 'Inter', sans-serif;
    }
    .ycp-title {
      font-size: clamp(1.5rem, 5vw, 2rem);
      font-weight: 800;
      color: #fff;
      margin: 0 0 4px;
      letter-spacing: -0.03em;
      font-family: 'Inter', sans-serif;
    }
    .ycp-sub {
      font-size: 0.88rem;
      color: rgba(255,255,255,0.45);
      margin: 0;
      font-family: 'Inter', sans-serif;
    }

    /* ── DIVIDER ── */
    .ycp-divider {
      border: none;
      border-top: 1px solid rgba(255,255,255,0.06);
      margin: 20px 28px;
    }

    /* ── CONTACT GRID ── */
    .ycp-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      padding: 0 20px;
    }

    /* ── CARDS ── */
    .ycp-card {
      display: flex;
      align-items: center;
      gap: 13px;
      padding: 16px 18px;
      background: #181818;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      text-decoration: none;
      color: #fff;
      transition: background 0.2s, border-color 0.2s, transform 0.2s;
      position: relative;
      overflow: hidden;
      font-family: 'Inter', sans-serif;
    }
    .ycp-card::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .ycp-card:hover {
      background: #1f1f1f;
      border-color: rgba(116, 172, 223, 0.3);
      transform: translateY(-2px);
    }

    /* WhatsApp hero card — full width */
    .ycp-card--hero {
      grid-column: 1 / -1;
      padding: 20px 22px;
      background: linear-gradient(135deg, #0f1f0f 0%, #0a1a0a 100%);
      border-color: rgba(37, 211, 102, 0.25);
    }
    .ycp-card--hero:hover {
      border-color: rgba(37, 211, 102, 0.5);
      background: linear-gradient(135deg, #121f12 0%, #0d1a0d 100%);
    }
    .ycp-card--hero::after {
      background: radial-gradient(ellipse at left, rgba(37,211,102,0.08) 0%, transparent 60%);
      opacity: 1;
    }

    .ycp-icon {
      flex-shrink: 0;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ycp-icon svg { width: 22px; height: 22px; }
    .ycp-icon--green { background: rgba(37, 211, 102, 0.12); }
    .ycp-icon--sky { background: rgba(116, 172, 223, 0.12); }
    .ycp-icon--ig { background: linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%); }
    .ycp-icon--fb { background: #1877F2; }
    .ycp-icon--yt { background: #FF0000; }

    .ycp-info { flex: 1; min-width: 0; }
    .ycp-label {
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.4);
      margin: 0 0 2px;
    }
    .ycp-value {
      font-size: 0.92rem;
      font-weight: 600;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
    }
    .ycp-card--hero .ycp-value { font-size: 1rem; }

    .ycp-cta-badge {
      flex-shrink: 0;
      background: #25D366;
      color: #000;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 6px 13px;
      border-radius: 100px;
      letter-spacing: 0.02em;
    }

    .ycp-arrow {
      flex-shrink: 0;
      color: rgba(255,255,255,0.25);
      transition: color 0.2s, transform 0.2s;
    }
    .ycp-card:hover .ycp-arrow { color: #74ACDF; transform: translateX(3px); }

    /* ── SOCIAL ROW ── */
    .ycp-social-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      padding: 0 20px;
      margin-top: 10px;
    }
    .ycp-social-pill {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 13px 10px;
      background: #181818;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 14px;
      text-decoration: none;
      color: rgba(255,255,255,0.7);
      font-size: 0.78rem;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      transition: background 0.2s, border-color 0.2s, transform 0.2s, color 0.2s;
    }
    .ycp-social-pill:hover {
      background: #1f1f1f;
      border-color: rgba(116,172,223,0.3);
      color: #fff;
      transform: translateY(-2px);
    }
    .ycp-social-pill svg { width: 16px; height: 16px; flex-shrink: 0; }

    /* ── FOOTER ── */
    .ycp-footer {
      padding: 20px 20px 32px;
      text-align: center;
    }
    .ycp-footer-text {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.25);
      font-family: 'Inter', sans-serif;
      margin: 0 0 12px;
    }
    .ycp-full-contact {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.78rem;
      font-weight: 600;
      color: #74ACDF;
      text-decoration: none;
      font-family: 'Inter', sans-serif;
      border-bottom: 1px solid rgba(116,172,223,0.3);
      padding-bottom: 1px;
      transition: color 0.2s, border-color 0.2s;
    }
    .ycp-full-contact:hover { color: #a8ccec; border-color: rgba(168,204,236,0.4); }

    /* ── PULSE DOT ── */
    .ycp-pulse-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      padding: 6px 0 12px;
      font-size: 0.72rem;
      color: rgba(255,255,255,0.3);
      font-family: 'Inter', sans-serif;
    }
    .ycp-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #4ade80;
      animation: ycp-pulse 2s ease-in-out infinite;
    }
    @keyframes ycp-pulse {
      0%,100% { opacity:1; box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
      50% { opacity:0.7; box-shadow: 0 0 0 5px rgba(74,222,128,0); }
    }

    /* ── MOBILE ── */
    @media (max-width: 540px) {
      .ycp-sheet { border-radius: 22px 22px 0 0; }
      .ycp-grid { grid-template-columns: 1fr; }
      .ycp-card--hero { grid-column: 1; }
    }
  `;

  var HTML = `
    <div class="ycp-overlay" id="ycpOverlay"></div>
    <div class="ycp-sheet" id="ycpSheet" role="dialog" aria-modal="true" aria-label="Contact YOLO Collective">
      <div class="ycp-handle">
        <div class="ycp-handle-bar"></div>
        <button class="ycp-close" id="ycpClose" aria-label="Close">✕</button>
      </div>

      <div class="ycp-header">
        <p class="ycp-eyebrow">The YOLO Collective</p>
        <h2 class="ycp-title">Let's Make It Happen.</h2>
        <p class="ycp-sub">Your mountain concierge is online and ready.</p>
      </div>

      <div class="ycp-pulse-row">
        <span class="ycp-dot"></span>
        Typically responds within a few hours
      </div>

      <hr class="ycp-divider" />

      <div class="ycp-grid">
        <!-- WhatsApp — Hero Card -->
        <a href="https://wa.me/919816152788?text=Hi%20YOLO%20Collective%2C%20I%20want%20to%20plan%20an%20experience!" class="ycp-card ycp-card--hero" target="_blank" rel="noopener">
          <div class="ycp-icon ycp-icon--green">
            <svg viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.552 4.105 1.518 5.83L.057 23.25c-.072.272.173.519.447.446l5.515-1.446A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 0 1-5.009-1.374l-.36-.213-3.724.977.995-3.634-.233-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
            </svg>
          </div>
          <div class="ycp-info">
            <p class="ycp-label">Fastest Response · WhatsApp</p>
            <p class="ycp-value">+91 70185 91758</p>
          </div>
          <span class="ycp-cta-badge">Chat Now</span>
        </a>

        <!-- Phone -->
        <a href="tel:+919816152788" class="ycp-card">
          <div class="ycp-icon ycp-icon--sky">
            <svg viewBox="0 0 24 24" fill="none" stroke="#74ACDF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.68 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <div class="ycp-info">
            <p class="ycp-label">Call Us</p>
            <p class="ycp-value">+91 70185 91758</p>
          </div>
          <svg class="ycp-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </a>

        <!-- Email -->
        <a href="mailto:hello@theyolocollective.com" class="ycp-card">
          <div class="ycp-icon ycp-icon--sky">
            <svg viewBox="0 0 24 24" fill="none" stroke="#74ACDF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div class="ycp-info">
            <p class="ycp-label">Email</p>
            <p class="ycp-value">hello@theyolocollective.com</p>
          </div>
          <svg class="ycp-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </a>
      </div>

      <!-- Socials Row -->
      <div class="ycp-social-row">
        <a href="https://www.instagram.com/the.yolo.collective" class="ycp-social-pill" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="url(#ig-grad)" width="16" height="16">
            <defs>
              <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#F58529"/>
                <stop offset="50%" style="stop-color:#DD2A7B"/>
                <stop offset="100%" style="stop-color:#8134AF"/>
              </linearGradient>
            </defs>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Instagram
        </a>
        <a href="https://www.facebook.com/the.yolo.collective" class="ycp-social-pill" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </a>
        <a href="https://www.youtube.com/@the.yolo.collective" class="ycp-social-pill" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="#FF0000" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
          </svg>
          YouTube
        </a>
      </div>

      <div class="ycp-footer">
        <p class="ycp-footer-text">Or visit our full contact page</p>
        <a href="contact.html" class="ycp-full-contact">
          View all contact options
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" width="14" height="14"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </a>
      </div>
    </div>
  `;

  function init() {
    // Inject CSS
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // Inject HTML
    var wrap = document.createElement('div');
    wrap.innerHTML = HTML;
    document.body.appendChild(wrap);

    var overlay = document.getElementById('ycpOverlay');
    var sheet   = document.getElementById('ycpSheet');
    var closeBtn = document.getElementById('ycpClose');

    function open() {
      overlay.classList.add('ycp-open');
      sheet.classList.add('ycp-open');
      document.body.style.overflow = 'hidden';
      sheet.focus && sheet.focus();
    }

    function close() {
      overlay.classList.remove('ycp-open');
      sheet.classList.remove('ycp-open');
      document.body.style.overflow = '';
    }

    // Trigger on any element with class open-contact-popup
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('.open-contact-popup');
      if (trigger) {
        e.preventDefault();
        open();
      }
    });

    // Close on overlay click
    overlay.addEventListener('click', close);

    // Close button
    closeBtn.addEventListener('click', close);

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    // Touch drag-to-close
    var startY = 0;
    sheet.addEventListener('touchstart', function (e) {
      startY = e.touches[0].clientY;
    }, { passive: true });
    sheet.addEventListener('touchend', function (e) {
      var dy = e.changedTouches[0].clientY - startY;
      if (dy > 80) close();
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
