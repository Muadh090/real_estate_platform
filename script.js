// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'white';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Property Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const propertyCards = document.querySelectorAll('.property-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        propertyCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            
            if (filterValue === 'all' || categories.includes(filterValue)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Counter Animation for Stats
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

function animateCounters() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target.toLocaleString();
                // Add '+' for certain stats
                if (target > 100) {
                    stat.textContent += '+';
                }
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is in view
const statsSection = document.querySelector('.stats');
const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animateCounters();
        }
    });
}, observerOptions);

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert(`Thank you ${name}! Your message has been sent successfully. We'll get back to you soon.`);
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (!email) {
            alert('Please enter your email address.');
            return;
        }
        
        // Simulate subscription
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for subscribing! You\'ll receive our latest updates and offers.');
            newsletterForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
}

// Property Card Actions (Like, Bookmark, Share)
const actionBtns = document.querySelectorAll('.action-btn');

actionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const icon = btn.querySelector('i');
        
        if (icon.classList.contains('fa-heart')) {
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            icon.style.color = icon.classList.contains('fas') ? '#ef4444' : '';
        } else if (icon.classList.contains('fa-bookmark')) {
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            icon.style.color = icon.classList.contains('fas') ? '#f59e0b' : '';
        } else if (icon.classList.contains('fa-share-alt')) {
            // Simulate share functionality
            const propertyCard = btn.closest('.property-card');
            const propertyTitle = propertyCard.querySelector('h3').textContent;
            const propertyPrice = propertyCard.querySelector('.property-price').textContent;
            
            if (navigator.share) {
                navigator.share({
                    title: propertyTitle,
                    text: `Check out this property: ${propertyTitle} - ${propertyPrice}`,
                    url: window.location.href
                }).catch(err => console.log('Error sharing:', err));
            } else {
                alert(`Share link copied to clipboard!\n\n${propertyTitle} - ${propertyPrice}`);
            }
        }
    });
});

// Search Functionality
const searchBtn = document.querySelector('.btn-search');

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const inputs = document.querySelectorAll('.search-inputs input, .search-inputs select');
        let hasValue = false;
        
        inputs.forEach(input => {
            if (input.value) {
                hasValue = true;
            }
        });
        
        if (!hasValue) {
            alert('Please enter at least one search criteria.');
            return;
        }
        
        // Simulate search
        const propertiesSection = document.getElementById('properties');
        propertiesSection.scrollIntoView({ behavior: 'smooth' });
        
        // Show success message
        setTimeout(() => {
            alert('Search results loaded! (This would connect to a backend in production)');
        }, 500);
    });
}

// Add scroll reveal animation
const revealElements = document.querySelectorAll('.property-card, .service-card, .testimonial-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--primary-color)';
        }
    });
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DreamHome Realty website loaded successfully!');
    
    // Add loaded class to body for any initial animations
    document.body.classList.add('loaded');
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reset mobile menu on resize
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.boxShadow = 'none';
        } else {
            navLinks.style.display = 'none';
        }
    }, 250);
});
