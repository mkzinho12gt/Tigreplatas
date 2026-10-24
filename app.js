(function () {
  "use strict";
  const config = window.SITE_CONFIG;
  const grid = document.getElementById("cards");

  if (!grid || !config || !Array.isArray(config.platforms)) {
    if (grid) grid.innerHTML = '<p class="loading">Não foi possível carregar as plataformas.</p>';
    return;
  }

  const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));

  grid.innerHTML = config.platforms.map((p) => {
    const name = escapeHTML(p.name);
    const badge = escapeHTML(p.badge);
    const rtp = escapeHTML(p.rtp);
    const payout = escapeHTML(p.payout);
    const color = /^#[0-9a-fA-F]{6}$/.test(p.color) ? p.color : "#e8c547";
    const href = escapeHTML(p.affiliateUrl);
    const initials = escapeHTML(String(p.name || "?").slice(0, 2).toUpperCase());
    return `
      <article class="card">
        <div class="brand">
          <div class="icon" style="background:${color}" aria-hidden="true">${initials}</div>
          <div class="info">
            <h2>${name} <span class="tag">${badge}</span></h2>
            <small>RTP ${rtp} · ${payout}</small>
          </div>
        </div>
        <a class="btn" href="${href}" target="_blank" rel="nofollow sponsored noopener noreferrer"
           aria-label="Abrir cadastro de ${name}">Cadastrar</a>
      </article>`;
  }).join("");
})();
