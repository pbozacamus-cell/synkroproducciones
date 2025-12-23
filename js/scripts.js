// Mobile nav toggle and small utilities
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('mobile-menu');
  const nav = document.getElementById('nav-items');
  const header = document.querySelector('header');
  const logo = header ? header.querySelector('img') : null;

  function updateNavCollapse() {
    if (!nav || !toggle) return;
    // If viewport is small, always show the hamburger and hide desktop nav
    if (window.innerWidth <= 900) {
      nav.classList.add('hidden');
      toggle.classList.remove('hidden');
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      return;
    }

    // available space to the right of logo inside header
    const headerWidth = header ? header.clientWidth : window.innerWidth;
    const logoWidth = logo ? logo.clientWidth : 0;
    // small buffer
    const available = headerWidth - logoWidth - 120;
    if (nav.scrollWidth > available) {
      nav.classList.add('hidden');
      toggle.classList.remove('hidden');
      // ensure mobile menu closed
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      nav.classList.remove('hidden');
      toggle.classList.add('hidden');
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  // initial check and on resize
  updateNavCollapse();
  window.addEventListener('resize', updateNavCollapse);

  if (toggle && menu) {
    toggle.addEventListener('click', (e) => {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Close menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!menu || !toggle) return;
    if (menu.classList.contains('open')) {
      const isClickInsideMenu = menu.contains(e.target) || toggle.contains(e.target);
      if (!isClickInsideMenu) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Set year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
