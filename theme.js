const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('.theme-icon');
const heroTagText = document.getElementById('hero-status-tag');

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

applyTheme(initialTheme);

function applyTheme(theme) {
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.textContent = '🕷️'; // Spidey Mode Toggle
        if (heroTagText) heroTagText.textContent = "🕷️ QUEENS_NET // SDE & HARDWARE";
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.textContent = '🦇'; // Batcave Mode Toggle
        if (heroTagText) heroTagText.textContent = "🦇 GOTHAM_OS // SDE & EMBEDDED";
    }
    localStorage.setItem('theme', theme);
}

themeToggleBtn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    applyTheme(isLight ? 'dark' : 'light');
});

// ==========================================================================
// MOBILE DRAWER CONTROLLER
// ==========================================================================
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');
const navOverlay = document.getElementById('nav-overlay');
const mobileNavLinks = document.querySelectorAll('.nav-menu .nav-link');

function toggleDrawer(open) {
    const shouldOpen = open !== undefined ? open : !navMenu.classList.contains('is-active');
    
    navMenu.classList.toggle('is-active', shouldOpen);
    hamburgerBtn.classList.toggle('is-active', shouldOpen);
    navOverlay.classList.toggle('is-active', shouldOpen);
    hamburgerBtn.setAttribute('aria-expanded', String(shouldOpen));
    
    // Prevent background scrolling while drawer is open
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
}

// Toggle on hamburger click
hamburgerBtn.addEventListener('click', () => toggleDrawer());

// Close when clicking outside on the overlay
navOverlay.addEventListener('click', () => toggleDrawer(false));

// Close automatically when a nav link is clicked
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleDrawer(false);
        }
    });
});

// Close drawer on window resize above mobile breakpoint
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('is-active')) {
        toggleDrawer(false);
    }
});

// ==========================================================================
// INTERACTIVE HANGING HERO (BUNGEE BOUNCE)
// ==========================================================================
// ==========================================================================
// INTERACTIVE HANGING HERO (BUNGEE BOUNCE)
// ==========================================================================
const hangingHero = document.getElementById('hanging-hero');

if (hangingHero) {
    hangingHero.addEventListener('click', () => {
        // Prevent clicking again if already bouncing
        if (hangingHero.classList.contains('is-bouncing')) return;

        // 1. Add class to stretch the web (fast pull-down)
        hangingHero.classList.add('is-bouncing');
        
        // 2. Wait 250ms, then remove class to trigger the bouncy CSS snap-back
        setTimeout(() => {
            hangingHero.classList.remove('is-bouncing');
        }, 250);
    });
}