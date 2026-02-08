/**
 * Sector 36 - Main JavaScript
 * The Sector 36 Universe
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavigation();
  initTabs();
  initAnimations();
  initEmailLinks();
  initFullscreenMap();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!navToggle || !navMenu) return;
  
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    navToggle.classList.toggle('active');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('active');
    }
  });
  
  // Close menu when clicking a link
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('active');
    });
  });
}

/**
 * Tab Component for Universe Page
 */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  if (tabButtons.length === 0) return;
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;
      
      // Update buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Update panes
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === targetTab) {
          pane.classList.add('active');
        }
      });
      
      // Update URL hash without scrolling
      if (history.pushState) {
        history.pushState(null, null, `#${targetTab}`);
      }
    });
  });
  
  // Handle initial hash
  const hash = window.location.hash.slice(1);
  if (hash) {
    const targetButton = document.querySelector(`[data-tab="${hash}"]`);
    if (targetButton) {
      targetButton.click();
    }
  }
}

/**
 * Scroll Animations
 */
function initAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe cards and other elements
  document.querySelectorAll('.card, .tech-card, .faction-card, .character-card, .classified-doc').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
  
  // Add smooth header background on scroll
  const header = document.querySelector('.nav-header');
  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Set initial state based on scroll position
    if (window.pageYOffset > 50) {
      header.classList.add('scrolled');
    }
  }
}

/**
 * Typing Effect for Terminal-style Text
 */
function typeText(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

/**
 * Glitch Effect for Text
 */
function glitchText(element, duration = 200) {
  const originalText = element.textContent;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  
  let iterations = 0;
  const maxIterations = 10;
  
  const interval = setInterval(() => {
    element.textContent = originalText
      .split('')
      .map((char, index) => {
        if (index < iterations) {
          return originalText[index];
        }
        return characters[Math.floor(Math.random() * characters.length)];
      })
      .join('');
    
    iterations += 1 / 3;
    
    if (iterations >= originalText.length) {
      clearInterval(interval);
      element.textContent = originalText;
    }
  }, duration / maxIterations);
}

/**
 * Utility: Debounce Function
 */
function debounce(func, wait = 100) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Utility: Smooth Scroll to Element
 */
function scrollToElement(selector, offset = 80) {
  const element = document.querySelector(selector);
  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  }
}

/**
 * Handle Anchor Links with Header Offset
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      scrollToElement(href);
    }
  });
});

/**
 * Add Loading State to Async Operations
 */
function setLoading(element, isLoading) {
  if (isLoading) {
    element.classList.add('loading');
    element.disabled = true;
  } else {
    element.classList.remove('loading');
    element.disabled = false;
  }
}

/**
 * ROT13 Email Protection
 * Decodes ROT13 encoded email addresses to prevent scraping
 */
function rot13(str) {
  return str.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}

function initEmailLinks() {
  document.querySelectorAll('[data-email]').forEach(link => {
    const encoded = link.dataset.email;
    const decoded = rot13(encoded);
    link.href = `mailto:${decoded}`;
  });
}

/**
 * Fullscreen Map for Mobile
 */
function initFullscreenMap() {
  const mapImage = document.getElementById('star-map');
  const fullscreenOverlay = document.getElementById('map-fullscreen');
  const closeButton = document.querySelector('.map-fullscreen-close');

  if (!mapImage || !fullscreenOverlay) return;

  // Only enable on mobile (touch devices or narrow screens)
  function isMobile() {
    return window.innerWidth <= 600;
  }

  // Open fullscreen
  mapImage.addEventListener('click', () => {
    if (isMobile()) {
      fullscreenOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close fullscreen
  function closeFullscreen() {
    fullscreenOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeButton) {
    closeButton.addEventListener('click', closeFullscreen);
  }

  // Close on background click
  fullscreenOverlay.addEventListener('click', (e) => {
    if (e.target === fullscreenOverlay) {
      closeFullscreen();
    }
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fullscreenOverlay.classList.contains('active')) {
      closeFullscreen();
    }
  });
}

