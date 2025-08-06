// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.bindEvents();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const themeToggle = document.getElementById('theme-toggle');
        const icon = themeToggle.querySelector('i');
        
        if (this.theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => this.toggleTheme());
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
        this.setActiveLink();
    }

    bindEvents() {
        // Hamburger menu toggle
        this.hamburger.addEventListener('click', () => this.toggleMobileMenu());

        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Handle scroll events
        window.addEventListener('scroll', () => this.handleScroll());

        // Handle active link on scroll
        window.addEventListener('scroll', () => this.setActiveLink());

        // Smooth scroll for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.smoothScroll(e));
        });
    }

    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    smoothScroll(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.createObserver();
        this.observeElements();
        this.animateSkillBars();
    }

    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, this.observerOptions);
    }

    observeElements() {
        // Add animation classes to elements
        const elementsToAnimate = [
            { selector: '.hero-text', class: 'fade-in' },
            { selector: '.hero-image', class: 'fade-in' },
            { selector: '.about-text', class: 'slide-in-left' },
            { selector: '.about-image', class: 'slide-in-right' },
            { selector: '.timeline-item', class: 'fade-in' },
            { selector: '.project-card', class: 'fade-in' },
            { selector: '.skill-category', class: 'fade-in' },
            { selector: '.education-item', class: 'slide-in-left' },
            { selector: '.cert-item', class: 'fade-in' },
            { selector: '.award-item', class: 'fade-in' },
            { selector: '.contact-item', class: 'slide-in-left' },
            { selector: '.contact-form', class: 'slide-in-right' }
        ];

        elementsToAnimate.forEach(({ selector, class: animationClass }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                element.classList.add(animationClass);
                element.style.transitionDelay = `${index * 0.1}s`;
                this.observer.observe(element);
            });
        });
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.style.width;
                    skillBar.style.width = '0%';
                    setTimeout(() => {
                        skillBar.style.width = width;
                    }, 500);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => skillObserver.observe(bar));
    }
}

