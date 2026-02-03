// JavaScript for Qat Agency Website

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('mobile-menu-enter');
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth scrolling for navigation links
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

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Contact Form Validation and Submission with WhatsApp
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        let isValid = true;
        let errorMessage = '';
        
        if (!name || name.trim().length < 3) {
            errorMessage = 'الرجاء إدخال اسم صحيح (3 أحرف على الأقل)';
            isValid = false;
        } else if (!phone || !validatePhone(phone)) {
            errorMessage = 'الرجاء إدخال رقم هاتف صحيح';
            isValid = false;
        } else if (!email || !validateEmail(email)) {
            errorMessage = 'الرجاء إدخال بريد إلكتروني صحيح';
            isValid = false;
        } else if (!message || message.trim().length < 10) {
            errorMessage = 'الرجاء إدخال رسالة (10 أحرف على الأقل)';
            isValid = false;
        }
        
        // Remove existing messages
        const existingMessage = this.querySelector('.success-message, .error-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        if (!isValid) {
            showError(this, errorMessage);
            return;
        }
        
        // Create WhatsApp message
        const whatsappMessage = `🔔 رسالة جديدة من موقع وكالة نصر الدوميني\n\n👤 اسم العميل: ${name}\n📞 رقم الهاتف: ${phone}\n📧 البريد الإلكتروني: ${email}\n\n💬 الرسالة:\n${message}`;
        
        // Create WhatsApp link
        const whatsappLink = `https://wa.me/967771167391?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fab fa-whatsapp text-xl ml-2 animate-pulse"></i> جاري فتح WhatsApp...';
        submitBtn.disabled = true;
        
        // Open WhatsApp
        setTimeout(() => {
            window.open(whatsappLink, '_blank');
            
            // Show success message
            showSuccess(this, 'تم فتح WhatsApp. أرسل الرسالة لتصل مباشرة للجوال!');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
}

// Phone validation function
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
}

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(form, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    form.insertBefore(errorDiv, form.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Show success message
function showSuccess(form, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    form.insertBefore(successDiv, form.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Enhanced Product order buttons
document.querySelectorAll('.image-card button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const productCard = this.closest('.image-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.text-green-600').textContent;
        
        // Add loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الإضافة...';
        this.disabled = true;
        
        // Simulate order processing
        setTimeout(() => {
            showOrderNotification(`تم إضافة ${productName} (${productPrice}) إلى سلة التسوق`);
            this.innerHTML = originalText;
            this.disabled = false;
            
            // Add success animation
            productCard.classList.add('slide-in-up');
            setTimeout(() => {
                productCard.classList.remove('slide-in-up');
            }, 800);
        }, 1000);
    });
});

// Show order notification
function showOrderNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in';
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle ml-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fade-out 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Enhanced Gallery lightbox functionality with zoom
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        createEnhancedLightbox(img.src, img.alt);
    });
});

// Enhanced lightbox for product cards
document.querySelectorAll('.image-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (!e.target.closest('button')) {
            const img = this.querySelector('img');
            createEnhancedLightbox(img.src, img.alt);
        }
    });
});

// Create enhanced lightbox with zoom controls - Mobile Optimized
function createEnhancedLightbox(src, alt) {
    // Remove existing lightbox
    const existingLightbox = document.querySelector('.lightbox');
    if (existingLightbox) {
        existingLightbox.remove();
    }
    
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-close">
            <i class="fas fa-times"></i>
        </div>
        <div class="zoom-controls">
            <button class="zoom-btn" id="zoomOut">
                <i class="fas fa-minus"></i>
            </button>
            <button class="zoom-btn" id="zoomReset">
                <i class="fas fa-compress"></i>
            </button>
            <button class="zoom-btn" id="zoomIn">
                <i class="fas fa-plus"></i>
            </button>
        </div>
        <img src="${src}" alt="${alt}" id="lightboxImage" style="cursor: grab;">
    `;
    
    document.body.appendChild(lightbox);
    
    // Trigger animation
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
    
    const lightboxImg = document.getElementById('lightboxImage');
    let currentScale = 1;
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;
    let initialX = 0, initialY = 0;
    let xOffset = 0, yOffset = 0;
    
    // Zoom functionality - Optimized for mobile
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const zoomResetBtn = document.getElementById('zoomReset');
    
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentScale = Math.min(currentScale + 0.25, 3);
            updateZoom();
        });
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentScale = Math.max(currentScale - 0.25, 0.5);
            updateZoom();
        });
    }
    
    if (zoomResetBtn) {
        zoomResetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentScale = 1;
            xOffset = 0;
            yOffset = 0;
            updateZoom();
        });
    }
    
    function updateZoom() {
        lightboxImg.style.transform = `scale(${currentScale}) translate(${xOffset}px, ${yOffset}px)`;
        lightboxImg.style.cursor = currentScale > 1 ? 'grab' : 'default';
    }
    
    // Touch events for mobile
    let touchStartDistance = 0;
    let touchStartScale = 1;
    
    lightboxImg.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            startX = e.touches[0].clientX - xOffset;
            startY = e.touches[0].clientY - yOffset;
            lightboxImg.style.cursor = 'grabbing';
        } else if (e.touches.length === 2) {
            // Pinch to zoom
            touchStartDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            touchStartScale = currentScale;
        }
    }, { passive: false });
    
    lightboxImg.addEventListener('touchmove', (e) => {
        e.preventDefault();
        
        if (e.touches.length === 1 && currentScale > 1) {
            // Single finger drag
            if (isDragging) {
                const currentX = e.touches[0].clientX;
                const currentY = e.touches[0].clientY;
                xOffset = currentX - startX;
                yOffset = currentY - startY;
                updateZoom();
            }
        } else if (e.touches.length === 2) {
            // Pinch to zoom
            const currentDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            
            if (touchStartDistance > 0) {
                currentScale = Math.max(0.5, Math.min(3, touchStartScale * (currentDistance / touchStartDistance)));
                updateZoom();
            }
        }
    }, { passive: false });
    
    lightboxImg.addEventListener('touchend', (e) => {
        isDragging = false;
        lightboxImg.style.cursor = currentScale > 1 ? 'grab' : 'default';
        touchStartDistance = 0;
    });
    
    // Mouse events for desktop - Fixed
    lightboxImg.addEventListener('mousedown', (e) => {
        if (currentScale > 1) {
            isDragging = true;
            startX = e.clientX - xOffset;
            startY = e.clientY - yOffset;
            lightboxImg.style.cursor = 'grabbing';
            e.preventDefault();
        }
    });
    
    lightboxImg.addEventListener('mousemove', (e) => {
        if (!isDragging || currentScale <= 1) return;
        e.preventDefault();
        const currentX = e.clientX;
        const currentY = e.clientY;
        xOffset = currentX - startX;
        yOffset = currentY - startY;
        updateZoom();
    });
    
    lightboxImg.addEventListener('mouseup', () => {
        isDragging = false;
        lightboxImg.style.cursor = currentScale > 1 ? 'grab' : 'default';
    });
    
    lightboxImg.addEventListener('mouseleave', () => {
        isDragging = false;
        lightboxImg.style.cursor = currentScale > 1 ? 'grab' : 'default';
    });
    
    // Mouse wheel zoom - Fixed
    lightbox.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        currentScale = Math.max(0.5, Math.min(3, currentScale + delta));
        updateZoom();
    });
    
    // Close lightbox - Enhanced for mobile
    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
            if (lightbox.parentNode) {
                lightbox.remove();
            }
        }, 300);
    }
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.closest('.lightbox-close')) {
            closeLightbox();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
    
    // Restore body scroll when lightbox closes
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.closest('.lightbox-close')) {
            document.body.style.overflow = '';
            closeLightbox();
        }
    });
}

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'fixed bottom-8 left-8 bg-green-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 opacity-0 invisible z-40';
scrollToTopBtn.setAttribute('aria-label', 'العودة للأعلى');
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.remove('opacity-0', 'invisible');
        scrollToTopBtn.classList.add('opacity-100', 'visible');
    } else {
        scrollToTopBtn.classList.add('opacity-0', 'invisible');
        scrollToTopBtn.classList.remove('opacity-100', 'visible');
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .product-card, .gallery-item').forEach(el => {
    observer.observe(el);
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Initialize tooltips if needed
    initializeTooltips();
    
    // Initialize counters
    initializeCounters();
});

// Initialize tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute bg-gray-800 text-white text-sm px-2 py-1 rounded z-50';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
            
            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            }, { once: true });
        });
    });
}

// Initialize animated counters
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute('data-target');
            const data = +counter.innerText;
            const time = value / speed;
            
            if (data < value) {
                counter.innerText = Math.ceil(data + time);
                setTimeout(animate, 1);
            } else {
                counter.innerText = value;
            }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Add fade-out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fade-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
    }
    .loaded {
        opacity: 1;
    }
    img.loaded {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);
