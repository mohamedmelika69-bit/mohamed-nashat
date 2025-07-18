
        // Language and Theme Toggles
        const languageToggle = document.getElementById('language-toggle');
        const themeToggle = document.getElementById('theme-toggle');
        const htmlElement = document.documentElement; // <html> tag
        const arabicContent = document.getElementById('arabic-content');
        const englishContent = document.getElementById('english-content');

        // Get all navigation links and contact buttons
        const navLinks = document.querySelectorAll('#desktop-nav a, #mobile-nav a');
        const desktopContactBtn = document.getElementById('desktop-contact-btn');
        const mobileContactBtn = document.getElementById('mobile-contact-btn');

        // --- Language Toggle Logic ---
        function setLanguage(lang) {
            if (lang === 'en') {
                htmlElement.setAttribute('lang', 'en');
                htmlElement.setAttribute('dir', 'ltr');
                arabicContent.style.display = 'none';
                englishContent.style.display = 'block';
                languageToggle.textContent = 'AR / EN'; // Update button text

                // Update hrefs for English
                navLinks.forEach(link => {
                    const originalHref = link.getAttribute('href');
                    if (originalHref && !originalHref.endsWith('-en') && originalHref !== '#') {
                        link.setAttribute('href', originalHref + '-en');
                    }
                     // Specific update for products section
                    if (link.getAttribute('data-lang-key') === 'products') {
                        link.setAttribute('href', '#products-section-en');
                    }
                });
                if (desktopContactBtn && desktopContactBtn.getAttribute('href') === '#contact-form-section') {
                    desktopContactBtn.setAttribute('href', '#contact-form-section-en');
                }
                if (mobileContactBtn && mobileContactBtn.getAttribute('href') === '#contact-form-section') {
                    mobileContactBtn.setAttribute('href', '#contact-form-section-en');
                }

            } else { // Default to Arabic
                htmlElement.setAttribute('lang', 'ar');
                htmlElement.setAttribute('dir', 'rtl');
                arabicContent.style.display = 'block';
                englishContent.style.display = 'none';
                languageToggle.textContent = 'EN / AR'; // Update button text

                // Update hrefs for Arabic
                navLinks.forEach(link => {
                    const originalHref = link.getAttribute('href');
                    if (originalHref && originalHref.endsWith('-en')) {
                        link.setAttribute('href', originalHref.replace('-en', ''));
                    }
                    // Specific update for products section
                    if (link.getAttribute('data-lang-key') === 'products') {
                        link.setAttribute('href', '#products-section');
                    }
                });
                if (desktopContactBtn && desktopContactBtn.getAttribute('href') === '#contact-form-section-en') {
                    desktopContactBtn.setAttribute('href', '#contact-form-section');
                }
                if (mobileContactBtn && mobileContactBtn.getAttribute('href') === '#contact-form-section-en') {
                    mobileContactBtn.setAttribute('href', '#contact-form-section');
                }
            }
            localStorage.setItem('preferredLanguage', lang);
        }

        // Initialize language from localStorage or default to Arabic
        const savedLanguage = localStorage.getItem('preferredLanguage') || 'ar';
        setLanguage(savedLanguage);

        languageToggle.addEventListener('click', () => {
            const currentLang = htmlElement.getAttribute('lang');
            setLanguage(currentLang === 'ar' ? 'en' : 'ar');
        });

        // --- Theme Toggle Logic ---
        function setTheme(theme) {
            if (theme === 'dark') {
                document.body.classList.add('dark-mode');
                themeToggle.innerHTML = '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9 9 0 008.354-5.646z"></path></svg>'; // Moon icon
            } else {
                document.body.classList.remove('dark-mode');
                themeToggle.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h1M4 12H3m15.325 5.924l-.707.707M6.707 6.707l-.707-.707m10.61 0l.707-.707M7.414 17.293l-.707.707M12 18a6 6 0 100-12 6 6 0 000 12z"></path></svg>'; // Sun icon
            }
            localStorage.setItem('preferredTheme', theme);
        }

        // Initialize theme from localStorage or default to light
        const savedTheme = localStorage.getItem('preferredTheme') || 'light';
        setTheme(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            setTheme(currentTheme === 'light' ? 'dark' : 'light');
        });


        // Mobile Navigation Toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeMobileMenuButton = document.getElementById('close-mobile-menu');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            mobileMenuOverlay.style.display = 'block';
        });

        closeMobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            mobileMenuOverlay.style.display = 'none';
        });

        mobileMenuOverlay.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            mobileMenuOverlay.style.display = 'none';
        });

        // Scroll to Top Button functionality
        const scrollToTopBtn = document.getElementById('scrollToTopBtn');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) { // Show button after scrolling 300px
                scrollToTopBtn.classList.add('opacity-100', 'translate-y-0');
                scrollToTopBtn.classList.remove('opacity-0', 'translate-y-4');
            } else {
                scrollToTopBtn.classList.remove('opacity-100', 'translate-y-0');
                scrollToTopBtn.classList.add('opacity-0', 'translate-y-4');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Smooth scroll to top
            });
        });

        // Intersection Observer for fade-in animations
        const fadeInElements = document.querySelectorAll('.animate-fade-in-right');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-x-0');
                    entry.target.classList.remove('opacity-0', 'translate-x-10');
                }
            });
        }, { threshold: 0.1 });

        fadeInElements.forEach(element => {
            element.classList.add('opacity-0', 'translate-x-10', 'transition-all', 'duration-1000', 'ease-out');
            observer.observe(element);
        });

        // --- Products Cards Toggle Logic (formerly Service Cards) ---
        const toggleProductsAr = document.getElementById('toggle-products-ar');
        const arabicProductCards = document.querySelectorAll('#arabic-products-grid .hidden-product-card');

        const toggleProductsEn = document.getElementById('toggle-products-en');
        const englishProductCards = document.querySelectorAll('#english-products-grid .hidden-product-card');

        function toggleProductCards(cards, button) {
            let showingMore = false;
            // Check if any hidden card is currently visible
            cards.forEach(card => {
                if (card.style.display === 'block' || card.style.display === '') {
                    showingMore = true;
                }
            });

            if (showingMore) {
                cards.forEach(card => {
                    card.style.display = 'none';
                });
                if (button.id === 'toggle-products-ar') {
                    button.textContent = 'شاهد المزيد من المنتجات';
                } else {
                    button.textContent = 'View More Products';
                }
            } else {
                cards.forEach(card => {
                    card.style.display = 'block';
                });
                if (button.id === 'toggle-products-ar') {
                    button.textContent = 'شاهد منتجات أقل';
                } else {
                    button.textContent = 'View Less Products';
                }
            }
        }

        if (toggleProductsAr) { // Check if element exists before adding listener
            toggleProductsAr.addEventListener('click', () => {
                toggleProductCards(arabicProductCards, toggleProductsAr);
            });
        }

        if (toggleProductsEn) { // Check if element exists before adding listener
            toggleProductsEn.addEventListener('click', () => {
                toggleProductCards(englishProductCards, toggleProductsEn);
            });
        }


        // --- Project Cards Toggle Logic ---
        const toggleProjectsAr = document.getElementById('toggle-projects-ar');
        const arabicProjectCards = document.querySelectorAll('#arabic-projects-grid .hidden-project-card');

        const toggleProjectsEn = document.getElementById('toggle-projects-en');
        const englishProjectCards = document.querySelectorAll('#english-projects-grid .hidden-project-card');

        function toggleProjectCards(cards, button) {
            let showingMore = false;
            cards.forEach(card => {
                if (card.style.display === 'flex' || card.style.display === '') { // Changed to 'flex' for project cards
                    showingMore = true;
                }
            });

            if (showingMore) {
                cards.forEach(card => {
                    card.style.display = 'none';
                });
                if (button.id === 'toggle-projects-ar') {
                    button.textContent = 'شاهد المزيد من المشاريع';
                } else {
                    button.textContent = 'View More Projects';
                }
            } else {
                cards.forEach(card => {
                    card.style.display = 'flex'; // Use flex for project cards to maintain layout
                });
                if (button.id === 'toggle-projects-ar') {
                    button.textContent = 'شاهد مشاريع أقل';
                } else {
                    button.textContent = 'View Less Projects';
                }
            }
        }

        if (toggleProjectsAr) { // Check if element exists before adding listener
            toggleProjectsAr.addEventListener('click', () => {
                toggleProjectCards(arabicProjectCards, toggleProjectsAr);
            });
        }

        if (toggleProjectsEn) { // Check if element exists before adding listener
            toggleProjectsEn.addEventListener('click', () => {
                toggleProjectCards(englishProjectCards, toggleProjectsEn);
            });
        }
   