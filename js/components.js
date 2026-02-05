/**
 * Pharmich Component Loader
 * Loads header and footer components automatically
 */

(function() {
    // Track loading state
    let headerLoaded = false;
    let footerLoaded = false;

    // Main initialization function
    function init() {
        loadHeader();
        loadFooter();
    }

    // Load header component
    function loadHeader() {
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (!headerPlaceholder) {
            console.warn('Header placeholder not found');
            return;
        }

        fetch('components/header.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load header (${response.status} ${response.statusText})`);
                }
                return response.text();
            })
            .then(html => {
                headerPlaceholder.innerHTML = html;
                headerLoaded = true;
                
                // Set active nav link based on current page
                setActiveNavLink();
                
                // Initialize header-specific scripts
                initHeaderScripts();
                
                // Check if everything is loaded
                checkAllLoaded();
            })
            .catch(error => {
                console.error('Error loading header:', error);
                headerPlaceholder.innerHTML = '<p class="error">Error loading header. Please refresh the page.</p>';
            });
    }

    // Load footer component
    function loadFooter() {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (!footerPlaceholder) {
            console.warn('Footer placeholder not found');
            return;
        }

        fetch('components/footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load footer (${response.status} ${response.statusText})`);
                }
                return response.text();
            })
            .then(html => {
                footerPlaceholder.innerHTML = html;
                footerLoaded = true;
                
                // Check if everything is loaded
                checkAllLoaded();
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                footerPlaceholder.innerHTML = '<p class="error">Error loading footer. Please refresh the page.</p>';
            });
    }

    // Set active navigation link based on current page
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Check if this link matches the current page
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') || 
                (href.includes(currentPage) && !href.includes('#'))) {
                link.classList.add('active');
            } else if (currentPage.includes('#') && href.includes(currentPage)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Initialize scripts specific to the header
    function initHeaderScripts() {
        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        
        if (menuToggle && mobileNav) {
            menuToggle.addEventListener('click', function() {
                menuToggle.classList.toggle('active');
                mobileNav.classList.toggle('active');
                
                // Animate hamburger icon
                const spans = menuToggle.querySelectorAll('span');
                
                if (menuToggle.classList.contains('active')) {
                    // Animate to X
                    spans[0].style.transform = 'translateY(8px) rotate(45deg)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
                } else {
                    // Reset to hamburger
                    spans[0].style.transform = '';
                    spans[1].style.opacity = '';
                    spans[2].style.transform = '';
                }
            });
        }
        
        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.main-header');
            if (header) {
                if (window.scrollY > 20) {
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                }
            }
        });
    }

    // Check if all components are loaded
    function checkAllLoaded() {
        if (headerLoaded && footerLoaded) {
            // All components loaded, initialize shared functionality
            console.log('All components loaded successfully');
            
            // Initialize theme toggle
            initThemeToggle();
        }
    }

    // Initialize theme toggle
    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        const html = document.documentElement;
        const savedTheme = localStorage.getItem('pharmichTheme');
        
        // Function to set theme
        function setTheme(theme) {
            html.setAttribute('data-theme', theme);
            localStorage.setItem('pharmichTheme', theme);
            updateThemeIcon(theme);
        }
        
        // Function to update theme toggle icon
        function updateThemeIcon(theme) {
            const sunIcon = themeToggle.querySelector('.toggle-icon.sun');
            const moonIcon = themeToggle.querySelector('.toggle-icon.moon');
            
            if (sunIcon && moonIcon) {
                if (theme === 'light') {
                    sunIcon.style.opacity = '1';
                    moonIcon.style.opacity = '0';
                } else {
                    sunIcon.style.opacity = '0';
                    moonIcon.style.opacity = '1';
                }
            }
        }
        
        // Initialize theme
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }
        
        // Toggle theme function
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
        
        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only update if the user hasn't set a manual preference
            if (!localStorage.getItem('pharmichTheme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', init);
})();
