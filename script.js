const lengthSlider = document.querySelector(".pass-length input");
const passwordInput = document.querySelector("#main-input");
const generateBtn = document.querySelector(".generate-btn");
const passLengthNum = document.querySelector("#passNum");
const passIndicator = document.querySelector(".pass-indicator");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!$%&|[](){}:;.,*+-#@<>~",
};

const generatePassword = () => {
  let staticPass = "",
    randomPass = "",
    excludeDublicate = false,
    passLength = lengthSlider.value;

  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-dublicates" && option.id !== "spaces") {
        staticPass += characters[option.id];
      } else if(option.id === "spaces") {
        staticPass += `  ${staticPass}  ` 
      } else {
        excludeDublicate = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++){
    let randomChar = staticPass[Math.floor(Math.random() * staticPass.length)] 
    if (excludeDublicate) {
      !randomPass.includes(randomChar) || randomChar == " " ? randomPass += randomChar : i--;
    } else {
      randomPass += randomChar;
    }
  }
  passwordInput.value = randomPass;
};

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value)
  copyIcon.innerText = "check";
  copyIcon.style.color = "#4285f4";
  setTimeout(() => {
    copyIcon.innerText = "copy_all";
    copyIcon.style.color = "#848282"
  },1500)
};

const updatepassIndicator = () => {
  passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : lengthSlider.value <= 25 ? "medium-strong" : "strong";
};

const updateslider = () => {
  passLengthNum.textContent = lengthSlider.value;
  generatePassword()
  updatepassIndicator()
};

updatepassIndicator()

generateBtn.addEventListener("click", generatePassword);
copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateslider);
