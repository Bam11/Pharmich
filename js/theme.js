/**
 * Theme toggling functionality for Pharmich website
 * Handles switching between light and dark themes
 * Respects system preference but allows manual override
 */

(function() {
    // DOM Elements
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('pharmichTheme');
    
    // Function to set theme
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('pharmichTheme', theme);
        
        // Update icon visibility based on theme
        updateThemeIcon(theme);
    }
    
    // Function to update theme toggle icon
    function updateThemeIcon(theme) {
        const sunIcon = themeToggle.querySelector('.toggle-icon.sun');
        const moonIcon = themeToggle.querySelector('.toggle-icon.moon');
        
        if (theme === 'light') {
            sunIcon.style.opacity = '1';
            moonIcon.style.opacity = '0';
        } else {
            sunIcon.style.opacity = '0';
            moonIcon.style.opacity = '1';
        }
    }
    
    // Initialize theme based on preference or system default
    function initializeTheme() {
        if (savedTheme) {
            // User has a saved preference
            setTheme(savedTheme);
        } else {
            // Use system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }
    }
    
    // Toggle theme function
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }
    
    // Initialize theme
    initializeTheme();
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only update if the user hasn't set a manual preference
        if (!localStorage.getItem('pharmichTheme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    // Add event listener to toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    } else {
        console.warn('Theme toggle button not found');
    }
})();