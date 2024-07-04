class VariantSelector extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("change", this.onVariantChange);
  }

  onVariantChange() {
    const productVariants = JSON.parse(
      this.querySelector("#product_variants").textContent
    );
    const selectedOptions = Array.from(
      this.querySelectorAll("select"),
      (selectEl) => selectEl.value
    ).join(" / ");
    const variant = productVariants.find(
      (variant) => variant.title === selectedOptions
    );
    console.log("Saabbir:", "variant", variant);

    // console.log('Saabbir:', 'selectedOptions', selectedOptions);
    // console.log('Saabbir:', 'variant', variant);

    // Set variant id
    document.querySelector('input[name="id"]').value = variant.id;

    // Update current url with variant id
    window.history.replaceState({}, "", `?variant=${variant.id}`);

    this.updatePriceAndAvailability(variant);
  }

  async updatePriceAndAvailability({ id, available }) {
    // Set variant availability
    const submitBtn = document.querySelector("#submit_btn");
    if (!available) {
      submitBtn.setAttribute("disabled", "disabled");
      submitBtn.textContent = "Sold out";
    } else {
      submitBtn.removeAttribute("disabled");
      submitBtn.textContent = "Add to cart";
    }

    const endpoint = `${this.dataset.url}?variant=${id}&section_id=${this.dataset.section}`;
    const response = await fetch(endpoint);
    const text = await response.text();
    const html = new DOMParser().parseFromString(text, "text/html");
    const newPrice = html.querySelector("#price").innerHTML;
    const newCompareAtPrice = html.querySelector("#compare_at_price").innerHTML;

    if (newPrice && newCompareAtPrice) {
      document.querySelector("#price").innerHTML = newPrice;
      document.querySelector("#compare_at_price").innerHTML = newCompareAtPrice;
    }
  }
}

customElements.define("variant-selector", VariantSelector);
