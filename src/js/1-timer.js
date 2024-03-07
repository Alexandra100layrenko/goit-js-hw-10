import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

document.addEventListener("DOMContentLoaded", () => {
  const dateTimePicker = document.getElementById("datetime-picker");
  const startButton = document.querySelector("[data-start]");
  const timerFields = {
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
  };

  let userSelectedDate;

  flatpickr(dateTimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      const currentDate = new Date();
      if (userSelectedDate < currentDate) {
        iziToast.error({
          title: "Error",
          message: "Please choose a date in the future",
        });
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
      }
    },
  });

  startButton.addEventListener("click", () => {
    startButton.disabled = true;
    dateTimePicker.disabled = true;

    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const timeDifference = userSelectedDate - currentDate;

      if (timeDifference <= 0) {
        clearInterval(intervalId);
        updateTimerFields(0, 0, 0, 0);
        iziToast.success({
          title: "Success",
          message: "Countdown finished!",
        });
      } else {
        const { days, hours, minutes, seconds } = convertMs(timeDifference);
        updateTimerFields(days, hours, minutes, seconds);
      }
    }, 1000);
  });

  function updateTimerFields(days, hours, minutes, seconds) {
    timerFields.days.textContent = addLeadingZero(days);
    timerFields.hours.textContent = addLeadingZero(hours);
    timerFields.minutes.textContent = addLeadingZero(minutes);
    timerFields.seconds.textContent = addLeadingZero(seconds);
  }
});
