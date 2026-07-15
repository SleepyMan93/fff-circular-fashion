window.initFFFCircularFashionAnimations = function () {
  if (typeof gsap === "undefined") {
    console.warn("GSAP has not loaded.");
    return;
  }

  const svgTarget = document.getElementById("fff-svg-target");

  function getEl(id) {
    const el = document.getElementById(id);

    if (!el) {
      console.warn("Missing SVG layer ID:", id);
      return null;
    }

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

  function getFillChildren(group) {
    if (!group) return [];

    const children = Array.from(
      group.querySelectorAll("path, circle, ellipse, rect, polygon, polyline")
    );

    return children.filter((child) => {
      const fill = child.getAttribute("fill");
      return fill && fill !== "none" && fill !== "transparent";
    });
  }

  console.log("Running FFF SVG animation setup...");

  /*
  ------------------------------------------
  EXTENDERS — WASHER DOOR
  Group animation.
  Opens slightly from the right side.
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
  These are groups, so we animate their child fills.
  ------------------------------------------
  */
  function flashButtonGroup(id, activeFill, totalCycle, activeDuration) {
    const group = getEl(id);
    if (!group) return;

    const fillChildren = getFillChildren(group);

    if (!fillChildren.length) {
      console.warn("No fillable children found inside:", id);
      return;
    }

    fillChildren.forEach((child) => {
      const originalFill =
        child.getAttribute("fill") ||
        window.getComputedStyle(child).fill ||
        "#ffffff";

      const tl = gsap.timeline({ repeat: -1 });

      tl.to(child, {
        fill: activeFill,
        duration: activeDuration,
        ease: "none"
      })
        .to(child, {
          fill: originalFill,
          duration: activeDuration,
          ease: "none"
        })
        .to({}, {
          duration: Math.max(0, totalCycle - activeDuration * 2)
        });
    });
  }

  flashButtonGroup("extenders-washer-button-01", "#4CAF50", 5, 0.25);
  flashButtonGroup("extenders-washer-button-02", "#F2C94C", 3.5, 0.22);

  /*
  ------------------------------------------
  EXTENDERS — COTTON ROLL
  Group animation.
  Small roll movement up-left and back.
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
  Group animation.
  Only garment 01 and 02 exist in the current SVG.
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

  /*
  ------------------------------------------
  RETAILERS — SHOP DOOR
  Group animation.
  Shrinks from left side, right side anchored.
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
  Group animation.
  Fade/grow but never above original opacity.
  ------------------------------------------
  */
  function animateSmoke(id, duration, delay) {
    const el = setSvgOrigin(id, "center bottom");
    if (!el) return;

    const originalOpacity = Number(gsap.getProperty(el, "opacity") || 1);
    const peakOpacity = Math.min(originalOpacity, 0.72);
    const lowOpacity = Math.max(0.08, originalOpacity * 0.25);

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
};
