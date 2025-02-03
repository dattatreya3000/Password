const passwordInput = document.querySelector(".password-input");
const copyBtn = document.querySelector(".copy-btn");
const slider = document.querySelector(".slider");
const lengthDisplay = document.querySelector(".length-display");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const clipboardAlert = document.querySelector(".clipboard-alert");
const optionsAlert = document.querySelector(".options-alert");

function generatePassword() {
  const length = parseInt(slider.value);
  const numbers = "0123456789";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const punctuation = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let chars = "";
  let password = "";

  if (checkboxes[0].checked) chars += numbers;
  if (checkboxes[1].checked) chars += lowercase;
  if (checkboxes[2].checked) chars += uppercase;
  if (checkboxes[3].checked) chars += punctuation;

  if (!chars) {
    optionsAlert.style.display = "block";
    setTimeout(() => (optionsAlert.style.display = "none"), 3000);
    passwordInput.value = "";
    return;
  }

  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  passwordInput.value = password;
}

slider.addEventListener("input", () => {
  lengthDisplay.textContent = slider.value;
  generatePassword();
});

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", generatePassword);
});

copyBtn.addEventListener("click", () => {
  if (passwordInput.value) {
    navigator.clipboard.writeText(passwordInput.value);
    clipboardAlert.style.display = "block";
    setTimeout(() => (clipboardAlert.style.display = "none"), 3000);
  }
});

generatePassword();
