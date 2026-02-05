/**
 * Sustainable Solutions Page JavaScript
 * Handles interactive elements specific to the Sustainable Solutions service page
 */

(function() {
    // DOM Elements
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const carouselIndicators = document.querySelectorAll('.carousel-indicator');
    const stepHeaders = document.querySelectorAll('.step-header');
    const stepContents = document.querySelectorAll('.step-content');
    const stepToggles = document.querySelectorAll('.step-toggle');
    const overviewVideoContainer = document.getElementById('overviewVideoContainer');
    const overviewVideoElement = document.getElementById('overviewVideoElement');
    const overviewVideoPlayButton = document.getElementById('overviewVideoPlayButton');
    const metricCards = document.querySelectorAll('.metric-card');
    const leafContainer = document.getElementById('leafParticles');
    
    // Configuration
    const config = {
        carouselSlidesVisible: getSlidesVisible(),
        carouselIndex: 0,
        carouselAutoplay: true,
        carouselAutoplaySpeed: 5000,
        carouselAutoplayTimer: null,
        leafCount: 20,
        leafMinSize: 5,
        leafMaxSize: 15
    };
    
    // Initialize page functionality
    function init() {
        // Setup tabs
        setupTabs();
        
        // Setup carousel
        setupCarousel();
        
        // Setup implementation steps
        setupSteps();
        
        // Setup overview video
        if (overviewVideoContainer && overviewVideoElement && overviewVideoPlayButton) {
            setupOverviewVideo();
        }
        
        // Setup metric charts
        setupMetricCharts();
        
        // Create leaf particles
        if (leafContainer) {
            createLeafParticles();
        }
        
        // Setup scroll animations
        setupScrollAnimations();
        
        console.log('Sustainable Solutions page initialized');
    }
    
    // Setup tabs functionality
    function setupTabs() {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to current button and panel
                button.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Get number of visible slides based on viewport width
    function getSlidesVisible() {
        if (window.innerWidth >= 1200) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    // Setup carousel functionality
    function setupCarousel() {
        if (!carouselTrack || !carouselSlides.length) return;
        
        // Update visible slides on window resize
        window.addEventListener('resize', () => {
            config.carouselSlidesVisible = getSlidesVisible();
            updateCarousel();
        });
        
        // Previous slide button
        if (carouselPrev) {
            carouselPrev.addEventListener('click', () => {
                prevSlide();
                resetCarouselAutoplay();
            });
        }
        
        // Next slide button
        if (carouselNext) {
            carouselNext.addEventListener('click', () => {
                nextSlide();
                resetCarouselAutoplay();
            });
        }
        
        // Indicator buttons
        carouselIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                resetCarouselAutoplay();
            });
        });
        
        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe left
                nextSlide();
                resetCarouselAutoplay();
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe right
                prevSlide();
                resetCarouselAutoplay();
            }
        }
        
        // Start autoplay
        startCarouselAutoplay();
        
        // Initial update
        updateCarousel();
    }
    
    // Go to previous slide
    function prevSlide() {
        config.carouselIndex--;
        if (config.carouselIndex < 0) {
            config.carouselIndex = carouselSlides.length - config.carouselSlidesVisible;
        }
        updateCarousel();
    }
    
    // Go to next slide
    function nextSlide() {
        config.carouselIndex++;
        if (config.carouselIndex > carouselSlides.length - config.carouselSlidesVisible) {
            config.carouselIndex = 0;
        }
        updateCarousel();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        config.carouselIndex = index;
        if (config.carouselIndex > carouselSlides.length - config.carouselSlidesVisible) {
            config.carouselIndex = carouselSlides.length - config.carouselSlidesVisible;
        }
        updateCarousel();
    }
    
    // Update carousel position and active indicators
    function updateCarousel() {
        if (!carouselTrack) return;
        
        const slideWidth = carouselSlides[0].offsetWidth;
        const offset = -config.carouselIndex * slideWidth;
        
        carouselTrack.style.transform = `translateX(${offset}px)`;
        
        // Update indicators
        carouselIndicators.forEach((indicator, index) => {
            if (index === config.carouselIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Start carousel autoplay
    function startCarouselAutoplay() {
        if (config.carouselAutoplay) {
            config.carouselAutoplayTimer = setInterval(() => {
                nextSlide();
            }, config.carouselAutoplaySpeed);
        }
    }
    
    // Reset carousel autoplay
    function resetCarouselAutoplay() {
        if (config.carouselAutoplayTimer) {
            clearInterval(config.carouselAutoplayTimer);
            startCarouselAutoplay();
        }
    }
    
    // Setup implementation steps accordion
    function setupSteps() {
        stepHeaders.forEach((header, index) => {
            header.addEventListener('click', () => {
                const content = stepContents[index];
                const toggle = stepToggles[index];
                
                if (content.classList.contains('active')) {
                    // Close this step
                    content.classList.remove('active');
                    toggle.classList.remove('active');
                    content.style.display = 'none';
                } else {
                    // Close all steps
                    stepContents.forEach(c => {
                        c.classList.remove('active');
                        c.style.display = 'none';
                    });
                    
                    stepToggles.forEach(t => {
                        t.classList.remove('active');
                    });
                    
                    // Open this step
                    content.classList.add('active');
                    toggle.classList.add('active');
                    content.style.display = 'block';
                }
            });
        });
        
        // Open first step by default
        if (stepContents.length > 0 && stepToggles.length > 0) {
            stepContents[0].classList.add('active');
            stepContents[0].style.display = 'block';
            stepToggles[0].classList.add('active');
        }
    }
    
    // Setup overview video player
    function setupOverviewVideo() {
        // Play video when button is clicked
        overviewVideoPlayButton.addEventListener('click', function() {
            overviewVideoElement.style.display = 'block';
            overviewVideoPlayButton.style.display = 'none';
            
            // Play with a small delay
            setTimeout(() => {
                overviewVideoElement.play().catch(error => {
                    console.log('Auto-play prevented by browser:', error);
                    resetOverviewVideo();
                });
            }, 100);
        });
        
        // Reset player when video ends
        overviewVideoElement.addEventListener('ended', resetOverviewVideo);
        
        // Pause video when it's not visible
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting && !overviewVideoElement.paused) {
                        overviewVideoElement.pause();
                    }
                });
            }, { threshold: 0.25 });
            
            observer.observe(overviewVideoContainer);
        }
    }
    
    // Reset overview video player
    function resetOverviewVideo() {
        overviewVideoElement.style.display = 'none';
        overviewVideoPlayButton.style.display = 'flex';
    }
    
    // Setup metric charts animation
    function setupMetricCharts() {
        const animateCharts = () => {
            metricCards.forEach(card => {
                const value = parseInt(card.getAttribute('data-value'), 10);
                const chartPath = card.querySelector('.chart-circle-fill');
                
                if (chartPath) {
                    chartPath.style.strokeDasharray = `0, 100`;
                    
                    // Animate stroke dasharray from 0 to value
                    setTimeout(() => {
                        chartPath.style.transition = 'stroke-dasharray 1.5s ease-in-out';
                        chartPath.style.strokeDasharray = `${value}, 100`;
                    }, 100);
                }
            });
        };
        
        // Use Intersection Observer to trigger animation when charts are in view
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                if (entries.some(entry => entry.isIntersecting)) {
                    animateCharts();
                    observer.disconnect();
                }
            }, { threshold: 0.2 });
            
            if (metricCards.length > 0) {
                observer.observe(metricCards[0]);
            }
        } else {
            // Fallback for browsers without Intersection Observer
            setTimeout(animateCharts, 500);
        }
    }
    
    // Create leaf particles for background animation
    function createLeafParticles() {
        for (let i = 0; i < config.leafCount; i++) {
            const leaf = document.createElement('div');
            leaf.classList.add('leaf');
            
            // Random size
            const size = Math.random() * (config.leafMaxSize - config.leafMinSize) + config.leafMinSize;
            leaf.style.width = `${size}px`;
            leaf.style.height = `${size}px`;
            
            // Random position
            leaf.style.left = `${Math.random() * 100}%`;
            
            // Random animation duration and delay
            const duration = Math.random() * 15 + 15; // 15-30s
            const delay = Math.random() * 30; // 0-30s
            leaf.style.animationDuration = `${duration}s`;
            leaf.style.animationDelay = `${delay}s`;
            
            // Add to container
            leafContainer.appendChild(leaf);
        }
    }
    
    // Setup scroll animations
    function setupScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.eco-hero-content, .eco-hero-image, .overview-text, .overview-video, ' +
            '.technology-card, .certification-card, .case-study-text, .case-study-image, ' +
            '.metric-card, .step-card, .option-card, .related-service-card'
        );
        
        // Add fade-in-element class
        animatedElements.forEach(element => {
            element.classList.add('fade-in-element');
        });
        
        // Create intersection observer
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
            
            // Observe elements
            animatedElements.forEach(element => {
                observer.observe(element);
            });
        } else {
            // Fallback for browsers without Intersection Observer
            animatedElements.forEach(element => {
                element.classList.add('visible');
            });
        }
    }
    
    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', init);
})();
