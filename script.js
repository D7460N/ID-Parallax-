// Parallax scroll handler - data only, no UI logic
(function() {
  const layers = {
    background: document.querySelector('[ref="background-layer"]'),
    middle: document.querySelector('[ref="middle-layer"]'),
    foreground: document.querySelector('[ref="foreground-layer"]')
  };
  
  const speeds = {
    background: 0.3,
    middle: 0.4,
    foreground: 0.5
  };
  
  // Mobile detection for offset adjustment
  let foregroundOffset = calculateForegroundOffset();
  
  function calculateForegroundOffset() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    return isMobile ? window.innerHeight * 0.6 : window.innerHeight * 0.5;
  }
  
  function updateParallax() {
    const scrollY = window.scrollY;
    
    // Apply transforms based on scroll position and speed
    if (layers.background) {
      layers.background.style.transform = `translateY(${scrollY * speeds.background}px)`;
    }
    
    if (layers.middle) {
      layers.middle.style.transform = `translateY(${scrollY * speeds.middle}px)`;
    }
    
    if (layers.foreground) {
      // Foreground starts offset and moves up
      const foregroundY = foregroundOffset - (scrollY * speeds.foreground);
      layers.foreground.style.transform = `translateY(${foregroundY}px)`;
    }
  }
  
  // Throttle scroll events for performance
  let ticking = false;
  
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  // Initial update
  updateParallax();
  
  // Listen to scroll
  window.addEventListener('scroll', onScroll, { passive: true });
  
  // Handle resize for mobile offset recalculation
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      foregroundOffset = calculateForegroundOffset();
      updateParallax();
    }, 250);
  }, { passive: true });
})();
