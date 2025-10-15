/* ====================================
   FREELANCER PORTFOLIO - JAVASCRIPT
   ==================================== */

// ============= INITIALIZATION =============
document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initNavigation();
    initThemeToggle();
    initTypingEffect();
    initScrollAnimations();
    initCounters();
    initSkillBars();
    initPortfolioFilter();
    initPortfolioModal();
    initTestimonialSlider();
    initContactForm();
    initScrollTop();
    initSmoothScroll();
});

// ============= PRELOADER =============
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// ============= NAVIGATION =============
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('.section, .hero');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ============= DARK/LIGHT THEME TOGGLE =============
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'dark-theme') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.removeItem('theme');
        }
    });
}

// ============= TYPING EFFECT =============
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const words = [
        'Web Developer',
        'UI/UX Designer',
        'Freelancer',
        'Creative Designer',
        'Problem Solver'
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 100;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// ============= SCROLL ANIMATIONS =============
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll(
        '.service-card, .portfolio-item, .blog-card, .skill-item, .timeline-item, .contact-item'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ============= ANIMATED COUNTERS =============
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let counted = false;

    const countUp = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        updateCounter();
    };

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counters.forEach(counter => countUp(counter));
                counted = true;
            }
        });
    }, observerOptions);

    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
}

// ============= SKILL BARS ANIMATION =============
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    let animated = false;

    const animateSkills = () => {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    };

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateSkills();
                animated = true;
            }
        });
    }, observerOptions);

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// ============= PORTFOLIO FILTER =============
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============= PORTFOLIO MODAL =============
function initPortfolioModal() {
    const modal = document.getElementById('portfolio-modal');
    const viewBtns = document.querySelectorAll('.view-btn');
    const closeBtn = document.querySelector('.close-modal');

    // Portfolio project data
    const projects = {
        '1': {
            title: 'E-Commerce Website',
            category: 'Web Design / Development',
            image: 'images/portfolio-1.jpg',
            description: 'A fully responsive e-commerce platform built with modern web technologies. Features include product catalog, shopping cart, secure checkout, user authentication, and admin dashboard. The design focuses on user experience and conversion optimization.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Stripe API']
        },
        '2': {
            title: 'Mobile Banking App',
            category: 'App Development / UI Design',
            image: 'images/portfolio-2.jpg',
            description: 'A secure and intuitive mobile banking application with features like account management, fund transfers, bill payments, and transaction history. Designed with a focus on security and ease of use.',
            technologies: ['React Native', 'Redux', 'Node.js', 'Express', 'PostgreSQL', 'JWT']
        },
        '3': {
            title: 'Restaurant Dashboard',
            category: 'UI/UX Design',
            image: 'images/portfolio-3.jpg',
            description: 'A comprehensive dashboard for restaurant management including order tracking, inventory management, staff scheduling, and analytics. Clean and modern interface designed for efficiency.',
            technologies: ['Figma', 'Adobe XD', 'HTML5', 'CSS3', 'Chart.js', 'Vue.js']
        },
        '4': {
            title: 'Corporate Website',
            category: 'Web Design / SEO',
            image: 'images/portfolio-4.jpg',
            description: 'Professional corporate website with focus on SEO optimization and performance. Includes company information, services, blog, and contact forms. Fully optimized for search engines.',
            technologies: ['WordPress', 'PHP', 'SEO', 'Google Analytics', 'Schema Markup']
        },
        '5': {
            title: 'Fashion Store',
            category: 'E-Commerce / Shopify',
            image: 'images/portfolio-5.jpg',
            description: 'Custom Shopify theme for a fashion boutique. Features include product variants, wishlist, quick view, size guide, and Instagram integration. Mobile-first design approach.',
            technologies: ['Shopify', 'Liquid', 'JavaScript', 'SCSS', 'REST API']
        },
        '6': {
            title: 'Fitness Tracker App',
            category: 'Mobile App / React Native',
            image: 'images/portfolio-6.jpg',
            description: 'Comprehensive fitness tracking application with workout plans, calorie counter, progress tracking, and social features. Integrates with popular fitness wearables.',
            technologies: ['React Native', 'Firebase', 'Redux', 'Chart.js', 'Health Kit API']
        }
    };

    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            const project = projects[projectId];

            if (project) {
                document.getElementById('modal-title').textContent = project.title;
                document.getElementById('modal-category').textContent = project.category;
                document.getElementById('modal-img').src = project.image;
                document.getElementById('modal-description').textContent = project.description;

                // Update technologies
                const techContainer = document.getElementById('modal-tech');
                techContainer.innerHTML = '';
                project.technologies.forEach(tech => {
                    const span = document.createElement('span');
                    span.textContent = tech;
                    techContainer.appendChild(span);
                });

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ============= TESTIMONIAL SLIDER =============
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const dotsContainer = document.getElementById('testimonial-dots');

    if (testimonials.length === 0) return;

    let currentSlide = 0;

    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        showSlide(currentSlide);
    }

    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto slide
    setInterval(nextSlide, 5000);

    // Show first slide
    showSlide(0);
}

// ============= CONTACT FORM =============
function initContactForm() {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validate
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(formData.email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission (replace with actual API call)
        try {
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // In production, replace this with:
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // });

            showMessage('Thank you! Your message has been sent successfully.', 'success');
            form.reset();

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

        } catch (error) {
            showMessage('Oops! Something went wrong. Please try again.', 'error');
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
            submitBtn.disabled = false;
        }
    });

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';

        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
}

// ============= SCROLL TO TOP =============
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============= SMOOTH SCROLL =============
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's just '#'
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============= NEWSLETTER FORM =============
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        }
    });
}

// ============= LAZY LOADING IMAGES =============
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ============= PARALLAX EFFECT (Optional) =============
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.hero');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============= CONSOLE MESSAGE =============
console.log('%c👋 Welcome to My Portfolio!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 14px; color: #8b5cf6;');
console.log('%cLet\'s work together: your.email@example.com', 'font-size: 14px; color: #ec4899;');

