// Navigation functionality for 918.software

document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const overlay = document.querySelector('.overlay');
  
  if (navToggle && navMenu && overlay) {
    // Mobile-friendly toggle function
    navToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault(); // Prevent default for reliable mobile behavior
      
      // Toggle classes
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      overlay.classList.toggle('active');
      
      // Toggle body scroll
      if (navMenu.classList.contains('active')) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
      
      return false; // Ensure no bubbling
    });
    
    // Close navigation when clicking on overlay
    overlay.addEventListener('click', function(e) {
      e.preventDefault();
      closeMenu();
    });
    
    // Close menu function
    function closeMenu() {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
    
    // Close navigation when clicking on a link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });
    
    // Close menu when ESC key is pressed
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });
    
    // Fix for iOS scrolling within menu
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      navMenu.style.webkitOverflowScrolling = 'touch';
    }
  }
  
  // Add active class to current page link
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(function(link) {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
});
