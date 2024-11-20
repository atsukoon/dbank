// import { dbank } from "../declarations/dbank_backend";
import { dbank_backend } from '../declarations/dbank_backend';

window.addEventListener("load", async function() {
  await showCurrentBalance();
});

document.querySelector("form").addEventListener("submit", async function(event) {
  event.preventDefault();
  const button = event.target.querySelector("#submit-btn");
  button.setAttribute("disabled", true);

  const inputAmount = document.getElementById("input-amount").value;
  const withdrawalAmount = document.getElementById("withdrawal-amount").value;

  if (inputAmount.length != 0) {
    await dbank_backend.topUp(parseFloat(inputAmount));
  }
  if (withdrawalAmount.length != 0) {
    await dbank_backend.withdraw(parseFloat(withdrawalAmount));
  }
  await dbank_backend.compound();
  await showCurrentBalance();

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  button.removeAttribute("disabled");
})

async function showCurrentBalance() {
  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
}