/**
 * JavaScript functionality for Pharmich service pages
 * Handles tabs, animations, and interactive elements
 */

(function() {
    // DOM Elements
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const playButton = document.querySelector('.play-button');
    const videoContainer = document.querySelector('.overview-video');
    
    // Initialize all functionality
    function init() {
        // Setup tabs if they exist
        if (tabButtons.length && tabContents.length) {
            setupTabs();
        }
        
        // Setup video player if it exists
        if (playButton && videoContainer) {
            setupVideoPlayer();
        }
        
        // Setup animation observers
        setupScrollAnimations();
    }
    
    // Tab functionality
    function setupTabs() {
        // Add click event to all tab buttons
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Video player functionality
    function setupVideoPlayer() {
        playButton.addEventListener('click', function() {
            // Here you would typically replace the image with an actual video player
            // For now, let's simulate by changing content and adding a play animation
            
            const videoThumbnail = videoContainer.querySelector('img');
            const overlay = document.createElement('div');
            overlay.className = 'video-playing-overlay';
            overlay.innerHTML = '<i class="fas fa-play-circle"></i><p>Video would play here</p>';
            
            // Style the overlay
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            overlay.style.display = 'flex';
            overlay.style.flexDirection = 'column';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.color = 'white';
            overlay.style.fontSize = '1.5rem';
            overlay.style.zIndex = '10';
            
            // Style the icon
            overlay.querySelector('i').style.fontSize = '4rem';
            overlay.querySelector('i').style.marginBottom = '1rem';
            overlay.querySelector('i').style.color = 'var(--accent-color)';
            
            // Hide the play button and add overlay
            playButton.style.display = 'none';
            videoContainer.appendChild(overlay);
            
            // In a real implementation, you would initialize and play the video here
            console.log('Video would start playing here');
        });
    }
    
    // Scroll animations
    function setupScrollAnimations() {
        if (!('IntersectionObserver' in window)) return;
        
        // Elements to animate on scroll
        const animatedElements = document.querySelectorAll(
            '.tab-content, .tech-card, .facility-card, .benefit-card, .model-card, .process-step, .case-study-card, .related-card'
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
                    
                    // If it's a tab content that's becoming visible, make sure the correct tab is active
                    if (entry.target.classList.contains('tab-content') && entry.target.classList.contains('active')) {
                        const tabId = entry.target.id;
                        tabButtons.forEach(button => {
                            if (button.getAttribute('data-tab') === tabId) {
                                button.classList.add('active');
                            } else {
                                button.classList.remove('active');
                            }
                        });
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });
        
        // Observe elements
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Handle hash links for tabs
    function handleHashTabs() {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#tab')) {
            const tabNumber = hash.substring(4); // Get the number after '#tab'
            const tabId = `tab${tabNumber}`;
            const tabButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
            
            if (tabButton) {
                // Simulate click on the tab button
                tabButton.click();
                
                // Scroll to the tabs section
                const tabsSection = document.querySelector('.key-services');
                if (tabsSection) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: tabsSection.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            }
        }
    }
    
    // Counter animation
    function animateCounters() {
        const counterElements = document.querySelectorAll('.result-number');
        
        if (!counterElements.length) return;
        
        counterElements.forEach(counter => {
            // Get the target number
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const duration = 2000; // Duration in milliseconds
            const step = Math.ceil(target / (duration / 16)); // Approximate 60fps
            let current = 0;
            
            // Reset the counter
            counter.textContent = '0%';
            
            // Animate with requestAnimationFrame
            const updateCounter = () => {
                current += step;
                if (current > target) {
                    current = target;
                }
                
                counter.textContent = current + '%';
                
                if (current < target) {
                    requestAnimationFrame(updateCounter);
                }
            };
            
            // Start animation with IntersectionObserver
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        init();
        handleHashTabs();
        animateCounters();
        
        // Re-check hash on hash change
        window.addEventListener('hashchange', handleHashTabs);
    });
})();
