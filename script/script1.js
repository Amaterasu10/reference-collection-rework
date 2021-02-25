"use strict";


// function globalEventListener (type,selector,callback){
//   document.addEventListener(type, e=> {
//     if(e.target.matches(selector)) callback(e)
//   })
// }

// object

// const renderImages = async function (){
//   let uri = "Images.json";
//   const res = await fetch(uri);

//   const animePage = Website.animePage;
//   const modelsPage = Website.modelsPage;

//   if(res.status != 200){
//     throw new Error("Failed to retrieve the data");
//   }

//   const images = await  res.json();

//   let animeTemplate = "";
//   let modelsTemplate = "";

//   images.anime.forEach(image =>{
//     animeTemplate += 
//     `
//       <img class="image" src=${image._src} alt=${image.title} />
//     `
//   })

//   animePage.innerHTML = animeTemplate;

//   images.models.forEach(image =>{
//     modelsTemplate +=
//     `
//       <img class="image" src=${image._src} alt=${image.title} />
//     `
//   })

//   modelsPage.innerHTML = modelsTemplate;

//   const animeCategory = Array.from( document.querySelectorAll("#anime-page>.image") );
  
//   const modelCategory = Array.from( document.querySelectorAll("#models-page>.image") );

  
// }

//window.addEventListener("DOMContentLoaded", () => renderImages());


let Website = {
  //object properties

  animePage : document.getElementById("anime-page"),

  modelsPage : document.getElementById("models-page"),

  modelCategoryTitle : document.getElementById("models-title"),

  animeCategoryTitle : document.getElementById("anime-title"),

  body : document.getElementById("body"),

  modalBox : document.getElementById("modal-box"),

  ModalImage : document.getElementById("modal-img"),
 

  // method 1
  

  // method 2
  

  // method 3
  toggleChangePage() {
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

  async renderImages(){
    let uri = "Images.json";
    const res = await fetch(uri);
  
    const animePage = Website.animePage;
    const modelsPage = Website.modelsPage;

    const modalLeftButton = document.getElementById("modal-left-btn");
    const modalRightButton = document.getElementById("modal-right-btn");
    const modalCloseButton = document.getElementById("modal-close-btn");
  
    let modalCurrentIndex = 0;

    if(res.status != 200){
      throw new Error("Failed to retrieve the data");
    }
  
    const images = await  res.json();
  
    let animeTemplate = "";
    let modelsTemplate = "";
  
    images.anime.forEach(image =>{
      animeTemplate += 
      `
        <img class="image" src=${image._src} alt=${image.title} />
      `
    })
  
    animePage.innerHTML = animeTemplate;
  
    images.models.forEach(image =>{
      modelsTemplate +=
      `
        <img class="image" src=${image._src} alt=${image.title} />
      `
    })
  
    modelsPage.innerHTML = modelsTemplate;

    const animeCategory = Array.from( document.querySelectorAll("#anime-page>.image") );
  
    const modelCategory = Array.from( document.querySelectorAll("#models-page>.image") );

    const imageOnClick = function() {
      animeCategory.forEach(image =>{
        image.addEventListener("click", function () {
          if (Website.modalBox.classList == "close") {
            Website.modalBox.classList.replace("close", "open");
            Website.body.classList.add("no-scroll");
            Website.ModalImage.src = this.src;
            modalCurrentIndex = animeCategory.indexOf(this);
          }
        })
      })
      
      modelCategory.forEach(image =>{
        image.addEventListener("click", function () {
          if (Website.modalBox.classList == "close") {
            Website.modalBox.classList.replace("close", "open");
            Website.body.classList.add("no-scroll");
            Website.ModalImage.src = this.src;
            modalCurrentIndex = modelCategory.indexOf(this);
          }
        })
      })
    }
    imageOnClick();
    
    const modalButtons = function(btn) {
      modalRightButton.addEventListener("click", function () {
        if (Website.animePage.classList == "open-grid") {
          if (modalCurrentIndex < animeCategory.length - 1) {
            modalCurrentIndex = modalCurrentIndex + 1;
            Website.ModalImage.src = animeCategory[modalCurrentIndex].src;
          } 
          
          else {
            modalCurrentIndex = 0;
            Website.ModalImage.src = animeCategory[modalCurrentIndex].src;
          }
        } 
        
        else {
          if (modalCurrentIndex < modelCategory.length - 1) {
            modalCurrentIndex = modalCurrentIndex + 1;
            Website.ModalImage.src = modelCategory[modalCurrentIndex].src;
          } 
          
          else {
            modalCurrentIndex = 0;
            Website.ModalImage.src = modelCategory[modalCurrentIndex].src;
          }
        }
  
      });
  
      modalLeftButton.addEventListener("click", function () {
        if (Website.animePage.classList == "open-grid") {
          if (modalCurrentIndex > 0) {
            modalCurrentIndex = modalCurrentIndex - 1;
            Website.ModalImage.src = animeCategory[modalCurrentIndex].src;
          } 
          
          else {
            modalCurrentIndex = animeCategory.length - 1;
            Website.ModalImage.src = animeCategory[modalCurrentIndex].src;
          }
        } 
        
        else {
          if (modalCurrentIndex > 0) {
            modalCurrentIndex = modalCurrentIndex - 1;
            Website.ModalImage.src = modelCategory[modalCurrentIndex].src;
          } 
          
          else {
            modalCurrentIndex = modelCategory.length - 1;
            Website.ModalImage.src = modelCategory[modalCurrentIndex].src;
          }
        }
  
      });
  
      modalCloseButton.addEventListener("click", function () {
        Website.modalBox.classList.replace("open", "close");
        Website.body.classList.remove("no-scroll");
      });
  
    }//modalButtons
    modalButtons();
  }

  
  
}// Website class

//invocation
Website.toggleChangePage();
window.addEventListener("DOMContentLoaded", () => Website.renderImages());

// for(let i = 0; i < 22; i++){
//   console.log(
//     `
//     {
//       "title" : "image${i < 10 ? "0" + (1+i) : i+1}",
//       "_src" : "webp/models/pic${i < 10 ? "0" + (1+i) : i+1}.webp",
//       "id" : ${i}
//     },
//     `
//   );

// }




