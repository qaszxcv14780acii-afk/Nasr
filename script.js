// JavaScript متقدم لموقع وكالة قات - Professional & Enhanced

document.addEventListener("DOMContentLoaded", function () {
  // تهيئة جميع المكونات
  initMobileMenu();
  initSmoothScroll();
  initActiveNavHighlight();
  initScrollAnimations();
  initLightbox();
  initContactForm();
  initBackToTop();
  initLazyLoading();
  initParallax();
  initCounterAnimations();
  initImageFilters();
  initTestimonialsSlider();
});

/* ==================== القائمة المتنقلة ==================== */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("mobile-menu-enter");

      // تغيير الأيقونة
      const icon = mobileMenuBtn.querySelector("i");
      if (mobileMenu.classList.contains("hidden")) {
        icon.className = "fas fa-bars text-2xl";
      } else {
        icon.className = "fas fa-times text-2xl";
      }
    });

    // إغلاق القائمة عند النقر على أي رابط
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
        const icon = mobileMenuBtn.querySelector("i");
        icon.className = "fas fa-bars text-2xl";
      });
    });
  }
}

/* ==================== التمرير السلس ==================== */
function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = document.querySelector("header").offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });
}

/* ==================== تمييز التنقل النشط ==================== */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  function highlightNav() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Throttle the scroll event
  let ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        highlightNav();
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ==================== أنيميشنات التمرير ==================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback for older browsers
    animatedElements.forEach(function (el) {
      el.classList.add("animate-fade-up");
    });
  }
}

/* ==================== Lightbox للصور ==================== */
function initLightbox() {
  const imageCards = document.querySelectorAll(".image-card");
  const galleryItems = document.querySelectorAll(".gallery-item");

  function createLightbox(src, alt) {
    // إزالة lightbox موجود
    const existingLightbox = document.querySelector(".lightbox");
    if (existingLightbox) {
      existingLightbox.remove();
    }

    // إنشاء lightbox جديد
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt || "صورة";

    const controls = document.createElement("div");
    controls.className = "lightbox-controls";

    const zoomIn = document.createElement("button");
    zoomIn.className = "lightbox-btn";
    zoomIn.innerHTML = "+";
    zoomIn.title = "تكبير";

    const zoomOut = document.createElement("button");
    zoomOut.className = "lightbox-btn";
    zoomOut.innerHTML = "−";
    zoomOut.title = "تصغير";

    const close = document.createElement("button");
    close.className = "lightbox-btn lightbox-close";
    close.innerHTML = "×";
    close.title = "إغلاق";

    controls.appendChild(zoomIn);
    controls.appendChild(zoomOut);
    lightbox.appendChild(img);
    lightbox.appendChild(controls);
    lightbox.appendChild(close);

    document.body.appendChild(lightbox);

    // إظهار lightbox
    requestAnimationFrame(function () {
      lightbox.classList.add("active");
    });

    // متغيرات التكبير
    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX, startY;

    function updateTransform() {
      img.style.transform =
        "scale(" +
        scale +
        ") translate(" +
        translateX +
        "px, " +
        translateY +
        "px)";
    }

    function zoomInHandler(e) {
      e.preventDefault();
      scale = Math.min(3, scale + 0.3);
      updateTransform();
    }

    function zoomOutHandler(e) {
      e.preventDefault();
      scale = Math.max(1, scale - 0.3);
      if (scale === 1) {
        translateX = 0;
        translateY = 0;
      }
      updateTransform();
    }

    zoomIn.addEventListener("click", zoomInHandler);
    zoomOut.addEventListener("click", zoomOutHandler);

    // تكبير باستخدام عجلة الماوس
    lightbox.addEventListener("wheel", function (e) {
      e.preventDefault();
      if (e.deltaY < 0) {
        scale = Math.min(3, scale + 0.1);
      } else {
        scale = Math.max(1, scale - 0.1);
        if (scale === 1) {
          translateX = 0;
          translateY = 0;
        }
      }
      updateTransform();
    });

    // السحب على الهاتف
    lightbox.addEventListener("touchstart", function (e) {
      if (e.touches.length === 1 && scale > 1) {
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
      }
    });

    lightbox.addEventListener("touchmove", function (e) {
      if (isDragging && e.touches.length === 1) {
        e.preventDefault();
        translateX = e.touches[0].clientX - startX;
        translateY = e.touches[0].clientY - startY;
        updateTransform();
      }
    });

    lightbox.addEventListener("touchend", function () {
      isDragging = false;
    });

    // إغلاق
    function closeLightbox() {
      lightbox.classList.remove("active");
      setTimeout(function () {
        if (lightbox.parentNode) {
          lightbox.remove();
        }
      }, 300);
    }

    close.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // إغلاق بال Esc
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
      }
    });
  }

  // ربط Cards
  imageCards.forEach(function (card) {
    card.addEventListener("click", function () {
      const img = this.querySelector("img");
      if (img) {
        createLightbox(img.src, img.alt);
      }
    });
  });

  // ربط صور المعرض
  galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
      const img = this.querySelector("img");
      if (img) {
        createLightbox(img.src, img.alt);
      }
    });
  });
}

