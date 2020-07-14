let topPx = window.pageYOffset;
let canScroll = true;
let sectionHeight = document.querySelector('section').clientHeight;
let bodyHeight = document.querySelector('body').clientHeight;
const smoke = document.querySelector('.smoke');
const dots = document.querySelector('.dots');
const darkBg = document.querySelector('.dark-bg');

const scrollFn = (event) => {
  
  if (canScroll === false) {
    return;
  } else if (event.deltaY < 0 && window.pageYOffset === 0) {
    return
  } else if (event.deltaY > 0 && window.pageYOffset + window.innerHeight + event.deltaY > bodyHeight) {
    return
  }

  canScroll = false;

  let promise = new Promise((resolve, reject) => {
    smoke.classList.add('animation-smoke');
    dots.classList.add('animation-dots');
    darkBg.classList.add('dark-anim');
    setTimeout(() => {
      resolve();
    }, 1800);
  });
  
  promise.then(
    () => {
      if (event.deltaY > 0 && event.deltaY < bodyHeight) {
        
        console.log('Скроллим вниз');
        topPx += sectionHeight;
        window.scrollTo({
          top: topPx
        });
      }

      else {
        topPx -= sectionHeight;
        window.scrollTo({
          top: topPx
        });
      }

      setTimeout(() => {
        canScroll = true;
        smoke.classList.remove('animation-smoke');
        dots.classList.remove('animation-dots');
        darkBg.classList.remove('dark-anim');
      }, 2000);

    },
    error => {
      console.log(error);
    }
  )
}

window.addEventListener('wheel', (event) => {
  scrollFn(event);
});


window.addEventListener('resize', () => {
  window.scrollTo({
    top: topPx
  });
  
  topPx = 0;
  sectionHeight = document.querySelector('section').clientHeight;
  bodyHeight = document.querySelector('body').clientHeight;
  
})