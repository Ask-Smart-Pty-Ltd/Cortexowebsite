// Contact Page JavaScript

// Form Validation and Submission
function initContactForm() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    
    if (form) {
        // Add input event listeners for real-time validation
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Simulate form submission (replace with actual API call)
                submitForm();
            }
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Remove existing error messages
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        field.classList.remove('error');
        
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            showError(field, 'This field is required');
            isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(field, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value)) {
                showError(field, 'Please enter a valid phone number');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    function showError(field, message) {
        field.classList.add('error');
        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = message;
        error.style.cssText = 'color: #EF4444; font-size: 0.875rem; margin-top: 5px; display: block;';
        field.parentElement.appendChild(error);
    }
    
    function submitForm() {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Hide form and show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset form after showing success
            setTimeout(() => {
                form.reset();
                form.style.display = 'flex';
                successMessage.style.display = 'none';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 5000);
        }, 1500);
    }
}

// Animate contact cards on hover
function initContactCards() {
    const cards = document.querySelectorAll('.contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.contact-icon').style.animationDuration = '0.5s';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.contact-icon').style.animationDuration = '2s';
        });
    });
}

// Add interactive map functionality (placeholder)
function initMap() {
    const mapContainer = document.querySelector('.map-placeholder');
    
    if (mapContainer) {
        mapContainer.addEventListener('click', function() {
            // In a real implementation, this would open an actual map
            window.open('https://maps.google.com', '_blank');
        });
    }
}

// Smooth scroll to form when clicking CTA buttons
function initScrollToForm() {
    const ctaButtons = document.querySelectorAll('[href="#contact-form"]');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const form = document.getElementById('contact-form');
            if (form) {
                form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initContactCards();
    initMap();
    initScrollToForm();
    
    // Add CSS for error states
    const style = document.createElement('style');
    style.textContent = `
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #EF4444;
        }
        
        .form-group input.error:focus,
        .form-group select.error:focus,
        .form-group textarea.error:focus {
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
        
        @keyframes scaleIn {
            from {
                transform: scale(0);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});
