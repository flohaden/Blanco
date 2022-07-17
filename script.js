"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1"); 
const navLink = document.querySelectorAll('.nav__link'); 
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('nav');
const header = document.querySelector('header');
const allSections = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');

const openModal = function (e) {
    e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
  

btnScrollTo.addEventListener('click', function(e){
    e.preventDefault();
    // const s1coords = section1.getBoundingClientRect();
    // window.scrollTo(s1coords.left +   window.pageXOffset, s1coords.top + window.pageYOffset)
    section1.scrollIntoView({behavior: 'smooth'} )
}) 

navLink.forEach(nav => nav.addEventListener('click', function(e){
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
} ))

tabsContainer.addEventListener('click', function(e){
    const clicked = e.target.closest('.operations__tab');
    if(!clicked) return;

    tabs.forEach((t) => t.classList.remove("operations__tab--active"));
    clicked.classList.add('operations__tab--active');

    document.querySelectorAll('.operations__content').forEach((t) => t.classList.remove('operations__content--active'))
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

const handleOver = function(e) {
     if (e.target.classList.contains("nav__link")) {
       const link = e.target;
       const siblings = link.closest(".nav").querySelectorAll(".nav__link");
       const logo = link.closest(".nav").querySelector("img");

       siblings.forEach((el) => {
         if (el !== link) el.style.opacity = this;
       });
       logo.style.opacity = this;
     } 
}

nav.addEventListener('mouseover', handleOver.bind(0.5));
nav.addEventListener("mouseout", handleOver.bind(1));

// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function(){
//   if (window.scrollY > initialCoords.top){
//     nav.classList.add('sticky') 
//   } else {
//     nav.classList.remove('sticky');
//   }
// })
 
//Sticky navigation
const stickyNav = function(entries){
  const entry = entries[0]

  if (!entry.isIntersecting){
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }
}
const headObserver = new IntersectionObserver (stickyNav, {
  root: null, threshold: 0, rootMargin: '-90px '
})
headObserver.observe(header)     


const revealSection = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
}
const sectionObserver = new IntersectionObserver (revealSection, {
  root: null,
  threshold: 0.15   
})
allSections.forEach(function(e){
  sectionObserver.observe(e);
  e.classList.add('section--hidden')
}) 

const loadImg = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  })
  observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver (loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})
imgTargets.forEach(img => imgObserver.observe(img))


const slider = function () {
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

const createDots = function () {
  slides.forEach (function(_, i) {
    dotContainer.insertAdjacentHTML('beforeend',
    `<button class='dots__dot' data-slide = '${i}'></button>`)
  })
}

const activateDot = function(slide){
  document.querySelectorAll('.dots__dot')
  .forEach(dot => dot.classList.remove('dots__dot--active'))
  document.querySelector(`.dots__dot[data-slide='${slide}']`).classList.add('dots__dot--active')
}

const goToSlide = function(slide) {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`))
}

let curSlide = 0
let maxSlide = slides.length
const nextSlide = function() {
  if (curSlide === maxSlide - 1){
    curSlide = 0
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};
const prevSlide = function () {
  if (curSlide === 0){
    curSlide = maxSlide - 1
  } else {
    curSlide --
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

const init = function() {
  createDots();
  activateDot(0);
  goToSlide(0);
}
init();

btnLeft.addEventListener ('click', prevSlide);
btnRight.addEventListener ('click', nextSlide)
document.addEventListener('keydown', function(e){
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function(e){
  if (e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset;

    goToSlide(slide);
  }
})
};
slider ();
 
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};