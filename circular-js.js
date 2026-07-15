window.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined") {
    console.warn("GSAP has not loaded.");
    return;
  }

  function getEl(id) {
    const el = document.getElementById(id);
    if (!el) console.warn("Missing SVG layer ID:", id);
    return el;
  }

  function setSvgOrigin(id, origin) {
    const el = getEl(id);
    if (!el) return null;

    gsap.set(el, {
      transformBox: "fill-box",
      transformOrigin: origin
    });

    return el;
  }

  /*
  ------------------------------------------
  EXTENDERS — WASHER DOOR
  Opens slightly from right side
  ------------------------------------------
  */
  const washerDoor = setSvgOrigin("extenders-washer-door", "right center");

  if (washerDoor) {
    gsap.to(washerDoor, {
      rotation: -16,
      duration: 1.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      repeatDelay: 2.2
    });
  }

  /*
  ------------------------------------------
  EXTENDERS — WASHER BUTTONS
  ------------------------------------------
  */
  function flashButton(id, activeFill, totalCycle, activeDuration) {
    const el = getEl(id);
    if (!el) return;

    const originalFill =
      el.getAttribute("fill") ||
      window.getComputedStyle(el).fill ||
      "#ffffff";

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(el, {
      fill: activeFill,
      duration: activeDuration,
      ease: "none"
    })
    .to(el, {
      fill: originalFill,
      duration: activeDuration,
      ease: "none"
    })
    .to({}, {
      duration: Math.max(0, totalCycle - activeDuration * 2)
    });
  }

  flashButton("extenders-washer-button-01", "#4CAF50", 5, 0.25);
  flashButton("extenders-washer-button-02", "#F2C94C", 3.5, 0.22);

  /*
  ------------------------------------------
  EXTENDERS — COTTON ROLL
  Small roll movement down/up workbench
  ------------------------------------------
  */
  const cotton = setSvgOrigin("extenders-workbench-cotton-01", "center center");

  if (cotton) {
    gsap.to(cotton, {
      x: -10,
      y: -6,
      rotation: -12,
      duration: 2.1,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      repeatDelay: 0.8
    });
  }

  /*
  ------------------------------------------
  RETAILERS — GARMENT SWAY
  Different timings so they don't sync
  ------------------------------------------
  */
  function swayGarment(id, rotation, duration, delay) {
    const el = setSvgOrigin(id, "top center");
    if (!el) return;

    gsap.to(el, {
      rotation: rotation,
      duration: duration,
      delay: delay,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
  }

  swayGarment("retailers-garment-01", 1.7, 2.8, 0.1);
  swayGarment("retailers-garment-02", -1.3, 3.6, 0.7);
  swayGarment("retailers-garment-03", 1.1, 4.2, 1.1);

  /*
  ------------------------------------------
  RETAILERS — SHOP DOOR
  Shrinks from left side, right side anchored
  Open 3s, hold, close 3s, pause 7s
  ------------------------------------------
  */
  const shopDoor = setSvgOrigin("retailers-shop-door", "right center");

  if (shopDoor) {
    const doorTl = gsap.timeline({ repeat: -1 });

    doorTl
      .to(shopDoor, {
        scaleX: 0.18,
        duration: 3,
        ease: "sine.inOut"
      })
      .to({}, {
        duration: 1.2
      })
      .to(shopDoor, {
        scaleX: 1,
        duration: 3,
        ease: "sine.inOut"
      })
      .to({}, {
        duration: 7
      });
  }

  /*
  ------------------------------------------
  RECYCLERS — SMOKE
  Fade/grow but never above original opacity
  ------------------------------------------
  */
  function animateSmoke(id, duration, delay) {
    const el = setSvgOrigin(id, "center bottom");
    if (!el) return;

    const originalOpacity = Number(gsap.getProperty(el, "opacity") || 1);
    const peakOpacity = Math.min(originalOpacity, 0.8);
    const lowOpacity = Math.max(0.08, originalOpacity * 0.28);

    gsap.set(el, {
      opacity: lowOpacity,
      scaleY: 0.92
    });

    gsap.to(el, {
      opacity: peakOpacity,
      scaleY: 1.12,
      duration: duration,
      delay: delay,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
  }

  animateSmoke("recyclers-smoke-01", 2.8, 0);
  animateSmoke("recyclers-smoke-02", 3.7, 0.8);
  animateSmoke("recyclers-smoke-03", 4.4, 1.4);

  console.log("FFF circular fashion SVG animations loaded.");
});