document.addEventListener('DOMContentLoaded', () => {
    const page = document.querySelector('.page');
    const cards = document.querySelectorAll('.card');
    const langBtns = {
        en: document.getElementById('lang-en'),
        pt: document.getElementById('lang-pt')
    };

    const translations = {
        pt: {
            "head-title": "Vitro Nery | Portfólio Digital",
            "head-desc": "Engenheiro de Software apaixonado por criar soluções inovadoras e participar da comunidade tech.",
            "profile-title": "Engenheiro de Software | Entusiasta de Comunidade Tech",
            "status-text": "Disponível para oportunidades",
            "bio-content": `Sou um desenvolvedor apaixonado por criar soluções inovadoras e participar ativamente da
                comunidade tech. Com foco em <span class="bio-highlight">qualidade de código</span>,
                <span class="bio-highlight">design responsivo</span> e
                <span class="bio-highlight">experiência do usuário</span>,
                contribuo para projetos que fazem diferença.`,
            "divider-contact": "Contato",
            "link-email-title": "ENVIAR EMAIL",
            "divider-networks": "Redes Profissionais",
            "link-li-sub": "Conecte-se comigo",
            "link-gh-sub": "Meus projetos e contribuições",
            "link-wa-sub": "Entre em contato direto",
            "link-tt-sub": "Siga-me no TikTok",
            "footer-text": "© 2026 Vitro Nery. Todos os direitos reservados."
        },
        en: {
            "head-title": "Vitro Nery | Digital Portfolio",
            "head-desc": "Software Engineer passionate about creating innovative solutions and participating in the tech community.",
            "profile-title": "Software Engineer | Tech Enthusiast",
            "status-text": "Available for opportunities",
            "bio-content": `I am a developer passionate about creating innovative solutions and actively participating in the tech community. 
                Focusing on <span class="bio-highlight">code quality</span>, 
                <span class="bio-highlight">responsive design</span> and 
                <span class="bio-highlight">user experience</span>, 
                I contribute to projects that make a difference.`,
            "divider-contact": "Contact",
            "link-email-title": "SEND EMAIL",
            "divider-networks": "Professional Networks",
            "link-li-sub": "Connect with me",
            "link-gh-sub": "My projects and contributions",
            "link-wa-sub": "Contact me directly",
            "link-tt-sub": "Follow me on TikTok",
            "footer-text": "© 2026 Vitro Nery. All rights reserved."
        }
    };

    function setLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (key === 'head-title') {
                    document.title = translations[lang][key];
                } else if (key === 'head-desc') {
                    document.querySelector('meta[name="description"]').setAttribute('content', translations[lang][key]);
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });

        Object.values(langBtns).forEach(btn => btn.classList.remove('active'));
        langBtns[lang].classList.add('active');
        localStorage.setItem('preferred-lang', lang);
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    }

    // Init Language
    const savedLang = localStorage.getItem('preferred-lang');
    const browserLang = navigator.language.startsWith('pt') ? 'pt' : 'en';
    setLanguage(savedLang || browserLang);

    langBtns.en.addEventListener('click', () => setLanguage('en'));
    langBtns.pt.addEventListener('click', () => setLanguage('pt'));

    // --- Premium Animations (Point 2) ---

    // --- Preloader & Entrance Animation ---
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        
        // Give a tiny extra delay for a smoother feel
        setTimeout(() => {
            preloader.classList.add('fade-out');
            page.classList.add('visible');
            
            // Start staggered reveal only after preloader starts fading
            startEntranceAnimations();
        }, 1200);
    });

    function startEntranceAnimations() {
        const animatedElements = document.querySelectorAll('.lang-bar, .avatar-section, .section, .divider, .card');
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px) scale(0.98)';
            el.style.filter = 'blur(10px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0) scale(1)';
                el.style.filter = 'blur(0)';
            }, 100 + (index * 60));
        });
    }

    // Hover glow effect that follows the cursor on cards
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update custom properties for CSS (could be used for dynamic highlights)
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Magnetic effect refined
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (x - centerX) / 15;
            const deltaY = (y - centerY) / 8;

            card.style.transform = `translateY(-4px) translate(${deltaX}px, ${deltaY}px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0px)';
        });
    });

    // Tactile feedback on click - scale animation
    document.querySelectorAll('.card, .lang-btn, .social-icon').forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transition = 'transform 0.1s ease';
            btn.style.transform += ' scale(0.96)';
        });
        btn.addEventListener('mouseup', () => {
            btn.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            // Note: This needs careful management with other transforms
            // For card specifically, we reset to base state
            if(btn.classList.contains('card')) {
                btn.style.transform = 'translateY(-4px) scale(1)';
            } else {
                btn.style.transform = 'scale(1)';
            }
        });
    });

    // --- Advanced Interactive Light (Cursor Glow) ---
    const cursorGlow = document.querySelector('.cursor-glow');
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        // Smooth easing
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        document.documentElement.style.setProperty('--mx', `${currentX}px`);
        document.documentElement.style.setProperty('--my', `${currentY}px`);

        requestAnimationFrame(animateGlow);
    }
    animateGlow();
});
