"use strict";


// function globalEventListener (type,selector,callback){
//   document.addEventListener(type, e=> {
//     if(e.target.matches(selector)) callback(e)
//   })
// }

// object
let Website = {
  //object properties

  animePage : document.getElementById("anime-page"),

  modelsPage : document.getElementById("models-page"),

  modelCategoryTitle : document.getElementById("models-title"),

  animeCategoryTitle : document.getElementById("anime-title"),

  body : document.getElementById("body"),

  modalBox : document.getElementById("modal-box"),

  ModalImage : document.getElementById("modal-img"),

  modalLeftButton : document.getElementById("modal-left-btn"),

  modalRightButton : document.getElementById("modal-right-btn"),

  modalCloseButton : document.getElementById("modal-close-btn"),

  animeCategory : Array.from( document.querySelectorAll("#anime-page>.image") ),
  
  modelCategory : Array.from( document.querySelectorAll("#models-page>.image") ),

  modalCurrentIndex : 0, 

  // method 1
  imageOnClick :
  function() {
    this.animeCategory.forEach(image =>{
      image.addEventListener("click", function () {
        if (Website.modalBox.classList == "close") {
          Website.modalBox.classList.replace("close", "open");
          Website.body.classList.add("no-scroll");
          Website.ModalImage.src = this.src;
          Website.modalCurrentIndex = Website.animeCategory.indexOf(this);
        }
      })
    })
    
    Website.modelCategory.forEach(image =>{
      image.addEventListener("click", function () {
        if (Website.modalBox.classList == "close") {
          Website.modalBox.classList.replace("close", "open");
          Website.body.classList.add("no-scroll");
          Website.ModalImage.src = this.src;
          Website.modalCurrentIndex = Website.modelCategory.indexOf(this);
        }
      })
    })
  },

  // method 2
  modalButtons : 
  function(btn) {
    this.modalRightButton.addEventListener("click", function () {
      if (Website.animePage.classList == "open-grid") {
        if (Website.modalCurrentIndex < Website.animeCategory.length - 1) {
          Website.modalCurrentIndex = Website.modalCurrentIndex + 1;
          Website.ModalImage.src = Website.animeCategory[Website.modalCurrentIndex].src;
        } 
        
        else {
          Website.modalCurrentIndex = 0;
          Website.ModalImage.src = Website.animeCategory[Website.modalCurrentIndex].src;
        }
      } 
      
      else {
        if (Website.modalCurrentIndex < Website.modelCategory.length - 1) {
          Website.modalCurrentIndex = Website.modalCurrentIndex + 1;
          Website.ModalImage.src = Website.modelCategory[Website.modalCurrentIndex].src;
        } 
        
        else {
          Website.modalCurrentIndex = 0;
          Website.ModalImage.src = Website.modelCategory[Website.modalCurrentIndex].src;
        }
      }

    });

    this.modalLeftButton.addEventListener("click", function () {
      if (Website.animePage.classList == "open-grid") {
        if (Website.modalCurrentIndex > 0) {
          Website.modalCurrentIndex = Website.modalCurrentIndex - 1;
          Website.ModalImage.src = Website.animeCategory[Website.modalCurrentIndex].src;
        } 
        
        else {
          Website.modalCurrentIndex = Website.animeCategory.length - 1;
          Website.ModalImage.src = Website.animeCategory[Website.modalCurrentIndex].src;
        }
      } 
      
      else {
        if (Website.modalCurrentIndex > 0) {
          Website.modalCurrentIndex = Website.modalCurrentIndex - 1;
          Website.ModalImage.src = Website.modelCategory[Website.modalCurrentIndex].src;
        } 
        
        else {
          Website.modalCurrentIndex = Website.modelCategory.length - 1;
          Website.ModalImage.src = Website.modelCategory[Website.modalCurrentIndex].src;
        }
      }

    });

    this.modalCloseButton.addEventListener("click", function () {
      Website.modalBox.classList.replace("open", "close");
      Website.body.classList.remove("no-scroll");
    });

  },//modalButtons

  // method 3
  toggleChangePage : 
  function() {
    Website.animePage.classList = "open-grid";
    Website.animeCategoryTitle.classList = "open-title";
    Website.modelsPage.classList = "close";
    Website.modelCategoryTitle.classList = "close";
  
    function change (){
      if (Website.modelsPage.classList == "close") {
        Website.modelsPage.classList.replace("close", "open-grid");
        Website.modelCategoryTitle.classList.replace("close", "open-title");
  
        Website.animePage.classList.replace("open-grid", "close");
        Website.animeCategoryTitle.classList.replace("open-title", "close");
      }

      else {
        Website.modelsPage.classList.replace("open-grid", "close");
        Website.modelCategoryTitle.classList.replace("open-title", "close");
  
        Website.animePage.classList.replace("close", "open-grid");
        Website.animeCategoryTitle.classList.replace("close", "open-title");
      }
    };
    const pageLeftBtn = document.getElementsByClassName("left-btn")[0];
    const pageRightBtn = document.getElementsByClassName("right-btn")[0];
  
    pageLeftBtn.addEventListener("click", change);
    pageRightBtn.addEventListener("click", change);


  },

  
  
}// Website class

//invocation
Website.toggleChangePage();
Website.imageOnClick();
Website.modalButtons();

