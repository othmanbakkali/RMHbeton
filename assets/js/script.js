        tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: '#0D9488',
            'brand-light': '#14B8A6',
            'brand-dark': '#0F766E',
            'brand-deep': '#134E4A',
            accent: '#F59E0B',
            whatsapp: '#25D366',
            'whatsapp-dark': '#128C7E',
            surface: '#050505',
            'surface-2': '#0A0A0A',
            'surface-3': '#111111',
            'surface-4': '#171717',
          },
          fontFamily: {
            display: ['Oswald', 'sans-serif'],
            body: ['Manrope', 'sans-serif'],
          }
        }
      }
    }
    
    // Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        navbar.classList.add('bg-surface/90', 'backdrop-blur-md', 'shadow-lg', 'shadow-black/20');
        navbar.style.backdropFilter = 'blur(12px)';
      } else {
        navbar.classList.remove('bg-surface/90', 'backdrop-blur-md', 'shadow-lg', 'shadow-black/20');
        navbar.style.backdropFilter = '';
      }
    });

    // Mobile menu
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    const burgerLines = burger.querySelectorAll('.burger-line');
    let menuOpen = false;

    burger.addEventListener('click', () => {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle('open', menuOpen);
      document.body.style.overflow = menuOpen ? 'hidden' : '';
      if (menuOpen) {
        burgerLines[0].style.transform = 'rotate(45deg) translateY(4px)';
        burgerLines[1].style.opacity = '0';
        burgerLines[2].style.transform = 'rotate(-45deg) translateY(-4px)';
        burgerLines[2].style.width = '1.5rem';
      } else {
        burgerLines[0].style.transform = '';
        burgerLines[1].style.opacity = '1';
        burgerLines[2].style.transform = '';
        burgerLines[2].style.width = '1rem';
      }
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        burgerLines[0].style.transform = '';
        burgerLines[1].style.opacity = '1';
        burgerLines[2].style.transform = '';
        burgerLines[2].style.width = '1rem';
      });
    });

    // Scroll reveal
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));

    // Counter animation
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          let current = 0;
          const increment = target / 60;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = Math.floor(current) + '+';
          }, 25);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const desktopNavLinks = document.querySelectorAll('.nav-link[data-section]');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link[data-section]');

    function updateActiveNav() {
      const scrollPos = window.scrollY + 150;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          // Desktop
          desktopNavLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.dataset.section === id) {
              link.classList.add('active-link');
            }
          });
          // Mobile
          mobileNavLinks.forEach(link => {
            link.classList.remove('active-mobile');
            if (link.dataset.section === id) {
              link.classList.add('active-mobile');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // Toast
    function showToast(msg) {
      const toast = document.getElementById('toast');
      const toastMsg = document.getElementById('toastMsg');
      toastMsg.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    }

    // Contact form
    document.getElementById('contactForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const message = form.message.value.trim();

      if (!name || !phone || !message) {
        showToast('Veuillez remplir tous les champs obligatoires.');
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span class="iconify w-4 h-4 animate-spin" data-icon="lucide:loader-2"></span> Envoi en cours...';
      btn.disabled = true;

      setTimeout(() => {
        showToast('Message envoyé avec succès ! Nous vous contacterons bientôt.');
        form.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 1500);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offset = 80;
          const pos = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: pos, behavior: 'smooth' });
        }
      });
    });