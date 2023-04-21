function findAddress() {
  new daum.Postcode({
    oncomplete: function(data) {

      const postalCodeInput = document.getElementById("postalCodeInput");
      const addressInput = document.getElementById("addressInput");
      const detailAddressInput = document.getElementById("detailAddressInput");

      let addr = "";
      let extraAddr = "";

      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === "R") {
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr += extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
      }

      postalCodeInput.value = data.zonecode;
      addressInput.value = `${addr} ${extraAddr}`;
      detailAddressInput.value = "";
      detailAddressInput.focus();
    }
  }).open({ autoClose: true });
}
