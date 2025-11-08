// MOTIBEE Page Specific JavaScript

// Create floating bee particles
function createBeeParticles() {
    const particleContainer = document.querySelector('.bee-background');
    if (!particleContainer) return;
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'honey-particle';
        particle.innerHTML = '🍯';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.fontSize = Math.random() * 20 + 10 + 'px';
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }, 3000);
}

// Add CSS for honey particles
const style = document.createElement('style');
style.textContent = `
    .honey-particle {
        position: absolute;
        top: 100%;
        animation: float-up 5s ease-out forwards;
        pointer-events: none;
    }
    
    @keyframes float-up {
        to {
            top: -50px;
            transform: translateX(${Math.random() * 100 - 50}px);
        }
    }
`;
document.head.appendChild(style);

// Initialize bee particles
document.addEventListener('DOMContentLoaded', createBeeParticles);

// Hexagon hover effect enhancement
document.querySelectorAll('.hexagon').forEach(hex => {
    hex.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    hex.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Animate process steps on scroll
const processSteps = document.querySelectorAll('.process-step');
const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate-bounce');
            }, index * 200);
        }
    });
}, { threshold: 0.5 });

processSteps.forEach(step => stepObserver.observe(step));

// Add bounce animation class
document.addEventListener('DOMContentLoaded', () => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .animate-bounce {
            animation: bounce 0.5s ease-out;
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(styleSheet);
});

// Interactive bee cursor follow (optional fun feature)
if (window.innerWidth > 768) {
    const beeCursor = document.createElement('div');
    beeCursor.innerHTML = '🐝';
    beeCursor.style.cssText = `
        position: fixed;
        font-size: 20px;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        opacity: 0;
    `;
    document.body.appendChild(beeCursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        beeCursor.style.left = cursorX + 10 + 'px';
        beeCursor.style.top = cursorY + 10 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    // Show bee cursor on hover over certain elements
    document.querySelectorAll('.hexagon, .btn-honey, .btn-honey-large').forEach(el => {
        el.addEventListener('mouseenter', () => {
            beeCursor.style.opacity = '1';
        });
        
        el.addEventListener('mouseleave', () => {
            beeCursor.style.opacity = '0';
        });
    });
    
    animateCursor();
}
