// Cocochet catalogue — reads PRODUCTS from products.js and renders everything.
// Products are automatically displayed in ascending price order.

(function () {
  const navEl = document.getElementById("categoryNav");
  const gridEl = document.getElementById("productGrid");
  const headingEl = document.getElementById("categoryHeading");
  const countEl = document.getElementById("resultsCount");
  const emptyEl = document.getElementById("emptyState");

  const list = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];

  // Build category list in the order categories first appear in products.js
  const categories = [];
  list.forEach((p) => {
    if (p.category && !categories.includes(p.category)) {
      categories.push(p.category);
    }
  });

  let activeCategory = "All";

  function renderNav() {
    const all = ["All", ...categories];

    navEl.innerHTML = all
      .map(
        (cat) =>
          `<button class="chip${cat === activeCategory ? " active" : ""
          }" data-category="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`
      )
      .join("");
  }

  function renderGrid() {
    // Filter products according to selected category
    // Then sort them by price: lowest to highest
    const items = (
      activeCategory === "All"
        ? list
        : list.filter((p) => p.category === activeCategory)
    )
      .slice()
      .sort((a, b) => Number(a.price) - Number(b.price));

    headingEl.textContent =
      activeCategory === "All" ? "All items" : activeCategory;

    countEl.textContent =
      items.length + (items.length === 1 ? " item" : " items");

    if (items.length === 0) {
      gridEl.innerHTML = "";
      emptyEl.hidden = false;
      return;
    }

    emptyEl.hidden = true;

    gridEl.innerHTML = items
      .map(
        (p) => `
        <article class="card">
          <div class="card-image">
            <img 
              src="${escapeHtml(p.image)}" 
              alt="${escapeHtml(p.name)}" 
              loading="lazy" 
              onerror="this.closest('.card-image').style.background='#F3ECDF'; this.remove();"
            >
          </div>

          <div class="card-body">
            <span class="card-name">${escapeHtml(p.name)}</span>

            <span class="card-category">
              ${escapeHtml(p.category || "")}
            </span>

            <span class="card-price">
              ${formatPrice(p.price)}
            </span>
          </div>
        </article>`
      )
      .join("");
  }

  function formatPrice(price) {
    const n = Number(price);

    if (Number.isNaN(n)) {
      return price;
    }

    return "\u20B9" + n.toLocaleString("en-IN");
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  navEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");

    if (!btn) return;

    activeCategory = btn.dataset.category;

    renderNav();
    renderGrid();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Initial render
  renderNav();
  renderGrid();
})();