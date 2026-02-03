// JavaScript for Qat Agency Website - Fixed Mobile Issues

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
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
}

// Smooth scrolling for navigation links - Fixed for mobile
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

// Active navigation highlighting - Fixed
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }, 100);
});

// Fixed: Show content immediately on mobile
document.addEventListener('DOMContentLoaded', () => {
    // Make all content visible immediately on mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Show all animated content immediately
        const allAnimatedElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
        allAnimatedElements.forEach(el => {
            el.classList.add('visible');
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    } else {
        // Desktop animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const elements = entry.target.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
                    
                    if (elements.length > 0) {
                        elements.forEach((el, index) => {
                            setTimeout(() => {
                                el.classList.add('visible');
                            }, index * 50);
                        });
                    } else {
                        entry.target.classList.add('visible');
                    }
                    
                    animationObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    }
});

// Disable parallax on mobile for performance
const isMobile = window.innerWidth <= 768;
if (!isMobile) {
    let parallaxElement = document.querySelector('#home img');
    if (parallaxElement) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const speed = 0.5;
            
            if (parallax && scrolled < window.innerHeight) {
                parallaxElement.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
    }
}

// Enhanced loading animations - Fixed for mobile
window.addEventListener('load', () => {
    // Show content immediately on mobile
    if (isMobile) {
        document.body.style.opacity = '1';
        
        // Show social icons immediately
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            icon.style.opacity = '1';
            icon.style.transform = 'translateY(0)';
        });
    } else {
        // Desktop animations
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease-in';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 50);
        
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach((icon, index) => {
            icon.style.opacity = '0';
            icon.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                icon.style.transition = 'all 0.3s ease';
                icon.style.opacity = '1';
                icon.style.transform = 'translateY(0)';
            }, 500 + (index * 100));
        });
    }
});

// Contact Form Validation and Submission with WhatsApp - Fixed
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
        submitBtn.innerHTML = '<i class="fab fa-whatsapp text-xl ml-2"></i> جاري فتح WhatsApp...';
        submitBtn.disabled = true;
        
        // Open WhatsApp
        setTimeout(() => {
            window.open(whatsappLink, '_blank');
            
            // Show success message
            showSuccess(this, 'تم فتح WhatsApp بنجاح! يمكنك الآن إرسال الرسالة.');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, isMobile ? 500 : 1500);
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

// Show success message - Fixed
function showSuccess(form, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4';
    successDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle text-xl ml-3"></i>
            <span>${message}</span>
        </div>
    `;
    
    form.insertBefore(successDiv, form.firstChild);
    
    // Auto remove
    const timeout = isMobile ? 3000 : 5000;
    setTimeout(() => {
        successDiv.remove();
    }, timeout);
}

// Show error message - Fixed
function showError(form, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4';
    errorDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-exclamation-circle text-xl ml-3"></i>
            <span>${message}</span>
        </div>
    `;
    
    form.insertBefore(errorDiv, form.firstChild);
    
    // Auto remove
    const timeout = isMobile ? 3000 : 5000;
    setTimeout(() => {
        errorDiv.remove();
    }, timeout);
}

// Enhanced lightbox for product cards - Fixed for mobile
document.querySelectorAll('.image-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (!e.target.closest('button')) {
            const img = this.querySelector('img');
            createEnhancedLightbox(img.src, img.alt);
        }
    });
});

// Enhanced gallery lightbox - Fixed for mobile
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        createEnhancedLightbox(img.src, img.alt);
    });
});

// Scroll to top button - Fixed
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'fixed bottom-8 left-8 bg-green-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 opacity-0 invisible z-40';
scrollToTopBtn.setAttribute('aria-label', 'العودة للأعلى');
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button - Fixed
let scrollButtonTimeout;
window.addEventListener('scroll', () => {
    if (scrollButtonTimeout) {
        clearTimeout(scrollButtonTimeout);
    }
    scrollButtonTimeout = setTimeout(() => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.remove('opacity-0', 'invisible');
            scrollToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            scrollToTopBtn.classList.add('opacity-0', 'invisible');
            scrollToTopBtn.classList.remove('opacity-100', 'visible');
        }
    }, 100);
});

// Smooth scroll to top - Fixed
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
