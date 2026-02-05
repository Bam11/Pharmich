/**
 * Contact Page JavaScript for Pharmich website
 * Handles form validation, submission, and interactive elements
 */

(function() {
    // DOM Elements - Contact Form
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const resetFormButton = document.querySelector('.reset-form-button');
    
    // DOM Elements - Quote Form
    const quoteForm = document.getElementById('quoteForm');
    const quoteSuccess = document.getElementById('quoteSuccess');
    const resetQuoteButton = document.querySelector('.reset-quote-button');
    
    // DOM Elements - FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Initialize functions
    function init() {
        // Set up form event listeners
        setupForms();
        
        // Set up FAQ accordions
        setupFAQ();
        
        // Set up smooth scroll for contact links
        setupSmoothScroll();
        
        console.log('Contact page functionality initialized');
    }
    
    // Set up form validation and submission
    function setupForms() {
        // Contact Form
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactSubmit);
        }
        
        // Reset Form Button
        if (resetFormButton) {
            resetFormButton.addEventListener('click', resetContactForm);
        }
        
        // Quote Form
        if (quoteForm) {
            quoteForm.addEventListener('submit', handleQuoteSubmit);
        }
        
        // Reset Quote Button
        if (resetQuoteButton) {
            resetQuoteButton.addEventListener('click', resetQuoteForm);
        }
        
        // Form Input Animation
        const formControls = document.querySelectorAll('.form-control');
        
        formControls.forEach(input => {
            // Set initial state for pre-filled inputs
            if (input.value) {
                input.classList.add('has-value');
            }
            
            // Handle input events
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                
                if (this.value) {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
        });
    }
    
    // Handle contact form submission
    function handleContactSubmit(e) {
        e.preventDefault();
        
        // Basic form validation
        if (!validateForm(contactForm)) {
            return;
        }
        
        // Simulate form submission (replace with actual AJAX in production)
        const submitButton = contactForm.querySelector('.submit-button');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Show success message
            formSuccess.classList.add('active');
            
            // Reset button state
            submitButton.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
            submitButton.disabled = false;
            
            // Log form data (for demo purposes)
            const formData = new FormData(contactForm);
            const formValues = {};
            
            for (const [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Contact Form Submission:', formValues);
        }, 1500);
    }
    
    // Handle quote form submission
    function handleQuoteSubmit(e) {
        e.preventDefault();
        
        // Basic form validation
        if (!validateForm(quoteForm)) {
            return;
        }
        
        // Simulate form submission (replace with actual AJAX in production)
        const submitButton = quoteForm.querySelector('.quote-submit-button');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Show success message
            quoteSuccess.classList.add('active');
            
            // Reset button state
            submitButton.innerHTML = '<span>Submit Quote Request</span><i class="fas fa-file-invoice"></i>';
            submitButton.disabled = false;
            
            // Scroll to success message
            quoteSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Log form data (for demo purposes)
            const formData = new FormData(quoteForm);
            const formValues = {};
            
            for (const [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Quote Form Submission:', formValues);
        }, 1500);
    }
    
    // Reset contact form
    function resetContactForm() {
        contactForm.reset();
        formSuccess.classList.remove('active');
        
        // Reset form input states
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.classList.remove('has-value');
        });
    }
    
    // Reset quote form
    function resetQuoteForm() {
        quoteForm.reset();
        quoteSuccess.classList.remove('active');
        
        // Reset form input states
        const inputs = quoteForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.classList.remove('has-value');
        });
        
        // Scroll back to the form
        quoteForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Basic form validation
    function validateForm(form) {
        let isValid = true;
        const requiredInputs = form.querySelectorAll('[required]');
        
        // Reset previous validation styles
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        requiredInputs.forEach(input => {
            input.classList.remove('error');
            
            // Check if the input is empty
            if (!input.value.trim()) {
                isValid = false;
                showError(input, 'This field is required');
            }
            
            // Email validation
            if (input.type === 'email' && input.value.trim() !== '') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value)) {
                    isValid = false;
                    showError(input, 'Please enter a valid email address');
                }
            }
            
            // Phone validation (if required)
            if (input.type === 'tel' && input.value.trim() !== '' && input.hasAttribute('required')) {
                const phonePattern = /^[0-9()\-\s+]+$/;
                if (!phonePattern.test(input.value)) {
                    isValid = false;
                    showError(input, 'Please enter a valid phone number');
                }
            }
        });
        
        return isValid;
    }
    
    // Show error message for input
    function showError(input, message) {
        input.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Position the error message after the input or its parent wrapper
        const parent = input.closest('.form-floating') || input.closest('.select-wrapper') || input.parentElement;
        parent.insertAdjacentElement('afterend', errorDiv);
        
        // Highlight the input
        input.style.borderColor = '#ff5c5c';
        
        // Focus the first error input
        if (!document.querySelector('.error:focus')) {
            input.focus();
        }
    }
    
    // Set up FAQ accordion functionality
    function setupFAQ() {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close other open FAQs
                faqItems.forEach(faq => {
                    if (faq !== item && faq.classList.contains('active')) {
                        faq.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ
                item.classList.toggle('active');
            });
        });
    }
    
    // Set up smooth scrolling for internal links
    function setupSmoothScroll() {
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // Skip if it's not an internal anchor link
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Calculate header height for offset
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without scrolling
                    history.pushState(null, null, targetId);
                }
            });
        });
    }
    
    // Additional interactive elements
    function setupAdditionalInteractions() {
        // Add special hover effects for contact cards
        const contactCards = document.querySelectorAll('.contact-card');
        
        contactCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Add a subtle animation or effect
                this.querySelector('.contact-card-icon').style.transform = 'scale(1.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                // Reset the animation or effect
                this.querySelector('.contact-card-icon').style.transform = '';
            });
        });
    }
    
    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        init();
        setupAdditionalInteractions();
    });
})();
