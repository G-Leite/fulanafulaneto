// Carrossel simples com scroll-snap: setas, bolinhas e swipe nativo no celular.
(function () {
  "use strict";

  document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
    var track = carousel.querySelector("[data-track]");
    var slides = Array.prototype.slice.call(track.children);
    var prev = carousel.querySelector("[data-prev]");
    var next = carousel.querySelector("[data-next]");
    var dotsBox = carousel.querySelector("[data-dots]");
    var dots = [];

    // Cria uma bolinha por slide
    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel__dot";
      dot.setAttribute("aria-label", "Ir para a foto " + (i + 1));
      dot.addEventListener("click", function () { goTo(i); });
      dotsBox.appendChild(dot);
      dots.push(dot);
    });

    function current() {
      return Math.round(track.scrollLeft / track.clientWidth) || 0;
    }

    function goTo(index) {
      var last = slides.length - 1;
      var target = index < 0 ? last : index > last ? 0 : index; // volta ao início/fim
      track.scrollTo({ left: slides[target].offsetLeft - track.offsetLeft, behavior: "smooth" });
    }

    function updateDots() {
      var active = current();
      dots.forEach(function (dot, i) {
        dot.setAttribute("aria-current", i === active ? "true" : "false");
      });
    }

    prev.addEventListener("click", function () { goTo(current() - 1); });
    next.addEventListener("click", function () { goTo(current() + 1); });

    track.addEventListener("scroll", function () {
      window.requestAnimationFrame(updateDots);
    }, { passive: true });

    // Setas do teclado quando o carrossel está focado
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(current() - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(current() + 1); }
    });

    updateDots();
  });
})();
