// JavaScript for Qat Agency Website - Fixed Performance and Lightbox

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('mobile-menu-enter');
    });

    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Smooth scrolling for navigation links - Optimized
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

// Active navigation highlighting - Optimized with throttling
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
    }, 50); // Faster throttling
});

// Performance-optimized animations
document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Show content immediately on mobile
        const allAnimatedElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
        allAnimatedElements.forEach(el => {
            el.classList.add('visible');
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    } else {
        // Optimized desktop animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        };

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const elements = entry.target.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
                    
                    if (elements.length > 0) {
                        elements.forEach((el, index) => {
                            setTimeout(() => {
                                el.classList.add('visible');
                            }, index * 30); // Faster stagger
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

// Optimized parallax
const isMobile = window.innerWidth <= 768;
if (!isMobile) {
    let parallaxElement = document.querySelector('#home img');
    if (parallaxElement) {
        let ticking = false;
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const speed = 0.3; // Reduced speed for performance
            
            if (scrolled < window.innerHeight) {
                parallaxElement.style.transform = `translateY(${scrolled * speed}px)`;
            }
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }
}

// Optimized loading
window.addEventListener('load', () => {
    if (isMobile) {
        document.body.style.opacity = '1';
        
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            icon.style.opacity = '1';
            icon.style.transform = 'translateY(0)';
        });
    } else {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.2s ease-in';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 50);
        
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach((icon, index) => {
            icon.style.opacity = '0';
            icon.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                icon.style.transition = 'all 0.2s ease';
                icon.style.opacity = '1';
                icon.style.transform = 'translateY(0)';
            }, 300 + (index * 50)); // Faster animations
        });
    }
});

// Contact Form - Optimized
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
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
        
        const existingMessage = document.querySelector('.success-message, .error-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        if (!isValid) {
            showError(this, errorMessage);
            return;
        }
        
        const whatsappMessage = `🔔 رسالة جديدة من موقع وكالة نصر الدميني\n\n👤 اسم العميل: ${name}\n📞 رقم الهاتف: ${phone}\n📧 البريد الإلكتروني: ${email}\n\n💬 الرسالة:\n${message}`;
        const whatsappLink = `https://wa.me/967771167391?text=${encodeURIComponent(whatsappMessage)}`;
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fab fa-whatsapp text-xl ml-2"></i> جاري فتح WhatsApp...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            window.open(whatsappLink, '_blank');
            showSuccess(this, 'تم فتح WhatsApp بنجاح! يمكنك الآن إرسال الرسالة.');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, isMobile ? 300 : 800); // Faster response
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

// Optimized message functions
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
    
    const timeout = isMobile ? 2000 : 3000;
    setTimeout(() => {
        successDiv.remove();
    }, timeout);
}

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
    
    const timeout = isMobile ? 2000 : 3000;
    setTimeout(() => {
        errorDiv.remove();
    }, timeout);
}

