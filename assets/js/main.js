// ====== 225 Saint Pauls HOA - Simple Site JS ======

// 1) Mobile nav toggle
(function setupNavToggle() {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });
})();

// 2) Footer year
(function setYear() {
  const yearEl = document.querySelector("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// 3) Announcements data (edit here!)
const ANNOUNCEMENTS = [
  {
    type: "Update",
    title: "Welcome to the new HOA site",
    date: "2025-12-30",
    body: "We’re launching a lightweight website to centralize resident info, documents, and contacts.",
  },
  {
    type: "Reminder",
    title: "Keep common areas clean",
    date: "2025-12-18",
    body: "Please dispose of trash properly and report any issues to management.",
  },
  {
    type: "Notice",
    title: "Next board meeting",
    date: "2026-01-10",
    body: "Board meeting details will be posted on the Documents page once confirmed.",
  },
];

// 4) Render announcements on the homepage only
(function renderAnnouncements() {
  const container = document.querySelector("#announcements");
  if (!container) return;

  // sort newest first
  const sorted = [...ANNOUNCEMENTS].sort((a, b) => new Date(b.date) - new Date(a.date));

  container.innerHTML = sorted.slice(0, 4).map(item => {
    const date = formatDate(item.date);
    return `
      <article class="announce">
        <div class="announce-top">
          <span class="badge">${escapeHtml(item.type)}</span>
          <span class="muted">${escapeHtml(date)}</span>
        </div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.body)}</p>
      </article>
    `;
  }).join("");

  const lastUpdated = document.querySelector("#last-updated");
  if (lastUpdated && sorted[0]) {
    lastUpdated.textContent = formatDate(sorted[0].date);
  }
})();

// Helpers
function formatDate(isoDate) {
  try {
    const d = new Date(isoDate + "T00:00:00");
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return isoDate;
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
