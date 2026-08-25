// ==========================================================================
// 1. THEME TOGGLE CONTROLLER & STATUS BADGE
// ==========================================================================
const themeToggleCheckbox = document.getElementById('theme-toggle');
const heroTagText = document.getElementById('hero-status-tag');

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

applyTheme(initialTheme);

function applyTheme(theme) {
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeToggleCheckbox) themeToggleCheckbox.checked = true;
        if (heroTagText) heroTagText.textContent = "🕷️ Spider-Man";
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (themeToggleCheckbox) themeToggleCheckbox.checked = false;
        if (heroTagText) heroTagText.textContent = "🦇 Dark Knight";
    }
    localStorage.setItem('theme', theme);
}

// Listen for checkbox toggle
if (themeToggleCheckbox) {
    themeToggleCheckbox.addEventListener('change', (e) => {
        applyTheme(e.target.checked ? 'light' : 'dark');
    });
}

// ==========================================================================
// 2. INTERACTIVE HANGING HERO (BUNGEE BOUNCE)
// ==========================================================================
const hangingHero = document.getElementById('hanging-hero');

if (hangingHero) {
    hangingHero.addEventListener('click', () => {
        // Prevent clicking again if it is already in the middle of a bounce
        if (hangingHero.classList.contains('is-bouncing')) return;

        // Add class to stretch the web down quickly
        hangingHero.classList.add('is-bouncing');
        
        // Wait 250ms, then remove class to trigger the bouncy CSS snap-back
        setTimeout(() => {
            hangingHero.classList.remove('is-bouncing');
        }, 250);
    });
}

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

