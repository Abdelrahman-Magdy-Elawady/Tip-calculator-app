window.onload = () => {
  const delayForErrorMsgs = 2000; //2 sec

  const bill = document.querySelector("#bill");

  const tipInputsParent = document.querySelector("#select-tip");
  const customTnput = document.querySelector("#custom-input");
  const tipInputs = document.querySelectorAll(".tip-btns");

  const numOfPeople = document.querySelector("#people");

  const reset = document.querySelector("#reset");
  const tipForPerson = document.querySelector("#tipForPerson");
  const totalForPerson = document.querySelector("#totalForPerson");
  const form = document.querySelector("#app");
  /*----------------Error Msgs------------------*/
  const billErrMsg = document.querySelector("#bill-errmsg");
  const tipErrmsg = document.querySelector("#tip-errmsg");
  const peopleErrMsg = document.querySelector("#people-errmsg");
  /*---------------Input Values-----------------*/
  let billValue = 0;
  let num_people = 0;
  let tip = 0;
  let tipSelectedFlag = false;
  let billFlag = false;
  let peopleFlag = false;

  /*-------------------Bill----------------------*/

  bill.addEventListener("input", () => {
    billValue = parseFloat(parseFloat(bill.value).toFixed(2));
    billFlag = true;
    /**if user enter number and remove it**/
    if (isNaN(billValue)) {
      invalidBill();
    }
  });

  /*bill.oninvalid = invalidBill;*/
  function invalidBill() {
    console.log(bill.value);
    billValue = 0;
    bill.value = "";
    billFlag = false;
    billErrMsg.style.display = "block";
    setTimeout(() => {
      billErrMsg.style.display = "none";
    }, delayForErrorMsgs);
  }

  /*--------------- Tip -----------------------*/
  tipInputsParent.addEventListener("click", (e) => {
    if (e.target !== customTnput) {
      tipSelectedFlag = true;
      customTnput.value = "";
      tip = parseFloat(e.target.textContent);
      let choosedBtn = e.target;
      choosedBtn.classList.add("choosed");
      tipInputs.forEach((input) => {
        if (input !== choosedBtn) input.classList.remove("choosed");
      });
    }
  });
  customTnput.addEventListener("input", () => {
    tipSelectedFlag = true;
    tip = parseFloat(parseFloat(customTnput.value).toFixed(2));
    tipInputs.forEach((input) => {
      input.classList.remove("choosed");
    });
    /**if user enter number and remove it**/
    if (isNaN(tip)) {
      invalidTip();
    }
  });
  customTnput.oninvalid = invalidTip;
  function invalidTip() {
    console.log(tip);
    customTnput.value = "";
    tipSelectedFlag = false;
    tip = 0;
    tipErrmsg.style.display = "block";
    setTimeout(() => {
      tipErrmsg.style.display = "none";
    }, delayForErrorMsgs);
  }

  /*--------------- people ------------------*/
  numOfPeople.addEventListener("input", () => {
    num_people = parseInt(numOfPeople.value);
    peopleFlag = true;
    if (isNaN(num_people)) {
      invalidPeople();
    }
  });

  numOfPeople.oninvalid = invalidPeople;
  function invalidPeople() {
    num_people = 0;
    numOfPeople.value = "";
    peopleFlag = false;
    peopleErrMsg.style.display = "block";
    setTimeout(() => {
      peopleErrMsg.style.display = "none";
    }, delayForErrorMsgs);
  }
  /*---------------- reset ----------------------------*/
  reset.onclick = () => {
    tipInputs.forEach((btn) => {
      if (btn.classList.contains("choosed")) btn.classList.remove("choosed");
    });
    billValue = 0;
    num_people = 0;
    tip = 0;
    tipForPerson.textContent = "$0.00";
    totalForPerson.textContent = "$0.00";
  };
  /*--------------------------------form Submit-----------------------------------*/

  form.onsubmit = (e) => {
    e.preventDefault();
    //-------------------User don't select a tip

    if (!tipSelectedFlag) {
      invalidTip();
    }
    if (!billFlag) {
      invalidBill();
    }
    if (!peopleFlag) {
      invalidPeople();
    }

    if (tipSelectedFlag && billFlag && peopleFlag) {
      console.log("all");
      let tipforperson = (billValue * tip * 0.01) / num_people;
      tipForPerson.textContent = Number(tipforperson).toFixed(2);
      totalForPerson.textContent = Number(
        billValue / num_people + tipforperson
      ).toFixed(2);
      //--------reset All
      tipSelectedFlag = false;
      peopleFlag = false;
      billFlag = false;
      billValue = 0;
      num_people = 0;
      tip = 0;
      bill.value = "";
      numOfPeople.value = "";
      customTnput.value = "";
    }
  };
};
