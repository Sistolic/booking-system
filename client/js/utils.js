function validateInput(input) {
  var regex = /^[a-zA-Z\s]*$/;
  var value = input.value;

  if (!regex.test(value)) {
    alert("Character not accepted");
    input.value = value.replace(/[^a-zA-Z\s]/g, "");
  }
}
function showSection(show = true) {
  const actions = document.querySelector(".actions-container");
  try {
    document.querySelector(".section").style.display = show ? "flex" : "none";

    document.querySelector(".hero-section").style.display = show
      ? "none"
      : "flex";
    actions.style.display = show ? "flex" : "none";
  } catch (error) {
    actions.querySelector(".action-btn.close").style.display = show
      ? "block"
      : "none";
  }
}
function showResponse(message) {
  const showResponse = document.querySelector(".show-response");

  document.querySelector(".message").innerHTML = `<p>${message}</p>`;
  showResponse.style.display = "flex";
}

const emailCheckbox = document.querySelector(".form-item.check>input");
const emailItem = document.querySelector(".form-item.email");

emailCheckbox.addEventListener("change", () => {
  const emailInput = emailItem.querySelector("input");
  if (emailCheckbox.checked) {
    emailItem.style.display = "block";
    emailInput.required = true;
  } else {
    emailItem.style.display = "none";
    emailInput.required = false;
    emailInput.value = "";
  }
});
