function renderHeader() {
  const header = document.querySelector("header");

  header.innerHTML = `
    <div class="header-container">
      <span class="header-logo"></span>
      <span class="header-icons">
        <div class="header-search-box">
          <input class="header-search-input" type="text">
          <span class="header-icon header-search" id="search-icon"> </span>
        </div>
        <span class="header-icon header-cart" id="cart-icon"> </span>
        <span class="header-icon header-user" id="user-icon"> </span>
      </span>
    </div>
    `;
}

export { renderHeader };
