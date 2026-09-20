document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // 🔥 NOMOR WHATSAPP BEEKALICIOUS
    // ==========================================================
    const WA_NUMBER = "6281260004252";

    console.log('✅ Script loaded — Beecalicious');

    // =========================================
    // 1. NAVBAR
    // =========================================
    const navbar = document.querySelector('.navbar-container');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const sections = document.querySelectorAll('section[id]');

    function scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const navHeight = navbar.offsetHeight + 40;
            const targetPosition = targetSection.offsetTop - navHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                scrollToSection(targetId);
                navLinks.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

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

    const logoCircle = document.querySelector('.logo-circle');
    if (logoCircle) {
        logoCircle.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('#hero');
        });
    }

    // =========================================
    // 2. NAVBAR SCROLL STATE
    // =========================================
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });

        mobileLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });

        const sectionProduk = document.getElementById('produk');
        const sectionTestimoni = document.getElementById('testimoni');

        let inRedSection = false;

        if (sectionProduk) {
            const produkTop = sectionProduk.offsetTop - 150;
            const produkBottom = produkTop + sectionProduk.clientHeight;
            if (window.scrollY >= produkTop && window.scrollY <= produkBottom) inRedSection = true;
        }

        if (sectionTestimoni) {
            const testiTop = sectionTestimoni.offsetTop - 150;
            const testiBottom = testiTop + sectionTestimoni.clientHeight;
            if (window.scrollY >= testiTop && window.scrollY <= testiBottom) inRedSection = true;
        }

        if (inRedSection) navbar.classList.add('in-red-section');
        else navbar.classList.remove('in-red-section');
    });

    // =========================================
    // 3. MOBILE MENU
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
    // 4. MENU SLIDE (Hero)
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
        if (ratingName) ratingName.textContent = menuNames[activeIndex] || 'ORIGINAL';

        const ratingBestSeller = document.getElementById('ratingBestSeller');
        if (ratingBestSeller) {
            if (activeIndex === 1) {
                ratingBestSeller.classList.add('visible');
            } else {
                ratingBestSeller.classList.remove('visible');
            }
        }

        const menuLabelFire = document.getElementById('menuLabelFire');
        if (menuLabelFire) {
            if (activeIndex === 1) {
                menuLabelFire.classList.add('visible');
            } else {
                menuLabelFire.classList.remove('visible');
            }
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
    // 5. RATING BINTANG DINAMIS
    // =========================================
    const STAR_FULL_PATH = "M12 2l2.9 6.9L22 9.6l-5.4 4.6 1.7 7.2L12 17.8 5.7 21.4l1.7-7.2L2 9.6l7.1-.7L12 2z";

    function buildStarSVG(fillType) {
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("class", "star-icon");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("xmlns", svgNS);

        if (fillType === "full") {
            const path = document.createElementNS(svgNS, "path");
            path.setAttribute("d", STAR_FULL_PATH);
            path.setAttribute("fill", "#FFFFFF");
            svg.appendChild(path);
        } else if (fillType === "half") {
            const defs = document.createElementNS(svgNS, "defs");
            const linearGradient = document.createElementNS(svgNS, "linearGradient");
            const gradId = "halfGrad-" + Math.random().toString(36).substr(2, 9);
            linearGradient.setAttribute("id", gradId);
            linearGradient.setAttribute("x1", "0%");
            linearGradient.setAttribute("x2", "100%");
            linearGradient.setAttribute("y1", "0%");
            linearGradient.setAttribute("y2", "0%");

            const stop1 = document.createElementNS(svgNS, "stop");
            stop1.setAttribute("offset", "50%");
            stop1.setAttribute("stop-color", "#FFFFFF");
            const stop2 = document.createElementNS(svgNS, "stop");
            stop2.setAttribute("offset", "50%");
            stop2.setAttribute("stop-color", "rgba(255,255,255,0.3)");

            linearGradient.appendChild(stop1);
            linearGradient.appendChild(stop2);
            defs.appendChild(linearGradient);
            svg.appendChild(defs);

            const path = document.createElementNS(svgNS, "path");
            path.setAttribute("d", STAR_FULL_PATH);
            path.setAttribute("fill", `url(#${gradId})`);
            svg.appendChild(path);
        } else {
            const path = document.createElementNS(svgNS, "path");
            path.setAttribute("d", STAR_FULL_PATH);
            path.setAttribute("fill", "rgba(255,255,255,0.3)");
            svg.appendChild(path);
        }

        return svg;
    }

    function renderRatingStars(container) {
        const ratingValue = parseFloat(container.dataset.rating) || 5.0;
        const fullStars = container.dataset.stars !== undefined
            ? parseInt(container.dataset.stars)
            : Math.floor(ratingValue);
        const hasHalf = container.dataset.stars === undefined && (ratingValue - fullStars) >= 0.25 && (ratingValue - fullStars) < 0.75;
        const effectiveFull = container.dataset.stars === undefined && (ratingValue - fullStars) >= 0.75
            ? fullStars + 1
            : fullStars;

        const ratingSpan = container.querySelector('.rating-good-text');
        container.querySelectorAll('svg.star-icon').forEach(svg => svg.remove());

        for (let i = 0; i < 5; i++) {
            let fillType = "empty";
            if (i < effectiveFull) fillType = "full";
            else if (i === effectiveFull && hasHalf) fillType = "half";

            const starSvg = buildStarSVG(fillType);
            if (ratingSpan) {
                container.insertBefore(starSvg, ratingSpan);
            } else {
                container.appendChild(starSvg);
            }
        }
    }

    const ratingBoxes = document.querySelectorAll('.rating-stars-box');
    ratingBoxes.forEach(box => {
        renderRatingStars(box);
    });

    // =========================================
    // 5b. SIZE SELECTOR — Ganti gambar produk
    // =========================================
    const sizePills = document.querySelectorAll('.size-pill');
    const productImgs = document.querySelectorAll('.product-image img');
    const FADE_DURATION = 300; // ms

    let currentSize = 'd18';

    sizePills.forEach(pill => {
        pill.addEventListener('click', () => {
            const newSize = pill.dataset.size;
            if (newSize === currentSize) return;

            // Update active state
            sizePills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            // Fade out semua gambar
            productImgs.forEach(img => {
                img.style.transition = `opacity ${FADE_DURATION}ms ease`;
                img.style.opacity = '0';
            });

            // Setelah fade out, ganti src lalu fade in
            setTimeout(() => {
                productImgs.forEach(img => {
                    const newSrc = img.getAttribute(`data-img-${newSize}`);
                    if (newSrc) img.src = newSrc;
                });

                // Fade in
                requestAnimationFrame(() => {
                    productImgs.forEach(img => {
                        img.style.opacity = '1';
                    });
                });

                currentSize = newSize;
            }, FADE_DURATION);
        });
    });

    // =========================================
    // 6. 3D TILT EFFECT
    // =========================================
    const tiltCards = document.querySelectorAll('.tilt-card');
    const TILT_MAX = 15;
    const TILT_SCALE = 1.05;
    const LERP_FACTOR = 0.15;
    const isDesktop = () => window.innerWidth > 1119;

    tiltCards.forEach(card => {
        let rafId = null;
        let currentX = 0, currentY = 0;
        let targetX = 0, targetY = 0;
        let isHovering = false;

        card.style.transformStyle = 'preserve-3d';
        card.style.willChange = 'transform';

        function animate() {
            currentX += (targetX - currentX) * LERP_FACTOR;
            currentY += (targetY - currentY) * LERP_FACTOR;

            const scale = isHovering ? TILT_SCALE : 1;
            const lift = isHovering ? -8 : 0;

            card.style.transform = `
                perspective(1000px)
                rotateX(${currentX}deg)
                rotateY(${currentY}deg)
                scale(${scale})
                translateY(${lift}px)
            `;

            card.style.boxShadow = isHovering
                ? '0 30px 60px rgba(0, 0, 0, 0.35)'
                : '0 10px 30px rgba(0, 0, 0, 0.15)';

            if (Math.abs(currentX - targetX) > 0.01 || Math.abs(currentY - targetY) > 0.01 || isHovering) {
                rafId = requestAnimationFrame(animate);
            } else {
                rafId = null;
            }
        }

        function startAnim() {
            if (!rafId) rafId = requestAnimationFrame(animate);
        }

        card.addEventListener('mousemove', (e) => {
            if (!isDesktop()) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            targetY = ((x - centerX) / centerX) * TILT_MAX;
            targetX = ((centerY - y) / centerY) * TILT_MAX;
            isHovering = true;

            startAnim();
        });

        card.addEventListener('mouseleave', () => {
            if (!isDesktop()) return;
            targetX = 0;
            targetY = 0;
            isHovering = false;
            startAnim();
        });

        card.addEventListener('touchstart', () => {
            if (isDesktop()) return;
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            card.style.transform = 'scale(1.03)';
            card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.25)';
        }, { passive: true });

        card.addEventListener('touchend', () => {
            if (isDesktop()) return;
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        }, { passive: true });
    });

    // =========================================
    // 7. LIGHTBOX TESTIMONI
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

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // =========================================
    // 8. CUSTOM ALERT SYSTEM
    // =========================================
    const customAlert = document.getElementById('customAlert');
    const customAlertOverlay = document.getElementById('customAlertOverlay');
    const customAlertTitle = document.getElementById('customAlertTitle');
    const customAlertMessage = document.getElementById('customAlertMessage');
    const customAlertBtn = document.getElementById('customAlertBtn');
    const customAlertIcon = document.getElementById('customAlertIcon');

    function showAlert(message, title = 'Peringatan', type = 'warning') {
        customAlertTitle.textContent = title;
        customAlertMessage.textContent = message;

        customAlert.classList.remove('custom-alert-warning', 'custom-alert-success', 'custom-alert-error');

        if (type === 'success') {
            customAlert.classList.add('custom-alert-success');
            customAlertIcon.innerHTML = `
                <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>`;
        } else if (type === 'error') {
            customAlert.classList.add('custom-alert-error');
            customAlertIcon.innerHTML = `
                <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>`;
        } else {
            customAlert.classList.add('custom-alert-warning');
            customAlertIcon.innerHTML = `
                <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>`;
        }

        customAlert.classList.add('active');
    }

    function hideAlert() {
        customAlert.classList.remove('active');
    }

    if (customAlertBtn) customAlertBtn.addEventListener('click', hideAlert);
    if (customAlertOverlay) customAlertOverlay.addEventListener('click', hideAlert);

    // =========================================
    // 9. ORDER POPUP
    // =========================================
    const orderPopup = document.getElementById('orderPopup');
    const orderPopupOverlay = document.getElementById('orderPopupOverlay');
    const orderPopupClose = document.getElementById('orderPopupClose');
    const orderForm = document.getElementById('orderForm');
    const orderBtns = document.querySelectorAll('.btn-order');

    const orderMultiList = document.getElementById('orderMultiList');
    const btnAddItem = document.getElementById('btnAddItem');
    const orderTotalValue = document.getElementById('orderTotalValue');

    const orderName = document.getElementById('orderName');
    const orderAddress = document.getElementById('orderAddress');
    const orderNote = document.getElementById('orderNote');

    // =========================================
    // PRODUK & UKURAN BEEKALICIOUS
    // =========================================
    const PRODUCTS = [
        { value: 'Bika Ambon Original',  label: 'Bika Ambon Original' },
        { value: 'Bika Ambon Pandan',    label: 'Bika Ambon Pandan' },
        { value: 'Bika Ambon Keju',      label: 'Bika Ambon Keju' }
    ];

    const SIZES = [
        { value: 'Diameter 18 cm', label: 'Diameter 18 cm' },
        { value: 'Ukuran 20x10',   label: 'Ukuran 20x10' },
        { value: 'Ukuran 20x20',   label: 'Ukuran 20x20' }
    ];

    const PRICE_LIST = {
        'Bika Ambon Original': {
            'Diameter 18 cm': 60000,
            'Ukuran 20x10':   70000,
            'Ukuran 20x20':   140000
        },
        'Bika Ambon Pandan': {
            'Diameter 18 cm': 62500,
            'Ukuran 20x10':   72500,
            'Ukuran 20x20':   145000
        },
        'Bika Ambon Keju': {
            'Diameter 18 cm': 65000,
            'Ukuran 20x10':   75000,
            'Ukuran 20x20':   150000
        }
    };

    function getPrice(productName, sizeName) {
        if (PRICE_LIST[productName] && PRICE_LIST[productName][sizeName]) {
            return PRICE_LIST[productName][sizeName];
        }
        return 0;
    }

    function formatRupiah(num) {
        return 'Rp' + num.toLocaleString('id-ID');
    }

    function openOrderPopup() {
        orderPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (orderForm) orderForm.reset();
        renderMultiList([{ product: '', size: '', qty: 1 }]);
        updateTotal();

        const wrapper = document.querySelector('.address-input-wrapper');
        if (wrapper) wrapper.classList.remove('valid', 'invalid', 'loading');
        const hint = document.getElementById('addressHint');
        if (hint) { hint.className = 'address-hint'; hint.textContent = ''; }
    }

    function closeOrderPopup() {
        orderPopup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    orderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openOrderPopup();
        });
    });

    if (orderPopupClose) orderPopupClose.addEventListener('click', closeOrderPopup);
    if (orderPopupOverlay) orderPopupOverlay.addEventListener('click', closeOrderPopup);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && orderPopup.classList.contains('active')) {
            closeOrderPopup();
        }
    });

    // ---------- MULTI LIST ----------
    function buildProductOptions(selectedValue = '') {
        let html = `<option value="">-- Pilih Produk --</option>`;
        PRODUCTS.forEach(p => {
            html += `<option value="${p.value}" ${p.value === selectedValue ? 'selected' : ''}>${p.label}</option>`;
        });
        return html;
    }

    function buildSizeOptions(selectedValue = '') {
        let html = `<option value="">-- Pilih Ukuran --</option>`;
        SIZES.forEach(s => {
            html += `<option value="${s.value}" ${s.value === selectedValue ? 'selected' : ''}>${s.label}</option>`;
        });
        return html;
    }

    function createMultiItemHTML(index) {
        return `
            <div class="order-multi-header">
                <span class="order-multi-number">Menu ${index + 1}</span>
                <button type="button" class="btn-remove-item" aria-label="Hapus menu">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
                        <line x1="6" y1="6" x2="18" y2="18"/>
                        <line x1="18" y1="6" x2="6" y2="18"/>
                    </svg>
                </button>
            </div>
            <div class="order-form-group">
                <select class="multi-product">${buildProductOptions()}</select>
            </div>
            <div class="order-multi-row">
                <div class="order-form-group">
                    <select class="multi-size">${buildSizeOptions()}</select>
                </div>
                <div class="order-form-group multi-qty-group">
                    <input type="number" class="multi-qty" min="1" value="1" placeholder="Qty">
                </div>
            </div>
        `;
    }

    function attachMultiItemListeners(item) {
        const removeBtn = item.querySelector('.btn-remove-item');
        const productSelect = item.querySelector('.multi-product');
        const sizeSelect = item.querySelector('.multi-size');
        const qtyInput = item.querySelector('.multi-qty');

        removeBtn.addEventListener('click', () => {
            if (orderMultiList.children.length <= 1) {
                showAlert('Minimal 1 menu dalam pemesanan.', 'Tidak Bisa Hapus', 'warning');
                return;
            }
            item.remove();
            renumberMultiItems();
            updateTotal();
        });

        productSelect.addEventListener('change', updateTotal);
        sizeSelect.addEventListener('change', updateTotal);
        qtyInput.addEventListener('input', updateTotal);
    }

    function renderMultiList(items) {
        orderMultiList.innerHTML = '';
        items.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'order-multi-item';
            row.innerHTML = `
                <div class="order-multi-header">
                    <span class="order-multi-number">Menu ${index + 1}</span>
                    <button type="button" class="btn-remove-item" aria-label="Hapus menu">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
                            <line x1="6" y1="6" x2="18" y2="18"/>
                            <line x1="18" y1="6" x2="6" y2="18"/>
                        </svg>
                    </button>
                </div>
                <div class="order-form-group">
                    <select class="multi-product">${buildProductOptions(item.product)}</select>
                </div>
                <div class="order-multi-row">
                    <div class="order-form-group">
                        <select class="multi-size">${buildSizeOptions(item.size)}</select>
                    </div>
                    <div class="order-form-group multi-qty-group">
                        <input type="number" class="multi-qty" min="1" value="${item.qty}" placeholder="Qty">
                    </div>
                </div>
            `;
            orderMultiList.appendChild(row);
            attachMultiItemListeners(row);
        });
    }

    function renumberMultiItems() {
        const items = orderMultiList.querySelectorAll('.order-multi-item');
        items.forEach((item, index) => {
            const numberEl = item.querySelector('.order-multi-number');
            if (numberEl) numberEl.textContent = `Menu ${index + 1}`;
        });
    }

    if (btnAddItem) {
        btnAddItem.addEventListener('click', () => {
            const index = orderMultiList.children.length;
            const newItem = document.createElement('div');
            newItem.className = 'order-multi-item';
            newItem.innerHTML = createMultiItemHTML(index);
            orderMultiList.appendChild(newItem);
            attachMultiItemListeners(newItem);
            updateTotal();
        });
    }

    function updateTotal() {
        let total = 0;
        const items = orderMultiList.querySelectorAll('.order-multi-item');
        items.forEach(item => {
            const productSelect = item.querySelector('.multi-product');
            const sizeSelect = item.querySelector('.multi-size');
            const qtyInput = item.querySelector('.multi-qty');

            const productValue = productSelect.value;
            const sizeValue = sizeSelect.value;
            const qty = parseInt(qtyInput.value) || 0;

            const price = getPrice(productValue, sizeValue);
            total += price * qty;
        });
        orderTotalValue.textContent = formatRupiah(total);
    }

    // =========================================
    // VALIDASI ALAMAT
    // =========================================
    function validateAddress(address) {
        const missing = [];

        if (!address) {
            return { valid: false, message: 'Mohon isi Alamat Lengkap terlebih dahulu.', missing: ['semua'] };
        }

        if (address.length < 20) {
            return { valid: false, message: 'Alamat terlalu pendek. Minimal 20 karakter.', missing: ['alamat lengkap'] };
        }

        if (!/[a-zA-Z]/.test(address)) {
            return { valid: false, message: 'Alamat harus mengandung huruf.', missing: ['huruf'] };
        }

        const allowedPattern = /^[a-zA-Z0-9\s.,\-\/()#:']+$/;
        if (!allowedPattern.test(address)) {
            return { valid: false, message: 'Alamat mengandung karakter tidak valid.', missing: ['karakter valid'] };
        }

        if (/(.)\1{4,}/.test(address)) {
            return { valid: false, message: 'Alamat terdeteksi tidak valid.', missing: ['alamat asli'] };
        }

        const spamPatterns = [/asdf/i, /qwer/i, /zxcv/i, /1234/i, /testtest/i, /aaaa/i, /xxxx/i, /haha/i, /hehe/i, /baba/i];
        const lowerAddr = address.toLowerCase();
        for (const pattern of spamPatterns) {
            if (pattern.test(lowerAddr)) {
                return { valid: false, message: 'Alamat terdeteksi tidak valid.', missing: ['alamat asli'] };
            }
        }

        const hasStreet = /\b(jl|jalan|gang|gg|blok|komplek|perum|perumahan|apartemen|apartment|tower|ruko)\b/i.test(address);
        if (!hasStreet) missing.push('nama jalan (Jl./Gang/Blok)');

        const hasHouseNumber = /\b(no|nomor)\s*\.?\s*\d+[a-z]?\b/i.test(address) || /\b\d+[a-z]?\b/i.test(address);
        if (!hasHouseNumber) missing.push('nomor rumah (No. XX)');

        const hasRT = /\brt\s*\.?\s*\d+/i.test(address) || /\brt\s*\d+/i.test(address);
        const hasRW = /\brw\s*\.?\s*\d+/i.test(address) || /\brw\s*\d+/i.test(address);
        if (!hasRT) missing.push('RT');
        if (!hasRW) missing.push('RW');

        const hasKel = /\b(kel|kelurahan|desa|dusun)\b/i.test(address);
        const hasKec = /\b(kec|kecamatan)\b/i.test(address);
        const hasKota = /\b(kota|kab|kabupaten|kotamadya)\b/i.test(address);

        if (!hasKel && !hasKec && !hasKota) {
            missing.push('kelurahan/kecamatan/kota');
        }

        if (missing.length > 0) {
            return {
                valid: false,
                message: 'Alamat belum lengkap. Masih kurang: ' + missing.join(', ') + '.',
                missing: missing
            };
        }

        return { valid: true };
    }

    // =========================================
    // ADDRESS INPUT: REAL-TIME + GPS
    // =========================================
    const addressWrapper = document.querySelector('.address-input-wrapper');
    const addressHint = document.getElementById('addressHint');
    const addressGpsBtn = document.getElementById('addressGpsBtn');

    function updateAddressUI(status, message = '') {
        if (!addressWrapper) return;
        addressWrapper.classList.remove('valid', 'invalid', 'loading');

        if (status === 'valid') {
            addressWrapper.classList.add('valid');
            addressHint.className = 'address-hint valid';
            addressHint.textContent = '✓ ' + (message || 'Alamat valid & lengkap');
        } else if (status === 'invalid') {
            addressWrapper.classList.add('invalid');
            addressHint.className = 'address-hint invalid';
            addressHint.textContent = '⚠ ' + message;
        } else if (status === 'loading') {
            addressWrapper.classList.add('loading');
            addressHint.className = 'address-hint loading';
            addressHint.textContent = '⏳ ' + message;
        } else {
            addressHint.className = 'address-hint';
            addressHint.textContent = message;
        }
    }

    if (orderAddress) {
        orderAddress.addEventListener('input', () => {
            const val = orderAddress.value.trim();
            if (val.length === 0) return updateAddressUI('neutral', '');
            if (val.length < 10) return updateAddressUI('neutral', 'Lanjutkan mengetik alamat lengkap...');

            const result = validateAddress(val);
            if (result.valid) updateAddressUI('valid', 'Alamat valid & lengkap');
            else updateAddressUI('invalid', result.message);
        });
    }

    if (addressGpsBtn) {
        addressGpsBtn.addEventListener('click', () => {
            if (!navigator.geolocation) {
                showAlert('Browser Anda tidak mendukung GPS. Mohon isi alamat manual.', 'GPS Tidak Tersedia', 'warning');
                return;
            }

            addressGpsBtn.disabled = true;
            addressGpsBtn.classList.add('loading');
            updateAddressUI('loading', 'Mengambil lokasi Anda...');

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    updateAddressUI('loading', 'Mengubah koordinat menjadi alamat...');

                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
                            { headers: { 'Accept-Language': 'id,en' } }
                        );
                        if (!response.ok) throw new Error('Gagal fetch');

                        const data = await response.json();

                        if (data && data.display_name) {
                            const addr = data.address || {};
                            let parts = [];

                            if (addr.road) parts.push(addr.road);
                            if (addr.house_number) parts.push('No. ' + addr.house_number);
                            if (addr.neighbourhood || addr.suburb) parts.push(addr.neighbourhood || addr.suburb);
                            if (addr.village || addr.city_district) parts.push('Kel. ' + (addr.village || addr.city_district));
                            if (addr.city || addr.town) parts.push(addr.city || addr.town);
                            if (addr.state) parts.push(addr.state);

                            const fullAddress = parts.length > 0 ? parts.join(', ') : data.display_name;
                            orderAddress.value = fullAddress;
                            orderAddress.dispatchEvent(new Event('input'));

                            const validation = validateAddress(fullAddress);
                            if (validation.valid) {
                                updateAddressUI('valid', 'Lokasi GPS berhasil diisi & valid');
                            } else {
                                updateAddressUI('invalid', 'Lokasi ditemukan. Mohon lengkapi: ' + (validation.missing || []).join(', '));
                            }
                            showAlert('Lokasi berhasil ditemukan! Mohon periksa & lengkapi alamat (nomor rumah, RT/RW).', 'GPS Berhasil', 'success');
                        } else {
                            throw new Error('Alamat tidak ditemukan');
                        }
                    } catch (error) {
                        console.error(error);
                        orderAddress.value = `Koordinat: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
                        updateAddressUI('invalid', 'Gagal mendapatkan alamat. Mohon isi manual.');
                        showAlert('Gagal mengubah lokasi menjadi alamat. Mohon isi alamat manual ya.', 'Gagal Ambil Alamat', 'warning');
                    } finally {
                        addressGpsBtn.disabled = false;
                        addressGpsBtn.classList.remove('loading');
                    }
                },
                (error) => {
                    addressGpsBtn.disabled = false;
                    addressGpsBtn.classList.remove('loading');

                    let errorMsg = 'Gagal mengambil lokasi.';
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMsg = 'Anda menolak akses lokasi. Mohon izinkan akses GPS di browser, atau isi alamat manual.';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMsg = 'Informasi lokasi tidak tersedia. Mohon isi alamat manual.';
                            break;
                        case error.TIMEOUT:
                            errorMsg = 'Waktu pengambilan lokasi habis. Mohon coba lagi.';
                            break;
                        default:
                            errorMsg = 'Terjadi kesalahan. Mohon isi alamat manual.';
                    }
                    updateAddressUI('invalid', 'Gagal mengambil lokasi');
                    showAlert(errorMsg, 'GPS Gagal', 'warning');
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        });
    }

    // =========================================
    // SUBMIT FORM
    // =========================================
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = orderName.value.trim();
            const address = orderAddress.value.trim();
            const note = orderNote.value.trim();

            if (!name) {
                showAlert('Mohon isi Nama Lengkap terlebih dahulu.', 'Data Belum Lengkap', 'warning');
                orderName.focus();
                return;
            }

            if (name.length < 3) {
                showAlert('Nama terlalu pendek. Mohon isi nama lengkap Anda.', 'Nama Tidak Valid', 'warning');
                orderName.focus();
                return;
            }

            const addressValidation = validateAddress(address);
            if (!addressValidation.valid) {
                showAlert(addressValidation.message, 'Alamat Tidak Valid', 'warning');
                orderAddress.focus();
                return;
            }

            const items = orderMultiList.querySelectorAll('.order-multi-item');
            let listText = '';
            let total = 0;
            let valid = true;

            items.forEach((item, index) => {
                const productSelect = item.querySelector('.multi-product');
                const product = productSelect.value;
                const sizeSelect = item.querySelector('.multi-size');
                const sizeValue = sizeSelect.value;
                const qty = parseInt(item.querySelector('.multi-qty').value) || 0;

                if (!product || !sizeValue || qty < 1) {
                    valid = false;
                    return;
                }

                const price = getPrice(product, sizeValue);
                const subtotal = price * qty;
                total += subtotal;

                listText += `${index + 1}. ${product}
   Ukuran : ${sizeValue}
   Jumlah : ${qty} pcs
   Harga  : ${formatRupiah(price)} x ${qty} = ${formatRupiah(subtotal)}
`;
            });

            if (!valid) {
                showAlert('Mohon lengkapi semua menu (produk, ukuran, dan jumlah).', 'Data Menu Belum Lengkap', 'warning');
                return;
            }

            const message =
`Halo Beecalicious, saya mau pesan Bika Ambon!

Saya ingin memesan:

${listText}
TOTAL     : ${formatRupiah(total)} (*belum termasuk ongkir)

Nama      : ${name}
Alamat    : ${address}
Catatan   : ${note || '-'}


boleh bantu totalkan harga kue + ongkirnya? Terima kasih`;

            const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');

            setTimeout(() => {
                closeOrderPopup();
            }, 300);
        });
    }

});
