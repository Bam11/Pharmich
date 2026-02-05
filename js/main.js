/**
 * Main JavaScript functionality for Pharmich website
 * Handles video player and other interactive elements
 */

(function() {
    // DOM Elements
    const videoContainer = document.getElementById('videoContainer');
    const videoElement = document.getElementById('videoElement');
    const playButton = document.getElementById('videoPlayButton');
    
    // Initialize all functionality
    function init() {
        // Setup video player if elements exist
        if (videoContainer && videoElement && playButton) {
            setupVideoPlayer();
        }
        
        // Setup counters animation
        setupCounters();
    }
    
    // Video player functionality
    function setupVideoPlayer() {
        // Play video when button is clicked
        playButton.addEventListener('click', function() {
            videoElement.style.display = 'block';
            playButton.style.display = 'none';
            
            // Play with a small delay
            setTimeout(() => {
                videoElement.play().catch(error => {
                    console.log('Auto-play prevented by browser:', error);
                    resetVideoPlayer();
                });
            }, 100);
        });
        
        // Reset player when video ends
        videoElement.addEventListener('ended', resetVideoPlayer);
        
        // Pause video when it's not visible
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting && !videoElement.paused) {
                        videoElement.pause();
                    }
                });
            }, { threshold: 0.25 });
            
            observer.observe(videoContainer);
        }
    }
    
    // Reset video player state
    function resetVideoPlayer() {
        videoElement.style.display = 'none';
        playButton.style.display = 'flex';
    }
    
    // Setup counter animations
    function setupCounters() {
        const counters = document.querySelectorAll('.counter-number');
        
        if (counters.length === 0) return;
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'), 10);
                    const duration = 2000; // ms
                    const step = Math.ceil(target / (duration / 16)); // 60fps
                    
                    let current = 0;
                    const updateCounter = () => {
                        current += step;
                        if (current > target) current = target;
                        
                        counter.textContent = current + (counter.textContent.includes('+') ? '+' : '');
                        
                        if (current < target) {
                            requestAnimationFrame(updateCounter);
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', init);
})();
