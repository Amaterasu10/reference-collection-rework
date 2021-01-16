const animepage = document.getElementById("anime-page");
const modelspage = document.getElementById("models-page");
const modelstitle = document.getElementById("models-title");
const animetitle = document.getElementById("anime-title");

function globalEventListener (type,selector,callback){
  document.addEventListener(type, e=> {
    if(e.target.matches(selector)) callback(e)
  })
}


let modalbox = {
  
  body : document.getElementById("body"),

  modal : document.getElementById("modal-box"),

  ImgCont : document.getElementById("modal-image-container"),

  modalImg : document.getElementById("modal-img"),

  leftbtn : document.getElementById("modal-left-btn"),

  rightbtn : document.getElementById("modal-right-btn"),

  closebtn : document.getElementById("modal-close-btn"),

  animeList : Array.from( document.querySelectorAll("#anime-page>.image") ),
  
  modelsList : Array.from( document.querySelectorAll("#models-page>.image") ),

  currentindex : 0, 


  imageOnClick :
  function() {
    this.animeList.forEach(image =>{
      image.addEventListener("click", function () {
        if (modalbox.modal.classList == "close") {
          modalbox.modal.classList.replace("close", "open");
          modalbox.body.classList.add("no-scroll");
          modalbox.modalImg.src = this.src;
          modalbox.currentindex = modalbox.animeList.indexOf(this);
        }
      })
    })
    
    modalbox.modelsList.forEach(image =>{
      image.addEventListener("click", function () {
        if (modalbox.modal.classList == "close") {
          modalbox.modal.classList.replace("close", "open");
          modalbox.body.classList.add("no-scroll");
          modalbox.modalImg.src = this.src;
          modalbox.currentindex = modalbox.modelsList.indexOf(this);
        }
      })
    })
  },


  modalbtn : 
  function(btn) {
    this.rightbtn.addEventListener("click", function () {
      if (animepage.classList == "open-grid") {
        if (modalbox.currentindex < modalbox.animeList.length - 1) {
          modalbox.currentindex = modalbox.currentindex + 1;
          modalbox.modalImg.src = modalbox.animeList[modalbox.currentindex].src;
        } 
        
        else {
          modalbox.currentindex = 0;
          modalbox.modalImg.src = modalbox.animeList[modalbox.currentindex].src;
        }
      } 
      
      else {
        if (modalbox.currentindex < modalbox.modelsList.length - 1) {
          modalbox.currentindex = modalbox.currentindex + 1;
          modalbox.modalImg.src = modalbox.modelsList[modalbox.currentindex].src;
        } 
        
        else {
          modalbox.currentindex = 0;
          modalbox.modalImg.src = modalbox.modelsList[modalbox.currentindex].src;
        }
      }

    });

    this.leftbtn.addEventListener("click", function () {
      if (animepage.classList == "open-grid") {
        if (modalbox.currentindex > 0) {
          modalbox.currentindex = modalbox.currentindex - 1;
          modalbox.modalImg.src = modalbox.animeList[modalbox.currentindex].src;
        } 
        
        else {
          modalbox.currentindex = modalbox.animeList.length - 1;
          modalbox.modalImg.src = modalbox.animeList[modalbox.currentindex].src;
        }
      } 
      
      else {
        if (modalbox.currentindex > 0) {
          modalbox.currentindex = modalbox.currentindex - 1;
          modalbox.modalImg.src = modalbox.modelsList[modalbox.currentindex].src;
        } 
        
        else {
          modalbox.currentindex = modalbox.modelsList.length - 1;
          modalbox.modalImg.src = modalbox.modelsList[modalbox.currentindex].src;
        }
      }

    });

    this.closebtn.addEventListener("click", function () {
      modalbox.modal.classList.replace("open", "close");
      modalbox.body.classList.remove("no-scroll");
    });

  },//modalbtn


  changepage : 
  function() {
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
      }

      else {
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

    return;
  }
  
}// modalbox class


modalbox.changepage();
modalbox.imageOnClick();
modalbox.modalbtn();

