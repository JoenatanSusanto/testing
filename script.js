document.addEventListener('DOMContentLoaded', () => {
    
    console.log('✅ Script loaded');

    // =========================================
    // 1. NAVBAR BERFUNGSI (Smooth Scroll + Active State)
    // =========================================
    const navbar = document.querySelector('.navbar-container');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const sections = document.querySelectorAll('section[id]');

    // Fungsi: Smooth scroll ke section
    function scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const navHeight = navbar.offsetHeight + 40;
            const targetPosition = targetSection.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Event: Klik nav-link desktop
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                scrollToSection(targetId);
                // Update active state
                navLinks.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Event: Klik mobile-link
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                closeMenu();
                setTimeout(() => {
                    scrollToSection(targetId);
                    mobileLinks.forEach(item => item.classList.remove('active'));
                    this.classList.add('active');
                }, 400);
            }
        });
    });

    // Event: Klik logo → scroll ke hero
    const logoCircle = document.querySelector('.logo-circle');
    if (logoCircle) {
        logoCircle.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('#hero');
        });
    }

    // =========================================
    // 2. NAVBAR ACTIVE STATE SAAT SCROLL
    // =========================================
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        mobileLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // =========================================
        // 3. NAVBAR BERUBAH WARNA DI SECTION MERAH
        // (Produk & Testimoni)
        // =========================================
        const sectionProduk = document.getElementById('produk');
        const sectionTestimoni = document.getElementById('testimoni');

        let inRedSection = false;

        if (sectionProduk) {
            const produkTop = sectionProduk.offsetTop - 150;
            const produkBottom = produkTop + sectionProduk.clientHeight;
            if (window.scrollY >= produkTop && window.scrollY <= produkBottom) {
                inRedSection = true;
            }
        }

        if (sectionTestimoni) {
            const testiTop = sectionTestimoni.offsetTop - 150;
            const testiBottom = testiTop + sectionTestimoni.clientHeight;
            if (window.scrollY >= testiTop && window.scrollY <= testiBottom) {
                inRedSection = true;
            }
        }

        if (inRedSection) {
            navbar.classList.add('in-red-section');
        } else {
            navbar.classList.remove('in-red-section');
        }
    });

    // =========================================
    // 4. TOGGLE MOBILE MENU
    // =========================================
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuClose = document.getElementById('menuClose');

    function openMenu() {
        menuToggle.classList.add('active');
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = 'auto';
    }

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            if (mobileMenu.classList.contains('open')) closeMenu();
            else openMenu();
        });
    }
    if (menuClose) menuClose.addEventListener('click', closeMenu);

    // =========================================
    // 5. MENU SLIDE SYSTEM (Hero)
    // =========================================
    const menuSlides = document.querySelectorAll('.menu-slide');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuLabels = document.querySelectorAll('.menu-label');
    const ratingBadge = document.getElementById('ratingBadge');
    const ratingName = document.getElementById('ratingName');

    const menuNames = ['ORIGINAL', 'PANDAN', 'KEJU'];

    let activeIndex = 0;
    let isAnimating = false;
    const SLIDE_DURATION = 600;
    const ENTER_DELAY = 150;
    const AUTO_ROTATE_DELAY = 10000;
    const RATING_SHOW_DELAY = 2000;
    const RATING_HIDE_BEFORE = 2000;
    let rotateTimer = null;
    let ratingShowTimer = null;
    let ratingHideTimer = null;

    function updateActiveThumb() {
        menuItems.forEach(item => {
            const idx = parseInt(item.dataset.index);
            if (idx === activeIndex) item.classList.add('active');
            else item.classList.remove('active');
        });
    }

    function updateActiveLabel() {
        menuLabels.forEach(label => {
            const idx = parseInt(label.dataset.label);
            if (idx === activeIndex) label.classList.add('active');
            else label.classList.remove('active');
        });
    }

    function updateRatingName() {
        if (ratingName) {
            ratingName.textContent = menuNames[activeIndex] || 'ORIGINAL';
        }
    }

    function scheduleShowRating() {
        clearTimeout(ratingShowTimer);
        clearTimeout(ratingHideTimer);
        
        ratingShowTimer = setTimeout(() => {
            if (ratingBadge) ratingBadge.classList.add('visible');
        }, RATING_SHOW_DELAY);
    }

    function scheduleHideRating() {
        clearTimeout(ratingHideTimer);
        ratingHideTimer = setTimeout(() => {
            if (ratingBadge) ratingBadge.classList.remove('visible');
        }, AUTO_ROTATE_DELAY - RATING_HIDE_BEFORE);
    }

    function goToMenu(targetIndex) {
        if (isAnimating) return;
        if (targetIndex === activeIndex) return;
        
        const oldSlide = document.querySelector(`.menu-slide[data-menu="${activeIndex}"]`);
        const newSlide = document.querySelector(`.menu-slide[data-menu="${targetIndex}"]`);
        if (!oldSlide || !newSlide) return;
        
        isAnimating = true;
        activeIndex = targetIndex;
        updateActiveThumb();
        updateActiveLabel();
        updateRatingName();

        if (ratingBadge) ratingBadge.classList.remove('visible');

        const isMobile = window.innerWidth <= 1119;

        if (isMobile) {
            oldSlide.classList.remove('active', 'entering');
            oldSlide.classList.add('exiting');
            
            newSlide.classList.remove('active', 'exiting');
            newSlide.classList.add('entering');
            void newSlide.offsetWidth;
            
            setTimeout(() => {
                newSlide.classList.remove('entering');
                newSlide.classList.add('active');
                
                setTimeout(() => {
                    oldSlide.classList.remove('exiting');
                    isAnimating = false;
                }, SLIDE_DURATION);
            }, ENTER_DELAY);
        } else {
            oldSlide.classList.remove('active', 'entering');
            oldSlide.classList.add('exiting');
            
            setTimeout(() => {
                newSlide.classList.remove('active', 'exiting', 'entering');
                newSlide.classList.add('entering');
                void newSlide.offsetWidth;
                
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        newSlide.classList.remove('entering');
                        newSlide.classList.add('active');
                        
                        scheduleShowRating();
                        scheduleHideRating();
                    });
                });
                
                setTimeout(() => {
                    oldSlide.classList.remove('exiting');
                    isAnimating = false;
                }, SLIDE_DURATION);
            }, ENTER_DELAY);
        }
    }

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const idx = parseInt(item.dataset.index);
            goToMenu(idx);
            resetTimer();
        });
    });

    function resetTimer() {
        if (rotateTimer) clearInterval(rotateTimer);
        clearTimeout(ratingShowTimer);
        clearTimeout(ratingHideTimer);
        
        scheduleShowRating();
        scheduleHideRating();
        
        rotateTimer = setInterval(() => {
            const nextIndex = (activeIndex + 1) % menuSlides.length;
            goToMenu(nextIndex);
        }, AUTO_ROTATE_DELAY);
    }

    updateRatingName();
    resetTimer();

    // =========================================
    // 6. 3D TILT EFFECT (Desktop only: ≥ 1120px)
    // =========================================
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        if (window.innerWidth <= 1119) return;
        
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 1119) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;
            
            card.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease';
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.35)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.6s ease';
            card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });
    });

    // =========================================
    // 7. LIGHTBOX TESTIMONI (Perbesar Gambar)
    // =========================================
    const testimoniCards = document.querySelectorAll('.testimoni-card');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    testimoniCards.forEach(card => {
        card.addEventListener('click', () => {
            const src = card.getAttribute('data-src');
            if (src) {
                lightboxImg.src = src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            lightboxImg.src = '';
        }, 400);
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Klik area luar gambar untuk close
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // ESC key untuk close lightbox
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

});