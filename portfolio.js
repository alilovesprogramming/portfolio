// portfolio.js
document.addEventListener('DOMContentLoaded', function() {
    // Typed.js initialization
    const typed = new Typed('.typed-text', {
        strings: ['Designer', 'Developer', 'Freelancer'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 1000,
        loop: true
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.navbar__item');
    
    function setActiveNavItem() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const link = item.querySelector('a');
            if (link && link.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Throttle scroll event for performance
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(setActiveNavItem, 100);
    }, false);
    
    // Initial call
    setActiveNavItem();
});
// Smooth scrolling for navigation links
document.querySelectorAll('.navbar__link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Scroll to the section
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL without jumping
            history.pushState(null, null, targetId);
            
            // Update active nav item
            updateActiveNavItem(targetId);
        }
    });
});

// Update active nav item based on scroll position
function updateActiveNavItem(targetId) {
    document.querySelectorAll('.navbar__item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNavItem = document.querySelector(`.navbar__link[href="${targetId}"]`).parentElement;
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
}

// Intersection Observer for both animations and active nav items
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.navbar__item');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate section
                entry.target.classList.add('visible');
                
                // Update active nav item
                const id = entry.target.getAttribute('id');
                updateActiveNavItem(`#${id}`);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Make sure home section is immediately visible
    document.querySelector('#home').classList.add('visible');
    
    // Highlight current section on page load
    if (window.location.hash) {
        const initialSection = document.querySelector(window.location.hash);
        if (initialSection) {
            initialSection.scrollIntoView();
            updateActiveNavItem(window.location.hash);
        }
    }
});

// Update your existing Intersection Observer to include resume sections
const resumeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars
            if (entry.target.querySelector('.skill-level')) {
                const skillBars = entry.target.querySelectorAll('.skill-level');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.resume-section').forEach(section => {
    resumeObserver.observe(section);
});











