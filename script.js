let topPx = window.pageYOffset;
let canScroll = true;
const sectionHeight = document.querySelector('section').clientHeight;
const bodyHeight = document.querySelector('body').clientHeight;
const smoke = document.querySelector('.smoke');
const darkBg = document.querySelector('.dark-bg');


const scrollFn = (event) => {
  
  if (canScroll === false) {
    console.log('Пока нельзя скроллить!');
    return;
  } else if (event.deltaY < 0 && window.pageYOffset === 0) {
    console.log('Больше нельзя скроллить вверх');
    return
  } else if (event.deltaY > 0 && window.pageYOffset + window.innerHeight + event.deltaY > bodyHeight) {
    console.log('Больше нельзя скроллить вниз');
    return
  }

  canScroll = false;

  let promise = new Promise((resolve, reject) => {
    smoke.classList.add('animation-smoke');
    darkBg.classList.add('dark-anim');
    setTimeout(() => {
      resolve();
    }, 2000);
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