// Contact Form Manager
class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    // async handleSubmit(e) {
    //     e.preventDefault();
        
    //     const submitBtn = this.form.querySelector('button[type="submit"]');
    //     const originalText = submitBtn.textContent;
        
    //     // Show loading state
    //     submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    //     submitBtn.disabled = true;

    //     try {
    //         // Simulate form submission (replace with actual form handling)
    //         await this.simulateFormSubmission();
            
    //         // Show success message
    //         this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
    //         this.form.reset();
    //     } catch (error) {
    //         // Show error message
    //         this.showMessage('Failed to send message. Please try again.', 'error');
    //     } finally {
    //         // Reset button
    //         submitBtn.textContent = originalText;
    //         submitBtn.disabled = false;
    //     }
    // }
    async handleSubmit(e) {
        e.preventDefault();
        
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual form handling)
            await this.simulateFormSubmission();

            // ✅ SweetAlert2 success toast
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Message sent successfully!',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });

            this.form.reset();
        } catch (error) {
            // ❌ SweetAlert2 error toast
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Failed to send message. Please try again.',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }


    simulateFormSubmission() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }

    showMessage(message, type) {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        
        // Style the message
        messageEl.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background-color: #10b981;' : 'background-color: #ef4444;'}
        `;

        document.body.appendChild(messageEl);

        // Animate in
        setTimeout(() => {
            messageEl.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            messageEl.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(messageEl);
            }, 300);
        }, 5000);
    }
}

// Utility Functions
class UtilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupBackToTop();
        //this.setupResumeDownload();
        this.setupTypingEffect();
    }

    setupBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

//     setupResumeDownload() {
//         const resumeBtn = document.getElementById('download-resume');
        
//         resumeBtn.addEventListener('click', (e) => {
//             e.preventDefault();
            
//             // Create a simple resume content
//             const resumeContent = this.generateResumeContent();
//             const blob = new Blob([resumeContent], { type: 'text/plain' });
//             const url = URL.createObjectURL(blob);
            
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = 'Keyur_Ganorkar_Resume.pdf';
//             document.body.appendChild(a);
//             a.click();
//             document.body.removeChild(a);
//             URL.revokeObjectURL(url);
//         });
//     }

//     generateResumeContent() {
//         return `
// KEYUR GANORKAR
// IoT & Cybersecurity Engineer
// Email: keyurganorkar@gmail.com
// Phone: +91 7470311686
// Location: Jabalpur, Madhya Pradesh, India

// LinkedIn: https://www.linkedin.com/in/keyur-ganorkar-5709ba255
// GitHub: https://github.com/Keyur-Ganorkar
// LeetCode: https://leetcode.com/u/Keyur_G
// GeeksforGeeks: https://www.geeksforgeeks.org/user/keyurg2498/

// EDUCATION
// --------
// BTech, CSE with specialization in IoT, Cybersecurity including Blockchain Technology
// Gyan Ganga Institute of Technology And Sciences
// 2021 – 2025 | Jabalpur, India | CGPA: 8.46

// Secondary Education
// Kendriya Vidyalaya No.1 G.C.F
// 2019 – 2021 | Jabalpur, India | 87%

// EXPERIENCE
// ----------
// Kognivera Mentorship Program (Aug 2024 – Oct 2024)
// - Worked on real-life industrial project to enhance online learning
// - Focused on automating scholarship program management using Agile methodology

// Teaching Assistant (2023)
// - Provided training on Arduino programming using Arduino, Node MCU, and Arduino IDE
// - Worked under Prof. UN Bera at Gyan Ganga Institute of Technology and Science

// Research Work (2023)
// - Participated in research on advanced irrigation mechanisms
// - Presented at 13th IEEE International Conference

// PROJECTS
// --------
// 1. Scholarship Management Automation (Aug 2024 – Oct 2024)
//    - Developed web application using .NET framework
//    - Created Java mobile application with MySQL database

// 2. Smart Irrigation System - PATENTED (Sep 2023 – Nov 2023)
//    - IoT-based AI-powered irrigation system
//    - Patent No: 413505-001, Government of India

// 3. Automated Greenhouse Management (May 2023 – Jun 2023)
//    - Reduced energy consumption by 30%
//    - Improved crop quality by 20%

// 4. Hospital Management System (2022)
//    - Created using C++ for streamlined administration

// SKILLS
// ------
// Programming: C++, Python, Arduino, HTML, CSS, SQL
// Technologies: IoT, Cybersecurity, Blockchain, .NET, MySQL
// Tools: Adobe Photoshop, Lightroom, Wondershare Filmora
// Operating Systems: Linux, Windows

// CERTIFICATIONS
// --------------
// - Ethical Hacking
// - Linux Fundamental
// - AWS Academy Cloud Foundations
// - Programming Essentials in C++
// - Introduction to Cybersecurity
// - CCNAv7: Introduction to Networks
// - Programming Essentials in Python

// AWARDS
// ------
// - Winner, Smart India Hackathon (2023)
// - Patent Granted for Smart Irrigation System (2024)
// - Winner, Inter-School Football Competition (2016)
// - Winner, 5th International Mathematics Olympiad (2011)
//         `.trim();
//     }

    setupTypingEffect() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (!subtitle) return;

        const texts = [
            'IoT & Cybersecurity Engineer',
            'Smart Technology Innovator',
            'Automation Systems Developer',
            'Blockchain Technology Enthusiast'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;

        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                subtitle.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                subtitle.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && charIndex === currentText.length) {
                speed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            setTimeout(type, speed);
        };

        // Start typing effect after a delay
        setTimeout(type, 1000);
    }
}

// Performance Optimization
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.preloadCriticalResources();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalResources() {
        // Preload critical fonts
        const fontUrls = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
        ];

        fontUrls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = url;
            document.head.appendChild(link);
        });
    }
}

// Initialize Application
class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeManagers());
        } else {
            this.initializeManagers();
        }
    }

    initializeManagers() {
        // Initialize all managers
        this.themeManager = new ThemeManager();
        this.navigationManager = new NavigationManager();
        this.animationManager = new AnimationManager();
        this.contactFormManager = new ContactFormManager();
        this.utilityManager = new UtilityManager();
        this.performanceManager = new PerformanceManager();

        // Add loading complete class
        document.body.classList.add('loaded');
    }
}

// Start the application
new App();

// Resume Download Handler
document.addEventListener('DOMContentLoaded', function () {
    const resumeBtn = document.querySelector('.resume-download a');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function (e) {
            const href = resumeBtn.getAttribute('href');
            if (!href.endsWith('.pdf')) {
                e.preventDefault();
                Swal.fire({
                    icon: 'error',
                    title: 'Resume Not Found',
                    text: 'Resume PDF not found!',
                    confirmButtonColor: '#2563eb'
                });
                return;
            }
            Swal.fire({
                icon: 'success',
                title: 'Download Started',
                text: 'Your resume PDF is downloading!',
                timer: 1500,
                showConfirmButton: false
            });
            // Default behavior will download the PDF
        });
    }
});