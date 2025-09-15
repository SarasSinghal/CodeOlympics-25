/* ========================================
   RESPONSIVE.JS - RESPONSIVE NAVIGATION
   Code Olympics 2025
   
   Include this file AFTER your existing script.js
======================================== */

/* ========================================
   RESPONSIVE NAVIGATION MENU
======================================== */

/**
 * Toggles the side navigation menu open and closed
 */
function toggleMenu() {
  const sideMenu = document.getElementById("sideMenu");
  const hamburger = document.querySelector(".hamburger");
  const body = document.body;

  if (sideMenu) {
    const isOpen = sideMenu.style.width === "280px";
    
    if (isOpen) {
      // Close menu
      sideMenu.style.width = "0";
      body.style.overflow = "auto";
      hamburger?.classList.remove("active");
      
      // Update ARIA attributes
      hamburger?.setAttribute('aria-expanded', 'false');
      
      // Remove backdrop
      removeBackdrop();
    } else {
      // Open menu
      sideMenu.style.width = "280px";
      body.style.overflow = "hidden"; // Prevent background scrolling
      hamburger?.classList.add("active");
      
      // Update ARIA attributes
      hamburger?.setAttribute('aria-expanded', 'true');
      
      // Add backdrop
      addBackdrop();
      
      // Focus first menu item for accessibility
      setTimeout(() => {
        const firstLink = sideMenu.querySelector('a:not(.closebtn)');
        firstLink?.focus();
      }, 300);
    }
  }
}

/**
 * Add backdrop overlay when menu is open
 */
function addBackdrop() {
  // Remove existing backdrop
  removeBackdrop();
  
  const backdrop = document.createElement('div');
  backdrop.id = 'menu-backdrop';
  backdrop.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 998;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  
  backdrop.addEventListener('click', toggleMenu);
  document.body.appendChild(backdrop);
  
  // Fade in backdrop
  setTimeout(() => {
    backdrop.style.opacity = '1';
  }, 10);
}

/**
 * Remove backdrop overlay
 */
function removeBackdrop() {
  const backdrop = document.getElementById('menu-backdrop');
  if (backdrop) {
    backdrop.style.opacity = '0';
    setTimeout(() => {
      backdrop.remove();
    }, 300);
  }
}

/**
 * Close menu when clicking outside of it
 */
function handleOutsideClick(event) {
  const sideMenu = document.getElementById("sideMenu");
  const hamburger = document.querySelector(".hamburger");
  
  if (sideMenu && hamburger) {
    const isMenuOpen = sideMenu.style.width === "280px";
    const clickedInsideMenu = sideMenu.contains(event.target);
    const clickedOnHamburger = hamburger.contains(event.target);
    
    if (isMenuOpen && !clickedInsideMenu && !clickedOnHamburger) {
      toggleMenu();
    }
  }
}

/**
 * Handle escape key to close menu
 */
function handleKeyPress(event) {
  if (event.key === 'Escape') {
    const sideMenu = document.getElementById("sideMenu");
    if (sideMenu && sideMenu.style.width === "280px") {
      toggleMenu();
    }
  }
}

/**
 * Handle responsive navigation setup
 */
function initializeResponsiveNav() {
  // Add event listeners
  document.addEventListener('click', handleOutsideClick);
  document.addEventListener('keydown', handleKeyPress);
  
  // Close menu when window is resized to desktop size
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      const sideMenu = document.getElementById("sideMenu");
      const hamburger = document.querySelector(".hamburger");
      const body = document.body;
      
      if (sideMenu && sideMenu.style.width === "280px") {
        sideMenu.style.width = "0";
        body.style.overflow = "auto";
        hamburger?.classList.remove("active");
        hamburger?.setAttribute('aria-expanded', 'false');
        removeBackdrop();
      }
    }
  });
  
  // Setup hamburger ARIA attributes
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('tabindex', '0');
    
    // Allow keyboard activation
    hamburger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });
  }
  
  // Setup side menu ARIA attributes
  const sideMenu = document.getElementById('sideMenu');
  if (sideMenu) {
    sideMenu.setAttribute('role', 'navigation');
    sideMenu.setAttribute('aria-label', 'Mobile navigation menu');
  }
  
  // Handle menu link clicks - smooth close
  const menuLinks = document.querySelectorAll('.side-menu a:not(.closebtn)');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Small delay to allow navigation, then close menu
      setTimeout(() => {
        if (window.innerWidth <= 768) {
          toggleMenu();
        }
      }, 150);
    });
  });
  
  // Focus management for mobile menu
  document.addEventListener('keydown', function(e) {
    const sideMenu = document.getElementById('sideMenu');
    if (e.key === 'Tab' && sideMenu && sideMenu.style.width === '280px') {
      const focusableElements = sideMenu.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  });
}

