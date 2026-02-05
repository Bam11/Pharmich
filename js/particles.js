/**
 * Particle animation for Pharmich website
 * Creates floating particles in the background
 */

(function() {
    // Get particle container
    const container = document.getElementById('particles');
    if (!container) return;
    
    // Configuration
    const config = {
        particleCount: 30,
        minSize: 3,
        maxSize: 8,
        minDuration: 10,
        maxDuration: 20,
        minDelay: 0,
        maxDelay: 5,
        minOpacity: 0.1,
        maxOpacity: 0.4
    };
    
    // Create particles
    function createParticles() {
        for (let i = 0; i < config.particleCount; i++) {
            // Create particle element
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size
            const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random animation
            const duration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;
            const delay = Math.random() * (config.maxDelay - config.minDelay) + config.minDelay;
            
            // Set animation properties
            particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
            
            // Random opacity
            particle.style.opacity = Math.random() * (config.maxOpacity - config.minOpacity) + config.minOpacity;
            
            // Append to container
            container.appendChild(particle);
        }
    }
    
    // Initialize particles
    createParticles();
})();
