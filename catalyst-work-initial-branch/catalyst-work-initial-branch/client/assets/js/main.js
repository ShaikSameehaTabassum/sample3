/*==================== RENDER NAV BAR ====================*/
const nav = document.querySelector(".nav");
fetch("../templates/navBar.html")
  .then((res) => res.text())
  .then((data) => {
    nav.innerHTML = data;
  });

/*==================== RENDER HEADER ====================*/
const header = document.querySelector(".header");
fetch("../templates/header.html")
  .then((res) => res.text())
  .then((data) => {
    header.innerHTML = data;
  });

/*==================== SHOW NAVBAR ====================*/
// const showMenu = (headerToggle, navbarId) =>{
//     const toggleBtn = document.getElementById(headerToggle),
//     nav = document.getElementById(navbarId)

//     // Validate that variables exist
//     if(headerToggle && navbarId){
//         toggleBtn.addEventListener('click', ()=>{
//             // We add the show-menu class to the div tag with the nav__menu class
//             nav.classList.toggle('show-menu')
//             // change icon
//             toggleBtn.classList.toggle('bx-x')
//         })
//     }
// }
// showMenu('header-toggle','navbar')

/*==================== LINK ACTIVE ====================*/
const linkColor = document.querySelectorAll(".nav__link");

function colorLink() {
  linkColor.forEach((l) => {
    console.log(l);
    l.classList.remove("active");
  });
  this.classList.add("active");
}

linkColor.forEach((l) => l.addEventListener("click", colorLink));

/*==================== ANCHOR FUNCTIONS  ====================*/

function run__home() {
    const main = document.querySelector(".main");
  console.log("I am from home");
  fetch("../pages/home.html")
  .then((res) => res.text())
  .then((data) => {
    main.innerHTML = data;
  });
}
window.onload = run__home;
function run__profile() {
    const main = document.querySelector(".main");
  console.log("I am from profile");
  fetch("../pages/profile.html")
  .then((res) => res.text())
  .then((data) => {
    main.innerHTML = data;
  });
}

function run__messages() {
    const main = document.querySelector(".main");
  console.log("I am from message");
  fetch("../pages/message.html")
  .then((res) => res.text())
  .then((data) => {
    main.innerHTML = data;
  });
}

function run__notifications() {
    const main = document.querySelector(".main");
  console.log("I am from notify");
  fetch("../pages/notification.html")
  .then((res) => res.text())
  .then((data) => {
    main.innerHTML = data;
  });
}

function run__explore() {
    const main = document.querySelector(".main");
  console.log("I am from explore");
  fetch("../pages/explore.html")
  .then((res) => res.text())
  .then((data) => {
    main.innerHTML = data;
  });
}

function run__saved() {
    const main = document.querySelector(".main");
  console.log("I am from saved");
  fetch("../pages/saved.html")
  .then((res) => res.text())
  .then((data) => {
    main.innerHTML = data;
  });
}
