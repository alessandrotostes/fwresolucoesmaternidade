document.addEventListener('DOMContentLoaded', () => {

    // Intercepta cliques nos links para efeito de fade-out
    const internalLinks = document.querySelectorAll('a[href]');
    internalLinks.forEach(link => {
        const href = link.getAttribute('href');
        const target = link.getAttribute('target');
        if (href && !href.startsWith('#') && !href.startsWith('tel:') && !href.startsWith('mailto:') && !href.startsWith('https://wa.me') && target !== '_blank') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.body.classList.remove('loaded');
                setTimeout(() => {
                    window.location.href = href;
                }, 80);
            });
        }
    });

    // Sombra no header ao rolar a página
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('shadow-sm');
        } else {
            header.classList.remove('shadow-sm');
        }
    });

    // Toggle do menu mobile
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fechar ao clicar em algum link interno
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Rolagem suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação moderna de entrada ao rolar (Intersection Observer)
    const fadeElements = document.querySelectorAll('h1, h2, h3, p, .img-animate, .group, .faq-box, .step-card');
    
    // Configura estado inicial das animações por JS
    fadeElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = el.classList.contains('img-animate') || el.classList.contains('step-card')
            ? 'translateY(30px)' 
            : 'translateY(20px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    // Observer para animar apenas quando entrar na tela
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);    

    fadeElements.forEach(el => observer.observe(el));
});
