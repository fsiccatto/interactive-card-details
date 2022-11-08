const d = document;
/* CARD DATA (Front & Back) */
const $cardNumber = d.querySelector("#card-number-front");
const $cardName = d.querySelector("#card-name-front");
const $cardMonth = d.querySelector("#card-month-front");
const $cardYear = d.querySelector("#card-year-front");
const $cardCvc = d.querySelector("#card-cvc-back");

/* FORM DATA */
const $name = d.querySelector("#name-card");
const $number = d.querySelector("#number-card");
const $month = d.querySelector("#month-card");
const $year = d.querySelector("#year-card");
const $cvc = d.querySelector("#cvc");
const $btnConfirm = d.querySelector(".confirm-btn");

/* STATE COMPLETE */
const $stateComplete = d.querySelector(".state-form");
const $cardForm = d.querySelector(".card-form");
const $btnContinue = d.querySelector(".continue-btn");

/* CARD FRONT AND  BACK DATA */
const inputName = () => {
  $cardName.innerHTML = $name.value;
  if ($cardName.innerHTML == "") {
    $cardName.innerHTML = $name.placeholder;
  }
};

const inputCardNum = () => {
  let cardNumberInput = $number.value;
  // Formato del numero de la tarjeta
  let formattedCardNumber = cardNumberInput.replace(/[^\d]/g, "");
  formattedCardNumber = formattedCardNumber.substring(0, 16);
  // Separamos los numeros de la tarjeta en grupos de 4 numeros
  let cardNumberSection = formattedCardNumber.match(/\d{1, 4}/g);
  if (cardNumberSection != null) {
    formattedCardNumber = cardNumberSection.join(" ");
  }

  if (cardNumberInput != formattedCardNumber) {
    $number.value = formattedCardNumber;
  }
  $cardNumber.innerHTML = $number.value;
  if ($number.value === "") {
    $cardNumber = $number.placeholder;
  }
};

const inputMM = () => {
  let formattedMM = $month.value;
  formattedMM = formattedMM.substring(0, 2);
  $month.value = formattedMM;
  if ($month.value === "") {
    $cardMonth.innerHTML = "00";
  } else {
    $cardMonth.innerHTML = $month.value;
  }
};

const inputYY = () => {
  let formattedYY = $year.value;
  formattedYY = formattedYY.substring(0, 2);
  $year.value = formattedYY;
  if ($year.value === "") {
    $cardYear.innerHTML = "00";
  } else {
    $cardYear.innerHTML = $year.value;
  }
};

const inputCvc = () => {
  let formattedCvc = $cvc.value;
  formattedCvc = formattedCvc.substring(0, 3);
  $cvc.value = formattedCvc;
  if ($cvc.value === "") {
    $cardCvc.innerHTML = "000";
  } else {
    $cardCvc.innerHTML = $cvc.value;
  }
}

const massValidate = () => {
  const validateName = () => {
    const nameExp = /^[A-Z a-z]+$/;
    const errMsg = d.getElementById("errorName");
    if ($name.value.match(nameExp)) {
      errMsg.textContent = "";
      $name.classList.remove("error");
    } else {
      errMsg.innerHTML = "Please enter cardholder name!";
      $name.classList.add("error");
    }
  }

  const validateNum = () => {
    const errMsg = d.getElementById("errorNumber");
    if ($number.value.length > 0 && $number.value.length < 16) {
      errMsg.innerHTML = "Wrong format!";
      $number.classList.add("error");
    } else if ($number.value == "") {
      errMsg.innerHTML = "Can't be blank!";
      $number.classList.add("error");
    } else {
      errMsg.innerHTML = "";
      $number.classList.remove("error");
    }
  }

  const validateDate = () => {
    const expMonth = /"^(0?[0-9]|1[012])$"/;
    const expYear = /^(0[1-9]|1[2-9])\/?([0-9]{2})$/;
    const errMsg = d.getElementById("errorDate");
  
    if ($month.value.match(expMonth)) {
      errMsg.innerHTML = "";
      $month.classList.remove("error");
      $year.classList.remove("error");
    } else if ($month.value.match(expMonth) && $year.value.match(expYear)) {
      errMsg.innerHTML = "";
      $month.classList.remove("error");
      $year.classList.remove("error");
    } else if ($month.value == "") {
      errMsg.innerHTML = "Can't be blank!";
      $month.classList.add("error");
    } else if ($year.value == "") {
      errMsg.innerHTML = "Can't be blank!";
      $year.classList.add("error");
    } else {
      errMsg.innerHTML = "";
      $month.classList.remove("error");
      $year.classList.remove("error");
    }
  }

  const validateCvc = () => {
    const cvcExp = /^[0-9]{3}$/;
    const errMsg = d.getElementById("errorCvc");

    if ($cvc.value == "") {
      errMsg.innerHTML = "Can't be blank";
      $cvc.classList.add("error");
    } else if ($cvc.value.match(cvcExp)) {
      errMsg.innerHTML = "";
      $cvc.classList.remove("error");
    } else {
      errMsg.innerHTML = "Wrong format!";
      $cvc.classList.add("error");
    }
  }

  validateName();
  validateNum();
  validateDate();
  validateCvc();

  if (
    $cardName.innerHTML == $name.placeholder ||
    $cardNumber.innerHTML == $number.placeholder ||
    $cardMonth.innerHTML == "00" ||
    $cardYear.innerHTML == "00" ||
    $cardCvc.innerHTML == "000" ||
    ($cardNumber.value.length > 0 && $cardNumber.value.length < 16)
  ) {
    return true;
  } else {
    return false;
  }
}

// Button Submit
$btnConfirm.addEventListener("click", (e) => {
  massValidate();
  console.log("BTNNNN")
  if (massValidate() == false) {
    e.preventDefault();
  } else {
    e.preventDefault();

    $cardForm.classList.add("hidden");
    $stateComplete.classList.remove("hidden");
  }
})

$btnContinue.addEventListener("click", (e) => {
  d.location.reload();
  /* e.preventDefault();
  $cardForm.classList.remove("hidden");
  $stateComplete.classList.add("hidden");
  $cardName.innerHTML = $cardName.getAttribute("default");
  $cardNumber.innerHTML = $cardNumber.getAttribute("default");
  $cardMonth.innerHTML = "00";
  $cardYear.innerHTML = "00";
  $cardCvc.innerHTML = "000";
  $cvc.value = "";
  $number.value = "";
  $name.value = "";
  $month.value = "";
  $year.value = "";
  $cvc.value = ""; */
})