const animepage = document.getElementById("anime-page");
const modelspage = document.getElementById("models-page");
const modelstitle = document.getElementById("models-title");
const animetitle = document.getElementById("anime-title");

const modalbox = () => {
  const body = document.getElementById("body");

  const modal = document.getElementById("modal-box");

  const ImgCont = document.getElementById("modal-image-container");

  const modalImg = document.getElementById("modal-img");

  const leftbtn = document.getElementById("modal-left-btn");

  const rightbtn = document.getElementById("modal-right-btn");

  const closebtn = document.getElementById("modal-close-btn");

  const animepageA = Array.from(
    document.querySelectorAll("#anime-page>.image")
  );

  const modelspageA = Array.from(
    document.querySelectorAll("#models-page>.image")
  );

  let currentindex;

  for (let image of animepageA) {
    image.addEventListener("click", function () {
      if (modal.classList == "close") {
        modal.classList.replace("close", "open");
        body.classList.add("no-scroll");
        modalImg.src = this.src;
        currentindex = animepageA.indexOf(this);
      }
    });
  }

  for (let image of modelspageA) {
    image.addEventListener("click", function () {
      if (modal.classList == "close") {
        modal.classList.replace("close", "open");
        body.classList.add("no-scroll");
        modalImg.src = this.src;
        currentindex = modelspageA.indexOf(this);
      }
    });
  }

  rightbtn.addEventListener("click", function () {
    if (animepage.classList == "open-grid") {
      if (currentindex < animepageA.length - 1) {
        currentindex = currentindex + 1;
        modalImg.src = animepageA[currentindex].src;
      } else {
        currentindex = 0;
        modalImg.src = animepageA[currentindex].src;
      }
    } else {
      if (currentindex < modelspageA.length - 1) {
        currentindex = currentindex + 1;
        modalImg.src = modelspageA[currentindex].src;
      } else {
        currentindex = 0;
        modalImg.src = modelspageA[currentindex].src;
      }
    }
  });

  leftbtn.addEventListener("click", function () {
    if (animepage.classList == "open-grid") {
      if (currentindex > 0) {
        currentindex = currentindex - 1;
        modalImg.src = animepageA[currentindex].src;
      } else {
        currentindex = animepageA.length - 1;
        modalImg.src = animepageA[currentindex].src;
      }
    } else {
      if (currentindex > 0) {
        currentindex = currentindex - 1;
        modalImg.src = modelspageA[currentindex].src;
      } else {
        currentindex = modelspageA.length - 1;
        modalImg.src = modelspageA[currentindex].src;
      }
    }
  });
  closebtn.addEventListener("click", function () {
    modal.classList.replace("open", "close");
    body.classList.remove("no-scroll");
  });
};
modalbox();

const changepage = () => {
  animepage.classList = "open-grid";
  animetitle.classList = "open-title";
  modelspage.classList = "close";
  modelstitle.classList = "close";

  const change = () => {
    if (modelspage.classList == "close") {
      modelspage.classList.replace("close", "open-grid");
      modelstitle.classList.replace("close", "open-title");

      animepage.classList.replace("open-grid", "close");
      animetitle.classList.replace("open-title", "close");
    } else {
      modelspage.classList.replace("open-grid", "close");
      modelstitle.classList.replace("open-title", "close");

      animepage.classList.replace("close", "open-grid");
      animetitle.classList.replace("close", "open-title");
    }
  };
  const leftbtn = document.getElementsByClassName("left-btn")[0];
  const rightbtn = document.getElementsByClassName("right-btn")[0];

  leftbtn.addEventListener("click", change);
  rightbtn.addEventListener("click", change);
};
changepage();
