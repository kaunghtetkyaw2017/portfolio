/* ============================
   Portfolio — Main Script
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initNavbar();
    initTerminal();
    initTypedEffect();
    initScrollReveal();
    initPipeline();
    initCountUp();
    initContactForm();
    initSmoothScroll();
    initCardGlow();
});

/* ============================
   Cursor Glow
   ============================ */
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animate);
    }

    animate();
}

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

    if (toggle && links) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            links.classList.toggle('active');
        });

        links.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                links.classList.remove('active');
            });
        });
    }
}

/* ============================
   Smooth Scroll
   ============================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ============================
   Terminal Animation
   ============================ */
function initTerminal() {
    const terminalBody = document.getElementById('terminal-body');
    if (!terminalBody) return;

    const commands = [
        {
            cmd: 'kubectl get nodes',
            output: [
                { text: 'NAME           STATUS   ROLES    AGE   VERSION', type: 'header' },
                { text: 'master-01      Ready    master   90d   v1.28.4', type: 'success' },
                { text: 'worker-01      Ready    worker   90d   v1.28.4', type: 'success' },
                { text: 'worker-02      Ready    worker   90d   v1.28.4', type: 'success' },
            ]
        },
        {
            cmd: 'terraform plan',
            output: [
                { text: 'Refreshing state...', type: '' },
                { text: 'Plan: 12 to add, 3 to change, 0 to destroy.', type: 'success' },
            ]
        },
        {
            cmd: 'docker ps --format "table {{.Names}}\\t{{.Status}}"',
            output: [
                { text: 'NAMES              STATUS', type: 'header' },
                { text: 'nginx-proxy        Up 30 days', type: 'success' },
                { text: 'app-server         Up 30 days', type: 'success' },
                { text: 'monitoring         Up 30 days', type: 'success' },
            ]
        },
        {
            cmd: 'helm list -A',
            output: [
                { text: 'NAME         NAMESPACE    STATUS    CHART', type: 'header' },
                { text: 'prometheus   monitoring   deployed  kube-prometheus-stack-45.7', type: 'success' },
                { text: 'argocd       argocd       deployed  argo-cd-5.51.4', type: 'success' },
                { text: 'ingress      ingress      deployed  ingress-nginx-4.8.3', type: 'success' },
            ]
        },
    ];

    let commandIndex = 0;

    function typeCommand(cmdText, element, callback) {
        let i = 0;
        const interval = setInterval(() => {
            element.textContent += cmdText[i];
            i++;
            if (i >= cmdText.length) {
                clearInterval(interval);
                if (callback) setTimeout(callback, 300);
            }
        }, 35);
    }

    function showOutput(outputs, parentEl, callback) {
        let i = 0;
        const interval = setInterval(() => {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.innerHTML = `<span class="output-line ${outputs[i].type}">${outputs[i].text}</span>`;
            parentEl.appendChild(line);
            i++;
            if (i >= outputs.length) {
                clearInterval(interval);
                if (callback) setTimeout(callback, 1500);
            }
        }, 120);
    }

    function runNextCommand() {
        if (commandIndex >= commands.length) {
            commandIndex = 0;
            setTimeout(() => {
                terminalBody.innerHTML = '';
                runNextCommand();
            }, 2000);
            return;
        }

        const { cmd, output } = commands[commandIndex];
        commandIndex++;

        const promptLine = document.createElement('div');
        promptLine.className = 'terminal-line';
        const promptSpan = document.createElement('span');
        promptSpan.className = 'prompt';
        promptSpan.textContent = '❯';
        const cmdSpan = document.createElement('span');
        cmdSpan.className = 'command';
        promptLine.appendChild(promptSpan);
        promptLine.appendChild(document.createTextNode(' '));
        promptLine.appendChild(cmdSpan);
        terminalBody.appendChild(promptLine);

        terminalBody.scrollTop = terminalBody.scrollHeight;

        typeCommand(cmd, cmdSpan, () => {
            showOutput(output, terminalBody, () => {
                terminalBody.scrollTop = terminalBody.scrollHeight;
                runNextCommand();
            });
        });
    }

    terminalBody.innerHTML = '';
    setTimeout(runNextCommand, 1200);
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
        'Infrastructure Automator',
        'Linux Enthusiast',
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

        let delay = isDeleting ? 30 : 70;

        if (!isDeleting && charIndex === currentText.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            delay = 400;
        }

        setTimeout(type, delay);
    }

    setTimeout(type, 800);
}

/* ============================
   Scroll Reveal
   ============================ */
function initScrollReveal() {
    const revealSelectors = [
        '.skill-card',
        '.project-card',
        '.cert-card',
        '.highlight-card',
        '.contact-info',
        '.contact-form',
        '.about-text',
        '.config-card',
        '.pipeline-stage'
    ];

    const revealElements = document.querySelectorAll(revealSelectors.join(', '));
    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => observer.observe(el));
}

/* ============================
   Pipeline Animation
   ============================ */
function initPipeline() {
    const stages = document.querySelectorAll('.pipeline-stage');
    const connectors = document.querySelectorAll('.pipeline-connector');
    const progressBar = document.getElementById('pipelineBar');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animatePipeline();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const pipelineWrapper = document.querySelector('.pipeline-wrapper');
    if (pipelineWrapper) {
        observer.observe(pipelineWrapper);
    }

    function animatePipeline() {
        stages.forEach((stage, i) => {
            setTimeout(() => {
                stage.classList.add('active');
                if (connectors[i]) {
                    connectors[i].classList.add('active');
                }
                const progress = ((i + 1) / stages.length) * 100;
                if (progressBar) progressBar.style.width = progress + '%';
            }, i * 400);
        });
    }
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
   Card Glow Effect
   ============================ */
function initCardGlow() {
    const cards = document.querySelectorAll('.skill-card, .project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });
}

/* ============================
   Contact Form — Web3Forms
   ============================ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<span>Sending...</span>';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        try {
            const formData = new FormData(form);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                btn.innerHTML = '<span>✓ Message Sent!</span>';
                btn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
                form.reset();
            } else {
                btn.innerHTML = '<span>✕ Failed to Send</span>';
                btn.style.background = 'linear-gradient(135deg, #ef4444, #f87171)';
            }
        } catch (error) {
            btn.innerHTML = '<span>✕ Network Error</span>';
            btn.style.background = 'linear-gradient(135deg, #ef4444, #f87171)';
        }

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
            btn.style.opacity = '';
        }, 3000);
    });
}
