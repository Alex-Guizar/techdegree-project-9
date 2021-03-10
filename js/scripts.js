(function() {
  const mobileMenu = document.getElementById('mobile_menu');
  const mobileNav = document.getElementById('mobile_nav');
  const mobileNavClose = document.getElementById('mobile_nav-close');

  mobileMenu.addEventListener('click', function(e) {
    mobileNav.classList.add('is-open');
  });

  mobileNavClose.addEventListener('click', function() {
    mobileNav.classList.remove('is-open');
  });
})();
