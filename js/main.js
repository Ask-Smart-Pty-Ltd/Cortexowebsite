// Header Minimize on Scroll
let lastScrollTop = 0;
const header = document.getElementById('main-header');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > scrollThreshold) {
        header.classList.add('minimized');
    } else {
        header.classList.remove('minimized');
    }
    
    lastScrollTop = scrollTop;
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Handle counter animation for stats
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
            // Add percentage sign for engagement rate
            if (element.parentElement.querySelector('.stat-label').textContent.includes('Engagement')) {
                element.textContent += '%';
            }
        }
    };
    
    updateCounter();
}

// Observe stat numbers
document.querySelectorAll('.stat-number').forEach(el => {
    observer.observe(el);
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Link Based on Scroll Position
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
}

// Set active link for current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Typing Effect for Hero Title (enhanced)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    element.style.borderRight = '3px solid var(--primary-blue)';
    element.style.animation = 'blink 1s infinite';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.style.borderRight = 'none';
                element.style.animation = 'none';
            }, 2000);
        }
    }
    
    type();
}

// Add typewriter cursor blink animation
const typewriterStyle = document.createElement('style');
typewriterStyle.textContent = `
    @keyframes blink {
        0%, 50% { border-color: var(--primary-blue); }
        51%, 100% { border-color: transparent; }
    }
`;
document.head.appendChild(typewriterStyle);

// Initialize typewriter effect on key elements
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Optional: Enable typewriter effect
        // typeWriter(heroTitle, heroTitle.textContent, 100);
    }
});

// Add pulsing animation to CTA buttons
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach((btn, index) => {
        setTimeout(() => {
            btn.style.animation = 'pulse 2s ease-in-out infinite';
            btn.style.animationDelay = `${index * 0.5}s`;
        }, 3000); // Start pulsing after 3 seconds
    });
});

// Add hover effect to cards
document.querySelectorAll('.mission-card, .product-preview').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize floating particles
    createFloatingParticles();
    
    // Add interactive bubble effects
    enhanceBubbleInteractivity();
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
            setTimeout(() => {
                el.style.animationDelay = `${index * 0.1}s`;
            }, 100);
        });
    }, 100);
});

// Cursor Follow Effect (optional enhancement)
if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Lazy Loading Images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.getAttribute('data-src')) {
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Form Validation (for future contact form)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let valid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            valid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return valid;
}

// Newsletter Subscription (for future implementation)
function subscribeNewsletter(email) {
    // Placeholder for newsletter subscription
    console.log('Newsletter subscription for:', email);
    // Add actual implementation here
}

// Create Floating Particles
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    document.body.appendChild(particleContainer);
    
    const particleTypes = ['circle', 'diamond', 'triangle'];
    const colors = ['var(--primary-blue)', 'var(--light-blue)', 'var(--accent-blue)'];
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = `tech-particle ${particleTypes[Math.floor(Math.random() * particleTypes.length)]}`;
        
        // Random positioning and properties
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.opacity = Math.random() * 0.6 + 0.2;
        
        // Random size variation
        const size = Math.random() * 4 + 4;
        if (particle.classList.contains('circle') || particle.classList.contains('diamond')) {
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
        }
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 20000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 800);
    
    // Create initial batch
    for (let i = 0; i < 5; i++) {
        setTimeout(createParticle, i * 200);
    }
}

// Enhance Bubble Interactivity
function enhanceBubbleInteractivity() {
    const floatingElements = document.querySelectorAll('.float-element');
    
    floatingElements.forEach((element, index) => {
        // Add mouse follow effect
        let mouseX = 0, mouseY = 0;
        let elementX = 0, elementY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;
            
            const speed = 0.05 + (index * 0.02);
            const offsetX = (mouseX - 0.5) * 50 * speed;
            const offsetY = (mouseY - 0.5) * 50 * speed;
            
            elementX += (offsetX - elementX) * 0.1;
            elementY += (offsetY - elementY) * 0.1;
            
            element.style.transform = `translate(${elementX}px, ${elementY}px)`;
        });
        
        // Add hover effect for nearby interactions
        element.addEventListener('mouseenter', () => {
            element.style.transform += ' scale(1.1)';
            element.style.opacity = '0.4';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = element.style.transform.replace(' scale(1.1)', '');
            element.style.opacity = element.classList.contains('element-1') ? '0.3' : 
                                   element.classList.contains('element-2') ? '0.25' : '0.2';
        });
    });
}

// Enhanced Micro-interactions
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
        this.style.boxShadow = this.style.boxShadow.replace('0.3)', '0.5)').replace('0.4)', '0.6)');
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = this.style.boxShadow.replace('0.5)', '0.3)').replace('0.6)', '0.4)');
    });
    
    btn.addEventListener('click', function(e) {
        // Ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
