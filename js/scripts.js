'use strict';

const throttle = function(func, time) {
	let timerId;
	return function () {

		if (timerId) {
			return;
		}

		timerId = setTimeout(function () {
			func();

			timerId = undefined;
		}, time);
	};
};

(function() {
  const mobileMenu = document.getElementById('mobile_menu');
  const mobileNav = document.getElementById('mobile_nav');
  const mobileNavClose = document.getElementById('mobile_nav-close');
  const body = document.querySelector('body');

  mobileMenu.addEventListener('click', function(e) {
    mobileNav.classList.add('is-open');
    body.style.position = 'fixed';
  });

  mobileNavClose.addEventListener('click', function() {
    mobileNav.classList.remove('is-open');
    body.style.position = '';
  });
})();

(function() {
  const sectionSelector = document.querySelectorAll("section");
  const links = document.querySelectorAll('.header__nav__list__link');
  let sections = [];

  Array.prototype.forEach.call(sectionSelector, function(e) {
    const section = {};
    section.id = e.id;
    section.offset = e.offsetTop;
    sections.push(section);
  });

	window.onresize = function() {
		sections = [];
		Array.prototype.forEach.call(sectionSelector, function(e) {
	    const section = {};
	    section.id = e.id;
	    section.offset = e.offsetTop;
	    sections.push(section);
	  });
	}

  const navScroll = function() {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    for (let i = sections.length; i > 0; i--) {
      if (sections[i-1].offset <= scrollPosition) {
        const navLink = document.querySelector('.header__nav__list a[href*=' + sections[i-1].id + ']');
        if (!navLink.classList.contains('is-active')) {
          document.querySelector('.is-active').classList.remove('is-active');
          navLink.classList.add('is-active');
        }
        break;
      }
    }
  };

  const navThrottledScroll = throttle(navScroll, 50);

  window.onscroll = navThrottledScroll;

  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(e) {
      const target = document.querySelector(this.hash);

      if (target) {
        e.preventDefault();

        window.scroll({
          top: target.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  }
})();

(function() {
  const body = document.querySelector('body');
  const mobileNav = document.getElementById('mobile_nav');
  const links = document.querySelectorAll('.mobile_nav__list__link');

  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(e) {
      const target = document.querySelector(this.hash);

      if (target) {
        e.preventDefault();
        mobileNav.classList.remove('is-open');
        body.style.position = '';

        window.scroll({
          top: target.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  }
})();
