window.menuItems = null;
window.last_menu_item_activate = 0;
function change_menu_item_activate(value) {
  menuItems[last_menu_item_activate].classList.remove("menu-item-activate");
  menuItems[value].classList.add("menu-item-activate");
  last_menu_item_activate = value;
}

function nav_event() {
  var nav_info = document.getElementById("menu");
  menuItems = nav_info.querySelectorAll("li");
  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].value = i;
    menuItems[i].addEventListener("click", function () {
      change_menu_item_activate(this.value);
    });
  }
}

// window.onload = function () {
//   nav_event();
// };
