// Portfolio Data
// You can add 'embedCode' field to any project to show embedded content from Behance, CodePen, Figma, etc.
// Example: embedCode: '<iframe src="..." width="100%" height="600"></iframe>'
// Portfolio Data
const portfolioData = [
    {
        id: 1,
        title: "BRANDING FOR NEXUS",
        category: "branding",
        description: "Complete brand identity for a modern company",
        image: "images/portfolio-1.webp",
        behanceUrl: "https://www.behance.net/gallery/225697101/BRANDING-FOR-NEXUS"
    },
    {
        id: 2,
        title: "SOCIAL MEDIA POSTERS",
        category: "social-media",
        description: "Social media posters for a modern company",
        image: "images/portfolio-2.webp",
        behanceUrl: "https://www.behance.net/gallery/225183309/SOCIAL-MEDIA-POSTERS"
    },
    {
        id: 3,
        title: "MELBITES",
        category: "branding",
        description: "Complete brand identity for a modern company",
        image: "images/portfolio-3.webp",
        behanceUrl: "https://www.behance.net/gallery/225181275/MELBITES"
    },
    {
        id: 4,
        title: "BRANDING FOR JUOSO",
        category: "branding",
        description: "Complete brand identity for a modern company",
        image: "images/portfolio-4.webp",
        behanceUrl: "https://www.behance.net/gallery/224748549/BRANDING-FOR-JUOSO"
    }
];

