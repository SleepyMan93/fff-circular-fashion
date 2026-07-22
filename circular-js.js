window.initFFFCircularFashionAnimations = function () {
  if (typeof gsap === "undefined") {
    console.warn("GSAP has not loaded.");
    return;
  }

  const connectors = document.getElementById("fff-connectors");

  if (!connectors) {
    console.warn("Missing SVG group ID: fff-connectors");
    return;
  }

  // Stops duplicate animations if the initializer runs twice.
  gsap.killTweensOf(connectors);

  gsap.set(connectors, {
    transformBox: "fill-box",
    transformOrigin: "center center"
  });

  gsap.to(connectors, {
    rotation: 360,
    duration: 18,
    ease: "none",
    repeat: -1
  });

  console.log("FFF connector rotation loaded.");
};