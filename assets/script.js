/**
 * ChinaMedConnect - Main JavaScript
 * Handles mobile menu, form submission, smooth scrolling, and animations
 */

document.addEventListener('DOMContentLoaded', function () {

    // ===== Mobile Menu Toggle =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const headerActions = document.querySelector('.header-actions');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            mainNav.classList.toggle('active');
            if (headerActions) {
                headerActions.classList.toggle('active');
            }
            // Animate hamburger
            this.classList.toggle('active');
        });

        // Close menu on link click
        mainNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                if (headerActions) {
                    headerActions.classList.remove('active');
                }
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    // ===== Consultation Form =====
    const consultForm = document.getElementById('consultForm');
    if (consultForm) {
        consultForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            // Show loading state
            btn.textContent = 'Submitting...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            // Simulate form submission (replace with real API call later)
            setTimeout(() => {
                btn.textContent = 'Submitted!';
                btn.style.background = '#0f6e56';
                btn.style.borderColor = '#0f6e56';

                // Show success message
                const msg = document.createElement('p');
                msg.style.cssText = 'color:#0f6e56;font-size:13px;margin-top:8px;text-align:center;';
                msg.textContent = 'Thank you! Our medical coordinator will contact you within 24 hours.';
                consultForm.appendChild(msg);

                // Reset after 3 seconds
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    if (msg.parentNode) {
                        msg.parentNode.removeChild(msg);
                    }
                    consultForm.reset();
                }, 3000);
            }, 1000);
        });
    }

    // ===== Search Bar Interaction =====
    const searchBtn = document.querySelector('.btn-search');
    if (searchBtn) {
        searchBtn.addEventListener('click', function () {
            const destination = document.querySelectorAll('.search-field select')[0].value;
            const treatment = document.querySelectorAll('.search-field select')[1].value;
            
            if (destination === 'Select Destination' && treatment === 'Select Treatment') {
                // Gentle nudge
                this.style.animation = 'shake 0.4s ease';
                setTimeout(() => { this.style.animation = ''; }, 400);
                return;
            }

            // Redirect to treatments page (replace with real search results page later)
            window.location.href = 'treatments.html';
        });
    }

    // ===== Scroll Animations =====
    const animateElements = document.querySelectorAll(
        '.feature-card, .destination-card, .treatment-card, .hospital-card, .testimonial-card'
    );

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    }

    // ===== Header Scroll Effect =====
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
        } else {
            header.style.boxShadow = '';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // ===== Number Counter Animation =====
    const trustNumbers = document.querySelectorAll('.trust-number');
    
    if (trustNumbers.length > 0 && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        trustNumbers.forEach(el => counterObserver.observe(el));
    }

    function animateCounter(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const number = parseInt(text.replace(/[^0-9]/g, ''));
        
        if (isNaN(number)) return;

        let current = 0;
        const increment = number / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            let display = Math.floor(current).toLocaleString();
            if (hasPlus) display += '+';
            if (hasPercent) display = Math.floor(current) + '%';
            element.textContent = display;
        }, 16);
    }

    // ===== Shake Animation (inject if not present) =====
    if (!document.getElementById('shake-style')) {
        const style = document.createElement('style');
        style.id = 'shake-style';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-6px); }
                75% { transform: translateX(6px); }
            }
        `;
        document.head.appendChild(style);
    }

});
