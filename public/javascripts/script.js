window.addEventListener('popstate', (e) => {
  if (window.location.pathname === '/') {
    window.location = '/';
  }
});

window.addEventListener('DOMContentLoaded', (e) => {
  const navLinks = document.querySelectorAll('.nav-link');
  if (window.location.pathname === '/about') {
    navLinks.forEach(navLink => {
      if (navLink.getAttribute('href') === '/about') {
        navLink.classList.add('active');
      }
    });
  }
});