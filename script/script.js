"use strict";

let Website = {
  //object properties

  category_01 : document.getElementById("anime-page"),

  category_02 : document.getElementById("models-page"),

  modelCategoryTitle : document.getElementById("models-title"),

  animeCategoryTitle : document.getElementById("anime-title"),

  body : document.getElementById("body"),

  modalBox : document.getElementById("modal-box"),

  ModalImage : document.getElementById("modal-img"),

  photographer : document.getElementById("photographer"),
  alt : document.getElementById("alt"),

  // method 1
  
  toggleChangePage() {
    const {category_01, category_02, animeCategoryTitle, modelCategoryTitle} = this;
    category_01.classList = "open-grid";
    animeCategoryTitle.classList = "open-title";
    category_02.classList = "close";
    modelCategoryTitle.classList = "close";
    function change (){
      
      if (category_02.classList == "close") {
        category_02.classList.replace("close", "open-grid");
        modelCategoryTitle.classList.replace("close", "open-title");
  
        category_01.classList.replace("open-grid", "close");
        animeCategoryTitle.classList.replace("open-title", "close");
      }

      else {
        category_02.classList.replace("open-grid", "close");
        modelCategoryTitle.classList.replace("open-title", "close");
  
        category_01.classList.replace("close", "open-grid");
        animeCategoryTitle.classList.replace("close", "open-title");
      }
    };
    const pageLeftBtn = document.getElementsByClassName("left-btn")[0];
    const pageRightBtn = document.getElementsByClassName("right-btn")[0];
  
    pageLeftBtn.addEventListener("click", change);
    pageRightBtn.addEventListener("click", change);
  },

  // method 2
  async renderImages(){
    const {category_01, category_02, modalBox, body, ModalImage, photographer, alt} = this;
    let uri = "photos/photo details.json";
    const res = await fetch(uri);
  
    const modalLeftButton = document.getElementById("modal-left-btn");
    const modalRightButton = document.getElementById("modal-right-btn");
    const modalCloseButton = document.getElementById("modal-close-btn");
  
    let modalCurrentIndex = 0;

    if(res.status != 200){
      throw new Error("Failed to retrieve the data");
    }
  
    const images = await  res.json();
    //console.log(images)
    let template_01 = "";
    let template_02 = "";
  
    images.images1.forEach(image =>{
      template_01 += 
      `
        <img class="image" src="${image.lowRezSrc}" loading = "lazy" alt="${image.alt}" title="${image.title}"/>
      `
    })
    category_01.innerHTML = template_01;

    images.images2.forEach(image =>{
      template_02 += 
      `
        <img class="image" src=${image.lowRezSrc} loading = "lazy" alt="${image.alt}" title="${image.title}" />
      `
    })
    category_01.innerHTML = template_01;
  
    category_02.innerHTML = template_02;

    //The templates should always be before this
    const animeCategory = Array.from( document.querySelectorAll("#anime-page>.image") );
  
    const modelCategory = Array.from( document.querySelectorAll("#models-page>.image") );

    const imageOnClick = function() {
      animeCategory.forEach(image =>{ 
        image.addEventListener("click", function () {
          if (modalBox.classList == "close") {
            modalBox.classList.replace("close", "open");
            body.classList.add("no-scroll");
            //ModalImage.src = this.src;
            ModalImage.src = images.images1[animeCategory.indexOf(this)]._src;
            photographer.innerHTML = images.images1[animeCategory.indexOf(this)].photographer;
            alt.innerHTML = images.images1[animeCategory.indexOf(this)].alt;
            modalCurrentIndex = animeCategory.indexOf(this);
          }
        })
      })
      
      modelCategory.forEach(image =>{
        image.addEventListener("click", function () {
          if (modalBox.classList == "close") {
            modalBox.classList.replace("close", "open");
            body.classList.add("no-scroll");
            //ModalImage.src = this.src;
            ModalImage.src = images.images2[modelCategory.indexOf(this)]._src;
            photographer.innerHTML = images.images2[modelCategory.indexOf(this)].photographer;
            alt.innerHTML = images.images2[modelCategory.indexOf(this)].alt;
            modalCurrentIndex = modelCategory.indexOf(this);
          }
        })
      })
    }
    imageOnClick();
    
    const modalButtons = function(btn) {
      modalRightButton.addEventListener("click", function () {
        if (category_01.classList == "open-grid") {
          if (modalCurrentIndex < animeCategory.length - 1) {
            modalCurrentIndex = modalCurrentIndex + 1;
            //ModalImage.src = animeCategory[modalCurrentIndex].src;
            ModalImage.src = images.images1[modalCurrentIndex]._src;
            photographer.innerHTML = images.images1[modalCurrentIndex].photographer;
            alt.innerHTML = images.images1[modalCurrentIndex].alt;
          } 
          
          else {
            modalCurrentIndex = 0;
            //ModalImage.src = animeCategory[modalCurrentIndex].src;
            ModalImage.src = images.images1[modalCurrentIndex]._src;
            photographer.innerHTML = images.images1[modalCurrentIndex].photographer;
            alt.innerHTML = images.images1[modalCurrentIndex].alt;
            
          }
        } 
        
        else {
          if (modalCurrentIndex < modelCategory.length - 1) {
            modalCurrentIndex = modalCurrentIndex + 1;
            //ModalImage.src = modelCategory[modalCurrentIndex].src;
            ModalImage.src = images.images2[modalCurrentIndex]._src;
            photographer.innerHTML = images.images2[modalCurrentIndex].photographer;
            alt.innerHTML = images.images2[modalCurrentIndex].alt;
          } 
          
          else {
            modalCurrentIndex = 0;
            //ModalImage.src = modelCategory[modalCurrentIndex].src;
            ModalImage.src = images.images2[modalCurrentIndex]._src;
            photographer.innerHTML = images.images2[modalCurrentIndex].photographer;
            alt.innerHTML = images.images2[modalCurrentIndex].alt;
          }
        }
  
      });
  
      modalLeftButton.addEventListener("click", function () {
        if (category_01.classList == "open-grid") {
          if (modalCurrentIndex > 0) {
            modalCurrentIndex = modalCurrentIndex - 1;
            //ModalImage.src = animeCategory[modalCurrentIndex].src;
            ModalImage.src = images.images1[modalCurrentIndex]._src;
            photographer.innerHTML = images.images1[modalCurrentIndex].photographer;
            alt.innerHTML = images.images1[modalCurrentIndex].alt;
          } 
          
          else {
            modalCurrentIndex = animeCategory.length - 1;
            //ModalImage.src = animeCategory[modalCurrentIndex].src;
            ModalImage.src = images.images1[modalCurrentIndex]._src;
            photographer.innerHTML = images.images1[modalCurrentIndex].photographer;
            alt.innerHTML = images.images1[modalCurrentIndex].alt;
          }
        } 
        
        else {
          if (modalCurrentIndex > 0) {
            modalCurrentIndex = modalCurrentIndex - 1;
            //ModalImage.src = modelCategory[modalCurrentIndex].src;
            ModalImage.src = images.images2[modalCurrentIndex]._src;
            photographer.innerHTML = images.images2[modalCurrentIndex].photographer;
            alt.innerHTML = images.images2[modalCurrentIndex].alt;
          } 
          
          else {
            modalCurrentIndex = modelCategory.length - 1;
            //ModalImage.src = modelCategory[modalCurrentIndex].src;
            ModalImage.src = images.images2[modalCurrentIndex]._src;
            photographer.innerHTML = images.images2[modalCurrentIndex].photographer;
            alt.innerHTML = images.images2[modalCurrentIndex].alt;
          }
        }
  
      });
  
      modalCloseButton.addEventListener("click", function () {
        modalBox.classList.replace("open", "close");
        body.classList.remove("no-scroll");
        ModalImage.src = "";
        photographer.innerHTML = "";
        alt.innerHTML = "";
      });
  
    }//modalButtons
    modalButtons();
  }

  
  
}// Website class

//invocation
Website.toggleChangePage();
window.addEventListener("DOMContentLoaded", () => Website.renderImages());


// for(let i = 0; i < 15 ; i++){
//   console.log(
//     `
//       {
//         "title": "",
//         "name" : "image-${ i < 10 ?  "0" + (i+1) : i+1 }",
//         "photographer": "Photo by Oleg Magni from Pexels",
//         "_src" : "photos/list1/image-${ i < 10 ?  "0" + (i+1) : i+1 }.webp",
//         "id" : ${i}
//       }

//     `
//   )
// }