// FIXED: Enhanced Lightbox Function - MOBILE COMPATIBLE
function createEnhancedLightbox(src, alt) {
    // Remove existing lightbox
    const existingLightbox = document.querySelector('.lightbox');
    if (existingLightbox) {
        existingLightbox.remove();
    }

    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    // Create image
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    
    // Create controls with better mobile support
    const zoomInBtn = document.createElement('button');
    zoomInBtn.className = 'zoom-btn zoom-in';
    zoomInBtn.innerHTML = '+';
    zoomInBtn.setAttribute('aria-label', 'تكبير');
    zoomInBtn.setAttribute('title', 'تكبير');
    
    const zoomOutBtn = document.createElement('button');
    zoomOutBtn.className = 'zoom-btn zoom-out';
    zoomOutBtn.innerHTML = '−';
    zoomOutBtn.setAttribute('aria-label', 'تصغير');
    zoomOutBtn.setAttribute('title', 'تصغير');
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'zoom-btn close-btn';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'إغلاق');
    closeBtn.setAttribute('title', 'إغلاق');
    
    // Add elements to lightbox
    lightbox.appendChild(img);
    lightbox.appendChild(zoomInBtn);
    lightbox.appendChild(zoomOutBtn);
    lightbox.appendChild(closeBtn);
    
    // Add to body
    document.body.appendChild(lightbox);
    
    // State variables
    let scale = 1;
    let isDragging = false;
    let startX, startY;
    let initialPinchDistance = 0;
    
    // Show lightbox with animation
    requestAnimationFrame(() => {
        lightbox.classList.add('active');
    });
    
    // Zoom functions
    function updateZoom(newScale) {
        scale = Math.max(0.5, Math.min(3, newScale));
        img.style.transform = `scale(${scale})`;
    }
    
    // Zoom controls with better mobile support
    function handleZoomIn(e) {
        e.preventDefault();
        e.stopPropagation();
        updateZoom(scale + 0.3);
    }
    
    function handleZoomOut(e) {
        e.preventDefault();
        e.stopPropagation();
        updateZoom(scale - 0.3);
    }
    
    zoomInBtn.addEventListener('click', handleZoomIn);
    zoomInBtn.addEventListener('touchstart', handleZoomIn);
    
    zoomOutBtn.addEventListener('click', handleZoomOut);
    zoomOutBtn.addEventListener('touchstart', handleZoomOut);
    
    // Mouse wheel zoom
    lightbox.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.2 : 0.2;
        updateZoom(scale + delta);
    });
    
    // Drag functionality - MOBILE OPTIMIZED
    function startDrag(e) {
        if (scale > 1) {
            isDragging = true;
            img.style.cursor = 'grabbing';
            
            // Handle both mouse and touch events
            if (e.type === 'mousedown') {
                startX = e.pageX - img.offsetLeft;
                startY = e.pageY - img.offsetTop;
            } else if (e.type === 'touchstart' && e.touches.length === 1) {
                startX = e.touches[0].pageX - img.offsetLeft;
                startY = e.touches[0].pageY - img.offsetTop;
            }
        }
    }
    
    function drag(e) {
        if (!isDragging || scale <= 1) return;
        e.preventDefault();
        
        let x, y;
        if (e.type === 'mousemove') {
            x = e.pageX;
            y = e.pageY;
        } else if (e.type === 'touchmove' && e.touches.length === 1) {
            x = e.touches[0].pageX;
            y = e.touches[0].pageY;
        } else {
            return;
        }
        
        const walkX = (x - startX) * 0.5;
        const walkY = (y - startY) * 0.5;
        
        img.style.transform = `scale(${scale}) translate(${walkX}px, ${walkY}px)`;
    }
    
    function endDrag() {
        isDragging = false;
        img.style.cursor = 'grab';
    }
    
    // Mouse events
    img.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    
    // Touch events for mobile - IMPROVED
    img.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', endDrag);
    
    // Pinch to zoom for mobile - FIXED
    lightbox.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            initialPinchDistance = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );
        }
    }, { passive: false });
    
    lightbox.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const currentDistance = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );
            
            const scaleDelta = (currentDistance - initialPinchDistance) * 0.01;
            updateZoom(scale + scaleDelta);
            initialPinchDistance = currentDistance;
        }
    }, { passive: false });
    
    // Close functions - MOBILE OPTIMIZED
    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
            if (lightbox.parentNode) {
                lightbox.remove();
            }
        }, 300);
    }
    
    function handleClose(e) {
        e.preventDefault();
        e.stopPropagation();
        closeLightbox();
    }
    
    closeBtn.addEventListener('click', handleClose);
    closeBtn.addEventListener('touchstart', handleClose);
    
    // Close on background click - MOBILE FRIENDLY
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === '+' || e.key === '=') {
                updateZoom(scale + 0.3);
            } else if (e.key === '-' || e.key === '_') {
                updateZoom(scale - 0.3);
            }
        }
    });
    
    // Prevent context menu and default behaviors
    lightbox.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    
    // Prevent double-tap zoom on mobile
    lightbox.addEventListener('touchend', (e) => {
        e.preventDefault();
    }, { passive: false });
    
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            // Reset zoom on orientation change
            updateZoom(1);
        }, 100);
    });
}

// Attach lightbox to images
document.querySelectorAll('.image-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (!e.target.closest('button')) {
            const img = this.querySelector('img');
            createEnhancedLightbox(img.src, img.alt);
        }
    });
});

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        createEnhancedLightbox(img.src, img.alt);
    });
});

// Optimized scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'fixed bottom-8 left-8 bg-green-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-green-700 transition-all duration-200 opacity-0 invisible z-40';
scrollToTopBtn.setAttribute('aria-label', 'العودة للأعلى');
document.body.appendChild(scrollToTopBtn);

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
    }, 50);
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