/* ==================== نموذج الاتصال ==================== */
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // التحقق من الحقول
      const name = document.getElementById("name");
      const phone = document.getElementById("phone");
      const email = document.getElementById("email");
      const message = document.getElementById("message");

      let isValid = true;
      let errorMessage = "";

      if (!name || name.value.trim().length < 2) {
        isValid = false;
        errorMessage = "الرجاء إدخال اسم صحيح";
        highlightError(name);
      }

      if (isValid && (!phone || !validatePhone(phone.value))) {
        isValid = false;
        errorMessage = "الرجاء إدخال رقم هاتف صحيح";
        highlightError(phone);
      }

      if (isValid && (!email || !validateEmail(email.value))) {
        isValid = false;
        errorMessage = "الرجاء إدخال بريد إلكتروني صحيح";
        highlightError(email);
      }

      if (isValid && (!message || message.value.trim().length < 10)) {
        isValid = false;
        errorMessage = "الرجاء كتابة رسالة تحتوي على 10 أحرف على الأقل";
        highlightError(message);
      }

      // إزالة رسائل الخطأ السابقة
      const existingMessages = contactForm.querySelectorAll(
        ".error-message, .success-message",
      );
      existingMessages.forEach(function (msg) {
        msg.remove();
      });

      if (!isValid) {
        showMessage(contactForm, errorMessage, "error");
        return;
      }

      // إنشاء رسالة WhatsApp
      const whatsappMessage =
        "رسالة جديدة من موقع وكالة قات:\n\n" +
        "الاسم: " +
        name.value +
        "\n" +
        "الهاتف: " +
        phone.value +
        "\n" +
        "البريد: " +
        email.value +
        "\n\n" +
        "الرسالة: " +
        message.value;

      const whatsappUrl =
        "https://wa.me/967771167391?text=" +
        encodeURIComponent(whatsappMessage);

      // إظهار نجاح
      showMessage(contactForm, "جاري فتح WhatsApp...", "success");

      setTimeout(function () {
        window.open(whatsappUrl, "_blank");
        contactForm.reset();
      }, 1000);
    });
  }
}

