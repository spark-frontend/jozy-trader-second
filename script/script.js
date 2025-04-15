const header = document.querySelector(".header");
const nav = document.querySelector(".header-nav");
const menu = document.querySelector(".header-menu-btn");

function toggleMenu() {
  header.classList.toggle("open");
  document.body.classList.toggle("open");
}

function toggleExpansion() {
  const bottom = this.children[1];

  if (bottom.style.maxHeight) {
    bottom.style.maxHeight = null;
  } else {
    bottom.style.maxHeight = bottom.scrollHeight + "px";
  }

  this.classList.toggle("expanded");
}

menu.addEventListener("click", toggleMenu);
nav.addEventListener("click", () => {
  if (header.classList.contains("open")) {
    toggleMenu();
  }
});
