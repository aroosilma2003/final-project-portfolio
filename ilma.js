
        // JavaScript to handle Project Modal Interaction
        document.addEventListener('DOMContentLoaded', () => {
            const modal = document.getElementById('project-modal');
            const closeBtn = document.querySelector('.modal-close');
            
            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('click', () => {
                    const img = card.querySelector('.project-thumb').src;
                    const title = card.querySelector('.project-title').innerText;
                    const desc = card.querySelector('.project-desc').innerText;
                    
                    document.getElementById('modal-img').src = img;
                    document.getElementById('modal-img').alt = title + ' project image';
                    document.getElementById('modal-title').innerText = title;
                    document.getElementById('modal-desc').innerText = desc;
                    
                    // Show modal
                    modal.style.display = 'flex';
                    modal.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden';
                });
            });

            // Close modal functions
            const closeModal = () => {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = 'auto';
            };

            closeBtn.addEventListener('click', closeModal);
            
            modal.addEventListener('click', (e) => { 
                if(e.target === modal) closeModal();
            });
            
            // Close with Escape key
            document.addEventListener('keydown', (e) => {
                if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
                    closeModal();
                }
            });
        });

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
const scrollProgress = document.getElementById('scroll-progress');
const typingText = document.getElementById('typing-text');
const contactForm = document.querySelector('.contact-form');

// Theme Management
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('.theme-icon');
    icon.textContent = theme === 'dark' ? '🌙' : '☀️';
}

// Mobile Menu
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    const isExpanded = nav.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
    menuToggle.setAttribute('aria-label', isExpanded ? 'Close menu' : 'Open menu');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
    });
});

// Scroll Progress
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Typing Animation
const typingWords = ['Medical Instrumentation', 'Biosignal Processing', 'Healthcare Technology', 'Biomedical Engineering'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

function typeEffect() {
    if (isPaused) return;
    
    const currentWord = typingWords[wordIndex];
    
    if (!isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentWord.length) {
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
            }, 2000);
        }
    } else {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % typingWords.length;
        }
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

// Canvas Background Animation
const canvas = document.getElementById('hero-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        initParticles();
    }
    
    function initParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                color: `rgba(76, 175, 80, ${Math.random() * 0.3 + 0.1})`
            });
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.y > canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = canvas.height;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Draw connections
            particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(76, 175, 80, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    // Initialize canvas
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateParticles();
}