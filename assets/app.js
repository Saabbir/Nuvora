void (function () {
  document.body.addEventListener("click", handleBodyClicks);

  function handleBodyClicks(clickEvent) {
    /**
     * Handle header hamburger click
     */
    if (clickEvent.target.closest(".c-header__hamburger")) {
      const nav = document.querySelector(".c-header__nav-main");
      if (nav) {
        nav.classList.toggle("is-visible");
      }
      clickEvent.target
        .closest(".c-header__hamburger")
        .classList.toggle("is-open");
    }

    /**
     * Handle icon search
     */
    if (clickEvent.target.closest(".c-search-container")) {
      // clickEvent.preventDefault();
    }

    /**
     * Handle icon search click
     */
    if (
      clickEvent.target.closest(".c-search-container") &&
      !clickEvent.target.closest(".c-search-form")
    ) {
      clickEvent.target
        .closest(".c-search-container")
        .classList.toggle("is-clicked");
    }
  }
})();
