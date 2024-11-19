class ScrollManager {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-menu a');
        this.sections = document.querySelectorAll('.section');
        this.init();
        this.setupScrollAnimation();
        this.setupScrollSpy();
    }
    
    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').slice(1);
                
                if (targetId === 'home') {
                    this.scrollToTop();
                    this.updateActiveLink(link);
                    return;
                }
                
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    this.scrollToSection(targetSection);
                    this.updateActiveLink(link);
                }
            });
        });
    }
    
    setupScrollSpy() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    this.updateActiveLink(document.querySelector(`.nav-menu a[href="#${id}"]`));
                }
            });
        }, {
            threshold: 0.5
        });

        this.sections.forEach(section => {
            observer.observe(section);
        });

        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;

            this.sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    const id = section.id;
                    this.updateActiveLink(document.querySelector(`.nav-menu a[href="#${id}"]`));
                }
            });
        });
    }
    
    updateActiveLink(activeLink) {
        if (!activeLink) return;
        
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        activeLink.classList.add('active');
    }
    
    scrollToSection(section) {
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = section.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            section.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 300);
    }

    setupScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(50px)';
                    
                    requestAnimationFrame(() => {
                        entry.target.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });

        this.sections.forEach(section => {
            section.style.opacity = '0';
            observer.observe(section);
        });

        window.addEventListener('scroll', () => {
            this.sections.forEach(section => {
                if (this.isElementInViewport(section)) {
                    this.animateChildren(section);
                }
            });
        });
    }

    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    animateChildren(section) {
        const elements = section.querySelectorAll('.project-card, .blog-post, .carousel, .contact-form');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                
                requestAnimationFrame(() => {
                    element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                });
            }, index * 200);
        });
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

new ScrollManager(); 