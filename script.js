"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const nav = document.querySelector(".nav");

const openModal = function (e) {
  e.preventDefault(); //ამ ფუნქციით ჩვენ ჰიპერლინკის დაჭერის დროს გვერდი საწყის ეტაპზე არ ადის.
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
//მეორენაირად კი ასე იქნება :
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//learn more - button
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  //   console.log("X/Y", window.pageXOffset, window.pageYOffset); //ეს არის იმ learn more ღილაკზე დაწერისას სქროლი რა კოორდინატებზე იდგა მაგის გეგება
  //   console.log(
  //     "height/width", //ამიტ ჩვენ ვაჩვენებთ სიმაღლეს და სიგანეს პარამეტრებს
  //     document.documentElement.clientHeight,
  //     document.documentElement.clientWidth
  //   );

  //   const s1coords = section1.getBoundingClientRect(); //ამ სექციაზე გადართვა

  //ძველი ხერხით
  //   window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior: "smooth",
  //   });

  //ახალი ხერხით
  section1.scrollIntoView({ behavior: "smooth" }); //ამით ნელ-ნელა ჩამოიწევს გვერდი
});

//მაუსის მიტანისას რეაგირება(hover)
// const h1 = document.querySelector("h1");
// h1.addEventListener("mouseenter", function (e) {
//   alert("tqven naxet es winanadadeba");
// });

//რადგან fatures, operations, testimonials აქვს უკვე გაწერილი სქროლვის href
//ჩვენ ამ მონაკვეთისვთის უნდა შევქმნათ კოდი რათა მაუსის დაწერისას ნელა ჩამოიწიოს
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault(); //ამით ვწყვეტთ ამ კოდის ფუნცქნიორიებას
  console.log(e.target); //ეს მაგალითისთვის დავწერე რო გავიგოთ რაა e.target, - ეს აჩვენებს მაუსის დაჭერისას თუ რომელ ნაწილში ხდება html-ის
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
});

// //DOM traversing

// const h12 = document.querySelector("h1");

// //going downwards: child
// console.log(h12.querySelectorAll(".highlight")); //ამის ჩვენ ვიღებთ ყველა იმ ელემენტს რომელიც ეკუთვნის h12-ს და არის highlight.
// console.log(h12.children); //შვილობილ ელემენტებს გიჩვენებს

// //going upwards : parents
// console.log(h12.parentElement);
// h1.closest(".header").style.background;

// //going sideways : siblings
// console.log(h1.parentElement.children);

//Tabbed component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);

  if (!clicked) return;

  tabs.forEach((t) => t.classList.remove("operations__tab--active")); //ჩაიწიოს დანარჩენი დაჭერისას
  tabsContent.forEach((c) => c.classList.remove("operations__content--active")); //კონტენტი გაქრეს

  //Activate tab
  clicked.classList.add("operations__tab--active"); //აიწიოს ღილაკი აწევისას

  //activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active"); //ახალი კონტენტი გაჩნდეს
});

//Menu fade animation
nav.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});

nav.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});

//sticky navigation menu bar

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//reveal sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

//slide
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
