/**
 * Navigation JavaScript for Pharmich website
 * Handles navigation, dropdowns, mobile menu, and search functionality
 */

(function() {
    // DOM Elements - initial references
    const header = document.querySelector('.main-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    let mobileNavClose = document.querySelector('.mobile-nav-close');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item.has-submenu');
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    const searchBtn = document.querySelector('.search-btn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.querySelector('.search-input');
    
    // Initialize navigation
    function init() {
        // Ensure we have reference to mobile close button (might be added dynamically)
        mobileNavClose = document.querySelector('.mobile-nav-close');
        
        // Setup all event listeners
        setupEventListeners();
        
        // Setup scroll animations
        if ('IntersectionObserver' in window) {
            setupScrollAnimations();
        }
        
        console.log('Enhanced navigation initialized');
    }
    
    // Setup all event listeners
    function setupEventListeners() {
        // Header scroll effect
        window.addEventListener('scroll', handleHeaderScroll);
        
        // Mobile menu toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMobileMenu);
        }
        
        // Mobile menu close button
        if (mobileNavClose) {
            console.log('Mobile nav close button found, adding event listener');
            mobileNavClose.addEventListener('click', closeMobileMenu);
        } else {
            console.warn('Mobile nav close button not found');
            // Try to add listener after a short delay (in case of DOM updates)
            setTimeout(() => {
                const closeBtn = document.querySelector('.mobile-nav-close');
                if (closeBtn) {
                    console.log('Close button found after delay');
                    closeBtn.addEventListener('click', closeMobileMenu);
                }
            }, 500);
        }
        
        // Mobile submenu toggles
        submenuToggles.forEach(toggle => {
            toggle.addEventListener('click', toggleSubmenu);
        });
        
        // Navigation links - smooth scrolling
        navLinks.forEach(link => {
            if (link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', handleNavClick);
            }
        });
        
        // Search functionality
        if (searchBtn && searchOverlay) {
            searchBtn.addEventListener('click', openSearch);
        }
        
        if (searchClose) {
            searchClose.addEventListener('click', closeSearch);
        }
        
        // Close search on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                closeSearch();
            }
        });
        
        // Close search on overlay click
        searchOverlay?.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                closeSearch();
            }
        });
    }
    
    // Handle header styling on scroll
    function handleHeaderScroll() {
        const scrollY = window.scrollY || window.pageYOffset;
        
        if (scrollY > 20) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
    
    // Toggle mobile navigation menu
    function toggleMobileMenu() {
        // Toggle menu state
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        
        // Toggle body scroll
        if (mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            
            // Ensure we have the close button attached
            const closeBtn = document.querySelector('.mobile-nav-close');
            if (closeBtn && !closeBtn.onclick) {
                closeBtn.addEventListener('click', closeMobileMenu);
            }
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Close mobile navigation menu
    function closeMobileMenu(e) {
        if (e) e.preventDefault();
        console.log('Closing mobile menu');
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Toggle mobile submenu
    function toggleSubmenu() {
        const parent = this.closest('.mobile-nav-item');
        
        // Close other open submenus
        mobileNavItems.forEach(item => {
            if (item !== parent && item.classList.contains('active')) {
                item.classList.remove('active');
                item.querySelector('.submenu-toggle').classList.remove('active');
            }
        });
        
        // Toggle current submenu
        parent.classList.toggle('active');
        this.classList.toggle('active');
    }
    
    // Handle navigation link clicks for smooth scrolling
    function handleNavClick(e) {
        const targetId = this.getAttribute('href');
        
        // Skip if not a hash link
        if (!targetId.startsWith('#')) return;
        
        e.preventDefault();
        
        // Get target element
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        // Close mobile menu if open
        if (mobileNav && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
        
        // Calculate scroll position (accounting for header height)
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        // Smooth scroll to target
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Update active state in navigation
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    }
    
    // Open search overlay
    function openSearch() {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    }
    
    // Close search overlay
    function closeSearch() {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Setup scroll animations for elements
    function setupScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.feature-card, .service-card, .advantage-card, .industry-card, .stat-counter, .testimonial, .about-image, .about-text'
        );
        
        // Add animation class
        animatedElements.forEach(element => {
            element.classList.add('fade-in-element');
        });
        
        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });
        
        // Observe elements
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Update active navigation based on scroll position
    function updateActiveNavOnScroll() {
        // Get all sections
        const sections = document.querySelectorAll('.section');
        const headerHeight = header.offsetHeight;
        const scrollPosition = window.scrollY + headerHeight + 100; // Offset
        
        // Find the current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding link
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
            }
        });
    }
    
    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        init();
        
        // Add direct close button event listener after DOM is loaded
        document.querySelectorAll('.mobile-nav-close').forEach(btn => {
            btn.addEventListener('click', closeMobileMenu);
        });
        
        // Throttle scroll event for better performance
        window.addEventListener('scroll', function() {
            window.requestAnimationFrame(updateActiveNavOnScroll);
        });
    });
})();