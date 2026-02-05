/**
 * About Page JavaScript for Pharmich website
 * Handles interactive elements on the About page
 * Enhanced with comprehensive error handling and layout fixes
 */

(function() {
    // Initialize About page interactions
    function init() {
        // Wait for all content to be fully loaded
        if (document.readyState === 'complete') {
            initializeAllComponents();
        } else {
            window.addEventListener('load', initializeAllComponents);
        }
        
        // Also set up on DOMContentLoaded in case load takes too long
        document.addEventListener('DOMContentLoaded', initializeAllComponents);
    }
    
    // Initialize all components with error handling
    function initializeAllComponents() {
        try {
            console.log('Initializing About page components...');
            
            // Core Values section needs special handling - initialize first
            safelyExecute(setupValueTabs, 'Core Values Tabs', true);
            
            // Now initialize other components
            safelyExecute(setupApproachTimeline, 'Approach Timeline');
            safelyExecute(setupTeamCategories, 'Team Categories');
            safelyExecute(setupCertificationsSlider, 'Certifications Slider');
            safelyExecute(setupResponsibilityTabs, 'Responsibility Tabs');
            safelyExecute(setupScrollAnimations, 'Scroll Animations');
            safelyExecute(setupHorizontalScrollHint, 'Horizontal Scroll Hint');
            
            // Force a layout recalculation on critical elements
            setTimeout(forceLayoutRecalculation, 100);
            
            console.log('All About page components initialized successfully.');
        } catch (error) {
            console.error('Error initializing About page components:', error);
        }
    }
    
    // Force layout recalculation on critical elements to ensure proper rendering
    function forceLayoutRecalculation() {
        try {
            const valuesContainer = document.querySelector('.values-container');
            const activeContent = document.querySelector('.value-content.active');
            
            if (valuesContainer && activeContent) {
                // Force reflow
                void valuesContainer.offsetHeight;
                
                // Check visibility and positioning
                const contentHeight = activeContent.offsetHeight;
                const contentStyle = window.getComputedStyle(activeContent);
                console.log('Active content visibility:', contentStyle.visibility);
                console.log('Active content position:', contentStyle.position);
                console.log('Active content height:', contentHeight);
                
                // Ensure content visibility
                if (contentHeight === 0 || contentStyle.visibility !== 'visible') {
                    console.log('Forcing visibility on active content');
                    activeContent.style.opacity = '1';
                    activeContent.style.visibility = 'visible';
                    activeContent.style.position = 'relative';
                    activeContent.style.display = 'grid';
                }
            }
        } catch (error) {
            console.error('Error in layout recalculation:', error);
        }
    }
    
    // Safely execute a function with error handling
    function safelyExecute(fn, componentName, isHighPriority = false) {
        try {
            fn();
            console.log(`✓ ${componentName} initialized`);
            
            // For high priority components, force layout recalculation immediately
            if (isHighPriority) {
                setTimeout(() => {
                    console.log(`Forcing layout update for ${componentName}`);
                    forceLayoutRecalculation();
                }, 50);
            }
        } catch (error) {
            console.error(`Error initializing ${componentName}:`, error);
        }
    }
    
    // Setup Core Values Tabs with enhanced debugging and fixes
    // Setup Core Values Tabs
function setupValueTabs() {
    console.log("Setting up value tabs...");
    const valueTabs = document.querySelectorAll('.value-tab');
    if (!valueTabs.length) {
        console.warn("No value tabs found");
        return;
    }
    
    const valueContents = document.querySelectorAll('.value-content');
    if (!valueContents.length) {
        console.warn("No value content sections found");
        return;
    }
    
    // First, make sure there's always one active tab/content
    if (!document.querySelector('.value-tab.active')) {
        console.log("No active tab found, activating first tab");
        valueTabs[0].classList.add('active');
        valueContents[0].classList.add('active');
    }
    
    valueTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const valueId = tab.getAttribute('data-value');
            const targetContent = document.getElementById(`${valueId}-content`);
            
            if (!targetContent) {
                console.warn(`Target content not found for ${valueId}`);
                return;
            }
            
            // Remove active class from all tabs and contents
            valueTabs.forEach(t => t.classList.remove('active'));
            valueContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to current tab and content
            tab.classList.add('active');
            targetContent.classList.add('active');
            
            console.log(`Activated tab: ${valueId}`);
        });
    });
    
    console.log("Value tabs initialized successfully");
}
    
    // Setup Approach Timeline
    function setupApproachTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (!timelineItems.length) return; // Exit if no timeline items found
        
        const timelineControls = document.querySelectorAll('.timeline-control');
        const timelineIndicators = document.querySelectorAll('.timeline-indicator');
        const timelineContainer = document.querySelector('.approach-timeline');
        
        if (!timelineContainer) return; // Exit if timeline container not found
        
        let currentStep = 1;
        const totalSteps = timelineItems.length;
        
        // Go to specific step
        function goToStep(step) {
            // Validate step number
            if (step < 1 || step > totalSteps) {
                console.warn(`Invalid timeline step: ${step}`);
                return;
            }
            
            // Remove active class from all items and indicators
            timelineItems.forEach(item => item.classList.remove('active'));
            timelineIndicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Add active class to specified step
            const targetItem = document.querySelector(`.timeline-item[data-step="${step}"]`);
            const targetIndicator = document.querySelector(`.timeline-indicator[data-step="${step}"]`);
            
            if (targetItem) targetItem.classList.add('active');
            if (targetIndicator) targetIndicator.classList.add('active');
            
            // Update current step
            currentStep = step;
        }
        
        // Next Step function
        function goToNextStep() {
            if (currentStep < totalSteps) {
                goToStep(currentStep + 1);
            } else {
                goToStep(1); // Loop back to first step
            }
        }
        
        // Previous Step function
        function goToPrevStep() {
            if (currentStep > 1) {
                goToStep(currentStep - 1);
            } else {
                goToStep(totalSteps); // Loop to last step
            }
        }
        
        // Setup event listeners for controls
        if (timelineControls.length) {
            timelineControls.forEach(control => {
                control.addEventListener('click', () => {
                    if (control.classList.contains('next')) {
                        goToNextStep();
                    } else {
                        goToPrevStep();
                    }
                });
            });
        }
        
        // Setup event listeners for indicators
        if (timelineIndicators.length) {
            timelineIndicators.forEach(indicator => {
                indicator.addEventListener('click', () => {
                    const step = parseInt(indicator.getAttribute('data-step'), 10);
                    if (!isNaN(step)) {
                        goToStep(step);
                    }
                });
            });
        }
        
        // Initialize timeline with first step
        goToStep(1);
        
        // Auto-advance timeline every 5 seconds
        let timelineInterval;
        
        function startTimelineInterval() {
            clearInterval(timelineInterval); // Clear any existing interval
            timelineInterval = setInterval(goToNextStep, 5000);
        }
        
        function stopTimelineInterval() {
            clearInterval(timelineInterval);
        }
        
        // Start auto-advance
        startTimelineInterval();
        
        // Pause auto-advance on interaction
        timelineContainer.addEventListener('mouseenter', stopTimelineInterval);
        
        // Resume auto-advance when mouse leaves
        timelineContainer.addEventListener('mouseleave', startTimelineInterval);
        
        // Pause on touch (for mobile)
        timelineContainer.addEventListener('touchstart', stopTimelineInterval, { passive: true });
    }
    
    // Setup Team Categories
    function setupTeamCategories() {
        const teamCategories = document.querySelectorAll('.team-category');
        if (!teamCategories.length) return; // Exit if no categories found
        
        const teamMembers = document.querySelectorAll('.team-members');
        if (!teamMembers.length) return; // Exit if no team members sections found
        
        teamCategories.forEach(category => {
            category.addEventListener('click', () => {
                const categoryId = category.getAttribute('data-category');
                const targetTeam = document.getElementById(`${categoryId}-team`);
                
                if (!targetTeam) return; // Skip if target team not found
                
                // Remove active class from all categories and teams
                teamCategories.forEach(c => c.classList.remove('active'));
                teamMembers.forEach(m => m.classList.remove('active'));
                
                // Add active class to current category and team
                category.classList.add('active');
                targetTeam.classList.add('active');
            });
        });
    }
    
    // Setup Certifications Slider
    function setupCertificationsSlider() {
        const certificationSlides = document.querySelectorAll('.certification-slide');
        if (!certificationSlides.length) return; // Exit if no slides found
        
        const sliderControls = document.querySelectorAll('.slider-control');
        const sliderIndicators = document.querySelectorAll('.slider-indicator');
        const sliderContainer = document.querySelector('.certifications-slider');
        
        if (!sliderContainer) return; // Exit if slider container not found
        
        let currentSlide = 0;
        const totalSlides = certificationSlides.length;
        
        // Show a specific slide
        function showSlide(index) {
            // Validate slide index
            if (index < 0 || index >= totalSlides) {
                console.warn(`Invalid slide index: ${index}`);
                return;
            }
            
            // Remove active class from all slides and indicators
            certificationSlides.forEach((slide, i) => {
                slide.style.opacity = '0';
                slide.style.transform = i < index ? 'translateX(-50px)' : 'translateX(50px)';
                slide.style.visibility = 'hidden';
                slide.style.position = 'absolute';
            });
            
            sliderIndicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Add active class to current slide and indicator
            certificationSlides[index].style.opacity = '1';
            certificationSlides[index].style.transform = 'translateX(0)';
            certificationSlides[index].style.visibility = 'visible';
            certificationSlides[index].style.position = 'relative';
            
            if (sliderIndicators[index]) {
                sliderIndicators[index].classList.add('active');
            }
            
            // Update current slide
            currentSlide = index;
        }
        
        // Next Slide function
        function nextSlide() {
            showSlide((currentSlide + 1) % totalSlides);
        }
        
        // Previous Slide function
        function prevSlide() {
            showSlide((currentSlide - 1 + totalSlides) % totalSlides);
        }
        
        // Setup event listeners for controls
        if (sliderControls.length) {
            sliderControls.forEach(control => {
                control.addEventListener('click', () => {
                    if (control.classList.contains('next')) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                });
            });
        }
        
        // Setup event listeners for indicators
        if (sliderIndicators.length) {
            sliderIndicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    showSlide(index);
                });
            });
        }
        
        // Initialize with first slide
        showSlide(0);
        
        // Auto-advance slider every 5 seconds
        let sliderInterval;
        
        function startSliderInterval() {
            clearInterval(sliderInterval); // Clear any existing interval
            sliderInterval = setInterval(nextSlide, 5000);
        }
        
        function stopSliderInterval() {
            clearInterval(sliderInterval);
        }
        
        // Start auto-advance
        startSliderInterval();
        
        // Pause auto-advance on interaction
        sliderContainer.addEventListener('mouseenter', stopSliderInterval);
        
        // Resume auto-advance when mouse leaves
        sliderContainer.addEventListener('mouseleave', startSliderInterval);
        
        // Pause on touch (for mobile)
        sliderContainer.addEventListener('touchstart', stopSliderInterval, { passive: true });
    }
    
    // Setup Responsibility Tabs
    function setupResponsibilityTabs() {
        const responsibilityTabs = document.querySelectorAll('.responsibility-tab');
        if (!responsibilityTabs.length) return; // Exit if no tabs found
        
        const responsibilityContents = document.querySelectorAll('.responsibility-content');
        if (!responsibilityContents.length) return; // Exit if no content sections found
        
        responsibilityTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const areaId = tab.getAttribute('data-area');
                const targetContent = document.getElementById(`${areaId}-content`);
                
                if (!targetContent) return; // Skip if target content not found
                
                // Remove active class from all tabs and contents
                responsibilityTabs.forEach(t => t.classList.remove('active'));
                responsibilityContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to current tab and content
                tab.classList.add('active');
                targetContent.classList.add('active');
            });
        });
    }
    
    // Setup Scroll Animations
    function setupScrollAnimations() {
        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver not supported in this browser');
            return;
        }
        
        // Elements to animate on scroll
        const animatedSections = [
            '.story-content',
            '.mission-vision-cards',
            '.values-container',
            '.approach-timeline',
            '.team-members-container',
            '.certifications-slider',
            '.timeline-wrapper',
            '.equipment-gallery',
            '.responsibility-areas'
        ];
        
        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        // Observe each section
        animatedSections.forEach(selector => {
            const section = document.querySelector(selector);
            if (section) {
                section.classList.add('fade-in-element');
                observer.observe(section);
            }
        });
    }
    
    // Setup Horizontal Scroll Hint for Timeline
    function setupHorizontalScrollHint() {
        const timelineWrapper = document.querySelector('.timeline-wrapper');
        if (!timelineWrapper) return;
        
        const timelineTrack = document.querySelector('.timeline-track');
        if (!timelineTrack) return;
        
        // Check if timeline is scrollable
        if (timelineTrack.scrollWidth > timelineWrapper.clientWidth) {
            // Create scroll hint elements if they don't already exist
            const existingHint = document.querySelector('.timeline-scroll-hint');
            if (existingHint) return;
            
            const scrollHint = document.createElement('div');
            scrollHint.className = 'timeline-scroll-hint';
            scrollHint.innerHTML = '<i class="fas fa-arrows-alt-h"></i><span>Scroll to explore our full journey</span>';
            
            // Add styles directly to ensure it displays correctly
            scrollHint.style.textAlign = 'center';
            scrollHint.style.padding = '10px';
            scrollHint.style.color = 'var(--text-secondary)';
            scrollHint.style.marginTop = '10px';
            scrollHint.style.animation = 'fadeInUp 0.5s ease-out forwards';
            
            // Add scroll hint
            timelineWrapper.parentNode.insertBefore(scrollHint, timelineWrapper.nextSibling);
            
            // Remove hint after first scroll
            timelineWrapper.addEventListener('scroll', () => {
                scrollHint.style.opacity = '0';
                scrollHint.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    if (scrollHint.parentNode) {
                        scrollHint.parentNode.removeChild(scrollHint);
                    }
                }, 500);
            }, { once: true });
        }
    }
    
    // Add CSS Fix Function - Inject critical CSS fixes directly
    function injectCSSFixes() {
        try {
            const styleEl = document.createElement('style');
            styleEl.textContent = `
                /* Emergency CSS Fixes for Core Values Section */
                .values-container {
                    background-color: var(--bg-card);
                    border-radius: var(--border-radius-lg);
                    border: 1px solid var(--border-color);
                    overflow: hidden;
                    box-shadow: 0 15px 30px var(--shadow-color);
                }
                
                .values-content-container {
                    position: relative;
                    min-height: 350px;
                    background-color: var(--bg-card);
                }
                
                .value-content {
                    display: grid !important;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 2rem;
                    padding: 2.5rem;
                    align-items: center;
                }
                
                .value-content.active {
                    opacity: 1 !important;
                    visibility: visible !important;
                    position: relative !important;
                    display: grid !important;
                }
                
                .value-image {
                    border-radius: var(--border-radius-md);
                    overflow: hidden;
                    box-shadow: 0 10px 20px var(--shadow-color);
                }
                
                .value-img {
                    width: 100%;
                    height: auto;
                    display: block;
                }
                
                @media screen and (max-width: 992px) {
                    .value-content {
                        grid-template-columns: 1fr;
                    }
                }
            `;
            document.head.appendChild(styleEl);
            console.log('Emergency CSS fixes injected');
        } catch (error) {
            console.error('Failed to inject CSS fixes:', error);
        }
    }
    
    // Initialize on DOM ready with emergency CSS fixes
    init();
    
    // Inject CSS fixes immediately
    injectCSSFixes();
    
    // Additional initialization after a short delay to ensure DOM is fully processed
    setTimeout(() => {
        forceLayoutRecalculation();
        setupValueTabs(); // Run value tabs setup again to ensure it works
    }, 500);
})();