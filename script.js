/* ============================
   Bento Dashboard — JavaScript
   GSAP + ScrollTrigger
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initTypedEffect();
    initCountUp();
    initContactForm();

    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initHeroAnimation();
        initBentoAnimations();
        initPipelineAnimation();
        initActiveNav();
    }
});

/* ============================
   Navbar
   ============================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('navToggle');
    const links = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('active');
        });
    });
}

/* ============================
   Typed Effect
   ============================ */
function initTypedEffect() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const texts = [
        'DevOps Engineer',
        'Cloud Architect',
        'Platform Engineer',
        'SRE Specialist',
        'Infrastructure Automator',
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            el.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            el.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? 30 : 80;

        if (!isDeleting && charIndex === currentText.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            delay = 500;
        }

        setTimeout(type, delay);
    }

    setTimeout(type, 800);
}

/* ============================
   GSAP Hero Animation
   ============================ */
function initHeroAnimation() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-greeting', { y: 20, opacity: 0, duration: 0.5 })
      .from('.hero-name', { y: 40, opacity: 0, duration: 0.7 }, '-=0.2')
      .from('.hero-title', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
      .from('.hero-desc', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
      .from('.hero-cta .btn', { y: 15, opacity: 0, stagger: 0.1, duration: 0.4 }, '-=0.2');

    // Animate stat cards with delay
    gsap.from('.stat-card', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.8,
        ease: 'power3.out'
    });
}

/* ============================
   GSAP Bento Grid Animations
   ============================ */
function initBentoAnimations() {
    // All bento cards except hero and stat cards (already animated)
    const cards = gsap.utils.toArray('.bento-card:not(.hero-card):not(.stat-card)');

    cards.forEach((card, i) => {
        gsap.from(card, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Skill badges stagger within each card
    gsap.utils.toArray('.skill-card').forEach(card => {
        gsap.from(card.querySelectorAll('.skill-badge'), {
            y: 10,
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
            }
        });
    });

    // Project cards — slight scale
    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            scale: 0.97,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
            }
        });
    });

    // Cert items stagger
    gsap.from('.cert-item', {
        x: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.cert-card',
            start: 'top 85%',
        }
    });

    // Experience cards
    gsap.utils.toArray('.exp-card').forEach(card => {
        gsap.from(card, {
            x: -30,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
            }
        });
    });

    // Contact form
    gsap.from('.contact-form .form-group', {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.contact-card',
            start: 'top 85%',
        }
    });
}

/* ============================
   Pipeline Animation
   ============================ */
function initPipelineAnimation() {
    const stages = gsap.utils.toArray('.pipe-stage');
    const lines = gsap.utils.toArray('.pipe-line');
    const fill = document.getElementById('pipelineFill');
    if (!stages.length || !fill) return;

    ScrollTrigger.create({
        trigger: '.pipeline-card',
        start: 'top 75%',
        onEnter: () => {
            const tl = gsap.timeline();
            stages.forEach((stage, i) => {
                tl.to(stage, {
                    onStart: () => stage.classList.add('active'),
                    duration: 0.01
                }, i * 0.25)
                .to(fill, {
                    width: ((i + 1) / stages.length * 100) + '%',
                    duration: 0.3,
                    ease: 'power2.out'
                }, i * 0.25);

                if (i < lines.length) {
                    tl.to(lines[i], {
                        onStart: () => lines[i].classList.add('active'),
                        duration: 0.01
                    }, i * 0.25 + 0.1);
                }
            });
        },
        once: true
    });
}

/* ============================
   Active Nav Tracking
   ============================ */
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onToggle: self => {
                if (self.isActive) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            }
        });
    });
}

/* ============================
   Count Up Animation
   ============================ */
function initCountUp() {
    const counters = document.querySelectorAll('.stat-value');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

    function animateCounter(el) {
        const target = parseFloat(el.dataset.target);
        const duration = 2000;
        const start = performance.now();
        const isDecimal = target % 1 !== 0;

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            const current = eased * target;
            el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = isDecimal ? target.toFixed(1) : target;
            }
        }

        requestAnimationFrame(update);
    }
}

/* ============================
   Contact Form
   ============================ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = 'Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)';
        btn.style.color = '#fff';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.color = '';
            form.reset();
        }, 3000);
    });
}
