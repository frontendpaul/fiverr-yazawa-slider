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

  // Add middle circle to visited dots
  updateControls() {
    const isFirst = this.currentSlide === 0 ? "add" : "remove";
    const isLast =
      this.currentSlide === this.innerElements.length - 1 ? "add" : "remove";

    document.querySelector(".prev").classList[isFirst]("controls--inactive");
    document.querySelector(".next").classList[isLast]("controls--inactive");
  }
}


// instantiate new extended Siema
const mySiemaWithDots = new SiemaWithDots({
  easing: "cubic-bezier(0.76, 0, 0.24, 1)",
  duration: 500,
  // on init trigger method created above
  onInit: function () {
    this.addDots();
    this.updateDots();
  },

  // on change trigger method created above
  onChange: function () {
    this.updateDots();
    this.updateControls();
    // disableControls(mySiemaWithDots);
  },
});


// Controls 
document
  .querySelector(".prev")
  .addEventListener("click", () => mySiemaWithDots.prev());
document
  .querySelector(".next")
  .addEventListener("click", () => mySiemaWithDots.next());


// Modal Handling
const card1 = document.querySelector("#card-1");
const card2 = document.querySelector("#card-2");
const card3 = document.querySelector("#card-3");
const modal1 = document.querySelector("#answer-1");
const modal2 = document.querySelector("#answer-2");
const modal3 = document.querySelector("#answer-3");
const modalWrappers = document.querySelectorAll(".modal-wrapper");
const closeBtns = document.querySelectorAll(".modal__btn");

card1.addEventListener("click", () => modal1.classList.toggle("is-active"));
card2.addEventListener("click", () => modal2.classList.toggle("is-active"));
card3.addEventListener("click", () => modal3.classList.toggle("is-active"));

for (const btn of closeBtns) {
  btn.addEventListener("click", () => {
    for (const wrapper of modalWrappers) {
      wrapper.classList.remove("is-active");
    }
  });
}
