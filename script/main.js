"use strict";

const App = {
  //object properties

  category : document.getElementById("anime-page"),

  category_Title : document.getElementById("anime-title"),

  body : document.getElementById("body"),

  modalBox : document.getElementById("modal-box"),

  ModalImage : document.getElementById("modal-img"),

  photographer : document.getElementById('photographer'),
  photoLink : document.getElementById('photo-link'),

  form : document.getElementsByTagName('form'),
  input : document.getElementById("search-input"),

  // method 1
  
  init(){

  const { category, modalBox, body, ModalImage, photographer, photoLink } = this;
    
    let initialSearch = new URLSearchParams(window.location.search).get("search");
    const imageData = {
      width: [],
      height: [],
      photographer : [],
      photographer_url : [],
      url : [],
      src : []      

    }
   
    let totalRendered = 0;
    const banner = document.querySelector('.banner')
    async function updateValue(url) {

      if(banner.innerHTML.includes('No more images to load')) return;
      //console.log(url)
      const searchInput = document.getElementById("search-input");
      
      const res = await fetch(url,{
        headers: {
          Authorization: "563492ad6f9170000100000123ebb2ef16c445f496c949542eaf75aa"
        }
      });
      
      if(res.status == 429){
        alert('We have reached the maximum request possible, please wait for a while. ')
        searchInput.disabled = true;

        
      }
      if(res.status != 200){
        throw new Error("Failed to retrieve the data");

      }

      const data = await  res.json();
      
      totalRendered += data.photos.length;
      //console.log(totalRendered)
      if(totalRendered !=0 && totalRendered == data.total_results){
        
        banner.innerHTML = `No more images to load. total search result ${data.total_results}`

      }
      else if(data.photos.length == 0){
        banner.style.position = "absolute"
        banner.style.top = "50vh"

        banner.innerHTML = `zero search result for : "${initialSearch}"`
        category.innerHTML = `<p> zero search result for : "${initialSearch}"</p>`

      }

      searchInput.value = "";
      return data
    }
    

    const modalLeftButton = document.getElementById("modal-left-btn");
    const modalRightButton = document.getElementById("modal-right-btn");
    const modalCloseButton = document.getElementById("modal-close-btn");
    let modalCurrentIndex = 0;
    let categoryArray
    
    let called = 0;
    const renderUpdate = async data =>{
      let res = await data
      if(res == undefined || null) return;

      //console.log("this is the res inside renderUpdate", res)
      let images = res.photos
      if(images.length <= 0) return;
        
      //console.log(images)

      document.getElementsByTagName('title')[0].innerHTML = ` ${res.total_results} results for ${initialSearch}`

      images.forEach(image => {
        
        

        const newImage = document.createElement('img')
        newImage.style.width = '0px';

        // window.innerWidth > 700 ? newImage.src = image.src.portrait.replace('&h=1200&w=800','&h=20&w=10') : 
        // newImage.src = image.src.tiny.replace('&h=200&w=280','&h=10&w=20');
        
        let imageTitle = image.url.substr(29)
        
        while(imageTitle.includes('-') || imageTitle.includes('/')){
          imageTitle= imageTitle.replace('-',' ')
          imageTitle= imageTitle.replace(/[0-9]/g, '')
          imageTitle= imageTitle.replace('/', '')
        }

        // newImage.height = image.height
        // newImage.width = image.width
        newImage.alt = imageTitle
        newImage.className = 'image'

        const newDiv = document.createElement('Div')
        
        newDiv.className = 'image-container'

        if(image.width > image.height){
          newDiv.classList.add('horizontal')
        }
        else if(image.width < image.height){
          newDiv.classList.add('vertical')
        }
        else{
          newDiv.classList.add('big')
        }

        newDiv.style.backgroundColor = image.avg_color;


        const newOverlayContainer = document.createElement('Div')
        const newOverlay = document.createElement('h3')
        newOverlayContainer.className = 'image-overlay'
        newOverlay.innerHTML = imageTitle
        
        newDiv.append(newImage)
        newOverlayContainer.append(newOverlay)
        newDiv.append(newOverlayContainer)
        category.append(newDiv)

        imageData.photographer.push(image.photographer)
        imageData.url.push(image.url)
        imageData.photographer_url.push(image.photographer_url)

        imageData.src.push(image.src)
        imageData.height.push(image.height)
        imageData.width.push(image.width)

      });

    
      // an array of images that are present in anime-page
      categoryArray = Array.from( document.querySelectorAll("#anime-page .image") );
      //console.log(categoryArray)

      const head =  document.getElementsByTagName('head')[0]
      const imgOptions = {};
      const imgObserver = new IntersectionObserver((entries, imgObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const img = entry.target;  
        img.src = imageData.src[categoryArray.indexOf(img)].medium
        console.log(imageData.height[categoryArray.indexOf(img)] , img)
 
        const linkImagePreloader = document.createElement('link')
        linkImagePreloader.rel = 'preload'
        

        linkImagePreloader.href = imageData.src[categoryArray.indexOf(img)].medium

        linkImagePreloader.as = "image"         
        head.append(linkImagePreloader) 
        img.style.width = '100%';

      });
      }, imgOptions);

      let requestNow = 0;
      categoryArray.forEach((img) => {
        imgObserver.observe(img);
        requestNow++
      });

      // const banner = document.createElement('Div')
      // banner.classList.add('banner')
      // banner.innerHTML = 'Loading more images...'
      // const footer = document.getElementsByTagName('footer')[0]

      //footer.insertBefore(banner, footer.firstChild)
      
      const bannerOptions = {}
      const bannerObserver = new IntersectionObserver((entries, bannerObserver) => {

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;          
          getData()

        });

      },bannerOptions)

      bannerObserver.observe(banner)
      if('all images are loaded and banner is visible'){
        'getdata'
      } 

      const imageOnClick = function() {
        categoryArray.forEach(image =>{ 
          image.addEventListener("click", function () {
            if (modalBox.classList == "close") {
              modalBox.classList.replace("close", "open");
              body.classList.add("no-scroll");


              if(window.innerWidth > 1900){
                ModalImage.src = imageData.src[categoryArray.indexOf(this)].original;
              }
              else if(window.innerWidth > 1400){
                ModalImage.src = imageData.src[categoryArray.indexOf(this)].large2x;
              }else if(window.innerWidth > 700){
                ModalImage.src = imageData.src[categoryArray.indexOf(this)].large;
              }else if(window.innerWidth < 700){
                ModalImage.src = imageData.src[categoryArray.indexOf(this)].medium;
              }
              
              modalCurrentIndex = categoryArray.indexOf(this);
              photoLink.href = imageData.url[categoryArray.indexOf(this)];
              //console.log(imageData)
              photographer.href = imageData.photographer_url[categoryArray.indexOf(this)];
              photographer.innerHTML = imageData.photographer[categoryArray.indexOf(this)];
            }
          })
        })
      }
      imageOnClick();

      
     

    }

    const navigateToModalImage = function(direction) {
      if(direction === "left"){
        modalCurrentIndex > 0 ? modalCurrentIndex -= 1 :  modalCurrentIndex = categoryArray.length - 1;
      }else{
        modalCurrentIndex < categoryArray.length - 1 ? modalCurrentIndex += 1 : modalCurrentIndex = 0;
      }

      if(window.innerWidth > 1900){
        ModalImage.src = imageData.src[modalCurrentIndex].original;
      }
      else if(window.innerWidth > 1400){
        ModalImage.src = imageData.src[modalCurrentIndex].large2x;
      }else if(window.innerWidth > 700){
        ModalImage.src = imageData.src[modalCurrentIndex].large;
      }else if(window.innerWidth < 700){
        ModalImage.src = imageData.src[modalCurrentIndex].medium;
      }

      photoLink.href = imageData.url[modalCurrentIndex];
      photographer.href = imageData.photographer_url[modalCurrentIndex];
      photographer.innerHTML = imageData.photographer[modalCurrentIndex];

    };
    
    modalLeftButton.addEventListener("click", function() {
      navigateToModalImage("left");
    });

    modalRightButton.addEventListener("click",function() {
      navigateToModalImage("right");
    });

    modalCloseButton.addEventListener("click", function () {
      modalBox.classList.replace("open", "close");
      body.classList.remove("no-scroll");
      // ModalImage.src = "";
      // photoLink.href = "";
      // photographer.innerHTML = "";
      // photographer.href = "";
    });


    let totalImages = 32;
    let requestedPage = 2;
    renderUpdate(updateValue(`https://api.pexels.com/v1/search?per_page=${totalImages}&page&query=${initialSearch}`))
    var lastCalled = 0;
    var delay = 500;
    const getData = async () =>{
      

      if (lastCalled >= (Date.now() - delay)) return;
  
      //const nextData = await fetchNextPage(data,requestedPage)
      let res = updateValue(`https://api.pexels.com/v1/search?per_page=${totalImages}&page=${requestedPage}&query=${initialSearch}`)
      //console.log('this is the res inside getData',res)
      requestedPage++;
      //console.log(res)
      renderUpdate(res)
      lastCalled = Date.now();
    }
    console.log(document.getElementsByTagName('footer'))
    
       
  }
  
}// Website object


//invocation
window.addEventListener("DOMContentLoaded", () => App.init());