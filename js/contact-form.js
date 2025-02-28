// Contact form handling for 918.software

document.addEventListener('DOMContentLoaded', function() {
  // Handle contact form submissions
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const formDataObject = {};
      
      formData.forEach(function(value, key) {
        formDataObject[key] = value;
      });
      
      // Add form type identifier
      formDataObject.form_type = 'contact';
      
      // Simple validation
      let isValid = true;
      const requiredInputs = contactForm.querySelectorAll('[required]');
      
      requiredInputs.forEach(function(input) {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });
      
      if (!isValid) {
        return;
      }
      
      // Disable form during submission
      const submitButton = contactForm.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }
      
      // Lambda API endpoint URL - replace with your actual API Gateway URL
      const apiUrl = 'https://your-api-gateway-url.amazonaws.com/prod/process-form';
      
      // Send the data to the AWS Lambda via API Gateway
      fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(formDataObject),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        // Show success message
        if (data.success && successMessage) {
          successMessage.style.display = 'block';
          successMessage.textContent = data.message || 'Your message has been sent. We\'ll get back to you shortly!';
          
          // Reset form
          contactForm.reset();
          
          // Hide success message after 5 seconds
          setTimeout(function() {
            successMessage.style.display = 'none';
          }, 5000);
        } else {
          // Show error
          if (successMessage) {
            successMessage.style.display = 'block';
            successMessage.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
            successMessage.style.borderColor = 'rgba(231, 76, 60, 0.3)';
            successMessage.style.color = '#e74c3c';
            successMessage.textContent = data.message || 'There was a problem sending your message. Please try again later.';
            
            // Hide error message after 5 seconds
            setTimeout(function() {
              successMessage.style.display = 'none';
              successMessage.style.backgroundColor = '';
              successMessage.style.borderColor = '';
              successMessage.style.color = '';
            }, 5000);
          }
        }
      })
      .catch(error => {
        console.error('Error:', error);
        
        // Show error message
        if (successMessage) {
          successMessage.style.display = 'block';
          successMessage.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
          successMessage.style.borderColor = 'rgba(231, 76, 60, 0.3)';
          successMessage.style.color = '#e74c3c';
          successMessage.textContent = 'Network error. Please try again later.';
          
          // Hide error message after 5 seconds
          setTimeout(function() {
            successMessage.style.display = 'none';
            successMessage.style.backgroundColor = '';
            successMessage.style.borderColor = '';
            successMessage.style.color = '';
          }, 5000);
        }
      })
      .finally(() => {
        // Re-enable submit button
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Send Message';
        }
      });
    });
  }
});
