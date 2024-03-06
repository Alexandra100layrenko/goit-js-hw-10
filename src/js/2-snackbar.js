import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const delayInput = this.querySelector('[name="delay"]');
    const stateInputs = this.querySelectorAll('[name="state"]');
    const selectedState = [...stateInputs].find(input => input.checked);

    if (!selectedState) {
      return;
    }

    const delay = parseInt(delayInput.value, 10);

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (selectedState.value === "fulfilled") {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });

    promise.then(
      (value) => {
        iziToast.success({
          title: "Fulfilled promise",
          message: `✅ Fulfilled promise in ${value}ms`,
        });
      },
      (reason) => {
        iziToast.error({
          title: "Rejected promise",
          message: `❌ Rejected promise in ${reason}ms`,
        });
      }
    );
  });
});
