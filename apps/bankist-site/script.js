'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');
const sectionSignUp = document.querySelector('#section--sign-up');

const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContents = document.querySelectorAll('.operations__content');

const header = document.querySelector('.header');
const nav = document.querySelector('.nav');

const slides = document.querySelectorAll('.slide');
const sliderArrowLeft = document.querySelector('.slider__btn--left');
const sliderArrowRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// smooth scroll
btnScrollTo.addEventListener('click', function (e) {
  const scrollToRect = section1.getBoundingClientRect();
  console.log(scrollToRect);
  console.log(window.scrollY + scrollToRect.top);

  const scrollToX = window.scrollX + scrollToRect.left;
  const scrollToY = window.scrollY + scrollToRect.top;

  // scroll sem animação
  // window.scrollTo(scrollToX, scrollToY);

  // scroll com animação
  // window.scrollTo({ left: scrollToX, top: scrollToY, behavior: 'smooth' });

  // a forma mais moderna é com o método scrollIntoView,
  section1.scrollIntoView({ behavior: 'smooth' });
});

// navegação da página sem delegação de eventos
// não é eficiente pois o handler é adicionado uma vez para cada link
// const allNavLinks = document.querySelectorAll('.nav__link');
// allNavLinks.forEach(function (navLink) {
//   navLink.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     const section = document.querySelector(id);

//     section.scrollIntoView({ behavior: 'smooth' });
//   });
// });

// navegação da página com delegação de eventos
// adicionar
const navLinks = document.querySelector('.nav__links');
navLinks.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    const section = document.querySelector(id);

    section.scrollIntoView({ behavior: 'smooth' });
  }
});

// tabbed component da seção "operations"

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  const tabNumber = clicked.dataset.tab;
  tabContents.forEach(tabContent =>
    tabContent.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${tabNumber}`)
    .classList.add('operations__content--active');
});

// animação de fade do menu
const setNotHoveredLinksOpacity = function (e, opacity) {
  if (!e.target.classList.contains('nav__link')) return;

  const link = e.target;
  const logo = link.closest('.nav').querySelector('img');
  const siblings = link.closest('.nav').querySelectorAll('.nav__link');

  logo.style.opacity = opacity;
  siblings.forEach(sibling => {
    if (sibling !== link) sibling.style.opacity = opacity;
  });
};
nav.addEventListener('mouseover', e => setNotHoveredLinksOpacity(e, '.5'));
nav.addEventListener('mouseout', e => setNotHoveredLinksOpacity(e, '1'));

// barra de navegação sticky com scroll event
// não é muito eficiente porque o evento de scroll é
// disparado com muita frequência

// const coordinatesSection1 = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.scrollY > coordinatesSection1.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// barra de navegação com sticky: intersection observer API
const navHeight = nav.getBoundingClientRect().height;

const stickNav = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) nav.classList.remove('sticky');
  else nav.classList.add('sticky');
};
const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const headerObserver = new IntersectionObserver(stickNav, options);
headerObserver.observe(header);

// revelar seções no momento em que elas aparecem na tela
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
const sections = document.querySelectorAll('.section');
sections.forEach(sec => {
  // sec.classList.add('section--hidden');
  sectionObserver.observe(sec);
});

// lazy loading de imagens
/* 
  Imagens impactam no carregamento da página e devem ser otimizadas
  Uma estratégia para isso é chamada de "lazy loading".
  Ela consiste em carregar uma imagem de baixa resolução ao iniciar a página
  e carregar a imagem original apenas quando o usuário rolar a tela até ela.
 */
const loadImage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  const image = entry.target;
  image.src = image.dataset.src;
  console.log(image);
  image.addEventListener('load', function () {
    image.classList.remove('lazy-img');
  });
  observer.unobserve(image);
};
const featureImageObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
const allLazyImages = document.querySelectorAll('[data-src]');
allLazyImages.forEach(img => featureImageObserver.observe(img));

// slider
const slider = function () {
  let currentSlideIndex = 0;

  const goToSlide = function (slideIndex) {
    slides.forEach((slide, i) => {
      const newTranslation = (i - slideIndex) * 100;
      slide.style.transform = `translateX(${newTranslation}%)`;
    });
  };

  const slideToRight = function () {
    if (currentSlideIndex === slides.length - 1) currentSlideIndex = 0;
    else currentSlideIndex++;
    goToSlide(currentSlideIndex);
    activateDot(currentSlideIndex);
  };

  const slideToLeft = function () {
    if (currentSlideIndex === 0) currentSlideIndex = slides.length - 1;
    else currentSlideIndex--;
    goToSlide(currentSlideIndex);
    activateDot(currentSlideIndex);
  };

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"> </button>`
      );
    });
  };

  const activateDot = function (slideIndex) {
    dotContainer.querySelectorAll('.dots__dot').forEach(dot => {
      if (dot.dataset.slide === String(slideIndex)) {
        dot.classList.add('dots__dot--active');
      } else {
        dot.classList.remove('dots__dot--active');
      }
    });
  };

  const initSlider = function () {
    goToSlide(currentSlideIndex);
    createDots();
    activateDot(currentSlideIndex);
    sliderArrowRight.addEventListener('click', slideToRight);
    sliderArrowLeft.addEventListener('click', slideToLeft);
    document.addEventListener('keyup', function (e) {
      if (e.key === 'ArrowRight') slideToRight();
      else if (e.key === 'ArrowLeft') slideToLeft();
    });
    dotContainer.addEventListener('click', function (e) {
      if (!e.target.classList.contains('dots__dot')) return;
      const dot = e.target;
      const slideIndex = dot.dataset.slide;
      goToSlide(slideIndex);
      activateDot(slideIndex);
    });
  };

  initSlider();
};
slider();

