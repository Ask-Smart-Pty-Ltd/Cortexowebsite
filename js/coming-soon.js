// Coming Soon Page JavaScript

// Countdown Timer
function initCountdown() {
    // Set target date (example: 6 months from now)
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 6);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        // If countdown is finished
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-wrapper').innerHTML = '<h2 style="color: white;">Launching Soon!</h2>';
        }
    }
    
    // Update countdown immediately and then every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Newsletter Form Handler
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    const successMessage = document.getElementById('success-message');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email value
            const email = form.querySelector('.email-input').value;
            
            // Simulate form submission (replace with actual API call)
            console.log('Email submitted:', email);
            
            // Show success message
            successMessage.style.display = 'block';
            form.style.display = 'none';
            
            // Reset form after animation
            setTimeout(() => {
                form.reset();
                form.style.display = 'flex';
                successMessage.style.display = 'none';
            }, 5000);
        });
    }
}

// Animated Background Enhancement
function enhanceBackground() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    // Add mouse parallax effect
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            
            orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initNewsletterForm();
    enhanceBackground();
    
    // Add floating animation to hint cards on hover
    const hintCards = document.querySelectorAll('.hint-card');
    hintCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'float 2s ease-in-out infinite';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
});
