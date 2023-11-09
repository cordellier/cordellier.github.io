import {
  checkInputValue,
  checkIfUserIsYoungerthan12,
  checkIfConditionsValid,
  checkIfCitySelected,
} from "./functions.js";

// Navbar
const x = document.getElementById("myTopnav");
x.addEventListener("click", () => {
  if (x.classList.contains("responsive")) {
    x.classList.remove("responsive");
  } else {
    x.classList.add("responsive");
  }
});

// DOM Elements
const form = document.querySelector("form");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelector(".close");
const modalSuccess = document.getElementById("success-modal");
const closeSuccessModal = document.getElementById("close-success-modal");
const closeBtn = document.getElementById("close-modal-btn");

// Reference to the HTML element
const firstname = document.querySelector("#first");
const lastname = document.querySelector("#last");
const email = document.querySelector("#email");
const birthdate = document.querySelector("#birthdate");
const numberParticipations = document.querySelector("#quantity");
const BtnRadio = document.querySelectorAll("input[name='location']");
const choiceCheckbox = document.querySelector("#checkbox1");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalClose.addEventListener("click", () => {
  modalbg.style.display = "none";
});

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Message error
const message = {
  name: "2 à 20 caractères, pas de chiffres ni de caractères spéciaux, sauf (-)",
  email: "Veuillez renseigner une adresse mail valide.",
  birthdate: "Vous devez avoir plus de 12 ans pour participer",
  numberParticipations: "Veuillez renseigner un nombre entre 0 et 99",
  city: "Merci de sélectionner une ville",
  conditions: `Vous devez accepter les conditions d'utilisation`,
};

// Regex
const regexName = /^([A-Za-z|\s]{2,20})?([-]{0,1})?([A-Za-z|\s]{2,20})$/;
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexnumberParicipations = /^([0-9]{1,2})$/;

//Validate input using an event listener
firstname.addEventListener("input", () =>
  checkInputValue(regexName, firstname, message.name)
);
lastname.addEventListener("input", () =>
  checkInputValue(regexName, lastname, message.name)
);
email.addEventListener("input", () =>
  checkInputValue(regexEmail, email, message, email)
);
birthdate.addEventListener("input", () =>
  checkIfUserIsYoungerthan12(birthdate, message.birthdate)
);
numberParticipations.addEventListener("input", () =>
  checkInputValue(
    regexnumberParicipations,
    numberParticipations,
    message.numberParticipations
  )
);
BtnRadio.forEach((radio) =>
  radio.addEventListener("change", () =>
    checkIfCitySelected(BtnRadio, message.city)
  )
);
choiceCheckbox.addEventListener("input", () =>
  checkIfConditionsValid(choiceCheckbox, message.conditions)
);

// function to validate form

function validate(e) {
  e.preventDefault();

  // Validation of all valid data
  const isFirstnameValid = checkInputValue(regexName, firstname, message.name);
  const isLastnameValid = checkInputValue(regexName, lastname, message.name);
  const isEmailValid = checkInputValue(regexEmail, email, message.email);
  const isAgeValid = checkIfUserIsYoungerthan12(birthdate, message.birthdate);
  const isNumberParticipationsValid = checkInputValue(
    regexnumberParicipations,
    numberParticipations,
    message.numberParticipations
  );
  const isCitySelected = checkIfCitySelected(BtnRadio, message.city);
  const isConditionsValid = checkIfConditionsValid(
    choiceCheckbox,
    message.conditions
  );

  // If each conditions are valid
  if (
    isFirstnameValid &&
    isLastnameValid &&
    isEmailValid &&
    isAgeValid &&
    isNumberParticipationsValid &&
    isCitySelected &&
    isConditionsValid
  ) {
    modalbg.style.display = "none";
    modalSuccess.style.display = "flex";
    form.reset();
  }
}

// "In case of valid conditions, the form is submitted
form.addEventListener("submit", (e) => validate(e));

// Success Modal
closeSuccessModal.addEventListener(
  "click",
  () => (modalSuccess.style.display = "none")
);
closeBtn.addEventListener("click", () => (modalSuccess.style.display = "none"));
