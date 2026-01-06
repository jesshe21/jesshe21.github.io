// ===========================
// Loading Animation
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const jhPath = document.getElementById('jh-path');

    // Animate the JH drawing
    setTimeout(() => {
        jhPath.style.transition = 'stroke-dashoffset 2s ease-in-out';
        jhPath.style.strokeDashoffset = '0';
    }, 300);

    // Fade out loading screen and show main content
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2800);

    // Color picker functionality with dynamic accent colors
    const colorPicker = document.getElementById('bg-color-picker');
    const welcomeSection = document.getElementById('welcome');

    // Function to convert hex to HSL
    function hexToHSL(hex) {
        let r = parseInt(hex.slice(1, 3), 16) / 255;
        let g = parseInt(hex.slice(3, 5), 16) / 255;
        let b = parseInt(hex.slice(5, 7), 16) / 255;

        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }

        return [h * 360, s * 100, l * 100];
    }

    // Function to convert HSL to hex
    function hslToHex(h, s, l) {
        s /= 100;
        l /= 100;
        let c = (1 - Math.abs(2 * l - 1)) * s;
        let x = c * (1 - Math.abs((h / 60) % 2 - 1));
        let m = l - c / 2;
        let r = 0, g = 0, b = 0;

        if (0 <= h && h < 60) { r = c; g = x; b = 0; }
        else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
        else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
        else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
        else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
        else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

        r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
        g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
        b = Math.round((b + m) * 255).toString(16).padStart(2, '0');

        return `#${r}${g}${b}`;
    }

    // Function to generate accent color (same as primary)
    function generateAccentColor(primaryHex) {
        // Return the same color as the primary
        return primaryHex;
    }

    // Function to determine text color based on background lightness
    function getTextColor(bgHex) {
        let [h, s, l] = hexToHSL(bgHex);
        // If accent color is light, use dark text; if dark, use light text
        return l > 55 ? '#2a2a2a' : '#F9F7F2';
    }

    // Function to update all colors
    function updateColors(primaryColor) {
        const accentColor = generateAccentColor(primaryColor);
        const buttonTextColor = getTextColor(accentColor);
        const welcomeTextColor = getTextColor(primaryColor);

        // Update primary background colors
        welcomeSection.style.background = primaryColor;
        loadingScreen.style.background = primaryColor;

        // Update welcome section text color
        document.querySelectorAll('.welcome-text h1, .welcome-text p').forEach(el => {
            el.style.color = welcomeTextColor;
        });

        // Update all h3 headings (section category headings)
        document.querySelectorAll('h3').forEach(h3 => {
            h3.style.color = accentColor;
        });

        // Update section dividers
        document.querySelectorAll('section:not(#welcome)::before').forEach(el => {
            el.style.background = `linear-gradient(to right, transparent, ${accentColor}, transparent)`;
        });

        // Create a style element for pseudo-elements and dynamic styles
        let styleEl = document.getElementById('dynamic-colors');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'dynamic-colors';
            document.head.appendChild(styleEl);
        }

        styleEl.textContent = `
            .welcome-text h1 { color: ${welcomeTextColor} !important; }
            .welcome-text p { color: ${welcomeTextColor} !important; }
            #main-nav a { color: ${welcomeTextColor} !important; }
            .nav-icons { border-top-color: ${welcomeTextColor}33 !important; }
            .color-picker-icon { color: ${welcomeTextColor} !important; }
            .color-picker-wrapper::after { background-color: ${welcomeTextColor} !important; }
            .nav-linkedin-icon { color: ${welcomeTextColor} !important; }
            .nav-linkedin-icon::after { background-color: ${welcomeTextColor} !important; }
            body.scrolled #main-nav a { color: #2a2a2a !important; }
            body.scrolled .color-picker-icon { color: #2a2a2a !important; }
            body.scrolled .color-picker-wrapper::after { background-color: ${accentColor} !important; }
            body.scrolled .nav-linkedin-icon { color: #2a2a2a !important; }
            body.scrolled .nav-linkedin-icon::after { background-color: ${accentColor} !important; }
            h3 { color: ${accentColor} !important; }
            .about-content a {
                color: ${accentColor} !important;
                border-bottom-color: ${accentColor} !important;
            }
            section:not(#welcome)::before {
                color: ${accentColor} !important;
            }
            #main-nav a::after {
                background-color: ${accentColor} !important;
            }
            body.scrolled #main-nav a::after {
                background-color: ${accentColor} !important;
            }
            .origami-gallery img {
                box-shadow: 0 2px 12px ${accentColor}33 !important;
                border-color: ${accentColor}22 !important;
            }
            .origami-gallery img:hover {
                box-shadow: 0 12px 28px ${accentColor}44 !important;
                border-color: ${accentColor}55 !important;
            }
            .contact-form input:focus,
            .contact-form textarea:focus {
                border-color: ${accentColor} !important;
                box-shadow: 0 0 0 4px ${accentColor}22 !important;
            }
            .contact-form .send-button {
                background: transparent !important;
                background-color: transparent !important;
                color: #2a2a2a !important;
            }
            .contact-form .send-button:hover {
                background: transparent !important;
                background-color: transparent !important;
                box-shadow: none !important;
                color: ${accentColor} !important;
            }
        `;
    }

    if (colorPicker && welcomeSection) {
        colorPicker.addEventListener('input', function(e) {
            updateColors(e.target.value);
        });

        // Initialize with default color
        updateColors(colorPicker.value);
    }
});

// ===========================
// Smooth Scrolling for Navigation
// ===========================

document.querySelectorAll('#main-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');

        // Only handle internal anchor links, let external links work normally
        if (!targetId.startsWith('#')) {
            return;
        }

        e.preventDefault();

        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Active Navigation State & Color Change
// ===========================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#main-nav a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Change nav color when scrolling past welcome section
    if (window.pageYOffset > window.innerHeight - 100) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }

    // Update welcome section text color based on current welcome background color
    if (colorPicker && welcomeSection) {
        const welcomeBg = window.getComputedStyle(welcomeSection).backgroundColor;
        // Convert rgb to hex if needed, or use the current color picker value
        const currentColor = colorPicker.value;
        const welcomeTextColor = getTextColor(currentColor);
        document.querySelectorAll('.welcome-text h1, .welcome-text p').forEach(el => {
            el.style.color = welcomeTextColor;
        });
    }
});

// ===========================
// Gallery Image Loading
// ===========================

const galleryImages = document.querySelectorAll('.gallery-item img');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.6s ease-in-out';

            setTimeout(() => {
                img.style.opacity = '1';
            }, 100);

            observer.unobserve(img);
        }
    });
}, {
    threshold: 0.1
});

galleryImages.forEach(img => {
    imageObserver.observe(img);
});

// ===========================
// Form Handling
// ===========================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;

        button.textContent = 'Sending...';
        button.disabled = true;

        // Formspree handles the actual submission
        // Reset button after a delay if needed
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 3000);
    });
}
