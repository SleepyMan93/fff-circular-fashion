/* Future Fashion Fair — site-wide motion system. Paste into Webflow: Project Settings > Custom Code > Footer Code (site-wide, before </body>). Pairs with motion.css in the Head Code. No dependencies. */
(function(){
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  // solo elements: fade+rise, no stagger
  var SOLO = ".heading-style-h1,.heading-style-h2,.heading-style-h2-2,.heading-style-h3,.heading-style-h4,.heading-style-h5,.heading-style-h6,.text-style-tagline";
  // grouped elements: stagger by position among siblings sharing the same parent + selector
  var GROUP = ".home_cta-2_card,.services_features-list_card-large,.services_features-list_card-small,.case-studies_case-study-list_item,.community_features-list_card-small,.community_features-list_card-large-vertical,.member-box,.about_team_item,.home_customer-logos-list_item,.resources_list_featured-item-link,.collection-item,.services_blog_item,.home_ecosystem-map_item,.footer2_link-column";
  // standalone content images (excludes hero/bg covers + slider/gallery items already covered by GROUP)
  var IMAGES = ".home_feature-2_image,.about_about_image1,.about_about_image2,.about_about_image3,.services_feature_image,.blog-post_header_image,.about_header_image";
  // elements to skip entirely — Webflow already animates these via native interactions
  var SKIP = ".services_feature_item,.community_header_ix-trigger,.blog-post_faq_question,.blog-post_faq_answer";

  function isSkipped(el){ return el.closest && el.closest(SKIP); }

  function prep(selector, staggered){
    var seen = new Map();
    document.querySelectorAll(selector).forEach(function(el){
      if (isSkipped(el)) return;
      el.classList.add("fff-reveal");
      if (staggered){
        var parent = el.parentElement;
        var idx = seen.get(parent) || 0;
        el.style.transitionDelay = Math.min(idx, 6) * 80 + "ms";
        seen.set(parent, idx + 1);
      }
    });
  }
  prep(SOLO, false);
  prep(GROUP, true);
  prep(IMAGES, false);

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        entry.target.classList.add("is-inview");
        io.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.15 });

  document.querySelectorAll(".fff-reveal").forEach(function(el){ io.observe(el); });

  // gentle parallax drift on cta3 background images
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll(".cta3_background-image"));
  if (parallaxEls.length){
    var ticking = false;
    function updateParallax(){
      ticking = false;
      parallaxEls.forEach(function(img){
        var rect = img.parentElement.getBoundingClientRect();
        var vh = window.innerHeight || 800;
        var progress = (vh - rect.top) / (vh + rect.height); // 0 → 1 across viewport
        var shift = (progress - 0.5) * 24; // max ~12px each way
        img.style.setProperty("--fff-parallax", shift.toFixed(1));
      });
    }
    function onScroll(){ if (!ticking){ ticking = true; requestAnimationFrame(updateParallax); } }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateParallax();
  }
})();
