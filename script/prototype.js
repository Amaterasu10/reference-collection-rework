"use strict";

let Website = {
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
  
  renderImages(){

  const { category, modalBox, body, ModalImage, photographer, photoLink } = this;
    
    let initialSearch = new URLSearchParams(window.location.search).get("search");
    const imageData = {
      // thumbnails : [],
      // mobile : [],
      // mobileThumnnails : [],
      // hd : [],
      // large2x : [],
      // large : [],
      // portraits : [],
      // landscapes : [],
      width: [],
      height: [],
      photographer : [],
      photographer_url : [],
      url : [],
      src : []      

    }
   
    let totalRendered = 0;
    async function updateValue(url) {
      
      const searchInput = document.getElementById("search-input");
      
      const res = await fetch(url,{
        headers: {
          Authorization: "563492ad6f9170000100000123ebb2ef16c445f496c949542eaf75aa"
        }
      });
      
      if(res.status == 429){
        searchInput.placeholder = 'We have reached the maximum request possible, please wait for a while. ';
        searchInput.disabled = true;
        
      }
      if(res.status != 200){
        throw new Error("Failed to retrieve the data");
      }

      const data = await  res.json();
      totalRendered += data.photos.length;
      //console.log(totalRendered)
      if(totalRendered !=0 && totalRendered == data.total_results){
        alert(`You have reached the end of your search result, ${totalRendered} images in total.`)
        updateValue()
      }
      else if(data.photos.length == 0){
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
    

    const renderUpdate = async data =>{
      let res = await data
     // console.log("this is the res inside renderUpdate", res)
      let images = res.photos
      if(images.length > 0){
        
        //console.log(images)

        
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
          newDiv.style.backgroundColor = image.avg_color;


          const newOverlay = document.createElement('Div')
          newOverlay.className = 'image-overlay'
          newOverlay.innerHTML = imageTitle
          
          newDiv.append(newImage)
          newDiv.append(newOverlay)
          category.append(newDiv)

          // imageData.thumbnails.push(image.src.medium)
          // imageData.mobileThumnnails.push(image.src.small)
          // imageData.mobile.push(image.src.medium)
          // imageData.hd.push(image.src.original)
          // imageData.large2x.push(image.src.large2x)
          // imageData.large.push(image.src.large)
          // imageData.portraits.push(image.src.portrait)
          // imageData.landscapes.push(image.src.landscapes)
          imageData.photographer.push(image.photographer)
          imageData.url.push(image.url)
          imageData.photographer_url.push(image.photographer_url)

          imageData.src.push(image.src)
          imageData.height.push(image.height)
          imageData.width.push(image.width)

          if(image.width > image.height){
            newDiv.classList.add('horizontal')
          }
          else if(image.width < image.height){
            newDiv.classList.add('vertical')
          }
          else{
            newDiv.classList.add('big')
          }
          //console.log(image)         
          //window.innerWidth > 700 ? template_02 += `<img class="image" src="${image.src.portrait}" loading = "lazy" alt=${image.url.substr(29)} /> ` : template_02 += `<img class="image" src="${image.src.small}" loading = "lazy" alt=${image.url.substr(29)} /> `;
        });

        


        




        //console.log(imageData.src)

        //category.innerHTML = template_02;

        
      
        //The templates should always be before this
        categoryArray = Array.from( document.querySelectorAll("#anime-page .image") );
        //console.log(categoryArray)

        const head =  document.getElementsByTagName('head')[0]
        const imgOptions = {};
        const imgObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const img = entry.target;  

          window.innerWidth > 700 ? img.src = imageData.src[categoryArray.indexOf(img)].medium : img.src = imageData.src[categoryArray.indexOf(img)].small

          
          const linkImagePreloader = document.createElement('link')
          linkImagePreloader.rel = 'preload'
          

          window.innerWidth > 700 ? linkImagePreloader.href = imageData.src[categoryArray.indexOf(img)].medium : linkImagePreloader.href = imageData.src[categoryArray.indexOf(img)].small

          linkImagePreloader.as = "image"         
          head.append(linkImagePreloader) 
          img.style.width = '100%';

          // img.height = img.height
          // img.width = img.width

          // console.log(img.weight)
        });
        }, imgOptions);


        // window.addEventListener('mouseover',e =>{
        //   if(e.target.tagName == 'IMG'){

        //   console.log(`width: ${imageData.width[categoryArray.indexOf(e.target)] },
        //   height: ${imageData.height[categoryArray.indexOf(e.target)]}`)

        //   // let num1 = imageData.height[categoryArray.indexOf(e.target)];
        //   // let num2 = imageData.width[categoryArray.indexOf(e.target)];
        //   let num1 = 1024;
        //   let num2 = 768;
        //   console.log(imageData.height[categoryArray.indexOf(e.target)])
        //   const findGCD = (a,b) =>{
        //     if(b == 0){
        //       return a
        //     }
        //     return findGCD(b , a % b)
        //   }

        //   let gcd = findGCD(num1,num2)
        //   console.log(`aspect ratio = ${num1/ gcd } : ${num2 / gcd } ` )
        //   }
        // })


        categoryArray.forEach((img) => {
          imgObserver.observe(img);
        });

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
                  ModalImage.src = imageData.src[categoryArray.indexOf(this)].medium;
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

        window.onscroll = function(ev) {
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

          }
        };

      }
     

    }

    const navigateToModalImage = function(direction) {
      if(direction === "left"){
        modalCurrentIndex > 0 ? modalCurrentIndex -= 1 :  modalCurrentIndex = categoryArray.length - 1;
      }else{
        modalCurrentIndex < categoryArray.length - 1 ? modalCurrentIndex += 1 : modalCurrentIndex = 0;
      }

      if(window.innerWidth > 1400){
        ModalImage.src = imageData.src[modalCurrentIndex].large2x;
      }else if(window.innerWidth > 700){
        ModalImage.src = imageData.src[modalCurrentIndex].medium;
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
      ModalImage.src = "";
      photoLink.href = "";
      photographer.innerHTML = "";
      photographer.href = "";
    });

    renderUpdate(updateValue(`https://api.pexels.com/v1/search?per_page=16&page&query=${initialSearch}`))
    let totalImages = 32;
    let requestedPage = 2;


    const getData = async () =>{
      //const nextData = await fetchNextPage(data,requestedPage)
      let res = updateValue(`https://api.pexels.com/v1/search?per_page=${totalImages}&page=${requestedPage}&query=${initialSearch}`)
      //console.log('this is the res inside getData',res)
      requestedPage++;
      //console.log(res)
      renderUpdate(res)
    }
    

    // document.getElementsByClassName('burger-nav')[0].addEventListener('click',  
    // async function(ev) {
      
    //   getData()
    // })
    

    let last = 0;
    let scrolledDown = false;
    let scrolledUp = false;
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const gridContainer = document.querySelector('#grid-container');
    window.addEventListener('scroll',()=>{
    
      // if(last > window.scrollY){
      //   scrolledDown = false;
      //   scrolledUp = true;
      // }
      // if(last < window.scrollY){
      //   scrolledDown = true;
      //   scrolledUp = false; 
      // }
    
      // if(scrolledDown  && header.className == 'header-on-scroll-down'){
      //   header.classList.remove('header-on-scroll-down')
      //   footer.classList.add('footer-on-scroll-up')
        
      //   window.innerWidth > 700 ? gridContainer.style.margin = '0.2rem auto 5.25rem' : 
      //   gridContainer.style.margin = '0.2rem auto 3.25rem';
      // }
      // if(scrolledUp){
        
      //   header.classList.add('header-on-scroll-down') 
      //   footer.classList.remove('footer-on-scroll-up')
      //   window.innerWidth > 700 ? gridContainer.style.margin = '4.2rem auto 3.25rem' : 
      //   gridContainer.style.margin = '5.2rem auto 3.25rem';
    
      // }

    
      if(scrollY + innerHeight >= document.documentElement.scrollHeight){
        //
        
        getData()
        
      }
      last = window.scrollY;
    })
    
 
  }
  
}// Website class


//invocation
window.addEventListener("DOMContentLoaded", () => Website.renderImages());
