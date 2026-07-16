/* Future Fashion Fair — animation utility library engine. Paste into Webflow Footer Code (after motion.js,
   before </body>). Pairs with reveal.css in Head Code.

USAGE — add ONE trigger class to any element:
  fff-fade-up / fff-fade-down / fff-fade-left / fff-fade-right / fff-fade-in
  fff-scale-in / fff-blur-in / fff-pop-in (bouncy) / fff-flip-in (3D) / fff-rotate-in / fff-mask-reveal (wipe)

Optional per-element tuning via data attrs:
  data-fff-delay="200"     ms, added on top of any stagger delay
  data-fff-duration="1200" ms, overrides the default .8s
  data-fff-ease="cubic-bezier(.22,1,.36,1)"

Optional hover classes (no JS needed, pure CSS): fff-hover-grow, fff-hover-lift, fff-hover-tilt, fff-hover-glow

Stagger a group of children automatically — put fff-stagger on the PARENT:
  <div class="fff-stagger" data-fff-stagger-step="90">
    <div class="fff-fade-up">...</div>   // delay 0ms
    <div class="fff-fade-up">...</div>   // delay 90ms
    <div class="fff-fade-up">...</div>   // delay 180ms
  </div>

Waterfall — put fff-waterfall on the PARENT (masonry/grid cards). Combines stagger with a
slight alternating rotate + longer travel for a bouncier "falling into place" feel. Children
still need their own trigger class (fff-fade-up / fff-scale-in / fff-pop-in work best).
  <div class="fff-waterfall" data-fff-stagger-step="110">
    <div class="fff-pop-in">card 1</div>
    <div class="fff-pop-in">card 2</div>
  </div>
*/
(function(){
  "use strict";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var TRIGGERS = ".fff-fade-up,.fff-fade-down,.fff-fade-left,.fff-fade-right,.fff-fade-in,.fff-scale-in,.fff-blur-in,.fff-pop-in,.fff-flip-in,.fff-rotate-in,.fff-mask-reveal";

  function applyVars(el, delayMs){
    if (delayMs != null) el.style.setProperty("--fff-delay", delayMs + "ms");
    var d = el.getAttribute("data-fff-duration");
    if (d) el.style.setProperty("--fff-dur", d + "ms");
    var e = el.getAttribute("data-fff-ease");
    if (e) el.style.setProperty("--fff-ease", e);
  }

  // stagger containers: number direct children that carry a trigger class
  document.querySelectorAll(".fff-stagger,.fff-waterfall").forEach(function(parent){
    var step = parseInt(parent.getAttribute("data-fff-stagger-step"), 10) || 90;
    var isWaterfall = parent.classList.contains("fff-waterfall");
    var i = 0;
    Array.prototype.forEach.call(parent.children, function(child){
      if (!child.matches(TRIGGERS)) return;
      var extra = parseInt(child.getAttribute("data-fff-delay"), 10) || 0;
      applyVars(child, i * step + extra);
      if (isWaterfall){
        var rot = (i % 2 === 0 ? 1 : -1) * (2 + (i % 3));
        child.style.setProperty("--fff-waterfall-rot", rot + "deg");
        var prevTransform = getComputedStyle(child).transform;
        child.dataset.fffWaterfall = "1";
        child.style.transitionTimingFunction = "cubic-bezier(.22,1.2,.36,1)";
      }
      i++;
    });
  });

  // any trigger element NOT inside a stagger/waterfall container still gets its own data-fff-delay
  document.querySelectorAll(TRIGGERS).forEach(function(el){
    if (el.closest(".fff-stagger,.fff-waterfall")) { applyVars(el, null); return; }
    var extra = parseInt(el.getAttribute("data-fff-delay"), 10) || 0;
    applyVars(el, extra);
  });

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        entry.target.classList.add("is-inview");
        io.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

  document.querySelectorAll(TRIGGERS).forEach(function(el){ io.observe(el); });
})();
