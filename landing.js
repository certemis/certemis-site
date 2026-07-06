/* Landing scroll choreography (index only).
   - [data-tilt]  : the app mockup un-tilts (rotateX 10° -> 0, scale .955 -> 1)
                    as it travels from below the fold to mid-viewport — Linear-style.
   - [data-plx]   : slow parallax for glow layers (factor = attribute value).
   Uses one rAF-throttled scroll handler; disabled entirely under
   prefers-reduced-motion (CSS shows final states). */
(function () {
  "use strict";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var tilt = document.querySelector("[data-tilt]");
  var plx = Array.prototype.slice.call(document.querySelectorAll("[data-plx]"));
  if (!tilt && !plx.length) return;

  var ticking = false;

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  function update() {
    ticking = false;
    var vh = window.innerHeight;

    if (tilt) {
      // progress 0 -> 1 as the mockup's top moves from 92% to 45% of the viewport
      var r = tilt.getBoundingClientRect();
      var p = clamp01((0.92 - r.top / vh) / 0.47);
      // ease-out for a settled, premium landing
      var e = 1 - Math.pow(1 - p, 3);
      tilt.style.setProperty("--rx", (10 * (1 - e)).toFixed(2) + "deg");
      tilt.style.setProperty("--sc", (0.955 + 0.045 * e).toFixed(4));
      tilt.style.setProperty("--ty", (18 * (1 - e)).toFixed(1) + "px");
    }

    for (var i = 0; i < plx.length; i++) {
      var f = parseFloat(plx[i].getAttribute("data-plx")) || 0.2;
      plx[i].style.transform = "translateY(" + (window.scrollY * f).toFixed(1) + "px)";
    }
  }

  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
})();
