/**
 * Specialized Sanitization Page JavaScript
 * Handles interactive elements specific to the sanitization service page
 */

(function() {
    // DOM Elements
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabLinks = document.querySelectorAll('.tab-link');
    const modalContainer = document.getElementById('detailModals');
    const modals = document.querySelectorAll('.detail-modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    
    // Initialize all page functionality
    function initSanitizationPage() {
        // Setup tab navigation
        setupTabs();
        
        // Setup modals
        setupModals();
        
        // Setup scroll animations
        setupScrollAnimations();
        
        // Setup counter animations
        setupCounters();
        
        // Log initialization
        console.log('Sanitization page initialized');
    }
    
    // Setup tab switching functionality
    function setupTabs() {
        // Add click event listeners to tab buttons
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and tabs
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(tab => tab.classList.remove('active'));
                
                // Add active class to current button and tab
                button.classList.add('active');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }
    
    // Setup modal functionality
    function setupModals() {
        // Show modal when tab link is clicked
        tabLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const modalId = link.getAttribute('data-modal');
                if (!modalId) return;
                
                showModal(`${modalId}-modal`);
            });
        });
        
        // Close modal when close button is clicked
        modalCloseButtons.forEach(button => {
            button.addEventListener('click', () => {
                closeAllModals();
            });
        });
        
        // Close modal when clicking outside of modal content
        if (modalContainer) {
            modalContainer.addEventListener('click', (e) => {
                if (e.target === modalContainer) {
                    closeAllModals();
                }
            });
        }
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalContainer && modalContainer.classList.contains('active')) {
                closeAllModals();
            }
        });
    }
    
    // Show specific modal
    function showModal(modalId) {
        // Hide all modals
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        
        // Show selected modal
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            modalContainer.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Close all modals
    function closeAllModals() {
        modalContainer.classList.remove('active');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
    
    // Setup scroll animations
    function setupScrollAnimations() {
        // Elements to animate on scroll
        const animatedElements = document.querySelectorAll(
            '.overview-image, .overview-text, .technology-card, .validation-card, .option-card, .related-service-card, .timeline-item'
        );
        
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add class to trigger animation
                        entry.target.classList.add('fade-in-element', 'visible');
                        // Stop observing after animation is triggered
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });
            
            // Add initial class and start observing
            animatedElements.forEach(element => {
                element.classList.add('fade-in-element');
                observer.observe(element);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            animatedElements.forEach(element => {
                element.classList.add('visible');
            });
        }
    }
    
    // Setup counter animations
    function setupCounters() {
        const counters = document.querySelectorAll('.stat-value, .result-value');
        
        // Skip if no counters
        if (counters.length === 0) return;
        
        // Setup counter animation observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const targetValue = parseFloat(counter.innerText.replace(/[^0-9.]/g, ''));
                    const duration = 2000; // ms
                    const frameDuration = 1000 / 60; // 60fps
                    const totalFrames = Math.round(duration / frameDuration);
                    const easeOutQuad = t => t * (2 - t); // Easing function
                    
                    // Starting values
                    let frame = 0;
                    let currentValue = 0;
                    const countToTarget = () => {
                        frame++;
                        // Calculate progress with easing
                        const progress = easeOutQuad(frame / totalFrames);
                        currentValue = Math.round(targetValue * progress * 10) / 10;
                        
                        // Update counter value
                        // Keep any non-numeric characters like '%' or '+'
                        const suffix = counter.innerText.match(/[^0-9.]+$/);
                        counter.innerText = currentValue + (suffix ? suffix[0] : '');
                        
                        // Continue animation until target is reached
                        if (frame < totalFrames) {
                            requestAnimationFrame(countToTarget);
                        }
                    };
                    
                    // Start animation
                    requestAnimationFrame(countToTarget);
                    
                    // Stop observing
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        // Start observing counters
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    // Track active section on scroll for navigation
    function updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Update URL hash without scroll jump
                const currentHash = window.location.hash;
                const newHash = `#${sectionId}`;
                
                if (currentHash !== newHash) {
                    history.replaceState(null, null, newHash);
                }
            }
        });
    }
    
    // Handle image hover animations for technology cards
    function setupHoverEffects() {
        const technologyCards = document.querySelectorAll('.technology-card');
        
        technologyCards.forEach(card => {
            const content = card.querySelector('.technology-content');
            const hover = card.querySelector('.technology-hover');
            
            card.addEventListener('mouseenter', () => {
                // Hide content with animation
                content.style.opacity = '0';
                content.style.transform = 'translateY(-20px)';
                
                // Show hover content with animation
                hover.style.opacity = '1';
                hover.style.visibility = 'visible';
                hover.style.transform = 'translateY(0)';
            });
            
            card.addEventListener('mouseleave', () => {
                // Show content with animation
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
                
                // Hide hover content with animation
                hover.style.opacity = '0';
                hover.style.visibility = 'hidden';
                hover.style.transform = 'translateY(20px)';
            });
        });
    }
    
    // Smooth scroll to section when URL has hash
    function handleHashScroll() {
        // Check if URL has hash
        if (window.location.hash) {
            const hash = window.location.hash;
            const targetElement = document.querySelector(hash);
            
            if (targetElement) {
                // Wait a bit for page to fully load
                setTimeout(() => {
                    // Calculate position accounting for header height
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    }
    
    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize page functionality
        initSanitizationPage();
        
        // Setup hover effects
        setupHoverEffects();
        
        // Handle URL hash for scroll
        handleHashScroll();
        
        // Track active section on scroll
        window.addEventListener('scroll', () => {
            // Use requestAnimationFrame for better performance
            window.requestAnimationFrame(updateActiveSection);
        });
    });
})();