function validatePhone(phone) {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 7;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function highlightError(element) {
  if (element) {
    element.style.borderColor = "#ef4444";
    element.addEventListener(
      "input",
      function () {
        this.style.borderColor = "#e5e7eb";
      },
      { once: true },
    );
  }
}

function showMessage(form, message, type) {
  const messageDiv = document.createElement("div");
  messageDiv.className =
    type === "success" ? "success-message" : "error-message";
  messageDiv.innerHTML =
    '<i class="fas fa-' +
    (type === "success" ? "check-circle" : "exclamation-circle") +
    '"></i> ' +
    message;

  const submitBtn = form.querySelector('button[type="submit"]');
  form.insertBefore(messageDiv, submitBtn);

  // إزالة الرسالة بعد 5 ثوانٍ
  setTimeout(function () {
    messageDiv.remove();
  }, 5000);
}

/* ==================== زر العودة للأعلى ==================== */
function initBackToTop() {
  const backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTop.title = "العودة للأعلى";
  document.body.appendChild(backToTop);

  // إظهار/إخفاء الزر
  function toggleBackToTop() {
    if (window.scrollY > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", toggleBackToTop);
  toggleBackToTop();

  // النقر للعودة للأعلى
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* ==================== التحميل الكسول للصور ==================== */
function initLazyLoading() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
            }
            imageObserver.unobserve(img);
          }
        });
      },
      {
        rootMargin: "50px 0px",
      },
    );

    document.querySelectorAll("img[data-src]").forEach(function (img) {
      imageObserver.observe(img);
    });
  } else {
    // Fallback
    document.querySelectorAll("img[data-src]").forEach(function (img) {
      img.src = img.dataset.src;
    });
  }
}

/* ==================== تأثير Parallax ==================== */
function initParallax() {
  if (window.innerWidth > 768) {
    const heroImage = document.querySelector("#home img");

    if (heroImage) {
      let ticking = false;

      window.addEventListener("scroll", function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
              heroImage.style.transform =
                "translateY(" + scrolled * 0.3 + "px)";
            }
            ticking = false;
          });
          ticking = true;
        }
      });
    }
  }
}

/* ==================== عداد الأرقام ==================== */
function initCounterAnimations() {
  const counters = document.querySelectorAll(".counter");

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  function update() {
    current += step;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }

  update();
}

/* ==================== تصفية الصور ==================== */
function initImageFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const filterItems = document.querySelectorAll(".filter-item");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      // إزالة النشاط من الأزرار
      filterBtns.forEach(function (b) {
        b.classList.remove("active");
      });

      // إضافة النشاط للزر الحالي
      this.classList.add("active");

      // تصفية العناصر
      const filter = this.getAttribute("data-filter");

      filterItems.forEach(function (item) {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block";
          item.classList.add("animate-fade-up");
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

/* ==================== شرائح الشهادات ==================== */
function initTestimonialsSlider() {
  const slider = document.querySelector(".testimonials-slider");

  if (slider) {
    const slides = slider.querySelectorAll(".testimonial-slide");
    const prevBtn = slider.querySelector(".testimonial-prev");
    const nextBtn = slider.querySelector(".testimonial-next");
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach(function (slide) {
        slide.classList.remove("active");
      });
      slides[index].classList.add("active");
    }

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", function () {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
      });

      nextBtn.addEventListener("click", function () {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      });

      // تغيير تلقائي كل 5 ثوانٍ
      setInterval(function () {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      }, 5000);
    }
  }
}

/* ==================== دوال مساعدة ==================== */

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(function () {
        inThrottle = false;
      }, limit);
    }
  };
}

// Cookie functions
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expires +
    "; path=/";
}

function getCookie(name) {
  const value = document.cookie.split("; ").find(function (row) {
    return row.startsWith(name + "=");
  });
  return value ? decodeURIComponent(value.split("=")[1]) : null;
}

// Local storage helpers
function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log("Local storage not available");
  }
}

function getFromLocalStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    return null;
  }
}

/* ==================== إدارة الأخطاء ==================== */
window.addEventListener("error", function (e) {
  console.log("Error occurred:", e.message);
});

// معالجة الصور المعطلة
document.addEventListener(
  "error",
  function (e) {
    if (e.target.tagName === "IMG") {
      e.target.style.display = "none";
      console.log("Image failed to load:", e.target.src);
    }
  },
  true,
);
