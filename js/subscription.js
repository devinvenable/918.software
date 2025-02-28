// Newsletter subscription functionality for 918.software

document.addEventListener('DOMContentLoaded', function() {
  // Handle newsletter subscription form submission
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  
  if (newsletterForms.length > 0) {
    newsletterForms.forEach(function(form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button[type="submit"]');
        const successMessage = form.querySelector('.success-message');
        const errorMessage = form.querySelector('.error-message');
        
        if (emailInput && emailInput.value.trim()) {
          // Disable the form elements during submission
          emailInput.disabled = true;
          submitButton.disabled = true;
          
          // Prepare data for API
          const formData = {
            email: emailInput.value.trim(),
            form_type: 'newsletter',
            timestamp: new Date().toISOString(),
            page: window.location.pathname
          };
          
          // Lambda API endpoint URL - replace with your actual API Gateway URL
          const apiUrl = 'https://your-api-gateway-url.amazonaws.com/prod/process-form';
          
          // Send the data to AWS Lambda via API Gateway
          fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            // Show success message
            if (data.success && successMessage) {
              successMessage.style.display = 'block';
              successMessage.textContent = data.message || 'Thanks for subscribing! We\'ll keep you updated with the latest news and offers.';
              
              // Hide success message after 5 seconds
              setTimeout(function() {
                successMessage.style.display = 'none';
                // Re-enable form elements
                emailInput.disabled = false;
                submitButton.disabled = false;
                emailInput.value = '';
              }, 5000);
            } else {
              // Show error
              if (errorMessage) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = data.message || 'There was a problem with your subscription. Please try again later.';
                
                // Hide error message after 5 seconds
                setTimeout(function() {
                  errorMessage.style.display = 'none';
                  emailInput.disabled = false;
                  submitButton.disabled = false;
                }, 3000);
              }
            }
          })
          .catch(error => {
            console.error('Error:', error);
            
            // Show error message
            if (errorMessage) {
              errorMessage.style.display = 'block';
              errorMessage.textContent = 'Network error. Please try again later.';
              
              // Hide error message after 3 seconds
              setTimeout(function() {
                errorMessage.style.display = 'none';
                emailInput.disabled = false;
                submitButton.disabled = false;
              }, 3000);
            }
          });
        } else {
          // Show error for empty email
          if (errorMessage) {
            errorMessage.style.display = 'block';
            
            // Hide error message after 3 seconds
            setTimeout(function() {
              errorMessage.style.display = 'none';
            }, 3000);
          }
        }
      });
    });
  }
  
  // Toggle newsletter subscription form visibility
  const subscribeButtons = document.querySelectorAll('.btn-subscribe');
  
  if (subscribeButtons.length > 0) {
    subscribeButtons.forEach(function(button) {
      button.addEventListener('click', function(event) {
        event.preventDefault();
        
        const targetForm = document.querySelector(this.getAttribute('data-target'));
        if (targetForm) {
          if (targetForm.style.display === 'block') {
            targetForm.style.display = 'none';
          } else {
            targetForm.style.display = 'block';
            // Focus on the email input
            const emailInput = targetForm.querySelector('input[type="email"]');
            if (emailInput) {
              emailInput.focus();
            }
          }
        }
      });
    });
  }
});
