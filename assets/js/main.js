

document.addEventListener('DOMContentLoaded', () => {
  // 1. Page Loader Overlay Fade-out
  const loaderOverlay = document.getElementById('loader-overlay');
  if (loaderOverlay) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loaderOverlay.classList.add('loaded');
        document.body.classList.add('page-loaded');
      }, 500); // Gives a brief elegant transition feel
    });

    // Fallback if load event doesn't fire fast enough
    setTimeout(() => {
      if (!loaderOverlay.classList.contains('loaded')) {
        loaderOverlay.classList.add('loaded');
        document.body.classList.add('page-loaded');
      }
    }, 2500);
  }

  // 2. Sticky Header and Scroll Progress Bar
  const header = document.querySelector('.main-header');
  const scrollProgressBar = document.querySelector('.scroll-progress-bar');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Header Scroll State
    if (header) {
      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll Progress
    if (scrollProgressBar && docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // Back to Top Visibility
    if (backToTopBtn) {
      if (scrollTop > 500) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });

  // Scroll to Top action
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Mobile Navigation Drawer
  const mobileToggleBtn = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const mobileDrawerLinks = document.querySelectorAll('.mobile-nav-link');

  let scrollPosition = 0;

  function openDrawer() {
    mobileToggleBtn.classList.add('open');
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollPosition}px`;
  }

  function closeDrawer() {
    mobileToggleBtn.classList.remove('open');
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
    document.body.style.height = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
  }

  if (mobileToggleBtn && mobileDrawer && drawerOverlay) {
    mobileToggleBtn.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    drawerOverlay.addEventListener('click', closeDrawer);

    mobileDrawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // 4. Set Navigation Active Links
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop() || 'index.html';

  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === pageName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 5. Apple-style Smooth Page Fade Transition
  const internalLinks = document.querySelectorAll('a[href$=".html"]:not([target="_blank"]):not([href^="#"])');
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetUrl = link.href;

      e.preventDefault();

      if (loaderOverlay) {
        loaderOverlay.classList.remove('loaded');
      }
      document.body.classList.remove('page-loaded');

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 400); // Match transition length
    });
  });

  // 6. Current Year for Copyright Info
  const copyrightYearSpan = document.getElementById('copyright-year');
  if (copyrightYearSpan) {
    copyrightYearSpan.textContent = new Date().getFullYear();
  }
});
