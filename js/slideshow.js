window.slideBoxes_list = null;
window.selected = 0;
let slideWrap = document.getElementById("slideshow-wrapper");
let slideImgs = slideWrap.querySelectorAll("img");
let slideBoxes = document.getElementsByClassName("slideshow-boxes")[0];
slideImgs_length = slideImgs.length;
window.slideImg_width = slideImgs[0].width;
window.locked = false;
async function change_slideBox(value) {
  if (locked) return;

  slideWrap.style.left = -value * slideImg_width + "px";

  slideBoxes_list[selected].firstElementChild.classList.remove(
    "slideshow-box-activate"
  );
  slideBoxes_list[value].firstElementChild.classList.add(
    "slideshow-box-activate"
  );
  selected = value;
  locked = true;
  setTimeout(() => {
    locked = false;
  }, 600);
}

function slideshow_event() {
  for (let i = 0; i < slideImgs.length; i++) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.href = "javascript:void(0)";
    li.value = i;
    li.addEventListener("click", function () {
      change_slideBox(this.value);
    });
    li.appendChild(a);

    slideBoxes.appendChild(li);
  }
  let clonefirstImg = slideWrap.firstElementChild.cloneNode();
  slideWrap.appendChild(clonefirstImg);
  slideBoxes_list = slideBoxes.querySelectorAll("li");
  slideBoxes_list[selected].firstElementChild.classList.add(
    "slideshow-box-activate"
  );
}

async function slide_pre_event() {
  if (selected === 0) {
    slideWrap.style.left = slideImgs_length * -slideImg_width + "px";
    slideWrap.style.transition = "none";
    setTimeout(() => {
      change_slideBox(slideImgs_length - 1);
      slideWrap.style.transition = "0.5s ease";
    }, 0);
  } else {
    change_slideBox(selected - 1);
  }
}

async function slide_next_event() {
  if (selected === slideImgs_length - 1) {
    slideWrap.style.transition = "0.5s ease";
    slideWrap.style.left = slideImgs_length * -slideImg_width + "px";
    setTimeout(async () => {
      slideWrap.style.transition = "none";
      change_slideBox(0);
      locked = true;
    }, 450);
    setTimeout(() => {
      slideWrap.style.transition = "0.5s ease";
      locked = false;
    }, 500);
  } else {
    change_slideBox(selected + 1);
  }
}

function slideshow_arrow_event() {
  var slide_prev = document.getElementById("slideshow-prev");
  var slide_next = document.getElementById("slideshow-next");

  slide_prev.addEventListener("click", function () {
    clearInterval(autoplay);
    slide_pre_event();
    autoplay = setInterval(slide_next_event, 4000);
  });

  slide_next.addEventListener("click", function () {
    clearInterval(autoplay);
    slide_next_event();
    autoplay = setInterval(slide_next_event, 4000);
  });
}

let autoplay = setInterval(slide_next_event, 4000);

slideWrap.addEventListener("mouseenter", () => {
  clearInterval(autoplay);
});

slideWrap.addEventListener("mouseleave", () => {
  clearInterval(autoplay);
  autoplay = setInterval(slide_next_event, 4000);
});
