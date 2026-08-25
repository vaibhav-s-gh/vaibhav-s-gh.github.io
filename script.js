// ==========================================================================
// INTERSECTION OBSERVER FOR SCROLL REVEAL
// ==========================================================================
const observerOptions = {
    root: null,           // Uses viewport as boundary
    rootMargin: '0px',
    threshold: 0.15       // Triggers when 15% of the element is visible
};

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Unobserve so animation only plays once on entry
            observer.unobserve(entry.target);
        }
    });
};

const scrollObserver = new IntersectionObserver(revealCallback, observerOptions);

// Observe all elements with .reveal class
document.querySelectorAll('.reveal, .reveal-stagger').forEach(element => {
    scrollObserver.observe(element);
});

// ==========================================================================
// SCROLLSPY ACTIVE LINK HIGHLIGHTER
// ==========================================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a');

const spyObserverOptions = {
    root: null,
    // Negative margins focus detection around the upper-middle of the viewport
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
};

const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            
            // Remove active class from all links
            navLinks.forEach((link) => {
                link.classList.remove('active');
                
                // Add active class to the matching link
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, spyObserverOptions);

// Observe all sections that have an ID
sections.forEach((section) => spyObserver.observe(section));