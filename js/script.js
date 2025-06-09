// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create custom alert container
    createCustomAlertContainer();

    // Initialize mobile menu if screen width is below 768px
    if (window.innerWidth < 768) {
        createMobileMenu();
    }

    // Mobile menu toggle functionality
    const createMobileMenu = () => {
        // Create mobile menu button
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');

        if (!header || !nav) return;

        const mobileMenuBtn = document.createElement('div');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';

        header.insertBefore(mobileMenuBtn, nav);

        // Add click event to toggle menu
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    };

    // Only create mobile menu if screen width is below 768px
    if (window.innerWidth < 768) {
        createMobileMenu();
    }

    // Re-evaluate on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768) {
            if (!document.querySelector('.mobile-menu-btn')) {
                createMobileMenu();
            }
        } else {
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (mobileMenuBtn) {
                mobileMenuBtn.remove();
                document.querySelector('nav').classList.remove('active');
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            window.scrollTo({
                top: targetElement.offsetTop - 100, // Offset for fixed header
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.click();
            }
        });
    });

    // Initialize EmailJS
    // IMPORTANT: Replace these with your actual EmailJS credentials
    const EMAILJS_PUBLIC_KEY = "M-gCxxYWFy-o20V2D";
    const EMAILJS_SERVICE_ID = "service_faeq1eu";
    const EMAILJS_TEMPLATE_ID = "template_8bdqivk";

    // Initialize EmailJS with your public key
    if (window.emailjs) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validate form
            if (!name || !email || !subject || !message) {
                showCustomAlert('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showCustomAlert('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading message or spinner
            const submitBtn = document.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Create template parameters for EmailJS
            const templateParams = {
                from_name: name,
                from_email: email,
                phone: phone,
                subject: subject,
                message: message
            };

            // Send email using EmailJS
            if (window.emailjs) {
                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                    .then(function(response) {
                        console.log('Email sent successfully:', response);

                        // Show success message
                        showCustomAlert('Thank you for your message! We will get back to you soon.', 'success');

                        // Reset the form
                        contactForm.reset();
                    })
                    .catch(function(error) {
                        console.error('Email sending failed:', error);

                        // Show error message
                        showCustomAlert('Sorry, there was an error sending your message. Please try again later or contact us directly via email.', 'error');
                    })
                    .finally(function() {
                        // Restore button state
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                    });
            } else {
                // Fallback if EmailJS is not loaded
                console.log('EmailJS not loaded. Form data:', templateParams);
                showCustomAlert('Thank you for your message! We will get back to you soon. (Note: Email service is not configured)', 'success');
                contactForm.reset();
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Active class is now added after header is loaded

    // Create custom alert container
    function createCustomAlertContainer() {
        // Check if container already exists
        if (document.getElementById('custom-alert-container')) return;

        // Create container
        const alertContainer = document.createElement('div');
        alertContainer.id = 'custom-alert-container';
        document.body.appendChild(alertContainer);
    }

    // Show custom alert
    function showCustomAlert(message, type = 'success', duration = 5000) {
        const alertContainer = document.getElementById('custom-alert-container');
        if (!alertContainer) return;

        // Create alert element
        const alertElement = document.createElement('div');
        alertElement.className = `custom-alert ${type}`;

        // Create alert content
        const alertContent = document.createElement('div');
        alertContent.className = 'alert-content';
        alertContent.textContent = message;

        // Create close button
        const closeButton = document.createElement('button');
        closeButton.className = 'alert-close';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', function() {
            hideCustomAlert(alertElement);
        });

        // Assemble alert
        alertElement.appendChild(alertContent);
        alertElement.appendChild(closeButton);

        // Add to container
        alertContainer.appendChild(alertElement);

        // Show alert with animation
        setTimeout(() => {
            alertElement.classList.add('show');
        }, 10);

        // Auto-hide after duration
        if (duration > 0) {
            setTimeout(() => {
                hideCustomAlert(alertElement);
            }, duration);
        }

        return alertElement;
    }

    // Hide custom alert
    function hideCustomAlert(alertElement) {
        if (!alertElement) return;

        // Hide with animation
        alertElement.classList.remove('show');

        // Remove from DOM after animation
        setTimeout(() => {
            if (alertElement.parentNode) {
                alertElement.parentNode.removeChild(alertElement);
            }
        }, 300);
    }
});
