// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// ===== SPRINKLES/CONFETTI EFFECT =====
function createSprinkles() {
    const container = document.getElementById('sprinklesContainer');
    const sprinkleCount = 50;
    const types = ['', 'type-2', 'type-3', 'type-4'];
    
    for (let i = 0; i < sprinkleCount; i++) {
        const sprinkle = document.createElement('div');
        sprinkle.className = `sprinkle ${types[Math.floor(Math.random() * types.length)]}`;
        
        const randomLeft = Math.random() * 100;
        const randomDelay = Math.random() * 2;
        const randomDuration = 2 + Math.random() * 1.5;
        const randomAngle = Math.random() * 60 - 30;
        
        sprinkle.style.left = randomLeft + '%';
        sprinkle.style.top = '-10px';
        sprinkle.style.animationDelay = randomDelay + 's';
        sprinkle.style.animationDuration = randomDuration + 's';
        sprinkle.style.setProperty('--angle', randomAngle + 'deg');
        
        container.appendChild(sprinkle);
        
        // Create new sprinkles continuously
        setTimeout(() => {
            sprinkle.remove();
        }, (randomDelay + randomDuration) * 1000);
    }
}

// Create initial sprinkles and keep creating new ones
createSprinkles();
setInterval(createSprinkles, 800);

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.dataset.animation || 'fadeIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-card, .timeline-item, .project-card, .education-card').forEach(el => {
    observer.observe(el);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Validate form
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill out all fields');
            return;
        }
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email');
            return;
        }
        
        // Show success message
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Message Sent! ✓';
        submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
        }, 3000);
        
        // In a real application, you would send this data to a server
        console.log({
            name: name,
            email: email,
            message: message,
            timestamp: new Date()
        });
    });
}

// Active nav link indicator
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = '#ffffff';
        }
    });
});

// Parallax effect on hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const floatingBox = document.querySelector('.floating-box');
    
    if (window.scrollY < 800) {
        floatingBox.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
});

// Counter animation for stats (optional feature)
function animateCounter(element, target, duration = 2000) {
    const startValue = parseInt(element.textContent) || 0;
    const difference = target - startValue;
    const steps = 60;
    const stepValue = difference / steps;
    let currentStep = 0;
    
    const interval = setInterval(() => {
        currentStep++;
        const newValue = Math.floor(startValue + stepValue * currentStep);
        element.textContent = newValue;
        
        if (currentStep >= steps) {
            element.textContent = target;
            clearInterval(interval);
        }
    }, duration / steps);
}

// Initialize animations when page loads
window.addEventListener('load', () => {
    console.log('Portfolio loaded successfully!');
    
    // Add fade-in animation to body
    document.body.style.animation = 'fadeIn 0.6s ease-out';
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
});

// Scroll to top button (optional)
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '↑';
scrollButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #6366f1, #ec4899);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 5px 20px rgba(99, 102, 241, 0.3);
`;

document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollButton.style.display = 'flex';
        scrollButton.style.alignItems = 'center';
        scrollButton.style.justifyContent = 'center';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollButton.addEventListener('mouseenter', () => {
    scrollButton.style.transform = 'scale(1.1)';
});

scrollButton.addEventListener('mouseleave', () => {
    scrollButton.style.transform = 'scale(1)';
});

// Add some interactive effects to skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
        this.style.animation = 'none';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.animation = '';
    });
});

// Project card hover effects with enhanced animations
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const img = this.querySelector('.project-image img');
        if (img) {
            img.style.filter = 'brightness(1.2) blur(1px) saturate(1.3)';
            img.style.transform = 'scale(1.15) rotate(2deg)';
        }
        this.style.animation = 'none';
    });
    
    card.addEventListener('mouseleave', function() {
        const img = this.querySelector('.project-image img');
        if (img) {
            img.style.filter = 'brightness(1) blur(0px) saturate(1)';
            img.style.transform = 'scale(1) rotate(0deg)';
        }
        this.style.animation = '';
    });
});

// Enhanced timeline interaction
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.querySelector('.timeline-marker').style.animation = 'none';
        this.querySelector('.timeline-marker').style.boxShadow = '0 0 20px 10px rgba(99, 102, 241, 0.6)';
        this.style.animation = 'none';
    });
    
    item.addEventListener('mouseleave', function() {
        this.querySelector('.timeline-marker').style.animation = '';
        this.querySelector('.timeline-marker').style.boxShadow = '';
        this.style.animation = '';
    });
});

// Enhanced education card effects
document.querySelectorAll('.education-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.education-icon');
        if (icon) {
            icon.style.animation = 'spin 0.6s linear';
            icon.style.transform = 'scale(1.3)';
        }
        this.style.animation = 'none';
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.education-icon');
        if (icon) {
            icon.style.animation = '';
            icon.style.transform = 'scale(1)';
        }
        this.style.animation = '';
    });
});

// Ripple effect on buttons
document.querySelectorAll('.cta-button, .submit-button, .social-link').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: rippleAnimation 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleAnimation {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-in';
});

// Cursor effect (optional - adds custom cursor)
document.addEventListener('mousemove', (e) => {
    // Custom cursor logic can be added here
});

// Service Worker for offline support (optional)
if ('serviceWorker' in navigator) {
    // Service worker registration can be added here
}

console.log('%cWelcome to the Portfolio!', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cThis portfolio is fully responsive and animated', 'font-size: 14px; color: #ec4899;');
// ===== EMAILJS CONTACT FORM =====

// Initialize EmailJS
document.addEventListener('DOMContentLoaded', () => {

    emailjs.init('07LMcHv5NvlxIVSLI'); // Public Key

    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = contactForm.querySelector('input[name="from_name"]');
        const email = contactForm.querySelector('input[name="from_email"]');
        const message = contactForm.querySelector('textarea[name="message"]');
        const submitButton = contactForm.querySelector('.submit-button');

        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        const templateParams = {
            from_name: name.value,
            from_email: email.value,
            message: message.value,
            time: new Date().toLocaleString()
        };

        emailjs.send(
            'service_7wtkiss',
            'template_kvke35m',
            templateParams
        )
        .then(() => {
            showNotification('Message sent successfully! 🚀', 'success');
            contactForm.reset();
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            showNotification('Failed to send message.', 'error');
        })
        .finally(() => {
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;
        });
    });
});



// Function to show notifications
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}
