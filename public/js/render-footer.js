function renderFooter() {
  const footer = document.querySelector("footer");

  footer.innerHTML = `
      <div class="footer-container">
        <div class="footer-upper-area">
          <span class="footer-logo"></span>
        </div>
        <div class="footer-lower-area">
          <p class="copyright">ⓒ 2023 REFRESH BOOKS</p>
        </div>
      </div>
  `;
}

export { renderFooter };
