/* ==========================================================================
   C SERPENTS — decorative scroll-linked snake
   --------------------------------------------------------------------------
   Loads GSAP + ScrollTrigger + MotionPathPlugin from a CDN, then animates a
   small snake silhouette sliding down a winding vertical track fixed to the
   right edge of the viewport. Position is driven by how far the visitor has
   scrolled down the page (0% at top, 100% at bottom), looping the track a
   few times on long pages so the motion stays visible throughout.

   Skipped entirely on narrow screens and whenever the visitor's OS has
   "reduce motion" turned on. Pointer-events disabled — never blocks clicks.

   Add this ONE line before </body> on every page:
     <script src="js/snake-scroll.js" defer></script>

   Safe to include site-wide: if the CDN fails to load for any reason, the
   page works exactly as before — this script only ever adds decoration,
   never removes or blocks anything.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var tooNarrow = window.innerWidth < 720;
  if (reduceMotion || tooNarrow) return;

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  var CDN = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/";

  Promise.all([
    loadScript(CDN + "gsap.min.js"),
    loadScript(CDN + "ScrollTrigger.min.js"),
    loadScript(CDN + "MotionPathPlugin.min.js")
  ])
    .then(init)
    .catch(function () {
      /* CDN unreachable — fail silently, no decoration, no error to the visitor */
    });

  function init() {
    if (!window.gsap || !window.ScrollTrigger || !window.MotionPathPlugin) return;
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    var svgNS = "http://www.w3.org/2000/svg";

    // ---- fixed overlay, right edge, full viewport height ----
    var wrap = document.createElement("div");
    wrap.setAttribute("aria-hidden", "true");
    wrap.style.cssText = [
      "position:fixed",
      "top:0",
      "right:0",
      "width:110px",
      "height:100vh",
      "pointer-events:none",
      "z-index:4",
      "opacity:0.8",
      "mix-blend-mode:normal"
    ].join(";");

    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 110 400");
    svg.setAttribute("width", "110");
    svg.setAttribute("height", "100%");
    svg.setAttribute("preserveAspectRatio", "none");

    // winding vertical S-track the snake will follow, looped visually
    var trackData =
      "M55,10 C10,55 100,95 55,140 " +
      "C10,185 100,225 55,270 " +
      "C10,315 100,355 55,400 " +
      "C10,445 100,480 55,540";
    var track = document.createElementNS(svgNS, "path");
    track.setAttribute("d", trackData);
    track.setAttribute("id", "snakeTrack");
    track.setAttribute("fill", "none");
    track.setAttribute("stroke", "none");
    svg.appendChild(track);

    // simple tapered snake silhouette (wide "head" end tapering to a thin tail),
    // now with a dark outline so it reads clearly against any background
    var snake = document.createElementNS(svgNS, "g");
    snake.setAttribute("id", "snakeBody");
    snake.innerHTML =
      '<path d="M0,-30 C11,-30 16,-16 14,-4 C11,9 4,20 0,30 ' +
      'C-4,20 -11,9 -14,-4 C-16,-16 -11,-30 0,-30 Z" fill="#B1CA07" stroke="#12150a" stroke-width="1.5"/>' +
      '<circle cx="4.5" cy="-20" r="2.4" fill="#12150a"/>';
    svg.appendChild(snake);

    wrap.appendChild(svg);
    document.body.appendChild(wrap);

    // loop the track a few times across the full page length so the
    // snake keeps moving even on long pages, instead of one slow single pass
    var loops = Math.max(1, Math.round(document.documentElement.scrollHeight / 900));

    gsap.to(snake, {
      motionPath: {
        path: "#snakeTrack",
        align: "#snakeTrack",
        alignOrigin: [0.5, 0.5],
        autoRotate: true
      },
      repeat: loops - 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6
      }
    });

    // recalc loop count if the page's content height changes (e.g. images
    // loading late, FAQ accordions opening) so the effect stays in sync
    window.addEventListener("load", function () {
      ScrollTrigger.refresh();
    });
  }
})();
