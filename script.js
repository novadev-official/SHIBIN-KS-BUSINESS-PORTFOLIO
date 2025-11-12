// Minimal enhancements: smooth scroll, current year, and accessible focus handling
(function () {
	// dynamic year in footer
	var yearEl = document.getElementById('year');
	if (yearEl) {
		yearEl.textContent = new Date().getFullYear();
	}

	// smooth scroll for in-page anchors
	function isLocalAnchor(link) {
		return link.hash && (link.pathname === location.pathname || link.pathname === '/' || link.pathname === '');
	}

	document.addEventListener('click', function (e) {
		var target = e.target;
		if (target && target.tagName === 'A' && isLocalAnchor(target)) {
			var section = document.querySelector(target.hash);
			if (section) {
				e.preventDefault();
				section.scrollIntoView({ behavior: 'smooth', block: 'start' });
				history.pushState(null, '', target.hash);
			}
		}
	}, { passive: false });

	// improve focus styles when tabbing
	var hadKeyboardEvent = false;
	function setKeyboardMode(e) {
		if (e.key === 'Tab') {
			hadKeyboardEvent = true;
			document.documentElement.classList.add('user-is-tabbing');
		}
	}
	function unsetKeyboardMode() {
		if (hadKeyboardEvent) return;
		document.documentElement.classList.remove('user-is-tabbing');
	}
	window.addEventListener('keydown', setKeyboardMode, true);
	window.addEventListener('mousedown', function () { hadKeyboardEvent = false; unsetKeyboardMode(); }, true);
	window.addEventListener('touchstart', function () { hadKeyboardEvent = false; unsetKeyboardMode(); }, true);

	// mobile menu toggle
	var header = document.querySelector('.site-header');
	var toggle = document.querySelector('.menu-toggle');
	if (header && toggle) {
		toggle.addEventListener('click', function () {
			var isOpen = header.classList.toggle('open');
			toggle.setAttribute('aria-expanded', String(isOpen));
		});
		// close menu when a nav link is clicked (mobile)
		var nav = document.getElementById('primary-nav');
		if (nav) {
			nav.addEventListener('click', function (e) {
				if (e.target && e.target.tagName === 'A') {
					header.classList.remove('open');
					toggle.setAttribute('aria-expanded', 'false');
				}
			});
		}
	}
})();


