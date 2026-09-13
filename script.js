document.addEventListener('DOMContentLoaded', () => {
    
    console.log('✅ Script loaded');

    // NAVBAR + DETEKSI SECTION MERAH
    const navbar = document.querySelector('.navbar-container');
    const sectionRed = document.getElementById('sectionRed');

    if (sectionRed) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navbar.classList.add('in-red-section');
                } else {
                    navbar.classList.remove('in-red-section');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-80px 0px -50% 0px'
        });
        observer.observe(sectionRed);
    }

    // TOGGLE MOBILE MENU
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuClose = document.getElementById('menuClose');
    const mobileLinks = document.querySelectorAll('.mobile-link');

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

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            closeMenu();
        });
    });

    // NAVIGASI DESKTOP
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // MENU SLIDE SYSTEM
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

    // 3D TILT EFFECT (Desktop only: ≥ 1120px)
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

});