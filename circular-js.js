window.initFFFCircularFashionAnimations = function () {
  if (typeof gsap === "undefined") {
    console.warn("GSAP has not loaded.");
    return;
  }

  console.log("Initialising FFF animations...");

  /*
  ==========================================
  CONNECTOR ROTATION
  ==========================================
  */

  const connectors = document.getElementById("fff-connectors");
  let connectorTimeline = null;

  if (connectors) {
    gsap.killTweensOf(connectors);

    gsap.to(connectors, {
      rotation: "+=360",
      svgOrigin: "237.597 186.737",
      duration: 5,
      ease: "power1.inOut"
    });

    connectorTimeline = gsap.timeline({
      repeat: -1
    });

    connectorTimeline
      .to(connectors, {
        rotation: "+=360",
        duration: 5,
        ease: "power1.inOut"
      })
      .to({}, {
        duration: 2.5
      });
  } else {
    console.warn("Missing SVG group ID: fff-connectors");
  }

  /*
  ==========================================
  CONNECTOR HOVER CONTROL
  ==========================================
  */

  function stopConnectorRotation() {
    if (!connectorTimeline) return;

    gsap.to(connectorTimeline, {
      timeScale: 0,
      duration: 0.8,
      ease: "power2.out",
      overwrite: true
    });
  }

  function resumeConnectorRotation() {
    if (!connectorTimeline) return;

    gsap.to(connectorTimeline, {
      timeScale: 1,
      duration: 0.8,
      ease: "power2.inOut",
      overwrite: true
    });
  }

  /*
  ==========================================
  NODE HOVER COLOURS + TAG EXPANSION
  ==========================================
  */

  function setupNodeHover({
    hoverId,
    frontId,
    floorId,
    frontColour,
    floorColour,
    tagBoxId,
    tagExpandedWidth
  }) {
    const hover = document.getElementById(hoverId);
    const front = document.getElementById(frontId);
    const floor = document.getElementById(floorId);
    const tagBox = document.getElementById(tagBoxId);

    if (!hover || !front || !floor) {
      console.warn("Missing node hover elements:", {
        hoverId,
        frontId,
        floorId
      });

      return;
    }

    if (!tagBox) {
      console.warn("Missing tag box:", tagBoxId);
    }

    const originalFront =
      front.getAttribute("fill") ||
      window.getComputedStyle(front).fill;

    const originalFloor =
      floor.getAttribute("fill") ||
      window.getComputedStyle(floor).fill;

    const originalTagWidth = tagBox
      ? Number(tagBox.getAttribute("width"))
      : null;

    hover.style.cursor = "pointer";

    hover.addEventListener("mouseenter", function () {
      stopConnectorRotation();

      gsap.to(front, {
        fill: frontColour,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true
      });

      gsap.to(floor, {
        fill: floorColour,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true
      });

      if (tagBox) {
        gsap.to(tagBox, {
          attr: {
            width: tagExpandedWidth
          },
          duration: 0.45,
          ease: "power3.out",
          overwrite: true
        });
      }
    });

    hover.addEventListener("mouseleave", function () {
      resumeConnectorRotation();

      gsap.to(front, {
        fill: originalFront,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true
      });

      gsap.to(floor, {
        fill: originalFloor,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true
      });

      if (tagBox && originalTagWidth !== null) {
        gsap.to(tagBox, {
          attr: {
            width: originalTagWidth
          },
          duration: 0.35,
          ease: "power2.inOut",
          overwrite: true
        });
      }
    });
  }

  /*
  ==========================================
  EXTENDERS
  Main: #7729DD
  ==========================================
  */

  setupNodeHover({
    hoverId: "node-extenders",
    frontId: "extenders-base-front-panel",
    floorId: "extenders-base-floor",
    frontColour: "#8B46E7",
    floorColour: "#A86BEE",
    tagBoxId: "fff-extenders-tag-box",
    tagExpandedWidth: 56
  });

  /*
  ==========================================
  RECYCLERS
  Main: #153D24
  ==========================================
  */

  setupNodeHover({
    hoverId: "node-recyclers",
    frontId: "recyclers-base-front-panel",
    floorId: "recyclers-base-floor",
    frontColour: "#23633A",
    floorColour: "#378B52",
    tagBoxId: "fff-recyclers-tag-box",
    tagExpandedWidth: 56
  });

  /*
  ==========================================
  REMANUFACTURING
  Main: #2F126F
  ==========================================
  */

  setupNodeHover({
    hoverId: "node-remanufacturing",
    frontId: "remanufacturing-base-front-panel",
    floorId: "remanufacturing-base-floor",
    frontColour: "#48239A",
    floorColour: "#6540BF",
    tagBoxId: "fff-remanufacturing-tag-box",
    tagExpandedWidth: 56
  });

  /*
  ==========================================
  RETAILERS
  Main: #E88352
  ==========================================
  */

  setupNodeHover({
    hoverId: "node-retailers",
    frontId: "retailers-base-front-panel",
    floorId: "retailers-base-floor",
    frontColour: "#F1996F",
    floorColour: "#F5B08C",
    tagBoxId: "fff-retailers-tag-box",
    tagExpandedWidth: 56
  });

  console.log("FFF animations loaded.");
};