///////////////////////////////////////

// const header = document.querySelector('.header');
// const cookieMessage = document.createElement('div');
// cookieMessage.classList.add('cookie-message');
// cookieMessage.innerHTML =
//   'We use cookies for improved functionality and analytics.\
//   <button class="btn btn--close-cookie"> Got it! </button>';
// header.append(cookieMessage);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     cookieMessage.remove();
//   });

// // setar valor de uma propriedade
// cookieMessage.style.backgroundColor = '#37383d';
// cookieMessage.style.width = '120%';

// // obter estilos computados
// cookieMessage.style.height =
//   Number.parseFloat(getComputedStyle(cookieMessage).height, 10) + 30 + 'px';
// console.log(cookieMessage.style.height);

// // setando uma propriedade do estilo (qualquer uma, ate mesmo uma variável)
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// eventos
// const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', function () {
//   console.log('yeah');
// });

// // borbulhamento de eventos
// const getRandomInteger = function (min, max) {
//   return Math.floor(Math.random() * (max - min) + 1) + min;
// };

// const getRandomColorString = function () {
//   const red = getRandomInteger(0, 255);
//   const green = getRandomInteger(0, 255);
//   const blue = getRandomInteger(0, 255);
//   return `rgb(${red},${green},${blue})`;
// };

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = getRandomColorString();
//   console.log('clicked!', e.target, e.currentTarget);

//   // parando a propagação
//   // e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = getRandomColorString();
//   console.log('clicked!', e.target, e.currentTarget);
// });
// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = getRandomColorString();
//     console.log('clicked!', e.target, e.currentTarget);
//   },
//   true // o evento é ouvido na fase de captura
// );

// // PERCORRENDO O DOM

// // INDO PARA BAIXO: ACESSANDO FILHOS
// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight')); // querySelector
// console.log(h1.childNodes); // NodeList com filhos incluindo texto e comentários
// console.log(h1.children); // HTMLCollection (live) apenas com elementos filhos diretos
// h1.firstElementChild.style.color = 'white'; // primeiro elemento filho
// h1.lastElementChild.style.color = 'red'; // uĺtimo elemento filho

// // INDO PARA CIMA: ACESSANDO O PAI
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)'; // elemento ancestral mais próximo

// // INDO PARA OS LADOS: ACESSANDO IRMÃOS
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// // para acessar todos os irmãos é preciso acessar todos os filhos do pai
// console.log(h1.parentElement.children);

// INTERSECTION OBSERVER API
// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2, 1],
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);

// EVENTOS DE LIFECYCLE DO DOM

// o evento DOMContentLoaded é lançado no documento quando o browser termina de carregar o HTML e javascript síncrono (sem aguardar por imagens)
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('DOMContentLoaded', e);
});

// o evento load é lançado no window quando todo o conteúdo tiver sido carregado e todos os scripts tiverem sido executados
window.addEventListener('load', function () {
  console.log('window.load');
});

// // o evento beforeunload é lançado no window logo antes do usuário deixar a página
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = 'message';
// });
