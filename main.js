let nav = document.querySelector("nav");
let header = document.querySelector("header");

header.style.zIndex = "3";

window.onscroll = function () {
  if (window.scrollY >= 150) nav.style.backgroundColor = "#181a23";
  else nav.style.backgroundColor = "";
};
