(() => {
  const cartKey = "aurelle-cart-count";
  const cartCount = Number.parseInt(localStorage.getItem(cartKey) || "0", 10) || 0;
  const countElements = document.querySelectorAll("[data-cart-count]");

  const updateCartCount = (count) => {
    countElements.forEach((element) => {
      element.textContent = String(count);
    });
  };

  updateCartCount(cartCount);

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("[data-add-to-bag]").forEach((button) => {
    button.addEventListener("click", () => {
      const currentCount = Number.parseInt(localStorage.getItem(cartKey) || "0", 10) || 0;
      const nextCount = currentCount + 1;
      localStorage.setItem(cartKey, String(nextCount));
      updateCartCount(nextCount);

      const productName = button.dataset.addToBag;
      const message = document.querySelector("[data-cart-message]");
      if (message && productName) {
        message.textContent = `${productName} added to your bag. Your bag now has ${nextCount} ${nextCount === 1 ? "item" : "items"}.`;
      }

      button.setAttribute("aria-label", `${productName} added to bag`);
      window.setTimeout(() => {
        button.setAttribute("aria-label", `Add ${productName} to bag`);
      }, 1500);
    });
  });

  const productColumns = document.querySelectorAll(".product-column");
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((filterButton) => {
        const isSelected = filterButton === button;
        filterButton.classList.toggle("active", isSelected);
        filterButton.setAttribute("aria-pressed", String(isSelected));
      });

      productColumns.forEach((column) => {
        column.hidden = selectedFilter !== "all" && column.dataset.category !== selectedFilter;
      });
    });
  });

  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm instanceof HTMLFormElement) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      const formData = new FormData(contactForm);
      const recipient = "hello@aurelle.example";
      const subject = `[AURELLE] ${formData.get("subject")}`;
      const body = [
        `Name: ${formData.get("name")}`,
        `Email: ${formData.get("email")}`,
        "",
        String(formData.get("message"))
      ].join("\n");
      const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const feedback = document.querySelector("[data-form-feedback]");

      window.location.href = mailto;
      if (feedback) {
        feedback.textContent = `Your email app should open with your message addressed to ${recipient}. You can review it and send it there.`;
      }
    });
  }
})();
