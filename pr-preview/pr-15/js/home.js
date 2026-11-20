// Programmatically press and latch the "O" button after load
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("O");
  if (!input) return;
  const container = input.closest(".initial");
  if (!container) return;

  // Toggle class to mirror :active css, keep button pressed, then release
  setTimeout(() => container.classList.add("is-active"), 2000);
  setTimeout(() => { input.checked = true; }, 2500);
  setTimeout(() => container.classList.remove("is-active"), 2550);
});
