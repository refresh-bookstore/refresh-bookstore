function renderHeader() {
  const header = document.querySelector("header");

  header.classList.add("text-center");
  header.classList.add("text-white");
  header.innerHTML = `<!-- Copyright -->
    <div>
    </div>
    <!-- Copyright -->`;
}

export { renderHeader };
