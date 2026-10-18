document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // -------------------------------------------------------------
  // Theme Toggle (Dark / Light)
  // -------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const body = document.body;

  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    html.classList.remove('dark');
  } else {
    html.classList.add('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-theme');
      const isLight = body.classList.contains('light-theme');
      if (isLight) {
        html.classList.remove('dark');
        localStorage.setItem('portfolio-theme', 'light');
      } else {
        html.classList.add('dark');
        localStorage.setItem('portfolio-theme', 'dark');
      }
      if (window.lucide) lucide.createIcons();
    });
  }

  // -------------------------------------------------------------
  // Mobile Navigation Menu
  // -------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
});
