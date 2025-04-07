/**
 * Portfolio Website JavaScript
 * This file handles all interactive functionality for the portfolio
 */

// ==============================================
// DOM ELEMENT SELECTIONS
// ==============================================
// Selecting important elements once at the beginning improves performance
const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const sunIcon = document.querySelector('.fa-sun');
const moonIcon = document.querySelector('.fa-moon');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const floatingNav = document.querySelector('.floating-nav');
const typedTextElement = document.getElementById('typed-text');

// ==============================================
// THEME TOGGLE FUNCTIONALITY
// ==============================================
// This allows users to switch between light and dark mode
themeToggle.addEventListener('click', () => {
    // Toggle the dark-mode class on the body
    body.classList.toggle('dark-mode');
    
    // Update which icon appears active
    sunIcon.classList.toggle('active');
    moonIcon.classList.toggle('active');
    
    // Save user preference to localStorage so it persists between visits
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
});

// ==============================================
// DOCUMENT READY OPERATIONS
// ==============================================
// This function runs when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // --- FLOATING NAVIGATION ---
    const floatingNav = document.querySelector('.floating-nav');
    const floatingNavLinks = document.querySelectorAll('.floating-nav-links a');
    const sections = document.querySelectorAll('section[id]');
    
    // Check if we're on mobile view
    function isMobileView() {
        return window.innerWidth <= 992;
    }
    
    // Hide/show floating nav based on screen size
    function updateNavVisibility() {
        if (isMobileView()) {
            floatingNav.style.display = 'flex';
        } else {
            floatingNav.style.display = 'none';
        }
    }
    
    // Run on page load
    updateNavVisibility();
    
    // Run on resize
    window.addEventListener('resize', updateNavVisibility);
    
    // Highlight active section in floating nav
    function highlightNavLink() {
        if (!isMobileView()) return; // Only run on mobile
        
        let scrollPosition = window.scrollY;
        
        // Make nav more visible when scrolling down
        if (scrollPosition > 300) {
            floatingNav.classList.add('scroll-active');
        } else {
            floatingNav.classList.remove('scroll-active');
        }
        
        // Highlight current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                floatingNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Run on scroll
    window.addEventListener('scroll', highlightNavLink);
    
    // Run on page load
    highlightNavLink();

    // --- HEADER SCROLL EFFECT ---
    
    // Function to handle header appearance on scroll
    
    // --- SKILLS TABS ---
    
    // Handle skills section tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.skills-tab-content');
    
    if(tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const target = button.dataset.target;
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                document.getElementById(target).classList.add('active');
            });
        });
    }
    
    // --- PROJECT FILTERING ---
    
    // Handle project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    if(filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects with smooth animation
                projects.forEach(project => {
                    const categories = project.dataset.category;
                    
                    if(filter === 'all' || categories.includes(filter)) {
                        project.style.display = '';
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = '';
                        }, 50);
                    } else {
                        project.style.opacity = '0';
                        project.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            project.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // --- SMOOTH SCROLLING ---
    
    // Enable smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Account for fixed header height
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // --- CODE WINDOW 3D EFFECT ---
    
    // Add 3D hover effect to the code window
    const codeWindow = document.querySelector('.code-window');
    if (codeWindow) {
        codeWindow.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            codeWindow.style.transform = `perspective(800px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        codeWindow.addEventListener('mouseenter', function() {
            codeWindow.style.transition = 'none';
        });
        
        codeWindow.addEventListener('mouseleave', function() {
            codeWindow.style.transition = 'transform 0.5s ease';
            codeWindow.style.transform = 'perspective(800px) rotateX(5deg) rotateY(-5deg)';
        });
    }
    
    
    // --- PARTICLES.JS INITIALIZATION ---
    
    // Initialize particles.js if the library is loaded
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#7289da"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                },
                "size": {
                    "value": 3,
                    "random": true,
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#7289da",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // --- THEME PREFERENCE CHECK ---
    
    // Check for saved theme preference
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedDarkMode === 'true') {
        body.classList.add('dark-mode');
        moonIcon.classList.add('active');
        sunIcon.classList.remove('active');
    } else {
        body.classList.remove('dark-mode');
        sunIcon.classList.add('active');
        moonIcon.classList.remove('active');
    }
    
    // --- START TYPING EFFECT ---
    
    // Start the typing effect if the element exists
    if (typedTextElement) {
        setTimeout(() => {
            typeWriter(typedTextElement, "Computer Science Student", 80);
        }, 1000);
    }
    
    // --- INITIALIZE EVENT LISTENERS ---
    
    // Set up event listeners for scroll effects
    
   
});

// ==============================================
// TYPING EFFECT FUNCTIONS
// ==============================================
/**
 * Creates a typewriter effect on the specified element
 * @param {HTMLElement} textElement - The element to apply the effect to
 * @param {string} text - The text to type
 * @param {number} speed - Typing speed in milliseconds per character
 */
function typeWriter(textElement, text, speed = 100) {
    let i = 0;
    textElement.textContent = '';
    
    // Type one character at a time
    function type() {
        if (i < text.length) {
            textElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add blinking cursor effect after typing is complete
            textElement.classList.add('typing-complete');
            
            // After a delay, start erasing
            setTimeout(() => {
                eraseText(textElement, text, speed / 2);
            }, 2000);
        }
    }
    
    type();
}


