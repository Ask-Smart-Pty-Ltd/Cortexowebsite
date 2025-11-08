// Blog Page JavaScript

// Initialize Blog Functionality
document.addEventListener('DOMContentLoaded', function() {
    initSearchFunctionality();
    initCategoryFilters();
    initPagination();
    initNewsletterForm();
    
    // Toggle between empty state and sample posts (for demonstration)
    initToggleContent();
});

// Search Functionality
function initSearchFunctionality() {
    const searchInput = document.getElementById('blog-search');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
        
        // Search on button click
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        // Real-time search (with debounce)
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(this.value);
            }, 500);
        });
    }
}

function performSearch(query) {
    console.log('Searching for:', query);
    // In a real implementation, this would filter blog posts
    // For now, just animate the cards
    const cards = document.querySelectorAll('.blog-card');
    cards.forEach(card => {
        if (query) {
            card.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                card.style.animation = '';
            }, 500);
        }
    });
}

// Category Filters
function initCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const selectedCategory = this.getAttribute('data-category');
            
            // Filter cards
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Pagination
function initPagination() {
    const pageNumbers = document.querySelectorAll('.page-num');
    const prevBtn = document.querySelector('.page-btn.prev');
    const nextBtn = document.querySelector('.page-btn.next');
    
    let currentPage = 1;
    const totalPages = pageNumbers.length;
    
    function updatePagination(page) {
        currentPage = page;
        
        // Update page numbers
        pageNumbers.forEach((num, index) => {
            num.classList.toggle('active', index + 1 === currentPage);
        });
        
        // Update prev/next buttons
        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages;
        
        // Animate content change
        const blogGrid = document.querySelector('.blog-grid');
        if (blogGrid) {
            blogGrid.style.animation = 'fadeInUp 0.5s ease';
            setTimeout(() => {
                blogGrid.style.animation = '';
            }, 500);
        }
    }
    
    // Page number clicks
    pageNumbers.forEach((num, index) => {
        num.addEventListener('click', function() {
            updatePagination(index + 1);
        });
    });
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                updatePagination(currentPage - 1);
            }
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                updatePagination(currentPage + 1);
            }
        });
    }
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-blog .newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            // Show loading state
            button.textContent = 'Subscribing...';
            button.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                button.textContent = '✓ Subscribed!';
                button.style.background = '#10B981';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    this.reset();
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                }, 3000);
            }, 1500);
        });
    }
}

// Toggle between empty state and sample content (for demonstration)
function initToggleContent() {
    // Add a toggle button for demonstration
    const container = document.querySelector('.blog-posts .container');
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle Sample Posts';
    toggleBtn.className = 'btn btn-secondary';
    toggleBtn.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 1000;';
    
    toggleBtn.addEventListener('click', function() {
        const emptyState = document.querySelector('.empty-state');
        const blogGrid = document.querySelector('.blog-grid');
        const pagination = document.querySelector('.pagination');
        
        if (emptyState.style.display === 'none') {
            emptyState.style.display = 'block';
            blogGrid.style.display = 'none';
            pagination.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            blogGrid.style.display = 'grid';
            pagination.style.display = 'flex';
        }
    });
    
    document.body.appendChild(toggleBtn);
}

// Add hover effects to resource cards
document.querySelectorAll('.resource-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.resource-icon').style.animation = 'bounce 0.5s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.resource-icon').style.animation = '';
    });
});
