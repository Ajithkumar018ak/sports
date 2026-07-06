/* ==========================================================================
   PREMIUM TOUCH-SWIPE INFINITE AUTOPLAY CAROUSEL (carousel.js)
   ========================================================================== */

class PremiumCarousel {
  constructor(container) {
    if (!container) return;
    this.container = container;
    this.track = container.querySelector('.carousel-track');
    this.slides = Array.from(this.track.children);
    this.nextBtn = container.querySelector('.carousel-arrow.next');
    this.prevBtn = container.querySelector('.carousel-arrow.prev');
    this.dotsContainer = container.querySelector('.carousel-dots');
    
    if (this.slides.length === 0) return;

    this.currentIndex = 0;
    this.slideCount = this.slides.length;
    this.autoplayDelay = 5000;
    this.autoplayTimer = null;
    
    // Drag & Swipe states
    this.isDragging = false;
    this.startX = 0;
    this.currentTranslate = 0;
    this.prevTranslate = 0;
    this.dragThreshold = 100; // Pixels needed to swipe
    this.animationId = 0;

    this.init();
  }

  init() {
    this.setupDots();
    this.updateCarousel();
    this.startAutoplay();
    this.registerEvents();
    
    // Resize listener to prevent offsets on viewport changes
    window.addEventListener('resize', () => {
      this.setPositionByIndex();
    });
  }

  setupDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < this.slideCount; i++) {
      const dot = document.createElement('div');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        this.goToSlide(i);
        this.resetAutoplay();
      });
      this.dotsContainer.appendChild(dot);
    }
    this.dots = Array.from(this.dotsContainer.children);
  }

  updateCarousel() {
    // Set scale & opacity for slides
    this.slides.forEach((slide, idx) => {
      if (idx === this.currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update dot indicators
    if (this.dots) {
      this.dots.forEach((dot, idx) => {
        if (idx === this.currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    this.setPositionByIndex();
  }

  setPositionByIndex() {
    const width = this.container.offsetWidth;
    this.currentTranslate = -this.currentIndex * width;
    this.prevTranslate = this.currentTranslate;
    this.setTrackPosition(this.currentTranslate);
  }

  setTrackPosition(translate) {
    this.track.style.transform = `translateX(${translate}px)`;
  }

  goToSlide(index) {
    this.currentIndex = index;
    // Circular bounds check
    if (this.currentIndex >= this.slideCount) this.currentIndex = 0;
    if (this.currentIndex < 0) this.currentIndex = this.slideCount - 1;
    
    this.track.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    this.updateCarousel();
  }

  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentIndex - 1);
  }

  startAutoplay() {
    this.autoplayTimer = setInterval(() => {
      this.nextSlide();
    }, this.autoplayDelay);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
    }
  }

  resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }

  registerEvents() {
    // Navigation Button events
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.resetAutoplay();
      });
    }
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.resetAutoplay();
      });
    }

    // Mouse and Touch dragging events
    this.container.addEventListener('mousedown', (e) => this.dragStart(e));
    this.container.addEventListener('touchstart', (e) => this.dragStart(e), { passive: true });
    
    window.addEventListener('mousemove', (e) => this.dragMove(e));
    window.addEventListener('touchmove', (e) => this.dragMove(e), { passive: true });
    
    window.addEventListener('mouseup', () => this.dragEnd());
    window.addEventListener('touchend', () => this.dragEnd());
    
    // Prevent image drag defaults
    this.container.addEventListener('dragstart', (e) => e.preventDefault());
  }

  dragStart(e) {
    this.isDragging = true;
    this.stopAutoplay();
    this.startX = this.getPositionX(e);
    this.track.style.transition = 'none'; // Instant response during drag
    this.animationId = requestAnimationFrame(() => this.dragAnimation());
  }

  dragMove(e) {
    if (!this.isDragging) return;
    const currentX = this.getPositionX(e);
    const diff = currentX - this.startX;
    this.currentTranslate = this.prevTranslate + diff;
  }

  dragEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    cancelAnimationFrame(this.animationId);
    
    const movedBy = this.currentTranslate - this.prevTranslate;
    
    if (movedBy < -this.dragThreshold) {
      this.nextSlide();
    } else if (movedBy > this.dragThreshold) {
      this.prevSlide();
    } else {
      // Snap back to original
      this.goToSlide(this.currentIndex);
    }
    
    this.startAutoplay();
  }

  getPositionX(e) {
    return e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
  }

  dragAnimation() {
    if (this.isDragging) {
      this.setTrackPosition(this.currentTranslate);
      requestAnimationFrame(() => this.dragAnimation());
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.carousel-container');
  if (container) {
    new PremiumCarousel(container);
  }
});