// DOM Elements
const portfolioGrid = document.getElementById('portfolio-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('portfolio-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalDescription = document.getElementById('modal-description');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');

// Initialize Portfolio Grid
function initPortfolio() {
    renderPortfolio(portfolioData);
}

// Render Portfolio Items
function renderPortfolio(items) {
    portfolioGrid.innerHTML = '';

    items.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.dataset.category = item.category;
        portfolioItem.dataset.id = item.id;

        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="portfolio-overlay">
                <h3 class="portfolio-title">${item.title}</h3>
                <p class="portfolio-category">${item.category}</p>
            </div>
        `;

        portfolioItem.addEventListener('click', () => {
            if (item.behanceUrl) {
                // Open Behance project in new tab
                window.open(item.behanceUrl, '_blank');
            } else {
                // Fallback to modal
                openModal(item);
            }
        });
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Filter Portfolio
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;

        if (filter === 'all') {
            renderPortfolio(portfolioData);
        } else {
            const filtered = portfolioData.filter(item => item.category === filter);
            renderPortfolio(filtered);
        }
    });
});

// Modal Functions
// Open Modal with Gallery Support
function openModal(item) {
    const modalBody = document.querySelector('.modal-body');

    if (item.embedCode) {
        // Show embed code
        modalBody.innerHTML = `
            <div class="modal-embed">
                ${item.embedCode}
            </div>
            <div class="modal-info">
                <h3 id="modal-title">${item.title}</h3>
                <p id="modal-category">${item.category}</p>
                <p id="modal-description">${item.description}</p>
            </div>
        `;
    } else if (item.gallery && item.gallery.length > 0) {
        // Show image gallery
        const galleryHTML = item.gallery.map((img, index) =>
            `<img src="${img}" alt="${item.title} - Image ${index + 1}" class="gallery-image ${index === 0 ? 'active' : ''}" data-index="${index}">`
        ).join('');

        modalBody.innerHTML = `
            <div class="modal-gallery">
                <div class="gallery-container">
                    ${galleryHTML}
                </div>
                ${item.gallery.length > 1 ? `
                    <button class="gallery-nav prev" onclick="changeGalleryImage(-1)">‹</button>
                    <button class="gallery-nav next" onclick="changeGalleryImage(1)">›</button>
                    <div class="gallery-dots">
                        ${item.gallery.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" onclick="goToImage(${i})"></span>`).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="modal-info">
                <h3 id="modal-title">${item.title}</h3>
                <p id="modal-category">${item.category}</p>
                <p id="modal-description">${item.description}</p>
            </div>
        `;

        // Store current gallery index
        window.currentGalleryIndex = 0;
        window.currentGallery = item.gallery;
    } else {
        // Show single image
        modalBody.innerHTML = `
            <img src="${item.image}" alt="${item.title}" id="modal-image">
            <div class="modal-info">
                <h3 id="modal-title">${item.title}</h3>
                <p id="modal-category">${item.category}</p>
                <p id="modal-description">${item.description}</p>
            </div>
        `;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
// Gallery Navigation Functions
function changeGalleryImage(direction) {
    const images = document.querySelectorAll('.gallery-image');
    const dots = document.querySelectorAll('.gallery-dots .dot');

    images[window.currentGalleryIndex].classList.remove('active');
    dots[window.currentGalleryIndex].classList.remove('active');

    window.currentGalleryIndex += direction;

    if (window.currentGalleryIndex >= images.length) {
        window.currentGalleryIndex = 0;
    } else if (window.currentGalleryIndex < 0) {
        window.currentGalleryIndex = images.length - 1;
    }

    images[window.currentGalleryIndex].classList.add('active');
    dots[window.currentGalleryIndex].classList.add('active');
}
// Keyboard navigation for gallery
document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active') && window.currentGallery) {
        if (e.key === 'ArrowLeft') {
            changeGalleryImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeGalleryImage(1);
        }
    }
});

function goToImage(index) {
    const images = document.querySelectorAll('.gallery-image');
    const dots = document.querySelectorAll('.gallery-dots .dot');

    images[window.currentGalleryIndex].classList.remove('active');
    dots[window.currentGalleryIndex].classList.remove('active');

    window.currentGalleryIndex = index;

    images[window.currentGalleryIndex].classList.add('active');
    dots[window.currentGalleryIndex].classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll with Offset
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling - Send via WhatsApp
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const subject = document.querySelector('input[name="subject"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    // Your WhatsApp number (replace with your number including country code)
    // Format: 917034663294 (91 for India + your 10 digit number)
    const phoneNumber = '917034663294';

    // Create WhatsApp message
    const whatsappMessage = `*New Contact from Portfolio*%0A%0A` +
        `*Name:* ${name}%0A` +
        `*Email:* ${email}%0A` +
        `*Subject:* ${subject}%0A%0A` +
        `*Message:*%0A${message}`;

    // Open WhatsApp with the message
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
    window.open(whatsappURL, '_blank');

    // Show success message
    alert('✅ Opening WhatsApp! Please click Send in WhatsApp to complete your message.');

    // Reset form
    contactForm.reset();
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Unobserve after animation to prevent re-triggering
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Separate observer for About section with better settings
const aboutObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            aboutObserver.unobserve(entry.target);
        }
    });
}, aboutObserverOptions);

// Observe sections for fade-in animation
document.querySelectorAll('.portfolio-item, .skill-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Observe About section elements
document.querySelectorAll('.about-image, .about-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 1s ease, transform 1s ease';
    aboutObserver.observe(el);
});

// Generate placeholder images for portfolio
function generatePlaceholderImages() {
    const portfolioItems = document.querySelectorAll('.portfolio-item img');

    portfolioItems.forEach((img, index) => {
        // Create a canvas for each placeholder
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');

        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        const grayValue = 200 - (index * 15);
        gradient.addColorStop(0, `rgb(${grayValue}, ${grayValue}, ${grayValue})`);
        gradient.addColorStop(1, `rgb(${grayValue - 50}, ${grayValue - 50}, ${grayValue - 50})`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add geometric shapes
        ctx.fillStyle = '#000000';
        ctx.globalAlpha = 0.1;

        // Random geometric patterns
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 200 + 100;

            if (Math.random() > 0.5) {
                ctx.fillRect(x, y, size, size);
            } else {
                ctx.beginPath();
                ctx.arc(x, y, size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Add text
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 48px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // ctx.fillText(`Project ${index + 1}`, canvas.width / 2, canvas.height / 2);

        // Set the image source
        // img.src = canvas.toDataURL();
    });
}

// Generate placeholder for about image
function generateAboutImage() {
    const aboutImg = document.getElementById('about-img');
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#E5E5E5');
    gradient.addColorStop(1, '#A3A3A3');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add geometric elements
    ctx.fillStyle = '#000000';
    ctx.globalAlpha = 0.05;

    // Circles
    for (let i = 0; i < 10; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 150 + 50;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    // Lines
    ctx.globalAlpha = 0.1;
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';

    for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }

    // Add text
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 36px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Designer', canvas.width / 2, canvas.height / 2);
    ctx.font = '24px Inter';
    ctx.fillText('Workspace', canvas.width / 2, canvas.height / 2 + 50);

    aboutImg.src = canvas.toDataURL();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();

    // Wait a bit for images to load, then generate placeholders
    setTimeout(() => {
        generatePlaceholderImages();
        // generateAboutImage(); // Disabled - user has their own photo
    }, 100);
});

// Parallax effect for hero decoration
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const decorationCircle = document.querySelector('.decoration-circle');
    const decorationLine = document.querySelector('.decoration-line');

    if (decorationCircle && decorationLine) {
        decorationCircle.style.transform = `translate(-50%, -50%) rotate(${scrolled * 0.1}deg)`;
        decorationLine.style.transform = `translate(-50%, -50%) rotate(${scrolled * 0.2}deg)`;
    }
});
// Touch swipe for mobile gallery
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    if (modal.classList.contains('active') && window.currentGallery) {
        touchStartX = e.changedTouches[0].screenX;
    }
});

document.addEventListener('touchend', (e) => {
    if (modal.classList.contains('active') && window.currentGallery) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        changeGalleryImage(1); // Swipe left
    }
    if (touchEndX > touchStartX + 50) {
        changeGalleryImage(-1); // Swipe right
    }
}