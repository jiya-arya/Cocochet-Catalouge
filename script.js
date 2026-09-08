// Cocochet catalogue — reads PRODUCTS from products.js and renders everything.
// Products are automatically displayed in ascending price order.

(function () {

  const navEl = document.getElementById("categoryNav");
  const gridEl = document.getElementById("productGrid");
  const headingEl = document.getElementById("categoryHeading");
  const countEl = document.getElementById("resultsCount");
  const emptyEl = document.getElementById("emptyState");

  const list = Array.isArray(window.PRODUCTS)
    ? window.PRODUCTS
    : [];


  // ===== Build Categories =====
  // Categories appear in the same order
  // as they first appear in products.js

  const categories = [];

  list.forEach((p) => {

    if (
      p.category &&
      !categories.includes(p.category)
    ) {
      categories.push(p.category);
    }

  });


  let activeCategory = "All";


  // ===== Render Category Navigation =====

  function renderNav() {

    const all = ["All", ...categories];

    navEl.innerHTML = all
      .map(
        (cat) =>
          `<button
            class="chip${cat === activeCategory ? " active" : ""}"
            data-category="${escapeHtml(cat)}">
            ${escapeHtml(cat)}
          </button>`
      )
      .join("");

  }


  // ===== Render Products =====

  function renderGrid() {

    // Filter products according to selected category
    // Then sort products from lowest price to highest price

    const items = (
      activeCategory === "All"
        ? list
        : list.filter(
          (p) => p.category === activeCategory
        )
    )
      .slice()
      .sort(
        (a, b) =>
          Number(a.price) - Number(b.price)
      );


    // ===== Category Heading =====

    headingEl.textContent =
      activeCategory === "All"
        ? "All items"
        : activeCategory;


    // ===== Product Count =====

    countEl.textContent =
      items.length +
      (items.length === 1 ? " item" : " items");


    // ===== Empty Category =====

    if (items.length === 0) {

      gridEl.innerHTML = "";

      emptyEl.hidden = false;

      return;

    }


    emptyEl.hidden = true;


    // ===== Create Product Cards =====

    gridEl.innerHTML = items
      .map(
        (p) => `

        <article class="card ${escapeHtml(p.className || "")}">

          <div class="card-image">

            <img
              src="${escapeHtml(p.image)}"
              alt="${escapeHtml(p.name)}"
              loading="lazy"
              onerror="
                this.closest('.card-image').style.background='#F3ECDF';
                this.remove();
              "
            >

          </div>


          <div class="card-body">

            <!-- Product Name -->

            <span class="card-name">
              ${escapeHtml(p.name)}
            </span>


            <!-- Product Category -->

            <span class="card-category">
              ${escapeHtml(p.category || "")}
            </span>


            <!-- Product Price -->

            <span class="card-price">
              ${formatPrice(p.price)}
            </span>

          </div>

        </article>

      `
      )
      .join("");

  }


  // ===== Format Price =====

  function formatPrice(price) {

    const n = Number(price);

    if (Number.isNaN(n)) {
      return price;
    }

    return "\u20B9" + n.toLocaleString("en-IN");

  }


  // ===== Prevent HTML Problems =====

  function escapeHtml(str) {

    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  }


  // ===== Category Button Click =====

  navEl.addEventListener("click", (e) => {

    const btn = e.target.closest(".chip");

    if (!btn) return;


    activeCategory = btn.dataset.category;


    renderNav();
    renderGrid();


    // Scroll back to top when category changes

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


  // ===== Initial Page Load =====

  renderNav();
  renderGrid();

})();