
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

// 3D Tilt Effect for Cards
function add3DTilt(selector) {
    const cards = document.querySelectorAll(selector);
    cards.forEach(card => {
        card.style.transformStyle = 'preserve-3d';
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -8; // Max rotation deg
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transition = 'none';
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

add3DTilt('.project-card, .skill, .education-card, .hero-about');

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
        // 3D Sphere Configuration
        const particleCount = 300;
        const radius = Math.min(canvas.width, canvas.height) / 3;
        
        for (let i = 0; i < particleCount; i++) {
            // Spherical coordinates
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos((Math.random() * 2) - 1);
            
            particles.push({
                x: radius * Math.sin(phi) * Math.cos(theta),
                y: radius * Math.sin(phi) * Math.sin(theta),
                z: radius * Math.cos(phi),
                size: Math.random() * 2 + 0.5,
                color: `rgba(76, 175, 80, ${Math.random() * 0.4 + 0.2})`
            });
        }
    }
    
    let angleY = 0;
    let angleX = 0;

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        angleY += 0.002;
        angleX += 0.001;

        particles.forEach(particle => {
            // Rotate around Y axis
            let x = particle.x * Math.cos(angleY) - particle.z * Math.sin(angleY);
            let z = particle.z * Math.cos(angleY) + particle.x * Math.sin(angleY);
            
            // Rotate around X axis
            let y = particle.y * Math.cos(angleX) - z * Math.sin(angleX);
            z = y * Math.sin(angleX) + z * Math.cos(angleX);

            // 3D Projection
            const scale = 400 / (400 + z); // Perspective projection
            const x2d = x * scale + cx;
            const y2d = y * scale + cy;
            const size = particle.size * scale;
            
            ctx.beginPath();
            ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    // Initialize canvas
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateParticles();
}