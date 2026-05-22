/* ===================================================
   Aussie Migration - Interactive JavaScript
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Header Scroll Effect ----------
    const header = document.getElementById('header');
    const isHomePage = header && !header.classList.contains('scrolled');

    if (isHomePage) {
        const handleScroll = () => {
            if (window.scrollY > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    // ---------- Mobile Menu Toggle ----------
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navOverlay = document.getElementById('nav-overlay');

    if (menuToggle && navLinks) {
        const toggleMenu = () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            if (navOverlay) navOverlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        };

        menuToggle.addEventListener('click', toggleMenu);
        if (navOverlay) navOverlay.addEventListener('click', toggleMenu);

        // Close menu on link click
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    // ---------- Scroll Animations (Intersection Observer) ----------
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Stagger animation for sibling elements
                        const delay = entry.target.dataset.delay || 0;
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        animatedElements.forEach((el, index) => {
            // Add stagger delay for grid items
            const parent = el.parentElement;
            if (parent) {
                const siblings = parent.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
                if (siblings.length > 1) {
                    const siblingIndex = Array.from(siblings).indexOf(el);
                    el.dataset.delay = siblingIndex * 100;
                }
            }
            observer.observe(el);
        });
    }

    // ---------- Smooth Scroll for Anchor Links ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---------- Counter Animation ----------
    const counters = document.querySelectorAll('.hero-stat-number');
    
    if (counters.length > 0) {
        const observerCounter = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const text = el.textContent;
                        const numMatch = text.match(/(\d+)/);
                        
                        if (numMatch) {
                            const target = parseInt(numMatch[1]);
                            const suffix = text.replace(numMatch[1], '');
                            let current = 0;
                            const increment = Math.ceil(target / 60);
                            const duration = 1500;
                            const stepTime = duration / (target / increment);

                            const timer = setInterval(() => {
                                current += increment;
                                if (current >= target) {
                                    current = target;
                                    clearInterval(timer);
                                }
                                el.textContent = current + suffix;
                            }, stepTime);
                        }
                        
                        observerCounter.unobserve(el);
                    }
                });
            },
            { threshold: 0.5 }
        );

        counters.forEach(counter => observerCounter.observe(counter));
    }

    // ---------- Contact Form Handling ----------
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('form-submit');
            const originalText = submitBtn.innerHTML;
            
            // Simulate submission
            submitBtn.innerHTML = 'Sending... ⏳';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            setTimeout(() => {
                submitBtn.innerHTML = 'Message Sent ✓';
                submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
                submitBtn.style.color = '#fff';
                submitBtn.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.3)';
                
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                    submitBtn.style.boxShadow = '';
                }, 3000);
            }, 1500);
        });
    }

    // ---------- Parallax Effect on Hero ----------
    const heroBg = document.querySelector('.hero-bg img');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroBg.style.transform = `scale(1.05) translateY(${rate}px)`;
        }, { passive: true });
    }

});
