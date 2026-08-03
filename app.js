(function () {
  "use strict";

  const catMap = new Map(CATEGORIES.map((c) => [c.key, c]));

  const state = {
    category: "all",
    query: "",
    sort: "default",
    freeOnly: false,
    favsOnly: false,
    favorites: loadFavorites(),
  };

  const els = {
    searchInput: document.getElementById("searchInput"),
    clearSearch: document.getElementById("clearSearch"),
    themeToggle: document.getElementById("themeToggle"),
    themeIcon: document.getElementById("themeIcon"),
    submitBtn: document.getElementById("submitBtn"),
    statTools: document.getElementById("statTools"),
    statCats: document.getElementById("statCats"),
    statFeatured: document.getElementById("statFeatured"),
    logoCloud: document.getElementById("logoCloud"),
    catList: document.getElementById("catList"),
    freeToggle: document.getElementById("freeToggle"),
    sortSelect: document.getElementById("sortSelect"),
    favsToggle: document.getElementById("favsToggle"),
    favCount: document.getElementById("favCount"),
    toolsGrid: document.getElementById("toolsGrid"),
    emptyState: document.getElementById("emptyState"),
    resultSummary: document.getElementById("resultSummary"),
    toolModal: document.getElementById("toolModal"),
    submitModal: document.getElementById("submitModal"),
    modalClose: document.getElementById("modalClose"),
    submitClose: document.getElementById("submitClose"),
    modalHead: document.getElementById("modalHead"),
    modalBody: document.getElementById("modalBody"),
    modalFoot: document.getElementById("modalFoot"),
    submitForm: document.getElementById("submitForm"),
    toast: document.getElementById("toast"),
  };

  let toastTimer = null;
  let activeToolId = null;

  init();

  function init() {
    applyTheme(loadTheme());
    renderStats();
    renderLogoCloud();
    renderCategories();
    renderTools();
    bindEvents();
    refreshIcons();
  }

  function bindEvents() {
    els.searchInput.addEventListener("input", (e) => {
      state.query = e.target.value.trim().toLowerCase();
      els.clearSearch.classList.toggle("show", Boolean(state.query));
      renderTools();
    });

    els.clearSearch.addEventListener("click", () => {
      els.searchInput.value = "";
      state.query = "";
      els.clearSearch.classList.remove("show");
      renderTools();
      els.searchInput.focus();
    });

    els.themeToggle.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem("ai-nav-theme", next);
    });

    els.sortSelect.addEventListener("change", (e) => {
      state.sort = e.target.value;
      renderTools();
    });

    els.freeToggle.addEventListener("click", () => {
      state.freeOnly = !state.freeOnly;
      els.freeToggle.classList.toggle("active", state.freeOnly);
      els.freeToggle.setAttribute("aria-pressed", String(state.freeOnly));
      renderTools();
    });

    els.favsToggle.addEventListener("click", () => {
      state.favsOnly = !state.favsOnly;
      els.favsToggle.classList.toggle("active", state.favsOnly);
      els.favsToggle.setAttribute("aria-pressed", String(state.favsOnly));
      if (state.favsOnly && state.category !== "all") {
        state.category = "all";
        renderCategories();
      }
      renderTools();
    });

    els.catList.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-cat]");
      if (!btn) return;
      state.category = btn.dataset.cat;
      if (state.favsOnly) {
        state.favsOnly = false;
        els.favsToggle.classList.remove("active");
        els.favsToggle.setAttribute("aria-pressed", "false");
      }
      renderCategories();
      renderTools();
    });

    els.toolsGrid.addEventListener("click", (e) => {
      const card = e.target.closest(".tool-card");
      if (!card) return;
      const favBtn = e.target.closest(".fav-btn");
      const visitBtn = e.target.closest(".visit-btn");
      if (favBtn) {
        toggleFavorite(card.dataset.id, favBtn);
        return;
      }
      if (visitBtn) {
        e.preventDefault();
        window.open(visitBtn.dataset.url, "_blank", "noopener");
        return;
      }
      openToolModal(card.dataset.id);
    });

    els.toolsGrid.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const card = e.target.closest(".tool-card");
      if (!card) return;
      e.preventDefault();
      const favBtn = e.target.closest(".fav-btn");
      const visitBtn = e.target.closest(".visit-btn");
      if (favBtn) {
        toggleFavorite(card.dataset.id, favBtn);
        return;
      }
      if (visitBtn) {
        window.open(visitBtn.dataset.url, "_blank", "noopener");
        return;
      }
      openToolModal(card.dataset.id);
    });

    els.modalClose.addEventListener("click", closeToolModal);
    els.submitClose.addEventListener("click", closeSubmitModal);

    els.toolModal.addEventListener("click", (e) => {
      if (e.target === els.toolModal) closeToolModal();
    });

    els.submitModal.addEventListener("click", (e) => {
      if (e.target === els.submitModal) closeSubmitModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (!els.toolModal.hidden) closeToolModal();
        if (!els.submitModal.hidden) closeSubmitModal();
      }
      if (e.key === "/" && document.activeElement !== els.searchInput) {
        e.preventDefault();
        els.searchInput.focus();
      }
    });

    els.submitBtn.addEventListener("click", () => {
      els.submitModal.hidden = false;
      document.body.style.overflow = "hidden";
      els.submitForm.querySelector("input").focus();
      refreshIcons();
    });

    els.submitForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(els.submitForm);
      const record = {
        name: formData.get("name"),
        url: formData.get("url"),
        desc: formData.get("desc"),
        at: new Date().toISOString(),
      };
      const pending = JSON.parse(localStorage.getItem("ai-nav-submissions") || "[]");
      pending.push(record);
      localStorage.setItem("ai-nav-submissions", JSON.stringify(pending));
      els.submitForm.reset();
      closeSubmitModal();
      showToast("提交成功，我们会尽快审核");
    });

    document.querySelectorAll("[data-scroll='top']").forEach((btn) => {
      btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    });
  }

  function renderStats() {
    els.statTools.textContent = TOOLS.length;
    els.statCats.textContent = CATEGORIES.length;
    els.statFeatured.textContent = TOOLS.filter((t) => t.featured).length;
  }

  function renderLogoCloud() {
    const top = [...TOOLS].sort((a, b) => b.favs - a.favs).slice(0, 8);
    els.logoCloud.innerHTML = top
      .map((tool) => {
        const initial = tool.name.replace(/[a-zA-Z0-9]/g, "").slice(0, 1) || tool.name.slice(0, 1).toUpperCase();
        const color = catMap.get(tool.category).color;
        const fallback = faviconFallback(tool.domain);
        return `
          <div class="cloud-logo" title="${escapeHtml(tool.name)}" style="background:${color}1a;border-color:${color}40">
            <span class="cloud-initial" style="color:${color}">${escapeHtml(initial)}</span>
            <img src="${favicon(tool.domain)}" alt="" loading="lazy" referrerpolicy="no-referrer" data-f="g"
              onload="if(this.previousElementSibling)this.previousElementSibling.style.display=&quot;none&quot;"
              onerror="${fallback}">
          </div>
        `;
      })
      .join("");
    refreshIcons();
  }

  function renderCategories() {
    const counts = countByCategory();
    const rows = CATEGORIES.map((cat) => {
      const active = state.category === cat.key ? " active" : "";
      const color = cat.color;
      return `
        <button class="cat-btn${active}" data-cat="${cat.key}" aria-pressed="${active ? "true" : "false"}">
          <span class="cat-icon" style="background:${color}1f;color:${color}">
            <i data-lucide="${cat.icon}"></i>
          </span>
          <span>${cat.label}</span>
          <span class="cat-count">${counts.get(cat.key) || 0}</span>
        </button>
      `;
    }).join("");

    const allCount = TOOLS.length;
    const allActive = state.category === "all" ? " active" : "";
    els.catList.innerHTML = `
      <button class="cat-btn${allActive}" data-cat="all" aria-pressed="${allActive ? "true" : "false"}">
        <span class="cat-icon" style="background:#2563eb1f;color:#2563eb">
          <i data-lucide="layout-grid"></i>
        </span>
        <span>全部应用</span>
        <span class="cat-count">${allCount}</span>
      </button>
      ${rows}
    `;
    refreshIcons();
  }

  function renderTools() {
    const list = getFilteredTools();
    els.resultSummary.textContent = `共 ${list.length} 款应用`;

    if (!list.length) {
      els.toolsGrid.innerHTML = "";
      els.emptyState.hidden = false;
      refreshIcons();
      return;
    }

    els.emptyState.hidden = true;
    els.toolsGrid.innerHTML = list.map(toolCard).join("");
    updateFavsUI();
    refreshIcons();
  }

  function getFilteredTools() {
    let list = TOOLS.filter((tool) => {
      if (state.category !== "all" && tool.category !== state.category) return false;
      if (state.favsOnly && !state.favorites.has(tool.id)) return false;
      if (state.freeOnly && !["免费", "免费额度", "开源"].includes(tool.pricing)) return false;
      if (state.query) {
        const hay = `${tool.name} ${tool.desc} ${tool.tags.join(" ")} ${catMap.get(tool.category).label}`.toLowerCase();
        if (!hay.includes(state.query)) return false;
      }
      return true;
    });

    switch (state.sort) {
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "favs":
        list = [...list].sort((a, b) => b.favs - a.favs);
        break;
      case "newest":
        list = [...list].sort((a, b) => b.added.localeCompare(a.added));
        break;
      default:
        list = [...list].sort((a, b) => {
          if (a.featured !== b.featured) return a.featured ? -1 : 1;
          return b.favs - a.favs;
        });
    }
    return list;
  }

  function toolCard(tool) {
    const cat = catMap.get(tool.category);
    const initial = tool.name.replace(/[a-zA-Z0-9]/g, "").slice(0, 1) || tool.name.slice(0, 1).toUpperCase();
    const fallback = faviconFallback(tool.domain);
    return `
      <article class="tool-card" data-id="${tool.id}" tabindex="0" role="button"
        aria-label="查看 ${escapeHtml(tool.name)} 详情">
        <div class="card-top">
          <div class="tool-logo" style="background:linear-gradient(135deg, ${cat.color}, ${shadeColor(cat.color, -18)})">
            <span>${escapeHtml(initial)}</span>
            <img src="${favicon(tool.domain)}" alt="" loading="lazy" referrerpolicy="no-referrer" data-f="g"
              onload="if(this.previousElementSibling)this.previousElementSibling.style.display=&quot;none&quot;"
              onerror="${fallback}">
          </div>
          <div class="card-title">
            <h3>${escapeHtml(tool.name)}</h3>
            <span class="domain">${escapeHtml(tool.domain)}</span>
          </div>
          <button class="fav-btn" data-id="${tool.id}" aria-label="收藏 ${escapeHtml(tool.name)}">
            <i data-lucide="heart"></i>
          </button>
        </div>
        <p class="tool-desc">${escapeHtml(tool.desc)}</p>
        <div class="tool-tags">
          ${tool.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="card-foot">
          <span class="rating"><i data-lucide="star"></i>${tool.rating.toFixed(1)}</span>
          <span class="pricing">${escapeHtml(tool.pricing)}</span>
          <a class="visit-btn" href="${tool.url}" data-url="${tool.url}" target="_blank" rel="noopener">
            访问<i data-lucide="arrow-up-right"></i>
          </a>
        </div>
      </article>
    `;
  }

  function openToolModal(id) {
    const tool = TOOLS.find((t) => t.id === id);
    if (!tool) return;
    activeToolId = id;
    const cat = catMap.get(tool.category);
    const initial = tool.name.replace(/[a-zA-Z0-9]/g, "").slice(0, 1) || tool.name.slice(0, 1).toUpperCase();
    const isFav = state.favorites.has(id);
    const fallback = faviconFallback(tool.domain);

    els.modalHead.innerHTML = `
      <div class="modal-logo" style="background:linear-gradient(135deg, ${cat.color}, ${shadeColor(cat.color, -18)})">
        <span>${escapeHtml(initial)}</span>
        <img src="${favicon(tool.domain)}" alt="" referrerpolicy="no-referrer" data-f="g"
          onload="if(this.previousElementSibling)this.previousElementSibling.style.display=&quot;none&quot;"
          onerror="${fallback}">
      </div>
      <div>
        <h3>${escapeHtml(tool.name)}</h3>
        <div class="modal-title-meta">
          <span class="pricing">${escapeHtml(tool.pricing)}</span>
          <a class="domain-link" href="${tool.url}" target="_blank" rel="noopener">${escapeHtml(tool.domain)}</a>
        </div>
      </div>
    `;

    els.modalBody.innerHTML = `
      <p>${escapeHtml(tool.desc)}</p>
      <div class="modal-info-grid">
        <div class="info-cell">
          <span>分类</span>
          <b>${cat.label}</b>
        </div>
        <div class="info-cell">
          <span>评分</span>
          <b>${tool.rating.toFixed(1)} / 5.0</b>
        </div>
        <div class="info-cell">
          <span>收藏数</span>
          <b>${formatCount(tool.favs)}</b>
        </div>
        <div class="info-cell">
          <span>支持平台</span>
          <b>${escapeHtml(tool.platforms.join(" · "))}</b>
        </div>
      </div>
      <div class="modal-tags">
        ${tool.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
      </div>
    `;

    els.modalFoot.innerHTML = `
      <button class="fav-btn ${isFav ? "active" : ""}" data-id="${id}" aria-label="收藏 ${escapeHtml(tool.name)}">
        <i data-lucide="${isFav ? "heart" : "heart"}"></i>
      </button>
      <a class="primary-btn" href="${tool.url}" target="_blank" rel="noopener">
        <i data-lucide="external-link"></i>
        <span>访问官网</span>
      </a>
    `;

    els.toolModal.hidden = false;
    document.body.style.overflow = "hidden";
    refreshIcons();

    els.modalFoot.querySelector(".fav-btn").addEventListener("click", (e) => {
      toggleFavorite(id, e.currentTarget);
    });
  }

  function closeToolModal() {
    els.toolModal.hidden = true;
    document.body.style.overflow = "";
    activeToolId = null;
  }

  function closeSubmitModal() {
    els.submitModal.hidden = true;
    document.body.style.overflow = "";
  }

  function toggleFavorite(id, btn) {
    let changed = false;
    if (state.favorites.has(id)) {
      state.favorites.delete(id);
      changed = false;
      showToast("已取消收藏");
    } else {
      state.favorites.add(id);
      changed = true;
      showToast("已加入收藏");
    }
    saveFavorites();
    if (btn) btn.classList.toggle("active", changed);
    els.favCount.textContent = state.favorites.size;
    if (state.favsOnly) renderTools();
  }

  function updateFavsUI() {
    document.querySelectorAll(".tool-card .fav-btn").forEach((btn) => {
      const isFav = state.favorites.has(btn.dataset.id);
      btn.classList.toggle("active", isFav);
    });
    els.favCount.textContent = state.favorites.size;
  }

  function countByCategory() {
    const map = new Map();
    TOOLS.forEach((tool) => map.set(tool.category, (map.get(tool.category) || 0) + 1));
    return map;
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    els.themeIcon.setAttribute("data-lucide", theme === "dark" ? "sun" : "moon");
    refreshIcons();
  }

  function loadTheme() {
    const saved = localStorage.getItem("ai-nav-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function loadFavorites() {
    try {
      return new Set(JSON.parse(localStorage.getItem("ai-nav-favs") || "[]"));
    } catch {
      return new Set();
    }
  }

  function saveFavorites() {
    localStorage.setItem("ai-nav-favs", JSON.stringify([...state.favorites]));
  }

  function favicon(domain) {
    return `https://icon.horse/icon/${encodeURIComponent(domain)}`;
  }

  function faviconFallback(domain) {
    const unavatar = `https://unavatar.io/${encodeURIComponent(domain)}`;
    return `if(this.dataset.f==&quot;g&quot;){this.dataset.f=&quot;d&quot;;this.src=&quot;${unavatar}&quot;}else{this.remove()}`;
  }

  function formatCount(n) {
    if (n >= 10000) return (n / 10000).toFixed(1).replace(/\.0$/, "") + " 万";
    return String(n);
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.hidden = false;
    toastTimer = setTimeout(() => {
      els.toast.hidden = true;
    }, 2200);
  }

  function shadeColor(hex, percent) {
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const r = Math.min(255, Math.max(0, (num >> 16) + amt));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amt));
    const b = Math.min(255, Math.max(0, (num & 0xff) + amt));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
})();
