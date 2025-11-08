// About Page - Interactive Founder Cards

document.addEventListener('DOMContentLoaded', function() {
    initFounderCards();
});

function initFounderCards() {
    const founderCards = document.querySelectorAll('.founder-card');
    const modalOverlay = document.getElementById('modal-overlay');
    let isExpanded = false;
    let expandedCard = null;

    founderCards.forEach(card => {
        const closeBtn = card.querySelector('.close-btn');
        
        // Click to expand
        card.addEventListener('click', function(e) {
            // Don't expand if clicking on social links
            if (e.target.closest('.social-icon') || e.target.closest('.close-btn')) {
                return;
            }
            
            if (!isExpanded) {
                expandCard(card);
            }
        });
        
        // Close button click
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                closeCard(card);
            });
        }
    });
    
    // Close on overlay click
    modalOverlay.addEventListener('click', function() {
        if (expandedCard) {
            closeCard(expandedCard);
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && expandedCard) {
            closeCard(expandedCard);
        }
    });

    function expandCard(card) {
        if (isExpanded) return;
        
        isExpanded = true;
        expandedCard = card;
        
        // Show overlay
        modalOverlay.classList.add('active');
        
        // Expand card
        card.classList.add('expanded');
        
        // Show close button
        const closeBtn = card.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.style.display = 'flex';
        }
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Add smooth entrance animation
        setTimeout(() => {
            card.style.animation = 'expandIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        }, 50);
    }
    
    function closeCard(card) {
        if (!isExpanded) return;
        
        // Add exit animation
        card.style.animation = 'expandOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        
        setTimeout(() => {
            // Remove expanded state
            card.classList.remove('expanded');
            
            // Hide overlay
            modalOverlay.classList.remove('active');
            
            // Hide close button
            const closeBtn = card.querySelector('.close-btn');
            if (closeBtn) {
                closeBtn.style.display = 'none';
            }
            
            // Reset animation
            card.style.animation = '';
            
            // Reset states
            isExpanded = false;
            expandedCard = null;
            
            // Restore body scroll
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes expandIn {
            from {
                transform: translate(-50%, -50%) scale(0.8);
                opacity: 0;
            }
            to {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
        
        @keyframes expandOut {
            from {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            to {
                transform: translate(-50%, -50%) scale(0.8);
                opacity: 0;
            }
        }
        
        .founder-card:hover .image-placeholder span {
            transform: scale(1.1) rotate(5deg);
            transition: transform 0.3s ease;
        }
        
        .founder-card.expanded .founder-info {
            max-height: 60vh;
            overflow-y: auto;
        }
        
        .founder-card.expanded .founder-info::-webkit-scrollbar {
            width: 6px;
        }
        
        .founder-card.expanded .founder-info::-webkit-scrollbar-track {
            background: var(--gray-light);
            border-radius: 3px;
        }
        
        .founder-card.expanded .founder-info::-webkit-scrollbar-thumb {
            background: var(--primary-blue);
            border-radius: 3px;
        }
        
        .founder-card.expanded .founder-info::-webkit-scrollbar-thumb:hover {
            background: var(--dark-blue);
        }
    `;
    document.head.appendChild(style);
}
