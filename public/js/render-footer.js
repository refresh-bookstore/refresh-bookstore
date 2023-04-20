function renderFooter() {
  const footer = document.querySelector("footer");

  footer.innerHTML = `
      <footer>
      <div class="footer-container">
        <div class="upper-area">
          <span class="logo"></span>
        </div>
        <div class="lower-area">
          <p class="copyright">ⓒ 2023 REFRESH BOOKS</p>
        </div>
      </div>
    </footer>
  `;
}

export { renderFooter };
