// Shared behaviour for index.html and the case study pages.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Cursor glow (pointer devices only)
const glow = document.getElementById('cursor-glow');
if (glow && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
        glow.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
    });
}

// Navbar background once scrolled
const navbar = document.getElementById('navbar');
const onNavScroll = () => navbar && navbar.classList.toggle('scrolled', window.scrollY > 50);
window.addEventListener('scroll', onNavScroll, { passive: true });
onNavScroll();

// Mobile menu
const menuBtn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
if (menuBtn && menu) {
    const setMenu = (open) => {
        menu.classList.toggle('hidden', !open);
        menu.classList.toggle('flex', open);
        menuBtn.setAttribute('aria-expanded', String(open));
    };
    menuBtn.addEventListener('click', () => setMenu(menu.classList.contains('hidden')));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
}

// Reveal on scroll. Anything at or above the bottom of the viewport is shown,
// so jumping straight to an anchor (or scrolling fast) never leaves blank cards.
const fadeEls = Array.from(document.querySelectorAll('.fade-up'));
function reveal() {
    const limit = window.innerHeight * 0.95;
    for (const el of fadeEls) {
        if (!el.classList.contains('visible') && el.getBoundingClientRect().top < limit) {
            el.classList.add('visible');
        }
    }
}
if (reducedMotion) {
    fadeEls.forEach(el => el.classList.add('visible'));
} else {
    document.documentElement.classList.add('reveal-ready');
    // Checked directly on scroll (not via requestAnimationFrame, which pauses in
    // background tabs); the loop only measures cards that are still hidden.
    window.addEventListener('scroll', reveal, { passive: true });
    window.addEventListener('resize', reveal);
    window.addEventListener('hashchange', () => setTimeout(reveal, 50));
    window.addEventListener('load', reveal);
    reveal();
}

// Gallery modal
const modal = document.getElementById('image-modal');
const galleryContainer = document.getElementById('modal-gallery');
let lastFocus = null;

function openGallery(mediaUrls) {
    if (!modal) return;
    lastFocus = document.activeElement;
    galleryContainer.innerHTML = '';
    mediaUrls.forEach(url => {
        const isVideo = /\.(mp4|webm)$/i.test(url);
        const el = document.createElement(isVideo ? 'video' : 'img');
        el.src = url;
        el.className = 'w-full rounded-2xl border border-white/10 shadow-2xl';
        if (isVideo) {
            Object.assign(el, { controls: true, autoplay: true, loop: true, muted: true, playsInline: true });
        } else {
            el.loading = 'lazy';
            el.alt = '';
        }
        galleryContainer.appendChild(el);
    });
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.classList.add('opacity-100');
        modal.querySelector('button')?.focus();
    }, 10);
}

function closeGallery() {
    if (!modal || modal.classList.contains('hidden')) return;
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
        galleryContainer.innerHTML = '';
        lastFocus?.focus();
    }, 300);
}

if (modal) {
    modal.addEventListener('click', (e) => { if (e.target === modal) closeGallery(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeGallery(); });
}

// Finding explorer: tabs that swap a pair of bars
document.querySelectorAll('[data-explorer]').forEach(explorer => {
    const tabs = explorer.querySelectorAll('.finding-tab');
    const panels = explorer.querySelectorAll('[data-panel]');
    const animate = (panel) => {
        panel.querySelectorAll('.bar-fill').forEach(bar => {
            bar.style.width = '0';
            setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 30);
        });
    };
    const select = (tab) => {
        tabs.forEach(t => t.setAttribute('aria-selected', String(t === tab)));
        panels.forEach(p => {
            const on = p.dataset.panel === tab.dataset.tab;
            p.hidden = !on;
            if (on) animate(p);
        });
    };
    tabs.forEach(tab => tab.addEventListener('click', () => select(tab)));
    // Animate the first panel once it scrolls into view
    const io = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) {
            select(explorer.querySelector('.finding-tab[aria-selected="true"]') || tabs[0]);
            io.disconnect();
        }
    }, { threshold: 0.3 });
    io.observe(explorer);
});

// One-off confetti when the 1st-place hackathon card comes into view
const confettiTarget = document.getElementById('confetti-target');
if (confettiTarget && typeof confetti === 'function' && !reducedMotion) {
    const io = new IntersectionObserver((entries) => {
        if (!entries.some(e => e.isIntersecting)) return;
        io.disconnect();
        const end = Date.now() + 1800;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100, colors: ['#FFD700', '#FFA500', '#FF4500'] };
        const rand = (min, max) => Math.random() * (max - min) + min;
        const timer = setInterval(() => {
            const left = end - Date.now();
            if (left <= 0) return clearInterval(timer);
            const particleCount = 40 * (left / 1800);
            confetti({ ...defaults, particleCount, origin: { x: rand(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: rand(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    }, { threshold: 0.5 });
    io.observe(confettiTarget);
}
