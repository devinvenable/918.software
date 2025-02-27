// Page interactions for 918.software service pages

document.addEventListener('DOMContentLoaded', function() {
  // Animate sections on scroll
  const sections = document.querySelectorAll('.section');
  
  if (sections.length > 0) {
    const revealSection = function() {
      sections.forEach(function(section) {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.85;
        
        if (sectionTop < triggerPoint) {
          section.classList.add('visible');
        }
      });
    };
    
    // Initial check on load
    revealSection();
    
    // Check on scroll
    window.addEventListener('scroll', revealSection);
  }
  
  // Form validation for contact forms
  const forms = document.querySelectorAll('form');
  
  if (forms.length > 0) {
    forms.forEach(function(form) {
      form.addEventListener('submit', function(event) {
        let isValid = true;
        const requiredInputs = form.querySelectorAll('[required]');
        
        requiredInputs.forEach(function(input) {
          if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'This field is required';
            
            // Remove existing error message if any
            const existingError = input.nextElementSibling;
            if (existingError && existingError.className === 'error-message') {
              existingError.remove();
            }
            
            input.parentNode.insertBefore(errorMessage, input.nextSibling);
          } else {
            input.classList.remove('error');
            const existingError = input.nextElementSibling;
            if (existingError && existingError.className === 'error-message') {
              existingError.remove();
            }
          }
        });
        
        if (!isValid) {
          event.preventDefault();
        }
      });
    });
  }
  
  // Smooth scroll for internal links
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  
  if (internalLinks.length > 0) {
    internalLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Account for fixed header
            behavior: 'smooth'
          });
        }
      });
    });
  }
});
