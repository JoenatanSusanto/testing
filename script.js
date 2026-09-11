document.addEventListener('DOMContentLoaded', () => {
    
    console.log('✅ Script loaded');

    // TOGGLE MOBILE MENU
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : 'auto';
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            if (menuToggle && mobileMenu) {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = 'auto';
            }
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
    const SLIDE_DURATION = 900;
    const AUTO_ROTATE_DELAY = 10000;
    let rotateTimer = null;

    function updateActiveThumb() {
        menuItems.forEach(item => {
            const idx = parseInt(item.dataset.index);
            if (idx === activeIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
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
        
        newSlide.classList.remove('active', 'exiting');
        newSlide.classList.add('entering');
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                newSlide.classList.remove('entering');
                newSlide.classList.add('active');
                
                oldSlide.classList.remove('active');
                oldSlide.classList.add('exiting');
                
                setTimeout(() => {
                    oldSlide.classList.remove('exiting');
                    isAnimating = false;
                }, SLIDE_DURATION);
            });
        });
    }

    // Klik thumbnail → ganti menu + reset timer
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const idx = parseInt(item.dataset.index);
            goToMenu(idx);
            resetTimer();
        });
    });

    // Fungsi reset timer
    function resetTimer() {
        if (rotateTimer) {
            clearInterval(rotateTimer);
        }
        rotateTimer = setInterval(() => {
            const nextIndex = (activeIndex + 1) % menuSlides.length;
            goToMenu(nextIndex);
        }, AUTO_ROTATE_DELAY);
    }

    // Mulai timer pertama kali
    resetTimer();

});