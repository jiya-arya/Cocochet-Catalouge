// ============================================================
// COCOCHET — CATALOGUE + CART + CHECKOUT + WHATSAPP
// ============================================================

(function () {

  // ==========================================================
  // ELEMENTS
  // ==========================================================

  const navEl = document.getElementById("categoryNav");
  const gridEl = document.getElementById("productGrid");
  const headingEl = document.getElementById("categoryHeading");
  const countEl = document.getElementById("resultsCount");
  const emptyEl = document.getElementById("emptyState");
  const orderSectionEl = document.getElementById("orderSection");


  // ==========================================================
  // PRODUCTS
  // ==========================================================

  const list = Array.isArray(window.PRODUCTS)
    ? window.PRODUCTS
    : [];


  // ==========================================================
  // CART
  // ==========================================================

  let cart = [];


  // ==========================================================
  // CATEGORIES
  // ==========================================================

  const categories = [];

  list.forEach((product) => {

    if (
      product.category &&
      !categories.includes(product.category)
    ) {
      categories.push(product.category);
    }

  });


  let activeCategory = "All";


  // ==========================================================
  // CATEGORY NAVIGATION
  // ==========================================================

  function renderNav() {

    const allCategories = [
      "All",
      ...categories
    ];

    navEl.innerHTML = allCategories
      .map(
        (category) => `
          <button
            class="chip${category === activeCategory ? " active" : ""}"
            data-category="${escapeHtml(category)}">

            ${escapeHtml(category)}

          </button>
        `
      )
      .join("");

  }


  // ==========================================================
  // RENDER PRODUCT GRID
  // ==========================================================

  function renderGrid() {

    const items = (
      activeCategory === "All"
        ? list
        : list.filter(
          (product) =>
            product.category === activeCategory
        )
    )
      .slice()
      .sort(
        (a, b) =>
          Number(a.price) - Number(b.price)
      );


    headingEl.textContent =
      activeCategory === "All"
        ? "All items"
        : activeCategory;


    countEl.textContent =
      items.length +
      (
        items.length === 1
          ? " item"
          : " items"
      );


    if (items.length === 0) {

      gridEl.innerHTML = "";

      emptyEl.hidden = false;

      return;

    }


    emptyEl.hidden = true;


    gridEl.innerHTML = items
      .map((product) => {

        const productIndex =
          list.indexOf(product);


        return `

          <article
            class="card ${escapeHtml(product.className || "")}"
            style="--product-image: url('${escapeHtml(product.image)}');">

            <div class="card-image">

              <img
                src="${escapeHtml(product.image)}"
                alt="${escapeHtml(product.name)}"
                loading="lazy"

                onerror="
                  this.closest('.card-image').style.background='#F3ECDF';
                  this.remove();
                "
              >

            </div>


            <div class="card-body">

              <div class="card-info">

                <span class="card-name">
                  ${escapeHtml(product.name)}
                </span>

                <span class="card-category">
                  ${escapeHtml(product.category || "")}
                </span>

              </div>


              <div class="card-bottom">

                <span class="card-price">
                  ${formatPrice(product.price)}
                </span>


                <button
                  type="button"
                  class="add-button"
                  data-product-index="${productIndex}"
                  aria-label="Add ${escapeHtml(product.name)}">

                  +

                </button>

              </div>

            </div>

          </article>

        `;

      })
      .join("");

  }


  // ==========================================================
  // ADD TO CART
  // ==========================================================

  function addToCart(productIndex) {

    const product = list[productIndex];

    if (!product) {
      return;
    }


    const existingItem = cart.find(
      (item) =>
        item.productIndex === productIndex
    );


    if (existingItem) {

      existingItem.quantity += 1;

    } else {

      cart.push({
        productIndex: productIndex,
        quantity: 1
      });

    }


    renderOrderSection();

    renderStickyCart();

  }


  // ==========================================================
  // CHANGE QUANTITY
  // ==========================================================

  function changeQuantity(
    productIndex,
    change
  ) {

    const item = cart.find(
      (cartItem) =>
        cartItem.productIndex === productIndex
    );


    if (!item) {
      return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

      cart = cart.filter(
        (cartItem) =>
          cartItem.productIndex !== productIndex
      );

    }


    renderOrderSection();

    renderStickyCart();

  }


  // ==========================================================
  // CART TOTAL
  // ==========================================================

  function getCartTotal() {

    return cart.reduce(
      (total, item) => {

        const product =
          list[item.productIndex];


        if (!product) {
          return total;
        }


        return (
          total +
          Number(product.price) *
          item.quantity
        );

      },
      0
    );

  }


  // ==========================================================
  // TOTAL ITEMS
  // ==========================================================

  function getTotalItems() {

    return cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  }


  // ==========================================================
  // STICKY CART
  // ==========================================================

  function renderStickyCart() {

    let stickyCart =
      document.getElementById("stickyCart");


    if (!stickyCart) {

      stickyCart =
        document.createElement("button");

      stickyCart.type = "button";

      stickyCart.id = "stickyCart";

      stickyCart.className = "sticky-cart";

      document.body.appendChild(stickyCart);

    }


    const totalItems =
      getTotalItems();


    const total =
      getCartTotal();


    if (totalItems === 0) {

      stickyCart.classList.remove("show");

      return;

    }


    stickyCart.innerHTML = `

      <span class="sticky-cart-left">

        <span class="sticky-cart-icon">
          🛒
        </span>

        <span>
          ${totalItems}
          ${totalItems === 1 ? "item" : "items"}
        </span>

      </span>


      <span class="sticky-cart-middle">
        ${formatPrice(total)}
      </span>


      <span class="sticky-cart-right">
        View order →
      </span>

    `;


    stickyCart.classList.add("show");

  }


  // ==========================================================
  // OPEN ORDER SECTION
  // ==========================================================

  function openOrderSection() {

    if (!orderSectionEl) {
      return;
    }


    orderSectionEl.hidden = false;


    orderSectionEl.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }


  // ==========================================================
  // RENDER ORDER SECTION
  // ==========================================================

  function renderOrderSection() {

    if (!orderSectionEl) {
      return;
    }


    if (cart.length === 0) {

      orderSectionEl.hidden = true;

      orderSectionEl.innerHTML = "";

      return;

    }


    orderSectionEl.hidden = false;


    const total =
      getCartTotal();


    const totalItems =
      getTotalItems();


    const itemsHtml = cart
      .map((item) => {

        const product =
          list[item.productIndex];


        if (!product) {
          return "";
        }


        const itemTotal =
          Number(product.price) *
          item.quantity;


        return `

          <div class="order-item">

            <div class="order-item-info">

              <span class="order-item-name">
                ${escapeHtml(product.name)}
              </span>

              <span class="order-item-price">
                ${formatPrice(item.price || product.price)}
                × ${item.quantity}
                = ${formatPrice(itemTotal)}
              </span>

            </div>


            <div class="quantity-controls">

              <button
                type="button"
                class="quantity-button"
                data-action="decrease"
                data-product-index="${item.productIndex}"
                aria-label="Decrease quantity">

                −

              </button>


              <span class="quantity-number">
                ${item.quantity}
              </span>


              <button
                type="button"
                class="quantity-button"
                data-action="increase"
                data-product-index="${item.productIndex}"
                aria-label="Increase quantity">

                +

              </button>

            </div>

          </div>

        `;

      })
      .join("");


    orderSectionEl.innerHTML = `

      <div class="order-box">

        <div class="order-header">

          <div>

            <h2>
              Your Order
            </h2>

            <p>
              ${totalItems}
              ${totalItems === 1 ? "item" : "items"}
            </p>

          </div>


          <button
            type="button"
            class="clear-order-button"
            id="clearOrderButton">

            Clear

          </button>

        </div>


        <div class="order-items">

          ${itemsHtml}

        </div>


        <div class="order-total">

          <span>
            Total
          </span>

          <strong>
            ${formatPrice(total)}
          </strong>

        </div>


        <button
          type="button"
          class="done-button"
          id="doneButton">

          Done

        </button>


      </div>

    `;

  }

  // ==========================================================
  // CHECKOUT FORM
  // ==========================================================

  function renderCheckoutForm() {

    const existing =
      document.getElementById("checkoutBox");

    if (existing) {
      existing.remove();
    }

    const checkoutBox =
      document.createElement("div");

    checkoutBox.id = "checkoutBox";
    checkoutBox.className = "checkout-box";

    const today =
      getTodayDate();

    checkoutBox.innerHTML = `

      <div class="checkout-header">
        <h2>Order Details</h2>
        <p>Please fill in your details to place the order.</p>
      </div>

      <form id="checkoutForm">

        <div class="form-group">
          <label for="customerName">Name</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            placeholder="Enter your name"
            autocomplete="name"
            required
          >
        </div>

        <div class="form-group">
          <label for="customerWhatsapp">WhatsApp Number</label>
          <input
            type="tel"
            id="customerWhatsapp"
            name="customerWhatsapp"
            placeholder="Enter your WhatsApp number"
            inputmode="numeric"
            autocomplete="tel"
            required
          >
        </div>

        <div class="form-group">
          <label for="deliveryMethod">Delivery Option</label>
          <select id="deliveryMethod" name="deliveryMethod" required>
            <option value="Rapido / Parcel Delivery">Rapido / Parcel Delivery (Charges extra as per location)</option>
            <option value="Self Pickup">Self Pickup (Free)</option>
          </select>
        </div>

        <div class="form-group" id="addressGroup">
          <label for="customerAddress">Delivery Address</label>
          <textarea
            id="customerAddress"
            name="customerAddress"
            rows="2"
            placeholder="House/Flat no., Sector/Area, Landmark, City (e.g., Zirakpur, Mohali)"
            autocomplete="street-address"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="neededBy">Needed by</label>
          <input
            type="date"
            id="neededBy"
            name="neededBy"
            min="${today}"
            required
          >
        </div>

        <div class="form-group">
          <label for="customisation">
            Customisation <span>(optional)</span>
          </label>
          <textarea
            id="customisation"
            name="customisation"
            rows="4"
            placeholder="Any colour, size, name or other request?"
          ></textarea>
        </div>

        <div class="checkout-total">
          <span>Order Total</span>
          <strong>${formatPrice(getCartTotal())}</strong>
        </div>

        <p id="deliveryNote" style="font-size: 0.82rem; opacity: 0.8; margin-top: -6px; margin-bottom: 14px;">
          *Rapido / parcel delivery charges are extra as per actual location fare (shared on WhatsApp).
        </p>

        <div class="checkout-actions">
          <button type="button" class="back-button" id="backToOrderButton">
            Back
          </button>
          <button type="submit" class="whatsapp-button">
            Continue to WhatsApp ↗
          </button>
        </div>

      </form>
    `;

    orderSectionEl.appendChild(checkoutBox);

    checkoutBox.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    setupCheckoutEvents();
  }


  // ==========================================================
  // CHECKOUT EVENTS
  // ==========================================================

  function setupCheckoutEvents() {

    const form =
      document.getElementById("checkoutForm");

    const backButton =
      document.getElementById("backToOrderButton");

    const deliverySelect =
      document.getElementById("deliveryMethod");

    const addressGroup =
      document.getElementById("addressGroup");

    const addressInput =
      document.getElementById("customerAddress");

    const deliveryNote =
      document.getElementById("deliveryNote");

    if (deliverySelect && addressGroup && addressInput) {
      deliverySelect.addEventListener("change", () => {
        if (deliverySelect.value === "Self Pickup") {
          addressGroup.hidden = true;
          addressInput.required = false;
          addressInput.value = "";
          if (deliveryNote) {
            deliveryNote.textContent = "*Self pickup location will be shared on WhatsApp.";
          }
        } else {
          addressGroup.hidden = false;
          addressInput.required = true;
          if (deliveryNote) {
            deliveryNote.textContent = "*Rapido / parcel delivery charges are extra as per actual location fare (shared on WhatsApp).";
          }
        }
      });
    }

    if (backButton) {
      backButton.addEventListener(
        "click",
        () => {
          const checkoutBox =
            document.getElementById("checkoutBox");

          if (checkoutBox) {
            checkoutBox.remove();
          }

          openOrderSection();
        }
      );
    }

    if (form) {
      form.addEventListener(
        "submit",
        (event) => {
          event.preventDefault();
          submitOrder(form);
        }
      );
    }
  }


  // ==========================================================
  // SUBMIT ORDER
  // ==========================================================

  function submitOrder(form) {

    if (cart.length === 0) {
      return;
    }

    const formData =
      new FormData(form);

    const customerName =
      String(formData.get("customerName") || "").trim();

    const customerWhatsapp =
      String(formData.get("customerWhatsapp") || "").trim();

    const deliveryMethod =
      String(formData.get("deliveryMethod") || "Rapido / Parcel Delivery").trim();

    const customerAddress =
      String(formData.get("customerAddress") || "").trim();

    const neededBy =
      String(formData.get("neededBy") || "").trim();

    const customisation =
      String(formData.get("customisation") || "").trim();

    const isDelivery =
      deliveryMethod !== "Self Pickup";

    if (
      !customerName ||
      !customerWhatsapp ||
      (isDelivery && !customerAddress) ||
      !neededBy
    ) {
      alert("Please fill all required details.");
      return;
    }

    if (!isValidWhatsapp(customerWhatsapp)) {
      alert("Please enter a valid WhatsApp number.");
      return;
    }

    const today =
      getTodayDate();

    if (neededBy < today) {
      alert("Please select today or a future date.");
      return;
    }

    const now =
      new Date();

    const receivedDate =
      formatDateTime(now);

    const neededByFormatted =
      formatDate(neededBy);

    const orderLines =
      cart
        .map((item) => {
          const product = list[item.productIndex];
          if (!product) {
            return "";
          }
          const itemTotal = Number(product.price) * item.quantity;
          return (
            "• " +
            product.name +
            " × " +
            item.quantity +
            " — " +
            formatPrice(itemTotal)
          );
        })
        .filter(Boolean)
        .join("\n");

    const total =
      getCartTotal();

    const addressLine = isDelivery
      ? "Address: " + customerAddress + "\n"
      : "";

    const totalNote = isDelivery
      ? " (+ Rapido/parcel charges as per location)"
      : " (Self Pickup)";

    let message =
      " *COCOCHET — NEW ORDER*\n\n" +
      "*Order received:* " + receivedDate + "\n" +
      "*Needed by:* " + neededByFormatted + "\n\n" +
      "*Customer details*\n" +
      "Name: " + customerName + "\n" +
      "WhatsApp: " + customerWhatsapp + "\n" +
      "Delivery: " + deliveryMethod + "\n" +
      addressLine + "\n" +
      "*Order*\n" +
      orderLines + "\n\n" +
      "*Total: " + formatPrice(total) + "*" + totalNote;

    if (customisation) {
      message +=
        "\n\n*Customisation / Message*\n" +
        customisation;
    }

    message += "\n\nThank you! ❤️";

    const whatsappNumber = "916280969844";

    const whatsappUrl =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(message);

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );

    showOrderReceived(
      customerName,
      deliveryMethod,
      customerAddress,
      neededByFormatted,
      receivedDate,
      total
    );
  }


  // ==========================================================
  // ORDER RECEIVED MESSAGE
  // ==========================================================

  function showOrderReceived(
    customerName,
    deliveryMethod,
    customerAddress,
    neededBy,
    receivedDate,
    total
  ) {

    const isDelivery =
      deliveryMethod !== "Self Pickup";

    const addressReceiptRow = isDelivery
      ? `
          <div>
            <span>Address</span>
            <strong>${escapeHtml(customerAddress)}</strong>
          </div>
        `
      : "";

    orderSectionEl.innerHTML = `

      <div class="order-box success-box">

        <div class="success-icon">✓</div>

        <h2>Order ready!</h2>

        <p class="success-main">
          Your order details have been prepared in WhatsApp.
        </p>

        <div class="receipt-summary">

          <div>
            <span>Customer</span>
            <strong>${escapeHtml(customerName)}</strong>
          </div>

          <div>
            <span>Delivery Mode</span>
            <strong>${escapeHtml(deliveryMethod)}</strong>
          </div>

          ${addressReceiptRow}

          <div>
            <span>Order received</span>
            <strong>${escapeHtml(receivedDate)}</strong>
          </div>

          <div>
            <span>Needed by</span>
            <strong>${escapeHtml(neededBy)}</strong>
          </div>

          <div>
            <span>Order Total</span>
            <strong>${formatPrice(total)}${isDelivery ? " (+ Delivery)" : ""}</strong>
          </div>

        </div>

        <p class="whatsapp-note">
          WhatsApp will open with your order receipt.
          Please press <strong>Send</strong> to place the order.
        </p>

        <button type="button" class="done-button" id="newOrderButton">
          Start New Order
        </button>

      </div>
    `;

    orderSectionEl.hidden = false;

    const newOrderButton =
      document.getElementById("newOrderButton");

    if (newOrderButton) {
      newOrderButton.addEventListener(
        "click",
        () => {
          cart = [];
          renderOrderSection();
          renderStickyCart();
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
      );
    }

    orderSectionEl.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  // ==========================================================
  // PRODUCT GRID EVENTS
  // ==========================================================

  gridEl.addEventListener(
    "click",
    (event) => {

      const addButton =
        event.target.closest(".add-button");


      if (!addButton) {
        return;
      }


      const productIndex =
        Number(
          addButton.dataset.productIndex
        );


      addToCart(productIndex);

    }
  );


  // ==========================================================
  // ORDER SECTION EVENTS
  // ==========================================================

  orderSectionEl.addEventListener(
    "click",
    (event) => {


      const quantityButton =
        event.target.closest(
          ".quantity-button"
        );


      if (quantityButton) {

        const productIndex =
          Number(
            quantityButton.dataset.productIndex
          );


        const action =
          quantityButton.dataset.action;


        if (action === "increase") {

          changeQuantity(
            productIndex,
            1
          );

        }


        if (action === "decrease") {

          changeQuantity(
            productIndex,
            -1
          );

        }


        return;

      }


      const clearButton =
        event.target.closest(
          "#clearOrderButton"
        );


      if (clearButton) {

        cart = [];

        renderOrderSection();

        renderStickyCart();

        return;

      }


      const doneButton =
        event.target.closest(
          "#doneButton"
        );


      if (doneButton) {

        renderCheckoutForm();

      }

    }
  );


  // ==========================================================
  // STICKY CART EVENT
  // ==========================================================

  document.addEventListener(
    "click",
    (event) => {

      const stickyCart =
        event.target.closest("#stickyCart");


      if (!stickyCart) {
        return;
      }


      openOrderSection();

    }
  );


  // ==========================================================
  // CATEGORY EVENTS
  // ==========================================================

  navEl.addEventListener(
    "click",
    (event) => {

      const button =
        event.target.closest(".chip");


      if (!button) {
        return;
      }


      activeCategory =
        button.dataset.category;


      renderNav();

      renderGrid();


      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


  // ==========================================================
  // DATE HELPERS
  // ==========================================================

  function getTodayDate() {

    const now =
      new Date();


    const year =
      now.getFullYear();


    const month =
      String(
        now.getMonth() + 1
      ).padStart(2, "0");


    const day =
      String(
        now.getDate()
      ).padStart(2, "0");


    return (
      year +
      "-" +
      month +
      "-" +
      day
    );

  }


  function formatDate(dateString) {

    const parts =
      dateString.split("-");


    if (parts.length !== 3) {
      return dateString;
    }


    const year =
      parts[0];


    const month =
      Number(parts[1]);


    const day =
      Number(parts[2]);


    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];


    return (
      day +
      " " +
      monthNames[month - 1] +
      " " +
      year
    );

  }


  function formatDateTime(date) {

    const datePart =
      date.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }
      );


    const timePart =
      date.toLocaleTimeString(
        "en-IN",
        {
          hour: "2-digit",
          minute: "2-digit"
        }
      );


    return (
      datePart +
      " at " +
      timePart
    );

  }


  // ==========================================================
  // WHATSAPP VALIDATION
  // ==========================================================

  function isValidWhatsapp(number) {

    const digits =
      number.replace(/\D/g, "");


    return digits.length >= 10 &&
      digits.length <= 15;

  }


  // ==========================================================
  // FORMAT PRICE
  // ==========================================================

  function formatPrice(price) {

    const number =
      Number(price);


    if (Number.isNaN(number)) {
      return price;
    }


    return (
      "\u20B9" +
      number.toLocaleString("en-IN")
    );

  }


  // ==========================================================
  // ESCAPE HTML
  // ==========================================================

  function escapeHtml(value) {

    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  renderNav();

  renderGrid();

  renderOrderSection();

  renderStickyCart();

})();