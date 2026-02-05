/**
 * Service Pages JavaScript for Pharmich website
 * Handles tabs, animations, and other service page specific functionality
 */

(function() {
    // DOM Elements
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Initialize service page functionality
    function init() {
        // Setup event listeners
        setupTabNavigation();
        
        // Setup scroll animations
        setupScrollAnimations();
        
        console.log('Service page functionality initialized');
    }
    
    // Setup tab navigation
    function setupTabNavigation() {
        if (tabButtons.length === 0 || tabPanes.length === 0) return;
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to current button and pane
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Setup scroll animations
    function setupScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.benefit-item, .application-card, .tech-card, .option-card, .related-card, .stat-box'
        );
        
        if (animatedElements.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class (the fade-in-element class should already be in the CSS)
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        // Add the fade-in-element class to all elements first
        animatedElements.forEach(element => {
            element.classList.add('fade-in-element');
            observer.observe(element);
        });
    }
    
    // Track scrolling for active section highlighting
    function trackScrollPosition() {
        const sections = document.querySelectorAll('section[id]');
        if (sections.length === 0) return;
        
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Current section is visible
                const currentId = section.getAttribute('id');
                
                // Find nav link with matching href
                const navLink = document.querySelector(`.nav-link[href="#${currentId}"]`);
                if (navLink) {
                    // Remove active class from all nav links
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Add active class to current nav link
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    // Handle approach step animations on scroll
    function handleApproachSteps() {
        const steps = document.querySelectorAll('.approach-step');
        if (steps.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation with delay based on index
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-element', 'visible');
                    }, index * 150);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        steps.forEach(step => {
            step.classList.add('fade-in-element');
            observer.observe(step);
        });
    }
    
    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        init();
        handleApproachSteps();
        
        // Handle scroll events
        window.addEventListener('scroll', function() {
            window.requestAnimationFrame(trackScrollPosition);
        });
    });
})();