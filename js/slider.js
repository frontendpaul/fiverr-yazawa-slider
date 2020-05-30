// extend a Siema class by two methods
// addDots - to create a markup for dots
// updateDots - to update classes on dots on change callback
class SiemaWithDots extends Siema {
  addDots() {
    // create a contnier for all dots
    // add a class 'dots' for styling reason
    this.dots = document.createElement("div");
    this.dots.classList.add("dots");

    // loop through slides to create a number of dots
    for (let i = 0; i < this.innerElements.length; i++) {
      // create a dot
      const dot = document.createElement("button");

      // add a class to dot
      dot.classList.add("dots__item");

      // add an event handler to each of them
      dot.addEventListener("click", () => {
        this.goTo(i);
      });

      // append dot to a container for all of them
      this.dots.appendChild(dot);
    }

    // add the container full of dots after selector
    this.selector.parentNode.insertBefore(this.dots, this.selector.nextSibling);
  }

  updateDots() {
    // loop through all dots
    for (let i = 0; i < this.dots.querySelectorAll("button").length; i++) {
      // if current dot matches currentSlide prop, add a class to it, remove otherwise
      const addOrRemove = this.currentSlide === i ? "add" : "remove";
      const visited = this.currentSlide > i ? "add" : "remove";
      this.dots
        .querySelectorAll("button")
        [i].classList[addOrRemove]("dots__item--active");
      this.dots
        .querySelectorAll("button")
        [i].classList[visited]("dots__item--visited");
    }
  }

  updateControlls() {
    const isFirst = this.currentSlide === 0 ? "add" : "remove";
    const isLast = this.currentSlide === (this.innerElements.length - 1) ? "add" : "remove";
    
    document.querySelector(".prev").classList[isFirst]('controlls--inactive');
    document.querySelector(".next").classList[isLast]('controlls--inactive');
  }
}

// const disableControlls = function(instantionOfSiema) {
//   if (instantionOfSiema.currentSlide === 0) {
//     document.querySelector(".prev").classList.add('controlls--inactive');
//   } else {
//     document.querySelector(".prev").classList.remove('controlls--inactive');
//   }

//   if (instantionOfSiema.currentSlide === instantionOfSiema.innerElements.length - 1) {
//     document.querySelector(".next").classList.add('controlls--inactive')
//   } else {
//     document.querySelector(".next").classList.remove('controlls--inactive');
//   }
// }

// instantiate new extended Siema
const mySiemaWithDots = new SiemaWithDots({
  easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
  duration: 500,
  // on init trigger method created above
  onInit: function () {
    this.addDots();
    this.updateDots();
  },

  // on change trigger method created above
  onChange: function () {
    this.updateDots();
    this.updateControlls();
    // disableControlls(mySiemaWithDots);
  },
});


document
  .querySelector(".prev")
  .addEventListener("click", () => {mySiemaWithDots.prev(); console.log('click');
  });
document
  .querySelector(".next")
  .addEventListener("click", () => mySiemaWithDots.next());
