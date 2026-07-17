document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initSmoothScroll();
    initScrollReveal();
    initCountUp();
    initHorizontalScroll();
    initContactForm();
});

/* ============================
   Navbar
   ============================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('active');
    });

    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('active');
        });
    });
}

/* ============================
   Smooth Scroll
   ============================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ============================
   Scroll Reveal
   ============================ */
function initScrollReveal() {
    const elements = document.querySelectorAll(
        '.section-label, .about-heading, .about-text, .about-stats, ' +
        '.skill-group, .pipeline-heading, .pipeline-step, ' +
        '.work-heading, .work-card, ' +
        '.certs-heading, .cert-item, ' +
        '.contact-heading, .contact-sub, .contact-link-item, .contact-form'
    );

    elements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    // Stagger skill groups
    document.querySelectorAll('.skill-group').forEach((el, i) => {
        el.dataset.delay = i * 80;
    });

    // Stagger pipeline steps
    document.querySelectorAll('.pipeline-step').forEach((el, i) => {
        el.dataset.delay = i * 100;
    });

    // Stagger cert items
    document.querySelectorAll('.cert-item').forEach((el, i) => {
        el.dataset.delay = i * 60;
    });

    // Stagger contact links
    document.querySelectorAll('.contact-link-item').forEach((el, i) => {
        el.dataset.delay = i * 80;
    });

    elements.forEach(el => observer.observe(el));
}

/* ============================
   Count Up Stats
   ============================ */
function initCountUp() {
    const stats = document.querySelectorAll('.about-stat-val[data-target]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateCount(el) {
    const target = parseFloat(el.dataset.target);
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;

        el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* ============================
   Horizontal Scroll for Work Section
   ============================ */
function initHorizontalScroll() {
    const wrapper = document.querySelector('.work-track-wrapper');
    if (!wrapper) return;

    // Allow mouse wheel horizontal scrolling
    wrapper.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            wrapper.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    // Drag to scroll
    let isDown = false;
    let startX;
    let scrollLeft;

    wrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        wrapper.style.cursor = 'grabbing';
        startX = e.pageX - wrapper.offsetLeft;
        scrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener('mouseleave', () => {
        isDown = false;
        wrapper.style.cursor = 'grab';
    });

    wrapper.addEventListener('mouseup', () => {
        isDown = false;
        wrapper.style.cursor = 'grab';
    });

    wrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 1.5;
        wrapper.scrollLeft = scrollLeft - walk;
    });

    wrapper.style.cursor = 'grab';
}

/* ============================
   Contact Form
   ============================ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const btnText = btn.querySelector('span');
        const originalText = btnText.textContent;

        btnText.textContent = 'Sending...';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
            });

            const data = await response.json();

            if (data.success) {
                btnText.textContent = '✓ Sent!';
                btn.style.background = '#10b981';
                form.reset();
            } else {
                btnText.textContent = '✗ Failed';
                btn.style.background = '#ef4444';
            }
        } catch {
            btnText.textContent = '✗ Error';
            btn.style.background = '#ef4444';
        }

        setTimeout(() => {
            btnText.textContent = originalText;
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.background = '';
        }, 3000);
    });
}
