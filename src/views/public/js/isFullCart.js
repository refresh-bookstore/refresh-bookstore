// 장바구니에 아이템 유무에 따라 이미지 변경
function isFullCart() {
  const cartItems = localStorage.getItem("cart");
  const headerCart = document.querySelector(".header-cart");

  if (cartItems) {
    headerCart.classList.add("full");
  } else {
    headerCart.classList.remove("full");
  }
}

export { isFullCart };
