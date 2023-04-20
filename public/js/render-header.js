function renderHeader() {
  const header = document.querySelector("header");

  header.innerHTML = `
    <div class="header-container">
      <span class="logo"></span>
      <span class="icons">
        <div class="search-box">
          <input class="search-input" type="text">
          <span class="icon search" id="search-icon"> </span>
        </div>
        <span class="icon cart" id="cart-icon"> </span>
        <span class="icon user" id="user-icon"> </span>
      </span>
    </div>
    <script src="../../../public/js/header.js"></script>
    `;
}

export { renderHeader };