/* ========================================
   ENHANCED SCROLL EFFECTS
======================================== */

/**
 * Enhanced navbar scroll effect
 */
function initializeNavbarScrollEffect() {
  let lastScrollTop = 0;
  let ticking = false;
  
  function updateNavbar() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
    
    // Only apply on desktop
    if (window.innerWidth > 768) {
      if (scrollTop > 100) {
        nav.style.background = 'rgba(0,0,0,0.95)';
        nav.style.backdropFilter = 'blur(10px)';
        nav.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        
        // Hide nav on scroll down, show on scroll up
        if (scrollDirection === 'down' && scrollTop > 200) {
          nav.style.transform = 'translateY(-100%)';
        } else if (scrollDirection === 'up') {
          nav.style.transform = 'translateY(0)';
        }
      } else {
        nav.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0))';
        nav.style.backdropFilter = 'none';
        nav.style.borderBottom = 'none';
        nav.style.transform = 'translateY(0)';
      }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    ticking = false;
  }
  
  function requestNavbarUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestNavbarUpdate, { passive: true });
}

/* ========================================
   RESPONSIVE UTILITIES
======================================== */

/**
 * Check if device is mobile
 */
function isMobile() {
  return window.innerWidth <= 768;
}

/**
 * Check if device is tablet
 */
function isTablet() {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
}

/**
 * Get current breakpoint
 */
function getCurrentBreakpoint() {
  const width = window.innerWidth;
  if (width <= 480) return 'small-mobile';
  if (width <= 768) return 'mobile';
  if (width <= 1024) return 'tablet';
  return 'desktop';
}

/**
 * Handle responsive images
 */
function handleResponsiveImages() {
  const images = document.querySelectorAll('img[data-mobile-src]');
  const breakpoint = getCurrentBreakpoint();
  
  images.forEach(img => {
    if (breakpoint === 'mobile' || breakpoint === 'small-mobile') {
      if (img.dataset.mobileSrc && img.src !== img.dataset.mobileSrc) {
        img.src = img.dataset.mobileSrc;
      }
    } else {
      if (img.dataset.desktopSrc && img.src !== img.dataset.desktopSrc) {
        img.src = img.dataset.desktopSrc;
      }
    }
  });
}

/**
 * Responsive text handler
 */
function handleResponsiveText() {
  const elements = document.querySelectorAll('[data-mobile-text]');
  const breakpoint = getCurrentBreakpoint();
  
  elements.forEach(element => {
    if (breakpoint === 'mobile' || breakpoint === 'small-mobile') {
      if (element.dataset.mobileText && !element.dataset.originalText) {
        element.dataset.originalText = element.textContent;
        element.textContent = element.dataset.mobileText;
      }
    } else {
      if (element.dataset.originalText) {
        element.textContent = element.dataset.originalText;
      }
    }
  });
}

/* ========================================
   ORIENTATION CHANGE HANDLING
======================================== */

/**
 * Handle device orientation changes
 */
function handleOrientationChange() {
  // Close mobile menu on orientation change
  const sideMenu = document.getElementById("sideMenu");
  if (sideMenu && sideMenu.style.width === "280px") {
    toggleMenu();
  }
  
  // Refresh responsive elements after orientation change
  setTimeout(() => {
    handleResponsiveImages();
    handleResponsiveText();
  }, 100);
}

/* ========================================
   INITIALIZATION
======================================== */

/**
 * Initialize responsive features
 */
function initializeResponsiveFeatures() {
  console.log('Initializing Code Olympics responsive features...');
  
  // Core responsive navigation
  initializeResponsiveNav();
  initializeNavbarScrollEffect();
  
  // Responsive utilities
  handleResponsiveImages();
  handleResponsiveText();
  
  // Handle orientation changes
  window.addEventListener('orientationchange', handleOrientationChange);
  window.addEventListener('resize', () => {
    handleResponsiveImages();
    handleResponsiveText();
  });
  
  console.log('Responsive features initialized successfully!');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeResponsiveFeatures);
} else {
  initializeResponsiveFeatures();
}

// Export functions for global access
window.ResponsiveNav = {
  toggleMenu,
  isMobile,
  isTablet,
  getCurrentBreakpoint,
  handleResponsiveImages,
  handleResponsiveText
};