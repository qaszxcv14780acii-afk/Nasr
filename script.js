// JavaScript for Qat Agency Website - Enhanced with Professional Animations

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

// Enhanced Scroll-triggered Animations with Performance Optimization
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add visible class with staggered delay for multiple elements
            const elements = entry.target.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
            
            if (elements.length > 0) {
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, index * 100); // Stagger animations
                });
            } else {
                entry.target.classList.add('visible');
            }
            
            // Stop observing once animated
            animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animation elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });
    
    // Add staggered animation to product cards
    const productCards = document.querySelectorAll('.image-card');
    const productObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-scale-in');
                }, index * 150);
                productObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    productCards.forEach(card => {
        productObserver.observe(card);
    });
    
    // Add staggered animation to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-scale-in');
                }, index * 100);
                galleryObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    galleryItems.forEach(item => {
        galleryObserver.observe(item);
    });
});

// Performance optimization: Throttle scroll events
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    ticking = false;
}

window.addEventListener('scroll', requestTick);

// Parallax effect for hero section (performance optimized)
let parallaxElement = document.querySelector('#home img');
if (parallaxElement) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = parallaxElement;
        const speed = 0.5;
        
        if (parallax && scrolled < window.innerHeight) {
            parallax.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });
}

// Enhanced loading animations
window.addEventListener('load', () => {
    // Add fade-in animation to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Animate social media icons on load
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            icon.style.transition = 'all 0.5s ease';
            icon.style.opacity = '1';
            icon.style.transform = 'translateY(0)';
        }, 1000 + (index * 200));
    });
});

// Contact Form Validation and Submission with WhatsApp
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        let isValid = true;
        let errorMessage = '';
        
        if (name.length < 2) {
            isValid = false;
            errorMessage = 'الرجاء إدخال اسم صحيح';
        } else if (!validatePhone(phone)) {
            isValid = false;
            errorMessage = 'الرجاء إدخال رقم هاتف صحيح';
        } else if (!validateEmail(email)) {
            isValid = false;
            errorMessage = 'الرجاء إدخال بريد إلكتروني صحيح';
        } else if (message.length < 10) {
            isValid = false;
            errorMessage = 'الرجاء كتابة رسالة تحتوي على 10 أحرف على الأقل';
        }
        
        // Remove any existing messages
        const existingMessage = document.querySelector('.success-message, .error-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        if (!isValid) {
            showError(this, errorMessage);
            return;
        }
        
        // Create WhatsApp message
        const whatsappMessage = `🔔 رسالة جديدة من موقع وكالة نصر الدميني\n\n👤 اسم العميل: ${name}\n📞 رقم الهاتف: ${phone}\n📧 البريد الإلكتروني: ${email}\n\n💬 الرسالة:\n${message}`;
        
        // Create WhatsApp link
        const whatsappLink = `https://wa.me/967771167391?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fab fa-whatsapp text-xl ml-2 animate-pulse"></i> جاري فتح WhatsApp...';
        submitBtn.disabled = true;
        
        // Open WhatsApp after short delay
        setTimeout(() => {
            window.open(whatsappLink, '_blank');
            
            // Show success message
            showSuccess(this, 'تم فتح WhatsApp بنجاح! يمكنك الآن إرسال الرسالة.');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Validation functions
function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show success message
function showSuccess(form, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 animate-fade-in';
    successDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle text-xl ml-3"></i>
            <span>${message}</span>
        </div>
    `;
    
    form.insertBefore(successDiv, form.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Show error message
function showError(form, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 animate-fade-in';
    errorDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-exclamation-circle text-xl ml-3"></i>
            <span>${message}</span>
        </div>
    `;
    
    form.insertBefore(errorDiv, form.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Enhanced lightbox for product cards
document.querySelectorAll('.image-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (!e.target.closest('button')) {
            const img = this.querySelector('img');
            createEnhancedLightbox(img.src, img.alt);
        }
    });
});

// Scroll to top button with enhanced animation
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'fixed bottom-8 left-8 bg-green-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 opacity-0 invisible z-40 animate-pulse-slow';
scrollToTopBtn.setAttribute('aria-label', 'العودة للأعلى');
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button with animation
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.remove('opacity-0', 'invisible');
        scrollToTopBtn.classList.add('opacity-100', 'visible');
    } else {
        scrollToTopBtn.classList.add('opacity-0', 'invisible');
        scrollToTopBtn.classList.remove('opacity-100', 'visible');
    }
});

// Smooth scroll to top with animation
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced gallery lightbox
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        createEnhancedLightbox(img.src, img.alt);
    });
});

// Additional Intersection Observer for other elements
const additionalObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// ... rest of the code remains the same ...
const additionalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, additionalObserverOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .product-card, .gallery-item').forEach(el => {
    additionalObserver.observe(el);
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
