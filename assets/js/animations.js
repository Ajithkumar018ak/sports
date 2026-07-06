/* ==========================================================================
   APPLE-INSPIRED INTERACTION & ANIMATION ENGINE (animations.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Scroll Reveal Intersection Observer
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserverOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Trigger counter increment animation if this is a counter element
        if (entry.target.classList.contains('counter-item')) {
          animateCounter(entry.target.querySelector('.counter-number'));
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // 2. Animated Numerical Counters (0 to Target)
  function animateCounter(counterElement) {
    if (!counterElement || counterElement.dataset.animated === 'true') return;
    
    counterElement.dataset.animated = 'true';
    const targetText = counterElement.innerText.trim();
    const isPlus = targetText.includes('+');
    const isPercent = targetText.includes('%');
    const targetValue = parseInt(targetText.replace(/[^0-9]/g, ''), 10);
    
    if (isNaN(targetValue)) return;
    
    let startValue = 0;
    const duration = 2000; // Animation duration in milliseconds
    const frameRate = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;
    
    const timer = setInterval(() => {
      frame++;
      // Easing curve (easeOutQuad)
      const progress = frame / totalFrames;
      const easedProgress = progress * (2 - progress);
      const currentValue = Math.round(startValue + (targetValue - startValue) * easedProgress);
      
      counterElement.innerText = `${currentValue}${isPercent ? '%' : ''}${isPlus ? '+' : ''}`;
      
      if (frame >= totalFrames) {
        clearInterval(timer);
        counterElement.innerText = targetText; // Ensure exact final text
      }
    }, frameRate);
  }

  // 3. Magnetic Hover Buttons (Smooth alignment attraction)
  const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .social-icon, .carousel-arrow, .back-to-top');

  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const bound = btn.getBoundingClientRect();
      // Distance of mouse from the center of the button
      const mouseX = e.clientX - bound.left - bound.width / 2;
      const mouseY = e.clientY - bound.top - bound.height / 2;
      
      // Pull effect factor (max translation of 8px)
      const strength = 0.35; 
      btn.style.transform = `translate(${mouseX * strength}px, ${mouseY * strength}px) scale(1.03)`;
      btn.style.transition = 'transform 0.1s ease-out';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });

  // 4. Click Ripple Button Effect
  const buttonsWithRipple = document.querySelectorAll('.btn, .social-icon, .carousel-arrow, .filter-btn, .faq-header');
  
  buttonsWithRipple.forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Prevent double triggers if clicked quickly
      const existingRipple = this.querySelector('.ripple');
      if (existingRipple) {
        existingRipple.remove();
      }

      const bound = this.getBoundingClientRect();
      const x = e.clientX - bound.left;
      const y = e.clientY - bound.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      
      // Compute size of button to cover fully
      const size = Math.max(bound.width, bound.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x - size / 2}px`;
      ripple.style.top = `${y - size / 2}px`;
      
      this.appendChild(ripple);
      
      // Remove ripple element after animation finishes
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // 5. Card Mouse Follow Highlight (Spotlight mouse interaction)
  const highlightCards = document.querySelectorAll('.card-lift, .wcu-card, .event-card, .blog-card');
  
  highlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Set variables for CSS radial gradient spotlight highlights
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 6. Infinite Marquee Auto-Duplication
  const marqueeTracks = document.querySelectorAll('.marquee-track');
  marqueeTracks.forEach(track => {
    const originalContent = track.innerHTML;
    // Duplicate content twice to prevent white voids at high screen width
    track.innerHTML = originalContent + originalContent + originalContent;
  });

  // 7. Parallax Scrolling Elements
  const parallaxLayers = document.querySelectorAll('[data-parallax-speed]');
  if (parallaxLayers.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      parallaxLayers.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-parallax-speed') || '0.1');
        const offset = scrollY * speed;
        layer.style.transform = `translateY(${offset}px)`;
      });
    });
  }
});
