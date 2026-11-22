// Programmatically press and latch the "O" button after load
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("O");
  if (!input) return;

  // Toggle class to mirror :active css, keep button pressed, then release
  setTimeout(() => input.classList.add("is-active"), 2000);
  setTimeout(() => { input.checked = true; }, 2500);
  setTimeout(() => input.classList.remove("is-active"), 2550);
});
