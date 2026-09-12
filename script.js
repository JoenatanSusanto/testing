document.addEventListener('DOMContentLoaded', () => {
    
    console.log('✅ Script loaded');

    // NAVBAR STICKY
    const navbar = document.querySelector('.navbar-container');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

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

    let activeIndex = 0;
    let isAnimating = false;
    const SLIDE_DURATION = 700;
    const AUTO_ROTATE_DELAY = 10000;
    let rotateTimer = null;

    function updateActiveThumb() {
        menuItems.forEach(item => {
            const idx = parseInt(item.dataset.index);
            if (idx === activeIndex) item.classList.add('active');
            else item.classList.remove('active');
        });
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
        
        // Menu lama keluar
        oldSlide.classList.remove('active');
        oldSlide.classList.add('exiting');
        
        // Menu baru masuk setelah delay
        setTimeout(() => {
            newSlide.classList.remove('exiting', 'entering');
            newSlide.classList.add('entering');
            void newSlide.offsetWidth;
            
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    newSlide.classList.remove('entering');
                    newSlide.classList.add('active');
                });
            });
            
            setTimeout(() => {
                oldSlide.classList.remove('exiting');
                isAnimating = false;
            }, 400);
        }, 200);
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
        rotateTimer = setInterval(() => {
            const nextIndex = (activeIndex + 1) % menuSlides.length;
            goToMenu(nextIndex);
        }, AUTO_ROTATE_DELAY);
    }

    resetTimer();

});
