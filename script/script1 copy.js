"use strict";


// function globalEventListener (type,selector,callback){
//   document.addEventListener(type, e=> {
//     if(e.target.matches(selector)) callback(e)
//   })
// }

// object
let modalbox = (function(){

  // animePage = document.getElementById("anime-page");

  // modelsPage = document.getElementById("models-page");

  // modelsTitle = document.getElementById("models-title");

  // animeTitle = document.getElementById("anime-title");

  // body = document.getElementById("body");

  // modal = document.getElementById("modal-box");

  // ImgCont = document.getElementById("modal-image-container");

  // modalImg = document.getElementById("modal-img");

  // modalLeftBtn = document.getElementById("modal-left-btn");

  // modalRightBtn = document.getElementById("modal-right-btn");

  // closebtn = document.getElementById("modal-close-btn");

  // animeList = Array.from( document.querySelectorAll("#anime-page>.image") );
  
  // modelsList = Array.from( document.querySelectorAll("#models-page>.image") );

  // currentindex = 0; 

  return{

    animePage : document.getElementById("anime-page"),

    modelsPage : document.getElementById("models-page"),

    modelsTitle : document.getElementById("models-title"),

    animeTitle : document.getElementById("anime-title"),

    body : document.getElementById("body"),

    modal : document.getElementById("modal-box"),

    ImgCont : document.getElementById("modal-image-container"),

    modalImg : document.getElementById("modal-img"),

    modalLeftBtn : document.getElementById("modal-left-btn"),

    modalRightBtn : document.getElementById("modal-right-btn"),

    closebtn : document.getElementById("modal-close-btn"),

    animeList : Array.from( document.querySelectorAll("#anime-page>.image") ),
    
    modelsList : Array.from( document.querySelectorAll("#models-page>.image") ),

    currentindex : 0, 

    // method 1
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

  // method 2
  modalbtn : 
  function(btn) {
    this.modalRightBtn.addEventListener("click", function () {
      if (modalbox.animePage.classList == "open-grid") {
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

    this.modalLeftBtn.addEventListener("click", function () {
      if (modalbox.animePage.classList == "open-grid") {
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

  // method 3
  changepage : 
  function() {
    modalbox.animePage.classList = "open-grid";
    modalbox.animeTitle.classList = "open-title";
    modalbox.modelsPage.classList = "close";
    modalbox.modelsTitle.classList = "close";
  
    function change (){
      if (modalbox.modelsPage.classList == "close") {
        modalbox.modelsPage.classList.replace("close", "open-grid");
        modalbox.modelsTitle.classList.replace("close", "open-title");
  
        modalbox.animePage.classList.replace("open-grid", "close");
        modalbox.animeTitle.classList.replace("open-title", "close");
      }

      else {
        modalbox.modelsPage.classList.replace("open-grid", "close");
        modalbox.modelsTitle.classList.replace("open-title", "close");
  
        modalbox.animePage.classList.replace("close", "open-grid");
        modalbox.animeTitle.classList.replace("close", "open-title");
      }
    };
    const pageLeftBtn = document.getElementsByClassName("left-btn")[0];
    const pageRightBtn = document.getElementsByClassName("right-btn")[0];
  
    pageLeftBtn.addEventListener("click", change);
    pageRightBtn.addEventListener("click", change);


  },

  }

}())

modalbox